"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { calculateTotal, useCartStore } from "../store/cart";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, increment, decrement, removeItem } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = calculateTotal(items);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir carrito"
        onClick={() => setIsOpen(true)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200/80 bg-white/70 text-rose-700 shadow-sm backdrop-blur transition hover:bg-rose-50"
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[70] bg-black/45 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-[100svh] w-full max-w-md flex-col border-l border-rose-100 bg-gradient-to-b from-white via-rose-50/30 to-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Panel lateral del carrito"
      >
        <header className="flex items-center justify-between border-b border-rose-100/80 bg-white/85 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-rose-700" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-500">Pastelería Encina</p>
              <h2 className="text-xl font-semibold text-rose-800">Tu carrito</h2>
            </div>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-rose-500 transition hover:bg-rose-50"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="mt-16 space-y-5 rounded-2xl border border-dashed border-rose-200 bg-white/80 p-6 text-center">
              <p className="text-2xl font-semibold text-rose-800">Tu carrito está vacío.</p>
              <p className="text-sm text-slate-500">Agrega tortas o postres para empezar tu pedido.</p>
              <Link
                href="/productos"
                onClick={() => setIsOpen(false)}
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-rose-700 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-rose-800"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-rose-100 bg-white/90 p-3 shadow-sm"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">${item.price.toFixed(2)} c/u</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Eliminar ${item.name}`}
                      onClick={() => removeItem(item.id)}
                      className="rounded-full p-1.5 text-slate-400 transition hover:bg-white hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1 ring-1 ring-rose-100">
                      <button
                        type="button"
                        aria-label={`Disminuir ${item.name}`}
                        onClick={() => decrement(item.id)}
                        className="rounded-full p-1 text-slate-600 transition hover:bg-rose-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold text-slate-800">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar ${item.name}`}
                        onClick={() => increment(item.id)}
                        className="rounded-full p-1 text-slate-600 transition hover:bg-rose-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-rose-100 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
            <span>Total</span>
            <span className="text-xl font-semibold text-slate-900">${total.toFixed(2)}</span>
          </div>
          <Link
            href="/carrito"
            onClick={() => setIsOpen(false)}
            className="inline-flex w-full min-h-11 items-center justify-center rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-700 hover:to-rose-600"
          >
            Ir a pagar
          </Link>
        </footer>
      </aside>
    </>
  );
}