import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const SLOT_DURATIONS: Record<string, Record<string, number>> = {
  bath: { small: 15, medium: 30, large: 45 },
  cut: { small: 60, medium: 90, large: 120 }
}

// Checks if two time ranges overla
function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && aEnd > bStart
}

// Returns a Google Calendar client with OAuth2 credentials
async function getCalendarClient() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  )
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  return google.calendar({ version: "v3", auth })
}

export async function POST(req: NextRequest) {
  try {
    const { service, size, startTime, name, email, notes } = await req.json()

    // 1️⃣ Validate input
    if (!["bath", "cut"].includes(service))
      return NextResponse.json({ error: "Servicio inválido" }, { status: 400 })
    if (!["small", "medium", "large"].includes(size))
      return NextResponse.json({ error: "Tamaño inválido" }, { status: 400 })

    // startTime is expected as "YYYY-MM-DDTHH:MM:SS" in Santiago timezone (no Z suffix)
    // Parse it and validate
    const startMatch = startTime.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/)
    if (!startMatch)
      return NextResponse.json({ error: "Hora inválida" }, { status: 400 })

    const [, dateStr, hourStr, minStr] = startMatch
    const duration = SLOT_DURATIONS[service][size]

    // Calculate end time
    const startMinutes = parseInt(hourStr) * 60 + parseInt(minStr)
    const endMinutes = startMinutes + duration
    const endHour = Math.floor(endMinutes / 60).toString().padStart(2, '0')
    const endMin = (endMinutes % 60).toString().padStart(2, '0')
    const endTimeStr = `${dateStr}T${endHour}:${endMin}:00`

    // For overlap checking, we need actual Date objects
    // Parse as Santiago time by appending offset (approximate, will be close enough for overlap check)
    const start = new Date(`${startTime}-03:00`)  // Santiago is UTC-3 or UTC-4
    const end = new Date(`${endTimeStr}-03:00`)

    // 2️⃣ Select calendar ID based on service
    const calendarId =
      service === "bath"
        ? process.env.GOOGLE_CALENDAR_BATH_ID
        : process.env.GOOGLE_CALENDAR_CUT_ID

    const calendar = await getCalendarClient()

    // 3️⃣ Fetch potential overlapping events
    const existing = await calendar.events.list({
      calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true
    })

    // 4️⃣ Manual overlap detection
    for (const event of existing.data.items || []) {
      // Skip events with missing start or end
      if (!event.start || !event.end) continue

      // Use dateTime first, fallback to all-day date
      const startStr = event.start.dateTime || event.start.date
      const endStr = event.end.dateTime || event.end.date

      if (!startStr || !endStr) continue

      const eventStart = new Date(startStr)
      const eventEnd = new Date(endStr)

      if (overlaps(eventStart, eventEnd, start, end)) {
        return NextResponse.json(
          { error: "Este horario no está disponible" },
          { status: 409 }
        )
      }
    }

    // 5️⃣ Create the event (use local time strings with timezone, not ISO/UTC)
    const serviceLabel = service === "bath" ? "Baño" : "Corte"
    const sizeLabel = size === "small" ? "Pequeño" : size === "medium" ? "Mediano" : "Grande"

    console.log("[createReservation] Creating event:", {
      calendarId,
      startTime,
      endTimeStr,
      name,
      email
    })

    const created = await calendar.events.insert({
      calendarId,
      sendUpdates: "all", // Send email notifications to attendees
      requestBody: {
        summary: `${name} - ${serviceLabel} (${sizeLabel})`,
        description: `Reserva Washdog\n\nServicio: ${serviceLabel}\nTamaño: ${sizeLabel}\n\n${notes || ""}`,
        start: { dateTime: startTime, timeZone: "America/Santiago" },
        end: { dateTime: endTimeStr, timeZone: "America/Santiago" },
        attendees: email ? [{ email }] : []
      }
    })

    console.log("[createReservation] Event created:", created.data.id)
    return NextResponse.json({ eventId: created.data.id })
  } catch (err: unknown) {
    console.error("Create reservation error:", err)
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Error desconocido al crear la reserva"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
