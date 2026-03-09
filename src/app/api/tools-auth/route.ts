import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correct = process.env.TOOLS_PASSWORD

  if (!correct) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 })
  }

  if (password !== correct) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set("tools_auth", correct, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
  return res
}
