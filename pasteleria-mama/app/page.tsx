import { Heart, Sparkles, Timer } from "lucide-react";
import { SafeImage } from "./components/safe-image";
import { Navbar } from "./components/navbar";

export default function Home() {
  const heroImageUrl =
    "https://res.cloudinary.com/dzue1np85/image/upload/v1764863080/IMG_1985_dhtnzs.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-[#FFF8F1] to-[#FFFDF8]">
      <Navbar />
      <section
        className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-slate-950 text-white"
      >
        <SafeImage
          alt="Pastel casero decorado de Pastelería Encina"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          fallbackClassName="absolute inset-0 -z-10"
          fallbackLabel="Pastelería Encina"
          fill
          priority
          sizes="100vw"
          src={heroImageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/75 via-amber-950/60 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_35%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-16 pt-40 text-center sm:px-6 sm:pt-36 md:pt-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur sm:text-xs">
            <Sparkles className="h-4 w-4" /> Hecho en casa, con cariño
          </span>

          <h1 className="mt-6 max-w-4xl text-balance text-3xl font-black uppercase leading-tight tracking-[0.12em] sm:text-4xl sm:tracking-[0.16em] md:text-5xl lg:text-6xl">
            Pasteles artesanales para convertir momentos en recuerdos dulces
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-sm font-medium text-white/85 sm:mt-6 sm:text-lg">
            Ingredientes seleccionados, decoración cuidada y sabor casero en cada pedido.
          </p>

          <div className="mt-8 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Especialidad</p>
              <p className="mt-1 text-sm font-semibold text-white">Tortas celebrativas</p>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Preparación</p>
              <p className="mt-1 text-sm font-semibold text-white">Horneado diario</p>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Atención</p>
              <p className="mt-1 text-sm font-semibold text-white">Pedido personalizado</p>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-rose-500 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
              href="/productos"
            >
              Ver catálogo
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/60 bg-white/10 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/20 sm:text-sm"
              href="/carrito"
            >
              Ir al carrito
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-3xl border border-rose-100/70 bg-white/85 p-5 shadow-xl shadow-rose-100/30 backdrop-blur sm:grid-cols-3 sm:gap-5 sm:p-6">
          <article className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
            <Heart className="h-5 w-5 text-rose-600" />
            <h2 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-rose-700">Sabor casero</h2>
            <p className="mt-1 text-sm text-slate-600">Recetas tradicionales con textura suave y rellenos equilibrados.</p>
          </article>
          <article className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
            <Timer className="h-5 w-5 text-amber-600" />
            <h2 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-amber-700">Producción fresca</h2>
            <p className="mt-1 text-sm text-slate-600">Preparación reciente para mantener aroma, humedad y sabor intactos.</p>
          </article>
          <article className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50/60 p-4">
            <Sparkles className="h-5 w-5 text-fuchsia-600" />
            <h2 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-fuchsia-700">Presentación cuidada</h2>
            <p className="mt-1 text-sm text-slate-600">Decoraciones limpias para cumpleaños, eventos y celebraciones especiales.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
