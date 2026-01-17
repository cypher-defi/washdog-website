"use client"

import { Icon } from "@iconify/react"

interface HeroProps {
  onBookClick: () => void
  onServicesClick: () => void
}

export function Hero({ onBookClick, onServicesClick }: HeroProps) {
  return (
    /* 1. Changed background to #f2f2f2 to match the studio lighting in the image.
      2. Removed fixed heights on mobile (h-auto) to prevent "bars" above/below the image.
    */
    <section className='relative w-full h-auto md:h-[85vh] flex items-center justify-center overflow-hidden bg-hero-bg pt-16 pb-12 md:py-0'>
      {/* Background Image Container */}
      <div className='absolute inset-0 z-0 flex items-center justify-center'>
        <img
          src='/hero-beagle.png'
          className='w-full h-full object-cover'
          alt='Beagle dog'
        />
        {/* Blue overlay */}
        <div className='absolute inset-0 bg-accent-blue/35' />
      </div>

      {/* Content Container */}
      <div className='relative z-10 px-4 md:px-6 w-full max-w-7xl mx-auto text-center fade-in'>
        {/* H1 exactly as requested */}
        <h1 className='flex flex-col items-center justify-center text-primary drop-shadow-sm mb-10 md:mb-12'>
          <span className='font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-none tracking-widest uppercase mb-2 md:mb-6'>
            EL BAÑO QUE
          </span>
          <span className='font-serif italic font-normal text-6xl sm:text-7xl md:text-9xl lg:text-[8.5rem] leading-[0.85] tracking-tight text-white'>
            tu mejor amigo
          </span>
          <span className='font-serif italic font-normal text-6xl sm:text-7xl md:text-9xl lg:text-[8.5rem] leading-[0.85] tracking-tight text-white'>
            merece
          </span>
        </h1>

        <div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center'>
          <button
            onClick={onBookClick}
            className='w-full max-w-[280px] sm:w-auto group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-primary text-white hover:bg-accent-blue transition-all hover:scale-105 shadow-xl shadow-primary/10'
          >
            <span className='text-xs font-semibold tracking-[0.2em] uppercase'>
              Reservar Hora
            </span>
            <Icon
              icon='lucide:arrow-right'
              className='w-4 h-4 group-hover:translate-x-1 transition-transform'
            />
          </button>

          <button
            onClick={onServicesClick}
            className='w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-primary/20 bg-white/60 backdrop-blur-md text-primary hover:bg-white hover:border-accent-blue text-xs font-semibold tracking-[0.2em] uppercase transition-all'
          >
            Ver Servicios
          </button>
        </div>
      </div>
    </section>
  )
}
