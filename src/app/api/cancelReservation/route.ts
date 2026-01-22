import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { kv } from "@vercel/kv"

type SoftLock = {
  id: string
  calendarId: string
  startTime: string
  endTime: string
  expiresAt: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { eventId, service } = body

    if (!eventId || !service) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 })
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET
    )
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client })

    const calendarId =
      service === "bath"
        ? process.env.GOOGLE_CALENDAR_BATH_ID
        : process.env.GOOGLE_CALENDAR_CUT_ID

    // 1️⃣ Get the event first to know its start/end time
    const event = await calendar.events.get({
      calendarId,
      eventId
    })

    const eventStart = event.data.start?.dateTime
    const eventEnd = event.data.end?.dateTime

    if (!eventStart || !eventEnd) {
      return NextResponse.json({ error: "Evento inválido" }, { status: 400 })
    }

    const start = new Date(eventStart)
    const end = new Date(eventEnd)

    // 2️⃣ Delete the event from Google Calendar
    await calendar.events.delete({ calendarId, eventId })

    // 3️⃣ Clean up overlapping soft locks
    const lockKeys = await kv.keys(`lock:${calendarId}:*`)
    for (const key of lockKeys) {
      const lock = await kv.get<SoftLock>(key)
      if (!lock) continue
      const lockStart = new Date(lock.startTime)
      const lockEnd = new Date(lock.endTime)
      if (lockStart < end && lockEnd > start) {
        await kv.del(key)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("cancelReservation error:", err)
    return NextResponse.json(
      { error: "Error al cancelar la reserva" },
      { status: 500 }
    )
  }
}
