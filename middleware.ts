import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_PREFIX = "/work/vendelux"
const COOKIE_NAME = "vendelux_access"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the lock screen and its API route through untouched.
  if (
    pathname.startsWith("/work/vendelux-locked") ||
    pathname.startsWith("/api/vendelux-auth")
  ) {
    return NextResponse.next()
  }

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next()
  }

  const hasAccess = request.cookies.get(COOKIE_NAME)?.value === "granted"
  if (hasAccess) {
    return NextResponse.next()
  }

  // Keep the query (e.g. ?project=campaign-admin) so visitors land on the tab they clicked.
  const from = pathname + request.nextUrl.search
  const url = request.nextUrl.clone()
  url.pathname = "/work/vendelux-locked"
  url.search = ""
  url.searchParams.set("from", from)
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/work/vendelux", "/work/vendelux/:path*"],
}
