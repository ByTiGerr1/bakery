'use client';

import Link from 'next/link';
import { ShoppingCart, CakeSlice } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { useState, useEffect } from 'react';

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/95 dark:border-zinc-800">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <CakeSlice className="h-6 w-6 text-pink-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Pastelería Mamá
          </span>
        </Link>
        <Link href="/cart" className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ShoppingCart className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
          {mounted && totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs font-medium text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
