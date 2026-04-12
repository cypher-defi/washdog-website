import type { Metadata } from "next"
import Link from "next/link"
import { StaticNavbar } from "@/components/layout/StaticNavbar"
import { getAllIssues } from "@/lib/newsletter"
import { StaticFooter } from "@/components/layout/StaticFooter"

export const metadata: Metadata = {
  title: "José Pablo — Fundador de Washdog | Peluquería Canina Ñuñoa",
  description:
    "Washdog nació porque su fundador no encontraba un lugar donde bañar bien a sus perros. Atención personalizada, sin empleados, en Ñuñoa.",
  alternates: { canonical: "https://washdog.cl/equipo" },
  openGraph: {
    title: "José Pablo — Fundador de Washdog",
    description:
      "Washdog nació porque su fundador no encontraba un lugar donde bañar bien a sus perros.",
    url: "https://washdog.cl/equipo",
    locale: "es_CL",
    type: "profile",
    siteName: "Washdog",
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://washdog.cl/#jose-pablo",
  name: "José Pablo",
  jobTitle: "Fundador y Peluquero Canino",
  description: "Fundador de Washdog. Dueño de perros y residente de Ñuñoa. Abrió Washdog en febrero de 2026 para ofrecer una atención canina verdaderamente personalizada en Santiago.",
  url: "https://washdog.cl/equipo",
  knowsAbout: [
    "peluquería canina",
    "baño de perros",
    "grooming para razas difíciles",
    "cuidado de mascotas",
    "productos hipoalergénicos para perros",
  ],
  worksFor: {
    "@type": "Organization",
    "@id": "https://washdog.cl",
    name: "Washdog",
    url: "https://washdog.cl",
  },
}

export default function EquipoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <StaticNavbar />
      <main className="min-h-screen bg-background pt-20">

        {/* Header */}
        <section className="py-16 bg-white border-b border-primary/5">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/"
              className="text-accent-blue hover:underline text-sm mb-8 inline-flex items-center gap-1"
            >
              ← Volver al inicio
            </Link>
            <div className="mt-6 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-blue">
                Washdog · Ñuñoa, Santiago
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-4 tracking-tight leading-snug">
              Cada perro que entra a Washdog lo atiendo yo. Siempre.
            </h1>
            <p className="text-primary/60 text-lg font-light leading-relaxed">
              Soy José Pablo, fundador y único dueño de Washdog.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="prose prose-lg max-w-none text-primary/80
              prose-headings:text-primary prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:font-light prose-p:leading-relaxed prose-p:mb-5
              prose-strong:text-primary prose-strong:font-semibold
              prose-ul:pl-6 prose-li:mb-2 prose-li:font-light">

              <p>
                Tengo perros. Vivo en departamento en Ñuñoa. Y durante mucho tiempo busqué un lugar en Santiago
                donde pudiera llevarlos a bañar sin preocuparme — sin preguntarme cómo los estaban tratando,
                si el producto era el adecuado, o si estaban esperando encerrados mientras atendían a diez más.
              </p>
              <p>
                No lo encontré. Así que lo construí yo.
              </p>

              <h2>Lo que eso significa para ti</h2>
              <p>
                Cuando traes a tu perro a Washdog, no lo recibe un empleado con rotación mensual. Lo recibo
                yo — el mismo que empezó esto porque entiendo lo que se siente dejar a tu mascota en manos
                de alguien que no la conoce.
              </p>
              <p>
                <strong>Atención individualizada, sin excepciones.</strong> Tu perro no comparte espacio.
                No espera. Lo que sí tiene es tiempo, calma y alguien que sabe lo que está haciendo porque
                vive con perros y lo hace con cuidado.
              </p>

              <h2>Por qué importa quién lo hace</h2>
              <p>
                Los grandes salones de grooming tienen algo en común: el perro pasa por varias manos,
                en distintos estados de ocupación, entre muchos otros perros. El resultado puede ser bueno.
                Pero la atención raramente es personal.
              </p>
              <p>
                En Washdog no hay empleados que supervisar ni procesos que delegar. Hay un dueño que
                construyó este lugar para sus propios perros — y que lo mantiene para los tuyos.
              </p>
            </div>

            {/* Founder card */}
            <div className="mt-12 p-8 rounded-2xl border border-primary/8 bg-white">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🐾</span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-lg">José Pablo</p>
                  <p className="text-sm text-accent-blue font-medium mb-2">Fundador · Washdog</p>
                  <p className="text-primary/60 font-light text-sm leading-relaxed">
                    Dueño de perros, residente de Ñuñoa. Abrió Washdog en febrero de 2026 porque
                    quería un servicio que él mismo usaría para sus mascotas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white border-t border-primary/5">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold text-primary mb-3 tracking-tight">
              Agenda tu hora en Washdog
            </h2>
            <p className="text-primary/60 mb-8 font-light">
              Irarrázaval 2086 B, Ñuñoa · Lunes a domingo 10:00–20:00
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
