"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"

interface NewsletterIssue {
  slug: string
  issue_number: number
  title: string
}

interface FooterProps {
  onBookClick: () => void
  newsletterIssues?: NewsletterIssue[]
}

export function Footer({ onBookClick, newsletterIssues = [] }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className='bg-white pb-6 pt-10'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='bg-primary rounded-5xl text-[#E6E1DE] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/10'>
          <div className='grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 relative z-10'>
            {/* Brand & CTA */}
            <div className='col-span-2 md:col-span-3'>
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

            {/* Servicios */}
            <div className='md:col-span-2 md:col-start-4 text-sm space-y-4'>
              <h3 className='text-white font-medium text-lg'>Servicios</h3>
              <ul className='space-y-2'>
                {[
                  { label: 'Todos los servicios', href: '/servicios' },
                  { label: 'Peluquería canina', href: '/servicios/peluqueria-canina' },
                  { label: 'Baño para perros',  href: '/servicios/bano-perros' },
                  { label: 'Corte de pelo',     href: '/servicios/corte-perros' },
                  { label: 'Spa canino',        href: '/servicios/spa-canino' },
                  { label: 'Autolavado',        href: '/servicios/auto-lavado-perros' },
                  { label: 'Peluquería gatos',  href: '/servicios/peluqueria-gatos' },
                  { label: 'Precios',           href: '/servicios/precio-peluqueria' },
                  { label: 'Nuestro equipo',    href: '/equipo' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className='text-white/60 hover:text-white transition-colors'>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comunas */}
            <div className='md:col-span-2 md:col-start-6 text-sm space-y-4'>
              <h3 className='text-white font-medium text-lg'>Comunas</h3>
              <ul className='space-y-2'>
                {[
                  { label: 'Ñuñoa',           href: '/servicios/peluqueria-canina-nunoa' },
                  { label: 'Providencia',      href: '/servicios/peluqueria-canina-providencia' },
                  { label: 'Las Condes',       href: '/servicios/peluqueria-canina-las-condes' },
                  { label: 'Vitacura',         href: '/servicios/peluqueria-canina-vitacura' },
                  { label: 'La Reina',         href: '/servicios/peluqueria-canina-la-reina' },
                  { label: 'Macul',            href: '/servicios/peluqueria-canina-macul' },
                  { label: 'La Florida',       href: '/servicios/peluqueria-canina-la-florida' },
                  { label: 'Peñalolén',        href: '/servicios/peluqueria-canina-penalolen' },
                  { label: 'Santiago Centro',  href: '/servicios/peluqueria-canina-santiago-centro' },
                  { label: 'Huechuraba',       href: '/servicios/peluqueria-canina-huechuraba' },
                  { label: 'Lo Barnechea',     href: '/servicios/peluqueria-canina-lo-barnechea' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className='text-white/60 hover:text-white transition-colors'>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className='md:col-span-2 md:col-start-8 text-sm space-y-4'>
              <h3 className='text-white font-medium text-lg'>Newsletter</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='/newsletter' className='text-white/60 hover:text-white transition-colors'>
                    Santiago a Cuatro Patas
                  </Link>
                </li>
                {newsletterIssues.map(issue => (
                  <li key={issue.slug}>
                    <Link href={`/newsletter/${issue.slug}`} className='text-white/60 hover:text-white transition-colors'>
                      Edición #{issue.issue_number}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info + Hours */}
            <div className='col-span-2 md:col-span-3 md:col-start-10 text-sm space-y-4'>
              <h3 className='text-white font-medium text-lg'>Contacto</h3>
              <div className='flex flex-wrap gap-x-5 gap-y-3 md:flex-col md:gap-x-0 md:space-y-6'>
                <a
                  href='https://share.google/8t1bo1xyYIfTKyDAw'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-white/70 hover:text-white transition-colors group'
                >
                  <Icon icon='lucide:map-pin' className='text-accent-blue group-hover:scale-110 transition-transform w-4 h-4 shrink-0' />
                  <span className='min-w-0 wrap-break-word'>Irarrázaval 2086 B, Ñuñoa</span>
                </a>
                <a
                  href='tel:+56987230388'
                  className='flex items-center gap-2 text-white/70 hover:text-white transition-colors group'
                >
                  <Icon icon='lucide:phone' className='text-accent-blue group-hover:scale-110 transition-transform w-4 h-4 shrink-0' />
                  <span className='min-w-0'>+56 9 8723 0388</span>
                </a>
                <a
                  href='mailto:contacto@washdog.cl'
                  className='flex items-center gap-2 text-white/70 hover:text-white transition-colors group'
                >
                  <Icon icon='lucide:mail' className='text-accent-blue group-hover:scale-110 transition-transform w-4 h-4 shrink-0' />
                  <span className='min-w-0 break-all'>contacto@washdog.cl</span>
                </a>
              </div>
              <div className='pt-2'>
                <h3 className='text-white font-medium text-lg mb-4'>Horario</h3>
                <div className='border-l-2 border-accent-blue/30 pl-4 text-white/70 space-y-1'>
                  <p>Lun - Dom</p>
                  <p className='whitespace-nowrap'>10:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='pt-8 mt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-medium uppercase tracking-widest'>
            <p>© 2026 Washdog</p>
            <div className='flex items-center gap-5'>
              <a href='https://www.instagram.com/washdogexpress/' target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors' aria-label='Instagram'>
                <Icon icon='mdi:instagram' className='w-4 h-4' />
              </a>
              <a href='https://web.facebook.com/profile.php?id=61586223404157' target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors' aria-label='Facebook'>
                <Icon icon='mdi:facebook' className='w-4 h-4' />
              </a>
              <a href='https://www.tiktok.com/@washdogexpress' target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors' aria-label='TikTok'>
                <Icon icon='ic:baseline-tiktok' className='w-4 h-4' />
              </a>
              <a href='https://www.youtube.com/@WashdogExpress' target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors' aria-label='YouTube'>
                <Icon icon='mdi:youtube' className='w-4 h-4' />
              </a>
              <Link href='/privacy' className='hover:text-white transition-colors'>Privacidad</Link>
              <Link href='/terms' className='hover:text-white transition-colors'>Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
