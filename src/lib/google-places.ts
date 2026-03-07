/**
 * Google Places API — fetch live business rating at build time.
 *
 * Uses Next.js fetch caching with `revalidate: 86400` (24 h) so Vercel
 * refreshes the data once per day without a full redeploy.
 *
 * Falls back to safe defaults if the API is unavailable so a missing key
 * never crashes the build.
 */

export interface PlaceRating {
  ratingValue: number
  reviewCount: number
}

const FALLBACK: PlaceRating = { ratingValue: 5.0, reviewCount: 6 }

export async function getPlaceRating(): Promise<PlaceRating> {
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) return FALLBACK

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=rating,user_ratings_total` +
      `&key=${apiKey}`

    const res = await fetch(url, {
      next: { revalidate: 86400 }, // revalidate once per day
    })

    if (!res.ok) return FALLBACK

    const json = await res.json()
    const result = json?.result

    if (!result?.rating || !result?.user_ratings_total) return FALLBACK

    return {
      ratingValue: result.rating,
      reviewCount: result.user_ratings_total,
    }
  } catch {
    return FALLBACK
  }
}
