"use client"

interface MidPageCTAProps {
  onBookClick: () => void
  rating?: number
}

export function MidPageCTA({ onBookClick, rating = 4.9 }: MidPageCTAProps) {
  return (
    <section className='py-14 px-6 bg-accent-blue'>
      <div className='max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left'>
        <div>
          <div className='flex items-center justify-center md:justify-start gap-1.5 mb-2'>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='text-yellow-300'
                aria-hidden='true'
              >
                <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
              </svg>
            ))}
            <span className='text-white/90 text-sm font-medium ml-1'>
              {rating} en Google
            </span>
          </div>
          <p className='text-white text-xl md:text-2xl font-semibold tracking-tight leading-snug'>
            Más de 100 perros de Ñuñoa ya reservaron online.
          </p>
          <p className='text-white/70 text-sm mt-1 font-light'>
            Confirmación inmediata · Sin llamadas · Lunes a domingo 10–20h
          </p>
        </div>

        <button
          onClick={onBookClick}
          className='shrink-0 inline-flex items-center gap-2 bg-white text-accent-blue text-xs font-semibold px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all tracking-[0.2em] uppercase shadow-lg hover:-translate-y-0.5'
        >
          Reservar mi hora
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
        </button>
      </div>
    </section>
  )
}
