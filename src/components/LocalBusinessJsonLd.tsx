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
    "@type": "LocalBusiness",
    name: "Washdog",
    image: "https://www.washdog.cl/hero-beagle.png",
    "@id": "https://www.washdog.cl",
    url: "https://www.washdog.cl",
    telephone: "+56987230388",
    email: "contacto@washdog.cl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Irarrázaval 2086 B",
      addressLocality: "Ñuñoa",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.4569,
      longitude: -70.6083
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
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
    sameAs: ["https://share.google/8t1bo1xyYIfTKyDAw"]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
