import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
// Usamos EMAIL_TO que es el que definiste en tu .env.local y Vercel
const ownerEmail = process.env.EMAIL_TO;

const resend = resendKey ? new Resend(resendKey) : null;

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    customer?: { name?: string; email?: string; notes?: string };
    items?: { id: string; name: string; price: number; quantity: number }[];
    total?: number;
  };

  if (!payload.items || payload.items.length === 0) {
    return NextResponse.json(
      { message: "Agrega al menos un producto antes de enviar el pedido." },
      { status: 400 }
    );
  }

  if (!payload.customer?.name || !payload.customer.email) {
    return NextResponse.json(
      { message: "Necesitamos un nombre y correo para confirmar tu pedido." },
      { status: 400 }
    );
  }

  if (!resend || !ownerEmail) {
    return NextResponse.json(
      { message: "Error de configuración del servidor (Faltan API Keys)." },
      { status: 500 }
    );
  }

  const orderLines = payload.items
    .map(
      (item) =>
        `<li><strong>${item.name}</strong> x ${item.quantity} — $${(
          item.price * item.quantity
        ).toFixed(2)}</li>`
    )
    .join("");

  const emailHtml = `
    <div style="font-family: 'Inter', system-ui, sans-serif; color:#0f172a; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #be123c;">🍰 Nuevo Pedido Web</h1>
      <p><strong>Cliente:</strong> ${payload.customer.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${payload.customer.email}">${
    payload.customer.email
  }</a></p>
      <p><strong>Notas:</strong> ${payload.customer.notes || "Sin notas"}</p>
      
      <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
      
      <h3>Detalle del pedido:</h3>
      <ul>${orderLines}</ul>
      
      <p style="font-size: 18px;"><strong>Total a Pagar: $${
        payload.total?.toFixed(2) ?? "0.00"
      }</strong></p>
      
      <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 14px; color: #64748b;">
        Este correo fue enviado desde tu página web. Dale a "Responder" para escribirle al cliente.
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
      subject: `Nuevo pedido de ${payload.customer.name}`,
      html: emailHtml,
    });

    return NextResponse.json({ message: "Pedido enviado con éxito" });
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { message: "No pudimos enviar el correo. Revisa los logs del servidor." },
      { status: 500 }
    );
  }
}
