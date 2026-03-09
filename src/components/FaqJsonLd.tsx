const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el baño?",
      acceptedAnswer: { "@type": "Answer", text: "El baño vale $10.000 para perros de hasta 20 kg y $16.000 para perros de más de 20 kg. Incluye shampoo suave, secado y limpieza básica. Sin químicos agresivos." }
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta la peluquería?",
      acceptedAnswer: { "@type": "Answer", text: "La peluquería incluye baño, brushing y limpiado de orejas. Precios según tamaño y tipo de pelo: Toy $15.000–$20.000, Pequeño $18.000–$25.000, Mediano $22.000–$30.000, Grande $30.000–$35.000, Gigante $38.000–$50.000, Gato $40.000." }
    },
    {
      "@type": "Question",
      name: "¿Necesito reservar con anticipación?",
      acceptedAnswer: { "@type": "Answer", text: "Sí, trabajamos con reserva para garantizar atención individual a cada perro, pero para auto-lavado puedes llegar y si la máquina está en uso la espera es corta en general. Por comodidad, puedes reservar fácilmente en menos de 2 minutos." }
    },
    {
      "@type": "Question",
      name: "¿Atienden razas grandes?",
      acceptedAnswer: { "@type": "Answer", text: "Sí, atendemos todas las razas y tamaños. El precio varía según el tamaño del perro y el largo del pelaje. Si tienes dudas sobre tu caso específico, escríbenos por WhatsApp." }
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si mi perro es nervioso o le tiene miedo al agua?",
      acceptedAnswer: { "@type": "Answer", text: "Somos especialmente pacientes con perros ansiosos. Trabajamos a su ritmo, sin apuros. Muchos de nuestros clientes habituales llegaron la primera vez muy nerviosos y hoy entran solos." }
    }
  ]
}

export async function FaqJsonLd() {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}
