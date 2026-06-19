"use client"

import dynamic from "next/dynamic"
import { BookingProvider, useBookingContext } from "@/context/BookingContext"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

function ServiceBookingCTAContent() {
  const { openModal } = useBookingContext()

  return (
    <>
      {/* CTA section */}
      <section className='py-16 bg-white border-t border-primary/5'>
        <div className='max-w-2xl mx-auto px-6 text-center'>
          <h2 className='text-2xl font-semibold text-primary mb-3 tracking-tight'>
            ¿Listo para darle lo mejor a tu perro?
          </h2>
          <p className='text-primary/60 mb-2 font-light'>
            Irarrázaval 2086 B, Ñuñoa · Lun, Mié–Sáb 10:00–19:00 · Dom 10:00–17:30 · Mar cerrado
          </p>
          <p className='text-primary/40 text-sm mb-8 font-light'>
            Confirmación inmediata · Sin llamadas · Sin cobros sorpresa
          </p>

          <button
            onClick={openModal}
            className='inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-blue transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
          >
            Reservar mi hora
            <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
          </button>

          {/* Trust signals */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 text-xs text-primary/40 font-light'>
            <span>✓ Sin cobros sorpresa</span>
            <span>✓ Cancelación sin costo</span>
            <span>✓ Agenda online 24/7</span>
          </div>
        </div>
      </section>

      {/* Booking modal */}
      <BookingModal />
    </>
  )
}

export function ServiceBookingCTA() {
  return (
    <BookingProvider>
      <ServiceBookingCTAContent />
    </BookingProvider>
  )
}
