"use client"

import { useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { useBooking } from "@/hooks/useBooking"
import dynamic from "next/dynamic"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

export function StaticNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const booking = useBooking()

  return (
    <nav className='fixed top-0 w-full z-50 glass transition-all duration-300'>
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative'>
        <Link
          href='/'
          className='group flex items-center gap-3 hover:opacity-80 transition-opacity'
        >
          <span className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-md shadow-primary/10'>
            <Icon icon='lucide:dog' className='w-4 h-4' />
          </span>
          <span className='font-serif font-medium text-2xl tracking-tight text-primary'>
            Wash<span className='text-accent-blue-text'>dog.</span>
          </span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          {[
            { href: "/#nuestra-forma", label: "Nuestro Cuidado" },
            { href: "/#servicios", label: "Servicios" },
            { href: "/blog", label: "Blog" }
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='text-xs font-medium uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors relative group'
            >
              {link.label}
              <span className='absolute -bottom-1 left-0 w-0 h-px bg-accent-blue transition-all duration-300 group-hover:w-full' />
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <button
            onClick={booking.openModal}
            className='hidden md:flex items-center gap-2 bg-primary text-white text-xs font-medium px-6 py-3 rounded-full hover:bg-accent-blue transition-all tracking-wide shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-0.5'
          >
            <Icon icon='lucide:calendar' className='w-4 h-4' />
            Reservar hora
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 text-primary active:bg-black/5 rounded-lg'
            aria-label='Toggle menu'
          >
            <Icon
              icon={isMenuOpen ? "lucide:x" : "lucide:menu"}
              className='w-6 h-6 transition-transform duration-300'
            />
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-xl md:hidden z-40 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className='flex flex-col p-6 gap-2'>
          {[
            { href: "/#nuestra-forma", label: "Nuestro Cuidado" },
            { href: "/#servicios", label: "Servicios" },
            { href: "/blog", label: "Blog" }
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className='text-sm font-medium uppercase tracking-widest text-primary/70 hover:text-primary hover:bg-black/5 py-3 px-4 rounded-lg transition-colors'
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              booking.openModal()
              setIsMenuOpen(false)
            }}
            className='flex items-center justify-center gap-2 bg-accent-blue text-white text-sm font-medium px-6 py-4 rounded-xl mt-4 w-full active:scale-95 transition-transform'
          >
            Reservar hora
          </button>
        </div>
      </div>

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
    </nav>
  )
}
