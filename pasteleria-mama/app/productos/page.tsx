import { Truck } from "lucide-react";
import { CatalogHero } from "../components/catalog-hero";
import { Navbar } from "../components/navbar";
import { ProductCard } from "../components/product-card";
import { products } from "../lib/products";

export default function ProductosPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF7F4]">
      {/* Decorative floating elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Leaf shapes */}
        <svg className="absolute left-[5%] top-[42%] h-10 w-10 rotate-[-30deg] text-[#C4A44A]/20" viewBox="0 0 40 40" fill="currentColor"><path d="M20 2C12 8 6 16 4 26c2-6 6-12 10-16C10 16 6 24 4 34c4-8 10-14 16-18C14 22 8 30 6 38c4-6 10-12 14-14" /></svg>
        <svg className="absolute right-[4%] top-[38%] h-12 w-12 rotate-[25deg] text-[#C4A44A]/15" viewBox="0 0 40 40" fill="currentColor"><path d="M20 2C12 8 6 16 4 26c2-6 6-12 10-16C10 16 6 24 4 34c4-8 10-14 16-18C14 22 8 30 6 38c4-6 10-12 14-14" /></svg>
        <svg className="absolute left-[3%] top-[65%] h-8 w-8 rotate-[15deg] text-[#C4A44A]/15" viewBox="0 0 40 40" fill="currentColor"><path d="M20 2C12 8 6 16 4 26c2-6 6-12 10-16C10 16 6 24 4 34c4-8 10-14 16-18" /></svg>
        <svg className="absolute right-[6%] top-[58%] h-9 w-9 rotate-[-20deg] text-[#C4A44A]/18" viewBox="0 0 40 40" fill="currentColor"><path d="M20 2C12 8 6 16 4 26c2-6 6-12 10-16C10 16 6 24 4 34c4-8 10-14 16-18" /></svg>
        <svg className="absolute left-[8%] top-[82%] h-7 w-7 rotate-[40deg] text-[#C4A44A]/12" viewBox="0 0 40 40" fill="currentColor"><path d="M20 2C12 8 6 16 4 26c2-6 6-12 10-16C10 16 6 24 4 34c4-8 10-14 16-18" /></svg>
        <svg className="absolute right-[3%] top-[78%] h-10 w-10 rotate-[-45deg] text-[#C4A44A]/14" viewBox="0 0 40 40" fill="currentColor"><path d="M20 2C12 8 6 16 4 26c2-6 6-12 10-16C10 16 6 24 4 34c4-8 10-14 16-18" /></svg>

        {/* Sparkle dots */}
        <div className="absolute left-[12%] top-[48%] h-1.5 w-1.5 rounded-full bg-[#D4B44A]/30" />
        <div className="absolute right-[10%] top-[44%] h-2 w-2 rounded-full bg-[#D4B44A]/25" />
        <div className="absolute left-[7%] top-[72%] h-1 w-1 rounded-full bg-[#D4B44A]/35" />
        <div className="absolute right-[8%] top-[68%] h-1.5 w-1.5 rounded-full bg-[#D4B44A]/25" />
      </div>

      <Navbar />

      {/* Full-width hero */}
      <div className="relative z-10 pt-[4.5rem] sm:pt-20">
        <CatalogHero />
      </div>

      {/* Products section */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Tortas y postres disponibles
            </h1>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-3 py-2 text-[11px] font-semibold text-rose-700 shadow-sm sm:px-4 sm:text-xs">
              <Truck className="h-4 w-4" /> Entregas coordinadas por correo
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
