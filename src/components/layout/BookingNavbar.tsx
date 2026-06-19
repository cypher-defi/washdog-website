"use client"

import dynamic from "next/dynamic"
import { BookingProvider, useBookingContext } from "@/context/BookingContext"
import { Navbar } from "./Navbar"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

function BookingNavbarContent() {
  const { openModal } = useBookingContext()
  return (
    <>
      <Navbar onBookClick={openModal} />
      <BookingModal />
    </>
  )
}

export function BookingNavbar() {
  return (
    <BookingProvider>
      <BookingNavbarContent />
    </BookingProvider>
  )
}
