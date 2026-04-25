import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, OPTIONS",
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

export async function DELETE(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key")
  if (!process.env.POS_API_KEY || apiKey !== process.env.POS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS })
  }

  let body: { eventId?: string; calendar?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers: CORS_HEADERS })
  }

  const { eventId, calendar } = body
  if (!eventId || (calendar !== "bath" && calendar !== "cut")) {
    return NextResponse.json({ error: "Missing eventId or calendar" }, { status: 400, headers: CORS_HEADERS })
  }

  const calendarId = calendar === "bath"
    ? process.env.GOOGLE_CALENDAR_BATH_ID!
    : process.env.GOOGLE_CALENDAR_CUT_ID!

  try {
    const cal = await getCalendarClient()
    await cal.events.delete({ calendarId, eventId })
    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[pos-reservation DELETE]", err)
    return NextResponse.json({ error: "Failed to cancel reservation" }, { status: 500, headers: CORS_HEADERS })
  }
}
