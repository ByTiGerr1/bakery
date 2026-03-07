"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { calculateTotal, useCartStore } from "../store/cart";

export function CartPanel() {
  const { items, increment, decrement, removeItem } = useCartStore();
  const totalItems = items.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const total = calculateTotal(items);

  return (
    <section className="rounded-3xl border border-rose-100/70 bg-white/90 p-4 shadow-xl shadow-rose-100/30 backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">Tu pedido</p>
            <p className="text-lg font-semibold text-slate-900 sm:text-xl">Resumen del carrito</p>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 px-3 py-2 text-right">
          <p className="text-xs font-medium text-rose-700">Artículos</p>
          <p className="text-base font-semibold text-slate-900">{totalItems}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-10 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Aún no hay productos en tu carrito</p>
            <p className="mt-1 text-sm text-slate-500">
              Elige tus favoritos del catálogo para comenzar tu pedido.
            </p>
          </div>
        )}

        {items.map((item) => {
          const itemSubtotal = item.price * item.quantity;

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-100 bg-white px-3 py-3 shadow-sm shadow-slate-100/40 sm:px-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">${item.price.toFixed(2)} c/u</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">${itemSubtotal.toFixed(2)}</p>
              </div>

              <div className="mt-3 flex flex-row items-center justify-between gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  <button
                    type="button"
                    aria-label={`Disminuir ${item.name}`}
                    onClick={() => decrement(item.id)}
                    className="rounded-full p-1 text-slate-600 transition hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-5 text-center text-sm font-semibold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Aumentar ${item.name}`}
                    onClick={() => increment(item.id)}
                    className="rounded-full p-1 text-slate-600 transition hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label={`Eliminar ${item.name}`}
                  onClick={() => removeItem(item.id)}
                  className="inline-flex min-h-10 items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Quitar</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl bg-slate-900 px-4 py-4 text-white shadow-inner sm:grid-cols-2 sm:items-center sm:px-5">
        <div>
          <p className="text-sm text-slate-200">Total del pedido</p>
          <p className="text-xl font-semibold sm:text-2xl">${total.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-slate-100 sm:text-right">
          Confirmación y coordinación por correo
        </div>
      </div>
    </section>
  );
}
