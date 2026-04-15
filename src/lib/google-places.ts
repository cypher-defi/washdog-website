/**
 * Google Places API — fetch live business rating and reviews at build time.
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

export interface PlaceReview {
  authorName: string
  rating: number
  text: string
}

const FALLBACK_RATING: PlaceRating = { ratingValue: 5.0, reviewCount: 6 }

const FALLBACK_REVIEWS: PlaceReview[] = [
  { authorName: 'Sofía M.', rating: 5, text: 'Increíble trato. Max suele tener miedo al agua, pero aquí salió tranquilo y oliendo delicioso. Definitivamente volveremos.' },
  { authorName: 'Pedro L.', rating: 5, text: 'El corte quedó perfecto. Me encanta que usen productos hipoalergénicos. El lugar se siente muy limpio y profesional.' },
  { authorName: 'Carla B.', rating: 5, text: 'La facilidad para reservar por la web es genial. El lugar es impecable y muy amables. Bruno sale feliz.' },
]

async function fetchPlaceDetails(fields: string) {
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) return null

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}` +
    `&fields=${fields}` +
    `&language=es` +
    `&key=${apiKey}`

  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) return null

  const json = await res.json()
  return json?.result ?? null
}

export async function getPlaceRating(): Promise<PlaceRating> {
  try {
    const result = await fetchPlaceDetails('rating,user_ratings_total')
    if (!result?.rating || !result?.user_ratings_total) return FALLBACK_RATING
    return { ratingValue: result.rating, reviewCount: result.user_ratings_total }
  } catch {
    return FALLBACK_RATING
  }
}

export async function getPlaceReviews(count = 3): Promise<PlaceReview[]> {
  try {
    const result = await fetchPlaceDetails('reviews')
    const raw: Array<{ author_name: string; rating: number; text: string }> =
      result?.reviews ?? []

    if (!raw.length) return FALLBACK_REVIEWS

    // Sort best rating first, then take the requested count
    const sorted = [...raw]
      .filter(r => r.text?.trim())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count)

    if (!sorted.length) return FALLBACK_REVIEWS

    return sorted.map(r => ({
      authorName: r.author_name,
      rating: r.rating,
      text: r.text.trim(),
    }))
  } catch {
    return FALLBACK_REVIEWS
  }
}
