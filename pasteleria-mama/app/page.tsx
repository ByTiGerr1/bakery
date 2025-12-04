import type { ReactNode } from "react";
import { CakeSlice, Clock3, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { CartPanel } from "./components/cart-panel";
import { CheckoutForm } from "./components/checkout-form";
import { ProductCard } from "./components/product-card";
import { products } from "./lib/products";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-r from-rose-600 via-rose-500 to-orange-400 p-8 shadow-2xl shadow-rose-100/50">
        <div className="absolute -right-6 -top-6 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr] lg:items-center">
          <div className="space-y-4 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" /> Catálogo artesanal en línea
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Pastelería Mamá
            </h1>
            <p className="max-w-2xl text-lg text-white/90">
              Tortas, pies y cupcakes hechos en casa, listos para coordinar
              entrega sin pasarela de pago. Agrega tus favoritos al carrito y
              envía tu pedido por correo.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatChip
                icon={<CakeSlice className="h-4 w-4" />}
                label="Recetas de familia"
                value="100% caseras"
              />
              <StatChip
                icon={<Clock3 className="h-4 w-4" />}
                label="Tiempo de prep"
                value="24-48h"
              />
              <StatChip
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Pedidos seguros"
                value="Confirmación por correo"
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white/15 p-6 text-white backdrop-blur-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Flujo simplificado
            </p>
            <ol className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold">Elige tu torta o pack</p>
                  <p className="text-white/80">
                    Catálogo rápido desde un JSON local.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold">Agrégalo al carrito</p>
                  <p className="text-white/80">
                    Estado manejado con Zustand, sin complejidad.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold">Envía el pedido</p>
                  <p className="text-white/80">
                    Resend envía la confirmación y seguimos por correo.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-700">
                Catálogo visual
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Tortas y postres disponibles
              </h2>
              <p className="text-sm text-slate-500">
                Todo vive en un JSON local para máxima velocidad y control.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
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
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 text-sm shadow-inner shadow-rose-200/30">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/80">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
