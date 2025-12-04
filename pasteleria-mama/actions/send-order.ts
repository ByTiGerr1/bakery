'use server';

import { Resend } from 'resend';
import { OrderDetails } from '@/lib/types';

// Initialize Resend with an API key.
// In a real app, use process.env.RESEND_API_KEY
// Since we don't have a key, we'll check for it.
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function sendOrder(data: OrderDetails) {
  try {
    const { customerName, customerEmail, customerPhone, items, total } = data;

    const itemsList = items
      .map(
        (item) =>
          `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    const emailBody = `
      Nuevo Pedido de ${customerName}

      Detalles del Cliente:
      Email: ${customerEmail}
      Teléfono: ${customerPhone}

      Pedido:
      ${itemsList}

      Total: $${total.toFixed(2)}
    `;

    // Send email to the bakery owner
    // In production, you would use a real verified domain/email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Pastelería Mamá <onboarding@resend.dev>', // Default testing domain for Resend
        to: ['delivered@resend.dev'], // Default testing email
        subject: `Nuevo Pedido de ${customerName}`,
        text: emailBody,
      });

      // Send confirmation to customer (only works if you have a verified domain, using testing domain for now)
      /*
      await resend.emails.send({
        from: 'Pastelería Mamá <onboarding@resend.dev>',
        to: [customerEmail],
        subject: 'Confirmación de tu pedido',
        text: `Hola ${customerName}, hemos recibido tu pedido. Nos pondremos en contacto contigo pronto para coordinar el pago y la entrega.\n\n${itemsList}\n\nTotal: $${total.toFixed(2)}`,
      });
      */
    } else {
      console.log('RESEND_API_KEY is missing. Skipping email sending.');
    }

    console.log('Order received:', data);
    console.log('Email Body Preview:', emailBody);

    return { success: true, message: 'Pedido enviado correctamente' };
  } catch (error) {
    console.error('Error sending order:', error);
    return { success: false, message: 'Error al enviar el pedido. Por favor intenta de nuevo.' };
  }
}
