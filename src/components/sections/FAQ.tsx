"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "¿Cuánto cuesta el baño?",
    answer: (
      <div className='space-y-2'>
        <p>
          El baño vale <strong>$10.000</strong> para perros de hasta 20 kg y{" "}
          <strong>$16.000</strong> para perros de más de 20 kg.
        </p>
        <p>
          Incluye shampoo suave, secado y limpieza básica. Sin químicos
          agresivos.
        </p>
      </div>
    )
  },
  {
    question: "¿Cuánto cuesta la peluquería?",
    answer: (
      <div className='space-y-3'>
        <p>
          La peluquería incluye baño, brushing y limpiado de orejas. Los precios
          según tamaño y tipo de pelo son:
        </p>
        <div className='rounded-xl border border-primary/10 overflow-hidden text-xs'>
          <div className='grid grid-cols-3 bg-primary/5 px-3 py-2'>
            <span className='font-bold uppercase tracking-widest text-primary/50'>
              Tamaño
            </span>
            <span className='font-bold uppercase tracking-widest text-primary/50 text-center'>
              Pelo corto
            </span>
            <span className='font-bold uppercase tracking-widest text-primary/50 text-right'>
              Pelo largo
            </span>
          </div>
          {[
            { label: "Toy", short: "$15.000", long: "$20.000" },
            { label: "Pequeño", short: "$18.000", long: "$25.000" },
            { label: "Mediano", short: "$22.000", long: "$30.000" },
            { label: "Grande", short: "$30.000", long: "$35.000" },
            { label: "Gigante", short: "$38.000", long: "$50.000" },
            { label: "Gato", short: "$30.000", long: "—" }
          ].map((row) => (
            <div
              key={row.label}
              className='grid grid-cols-3 px-3 py-2 border-t border-primary/5'
            >
              <span className='font-semibold text-primary/80'>{row.label}</span>
              <span className='font-bold text-accent-peach-dark text-center'>
                {row.short}
              </span>
              <span className='font-bold text-accent-peach-dark text-right'>
                {row.long}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    question: "¿Necesito reservar con anticipación?",
    answer:
      "Sí, trabajamos con reserva para garantizar atención individual a cada perro, pero para auto-lavado puedes llegar y si la máquina está en uso la espera es corta en general. Por comodidad, puedes reservar fácilmente desde esta página en menos de 2 minutos, sin llamadas ni mensajes."
  },
  {
    question: "¿Atienden razas grandes?",
    answer:
      "Sí, atendemos todas las razas y tamaños. El precio varía según el tamaño del perro y el largo del pelaje. Si tienes dudas sobre tu caso específico, escríbenos por WhatsApp."
  },
  {
    question: "¿Qué pasa si mi perro es nervioso o le tiene miedo al agua?",
    answer:
      "Somos especialmente pacientes con perros ansiosos. Trabajamos a su ritmo, sin apuros. Muchos de nuestros clientes habituales llegaron la primera vez muy nerviosos y hoy entran solos."
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
                  <div className='px-6 pb-5 text-primary/70 font-light text-sm leading-relaxed'>
                    {faq.answer}
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
