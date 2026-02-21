"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

const faqs = [
  {
    question: "¿Cuánto cuesta un baño?",
    answer:
      "El baño vale $10.000 para perros de hasta 20 kg y $16.000 para perros de más de 20 kg. El precio del corte y peluquería se define según la raza y el trabajo requerido — escríbenos por WhatsApp si quieres una cotización."
  },
  {
    question: "¿Necesito reservar con anticipación?",
    answer:
      "Sí, trabajamos por reserva para garantizar atención individual a cada perro. Puedes reservar fácilmente desde esta página en menos de 2 minutos, sin llamadas ni mensajes."
  },
  {
    question: "¿Atienden razas grandes?",
    answer:
      "Sí, atendemos todas las razas y tamaños. El precio varía según el tamaño del perro y el largo del pelaje. Si tienes dudas sobre tu caso específico, escríbenos por WhatsApp."
  },
  {
    question: "¿Qué pasa si mi perro es nervioso o le tiene miedo al agua?",
    answer:
      "Somos especialmente pacientes con perros ansiosos. Trabajamos a su ritmo, sin apuros ni jaulas. Muchos de nuestros clientes habituales llegaron la primera vez muy nerviosos y hoy entran solos."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className='py-24 px-6 bg-white border-t border-primary/5'>
      <div className='max-w-3xl mx-auto'>
        <div className='text-center mb-16'>
          <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-accent-blue mb-3 block'>
            Preguntas frecuentes
          </span>
          <h2 className='text-3xl md:text-4xl font-semibold text-primary tracking-tight'>
            Todo lo que necesitas saber
          </h2>
        </div>

        <div className='space-y-3'>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  isOpen
                    ? "border-accent-blue/30 shadow-sm shadow-accent-blue/5"
                    : "border-primary/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className='w-full flex items-center justify-between gap-4 px-6 py-5 text-left'
                >
                  <span className='font-semibold text-primary text-sm md:text-base'>
                    {faq.question}
                  </span>
                  <Icon
                    icon='lucide:chevron-down'
                    className={`w-5 h-5 text-primary/40 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-accent-blue" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className='px-6 pb-5'>
                    <p className='text-primary/70 font-light text-sm leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
