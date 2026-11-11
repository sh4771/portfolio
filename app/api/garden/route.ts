import { NextResponse } from "next/server"
import { get, list, put } from "@vercel/blob"
import { sanitizeFlower, type Flower } from "@/lib/flower"

/**
 * The shared garden. Each planted flower is one small JSON file in the site's Vercel
 * Blob store. Until a store is connected (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID), GET answers
 * shared: false and the page keeps flowers in the visitor's own browser instead.
 */
const PREFIX = "garden/"
const ready = () => !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)

export async function GET() {
  if (!ready()) return NextResponse.json({ shared: false, flowers: [] })
  try {
    const page = await list({ prefix: PREFIX, limit: 1000 })
    // File names start with the timestamp, so sorting by name sorts by time.
    const newest = page.blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1)).slice(0, 60)
    const flowers = (
      await Promise.all(
        newest.map(async (b) => {
          try {
            const res = await get(b.pathname, { access: "private" })
            if (!res || res.statusCode !== 200) return null
            return sanitizeFlower(JSON.parse(await new Response(res.stream).text()))
          } catch {
            return null
          }
        }),
      )
    ).filter((f): f is Flower => !!f)
    return NextResponse.json({ shared: true, flowers }, { headers: { "Cache-Control": "s-maxage=15, stale-while-revalidate=60" } })
  } catch (err) {
    console.error("[garden] read failed", err)
    return NextResponse.json({ shared: false, flowers: [] })
  }
}

export async function POST(request: Request) {
  if (!ready()) return NextResponse.json({ error: "The shared garden isn't connected yet." }, { status: 503 })
  const raw = await request.text()
  if (raw.length > 60_000) return NextResponse.json({ error: "That flower is too big." }, { status: 413 })
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: "Couldn't read that flower." }, { status: 400 })
  }
  const flower = sanitizeFlower(body)
  if (!flower) return NextResponse.json({ error: "Draw or build a flower first." }, { status: 400 })
  try {
    await put(`${PREFIX}${flower.at.replace(/[:.]/g, "-")}-${flower.id}.json`, JSON.stringify(flower), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    })
    return NextResponse.json({ flower })
  } catch (err) {
    console.error("[garden] save failed", err)
    return NextResponse.json({ error: "Couldn't plant it right now." }, { status: 500 })
  }
}
