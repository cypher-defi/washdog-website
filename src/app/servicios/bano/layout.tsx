import type { Metadata } from "next"
import { ServiceJsonLd } from "@/components/ServiceJsonLd"

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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Baño de perros en Ñuñoa",
  serviceType: "Baño para Perros",
  description: "Baño profesional con shampoo hipoalergénico, secado delicado y atención individual para perros en Ñuñoa, Santiago.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://www.washdog.cl",
    name: "WashDog",
    url: "https://www.washdog.cl",
  },
  areaServed: {
    "@type": "City",
    name: "Ñuñoa",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Región Metropolitana",
      containedInPlace: { "@type": "Country", name: "Chile" },
    },
  },
  offers: [
    {
      "@type": "Offer",
      name: "Baño perro hasta 20 kg",
      price: "10000",
      priceCurrency: "CLP",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "10000",
        priceCurrency: "CLP",
        minPrice: "10000",
        maxPrice: "10000",
      },
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Baño perro más de 20 kg",
      price: "16000",
      priceCurrency: "CLP",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "16000",
        priceCurrency: "CLP",
        minPrice: "16000",
        maxPrice: "16000",
      },
      availability: "https://schema.org/InStock",
    },
  ],
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
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ServiceJsonLd slug="bano-perros" />
      {children}
    </>
  )
}
