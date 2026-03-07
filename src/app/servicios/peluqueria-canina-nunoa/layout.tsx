import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Peluquería Canina Ñuñoa | WashDog",
  description:
    "Peluquería canina en Ñuñoa, Santiago. Baño, corte y cuidado premium con atención one-to-one. Sin jaulas, sin apuros — agenda online en 2 minutos.",
  keywords:
    "peluquería canina Ñuñoa, peluquería canina Ñuñoa Santiago, grooming perros Ñuñoa, baño perros Ñuñoa, corte pelo perros Ñuñoa",
  alternates: { canonical: "https://www.washdog.cl/servicios/peluqueria-canina-nunoa" },
  openGraph: {
    title: "Peluquería Canina Ñuñoa | WashDog",
    description:
      "Baño, corte y cuidado premium para tu perro en Ñuñoa. Atención individual, productos hipoalergénicos y agenda online.",
    url: "https://www.washdog.cl/servicios/peluqueria-canina-nunoa",
    locale: "es_CL",
    type: "website",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
