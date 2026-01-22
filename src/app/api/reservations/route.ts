import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const BASE_SLOT_MINUTES = 15

async function getCalendarClient() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  })
  return google.calendar({ version: "v3", auth: oAuth2Client })
}

// Convert a Date to HH:MM string in Santiago timezone
function dateToTimeString(date: Date): string {
  const timeStr = date.toLocaleTimeString("en-US", {
    timeZone: "America/Santiago",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  })
  return timeStr
}

// Get date string (YYYY-MM-DD) in Santiago timezone
function dateToDateString(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    timeZone: "America/Santiago"
  })
}

// Expand a booking into all 15-minute slots it occupies (only for the target date)
function expandBookingToSlots(startDate: Date, endDate: Date, targetDate: string): string[] {
  const slots: string[] = []
  const current = new Date(startDate)

  while (current < endDate) {
    // Only include slots that fall on the target date in Santiago timezone
    if (dateToDateString(current) === targetDate) {
      slots.push(dateToTimeString(current))
    }
    current.setMinutes(current.getMinutes() + BASE_SLOT_MINUTES)
  }

  return slots
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const dateParam = searchParams.get("date")
    const service = searchParams.get("service") // 'bath' or 'cut'

    if (!dateParam || !service)
      return NextResponse.json(
        { error: "Missing date or service" },
        { status: 400 }
      )

    const calendarId =
      service === "bath"
        ? process.env.GOOGLE_CALENDAR_BATH_ID
        : process.env.GOOGLE_CALENDAR_CUT_ID

    const calendar = await getCalendarClient()

    // Query a wider UTC range to ensure we catch all events on that day in Santiago
    // Santiago is UTC-3 (summer) or UTC-4 (winter), so we pad by 4 hours each side
    const baseDateUTC = new Date(`${dateParam}T00:00:00Z`)
    const start = new Date(baseDateUTC.getTime() - 4 * 60 * 60 * 1000) // 4 hours before
    const end = new Date(baseDateUTC.getTime() + 28 * 60 * 60 * 1000)  // 28 hours after (next day + 4h buffer)

    const existing = await calendar.events.list({
      calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true
    })

    // Expand each event to all 15-minute slots it occupies (only for the selected date)
    const bookedSlots: string[] = []
    console.log(`[reservations] Fetched ${existing.data.items?.length || 0} events for ${dateParam}`)
    for (const event of existing.data.items || []) {
      console.log(`[reservations] Event: ${event.summary}, start: ${event.start?.dateTime}, end: ${event.end?.dateTime}`)
      if (event.start?.dateTime && event.end?.dateTime) {
        const eventStart = new Date(event.start.dateTime)
        const eventEnd = new Date(event.end.dateTime)
        const slots = expandBookingToSlots(eventStart, eventEnd, dateParam)
        console.log(`[reservations] Expanded to slots:`, slots)
        bookedSlots.push(...slots)
      }
    }

    // Remove duplicates
    const uniqueSlots = [...new Set(bookedSlots)]

    return NextResponse.json({ bookedSlots: uniqueSlots })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch booked slots" },
      { status: 500 }
    )
  }
}
