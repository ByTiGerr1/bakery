import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;

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

  if (!resend) {
    return NextResponse.json(
      { message: "Configura RESEND_API_KEY para enviar el correo de pedido." },
      { status: 500 }
    );
  }

  const recipientList = [payload.customer.email];

  if (notificationEmail) {
    recipientList.push(notificationEmail);
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
    <div style="font-family: 'Inter', system-ui, sans-serif; color:#0f172a;">
      <h2>Nuevo pedido de ${payload.customer.name}</h2>
      <p>Coordinemos la entrega y forma de pago por correo.</p>
      <hr />
      <p><strong>Contacto:</strong> ${payload.customer.email}</p>
      <p><strong>Notas:</strong> ${
        payload.customer.notes || "Sin notas adicionales"
      }</p>
      <h3>Resumen del pedido</h3>
      <ul>${orderLines}</ul>
      <p><strong>Total estimado:</strong> $${
        payload.total?.toFixed(2) ?? ""
      }</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Pedidos Pastelería <pedidos@pasteleria.dev>",
      to: recipientList,
      subject: `Nuevo pedido de ${payload.customer.name}`,
      html: emailHtml,
    });

    return NextResponse.json({ message: "Pedido enviado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "No pudimos enviar el correo, intenta más tarde." },
      { status: 500 }
    );
  }
}
