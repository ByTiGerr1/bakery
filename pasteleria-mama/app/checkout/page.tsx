'use client';

import { useCartStore } from '@/store/cart-store';
import { sendOrder } from '@/actions/send-order';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  if (!mounted || items.length === 0) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items,
      total,
    };

    const result = await sendOrder(orderData);

    if (result.success) {
      clearCart();
      alert('¡Pedido enviado con éxito! Revisa tu correo.');
      router.push('/');
    } else {
      alert('Hubo un error al enviar el pedido.');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Finalizar Pedido</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Resumen de Compra</h2>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {items.map(item => (
                    <li key={item.id} className="flex justify-between">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total a Pagar</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Tus Datos</h2>
            <div>
            <label className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
                type="tel"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50 transition-colors font-medium"
            >
            {isLoading ? 'Enviando...' : 'Confirmar Pedido'}
            </button>
            <p className="text-xs text-center text-zinc-500">
                Al confirmar, recibirás un correo con los detalles para coordinar el pago y la entrega.
            </p>
        </form>
      </div>
    </div>
  );
}
