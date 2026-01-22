import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { kv } from "@vercel/kv"

const SOFT_LOCK_TTL_SECONDS = 300 // 5 minutes

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
    const { calendarId, startTime, endTime } = body

    // 1️⃣ Validate input
    if (!calendarId || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      )
    }

    if (start >= end) {
      return NextResponse.json({ error: "Invalid time range" }, { status: 400 })
    }

    if (start.getTime() < Date.now()) {
      return NextResponse.json(
        { error: "Cannot lock past time" },
        { status: 400 }
      )
    }

    // 2️⃣ Fetch active locks for this calendar
    const lockKeys = await kv.keys(`lock:${calendarId}:*`)

    for (const key of lockKeys) {
      const existing = await kv.get<SoftLock>(key)
      if (!existing) continue

      const existingStart = new Date(existing.startTime)
      const existingEnd = new Date(existing.endTime)

      // Overlap check
      if (existingStart < end && existingEnd > start) {
        return NextResponse.json(
          { error: "Este horario está temporalmente ocupado, intenta otro." },
          { status: 409 }
        )
      }
    }

    // 3️⃣ Create lock
    const lockId = randomUUID()
    const expiresAt = new Date(Date.now() + SOFT_LOCK_TTL_SECONDS * 1000)

    const lock: SoftLock = {
      id: lockId,
      calendarId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      expiresAt: expiresAt.toISOString()
    }

    const lockKey = `lock:${calendarId}:${lockId}`

    await kv.set(lockKey, lock, {
      ex: SOFT_LOCK_TTL_SECONDS
    })

    return NextResponse.json({
      lockId,
      expiresAt
    })
  } catch (err) {
    console.error("lockSlot error:", err)
    return NextResponse.json(
      { error: "Failed to create lock" },
      { status: 500 }
    )
  }
}
