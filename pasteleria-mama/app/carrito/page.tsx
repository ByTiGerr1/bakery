import { Navbar } from "../components/navbar";
import { CartPanel } from "../components/cart-panel";
import { CheckoutForm } from "../components/checkout-form";

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-[#FFF8F1] to-[#FFFDF8]">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-36 sm:px-6 sm:pt-32 lg:px-8">
        <section className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose-700">Compra online</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">Carrito y pedido</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Revisa tus postres y confirma tu pedido en un solo paso.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <CartPanel />
            <div className="lg:sticky lg:top-32">
              <CheckoutForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
