/**
 * The flower every visitor makes in the playground. One small JSON shape covers all
 * three ways to make one (draw, build, grow from a word), so the garden can render
 * any of them and the server can check them strictly.
 */

export const SHAPES = ["round", "pointed", "heart", "spoon", "frill"] as const
export type PetalShape = (typeof SHAPES)[number]

/** A drawn stroke, in unit space: the flower spans -1..1 on both axes. */
export type Stroke = { c: string; w: number; p: number[] } // p = [x0, y0, x1, y1, ...]

export type Flower = {
  id: string
  name: string
  by: string
  mode: "draw" | "build" | "grow"
  petals: number
  shape: PetalShape
  layers: 1 | 2
  color: string
  color2: string
  center: string
  /** Only for drawn flowers: one wedge's strokes, repeated `petals` times around the center. */
  strokes?: Stroke[]
  at: string
}

export const PALETTE = [
  "#e9a4c7", "#d98ae0", "#b48ef0", "#8fa8f5", "#79c4e8", "#7fd1b9",
  "#a6d46e", "#f4d35e", "#f7a35c", "#f2786d", "#e05d8a", "#fff6e8",
  "#5b3f86", "#2f2a33", "#a3174a", "#3b2a6b",
]

const HEX = /^#[0-9a-f]{6}$/i
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))

/* ---------- petal outlines, pointing up from the origin, length 1 ---------- */

function petalPath(shape: PetalShape) {
  switch (shape) {
    case "pointed":
      return "M0 0 C0.22 -0.25 0.24 -0.62 0 -1 C-0.24 -0.62 -0.22 -0.25 0 0Z"
    case "heart":
      return "M0 0 C0.3 -0.2 0.38 -0.75 0.18 -0.98 C0.1 -1.06 0.02 -1 0 -0.88 C-0.02 -1 -0.1 -1.06 -0.18 -0.98 C-0.38 -0.75 -0.3 -0.2 0 0Z"
    case "spoon":
      return "M0 0 C0.06 -0.3 0.07 -0.5 0.2 -0.7 C0.32 -0.9 0.14 -1.04 0 -1.02 C-0.14 -1.04 -0.32 -0.9 -0.2 -0.7 C-0.07 -0.5 -0.06 -0.3 0 0Z"
    case "frill":
      return "M0 0 C0.25 -0.2 0.32 -0.6 0.24 -0.86 L0.16 -0.8 L0.1 -0.98 L0.03 -0.88 L0 -1 L-0.03 -0.88 L-0.1 -0.98 L-0.16 -0.8 L-0.24 -0.86 C-0.32 -0.6 -0.25 -0.2 0 0Z"
    default:
      return "M0 0 C0.3 -0.22 0.34 -0.78 0 -1 C-0.34 -0.78 -0.3 -0.22 0 0Z"
  }
}

export function petalOutline(shape: PetalShape) {
  return petalPath(shape)
}

export function strokeToPath(p: number[]) {
  if (p.length < 4) return ""
  let d = `M${p[0]} ${p[1]}`
  for (let i = 2; i < p.length; i += 2) d += ` L${p[i]} ${p[i + 1]}`
  return d
}

/* ---------- seeded generator: the same words always grow the same flower ---------- */

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed: number) {
  let a = seed || 1
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const WORD_COLORS: [RegExp, string][] = [
  [/pink|rose|blush|strawberr|peach|love|cherry/, "#e9a4c7"],
  [/purple|violet|lavender|grape|plum|lilac/, "#b48ef0"],
  [/blue|ocean|sea|sky|rain|calm|water/, "#8fa8f5"],
  [/green|leaf|forest|matcha|mint|spring|park/, "#a6d46e"],
  [/yellow|sun|lemon|butter|morning|happy|honey/, "#f4d35e"],
  [/orange|sunset|autumn|fall|mango|warm/, "#f7a35c"],
  [/red|fire|spicy|kimchi|tomato|angry/, "#f2786d"],
  [/white|snow|cloud|milk|rice|quiet/, "#fff6e8"],
  [/night|moon|dark|coffee|sleep/, "#5b3f86"],
]

const GENERA = ["Viola", "Bellis", "Petalia", "Floretta", "Lumina", "Rosella", "Dulcia", "Aurelia"]
const SUFFIX = ["iflora", "ensis", "ella", "ia", "aris", "ina"]

function speciesName(words: string, r: () => number) {
  const base = words.toLowerCase().replace(/[^a-z]/g, "").slice(0, 9) || "mystica"
  const stem = base.replace(/[aeiouy]+$/, "") || base
  return `${GENERA[Math.floor(r() * GENERA.length)]} ${stem}${SUFFIX[Math.floor(r() * SUFFIX.length)]}`
}

/** Turns any words (a mood, a food, a memory) into a flower and its botanical name. */
export function growFromWords(words: string): Omit<Flower, "id" | "by" | "at"> {
  const text = words.trim().toLowerCase() || "violet"
  const r = rng(hash(text))
  const hinted = WORD_COLORS.find(([re]) => re.test(text))?.[1]
  const pick = () => PALETTE[Math.floor(r() * 12)]
  const color = hinted ?? pick()
  let color2 = pick()
  if (color2 === color) color2 = PALETTE[(PALETTE.indexOf(color) + 3) % 11]
  return {
    name: speciesName(text.split(/\s+/)[0] ?? text, r),
    mode: "grow",
    petals: 5 + Math.floor(r() * 9),
    shape: SHAPES[Math.floor(r() * SHAPES.length)],
    layers: r() > 0.4 ? 2 : 1,
    color,
    color2,
    center: ["#a3174a", "#3b2a6b", "#5b3f86", "#e05d8a"][Math.floor(r() * 4)],
  }
}

export function randomName() {
  const r = rng(Math.floor(Math.random() * 1e9))
  return speciesName(["bloom", "petal", "dream", "sunny", "velvet", "cosmo"][Math.floor(r() * 6)], r)
}

/* ---------- strict validation for anything a visitor sends ---------- */

const BLOCK = /(fuck|shit|bitch|cunt|nigg|fag|rape|porn|http|www\.)/i

export function cleanText(s: unknown, max: number) {
  if (typeof s !== "string") return ""
  const t = s.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max)
  return BLOCK.test(t) ? "" : t
}

export function sanitizeFlower(input: unknown): Flower | null {
  if (!input || typeof input !== "object") return null
  const f = input as Record<string, unknown>
  const mode = f.mode === "draw" || f.mode === "grow" ? f.mode : "build"
  const shape = SHAPES.includes(f.shape as PetalShape) ? (f.shape as PetalShape) : "round"
  const col = (v: unknown, d: string) => (typeof v === "string" && HEX.test(v) ? v.toLowerCase() : d)
  let strokes: Stroke[] | undefined
  if (mode === "draw") {
    if (!Array.isArray(f.strokes)) return null
    let points = 0
    strokes = []
    for (const s of f.strokes.slice(0, 60)) {
      if (!s || typeof s !== "object") continue
      const st = s as Record<string, unknown>
      if (!Array.isArray(st.p)) continue
      const p = st.p
        .slice(0, 400)
        .map((n) => (typeof n === "number" && Number.isFinite(n) ? Math.round(clamp(n, -1, 1) * 1000) / 1000 : 0))
      if (p.length % 2) p.pop()
      if (p.length < 4) continue
      points += p.length / 2
      if (points > 1500) break
      strokes.push({ c: col(st.c, "#d98ae0"), w: clamp(Number(st.w) || 0.03, 0.01, 0.08), p })
    }
    if (!strokes.length) return null
  }
  return {
    id: typeof f.id === "string" && /^[a-z0-9-]{6,40}$/.test(f.id) ? f.id : Math.random().toString(36).slice(2, 12),
    name: cleanText(f.name, 32) || "Unnamed bloom",
    by: cleanText(f.by, 24),
    mode,
    petals: clamp(Math.round(Number(f.petals) || 6), 3, 16),
    shape,
    layers: f.layers === 2 ? 2 : 1,
    color: col(f.color, "#e9a4c7"),
    color2: col(f.color2, "#b48ef0"),
    center: col(f.center, "#f4d35e"),
    strokes,
    at: new Date().toISOString(),
  }
}

/** A few flowers so the garden never starts empty. */
export const SEED_FLOWERS: Flower[] = [
  { id: "seed-violet", name: "Viola hyunensis", by: "Violet", mode: "build", petals: 10, shape: "round", layers: 2, color: "#e9a4c7", color2: "#d98ae0", center: "#a3174a", at: "2026-11-11T00:00:00Z" },
  { id: "seed-mini", name: "Bellis minivioletta", by: "Mini Violet", mode: "build", petals: 6, shape: "heart", layers: 1, color: "#b48ef0", color2: "#e9a4c7", center: "#3b2a6b", at: "2026-11-11T00:00:00Z" },
  { id: "seed-matcha", name: "Petalia matchiflora", by: "Violet", mode: "grow", petals: 8, shape: "pointed", layers: 2, color: "#a6d46e", color2: "#f4d35e", center: "#5b3f86", at: "2026-11-11T00:00:00Z" },
  { id: "seed-sunday", name: "Lumina sundayella", by: "Violet", mode: "grow", petals: 12, shape: "spoon", layers: 1, color: "#f4d35e", color2: "#f7a35c", center: "#a3174a", at: "2026-11-11T00:00:00Z" },
  { id: "seed-subway", name: "Rosella subwayaris", by: "Violet", mode: "grow", petals: 5, shape: "frill", layers: 2, color: "#8fa8f5", color2: "#b48ef0", center: "#3b2a6b", at: "2026-11-11T00:00:00Z" },
]
