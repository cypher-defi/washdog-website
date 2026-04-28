import type { Metadata } from "next"
import Link from "next/link"
import { StaticNavbar } from "@/components/layout/StaticNavbar"
import { getAllIssues } from "@/lib/newsletter"
import { StaticFooter } from "@/components/layout/StaticFooter"

export const metadata: Metadata = {
  title: "Servicios de Peluquería Canina | Washdog Ñuñoa",
  description:
    "Baño, corte, auto-lavado y peluquería para gatos en Ñuñoa, Santiago. Atención personalizada con productos hipoalergénicos. Reserva online.",
  alternates: { canonical: "https://www.washdog.cl/servicios" },
  openGraph: {
    title: "Servicios de Peluquería Canina | Washdog Ñuñoa",
    description:
      "Baño, corte, auto-lavado y peluquería para gatos en Ñuñoa, Santiago.",
    url: "https://www.washdog.cl/servicios",
    locale: "es_CL",
    type: "website",
    siteName: "Washdog",
  },
}

const services = [
  {
    href: "/servicios/bano",
    emoji: "🚿",
    title: "Baño de Perros",
    description:
      "Baño profundo con shampoo hipoalergénico, secado profesional, limpieza de oídos y perfumado final. Sin jaulas, sin esperas.",
  },
  {
    href: "/servicios/corte",
    emoji: "✂️",
    title: "Corte y Arreglo",
    description:
      "Corte personalizado según raza, baño incluido, lima de uñas y foto del resultado por WhatsApp antes de que lo retires.",
  },
  {
    href: "/servicios/auto-lavado-perros-nunoa",
    emoji: "🪣",
    title: "Auto-Lavado",
    description:
      "Báñalo tú mismo con nuestras instalaciones: bañera elevada, secador profesional, shampoos y toallas. Sin los problemas de bañarlo en casa.",
  },
  {
    href: "/servicios/peluqueria-gatos-nunoa",
    emoji: "🐱",
    title: "Peluquería para Gatos",
    description:
      "Baño y corte especializado para gatos, con manejo suave y productos específicos para su piel y pelaje.",
  },
  {
    href: "/servicios/peluqueria-canina-nunoa",
    emoji: "🐾",
    title: "Peluquería Canina Ñuñoa",
    description:
      "Servicio completo de grooming en el corazón de Ñuñoa — a minutos de Providencia, Macul y La Reina.",
  },
  {
    href: "/servicios/precio-peluqueria-nunoa",
    emoji: "💰",
    title: "Precios",
    description:
      "Precios claros, sin cobros sorpresa. Consulta el detalle por tamaño y tipo de servicio.",
  },
]

const comunas = [
  { label: "Ñuñoa", bano: "/servicios/bano-perros-nunoa", corte: "/servicios/corte-perros-nunoa" },
  { label: "Providencia", bano: "/servicios/bano-perros-providencia", corte: "/servicios/corte-perros-providencia" },
  { label: "Las Condes", bano: "/servicios/bano-perros-las-condes", corte: "/servicios/corte-perros-las-condes" },
  { label: "Macul", bano: "/servicios/bano-perros-macul", corte: "/servicios/corte-perros-macul" },
  { label: "La Reina", bano: "/servicios/bano-perros-la-reina", corte: "/servicios/corte-perros-la-reina" },
  { label: "La Florida", bano: "/servicios/bano-perros-la-florida", corte: "/servicios/corte-perros-la-florida" },
  { label: "San Miguel", bano: "/servicios/bano-perros-san-miguel", corte: "/servicios/corte-perros-san-miguel" },
  { label: "Peñalolén", bano: "/servicios/bano-perros-penalolen", corte: "/servicios/corte-perros-penalolen" },
]

export default function ServiciosPage() {
  return (
    <>
      <StaticNavbar />
      <main className="min-h-screen bg-background pt-20">

        {/* Header */}
        <section className="py-16 bg-white border-b border-primary/5">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-blue">
                Washdog · Ñuñoa, Santiago
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-4 tracking-tight leading-snug">
              Servicios de peluquería canina en Ñuñoa
            </h1>
            <p className="text-primary/60 text-lg font-light leading-relaxed">
              Baño, corte y auto-lavado con atención personalizada. Productos hipoalergénicos, sin jaulas, sin esperas. Abierto lunes, miércoles a sábado 10:00–19:00 · domingos hasta 17:30 · cerrado martes.
            </p>
          </div>
        </section>

        {/* Service cards */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group p-6 rounded-2xl border border-primary/8 bg-white hover:border-accent-blue/30 hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-3">{s.emoji}</div>
                  <h2 className="font-semibold text-primary mb-2 group-hover:text-accent-blue transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm text-primary/60 font-light leading-relaxed">
                    {s.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* By commune */}
        <section className="py-12 border-t border-primary/5">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-6">
              Por comuna
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {comunas.map(c => (
                <div key={c.label} className="flex items-center justify-between p-4 rounded-xl border border-primary/8 bg-white">
                  <span className="font-medium text-primary text-sm">{c.label}</span>
                  <div className="flex gap-2">
                    <Link href={c.bano} className="text-xs text-accent-blue hover:underline">Baño</Link>
                    <span className="text-primary/20">·</span>
                    <Link href={c.corte} className="text-xs text-accent-blue hover:underline">Corte</Link>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/#servicios"
              className="inline-flex items-center gap-1 mt-6 text-sm text-accent-blue hover:underline"
            >
              Ver todas las comunas →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white border-t border-primary/5">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold text-primary mb-3 tracking-tight">
              Agenda tu hora en Washdog
            </h2>
            <p className="text-primary/60 mb-8 font-light">
              Irarrázaval 2086 B, Ñuñoa · Lun, Mié–Sáb 10:00–19:00 · Dom 10:00–17:30 · Mar cerrado
            </p>
            <Link
              href="https://share.google/8t1bo1xyYIfTKyDAw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-blue transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            >
              Reservar a través de Google Maps
            </Link>
          </div>
        </section>
      </main>
      <StaticFooter newsletterIssues={getAllIssues()} />
    </>
  )
}
