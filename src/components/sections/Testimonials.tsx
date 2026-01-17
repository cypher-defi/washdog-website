'use client';

import { Icon } from '@iconify/react';

const testimonials = [
  {
    initial: 'M',
    name: 'Max & Sofía',
    text: '"Increíble trato. Max suele tener miedo al agua, pero aquí salió tranquilo y oliendo delicioso. Definitivamente volveremos."',
    bgColor: 'bg-accent-blue/20',
    textColor: 'text-accent-blue',
    hoverBorder: 'hover:border-accent-blue/20',
  },
  {
    initial: 'L',
    name: 'Luna & Pedro',
    text: '"El corte quedó perfecto. Me encanta que usen productos hipoalergénicos. El lugar se siente muy limpio y profesional."',
    bgColor: 'bg-accent-peach/20',
    textColor: 'text-accent-peach',
    hoverBorder: 'hover:border-accent-peach/20',
  },
  {
    initial: 'B',
    name: 'Bruno & Carla',
    text: '"La facilidad para reservar por la web es genial. El lugar es impecable y muy amables. Bruno sale feliz."',
    bgColor: 'bg-accent-green/20',
    textColor: 'text-accent-green-dark',
    hoverBorder: 'hover:border-accent-green/20',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background border-t border-primary/5 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-primary tracking-tight">Clientes Felices</h2>
          <p className="text-primary/50 font-light mt-2">Ellos mueven la cola por nosotros.</p>
        </div>
        <div className="flex text-accent-peach gap-1">
          {[...Array(5)].map((_, i) => (
            <Icon key={i} icon="lucide:star" className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-8 snap-x snap-mandatory">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className={`min-w-[340px] snap-center bg-white p-10 rounded-3xl border border-primary/5 flex flex-col ${testimonial.hoverBorder} transition-colors shadow-sm`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full ${testimonial.bgColor} flex items-center justify-center ${testimonial.textColor} font-serif italic text-lg`}
              >
                {testimonial.initial}
              </div>
              <div className="text-sm font-bold text-primary">{testimonial.name}</div>
            </div>
            <p className="text-primary/70 text-sm italic leading-relaxed">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
