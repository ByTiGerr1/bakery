"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mail, SendHorizonal } from "lucide-react";
import { calculateTotal, useCartStore } from "../store/cart";

export function CheckoutForm() {
  const { items, clearCart } = useCartStore();
  const total = useMemo(() => calculateTotal(items), [items]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      setStatus("error");
      setMessage("Agrega al menos un producto antes de enviar el pedido.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, notes },
          items,
          total,
        }),
      });

      const payload = (await response.json()) as { message: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.message || "No pudimos enviar el pedido.");
        return;
      }

      setStatus("success");
      setMessage(
        "Pedido enviado. Revisaremos tu correo para coordinar entrega."
      );
      clearCart();
      setName("");
      setEmail("");
      setNotes("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Ocurrió un error. Intenta nuevamente en unos minutos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/30 bg-white/70 p-6 shadow-lg shadow-rose-100/40 backdrop-blur"
    >
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            Checkout simplificado
          </p>
          <p className="text-lg font-semibold text-slate-900">
            Envía el pedido por correo
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Nombre
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="¿Para quién preparamos las tortas?"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Correo electrónico
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Te enviaremos la confirmación"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
        Preferencias o detalles de entrega
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Ej: sin nueces, entregar el sábado por la mañana, acompañar con vela de cumpleaños."
          className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-100">
        <p className="font-semibold text-slate-900">Resumen breve</p>
        <div className="flex items-center justify-between">
          <span>Artículos</span>
          <span className="font-semibold">{items.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total estimado</span>
          <span className="font-semibold text-rose-700">
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Coordinamos pago y entrega por correo o WhatsApp para mantener el
          proceso sencillo.
        </p>
      </div>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            status === "success" ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <SendHorizonal className="h-4 w-4" />
        {status === "loading" ? "Enviando pedido..." : "Enviar pedido"}
      </button>
    </form>
  );
}
