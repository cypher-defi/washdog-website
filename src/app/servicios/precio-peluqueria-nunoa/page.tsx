"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { Navbar } from "@/components/layout"
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd"
import { useBooking } from "@/hooks/useBooking"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

const bathPricing = [
  { label: "Hasta 20 kg", price: "$10.000" },
  { label: "Más de 20 kg", price: "$16.000" }
]

const cutPricing = [
  { label: "Toy", short: "$15.000", long: "$20.000" },
  { label: "Pequeño", short: "$18.000", long: "$25.000" },
  { label: "Mediano", short: "$22.000", long: "$30.000" },
  { label: "Grande", short: "$30.000", long: "$35.000" },
  { label: "Gigante", short: "$38.000", long: "$50.000" },
  { label: "Gato", short: "$30.000", long: "—" }
]

const faqs = [
  {
    q: "¿Los precios incluyen IVA?",
    a: "Sí, todos los precios mostrados son el valor final a pagar. No hay cobros adicionales."
  },
  {
    q: "¿El corte incluye el baño?",
    a: "Sí. El servicio de corte y arreglo incluye baño con shampoo hipoalergénico, brushing, corte y limpieza de orejas."
  },
  {
    q: "¿Cómo se determina el tamaño de mi perro?",
    a: "Toy: hasta 3 kg. Pequeño: 3–10 kg. Mediano: 10–20 kg. Grande: 20–35 kg. Gigante: más de 35 kg. Si tienes dudas, cuéntanos la raza y el peso al reservar."
  },
  {
    q: "¿Aceptan reservas por WhatsApp?",
    a: "Puedes reservar directamente desde nuestra web o escribirnos por WhatsApp al +56 9 8723 0388."
  }
]

export default function PrecioPeluqueriaNunoaPage() {
  const booking = useBooking()

  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar onBookClick={booking.openModal} />
      <main className='min-h-screen bg-background pt-20'>
        {/* Hero */}
        <section className='py-20 bg-white border-b border-primary/5'>
          <div className='max-w-4xl mx-auto px-6'>
            <Link
              href='/'
              className='text-accent-blue hover:underline text-sm mb-8 inline-flex items-center gap-1'
            >
              ← Volver al inicio
            </Link>
            <div className='mt-6 mb-6'>
              <span className='text-xs font-bold uppercase tracking-[0.25em] text-accent-blue'>
                Ñuñoa, Santiago
              </span>
            </div>
            <h1 className='text-4xl md:text-5xl font-semibold text-primary mb-6 tracking-tight leading-snug'>
              Precio peluquería canina<br />
              <span className='text-accent-blue'>en Ñuñoa</span>
            </h1>
            <p className='text-primary/60 text-lg font-light leading-relaxed max-w-2xl mb-8'>
              Precios transparentes para baño y peluquería de perros y gatos en Ñuñoa.
              Sin sorpresas ni cobros ocultos. Todos los servicios incluyen atención individual.
            </p>
            <button
              onClick={booking.openModal}
              className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-blue transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
            >
              <Icon icon='lucide:calendar' className='w-4 h-4' />
              Reservar hora
            </button>
          </div>
        </section>

        {/* Bath pricing */}
        <section className='py-16'>
          <div className='max-w-4xl mx-auto px-6'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='w-10 h-10 rounded-xl border border-accent-blue/30 flex items-center justify-center text-accent-blue bg-accent-blue/5'>
                <Icon icon='lucide:bath' className='w-5 h-5' />
              </span>
              <h2 className='text-2xl font-semibold text-primary tracking-tight'>Baño suave</h2>
            </div>
            <p className='text-primary/50 text-sm font-light mb-6'>Incluye shampoo hipoalergénico y secado. Duración: 15–30 min.</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg'>
              {bathPricing.map((item, i) => (
                <div
                  key={i}
                  className='bg-accent-blue/5 border border-accent-blue/20 rounded-4xl p-6 text-center'
                >
                  <p className='text-xs font-bold uppercase tracking-widest text-primary/50 mb-2'>
                    {item.label}
                  </p>
                  <p className='text-3xl font-semibold text-accent-blue tracking-tight'>
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cut pricing */}
        <section className='py-16 bg-white border-t border-b border-primary/5'>
          <div className='max-w-4xl mx-auto px-6'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='w-10 h-10 rounded-xl border border-accent-peach/40 flex items-center justify-center text-accent-peach-dark bg-accent-peach/10'>
                <Icon icon='lucide:scissors' className='w-5 h-5' />
              </span>
              <h2 className='text-2xl font-semibold text-primary tracking-tight'>Corte y arreglo</h2>
            </div>
            <p className='text-primary/50 text-sm font-light mb-6'>Incluye baño, brushing, corte y limpieza de orejas. Duración: 1–2 hrs.</p>
            <div className='bg-white border border-accent-peach/20 rounded-4xl overflow-hidden max-w-lg'>
              <div className='grid grid-cols-3 bg-accent-peach/10 px-6 py-3'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-primary/50'>Tamaño</span>
                <span className='text-[10px] font-bold uppercase tracking-widest text-primary/50 text-center'>Pelo corto</span>
                <span className='text-[10px] font-bold uppercase tracking-widest text-primary/50 text-right'>Pelo largo</span>
              </div>
              {cutPricing.map((row, i) => (
                <div key={i} className='grid grid-cols-3 px-6 py-3 border-t border-accent-peach/10'>
                  <span className='text-sm font-semibold text-primary/80'>{row.label}</span>
                  <span className='text-sm font-bold text-accent-peach-dark text-center'>{row.short}</span>
                  <span className='text-sm font-bold text-accent-peach-dark text-right'>{row.long}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className='py-16'>
          <div className='max-w-4xl mx-auto px-6'>
            <h2 className='text-2xl font-semibold text-primary mb-8 tracking-tight'>
              Preguntas frecuentes
            </h2>
            <div className='space-y-4'>
              {faqs.map((faq, i) => (
                <div key={i} className='bg-white border border-primary/8 rounded-4xl p-6'>
                  <h3 className='text-sm font-semibold text-primary mb-2'>{faq.q}</h3>
                  <p className='text-sm text-primary/60 font-light leading-relaxed'>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-16 bg-white border-t border-primary/5'>
          <div className='max-w-2xl mx-auto px-6 text-center'>
            <h2 className='text-2xl font-semibold text-primary mb-3 tracking-tight'>
              Agenda la hora de tu mascota
            </h2>
            <p className='text-primary/60 mb-8 font-light'>
              Irarrázaval 2086 B, Ñuñoa · Lunes a domingo 10:00–20:00
            </p>
            <button
              onClick={booking.openModal}
              className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-blue transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
            >
              <Icon icon='lucide:calendar' className='w-4 h-4' />
              Reservar hora
            </button>
          </div>
        </section>
      </main>

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
