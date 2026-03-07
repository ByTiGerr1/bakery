"use client";

import { Plus, Sparkles } from "lucide-react";
import type { Product } from "../lib/products";
import { useCartStore } from "../store/cart";
import { SafeImage } from "./safe-image";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#F1E2D7] bg-[#FFF9F3] shadow-[0_4px_20px_-8px_rgba(113,64,48,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-8px_rgba(113,64,48,0.35)]">

      {product.featured && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-700 sm:px-3 sm:text-[11px]">
          <Sparkles className="h-3.5 w-3.5" /> Destacada
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EEE4]">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          fallbackClassName="bg-[#F4EEE4]"
          fallbackLabel="Pastelería Encina"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[0.85rem] font-semibold leading-snug text-slate-900 sm:text-base">
            {product.name}
          </h3>
          <p className="shrink-0 text-lg font-bold text-slate-900 sm:text-xl">
            ${product.price}
          </p>
        </div>

        <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
          {product.description}
        </p>

        <div className="mt-auto flex justify-end pt-1.5">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#4A2B29] px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#5A3532] sm:text-xs"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
              <Plus className="h-3 w-3" />
            </span>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
