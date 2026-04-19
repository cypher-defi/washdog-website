import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "x-api-key, Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

async function getCalendarClient() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  )
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  return google.calendar({ version: "v3", auth })
}

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key")
  if (!process.env.POS_API_KEY || apiKey !== process.env.POS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS })
  }

  let body: { date?: string; calendar?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers: CORS_HEADERS })
  }

  const { date, calendar } = body
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Missing or invalid date" }, { status: 400, headers: CORS_HEADERS })
  }
  if (calendar !== "bath" && calendar !== "cut") {
    return NextResponse.json({ error: "calendar must be 'bath' or 'cut'" }, { status: 400, headers: CORS_HEADERS })
  }

  const calendarId = calendar === "bath"
    ? process.env.GOOGLE_CALENDAR_BATH_ID!
    : process.env.GOOGLE_CALENDAR_CUT_ID!

  // next day for all-day event end (Google Calendar convention)
  const nextDay = new Date(date + "T12:00:00Z")
  nextDay.setDate(nextDay.getDate() + 1)
  const nextDayStr = nextDay.toISOString().split("T")[0]

  try {
    const cal = await getCalendarClient()
    const event = await cal.events.insert({
      calendarId,
      requestBody: {
        summary: "🔒 BLOQUEADO - Sin disponibilidad",
        start: { date },
        end:   { date: nextDayStr },
        transparency: "opaque",
        status: "confirmed",
      },
    })
    return NextResponse.json({ eventId: event.data.id }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[pos-block-day]", err)
    return NextResponse.json({ error: "Failed to block day" }, { status: 500, headers: CORS_HEADERS })
  }
}
