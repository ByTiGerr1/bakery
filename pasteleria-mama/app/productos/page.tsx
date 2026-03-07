import { Truck } from "lucide-react";
import { Navbar } from "../components/navbar";
import { ProductCard } from "../components/product-card";
import { products } from "../lib/products";

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-16 pt-36 sm:px-6 sm:pt-32 lg:px-8">
        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-700">Selección Encina</p>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Tortas y postres disponibles</h1>
              <p className="text-sm text-slate-500">
                Selecciona tus productos y agrégalos al carrito.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-rose-700 shadow-sm ring-1 ring-rose-100 sm:px-4 sm:text-xs">
              <Truck className="h-4 w-4" /> Entregas coordinadas por correo
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
