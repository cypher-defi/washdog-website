import { getPlaceRating, getPlaceReviews } from "@/lib/google-places"
import { getAllIssues } from "@/lib/newsletter"
import { FaqJsonLd } from "@/components/FaqJsonLd"
import { ReviewJsonLd } from "@/components/ReviewJsonLd"
import { HomeClient } from "./HomeClient"

export default async function Home() {
  const [{ ratingValue }, reviews] = await Promise.all([
    getPlaceRating(),
    getPlaceReviews(3),
  ])
  const newsletterIssues = getAllIssues()
  return (
    <>
      <FaqJsonLd />
      <ReviewJsonLd />
      <HomeClient rating={ratingValue} reviews={reviews} newsletterIssues={newsletterIssues} />
    </>
  )
}
