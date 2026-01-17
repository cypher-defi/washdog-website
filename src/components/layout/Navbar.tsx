"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

interface NavbarProps {
  onBookClick: () => void
}

const navLinks = [
  { href: "nuestra-forma", label: "Nuestro Cuidado" },
  { href: "servicios", label: "Servicios" },
  { href: "contacto", label: "Contacto" }
]

export function Navbar({ onBookClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  const handleNavClick = (href: string) => {
    scrollToSection(href)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='fixed top-0 w-full z-50 glass transition-all duration-300'>
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative'>
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className='group flex items-center gap-3 hover:opacity-80 transition-opacity'
        >
          <span className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-md shadow-primary/10'>
            <Icon icon='lucide:dog' className='w-4 h-4' />
          </span>
          <span className='font-serif font-medium text-2xl tracking-tight text-primary'>
            Wash<span className='text-accent-blue'>dog.</span>
          </span>
        </button>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className='text-xs font-medium uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors relative group'
            >
              {link.label}
              <span className='absolute -bottom-1 left-0 w-0 h-px bg-accent-blue transition-all duration-300 group-hover:w-full' />
            </button>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          {/* Desktop Book Button */}
          <button
            onClick={onBookClick}
            className='hidden md:flex items-center gap-2 bg-primary text-white text-xs font-medium px-6 py-3 rounded-full hover:bg-accent-blue transition-all tracking-wide shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
          >
            <Icon icon='lucide:calendar' className='w-4 h-4' />
            Reservar hora
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden p-2 text-primary active:bg-black/5 rounded-lg'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <Icon
                icon='lucide:x'
                className='w-6 h-6 transition-transform duration-300'
              />
            ) : (
              <Icon
                icon='lucide:menu'
                className='w-6 h-6 transition-transform duration-300'
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-xl md:hidden z-40 transition-all duration-300
          ${isMenuOpen ? "block" : "hidden"}
        `}
      >
        <div className='flex flex-col p-6 gap-2'>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className='text-sm font-medium uppercase tracking-widest text-primary/70 hover:text-primary hover:bg-black/5 py-3 px-4 rounded-lg transition-colors text-left'
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onBookClick()
              setIsMenuOpen(false)
            }}
            className='flex items-center justify-center gap-2 bg-accent-blue text-white text-sm font-medium px-6 py-4 rounded-xl mt-4 w-full active:scale-95 transition-transform'
          >
            Reservar hora
          </button>
        </div>
      </div>
    </nav>
  )
}
