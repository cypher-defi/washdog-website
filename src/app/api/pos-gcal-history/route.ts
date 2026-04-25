import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export const dynamic = 'force-dynamic'

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
  const dogMatch   = description?.match(/Dog:\s*([^\n,]+)/)
  const phoneMatch = description?.match(/Phone:\s*([^\n,]+)/)
  const emailMatch = description?.match(/Email:\s*([^\n,]+)/)
  return {
    dogName: dogMatch?.[1]?.trim()   || "",
    phone:   phoneMatch?.[1]?.trim() || "",
    email:   emailMatch?.[1]?.trim() || "",
  }
}

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") || req.nextUrl.searchParams.get("apiKey")
  if (!process.env.POS_API_KEY || apiKey !== process.env.POS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS })
  }

  try {
    const calendar = await getCalendarClient()

    const from = req.nextUrl.searchParams.get("from") ||
      new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString()
    const to = new Date().toISOString()

    const [bathRes, cutRes] = await Promise.all([
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_BATH_ID!,
        timeMin: from, timeMax: to,
        singleEvents: true, orderBy: "startTime", maxResults: 2500,
        fields: "items(id,summary,description,start,attendees)",
      }),
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_CUT_ID!,
        timeMin: from, timeMax: to,
        singleEvents: true, orderBy: "startTime", maxResults: 2500,
        fields: "items(id,summary,description,start,attendees)",
      }),
    ])

    const bathItems = bathRes.data.items || []
    const cutItems  = cutRes.data.items  || []

    const reservations = [...bathItems, ...cutItems]
      .filter(e => e.start?.dateTime && !(e.summary || "").includes("BLOQUEADO"))
      .map(e => {
        const { name, serviceType, size } = parseEventSummary(e.summary || "")
        const { dogName, phone, email: emailFromDesc } = parseNotes(e.description || "")
        const email = emailFromDesc ||
          (e.attendees || []).find(a => a.email && !a.email.endsWith("@washdog.cl"))?.email || ""
        const fecha = new Date(e.start!.dateTime as string)
          .toLocaleDateString("en-CA", { timeZone: "America/Santiago" })

        return {
          eventId: e.id as string,
          name,
          dogName,
          email,
          phone,
          serviceType,
          size,
          fecha,
          startTime: e.start!.dateTime as string,
        }
      })

    return NextResponse.json({ reservations }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[pos-gcal-history]", err)
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500, headers: CORS_HEADERS })
  }
}
