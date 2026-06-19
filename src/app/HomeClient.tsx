"use client"

import dynamic from "next/dynamic"
import { BookingProvider, useBookingContext } from "@/context/BookingContext"
import { Navbar, Footer } from "@/components/layout"
import {
  Hero,
  HowItWorks,
  Services,
  Features,
  MidPageCTA,
  Testimonials,
  BeforeAfter,
  EmotiveClose,
  FAQ,
  Contact,
  NewsletterBanner
} from "@/components/sections"
import type { PlaceReview } from "@/lib/google-places"
import type { IssueMeta } from "@/lib/newsletter"
import { FloatingCTA } from "@/components/ui"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

function HomeClientContent({ rating, reviews, newsletterIssues }: { rating: number; reviews: PlaceReview[]; newsletterIssues: IssueMeta[] }) {
  const { openModal } = useBookingContext()

  return (
    <>
      <Navbar onBookClick={openModal} />

      <main className='grow pt-20'>
        <Hero onBookClick={openModal} rating={rating} />
        <HowItWorks />
        <Services onBookClick={openModal} />
        <Features />
        <MidPageCTA onBookClick={openModal} rating={rating} />
        <Testimonials reviews={reviews} />
        <BeforeAfter />
        <NewsletterBanner />
        <FAQ />
        <EmotiveClose onBookClick={openModal} rating={rating} />
        <Contact />
      </main>

      <Footer onBookClick={openModal} newsletterIssues={newsletterIssues} />

      <FloatingCTA onClick={openModal} />

      <BookingModal />
    </>
  )
}

export function HomeClient({ rating, reviews, newsletterIssues }: { rating: number; reviews: PlaceReview[]; newsletterIssues: IssueMeta[] }) {
  return (
    <BookingProvider>
      <HomeClientContent rating={rating} reviews={reviews} newsletterIssues={newsletterIssues} />
    </BookingProvider>
  )
}
