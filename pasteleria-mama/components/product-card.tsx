'use client';

// import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cart-store';
import { Plus, CakeSlice } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-600">
           {/* Placeholder for images since we don't have real ones yet */}
           <CakeSlice className="h-20 w-20" strokeWidth={1} />
        </div>
        {/*
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        */}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <div className="flex justify-between items-start">
           <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{product.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.category}</p>
           </div>
           <p className="font-bold text-zinc-900 dark:text-zinc-50">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 flex-1">
          {product.description}
        </p>
        <button
          onClick={handleAddToCart}
          className={`mt-4 flex w-full items-center justify-center space-x-2 rounded-md py-2 text-sm font-medium transition-colors ${
            isAdded
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
          }`}
        >
          {isAdded ? (
            <span>¡Agregado!</span>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Agregar al Carrito</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
