"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { Navbar } from "@/components/layout"
import { useBooking } from "@/hooks/useBooking"

const BookingModal = dynamic(
  () => import("@/components/booking").then(mod => mod.BookingModal),
  { ssr: false }
)

const includes = [
  { icon: "lucide:bath", text: "Bañera profesional elevada — sin agacharte, sin mojarte" },
  { icon: "lucide:wind", text: "Secador de alta potencia — tu perro sale completamente seco" },
  { icon: "lucide:shield-check", text: "Shampoo hipoalergénico libre de parabenos y sulfatos incluido" },
  { icon: "lucide:package", text: "Toallas incluidas — no necesitas traer nada" },
  { icon: "lucide:spray-can", text: "Instalaciones higienizadas tras cada uso" },
  { icon: "lucide:clock", text: "Duración: 20 a 40 minutos según el tamaño de tu perro" }
]

const pricing = [
  { label: "Hasta 20 kg", price: "$10.000" },
  { label: "Más de 20 kg", price: "$16.000" }
]

const faqs = [
  {
    q: "¿Qué es el autolavado?",
    a: "Tú bañas a tu perro usando nuestras instalaciones profesionales: bañera elevada, secador de alta potencia, shampoo hipoalergénico y toallas. Ideal si prefieres el contacto directo con tu perro sin los problemas de bañarlo en casa."
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Irarrázaval 2086 B, Ñuñoa, Santiago. Abierto lunes, miércoles a sábado de 10:00 a 19:00, domingos hasta las 17:30. Cerrado los martes."
  },
  {
    q: "¿Cuánto tiempo tarda el baño?",
    a: "Entre 15 y 30 minutos. Perros pequeños y medianos suelen estar listos en 15 minutos; los más grandes pueden tomar hasta 30 minutos."
  },
  {
    q: "¿Necesito reservar con anticipación?",
    a: "Sin cita o con reserva — como prefieras. Si quieres asegurar tu turno, puedes agendar en menos de 2 minutos desde nuestra web."
  }
]

export default function AutoLavadoPerrosNunoaPage() {
  const booking = useBooking()

  return (
    <>
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
              Baño de perros<br />
              <span className='text-accent-blue'>en Ñuñoa</span>
            </h1>
            <p className='text-primary/60 text-lg font-light leading-relaxed max-w-2xl mb-8'>
              Baño profesional para tu perro en Ñuñoa. Shampoo hipoalergénico, secado delicado y
              atención completamente individual. Sin estrés, sin apuros. Abierto lunes, mié–sáb 10–19h · dom 10–17:30h · cerrado martes.
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

        {/* What's included */}
        <section className='py-16'>
          <div className='max-w-4xl mx-auto px-6'>
            <h2 className='text-2xl font-semibold text-primary mb-8 tracking-tight'>
              ¿Qué incluye el baño?
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {includes.map((item, i) => (
                <div
                  key={i}
                  className='flex items-start gap-4 bg-white border border-primary/8 rounded-4xl p-6'
                >
                  <span className='shrink-0 w-10 h-10 rounded-xl border border-accent-blue/30 flex items-center justify-center text-accent-blue bg-accent-blue/5'>
                    <Icon icon={item.icon} className='w-5 h-5' />
                  </span>
                  <span className='text-primary/80 text-sm font-light leading-relaxed pt-1.5'>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className='py-16 bg-white border-t border-b border-primary/5'>
          <div className='max-w-4xl mx-auto px-6'>
            <h2 className='text-2xl font-semibold text-primary mb-8 tracking-tight'>
              Precios
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg'>
              {pricing.map((item, i) => (
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

        {/* Related services */}
        <section className='py-12 border-t border-primary/5'>
          <div className='max-w-4xl mx-auto px-6'>
            <h2 className='text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-5'>
              Otros servicios
            </h2>
            <div className='flex flex-wrap gap-3'>
              {[
                { href: "/servicios/peluqueria-canina-nunoa", label: "Peluquería canina Ñuñoa" },
                { href: "/servicios/corte", label: "Corte y arreglo" },
                { href: "/servicios/precio-peluqueria-nunoa", label: "Ver precios" }
              ].map(s => (
                <Link key={s.href} href={s.href} className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary/10 text-sm text-primary/60 hover:border-accent-blue/40 hover:text-accent-blue transition-all bg-white'>
                  {s.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-16 bg-white border-t border-primary/5'>
          <div className='max-w-2xl mx-auto px-6 text-center'>
            <h2 className='text-2xl font-semibold text-primary mb-3 tracking-tight'>
              Agenda el baño de tu perro
            </h2>
            <p className='text-primary/60 mb-8 font-light'>
              Irarrázaval 2086 B, Ñuñoa · Lun, Mié–Sáb 10:00–19:00 · Dom 10:00–17:30 · Mar cerrado
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
