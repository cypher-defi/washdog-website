import { getServicio } from "@/lib/servicios"

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
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.washdog.cl" },
      { "@type": "ListItem", position: 2, name: "Servicios", item: "https://www.washdog.cl/servicios" },
      { "@type": "ListItem", position: 3, name: servicio?.title ?? "Servicio", item: `https://www.washdog.cl/servicios/${service}` }
    ]
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
