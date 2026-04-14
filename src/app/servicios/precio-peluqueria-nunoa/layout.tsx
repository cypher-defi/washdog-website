import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Precio Peluquería Canina Ñuñoa | Washdog",
  description:
    "Precios de peluquería canina en Ñuñoa 2026. Tarifas por tamaño y servicio — baño, corte y spa. Sin cobros ocultos. Washdog Ñuñoa.",
  keywords:
    "precio peluquería canina Ñuñoa, cuánto cuesta peluquería perros Ñuñoa, tarifa baño perros Ñuñoa, costo grooming perros Santiago",
  alternates: { canonical: "https://www.washdog.cl/servicios/precio-peluqueria-nunoa" },
  openGraph: {
    title: "Precio Peluquería Canina Ñuñoa | Washdog",
    description:
      "Tarifas claras por tamaño y servicio. Baño, corte y spa canino en Ñuñoa — sin sorpresas en el precio.",
    url: "https://www.washdog.cl/servicios/precio-peluqueria-nunoa",
    locale: "es_CL",
    type: "website",
  },
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.washdog.cl" },
    { "@type": "ListItem", position: 2, name: "Servicios", item: "https://www.washdog.cl/servicios" },
    { "@type": "ListItem", position: 3, name: "Precio Peluquería Canina Ñuñoa", item: "https://www.washdog.cl/servicios/precio-peluqueria-nunoa" }
  ]
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
