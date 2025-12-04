"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { calculateTotal, useCartStore } from "../store/cart";

export function CartPanel() {
  const { items, increment, decrement, removeItem } = useCartStore();
  const total = calculateTotal(items);

  return (
    <div className="rounded-3xl border border-white/30 bg-white/70 p-6 shadow-lg shadow-rose-100/40 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 pb-4 sm:flex-nowrap">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-700">Carrito vivo</p>
          <p className="text-lg font-semibold text-slate-900">
            {items.length} productos
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-slate-500">
            Aún no hay pedidos. Elige tus favoritos del catálogo para comenzar.
          </p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                {item.name}
              </p>
              <p className="text-xs text-slate-500">
                {item.quantity} x ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
                <button
                  type="button"
                  aria-label={`Disminuir ${item.name}`}
                  onClick={() => decrement(item.id)}
                  className="rounded-full p-1 text-slate-600 transition hover:bg-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-slate-800">
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
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Quitar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-inner sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-200">Total estimado</p>
          <p className="text-2xl font-semibold">${total.toFixed(2)}</p>
        </div>
        <div className="rounded-full bg-white/15 px-4 py-2 text-center text-sm font-semibold">
          Entrega coordinada
        </div>
      </div>
    </div>
  );
}
