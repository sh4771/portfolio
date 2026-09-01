import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }))

  const correctPassword = process.env.VENDELUX_PASSWORD?.trim()
  const submitted = typeof password === "string" ? password.trim() : ""

  if (!correctPassword) {
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 500 },
    )
  }

  if (submitted !== correctPassword) {
    return NextResponse.json({ ok: false, reason: "wrong_password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("vendelux_access", "granted", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
  return response
}
