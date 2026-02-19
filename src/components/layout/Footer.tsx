"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"

interface FooterProps {
  onBookClick: () => void
}

export function Footer({ onBookClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className='bg-white pb-6 pt-10'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='bg-primary rounded-5xl text-[#E6E1DE] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/10'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10'>
            {/* Brand & CTA */}
            <div className='md:col-span-5'>
              <button
                onClick={scrollToTop}
                className='flex items-center gap-3 hover:opacity-80 transition-opacity mb-6'
              >
                <span className='flex items-center justify-center w-8 h-8 rounded-lg bg-white text-primary shadow-md shadow-black/10'>
                  <Icon icon='lucide:dog' className='w-4 h-4' />
                </span>
                <span className='font-serif font-medium text-2xl tracking-tight text-white'>
                  Wash<span className='text-accent-blue'>dog.</span>
                </span>
              </button>
              <p className='text-white/70 mb-10 font-light max-w-sm text-sm leading-relaxed'>
                Agenda fácilmente desde la web. Rápido, simple y sin
                complicaciones. Tu perro te lo agradecerá.
              </p>
              <button
                onClick={onBookClick}
                className='flex items-center gap-2 bg-accent-blue text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-all shadow-lg shadow-black/20 text-xs tracking-widest uppercase hover:-translate-y-1'
              >
                Reservar Ahora
              </button>
            </div>

            {/* Contact Info */}
            <div className='md:col-span-3 md:col-start-8 text-sm space-y-6'>
              <h4 className='text-white font-medium text-lg'>Contacto</h4>
              <a
                href='https://www.google.com/maps/search/?api=1&query=Av.+Irarrázaval+2086+B,+Ñuñoa,+Región+Metropolitana'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 text-white/70 hover:text-white transition-colors group'
              >
                <Icon
                  icon='lucide:map-pin'
                  className='text-accent-blue group-hover:scale-110 transition-transform w-4 h-4'
                />
                Irarrázaval 2086 B, Ñuñoa
              </a>
              <a
                href='tel:+56987230388'
                className='flex items-center gap-4 text-white/70 hover:text-white transition-colors group'
              >
                <Icon
                  icon='lucide:phone'
                  className='text-accent-blue group-hover:scale-110 transition-transform w-4 h-4'
                />
                +56 9 8723 0388
              </a>
              <a
                href='mailto:contacto@washdog.cl'
                className='flex items-center gap-4 text-white/70 hover:text-white transition-colors group'
              >
                <Icon
                  icon='lucide:mail'
                  className='text-accent-blue group-hover:scale-110 transition-transform w-4 h-4'
                />
                contacto@washdog.cl
              </a>
            </div>

            {/* Hours */}
            <div className='md:col-span-2 text-sm space-y-6'>
              <h4 className='text-white font-medium text-lg'>Horario</h4>
              <div className='border-l-2 border-accent-blue/30 pl-4 text-white/70 space-y-1'>
                <p>Lun - Dom</p>
                <p>09:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='pt-8 mt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-medium uppercase tracking-widest'>
            <p>© 2026 Washdog</p>
            <div className='flex gap-6'>
              <Link href='/privacy' className='hover:text-white transition-colors'>
                Privacidad
              </Link>
              <Link href='/terms' className='hover:text-white transition-colors'>
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
