import { NextResponse } from "next/server"
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null)
  const submitted = String(form?.get("password") ?? "").trim()
  const token = adminToken()
  const back = new URL("/admin/visits", request.url)

  if (!token || submitted !== process.env.ADMIN_PASSWORD?.trim()) {
    back.searchParams.set("error", token ? "wrong" : "not_configured")
    return NextResponse.redirect(back, 303)
  }

  const res = NextResponse.redirect(back, 303)
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  })
  return res
}
