import { NextRequest, NextResponse } from "next/server"
import { createHmac } from "crypto"

const RESEND_API_KEY      = process.env.RESEND_API_KEY!
const RESEND_AUDIENCE     = process.env.RESEND_AUDIENCE_ID!
const NEWSLETTER_SECRET   = process.env.NEWSLETTER_SECRET ?? "changeme"
const BASE_URL            = "https://www.washdog.cl"

function makeUnsubscribeToken(email: string): string {
  const ts  = Math.floor(Date.now() / 1000)
  const sig = createHmac("sha256", NEWSLETTER_SECRET)
    .update(`${email}:${ts}`)
    .digest("hex")
  return `${ts}.${sig}`
}

function welcomeHtml(firstName: string, unsubscribeUrl: string): string {
  const name = firstName || "Hola"
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:40px 20px;">
        <table role="presentation" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1f24;padding:40px;text-align:center;">
              <p style="margin:0 0 6px;color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Santiago a Cuatro Patas</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:600;letter-spacing:-0.5px;">Ya eres parte 🐾</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#1a1f24;font-size:16px;font-weight:500;">Hola ${name},</p>
              <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;font-weight:300;">
                Te suscribiste a <strong style="color:#1a1f24;font-weight:600;">Santiago a Cuatro Patas</strong>, la guía semanal para vivir Santiago con tu perro — parques, eventos, tips de grooming y ofertas de Washdog.
              </p>
              <p style="margin:0 0 32px;color:#475569;font-size:15px;line-height:1.7;font-weight:300;">
                Cada sábado a las 9:00 AM te llegará la nueva edición. Mientras tanto, puedes leer la primera aquí:
              </p>

              <!-- CTA -->
              <table role="presentation" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:#1a1f24;border-radius:50px;padding:14px 32px;">
                    <a href="${BASE_URL}/newsletter/issue-1" style="color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;">Leer edición #1 →</a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #f1f5f9;margin:0 0 24px;">

              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;text-align:center;">
                Washdog · Av. Irarrázaval 2086 B, Ñuñoa<br>
                <a href="${unsubscribeUrl}" style="color:#94a3b8;">Cancelar suscripción</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string     = (body.email ?? "").trim().toLowerCase()
    const firstName: string = (body.first_name ?? "").trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    if (!RESEND_API_KEY || !RESEND_AUDIENCE) {
      console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID")
      return NextResponse.json({ error: "Server error" }, { status: 500 })
    }

    // 1. Add to audience
    const audienceRes = await fetch(
      `https://api.resend.com/audiences/${RESEND_AUDIENCE}/contacts`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, first_name: firstName, unsubscribed: false }),
      }
    )

    if (!audienceRes.ok) {
      const err = await audienceRes.text()
      console.error("Resend audience error:", err)
      return NextResponse.json({ error: "No se pudo suscribir" }, { status: 500 })
    }

    // 2. Send welcome email
    const token = makeUnsubscribeToken(email)
    const unsubscribeUrl = `${BASE_URL}/api/newsletter-unsubscribe?email=${encodeURIComponent(email)}&token=${token}`

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Santiago a Cuatro Patas <newsletter@washdog.cl>",
        to: email,
        subject: "Ya estás suscrito 🐾 — Santiago a Cuatro Patas",
        html: welcomeHtml(firstName, unsubscribeUrl),
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:contacto@washdog.cl?subject=Unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("newsletter-signup error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
