import { NextResponse } from "next/server"
import { del, get, list, put } from "@vercel/blob"
import { sanitizeFlower, type Flower } from "@/lib/flower"
import { CARE_PREFIX, tallyCare } from "@/lib/garden-care"

/**
 * The shared garden. Each planted flower is one small JSON file in the site's Vercel
 * Blob store. Until a store is connected (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID), GET answers
 * shared: false and the page keeps flowers in the visitor's own browser instead.
 */
const PREFIX = "garden/"
const ready = () => !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)

/** Stores are created private or public; write private when the store allows it, public otherwise. */
async function save(path: string, body: string, contentType: string) {
  try {
    return await put(path, body, { access: "private", contentType, addRandomSuffix: false })
  } catch (err) {
    console.warn("[garden] private write failed, trying public", err)
    return await put(path, body, { access: "public", contentType, addRandomSuffix: false })
  }
}

async function read(b: { pathname: string; url: string }) {
  try {
    const res = await get(b.pathname, { access: "private" })
    if (res && res.statusCode === 200) return await new Response(res.stream).text()
  } catch {
    /* public store */
  }
  const r = await fetch(b.url, { cache: "no-store" })
  return r.ok ? await r.text() : null
}

export async function GET(request: Request) {
  if (!ready()) return NextResponse.json({ shared: false, flowers: [] })
  // Temporary self-test: writes and removes one marker so a deploy can confirm planting works.
  if (new URL(request.url).searchParams.get("check") === "1") {
    try {
      const b = await save(`check/${Date.now()}`, "ok", "text/plain")
      await del(b.url).catch(() => {})
      return NextResponse.json({ write: "ok" })
    } catch (err) {
      return NextResponse.json({ write: "failed", reason: err instanceof Error ? err.message.slice(0, 300) : "unknown" })
    }
  }
  try {
    const page = await list({ prefix: PREFIX, limit: 1000 })
    // File names start with the timestamp, so sorting by name sorts by time.
    const newest = page.blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1)).slice(0, 300)
    const flowers = (
      await Promise.all(
        newest.map(async (b) => {
          try {
            const text = await read(b)
            if (!text) return null
            const f = sanitizeFlower(JSON.parse(text))
            // Keep the original planting time instead of the time it was read.
            if (f) f.at = b.pathname.slice(PREFIX.length, PREFIX.length + 24)
            return f
          } catch {
            return null
          }
        }),
      )
    ).filter((f): f is Flower => !!f)
    return NextResponse.json({ shared: true, flowers, care: await readCare() }, { headers: { "Cache-Control": "no-store" } })
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
    await save(`${PREFIX}${flower.at.replace(/[:.]/g, "-")}-${flower.id}.json`, JSON.stringify(flower), "application/json")
    return NextResponse.json({ flower })
  } catch (err) {
    console.error("[garden] save failed", err)
    return NextResponse.json({ error: "Couldn't plant it right now." }, { status: 500 })
  }
}

/** Counts every act of care from the marker files; a few pages is plenty for a portfolio garden. */
async function readCare() {
  const paths: string[] = []
  try {
    let cursor: string | undefined
    for (let i = 0; i < 5; i++) {
      const page = await list({ prefix: CARE_PREFIX, limit: 1000, cursor })
      paths.push(...page.blobs.map((b) => b.pathname))
      if (!page.hasMore) break
      cursor = page.cursor
    }
  } catch (err) {
    console.error("[garden] care read failed", err)
  }
  return tallyCare(paths)
}
