import type { Metadata } from "next"
import Link from "next/link"
import { getAllIssues } from "@/lib/newsletter"
import { StaticNavbar } from "@/components/layout/StaticNavbar"
import { StaticFooter } from "@/components/layout/StaticFooter"
import { NewsletterInline } from "@/components/sections/NewsletterInline"

export const metadata: Metadata = {
  title: "Santiago a Cuatro Patas — Newsletter para dueños de perros en Santiago",
  description:
    "Archivo de la guía semanal para vivir Santiago con tu perro. Lugares dog-friendly, parques, eventos y tips de cuidado canino.",
  alternates: { canonical: "https://www.washdog.cl/newsletter" },
  openGraph: {
    title: "Santiago a Cuatro Patas",
    description: "La guía semanal para vivir Santiago con tu perro.",
    url: "https://www.washdog.cl/newsletter",
    locale: "es_CL",
    type: "website",
    siteName: "Washdog",
  },
}

export default function NewsletterArchivePage() {
  const issues = getAllIssues()

  return (
    <>
      <StaticNavbar />
      <main className="min-h-screen bg-background pt-20">

        {/* Header */}
        <section className="bg-primary py-20 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-yellow-400 mb-4">
            🐾 by WashDog
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            Santiago a Cuatro Patas
          </h1>
          <p className="text-white/60 font-light text-lg mb-8">
            La guía semanal para vivir Santiago con tu perro
          </p>
          <div className="max-w-sm mx-auto px-6">
            <NewsletterInline />
          </div>
        </section>

        {/* Issue list */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6">

            {issues.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-primary/40 text-lg font-light">
                  La primera edición llega este sábado.
                </p>
                <p className="text-primary/30 text-sm mt-2">
                  Suscríbete arriba para no perdértela.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-primary/40 text-sm font-light mb-8">
                  {issues.length} edición{issues.length !== 1 ? "es" : ""} publicadas
                </p>
                {issues.map(issue => (
                  <Link
                    key={issue.slug}
                    href={`/newsletter/${issue.slug}`}
                    className="group flex items-start gap-5 p-5 rounded-2xl border border-primary/8 bg-white hover:border-primary/20 hover:shadow-sm transition-all"
                  >
                    <span className="shrink-0 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-lg font-bold text-primary/30 group-hover:bg-primary group-hover:text-white transition-all">
                      #{issue.issue_number}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-primary tracking-tight group-hover:text-accent-blue transition-colors truncate">
                        {issue.subject_line || issue.title}
                      </h2>
                      <p className="text-primary/50 text-sm font-light mt-0.5 line-clamp-2">
                        {issue.description}
                      </p>
                      <p className="text-primary/30 text-xs mt-2">
                        {issue.commune} ·{" "}
                        {new Date(issue.date).toLocaleDateString("es-CL", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <StaticFooter />
    </>
  )
}
