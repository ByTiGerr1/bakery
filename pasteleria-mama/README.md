# Pastelería Encina

Sitio web de catálogo y pedidos para pastelería, construido con [Next.js](https://nextjs.org), TypeScript y Tailwind CSS. Permite explorar productos, agregarlos al carrito y enviar pedidos por correo mediante una API interna.

## Inicio rápido

Ejecuta el entorno de desarrollo:

```bash
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de entorno

Para enviar pedidos por correo necesitas configurar:

- `RESEND_API_KEY`: clave de Resend.
- `EMAIL_TO`: correo que recibirá los pedidos.

Puedes agregarlas en `.env.local` para desarrollo y en tu proveedor de despliegue para producción.

## Estructura principal

- `app/page.tsx`: página principal con hero, catálogo y secciones informativas.
- `app/components`: componentes de interfaz (navbar, tarjetas, carrito y formulario).
- `app/data/products.json`: catálogo de productos.
- `app/api/order/route.ts`: endpoint para procesar y enviar pedidos por correo.

## Más información

- [Documentación de Next.js](https://nextjs.org/docs)
- [Guía de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying)
