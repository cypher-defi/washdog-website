import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Baño de Perros Santiago | WashDog Ñuñoa",
  description:
    "Baño profesional de perros en Santiago. Shampoo hipoalergénico, secado profesional y atención individual. Agenda online — WashDog Ñuñoa.",
  keywords:
    "baño perros Santiago, baño canino Santiago, lavar perro Santiago, baño hipoalergénico perros Ñuñoa",
  alternates: { canonical: "https://www.washdog.cl/servicios/bano" },
  openGraph: {
    title: "Baño de Perros Santiago | WashDog Ñuñoa",
    description:
      "Baño profesional con shampoo hipoalergénico, secado y atención individual en WashDog Ñuñoa.",
    url: "https://www.washdog.cl/servicios/bano",
    locale: "es_CL",
    type: "website",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
