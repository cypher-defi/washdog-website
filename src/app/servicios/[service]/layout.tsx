import { getServicio } from "@/lib/servicios"
import { ServiceJsonLd } from "@/components/ServiceJsonLd"

interface Props {
  children: React.ReactNode
  params: Promise<{ service: string }>
}

export default async function ServiceSlugLayout({ children, params }: Props) {
  const { service } = await params
  const servicio = await getServicio(service)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://washdog.cl" },
      { "@type": "ListItem", position: 2, name: "Servicios", item: "https://washdog.cl/servicios" },
      { "@type": "ListItem", position: 3, name: servicio?.title ?? "Servicio", item: `https://washdog.cl/servicios/${service}` }
    ]
  }

  // Page-specific FAQs extracted from the markdown content
  const pageFaqSchema = servicio?.faqs && servicio.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: servicio.faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceJsonLd slug={service} />
      {pageFaqSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqSchema) }}
        />
      )}
      {children}
    </>
  )
}
