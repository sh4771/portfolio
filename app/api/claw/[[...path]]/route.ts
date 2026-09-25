import { NextRequest, NextResponse } from "next/server"

const GAME_ORIGIN = "https://claw-machine-portfolio-page.replit.app"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path = [] } = await params
  const upstreamUrl = new URL(`${GAME_ORIGIN}/${path.join("/")}`)
  upstreamUrl.search = new URL(request.url).search

  const response = await fetch(upstreamUrl, { cache: "no-store" })
  if (!response.ok) {
    return new NextResponse("Game unavailable", { status: response.status })
  }

  const contentType = response.headers.get("content-type") ?? "application/octet-stream"
  if (!contentType.includes("text/") && !contentType.includes("javascript")) {
    return new NextResponse(response.body, {
      headers: { "content-type": contentType },
    })
  }

  const body = (await response.text()).replaceAll("/assets/", "/api/claw/assets/")
  return new NextResponse(body, {
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
  })
}