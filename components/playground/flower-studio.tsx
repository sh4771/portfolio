"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Brush, Eraser, Shuffle, Sparkles, SlidersHorizontal, Sprout, Undo2, Dices } from "lucide-react"
import { cn } from "@/lib/utils"
import { PALETTE, SEED_FLOWERS, SHAPES, growFromWords, petalOutline, nameFrom, randomGenus, randomInspiration, type Flower, type PetalShape, type Stroke } from "@/lib/flower"
import { FlowerArt } from "@/components/playground/flower-art"
import { Garden } from "@/components/playground/garden"
import type { Care, CareKind } from "@/lib/garden-care"

type Mode = Flower["mode"]
const LOCAL_KEY = "vh-garden-v1"
const IDEAS = ["Sunday morning", "Matcha latte", "First snow in NYC", "Subway at midnight", "Grandma's kimchi", "Late-night Figma"]

/* ---------- small controls ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.12em] text-foreground/50 uppercase">{children}</p>
}

function Swatches({ value, onChange, label }: { value: string; onChange: (c: string) => void; label: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
      {PALETTE.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          aria-label={c}
          onClick={() => onChange(c)}
          className={cn("h-7 w-7 rounded-full ring-1 ring-black/10 transition-transform hover:scale-110", value === c && "ring-2 ring-foreground ring-offset-2 ring-offset-background")}
          style={{ background: c }}
        />
      ))}
    </div>
  )
}

function Petals({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <Label>Petals</Label>
        <span className="text-sm tabular-nums text-foreground/70">{value}</span>
      </div>
      <input type="range" min={3} max={16} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[#b06ad6]" aria-label="Number of petals" />
    </div>
  )
}

/* ---------- the studio ---------- */

const SIGN_EXAMPLES = ["Sam from Brooklyn", "J.K.", "a fellow designer", "🌷", "your recruiter friend", "Mina, Seoul", "someone who liked Reconcile"]

export function FlowerStudio() {
  const [mode, setMode] = useState<Mode>("draw")
  const [petals, setPetals] = useState(8)
  const [shape, setShape] = useState<PetalShape>("round")
  const [layers, setLayers] = useState<1 | 2>(2)
  const [color, setColor] = useState("#e9a4c7")
  const [color2, setColor2] = useState("#b48ef0")
  const [center, setCenter] = useState("#a3174a")
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [brush, setBrush] = useState("#b48ef0")
  const [brushW, setBrushW] = useState(0.035)
  const [words, setWords] = useState("Sunday morning")
  const [name, setName] = useState("")
  const [by, setBy] = useState("")
  const [garden, setGarden] = useState<Flower[]>(SEED_FLOWERS)
  const [shared, setShared] = useState(false)
  const [care, setCare] = useState<Record<string, Care>>({})
  const [planting, setPlanting] = useState(false)
  const [justPlanted, setJustPlanted] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const svgRef = useRef<SVGSVGElement>(null)
  const drawing = useRef<number[] | null>(null)
  const [live, setLive] = useState<number[] | null>(null)

  // Every flower is named after a mood, a food or a memory. Grow mode uses its own words;
  // Draw and Build start from a random one, and the dice picks another.
  const [inspo, setInspo] = useState("")
  const [genus, setGenus] = useState("Viola")
  const [signHint] = useState(() => SIGN_EXAMPLES[Math.floor(Math.random() * SIGN_EXAMPLES.length)])
  useEffect(() => {
    setInspo(randomInspiration())
    setGenus(randomGenus())
  }, [])
  const reroll = () => {
    setGenus(randomGenus())
    if (mode !== "grow") setInspo(randomInspiration())
  }
  const source = mode === "grow" ? words : inspo
  useEffect(() => {
    setName(nameFrom(source, genus))
  }, [source, genus])

  // Grow mode: the same words always grow the same flower shape.
  const grown = useMemo(() => growFromWords(words), [words])

  const flower: Omit<Flower, "id" | "by" | "at"> =
    mode === "grow"
      ? { ...grown, name }
      : { name, mode, petals, shape, layers, color, color2, center, strokes: mode === "draw" ? (live ? [...strokes, { c: brush, w: brushW, p: live }] : strokes) : undefined }

  /* load the garden */
  useEffect(() => {
    let alive = true
    fetch("/api/garden")
      .then((r) => r.json())
      .then((d: { shared: boolean; flowers: Flower[]; care?: Record<string, Care> }) => {
        if (!alive) return
        if (d.shared) {
          setShared(true)
          setCare(d.care ?? {})
          setGarden([...d.flowers, ...SEED_FLOWERS])
        } else throw new Error("local")
      })
      .catch(() => {
        try {
          const mine = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as Flower[]
          if (alive) setGarden([...mine, ...SEED_FLOWERS])
          if (alive) setCare(JSON.parse(localStorage.getItem("vh-garden-care-counts-v1") || "{}"))
        } catch {
          /* private mode: seeds only */
        }
      })
    return () => {
      alive = false
    }
  }, [])

  const say = useCallback((t: string) => {
    setToast(t)
    window.setTimeout(() => setToast(""), 2400)
  }, [])

  /* drawing: one wedge, repeated around the center as you draw */
  const toUnit = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 2.24 - 1.12
    const y = ((e.clientY - r.top) / r.height) * 2.24 - 1.12
    return [Math.round(Math.max(-1, Math.min(1, x)) * 1000) / 1000, Math.round(Math.max(-1, Math.min(1, y)) * 1000) / 1000]
  }
  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (mode !== "draw") return
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = toUnit(e)
    setLive([...drawing.current])
  }
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drawing.current) return
    const [x, y] = toUnit(e)
    const p = drawing.current
    const dx = x - p[p.length - 2]
    const dy = y - p[p.length - 1]
    if (dx * dx + dy * dy < 0.0004 || p.length > 380) return
    p.push(x, y)
    setLive([...p])
  }
  const onUp = () => {
    const p = drawing.current
    drawing.current = null
    setLive(null)
    if (!p) return
    if (p.length === 2) p.push(p[0] + 0.001, p[1] + 0.001) // a tap leaves a dot
    setStrokes((s) => [...s, { c: brush, w: brushW, p }].slice(-60))
  }

  // Counts go up right away; the shared garden records them in the background.
  const giveCare = (id: string, kind: CareKind) => {
    setCare((c) => ({ ...c, [id]: { ...c[id], [kind]: (c[id]?.[kind] ?? 0) + 1 } }))
    if (shared) void fetch("/api/garden/care", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, kind }) }).catch(() => {})
    else
      try {
        const local = JSON.parse(localStorage.getItem("vh-garden-care-counts-v1") || "{}") as Record<string, Care>
        local[id] = { ...local[id], [kind]: (local[id]?.[kind] ?? 0) + 1 }
        localStorage.setItem("vh-garden-care-counts-v1", JSON.stringify(local))
      } catch {
        /* this visit only */
      }
  }

  const plant = async () => {
    if (mode === "draw" && strokes.length === 0) return say("Draw something first. One petal is enough.")
    setPlanting(true)
    const payload = { ...flower, name: name || flower.name, by, id: Math.random().toString(36).slice(2, 12) }
    let saved: Flower | null = null
    if (shared) {
      try {
        const r = await fetch("/api/garden", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
        if (r.ok) saved = (await r.json()).flower
      } catch {
        /* falls through */
      }
    }
    if (!saved) {
      saved = { ...payload, at: new Date().toISOString() } as Flower
      try {
        const mine = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as Flower[]
        localStorage.setItem(LOCAL_KEY, JSON.stringify([saved, ...mine].slice(0, 40)))
      } catch {
        /* still shows for this visit */
      }
    }
    setGarden((g) => [saved!, ...g])
    setJustPlanted(saved.id)
    setPlanting(false)
    say(`${saved.name} is planted 🌱`)
    document.getElementById("garden")?.scrollIntoView({ behavior: "smooth", block: "center" })
    reroll()
  }

  const TABS: { id: Mode; label: string; icon: typeof Brush }[] = [
    { id: "draw", label: "Draw", icon: Brush },
    { id: "build", label: "Build", icon: SlidersHorizontal },
    { id: "grow", label: "Grow from a word", icon: Sparkles },
  ]

  return (
    <div className="space-y-20">
      {/* Studio */}
      <section aria-label="Flower studio" className="grid gap-8 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:gap-12">
        <div className="relative overflow-hidden rounded-3xl" style={{ background: "radial-gradient(circle at 50% 45%, #ffffff 0%, #f8f3f7 60%, #efe6ee 100%)" }}>
          <svg
            ref={svgRef}
            viewBox="-1.12 -1.12 2.24 2.24"
            className={cn("block aspect-square w-full touch-none select-none", mode === "draw" ? "cursor-crosshair" : "cursor-default")}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            role="img"
            aria-label={mode === "draw" ? "Drawing canvas. Draw and your strokes repeat around the center." : `Preview of ${flower.name}`}
          >
            {mode === "draw" &&
              Array.from({ length: petals }, (_, k) => (
                <line key={k} x1={0} y1={0} x2={0} y2={-1.05} transform={`rotate(${(k * 360) / petals})`} stroke="rgba(120,80,120,.12)" strokeWidth={0.006} strokeDasharray="0.02 0.03" />
              ))}
            <FlowerArt key={mode === "grow" ? words : "art"} f={flower} x={-1.12} y={-1.12} width={2.24} height={2.24} className="pointer-events-none origin-center motion-safe:animate-[bloom_.6s_cubic-bezier(.2,.9,.3,1.3)] [transform-box:fill-box]" />
          </svg>
          {mode === "draw" && strokes.length === 0 && !live && (
            <p className="pointer-events-none absolute inset-x-0 top-6 text-center text-sm text-[#7a5c78]">Draw anywhere. Every stroke repeats around the center.</p>
          )}
          <p className="absolute bottom-4 left-5 text-sm font-medium italic text-[#6d4f6b]">{name}</p>
        </div>

        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-foreground/[0.05] p-1" role="tablist" aria-label="How to make your flower">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={mode === t.id}
                onClick={() => setMode(t.id)}
                className={cn("flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors", mode === t.id ? "bg-background text-foreground shadow-sm" : "text-foreground/55 hover:text-foreground")}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          {mode === "draw" && (
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label>Brush color</Label>
                <Swatches value={brush} onChange={setBrush} label="Brush color" />
              </div>
              <div className="space-y-2.5">
                <Label>Brush size</Label>
                <div className="flex gap-2">
                  {[0.02, 0.035, 0.06].map((w, i) => (
                    <button key={w} type="button" onClick={() => setBrushW(w)} aria-pressed={brushW === w} className={cn("flex h-10 w-12 items-center justify-center rounded-xl border transition-colors", brushW === w ? "border-foreground" : "border-border/70 hover:border-foreground/40")} aria-label={["Thin", "Medium", "Thick"][i]}>
                      <span className="rounded-full bg-foreground" style={{ width: 4 + i * 5, height: 4 + i * 5 }} />
                    </button>
                  ))}
                </div>
              </div>
              <Petals value={petals} onChange={setPetals} />
              <div className="flex gap-2">
                <button type="button" onClick={() => setStrokes((s) => s.slice(0, -1))} disabled={!strokes.length} className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-4 py-2 text-sm disabled:opacity-40">
                  <Undo2 className="h-4 w-4" /> Undo
                </button>
                <button type="button" onClick={() => setStrokes([])} disabled={!strokes.length} className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-4 py-2 text-sm disabled:opacity-40">
                  <Eraser className="h-4 w-4" /> Clear
                </button>
              </div>
            </div>
          )}

          {mode === "build" && (
            <div className="space-y-6">
              <Petals value={petals} onChange={setPetals} />
              <div className="space-y-2.5">
                <Label>Petal shape</Label>
                <div className="flex flex-wrap gap-2">
                  {SHAPES.map((s) => (
                    <button key={s} type="button" onClick={() => setShape(s)} aria-pressed={shape === s} className={cn("flex h-12 w-12 items-center justify-center rounded-xl border transition-colors", shape === s ? "border-foreground bg-foreground/[0.04]" : "border-border/70 hover:border-foreground/40")} aria-label={s}>
                      <svg viewBox="-0.5 -1.1 1 1.2" className="h-8 w-8">
                        <path d={petalOutline(s)} fill={color} stroke="rgba(0,0,0,.2)" strokeWidth={0.03} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2.5">
                <Label>Petal color</Label>
                <Swatches value={color} onChange={setColor} label="Petal color" />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label>Inner petals</Label>
                  <button type="button" onClick={() => setLayers((l) => (l === 2 ? 1 : 2))} aria-pressed={layers === 2} className={cn("rounded-full px-3 py-1 text-xs font-semibold transition-colors", layers === 2 ? "bg-foreground text-background" : "bg-foreground/[0.06] text-foreground/60")}>
                    {layers === 2 ? "On" : "Off"}
                  </button>
                </div>
                {layers === 2 && <Swatches value={color2} onChange={setColor2} label="Inner petal color" />}
              </div>
              <div className="space-y-2.5">
                <Label>Center</Label>
                <Swatches value={center} onChange={setCenter} label="Center color" />
              </div>
            </div>
          )}

          {mode === "grow" && (
            <div className="space-y-5">
              <div className="space-y-2.5">
                <label htmlFor="grow-words" className="text-xs font-semibold tracking-[0.12em] text-foreground/50 uppercase">
                  A mood, a food, a memory
                </label>
                <input
                  id="grow-words"
                  value={words}
                  onChange={(e) => setWords(e.target.value.slice(0, 40))}
                  placeholder="First snow in NYC"
                  className="w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-base outline-none focus:border-foreground/50"
                />
                <p className="text-xs text-foreground/50">The same words always grow the same flower. Color words like pink, matcha or sunset steer the color.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {IDEAS.map((w) => (
                  <button key={w} type="button" onClick={() => setWords(w)} className={cn("rounded-full border px-3 py-1.5 text-sm transition-colors", words === w ? "border-foreground bg-foreground text-background" : "border-border/70 text-foreground/70 hover:border-foreground/40")}>
                    {w}
                  </button>
                ))}
                <button type="button" onClick={() => setWords(IDEAS[Math.floor(Math.random() * IDEAS.length)] + " " + Math.floor(Math.random() * 99))} className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-sm text-foreground/70 hover:border-foreground/40">
                  <Shuffle className="h-3.5 w-3.5" /> Surprise me
                </button>
              </div>
            </div>
          )}

          <div className="mt-auto space-y-3 border-t border-border/60 pt-6">
            <label className="block space-y-1.5">
              <span className="flex items-baseline gap-2">
                <span className="text-xs font-semibold tracking-[0.12em] text-foreground/50 uppercase">Sign your flower 🌷</span>
                <span className="text-xs text-foreground/40">Optional</span>
              </span>
              <input
                id="flower-by"
                value={by}
                onChange={(e) => setBy(e.target.value.slice(0, 24))}
                placeholder={signHint}
                aria-describedby="flower-by-note"
                className="w-full rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground/50"
              />
              <span id="flower-by-note" className="block text-xs leading-relaxed text-foreground/55">
                A name, initials, a nickname or an emoji. It grows next to your flower in the garden.
              </span>
            </label>
            {mode !== "grow" && (
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold tracking-[0.12em] text-foreground/50 uppercase">Name it after a mood, a food, a memory</span>
                <span className="flex gap-2">
                  <input
                    value={inspo}
                    onChange={(e) => setInspo(e.target.value.slice(0, 40))}
                    placeholder="Matcha latte"
                    className="min-w-0 flex-1 rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground/50"
                  />
                  <button type="button" onClick={reroll} aria-label="Pick a random mood, food or memory" title="Surprise me" className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-border/70 bg-background text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground">
                    <Dices className="h-4 w-4" />
                  </button>
                </span>
              </label>
            )}
            <button type="button" onClick={plant} disabled={planting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-50">
              <Sprout className="h-4 w-4" /> {planting ? "Planting…" : by.trim() ? `Plant it as ${by.trim()}` : "Plant it in the garden"}
            </button>
          </div>
        </div>
      </section>

      <Garden flowers={garden} shared={shared} highlight={justPlanted} care={care} onCare={giveCare} />

      <div role="status" aria-live="polite" className={cn("fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background shadow-lg transition-all", toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
        {toast}
      </div>
    </div>
  )
}
