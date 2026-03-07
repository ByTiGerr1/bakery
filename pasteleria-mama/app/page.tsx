import Image from "next/image";
import { Navbar } from "./components/navbar";

export default function Home() {
  const heroImageUrl =
    "https://res.cloudinary.com/dzue1np85/image/upload/v1764863080/IMG_1985_dhtnzs.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <Navbar />
      <section
        className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-slate-950 text-white"
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

        <div className="relative z-10 flex flex-col items-center px-4 pb-16 pt-40 text-center sm:px-6 sm:pt-36 md:pt-32 lg:px-8">
          <h1 className="max-w-4xl text-balance text-2xl font-black uppercase leading-tight tracking-[0.12em] sm:text-4xl sm:tracking-[0.16em] md:text-5xl lg:text-6xl">
            Pasteles artesanales para tus celebraciones
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-sm font-medium uppercase tracking-[0.1em] text-white/85 sm:mt-6 sm:text-lg sm:tracking-[0.16em]">
            Elige tu favorito, arma tu pedido y coordinamos entrega por correo.
          </p>
          <div className="mt-10 w-full max-w-lg">
            <a
              className="inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.22em]"
              href="/productos"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
