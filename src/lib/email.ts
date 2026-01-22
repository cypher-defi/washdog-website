import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

interface BookingEmailData {
  to: string
  name: string
  dogName: string
  phoneNumber: string
  service: "bath" | "cut"
  size: "small" | "medium" | "large"
  startTime: Date
  endTime: Date
}

const SERVICE_LABELS = {
  bath: "Baño",
  cut: "Corte"
}

const SIZE_LABELS = {
  small: "Pequeño (5-10 kg)",
  medium: "Mediano (10-20 kg)",
  large: "Grande (20-40 kg)"
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-CL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const serviceLabel = SERVICE_LABELS[data.service]
  const sizeLabel = SIZE_LABELS[data.size]
  const dateStr = formatDate(data.startTime)
  const startTimeStr = formatTime(data.startTime)
  const endTimeStr = formatTime(data.endTime)

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1f24 0%, #2d3748 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🐕 WashDog
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                Peluquería Canina
              </p>
            </td>
          </tr>

          <!-- Confirmation Badge -->
          <tr>
            <td style="padding: 30px 40px 20px; text-align: center;">
              <div style="display: inline-block; background-color: #10b981; color: white; padding: 8px 20px; border-radius: 50px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                ✓ Reserva Confirmada
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0; color: #1a1f24; font-size: 22px; font-weight: 600;">
                ¡Hola ${data.name}!
              </h2>
              <p style="margin: 10px 0 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                Tu reserva para <strong>${data.dogName}</strong> ha sido confirmada exitosamente. Aquí están los detalles:
              </p>
            </td>
          </tr>

          <!-- Booking Details Card -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 24px;">
                    <!-- Service -->
                    <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 36px; height: 36px; background-color: ${data.service === "bath" ? "#3b82f6" : "#f97316"}; border-radius: 8px; text-align: center; line-height: 36px; font-size: 18px;">
                            ${data.service === "bath" ? "🛁" : "✂️"}
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Servicio</p>
                          <p style="margin: 4px 0 0; color: #1a1f24; font-size: 16px; font-weight: 600;">${serviceLabel}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Size -->
                    <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 36px; height: 36px; background-color: #e2e8f0; border-radius: 8px; text-align: center; line-height: 36px; font-size: 18px;">
                            🐾
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Tamaño</p>
                          <p style="margin: 4px 0 0; color: #1a1f24; font-size: 16px; font-weight: 600;">${sizeLabel}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Date -->
                    <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 36px; height: 36px; background-color: #e2e8f0; border-radius: 8px; text-align: center; line-height: 36px; font-size: 18px;">
                            📅
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Fecha</p>
                          <p style="margin: 4px 0 0; color: #1a1f24; font-size: 16px; font-weight: 600; text-transform: capitalize;">${dateStr}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Time -->
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 36px; height: 36px; background-color: #e2e8f0; border-radius: 8px; text-align: center; line-height: 36px; font-size: 18px;">
                            🕐
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Horario</p>
                          <p style="margin: 4px 0 0; color: #1a1f24; font-size: 16px; font-weight: 600;">${startTimeStr} - ${endTimeStr}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pet Info -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; background-color: #fef3c7; border-radius: 12px; border: 1px solid #fcd34d;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px;">
                      <strong>🐕 Mascota:</strong> ${data.dogName}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Important Notes -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 12px; color: #1a1f24; font-size: 16px; font-weight: 600;">
                📌 Información importante
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #64748b; font-size: 14px; line-height: 1.8;">
                <li>Por favor llega 5 minutos antes de tu cita</li>
                <li>Si necesitas cancelar, avísanos con al menos 24 horas de anticipación</li>
                <li>Asegúrate de que tu mascota esté cómoda y tranquila</li>
              </ul>
            </td>
          </tr>

          <!-- Contact -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; background-color: #f1f5f9; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                      ¿Tienes alguna pregunta?
                    </p>
                    <p style="margin: 0; color: #1a1f24; font-size: 15px; font-weight: 600;">
                      Contáctanos por WhatsApp o llamando
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Este correo fue enviado automáticamente.<br>
                Por favor no respondas a este mensaje.
              </p>
              <p style="margin: 12px 0 0; color: #64748b; font-size: 13px; font-weight: 500;">
                WashDog - Peluquería Canina
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
¡Hola ${data.name}!

Tu reserva para ${data.dogName} ha sido confirmada.

DETALLES DE LA RESERVA
----------------------
Servicio: ${serviceLabel}
Tamaño: ${sizeLabel}
Fecha: ${dateStr}
Horario: ${startTimeStr} - ${endTimeStr}
Mascota: ${data.dogName}

INFORMACIÓN IMPORTANTE
----------------------
- Por favor llega 5 minutos antes de tu cita
- Si necesitas cancelar, avísanos con al menos 24 horas de anticipación
- Asegúrate de que tu mascota esté cómoda y tranquila

¡Te esperamos!
WashDog - Peluquería Canina
`

  console.log("Sending email to:", data.to)
  console.log("From:", process.env.GMAIL_USER)

  const result = await transporter.sendMail({
    from: `"WashDog" <${process.env.GMAIL_USER}>`,
    to: data.to,
    subject: `✓ Reserva Confirmada - ${serviceLabel} para ${data.dogName}`,
    text,
    html
  })

  console.log("Email sent successfully:", result.messageId)
  return result
}
