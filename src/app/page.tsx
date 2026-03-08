import { getPlaceRating, getPlaceReviews } from "@/lib/google-places"
import { HomeClient } from "./HomeClient"

export default async function Home() {
  const [{ ratingValue }, reviews] = await Promise.all([
    getPlaceRating(),
    getPlaceReviews(3),
  ])
  return <HomeClient rating={ratingValue} reviews={reviews} />
}
