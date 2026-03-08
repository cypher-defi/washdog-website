import { getPlaceRating } from "@/lib/google-places"
import { HomeClient } from "./HomeClient"

export default async function Home() {
  const { ratingValue } = await getPlaceRating()
  return <HomeClient rating={ratingValue} />
}
