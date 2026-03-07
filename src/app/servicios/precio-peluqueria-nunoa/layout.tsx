import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Precio Peluquería Canina Ñuñoa | WashDog",
  description:
    "Precios de peluquería canina en Ñuñoa 2026. Tarifas por tamaño y servicio — baño, corte y spa. Sin cobros ocultos. WashDog Ñuñoa.",
  keywords:
    "precio peluquería canina Ñuñoa, cuánto cuesta peluquería perros Ñuñoa, tarifa baño perros Ñuñoa, costo grooming perros Santiago",
  alternates: { canonical: "https://www.washdog.cl/servicios/precio-peluqueria-nunoa" },
  openGraph: {
    title: "Precio Peluquería Canina Ñuñoa | WashDog",
    description:
      "Tarifas claras por tamaño y servicio. Baño, corte y spa canino en Ñuñoa — sin sorpresas en el precio.",
    url: "https://www.washdog.cl/servicios/precio-peluqueria-nunoa",
    locale: "es_CL",
    type: "website",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
