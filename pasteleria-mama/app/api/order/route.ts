import { NextResponse } from "next/server";
import { Resend } from "resend";
import { products } from "../../lib/products";

const resendKey = process.env.RESEND_API_KEY;
// Usamos EMAIL_TO que es el que definiste en tu .env.local y Vercel
const ownerEmail = process.env.EMAIL_TO;

const resend = resendKey ? new Resend(resendKey) : null;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_BODY_SIZE = 20_000;
const MAX_ITEMS = 20;
const MAX_NAME_LENGTH = 80;
const MAX_NOTES_LENGTH = 500;

const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return origin === `${protocol}://${host}`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes. Intenta nuevamente en unos minutos." },
      { status: 429 }
    );
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { message: "Origen no permitido." },
      { status: 403 }
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { message: "Formato de solicitud no válido." },
      { status: 415 }
    );
  }

  const rawBody = await request.text();

  if (rawBody.length > MAX_BODY_SIZE) {
    return NextResponse.json(
      { message: "La solicitud excede el tamaño permitido." },
      { status: 413 }
    );
  }

  let payload: {
    customer?: { name?: string; email?: string; notes?: string; website?: string };
    items?: { id?: string; quantity?: number }[];
  };

  try {
    payload = JSON.parse(rawBody) as {
      customer?: {
        name?: string;
        email?: string;
        notes?: string;
        website?: string;
      };
      items?: { id?: string; quantity?: number }[];
    };
  } catch {
    return NextResponse.json(
      { message: "No pudimos procesar la solicitud." },
      { status: 400 }
    );
  }

  const honeypot = normalizeSpaces(payload.customer?.website || "");
  if (honeypot.length > 0) {
    return NextResponse.json({ message: "Pedido enviado con éxito" });
  }

  if (!payload.items || payload.items.length === 0 || payload.items.length > MAX_ITEMS) {
    return NextResponse.json(
      { message: "Agrega al menos un producto antes de enviar el pedido." },
      { status: 400 }
    );
  }

  const customerName = normalizeSpaces(payload.customer?.name || "");
  const customerEmail = normalizeSpaces(payload.customer?.email || "").toLowerCase();
  const customerNotes = normalizeSpaces(payload.customer?.notes || "");

  if (!customerName || !customerEmail) {
    return NextResponse.json(
      { message: "Necesitamos un nombre y correo para confirmar tu pedido." },
      { status: 400 }
    );
  }

  if (customerName.length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { message: "El nombre es demasiado largo." },
      { status: 400 }
    );
  }

  if (!isValidEmail(customerEmail)) {
    return NextResponse.json(
      { message: "El correo no tiene un formato válido." },
      { status: 400 }
    );
  }

  if (customerNotes.length > MAX_NOTES_LENGTH) {
    return NextResponse.json(
      { message: "Las notas superan el máximo permitido." },
      { status: 400 }
    );
  }

  if (!resend || !ownerEmail) {
    return NextResponse.json(
      {
        message:
          "Error de configuración del servidor (faltan claves de API).",
      },
      { status: 500 }
    );
  }

  const normalizedItems: { id: string; name: string; price: number; quantity: number }[] = [];

  for (const item of payload.items) {
    const itemId = typeof item?.id === "string" ? normalizeSpaces(item.id) : "";
    const quantity = Number.isInteger(item?.quantity) ? Number(item.quantity) : 0;

    if (!itemId || quantity < 1 || quantity > 20) {
      return NextResponse.json(
        { message: "Hay productos inválidos en tu pedido." },
        { status: 400 }
      );
    }

    const catalogProduct = products.find((product) => product.id === itemId);

    if (!catalogProduct) {
      return NextResponse.json(
        { message: "Uno o más productos no están disponibles." },
        { status: 400 }
      );
    }

    normalizedItems.push({
      id: catalogProduct.id,
      name: catalogProduct.name,
      price: catalogProduct.price,
      quantity,
    });
  }

  const mergedItems = new Map<string, { id: string; name: string; price: number; quantity: number }>();

  for (const item of normalizedItems) {
    const existing = mergedItems.get(item.id);

    if (existing) {
      const newQuantity = existing.quantity + item.quantity;

      if (newQuantity > 20) {
        return NextResponse.json(
          { message: "La cantidad de un producto supera el límite permitido." },
          { status: 400 }
        );
      }

      mergedItems.set(item.id, { ...existing, quantity: newQuantity });
      continue;
    }

    mergedItems.set(item.id, item);
  }

  const secureItems = Array.from(mergedItems.values());

  const total = secureItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderLines = secureItems
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.name)}</strong> x ${item.quantity} — $${(
          item.price * item.quantity
        ).toFixed(2)}</li>`
    )
    .join("");

  const safeCustomerName = escapeHtml(customerName);
  const safeCustomerEmail = escapeHtml(customerEmail);
  const safeCustomerNotes = customerNotes
    ? escapeHtml(customerNotes)
    : "Sin notas";

  const emailHtml = `
    <div style="font-family: 'Inter', system-ui, sans-serif; color:#0f172a; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #be123c;">🍰 Nuevo pedido desde la web</h1>
      <p><strong>Cliente:</strong> ${safeCustomerName}</p>
      <p><strong>Correo:</strong> <a href="mailto:${safeCustomerEmail}">${safeCustomerEmail}</a></p>
      <p><strong>Notas:</strong> ${safeCustomerNotes}</p>
      
      <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
      
      <h3>Detalle del pedido:</h3>
      <ul>${orderLines}</ul>
      
      <p style="font-size: 18px;"><strong>Total a pagar: $${
        total.toFixed(2)
      }</strong></p>
      
      <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 14px; color: #64748b;">
        Este correo fue enviado desde tu sitio web. Pulsa en "Responder" para escribirle al cliente.
      </p>
    </div>
  `;

  try {
    // EN MODO GRATUITO:
    // 'from' DEBE ser onboarding@resend.dev
    // 'to' DEBE ser tu propio correo verificado (ownerEmail)
    // Usamos 'reply_to' para que al responder le escribas al cliente
    await resend.emails.send({
      from: "Pastelería Web <onboarding@resend.dev>",
      to: [ownerEmail],
      subject: `Nuevo pedido de ${safeCustomerName}`,
      html: emailHtml,
      replyTo: customerEmail,
    });

    return NextResponse.json({ message: "Pedido enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      {
        message:
          "No pudimos enviar el correo. Revisa los registros del servidor.",
      },
      { status: 500 }
    );
  }
}
