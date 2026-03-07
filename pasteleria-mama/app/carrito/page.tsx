import { Navbar } from "../components/navbar";
import { CartPanel } from "../components/cart-panel";
import { CheckoutForm } from "../components/checkout-form";

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-4xl flex-col px-4 pb-16 pt-36 sm:px-6 sm:pt-32 lg:px-8">
        <section className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-rose-700">Compra online</p>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Carrito y pedido</h1>
            <p className="text-sm text-slate-500">
              Revisa tus postres y confirma tu pedido en un solo paso.
            </p>
          </div>
          <CartPanel />
          <CheckoutForm />
        </section>
      </main>
    </div>
  );
}
