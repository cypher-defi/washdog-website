import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Baño de Perros Santiago | WashDog Ñuñoa",
  description:
    "Baño profesional de perros en Santiago. Shampoo hipoalergénico, secado profesional y atención individual. Agenda online — WashDog Ñuñoa.",
  keywords:
    "baño perros Santiago, baño canino Santiago, lavar perro Santiago, baño hipoalergénico perros Ñuñoa",
  alternates: { canonical: "https://www.washdog.cl/servicios/bano" },
  openGraph: {
    title: "Baño de Perros Santiago | WashDog Ñuñoa",
    description:
      "Baño profesional con shampoo hipoalergénico, secado y atención individual en WashDog Ñuñoa.",
    url: "https://www.washdog.cl/servicios/bano",
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
    { "@type": "ListItem", position: 3, name: "Baño de Perros Santiago", item: "https://www.washdog.cl/servicios/bano" }
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
