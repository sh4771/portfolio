import { NextResponse } from "next/server"
import { buildSystemInstruction } from "@/lib/violet-gpt/ai-context"
import { PROJECTS, PROMPTS } from "@/lib/violet-gpt/knowledge"
import { MAX_INPUT } from "@/lib/violet-gpt/engine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite"
const API_BASE = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com"
const TIMEOUT_MS = 9000

// Best-effort abuse guard per server instance. The client always has the
// rules-based answers to fall back on, so a 429 here is harmless.
const WINDOW_MS = 60_000
const PER_MINUTE = 6
const PER_DAY = 60
const hits = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 24 * 60 * 60 * 1000)
  const lastMinute = recent.filter((t) => now - t < WINDOW_MS).length
  if (lastMinute >= PER_MINUTE || recent.length >= PER_DAY) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return false
}

const PROJECT_IDS = new Set(PROJECTS.map((p) => p.id))
const PROMPT_IDS = new Set(Object.keys(PROMPTS))

function fail(reason: string, status = 503) {
  return NextResponse.json({ ok: false, reason }, { status })
}

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY
  if (!key) return fail("not_configured")

  const body = await request.json().catch(() => null)
  const raw = typeof body?.message === "string" ? body.message : ""
  // strip control characters, cap length
  const message = raw.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, MAX_INPUT)
  if (!message) return fail("empty", 400)

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim()
  if (limited(ip)) return fail("rate_limited", 429)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(
      `${API_BASE}/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemInstruction() }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 1024, responseMimeType: "application/json" },
        }),
      },
    )

    if (!res.ok) {
      // 429 = free quota or rate limit reached, anything else = upstream problem
      return fail(res.status === 429 ? "quota" : `upstream_${res.status}`, res.status === 429 ? 429 : 502)
    }

    const data = await res.json()
    const text: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? ""
    if (!text) return fail("empty_output", 502)

    let parsed: { answer?: unknown; projectIds?: unknown; followUps?: unknown } = {}
    try {
      parsed = JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, ""))
    } catch {
      return fail("bad_output", 502)
    }

    const answer = typeof parsed.answer === "string" ? parsed.answer.replace(/\s+/g, " ").trim().slice(0, 700) : ""
    if (!answer) return fail("bad_output", 502)

    const ids = (v: unknown, allowed: Set<string>, max: number) =>
      Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && allowed.has(x)))].slice(0, max) : []

    return NextResponse.json({
      ok: true,
      answer,
      projectIds: ids(parsed.projectIds, PROJECT_IDS, 2),
      next: ids(parsed.followUps, PROMPT_IDS, 3),
    })
  } catch (err) {
    return fail(err instanceof Error && err.name === "AbortError" ? "timeout" : "network", 504)
  } finally {
    clearTimeout(timer)
  }
}
