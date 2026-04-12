import { getPlaceRating } from "@/lib/google-places"

/**
 * LocalBusiness JSON-LD — async server component.
 * Fetches live Google rating at build time (revalidated every 24 h via ISR).
 * Falls back to last-known values if the Places API is unavailable.
 *
 * Uses a plain <script> tag (not next/script) so the JSON-LD is in the
 * initial HTML — readable by view-source, Rich Results Test, and crawlers
 * without JS execution.
 */
export async function LocalBusinessJsonLd() {
  const { ratingValue, reviewCount } = await getPlaceRating()

  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AnimalGroomer"],
    name: "Washdog",
    description: "Peluquería canina premium en Ñuñoa, Santiago, Chile. Baño, corte, auto lavado y peluquería para gatos. Atención one-to-one, productos hipoalergénicos y reserva online en 2 minutos.",
    image: "https://washdog.cl/hero-beagle.png",
    logo: {
      "@type": "ImageObject",
      url: "https://washdog.cl/washdog-social.png",
      width: 400,
      height: 400
    },
    foundingDate: "2026-02-01",
    "@id": "https://washdog.cl",
    url: "https://washdog.cl",
    telephone: "+56987230388",
    email: "contacto@washdog.cl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Irarrázaval 2086 B",
      addressLocality: "Ñuñoa",
      addressRegion: "Región Metropolitana",
      postalCode: "7750000",
      addressCountry: "CL"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.4569,
      longitude: -70.6083
    },
    areaServed: [
      { "@type": "City", name: "Ñuñoa", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "Providencia", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "Las Condes", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "La Reina", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "Macul", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "Peñalolén", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "La Florida", containedInPlace: { "@type": "Country", name: "Chile" } },
      { "@type": "City", name: "Santiago", containedInPlace: { "@type": "Country", name: "Chile" } },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de peluquería canina",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Baño para perros" },
          price: "10000",
          priceCurrency: "CLP",
          description: "Baño completo con shampoo hipoalergénico, secado profesional y perfume. Desde $10.000 CLP."
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Peluquería canina completa" },
          price: "20000",
          priceCurrency: "CLP",
          description: "Baño, brushing, corte, limpieza de orejas y corte de uñas. Desde $20.000 CLP."
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Auto lavado de perros" },
          price: "10000",
          priceCurrency: "CLP",
          description: "Tinas profesionales, shampoo hipoalergénico y secadores de alta potencia para que bañes a tu perro. Desde $10.000 CLP."
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Peluquería para gatos" },
          price: "40000",
          priceCurrency: "CLP",
          description: "Baño y corte para gatos. $40.000 CLP."
        }
      ]
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        opens: "10:00",
        closes: "20:00"
      }
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount,
    },
    sameAs: [
      "https://maps.app.goo.gl/iLdYp1eLbXb6YfScA",
      "https://www.instagram.com/washdogexpress",
      "https://www.facebook.com/washdogexpress",
      "https://www.tiktok.com/@washdogexpress",
      "https://www.youtube.com/@washdogexpress",
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
