"use client"

import { Icon } from "@iconify/react"

const features = [
  {
    icon: "lucide:heart-handshake",
    title: "Tu perro sale tranquilo, no estresado",
    description:
      "Sin jaulas, sin esperas con otros animales. Atención individual de principio a fin — porque el estrés no debería ser parte del baño.",
    iconBgClass: "bg-accent-blue/10",
    iconColorClass: "text-accent-blue",
    hoverBorderClass: "hover:border-accent-blue/30",
    hoverShadowClass: "hover:shadow-accent-blue/5",
    hoverTextClass: "group-hover:text-accent-blue"
  },
  {
    icon: "lucide:shield-check",
    title: "Sale impecable, sin importar la raza",
    description:
      "Yorkshire, Golden, Husky o Schnauzer — conocemos cada pelaje. Tu perro sale como recién salido de revista, cada vez.",
    iconBgClass: "bg-accent-green/20",
    iconColorClass: "text-accent-green-dark",
    hoverBorderClass: "hover:border-accent-green/50",
    hoverShadowClass: "hover:shadow-accent-green/10",
    hoverTextClass: "group-hover:text-accent-green-dark"
  },
  {
    icon: "lucide:flask-conical",
    title: "Sin irritaciones, sin reacciones",
    description:
      "Productos hipoalergénicos, sin parabenos. Lo que entra al cuerpo de tu perro importa — especialmente si tiene piel sensible.",
    iconBgClass: "bg-accent-peach/10",
    iconColorClass: "text-accent-peach-dark",
    hoverBorderClass: "hover:border-accent-peach/50",
    hoverShadowClass: "hover:shadow-accent-peach/10",
    hoverTextClass: "group-hover:text-accent-peach-dark"
  }
]

export function Features() {
  return (
    <section id='nuestra-forma' className='py-24 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70 mb-3 block'>
            Por qué elegirnos
          </span>
          <h2 className='text-3xl md:text-4xl font-semibold text-primary tracking-tight'>
            Por qué los perros de Ñuñoa prefieren Washdog
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`
                card-hover group bg-white border border-primary/5 p-10 rounded-4xl
                ${feature.hoverBorderClass} hover:shadow-xl ${feature.hoverShadowClass}
                transition-all hover:-translate-y-1
              `}
            >
              <div
                className={`
                  w-12 h-12 rounded-xl ${feature.iconBgClass} ${feature.iconColorClass}
                  flex items-center justify-center mb-6
                  group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
                `}
              >
                <Icon icon={feature.icon} className='w-6 h-6' />
              </div>
              <h3
                className={`text-xl font-semibold text-primary mb-3 tracking-tight ${feature.hoverTextClass} transition-colors`}
              >
                {feature.title}
              </h3>
              <p className='text-primary/60 font-light leading-relaxed text-sm'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
