"use client"

import { useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"

export function StaticNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='fixed top-0 w-full z-50 glass transition-all duration-300'>
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative'>
        <Link
          href='/'
          className='group flex items-center gap-3 hover:opacity-80 transition-opacity'
        >
          <span className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-md shadow-primary/10'>
            <Icon icon='lucide:dog' className='w-4 h-4' />
          </span>
          <span className='font-serif font-medium text-2xl tracking-tight text-primary'>
            Wash<span className='text-accent-blue'>dog.</span>
          </span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          {[
            { href: "/#nuestra-forma", label: "Nuestro Cuidado" },
            { href: "/#servicios", label: "Servicios" },
            { href: "/blog", label: "Blog" }
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='text-xs font-medium uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors relative group'
            >
              {link.label}
              <span className='absolute -bottom-1 left-0 w-0 h-px bg-accent-blue transition-all duration-300 group-hover:w-full' />
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <Link
            href='https://share.google/8t1bo1xyYIfTKyDAw'
            target='_blank'
            rel='noopener noreferrer'
            className='hidden md:flex items-center gap-2 bg-primary text-white text-xs font-medium px-6 py-3 rounded-full hover:bg-accent-blue transition-all tracking-wide shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-0.5'
          >
            <Icon icon='lucide:calendar' className='w-4 h-4' />
            Reservar hora
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 text-primary active:bg-black/5 rounded-lg'
            aria-label='Toggle menu'
          >
            <Icon
              icon={isMenuOpen ? "lucide:x" : "lucide:menu"}
              className='w-6 h-6 transition-transform duration-300'
            />
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-xl md:hidden z-40 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className='flex flex-col p-6 gap-2'>
          {[
            { href: "/#nuestra-forma", label: "Nuestro Cuidado" },
            { href: "/#servicios", label: "Servicios" },
            { href: "/blog", label: "Blog" }
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className='text-sm font-medium uppercase tracking-widest text-primary/70 hover:text-primary hover:bg-black/5 py-3 px-4 rounded-lg transition-colors'
            >
              {link.label}
            </Link>
          ))}
          <Link
            href='https://share.google/8t1bo1xyYIfTKyDAw'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center gap-2 bg-accent-blue text-white text-sm font-medium px-6 py-4 rounded-xl mt-4 w-full'
          >
            Reservar hora
          </Link>
        </div>
      </div>
    </nav>
  )
}
