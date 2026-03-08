"use client"

import { useState } from "react"

export function NewsletterInline() {
  const [email, setEmail]     = useState("")
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")

    try {
      const res = await fetch("/api/newsletter-signup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus("success")
        setMessage("¡Perfecto! Te llegará la próxima edición el sábado.")
        setEmail("")
      } else {
        throw new Error()
      }
    } catch {
      setStatus("error")
      setMessage("Algo salió mal. Intenta de nuevo.")
    }
  }

  return (
    <aside className="my-10 rounded-2xl border border-primary/8 bg-primary/[0.03] px-7 py-8">
      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-yellow-600 mb-2">
        🐾 Santiago a Cuatro Patas
      </p>
      <h3 className="text-xl font-semibold text-primary tracking-tight mb-1">
        ¿Tienes perro en Santiago?
      </h3>
      <p className="text-primary/55 text-sm font-light mb-5 leading-relaxed">
        Cada sábado: parques, cafés dog-friendly, eventos y tips de cuidado.
        Gratis.
      </p>

      {status === "success" ? (
        <p className="text-green-700 font-medium text-sm">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 px-4 py-3 rounded-full border border-primary/15 bg-white text-sm text-primary placeholder:text-primary/35 focus:outline-none focus:border-primary/40 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-primary hover:bg-accent-blue text-white font-semibold text-xs rounded-full tracking-widest uppercase transition-all disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Suscribirme"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-500 text-xs mt-2">{message}</p>
      )}
    </aside>
  )
}
