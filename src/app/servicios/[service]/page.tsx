import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllServicios, getServicio } from "@/lib/servicios"
import { getAllIssues } from "@/lib/newsletter"
import { StaticNavbar } from "@/components/layout/StaticNavbar"
import { StaticFooter } from "@/components/layout/StaticFooter"

interface Props {
  params: Promise<{ service: string }>
}

export async function generateStaticParams() {
  return getAllServicios().map(s => ({ service: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params
  const servicio = await getServicio(service)
  if (!servicio) return {}
  return {
    title: servicio.title,
    description: servicio.description,
    keywords: servicio.keywords,
    alternates: { canonical: `https://washdog.cl/servicios/${service}` },
    openGraph: {
      title: servicio.title,
      description: servicio.description,
      url: `https://washdog.cl/servicios/${service}`,
      locale: "es_CL",
      type: "website",
      siteName: "Washdog",
    },
  }
}

export default async function ServicioHubPage({ params }: Props) {
  const { service } = await params
  const servicio = await getServicio(service)
  if (!servicio) notFound()

  const faqSchema = servicio.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicio.faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  } : null

  return (
    <>
      {faqSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <StaticNavbar />
      <main className='min-h-screen bg-background pt-20'>
        {/* Header */}
        <section className='py-16 bg-white border-b border-primary/5'>
          <div className='max-w-3xl mx-auto px-6'>
            <Link
              href='/#servicios'
              className='text-accent-blue hover:underline text-sm mb-8 inline-flex items-center gap-1'
            >
              ← Volver a servicios
            </Link>
            <div className='mt-6 mb-6'>
              <span className='text-xs font-bold uppercase tracking-[0.25em] text-accent-blue'>
                Washdog · Ñuñoa, Santiago
              </span>
            </div>
            <h1 className='text-3xl md:text-4xl font-semibold text-primary mb-4 tracking-tight leading-snug'>
              {servicio.title}
            </h1>
            <p className='text-primary/60 text-lg font-light leading-relaxed'>
              {servicio.description}
            </p>
          </div>
        </section>

        {/* Article content */}
        <section className='py-12'>
          <div className='max-w-3xl mx-auto px-6'>
            <div
              className='prose prose-lg max-w-none text-primary/80
                prose-headings:text-primary prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:font-light prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-primary prose-strong:font-semibold
                prose-ul:pl-6 prose-li:mb-2 prose-li:font-light
                prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
                prose-table:text-sm prose-th:font-semibold prose-th:text-primary prose-td:text-primary/70'
              dangerouslySetInnerHTML={{ __html: servicio.contentHtml }}
            />
          </div>
        </section>

        {/* Related services */}
        {servicio.relatedServices && servicio.relatedServices.length > 0 && (
          <section className='py-12 border-t border-primary/5'>
            <div className='max-w-3xl mx-auto px-6'>
              <h2 className='text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-5'>
                Ver también
              </h2>
              <div className='flex flex-wrap gap-3'>
                {servicio.relatedServices.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary/10 text-sm text-primary/60 hover:border-accent-blue/40 hover:text-accent-blue transition-all bg-white'
                  >
                    {s.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className='py-16 bg-white border-t border-primary/5'>
          <div className='max-w-2xl mx-auto px-6 text-center'>
            <h2 className='text-2xl font-semibold text-primary mb-3 tracking-tight'>
              Agenda tu hora en Washdog
            </h2>
            <p className='text-primary/60 mb-8 font-light'>
              Irarrázaval 2086 B, Ñuñoa · Lunes a domingo 10:00–20:00
            </p>
            <Link
              href='https://share.google/8t1bo1xyYIfTKyDAw'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-blue transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
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
