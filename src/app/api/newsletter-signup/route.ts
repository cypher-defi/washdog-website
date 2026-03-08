import { NextRequest, NextResponse } from "next/server"

const RESEND_API_KEY  = process.env.RESEND_API_KEY!
const RESEND_AUDIENCE = process.env.RESEND_AUDIENCE_ID!

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string = (body.email ?? "").trim().toLowerCase()
    const firstName: string = (body.first_name ?? "").trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    if (!RESEND_API_KEY || !RESEND_AUDIENCE) {
      console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID")
      return NextResponse.json({ error: "Server error" }, { status: 500 })
    }

    const res = await fetch(
      `https://api.resend.com/audiences/${RESEND_AUDIENCE}/contacts`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name:   firstName,
          unsubscribed: false,
        }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error("Resend error:", err)
      return NextResponse.json({ error: "No se pudo suscribir" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("newsletter-signup error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
