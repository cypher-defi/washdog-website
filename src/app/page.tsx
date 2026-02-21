"use client"

import dynamic from "next/dynamic"
import { Navbar, Footer } from "@/components/layout"
import {
  Hero,
  HowItWorks,
  Services,
  Features,
  Testimonials,
  FAQ,
  Contact
} from "@/components/sections"
import { FloatingCTA } from "@/components/ui"
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd"
import { useBooking } from "@/hooks/useBooking"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

export default function Home() {
  const booking = useBooking()

  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar onBookClick={booking.openModal} />

      <main className='grow pt-20'>
        <Hero onBookClick={booking.openModal} />
        <HowItWorks />
        <Services onBookClick={booking.openModal} />
        <Features />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer onBookClick={booking.openModal} />

      <FloatingCTA onClick={booking.openModal} />

      <BookingModal
        isOpen={booking.isOpen}
        onClose={booking.closeModal}
        state={booking.state}
        isSuccess={booking.isSuccess}
        onSelectService={booking.selectService}
        onSelectDogSize={booking.selectDogSize}
        onSelectCoatType={booking.selectCoatType}
        onSelectDate={booking.selectDate}
        onSelectTime={booking.selectTime}
        onReset={booking.resetBooking}
        onGoBackToSize={booking.goBackToSize}
        onGoBackToCoat={booking.goBackToCoat}
        onSubmit={booking.submitBooking}
        canSubmit={booking.canSubmit}
        summary={booking.summary}
        name={booking.name}
        phoneNumber={booking.phoneNumber}
        email={booking.email}
        dogName={booking.dogName}
        onChangeName={booking.setName}
        onChangePhoneNumber={booking.setPhoneNumber}
        onChangeEmail={booking.setEmail}
        onChangeDogName={booking.setDogName}
      />
    </>
  )
}
