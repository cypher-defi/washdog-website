import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { CookiesBanner } from "@/components/CookiesBanner"
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"]
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"]
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.washdog.cl"),
  title: {
    default: "Washdog | Baño y Peluquería Canina en Ñuñoa, Santiago",
    template: "%s | Washdog Ñuñoa"
  },
  description:
    "Baño y peluquería canina en Ñuñoa, Santiago. Baños suaves, cortes profesionales y cuidado amoroso para tu mascota. Reserva tu hora fácilmente.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.washdog.cl",
    siteName: "Washdog",
    title: "Washdog | Baño y Peluquería Canina en Ñuñoa, Santiago",
    description:
      "Baño y peluquería canina en Ñuñoa, Santiago. Baños suaves, cortes profesionales y cuidado amoroso para tu mascota.",
    images: ["/hero-beagle.png"]
  },
  alternates: {
    canonical: "https://www.washdog.cl"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  keywords:
    "baño perros ñuñoa, peluquería canina ñuñoa, baño self service ñuñoa, peluquería perros santiago"
}

const faqPageSchema = {
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
      acceptedAnswer: { "@type": "Answer", text: "La peluquería incluye baño, brushing y limpiado de orejas. Precios según tamaño y tipo de pelo: Toy $15.000–$20.000, Pequeño $18.000–$25.000, Mediano $22.000–$30.000, Grande $30.000–$35.000, Gigante $38.000–$50.000, Gato $30.000." }
    },
    {
      "@type": "Question",
      name: "¿Necesito reservar con anticipación?",
      acceptedAnswer: { "@type": "Answer", text: "Sí, trabajamos con reserva para garantizar atención individual a cada perro, pero para auto-lavado puedes llegar y si la máquina está en uso la espera es corta en general. Por comodidad, puedes reservar fácilmente desde esta página en menos de 2 minutos." }
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className='scroll-smooth'>
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans text-primary bg-background antialiased flex flex-col min-h-screen`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        <LocalBusinessJsonLd />
        {children}
        <CookiesBanner />
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-95EBGHVYEP'
          strategy='afterInteractive'
        />
        <Script id='ga-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-95EBGHVYEP');
          `}
        </Script>
      </body>
    </html>
  )
}
