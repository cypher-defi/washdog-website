"use client"

import { Icon } from "@iconify/react"

const steps = [
  {
    number: "01",
    icon: "lucide:scissors",
    title: "Elige tu servicio",
    description: "Baño suave o Corte y arreglo completo.",
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/20"
  },
  {
    number: "02",
    icon: "lucide:calendar",
    title: "Escoge tu horario",
    description: "Disponible todos los días de 10 a 20h. Reserva online en 2 minutos.",
    color: "text-accent-peach-dark",
    bg: "bg-accent-peach/10",
    border: "border-accent-peach/20"
  },
  {
    number: "03",
    icon: "lucide:dog",
    title: "Trae a tu perro",
    description: "Nosotros nos encargamos del resto. Sin esperas, sin sorpresas.",
    color: "text-accent-green-dark",
    bg: "bg-accent-green/20",
    border: "border-accent-green/20"
  }
]

export function HowItWorks() {
  return (
    <section className='py-24 px-6 bg-white border-t border-primary/5'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-accent-blue mb-3 block'>
            Simple y rápido
          </span>
          <h2 className='text-3xl md:text-4xl font-semibold text-primary tracking-tight'>
            Así de fácil
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 relative'>
          {/* Connector line (desktop only) */}
          <div className='hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-accent-blue/20 via-accent-peach/20 to-accent-green/20 z-0' />

          {steps.map((step) => (
            <div
              key={step.number}
              className={`relative z-10 bg-white border ${step.border} rounded-4xl p-8 flex flex-col gap-4`}
            >
              <div className='flex items-center gap-4'>
                <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center shrink-0`}>
                  <Icon icon={step.icon} className='w-6 h-6' />
                </div>
                <span className={`text-4xl font-serif font-light ${step.color} opacity-30`}>
                  {step.number}
                </span>
              </div>
              <h3 className='text-xl font-semibold text-primary tracking-tight'>
                {step.title}
              </h3>
              <p className='text-primary/60 font-light text-sm leading-relaxed'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
