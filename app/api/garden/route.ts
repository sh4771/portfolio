import { NextResponse } from "next/server"
import { get, list, put } from "@vercel/blob"
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

let lastReadError = ""

async function read(b: { pathname: string; url: string }) {
  try {
    const res = await get(b.pathname, { access: "private" })
    if (res && res.statusCode === 200) return await new Response(res.stream).text()
    lastReadError = `get status ${res?.statusCode ?? "none"}`
  } catch (err) {
    lastReadError = `get threw: ${err instanceof Error ? err.message.slice(0, 160) : "unknown"}`
  }
  const r = await fetch(b.url, { cache: "no-store" })
  if (!r.ok) {
    lastReadError += ` · url ${r.status}`
    console.error("[garden] read failed", b.pathname, lastReadError)
    return null
  }
  return await r.text()
}

export async function GET(request: Request) {
  if (!ready()) return NextResponse.json({ shared: false, flowers: [] })
  try {
    const page = await list({ prefix: PREFIX, limit: 1000 })
    // Temporary: counts only, no flower data, to see whether saving or reading is failing.
    if (new URL(request.url).searchParams.get("debug") === "1") {
      const sample = page.blobs[0]
      const ok = sample ? !!(await read(sample)) : null
      return NextResponse.json({ listed: page.blobs.length, sampleReadable: ok, readError: ok ? "" : lastReadError }, { headers: { "Cache-Control": "no-store" } })
    }
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
    // A device catching up may resend a flower; keep one copy per flower id.
    const existing = await list({ prefix: PREFIX, limit: 1000 })
    if (existing.blobs.some((b) => b.pathname.endsWith(`-${flower.id}.json`))) return NextResponse.json({ flower })
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
