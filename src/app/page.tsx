import { Icon } from "@iconify/react"

export default function Home() {
  return (
    <main className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-bg'>
      {/* Background image */}
      <div className='absolute inset-0'>
        <img
          src='/hero-beagle.png'
          className='w-full h-full object-cover'
          alt='Beagle dog'
        />
        <div className='absolute inset-0 bg-primary/60' />
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center text-center px-6 max-w-2xl'>
        {/* Logo */}
        <div className='flex items-center gap-3 mb-12'>
          <span className='flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm text-white shadow-lg'>
            <Icon icon='lucide:dog' className='w-5 h-5' />
          </span>
          <span className='font-serif font-medium text-3xl tracking-tight text-white'>
            Wash<span className='text-accent-blue'>dog.</span>
          </span>
        </div>

        {/* Message */}
        <h1 className='font-serif italic text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6'>
          Nuestras puertas abrirán muy pronto
        </h1>
        <p className='text-lg md:text-xl text-white/80 font-light'>
          para recibir a sus mejores amigos.
        </p>

        {/* Decorative paw prints */}
        <div className='mt-12 flex items-center gap-2 text-white/40'>
          <Icon icon='lucide:paw-print' className='w-5 h-5' />
          <Icon icon='lucide:paw-print' className='w-5 h-5' />
          <Icon icon='lucide:paw-print' className='w-5 h-5' />
        </div>
      </div>
    </main>
  )
}
