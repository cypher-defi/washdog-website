import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auto Lavado de Perros Ñuñoa | Washdog",
  description:
    "Auto lavado de perros en Ñuñoa, Santiago. Lava a tu perro tú mismo con nuestras instalaciones profesionales — tinas equipadas, secadores y productos premium.",
  keywords:
    "auto lavado perros Ñuñoa, self service perros Ñuñoa, lavar perro yo mismo Santiago, auto baño perros Ñuñoa",
  alternates: { canonical: "https://washdog.cl/servicios/auto-lavado-perros-nunoa" },
  openGraph: {
    title: "Auto Lavado de Perros Ñuñoa | Washdog",
    description:
      "Lava a tu perro tú mismo con nuestras tinas profesionales en Ñuñoa. Shampoo, secadora y todo el equipamiento incluido.",
    url: "https://washdog.cl/servicios/auto-lavado-perros-nunoa",
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
    { "@type": "ListItem", position: 3, name: "Auto Lavado de Perros Ñuñoa", item: "https://washdog.cl/servicios/auto-lavado-perros-nunoa" }
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
