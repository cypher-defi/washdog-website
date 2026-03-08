"use client"

import Image from "next/image"

interface HeroProps {
  onBookClick: () => void
  rating?: number
}

export function Hero({ onBookClick, rating = 4.9 }: HeroProps) {
  return (
    <section className='relative w-full min-h-150 md:min-h-[85vh] flex items-center justify-center bg-hero-bg py-24 md:py-32'>
      {/* Background Image Container */}
      <div className='absolute inset-0 z-0 flex items-center justify-center'>
        <Image
          src='/hero-beagle.webp'
          alt='Perro beagle disfrutando de un baño profesional en Washdog Ñuñoa'
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        {/* Blue overlay */}
        <div className='absolute inset-0 bg-accent-blue/35' />
      </div>

      {/* Content Container */}
      <div className='relative z-10 px-4 md:px-6 w-full max-w-4xl mx-auto text-center fade-in'>
        {/* Headline */}
        <h1 className='flex flex-col items-center justify-center drop-shadow-sm mb-6 md:mb-8'>
          <span className='font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-none tracking-widest uppercase mb-2 md:mb-4 text-primary'>
            Tu perro,
          </span>
          <span className='font-serif italic font-normal text-6xl sm:text-7xl md:text-9xl lg:text-[8rem] leading-[0.85] tracking-tight text-white'>
            limpio y tranquilo.
          </span>
          <span className='font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-widest uppercase mt-4 text-primary'>
            En Ñuñoa.
          </span>
        </h1>

        {/* Subheadline */}
        <p className='text-white text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto mb-6 leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]'>
          Baños y cortes con atención personalizada y sin químicos agresivos.
          Abierto todos los días de 10 a 20h.
        </p>

        <div className='flex flex-col items-center gap-6'>
          {/* Single CTA */}
          <button
            onClick={onBookClick}
            className='group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-primary text-white hover:bg-accent-blue transition-all hover:scale-105 shadow-xl shadow-primary/20'
          >
            <span className='text-xs font-semibold tracking-[0.2em] uppercase'>
              Reservar mi hora
            </span>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='group-hover:translate-x-1 transition-transform' aria-hidden='true'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
          </button>

          {/* Social proof line */}
          <div className='inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full'>
            <div className='flex gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='currentColor' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' className='text-yellow-400' aria-hidden='true'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              ))}
            </div>
            <span className='text-white text-sm font-medium'>
              {rating} en Google · Irarrázaval 2086 B, Ñuñoa
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
