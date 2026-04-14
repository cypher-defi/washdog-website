import { NextRequest, NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "crypto"

const RESEND_API_KEY    = process.env.RESEND_API_KEY!
const RESEND_AUDIENCE   = process.env.RESEND_AUDIENCE_ID!
const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET ?? "changeme"
const MAX_AGE_DAYS      = 365

function verifyToken(email: string, token: string): boolean {
  const parts = token.split(".")
  if (parts.length !== 2) return false

  const [tsStr, sig] = parts
  const ts = parseInt(tsStr, 10)
  if (isNaN(ts)) return false

  const ageSeconds = Date.now() / 1000 - ts
  if (ageSeconds > MAX_AGE_DAYS * 86400) return false

  const expected = createHmac("sha256", NEWSLETTER_SECRET)
    .update(`${email}:${tsStr}`)
    .digest("hex")

  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

// GET: user clicks unsubscribe link from email
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = (searchParams.get("email") ?? "").trim().toLowerCase()
  const token = (searchParams.get("token") ?? "").trim()

  if (!email || !token) {
    return new NextResponse("Parámetros inválidos", { status: 400 })
  }

  if (!verifyToken(email, token)) {
    return new NextResponse("Enlace inválido o expirado", { status: 400 })
  }

  await unsubscribeFromResend(email)

  // Redirect to a friendly confirmation page (or show inline message)
  return new NextResponse(
    `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
    <title>Suscripción cancelada</title>
    <style>body{font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#333}
    h1{font-size:22px}p{color:#666}a{color:#d97706}</style></head>
    <body><h1>Listo 👋</h1>
    <p>Tu suscripción a <strong>Santiago a Cuatro Patas</strong> ha sido cancelada.</p>
    <p><a href="https://www.washdog.cl">Volver a washdog.cl</a></p>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  )
}

// POST: one-click unsubscribe (RFC 8058 / List-Unsubscribe-Post header)
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = (searchParams.get("email") ?? "").trim().toLowerCase()
  const token = (searchParams.get("token") ?? "").trim()

  if (!email || !token || !verifyToken(email, token)) {
    return NextResponse.json({ error: "Inválido" }, { status: 400 })
  }

  await unsubscribeFromResend(email)
  return NextResponse.json({ success: true })
}

async function unsubscribeFromResend(email: string): Promise<void> {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE) return

  // Find the contact ID first
  const listRes = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE}/contacts`,
    { headers: { "Authorization": `Bearer ${RESEND_API_KEY}` } }
  )
  if (!listRes.ok) return

  const { data } = await listRes.json()
  const contact = (data ?? []).find(
    (c: { email: string }) => c.email.toLowerCase() === email
  )
  if (!contact) return

  await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE}/contacts/${contact.id}`,
    {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unsubscribed: true }),
    }
  )
}
