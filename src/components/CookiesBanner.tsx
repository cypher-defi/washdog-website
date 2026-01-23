"use client"

import { useState, useEffect } from "react"

export function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookies-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookies-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookies-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-primary/10 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-primary/70 text-center sm:text-left">
          Usamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestra{" "}
          <a href="/privacy" className="text-accent-blue underline hover:text-accent-blue/80">
            política de privacidad
          </a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm font-medium text-primary/60 hover:text-primary transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-medium bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
