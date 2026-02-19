import Script from "next/script"

export function LocalBusinessJsonLd() {
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
        opens: "09:00",
        closes: "21:00"
      }
    ],
    priceRange: "$$"
  }

  return (
    <Script
      id='ld-localbusiness'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
