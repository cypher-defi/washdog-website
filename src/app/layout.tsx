import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { CookiesBanner } from "@/components/CookiesBanner"

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
