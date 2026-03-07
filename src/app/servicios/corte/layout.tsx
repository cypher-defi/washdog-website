import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Corte de Pelo Canino Santiago | WashDog Ñuñoa",
  description:
    "Corte de pelo profesional para perros en Santiago. Todas las razas, técnica experta y baño incluido. Agenda online — WashDog Ñuñoa.",
  keywords:
    "corte de pelo perros Santiago, corte canino Santiago, estética canina Santiago, peluquero perros Ñuñoa",
  alternates: { canonical: "https://www.washdog.cl/servicios/corte" },
  openGraph: {
    title: "Corte de Pelo Canino Santiago | WashDog Ñuñoa",
    description:
      "Corte profesional para todas las razas en WashDog Ñuñoa. Baño incluido, atención one-to-one.",
    url: "https://www.washdog.cl/servicios/corte",
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
    { "@type": "ListItem", position: 3, name: "Corte de Pelo Canino Santiago", item: "https://www.washdog.cl/servicios/corte" }
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
