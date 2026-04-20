import { NextRequest, NextResponse } from "next/server"
import { sendReceiptEmail } from "@/lib/email"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "x-api-key, Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key")
  if (!process.env.POS_API_KEY || apiKey !== process.env.POS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS })
  }

  try {
    const body = await req.json()
    const { to, name, dogName, services, total, metodo, fecha } = body

    if (!to || !to.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400, headers: CORS_HEADERS })
    }

    await sendReceiptEmail({ to, name, dogName, services, total, metodo, fecha })
    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[pos-send-receipt]", err)
    return NextResponse.json({ error: "Error al enviar boleta" }, { status: 500, headers: CORS_HEADERS })
  }
}
