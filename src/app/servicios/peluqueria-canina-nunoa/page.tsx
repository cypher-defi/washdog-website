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

const includes = [
  { icon: "lucide:scissors", text: "Corte de pelo adaptado a tu raza y preferencias" },
  { icon: "lucide:bath", text: "Baño con shampoo hipoalergénico incluido" },
  { icon: "lucide:wind", text: "Brushing completo y secado profesional" },
  { icon: "lucide:ear", text: "Limpieza de orejas incluida" },
  { icon: "lucide:heart", text: "Atención individual — sin otros perros en la sala" },
  { icon: "lucide:clock", text: "Duración: 1 a 2 horas según raza y tamaño" }
]

const pricing = [
  { label: "Toy", short: "$15.000", long: "$20.000" },
  { label: "Pequeño", short: "$18.000", long: "$25.000" },
  { label: "Mediano", short: "$22.000", long: "$30.000" },
  { label: "Grande", short: "$30.000", long: "$35.000" },
  { label: "Gigante", short: "$38.000", long: "$50.000" }
]

const faqs = [
  {
    q: "¿Atienden todas las razas?",
    a: "Sí. Adaptamos el corte a la raza y al tipo de pelo de tu perro. Si tienes una preferencia de estilo, cuéntanos al reservar o muéstranos una foto de referencia."
  },
  {
    q: "¿Dónde queda la peluquería canina?",
    a: "Estamos en Irarrázaval 2086 B, Ñuñoa, Santiago. Abierto de lunes a domingo de 10:00 a 20:00."
  },
  {
    q: "¿Necesito reservar con anticipación?",
    a: "Sí, trabajamos con reserva previa para garantizar la atención individual de tu perro. Puedes agendar desde nuestra web en menos de 2 minutos."
  },
  {
    q: "¿El precio incluye el baño?",
    a: "Sí. El servicio de peluquería canina incluye baño, brushing, corte y limpieza de orejas."
  }
]

export default function PeluqueriaCaninaNunoaPage() {
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
              Peluquería canina<br />
              <span className='text-accent-blue'>en Ñuñoa</span>
            </h1>
            <p className='text-primary/60 text-lg font-light leading-relaxed max-w-2xl mb-8'>
              Corte y arreglo profesional para tu perro en Ñuñoa. Baño incluido, atención individual
              y cuidado adaptado a cada raza. Abierto todos los días de 10 a 20h.
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
              ¿Qué incluye la peluquería canina?
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
            <h2 className='text-2xl font-semibold text-primary mb-2 tracking-tight'>
              Precios peluquería canina Ñuñoa
            </h2>
            <p className='text-primary/50 text-sm font-light mb-8'>
              El precio varía según el tamaño y el tipo de pelo de tu perro.
            </p>
            <div className='bg-white border border-accent-blue/20 rounded-4xl overflow-hidden max-w-lg'>
              <div className='grid grid-cols-3 bg-accent-blue/10 px-6 py-3'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-primary/50'>Tamaño</span>
                <span className='text-[10px] font-bold uppercase tracking-widest text-primary/50 text-center'>Pelo corto</span>
                <span className='text-[10px] font-bold uppercase tracking-widest text-primary/50 text-right'>Pelo largo</span>
              </div>
              {pricing.map((row, i) => (
                <div key={i} className='grid grid-cols-3 px-6 py-3 border-t border-accent-blue/10'>
                  <span className='text-sm font-semibold text-primary/80'>{row.label}</span>
                  <span className='text-sm font-bold text-accent-blue text-center'>{row.short}</span>
                  <span className='text-sm font-bold text-accent-blue text-right'>{row.long}</span>
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
                { href: "/servicios/bano", label: "Baño suave" },
                { href: "/servicios/corte", label: "Corte y arreglo" },
                { href: "/servicios/peluqueria-gatos-nunoa", label: "Peluquería gatos Ñuñoa" },
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
              Agenda la peluquería de tu perro
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
