"use client"

interface EmotiveCloseProps {
  onBookClick: () => void
  rating?: number
}

export function EmotiveClose({ onBookClick, rating = 4.9 }: EmotiveCloseProps) {
  return (
    <section className='py-24 px-6 bg-white border-t border-primary/5'>
      <div className='max-w-2xl mx-auto text-center'>
        {/* Emotive headline */}
        <h2 className='text-3xl md:text-4xl font-semibold text-primary tracking-tight leading-snug mb-4'>
          Tu perro merece lo mejor.<br />
          <span className='font-serif italic font-normal text-accent-blue'>Y tú lo sabes.</span>
        </h2>

        <p className='text-primary/60 font-light leading-relaxed mb-10 text-lg'>
          Agenda en 2 minutos. Confirmación inmediata. Sin llamadas, sin colas,
          sin sorpresas en el precio.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onBookClick}
          className='inline-flex w-full sm:w-auto justify-center items-center gap-3 px-10 py-4 rounded-full bg-primary text-white hover:bg-accent-blue transition-all hover:scale-105 shadow-xl shadow-primary/20 mb-8'
        >
          <span className='text-xs font-semibold tracking-[0.2em] uppercase'>
            Reservar mi hora ahora
          </span>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
        </button>

        {/* Trust signals */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-primary/50'>
          <div className='flex items-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='text-accent-green-dark' aria-hidden='true'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'/><polyline points='22 4 12 14.01 9 11.01'/></svg>
            <span>Sin cobros sorpresa</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='text-accent-green-dark' aria-hidden='true'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'/><polyline points='22 4 12 14.01 9 11.01'/></svg>
            <span>Cancelación sin costo</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='currentColor' className='text-yellow-400' aria-hidden='true'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              ))}
            </div>
            <span>{rating} en Google · Ñuñoa</span>
          </div>
        </div>

        {/* Guarantee */}
        <p className='mt-10 text-xs text-primary/35 font-light'>
          Si no quedas satisfecho con el servicio, te buscamos una solución — sin burocracia.
        </p>
      </div>
    </section>
  )
}
