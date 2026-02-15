import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customerName, service, date, phone } = body

    console.log(
      `Received booking: ${customerName}, ${service}, ${date}, ${phone}`
    )

    // For now, just respond back
    return NextResponse.json({ message: "Function received data successfully" })
  } catch (error) {
    console.error("Error in POST /whatsappConfirmation:", error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "This endpoint only supports POST" },
    { status: 405 }
  )
}
