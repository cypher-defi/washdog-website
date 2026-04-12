import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Corte de Pelo Canino Santiago | Washdog Ñuñoa",
  description:
    "Corte de pelo profesional para perros en Santiago. Todas las razas, técnica experta y baño incluido. Agenda online — Washdog Ñuñoa.",
  keywords:
    "corte de pelo perros Santiago, corte canino Santiago, estética canina Santiago, peluquero perros Ñuñoa",
  alternates: { canonical: "https://washdog.cl/servicios/corte" },
  openGraph: {
    title: "Corte de Pelo Canino Santiago | Washdog Ñuñoa",
    description:
      "Corte profesional para todas las razas en Washdog Ñuñoa. Baño incluido, atención one-to-one.",
    url: "https://washdog.cl/servicios/corte",
    locale: "es_CL",
    type: "website",
  },
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://washdog.cl" },
    { "@type": "ListItem", position: 2, name: "Servicios", item: "https://washdog.cl/servicios" },
    { "@type": "ListItem", position: 3, name: "Corte de Pelo Canino Santiago", item: "https://washdog.cl/servicios/corte" }
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
