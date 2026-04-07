import { getPlaceReviews } from "@/lib/google-places"

/**
 * Emits individual Review schema for the top Google reviews.
 * Backs up the AggregateRating with verifiable review text so AI systems
 * and Google Quality Raters can read actual review content.
 */
export async function ReviewJsonLd() {
  const reviews = await getPlaceReviews(5)

  const reviewSchemas = reviews.map(r => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": "https://www.washdog.cl",
      name: "Washdog",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: r.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Google",
      url: "https://www.google.com",
    },
    reviewBody: r.text,
  }))

  return (
    <>
      {reviewSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
