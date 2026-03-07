import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auto Lavado de Perros Ñuñoa | WashDog",
  description:
    "Auto lavado de perros en Ñuñoa, Santiago. Lava a tu perro tú mismo con nuestras instalaciones profesionales — tinas equipadas, secadores y productos premium.",
  keywords:
    "auto lavado perros Ñuñoa, self service perros Ñuñoa, lavar perro yo mismo Santiago, auto baño perros Ñuñoa",
  alternates: { canonical: "https://www.washdog.cl/servicios/auto-lavado-perros-nunoa" },
  openGraph: {
    title: "Auto Lavado de Perros Ñuñoa | WashDog",
    description:
      "Lava a tu perro tú mismo con nuestras tinas profesionales en Ñuñoa. Shampoo, secadora y todo el equipamiento incluido.",
    url: "https://www.washdog.cl/servicios/auto-lavado-perros-nunoa",
    locale: "es_CL",
    type: "website",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
