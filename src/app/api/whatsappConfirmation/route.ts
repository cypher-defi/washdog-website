import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customerName, service, date, phone } = body

    console.log(
      `Received booking: ${customerName}, ${service}, ${date}, ${phone}`
    )

    // Get environment variables
    const token = process.env.WHATSAPP_TOKEN
    const phoneNumberId = process.env.PHONE_NUMBER_ID

    if (!token || !phoneNumberId) {
      console.error("WHATSAPP_TOKEN or PHONE_NUMBER_ID not set")
      return NextResponse.json(
        { message: "Server not configured correctly" },
        { status: 500 }
      )
    }

    // Send WhatsApp message
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone, // must be in international format: +34123456789
          type: "text",
          text: {
            body: `Hola ${customerName}, tu reserva para ${service} el ${date} está confirmada!`
          }
        })
      }
    )

    const data = await response.json()
    console.log("WhatsApp API response:", data)

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to send WhatsApp message", error: data },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Booking received and WhatsApp sent successfully",
      whatsappResponse: data
    })
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
