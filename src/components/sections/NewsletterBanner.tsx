"use client"

import { useState } from "react"

export function NewsletterBanner() {
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
        setMessage("¡Listo! Te llegará la próxima edición el sábado.")
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
    <section className="py-20 bg-primary">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Label */}
        <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-yellow-400 mb-4">
          🐾 Santiago a Cuatro Patas
        </span>

        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
          La guía semanal para vivir<br className="hidden md:block" /> Santiago con tu perro
        </h2>

        <p className="text-white/60 font-light mb-2 text-base">
          Cafés dog-friendly · Parques · Eventos · Tips de cuidado
        </p>
        <p className="text-white/40 text-sm font-light mb-8">
          Cada sábado. Gratis. Sin spam.
        </p>

        {status === "success" ? (
          <p className="text-yellow-400 font-medium text-lg">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-primary font-bold text-sm rounded-full tracking-wide transition-all disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Suscribirme gratis"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-3">{message}</p>
        )}

        <p className="text-white/25 text-xs mt-5">
          by Washdog · Ñuñoa, Santiago
        </p>
      </div>
    </section>
  )
}
