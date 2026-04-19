import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
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

function dateToDateString(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: "America/Santiago" })
}

function parseEventSummary(summary: string) {
  const match = summary.match(/^(.+?)\s*-\s*(Baño|Corte)\s*\((.+?)\)/)
  if (!match) return { name: summary, serviceType: "bath", size: "" }
  return {
    name: match[1].trim(),
    serviceType: match[2] === "Baño" ? "bath" : "cut",
    size: match[3].trim(),
  }
}

function parseNotes(description: string) {
  const dogMatch = description?.match(/Dog:\s*([^\n,]+)/)
  const phoneMatch = description?.match(/Phone:\s*([^\n,]+)/)
  return {
    dogName: dogMatch?.[1]?.trim() || "",
    phone: phoneMatch?.[1]?.trim() || "",
  }
}

export async function GET(req: NextRequest) {
  const apiKey =
    req.headers.get("x-api-key") || req.nextUrl.searchParams.get("apiKey")
  if (!process.env.POS_API_KEY || apiKey !== process.env.POS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS })
  }

  const date = req.nextUrl.searchParams.get("date")
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Missing or invalid date" }, { status: 400 })
  }

  try {
    const calendar = await getCalendarClient()

    const base = new Date(`${date}T00:00:00Z`)
    const timeMin = new Date(base.getTime() - 4 * 60 * 60 * 1000).toISOString()
    const timeMax = new Date(base.getTime() + 28 * 60 * 60 * 1000).toISOString()

    const [bathRes, cutRes] = await Promise.all([
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_BATH_ID!,
        timeMin, timeMax, singleEvents: true, orderBy: "startTime",
      }),
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_CUT_ID!,
        timeMin, timeMax, singleEvents: true, orderBy: "startTime",
      }),
    ])

    const allEvents = [
      ...(bathRes.data.items || []),
      ...(cutRes.data.items || []),
    ]

    const reservations = allEvents
      .filter(e => e.start?.dateTime)
      .map(e => {
        const startDT = new Date(e.start!.dateTime!)
        if (dateToDateString(startDT) !== date) return null

        const { name, serviceType, size } = parseEventSummary(e.summary || "")
        const { dogName, phone } = parseNotes(e.description || "")

        return {
          eventId: e.id,
          name,
          dogName,
          phone,
          serviceType,
          size,
          startTime: e.start!.dateTime as string,
          endTime: e.end!.dateTime as string,
        }
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))

    return NextResponse.json({ reservations }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[pos-reservations]", err)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500, headers: CORS_HEADERS })
  }
}
