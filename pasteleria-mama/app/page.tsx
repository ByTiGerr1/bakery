import Image from "next/image";
import { Truck } from "lucide-react";
import { CartPanel } from "./components/cart-panel";
import { CheckoutForm } from "./components/checkout-form";
import { Navbar } from "./components/navbar";
import { ProductCard } from "./components/product-card";
import { products } from "./lib/products";

export default function Home() {
  const heroImageUrl =
    "https://res.cloudinary.com/dzue1np85/image/upload/v1764863080/IMG_1985_dhtnzs.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <Navbar />
      <section
        id="inicio"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white"
      >
        <Image
          alt="Pastel casero decorado de Pastelería Encina"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={heroImageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/75 via-amber-950/60 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_35%)]" />

        <div className="relative z-10 flex flex-col items-center px-4 pb-20 pt-28 text-center sm:px-6 lg:px-8">
          <h1 className="max-w-4xl text-balance text-3xl font-black uppercase leading-tight tracking-[0.18em] sm:text-4xl md:text-5xl lg:text-6xl">
            Pasteles artesanales para tus celebraciones
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-base font-medium uppercase tracking-[0.16em] text-white/85 sm:text-lg">
            Elige tu favorito, arma tu pedido y coordinamos entrega por correo.
          </p>
          <div className="mt-10 w-full max-w-lg">
            <a
              className="inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-8 py-3 text-sm font-black uppercase tracking-[0.22em] text-white shadow-xl transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              href="#productos"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <section
          id="productos"
          className="grid gap-10 lg:grid-cols-[1.6fr,1fr]"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-rose-700">
                  Selección Encina
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Tortas y postres disponibles
                </h2>
                <p className="text-sm text-slate-500">
                  Selecciona tus productos y envía tu pedido en minutos.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-rose-700 shadow-sm ring-1 ring-rose-100">
                <Truck className="h-4 w-4" /> Entregas coordinadas por correo
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="space-y-6 lg:sticky lg:top-8">
            <CartPanel />
            <CheckoutForm />
          </div>
        </section>
      </main>
    </div>
  );
}
