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
  { icon: "lucide:scissors", text: "Corte de pelo y deslanado adaptado a cada gato" },
  { icon: "lucide:bath", text: "Baño con shampoo suave apto para felinos" },
  { icon: "lucide:wind", text: "Secado delicado y cepillado" },
  { icon: "lucide:ear", text: "Limpieza de orejas incluida" },
  { icon: "lucide:heart", text: "Atención individual, en un ambiente sin perros" },
  { icon: "lucide:clock", text: "Duración: 1 a 2 horas según pelaje" }
]

const faqs = [
  {
    q: "¿Atienden gatos además de perros?",
    a: "Sí. Contamos con servicio de peluquería para gatos. El corte incluye baño, brushing y limpieza de orejas, igual que para perros."
  },
  {
    q: "¿Mi gato estará en la misma sala que los perros?",
    a: "No. Atendemos de forma individual, por lo que tu gato estará solo en la sala durante todo el proceso."
  },
  {
    q: "¿Cuánto cuesta la peluquería para gatos?",
    a: "El servicio de corte para gatos tiene un precio de $45.000, independientemente del largo del pelo."
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Irarrázaval 2086 B, Ñuñoa, Santiago. Abierto lunes, miércoles a sábado de 10:00 a 19:00, domingos hasta las 17:30. Cerrado los martes."
  }
]

export default function PeluqueriaGatosNunoaPage() {
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
              className='text-accent-green-dark hover:underline text-sm mb-8 inline-flex items-center gap-1'
            >
              ← Volver al inicio
            </Link>
            <div className='mt-6 mb-6'>
              <span className='text-xs font-bold uppercase tracking-[0.25em] text-accent-green-dark'>
                Ñuñoa, Santiago
              </span>
            </div>
            <h1 className='text-4xl md:text-5xl font-semibold text-primary mb-6 tracking-tight leading-snug'>
              Peluquería para gatos<br />
              <span className='text-accent-green-dark'>en Ñuñoa</span>
            </h1>
            <p className='text-primary/60 text-lg font-light leading-relaxed max-w-2xl mb-8'>
              Corte, baño y arreglo para gatos en Ñuñoa. Atención individual en un espacio tranquilo,
              sin perros presentes. Cuidado profesional adaptado a cada felino.
            </p>
            <button
              onClick={booking.openModal}
              className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-green-dark transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
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
              ¿Qué incluye la peluquería para gatos?
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {includes.map((item, i) => (
                <div
                  key={i}
                  className='flex items-start gap-4 bg-white border border-primary/8 rounded-4xl p-6'
                >
                  <span className='shrink-0 w-10 h-10 rounded-xl border border-accent-green/50 flex items-center justify-center text-accent-green-dark bg-accent-green/10'>
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
              Precio
            </h2>
            <div className='bg-accent-green/10 border border-accent-green/30 rounded-4xl p-8 max-w-xs text-center'>
              <p className='text-xs font-bold uppercase tracking-widest text-primary/50 mb-2'>
                Gato — corte completo
              </p>
              <p className='text-4xl font-semibold text-accent-green-dark tracking-tight'>
                $45.000
              </p>
              <p className='text-xs text-primary/40 mt-2 font-light'>Incluye baño, brushing y limpieza de orejas</p>
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
                <Link key={s.href} href={s.href} className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary/10 text-sm text-primary/60 hover:border-accent-green/60 hover:text-accent-green-dark transition-all bg-white'>
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
              Agenda la peluquería de tu gato
            </h2>
            <p className='text-primary/60 mb-8 font-light'>
              Irarrázaval 2086 B, Ñuñoa · Lun, Mié–Sáb 10:00–19:00 · Dom 10:00–17:30 · Mar cerrado
            </p>
            <button
              onClick={booking.openModal}
              className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-green-dark transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
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
