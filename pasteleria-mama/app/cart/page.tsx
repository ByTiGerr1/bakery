'use client';

import { useCartStore } from '@/store/cart-store';
import { Trash2, Plus, Minus, CakeSlice } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tu carrito está vacío</h2>
        <p className="text-zinc-500 dark:text-zinc-400">¡Agrega algunas delicias para empezar!</p>
        <Link
          href="/"
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
        >
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Tu Carrito</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-300 dark:text-zinc-600">
                 {/* Placeholder */}
                 <CakeSlice className="h-8 w-8" strokeWidth={1} />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{item.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.category}</p>
                  </div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
            <div className="sticky top-24 p-6 border rounded-lg bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 space-y-4">
                <h2 className="text-xl font-semibold">Resumen</h2>
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <Link
                    href="/checkout"
                    className="w-full block text-center py-3 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 font-medium transition-colors"
                >
                    Continuar Compra
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
