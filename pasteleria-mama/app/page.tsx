import type { ReactNode } from "react";
import { CakeSlice, Clock3, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { CartPanel } from "./components/cart-panel";
import { CheckoutForm } from "./components/checkout-form";
import { ProductCard } from "./components/product-card";
import { products } from "./lib/products";

export default function Home() {
  const heroImageUrl =
    "https://res.cloudinary.com/dzue1np85/image/upload/v1764863080/IMG_1985_dhtnzs.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <section
        id="inicio"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden text-white"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/75 via-amber-950/60 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_35%)]" />

        <header className="absolute left-0 right-0 top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">
            <nav className="hidden items-center gap-5 md:flex">
              <a className="transition hover:text-amber-100" href="#inicio">
                Inicio
              </a>
              <a className="transition hover:text-amber-100" href="#productos">
                Productos
              </a>
            </nav>
            <div className="flex flex-1 justify-center">
              <div className="flex items-center gap-3 text-center text-white">
                <div className="flex h-12 w-12 items-center justify-center border border-white/40 bg-gradient-to-br from-rose-100/30 to-amber-100/30 text-white shadow-lg backdrop-blur-sm">
                  <CakeSlice className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/80 sm:text-xs">
                    Encina&apos;s Bakery
                  </p>
                  <p className="text-sm font-black leading-tight sm:text-base">
                    Sabor real
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden items-center justify-end gap-5 md:flex">
              <a className="transition hover:text-amber-100" href="#nosotros">
                Nosotros
              </a>
              <a className="transition hover:text-amber-100" href="#productos">
                Pedidos
              </a>
            </nav>
            <div className="flex flex-1 justify-end md:hidden">
              <a
                className="rounded-none border border-white/40 px-4 py-2 text-xs font-bold transition hover:bg-white/10"
                href="#productos"
              >
                Ver catálogo
              </a>
            </div>
          </div>
        </header>

        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <h1 className="text-4xl font-black uppercase tracking-[0.22em] sm:text-5xl md:text-6xl lg:text-7xl">
            Sabor real. Hecho en casa.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium uppercase tracking-[0.24em] text-white/85 sm:text-lg">
            Chocolate oscuro, técnicas de taller y la calidez de nuestra cocina
            en cada rebanada.
          </p>
          <div className="mt-10">
            <a
              className="inline-flex items-center justify-center bg-rose-500 px-8 py-3 text-sm font-black uppercase tracking-[0.28em] text-white shadow-xl transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="#productos"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-r from-amber-200 via-rose-200 to-pink-100 p-8 shadow-2xl shadow-rose-100/70">
          <div className="absolute -right-10 -top-12 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-4 left-6 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
          <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr] lg:items-center">
            <div className="space-y-5 text-rose-950">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm shadow-rose-100">
                <Sparkles className="h-4 w-4" /> Catálogo dulce y cercano
              </div>
              <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Encina&apos;s Bakery
              </h2>
              <p className="max-w-2xl text-lg text-rose-800/80">
                Pasteles, tartas y bocados hechos con recetas de casa, listos
                para coordinar entrega sin fricciones. Agrega tus favoritos y te
                confirmamos el pedido por correo.
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
            <div className="rounded-3xl bg-white/80 p-6 text-rose-900 shadow-xl shadow-rose-100 backdrop-blur-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-400">
                Cómo funciona
              </p>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700 shadow-sm">
                    1
                  </span>
                  <div>
                    <p className="font-semibold">Elige tu torta o pack</p>
                    <p className="text-rose-800/80">
                      Catálogo rápido desde un JSON local.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700 shadow-sm">
                    2
                  </span>
                  <div>
                    <p className="font-semibold">Agrégalo al carrito</p>
                    <p className="text-rose-800/80">
                      Estado manejado con Zustand, sin complejidad.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700 shadow-sm">
                    3
                  </span>
                  <div>
                    <p className="font-semibold">Envía el pedido</p>
                    <p className="text-rose-800/80">
                      Resend confirma y seguimos por correo.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="productos" className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
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
                  Todo vive en un JSON local para máxima velocidad y control.
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

        <section
          id="nosotros"
          className="overflow-hidden rounded-3xl border border-rose-100 bg-white/80 p-8 shadow-lg shadow-rose-100/60"
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">
                Nosotros
              </p>
              <h3 className="text-3xl font-semibold text-slate-900">
                Una cocina pequeña con sabor enorme
              </h3>
              <p className="text-base text-slate-600">
                Encina&apos;s Bakery nace de la mesa familiar. Cada pastel se
                arma a mano con ingredientes frescos, fruta real y decoraciones
                delicadas. Nos importa que cada entrega llegue con la misma
                calidez con la que la preparamos.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <HighlightPill
                  title="Decoración a medida"
                  copy="Ajustamos colores y toppers a tu celebración."
                />
                <HighlightPill
                  title="Ingredientes locales"
                  copy="Preferimos frutas de temporada y lácteos frescos."
                />
                <HighlightPill
                  title="Entrega cuidada"
                  copy="Coordinamos por correo para llegar justo a tiempo."
                />
                <HighlightPill
                  title="Detalles dulces"
                  copy="Tarjetas, velas y notas personalizadas disponibles."
                />
              </div>
            </div>
            <div className="relative rounded-3xl bg-gradient-to-br from-rose-100 via-amber-50 to-white p-1">
              <div className="h-full rounded-[26px] bg-white/90 p-6 shadow-xl shadow-rose-100">
                <p className="text-sm font-semibold text-rose-500">
                  Sabor de hogar
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  &quot;Cada bocado está pensado para que celebres sin
                  preocupaciones.&quot;
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Florencia Encina · Fundadora & pastelera
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <StatChip
                    icon={<Sparkles className="h-4 w-4" />}
                    label="Decoración"
                    value="Flores y cremas"
                  />
                  <StatChip
                    icon={<Truck className="h-4 w-4" />}
                    label="Cobertura"
                    value="Ciudad y alrededores"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
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
    <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm shadow-inner shadow-rose-200/50">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 text-rose-700">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-rose-500">{label}</p>
        <p className="text-sm font-semibold text-rose-900">{value}</p>
      </div>
    </div>
  );
}

function HighlightPill({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-rose-100 bg-white/70 px-4 py-3 text-left shadow-sm shadow-rose-100">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-slate-600">{copy}</p>
    </div>
  );
}
