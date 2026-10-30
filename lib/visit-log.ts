import { list, put, get } from "@vercel/blob"

// Each password attempt on the Vendelux gate is saved as one small JSON file in a
// private Vercel Blob store (needs BLOB_READ_WRITE_TOKEN, added when the store is
// connected to the project). Without a store it still prints to the runtime logs.

export type Visit = {
  at: string // ISO timestamp
  ok: boolean
  code: string | null // which access code was used, e.g. "General" or "Palantir"
  page: string | null // where they were headed, e.g. /work/vendelux?project=segments
  city: string | null
  region: string | null
  country: string | null
  ip: string | null
  device: string | null
  referrer: string | null
}

const PREFIX = "visits/"

export const logStorageReady = () => !!process.env.BLOB_READ_WRITE_TOKEN

function describeDevice(ua: string | null) {
  if (!ua) return null
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac OS X/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "Other"
  const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Other"
  return `${os} · ${browser}`
}

export function visitFromRequest(request: Request, ok: boolean, code: string | null, page: string | null): Visit {
  const h = request.headers
  const dec = (v: string | null) => {
    if (!v) return null
    try {
      return decodeURIComponent(v)
    } catch {
      return v
    }
  }
  return {
    at: new Date().toISOString(),
    ok,
    code,
    page: page && page.startsWith("/work/vendelux") ? page.slice(0, 200) : null,
    city: dec(h.get("x-vercel-ip-city")),
    region: h.get("x-vercel-ip-country-region"),
    country: h.get("x-vercel-ip-country"),
    ip: (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || null,
    device: describeDevice(h.get("user-agent")),
    referrer: h.get("referer"),
  }
}

export async function saveVisit(v: Visit) {
  console.log("[vendelux-gate]", JSON.stringify(v))
  if (!logStorageReady()) return
  try {
    const name = `${PREFIX}${v.at.replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 8)}.json`
    await put(name, JSON.stringify(v), { access: "private", contentType: "application/json", addRandomSuffix: false })
  } catch (err) {
    console.error("[vendelux-gate] could not save visit", err)
  }
}

export async function readVisits(max = 500): Promise<Visit[]> {
  if (!logStorageReady()) return []
  const blobs: { pathname: string }[] = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 })
    blobs.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor && blobs.length < 5000)
  // File names start with the timestamp, so sorting by name sorts by time.
  const newest = blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1)).slice(0, max)
  const rows = await Promise.all(
    newest.map(async (b) => {
      try {
        const res = await get(b.pathname, { access: "private" })
        if (!res || res.statusCode !== 200) return null
        return JSON.parse(await new Response(res.stream).text()) as Visit
      } catch {
        return null
      }
    }),
  )
  return rows.filter((r): r is Visit => !!r)
}
