import { NextResponse } from "next/server"
import { after } from "next/server"
import { saveVisit, visitFromRequest } from "@/lib/visit-log"

// VENDELUX_PASSWORD is the shared password (logged as "General").
// VENDELUX_CODES adds one code per person or company, so the visit log shows who
// opened the work: "Palantir:palantir-26, Google Maps:gmaps-26"
function accessCodes() {
  const codes = new Map<string, string>()
  const shared = process.env.VENDELUX_PASSWORD?.trim()
  if (shared) codes.set(shared, "General")
  for (const pair of (process.env.VENDELUX_CODES ?? "").split(",")) {
    const i = pair.lastIndexOf(":")
    if (i <= 0) continue
    const label = pair.slice(0, i).trim()
    const code = pair.slice(i + 1).trim()
    if (label && code) codes.set(code, label)
  }
  return codes
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const submitted = typeof body.password === "string" ? body.password.trim() : ""
  const page = typeof body.from === "string" ? body.from : null

  const codes = accessCodes()
  if (codes.size === 0) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 500 })
  }

  const label = codes.get(submitted) ?? null
  const visit = visitFromRequest(request, !!label, label, page)
  after(() => saveVisit(visit))

  if (!label) {
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
