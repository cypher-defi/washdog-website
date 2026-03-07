import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Peluquería para Gatos Ñuñoa | WashDog",
  description:
    "Peluquería y baño para gatos en Ñuñoa, Santiago. Atención delicada, productos seguros para felinos y agenda online. WashDog — Irarrázaval 2086 B.",
  keywords:
    "peluquería gatos Ñuñoa, baño gatos Santiago, corte pelo gatos Ñuñoa, grooming gatos Santiago",
  alternates: { canonical: "https://www.washdog.cl/servicios/peluqueria-gatos-nunoa" },
  openGraph: {
    title: "Peluquería para Gatos Ñuñoa | WashDog",
    description:
      "Baño y corte delicado para gatos en Ñuñoa. Ambiente tranquilo, productos seguros para felinos.",
    url: "https://www.washdog.cl/servicios/peluqueria-gatos-nunoa",
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
    { "@type": "ListItem", position: 3, name: "Peluquería para Gatos Ñuñoa", item: "https://www.washdog.cl/servicios/peluqueria-gatos-nunoa" }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
