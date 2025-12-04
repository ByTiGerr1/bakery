"use client";

import Image from "next/image";
import { BadgeCheck, Plus, Sparkles } from "lucide-react";
import type { Product } from "../lib/products";
import { useCartStore } from "../store/cart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-5 shadow-lg shadow-rose-100/40 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100">
      {product.featured && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
          <Sparkles className="h-4 w-4" /> Destacada
        </div>
      )}
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-rose-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600">{product.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100"
              >
                <BadgeCheck className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium text-slate-500">
            {product.servings}
          </p>
        </div>
        <div className="flex flex-col items-start justify-end gap-3 text-left sm:items-end sm:text-right">
          <p className="text-2xl font-semibold text-rose-600">
            ${product.price}
          </p>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
          >
            <Plus className="h-4 w-4" /> Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
