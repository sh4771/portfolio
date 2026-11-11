import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { CARE_KINDS, CARE_PREFIX, FLOWER_ID, type CareKind } from "@/lib/garden-care"

/**
 * Records one act of care (water, sunshine, a song, a butterfly) for a flower. Each act is
 * an empty marker file, so the garden can count them from a single listing without reads.
 */
const ready = () => !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)

export async function POST(request: Request) {
  if (!ready()) return NextResponse.json({ error: "The shared garden isn't connected yet." }, { status: 503 })
  let body: { id?: unknown; kind?: unknown }
  try {
    body = JSON.parse((await request.text()).slice(0, 500))
  } catch {
    return NextResponse.json({ error: "Couldn't read that." }, { status: 400 })
  }
  const id = typeof body.id === "string" && FLOWER_ID.test(body.id) ? body.id : null
  const kind = CARE_KINDS.includes(body.kind as CareKind) ? (body.kind as CareKind) : null
  if (!id || !kind) return NextResponse.json({ error: "Unknown flower." }, { status: 400 })
  try {
    const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const path = `${CARE_PREFIX}${id}/${kind}/${stamp}`
    await put(path, "1", { access: "private", contentType: "text/plain", addRandomSuffix: false }).catch(() =>
      put(path, "1", { access: "public", contentType: "text/plain", addRandomSuffix: false }),
    )
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[garden] care failed", err)
    return NextResponse.json({ error: "Couldn't reach the garden right now." }, { status: 500 })
  }
}
