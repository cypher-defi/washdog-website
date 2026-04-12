"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function EditorGate() {
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/tools-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.replace("/tools/editor-app.html")
    } else {
      const data = await res.json()
      setError(data.error || "Contraseña incorrecta")
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      padding: "24px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "360px",
        background: "#1e293b",
        borderRadius: "20px",
        padding: "40px 36px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2C94C", marginBottom: "8px" }}>
            Washdog
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>
            Template Editor
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "6px" }}>
            Acceso restringido al equipo
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: `1.5px solid ${error ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "10px",
                padding: "12px 14px",
                color: "white",
                fontSize: "15px",
                outline: "none",
              }}
            />
            {error && (
              <div style={{ fontSize: "12px", color: "#ef4444", marginTop: "6px" }}>
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              background: loading || !password ? "rgba(242,201,76,0.4)" : "#F2C94C",
              color: "#1F2933",
              fontWeight: 800,
              fontSize: "14px",
              padding: "13px",
              borderRadius: "10px",
              border: "none",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "opacity 0.15s",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
