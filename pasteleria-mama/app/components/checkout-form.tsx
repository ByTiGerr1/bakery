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
  const [website, setWebsite] = useState("");
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

    if (name.trim().length < 2) {
      setStatus("error");
      setMessage("Ingresa un nombre válido para confirmar el pedido.");
      return;
    }

    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Ingresa un correo válido para continuar.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, notes, website },
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
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
      setWebsite("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Ocurrió un error. Intenta nuevamente en unos minutos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-emerald-100/80 bg-white/90 p-4 shadow-xl shadow-rose-100/20 backdrop-blur sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Finalizar pedido
            </p>
            <p className="text-base font-semibold text-slate-900 sm:text-lg">
              Confirmación por correo
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          Respuesta rápida
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Nombre
          <input
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
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
            maxLength={120}
            autoComplete="email"
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
          maxLength={500}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Ej: sin nueces, entregar el sábado por la mañana, acompañar con vela de cumpleaños."
          className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </label>

      <label className="hidden" aria-hidden="true" tabIndex={-1}>
        Sitio web
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-4">
        <p className="text-sm font-semibold text-slate-900">Resumen breve</p>
        <div className="mt-3 grid gap-2 text-sm text-slate-700">
          <div className="flex items-center justify-between gap-2">
            <span>Productos distintos</span>
            <span className="font-semibold text-slate-900">{items.length}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Total estimado</span>
            <span className="text-base font-semibold text-rose-700">${total.toFixed(2)}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Te responderemos por correo para confirmar pago y entrega.
        </p>
      </div>

      {message && (
        <p
          className={`mt-4 rounded-xl border px-3 py-2 text-sm font-medium ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <SendHorizonal className="h-4 w-4" />
        {status === "loading" ? "Enviando pedido..." : "Enviar pedido"}
      </button>
    </form>
  );
}
