import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { sendBusinessNotification } from "@/lib/email"

const SLOT_DURATIONS: Record<string, Record<string, number>> = {
  bath: { toy: 20, small: 20, medium: 20, large: 40, giant: 40, cat: 20 },
  cut:  { toy: 60, small: 60, medium: 90, large: 120, giant: 120, cat: 60 }
}

const SIZE_LABELS: Record<string, string> = {
  toy: 'Toy', small: 'Pequeño', medium: 'Mediano', large: 'Grande', giant: 'Gigante', cat: 'Gato'
}

// Checks if two time ranges overlap
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
    if (!Object.keys(SIZE_LABELS).includes(size))
      return NextResponse.json({ error: "Tamaño inválido" }, { status: 400 })

    // startTime is expected as "YYYY-MM-DDTHH:MM:SS" in Santiago timezone (no Z suffix)
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

    // Parse as Santiago time for overlap checking
    const start = new Date(`${startTime}-03:00`)
    const end = new Date(`${endTimeStr}-03:00`)

    const calendarId =
      service === "bath"
        ? process.env.GOOGLE_CALENDAR_BATH_ID!
        : process.env.GOOGLE_CALENDAR_CUT_ID!

    const calendar = await getCalendarClient()

    // 2️⃣ Check availability on the service calendar
    const existing = await calendar.events.list({
      calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true
    })

    for (const event of existing.data.items || []) {
      if (!event.start || !event.end) continue
      const startStr = event.start.dateTime || event.start.date
      const endStr = event.end.dateTime || event.end.date
      if (!startStr || !endStr) continue
      if (overlaps(new Date(startStr), new Date(endStr), start, end)) {
        return NextResponse.json(
          { error: "Este horario no está disponible" },
          { status: 409 }
        )
      }
    }

    // 3️⃣ Create the calendar event
    const serviceLabel = service === "bath" ? "Baño" : "Corte"
    const sizeLabel = SIZE_LABELS[size] ?? size

    console.log("[createReservation] Creating event:", {
      calendarId,
      startTime,
      endTimeStr,
      name,
      email
    })

    const created = await calendar.events.insert({
      calendarId,
      sendUpdates: "all",
      requestBody: {
        summary: `${name} - ${serviceLabel} (${sizeLabel})`,
        description: `Reserva Washdog\n\nServicio: ${serviceLabel}\nTamaño: ${sizeLabel}\n\n${notes || ""}`,
        start: { dateTime: startTime, timeZone: "America/Santiago" },
        end: { dateTime: endTimeStr, timeZone: "America/Santiago" },
        attendees: [
          ...(email ? [{ email }] : []),
          { email: "contacto@washdog.cl" }
        ]
      }
    })

    console.log("[createReservation] Event created:", created.data.id)

    // Parse notes to extract dogName and phoneNumber
    const dogNameMatch = (notes || "").match(/Dog:\s*([^,]+)/)
    const phoneMatch = (notes || "").match(/Phone:\s*([^,]+)/)
    const dogName = dogNameMatch ? dogNameMatch[1].trim() : ""
    const phoneNumber = phoneMatch ? phoneMatch[1].trim() : ""

    // Send business notification email (non-blocking)
    sendBusinessNotification({
      to: email || "",
      name,
      dogName,
      phoneNumber,
      service,
      size,
      startTime: start,
      endTime: end
    }).catch(err => console.error("[createReservation] Business notification failed:", err))

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
