"use client"

import { useEffect, useRef, useState } from "react"
import { CloudRain, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Flower } from "@/lib/flower"
import type { Care, CareKind } from "@/lib/garden-care"
import { FlowerArt } from "@/components/playground/flower-art"

const CARE_LOCAL = "vh-garden-care-v1"

const ACTIONS: { kind: CareKind; emoji: string; label: string; done: string; say: (name: string) => string }[] = [
  { kind: "water", emoji: "💧", label: "Water", done: "Watered", say: (n) => `${n} drinks it up and grows a little.` },
  { kind: "sun", emoji: "☀️", label: "Sunshine", done: "Sunned", say: (n) => `${n} turns toward the light.` },
  { kind: "song", emoji: "🎵", label: "Sing to it", done: "Sung to", say: (n) => `${n} sways along.` },
  { kind: "butterfly", emoji: "🦋", label: "Send a butterfly", done: "Butterfly sent", say: (n) => `A butterfly lands on ${n}.` },
]

function seeded(id: string, salt: number) {
  let h = salt
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return (h % 1000) / 1000
}

const today = () => new Date().toISOString().slice(0, 10)

/** Each visitor's own care log, so the same person counts once per flower per kind per day. */
function readLog(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(CARE_LOCAL) || "{}")
  } catch {
    return {}
  }
}

export function Garden({
  flowers,
  shared,
  highlight,
  care,
  onCare,
}: {
  flowers: Flower[]
  shared: boolean
  highlight: string | null
  care: Record<string, Care>
  onCare: (id: string, kind: CareKind) => void
}) {
  const shown = flowers.slice(0, 36)
  const [open, setOpen] = useState<string | null>(null)
  const [effect, setEffect] = useState<{ id: string; kind: CareKind; key: number } | null>(null)
  const [raining, setRaining] = useState(false)
  const [log, setLog] = useState<Record<string, string>>({})
  const [note, setNote] = useState("")
  const rainTimer = useRef<number | undefined>(undefined)

  useEffect(() => setLog(readLog()), [])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const current = shown.find((f) => f.id === open) ?? null
  const doneToday = (id: string, kind: CareKind) => log[`${id}:${kind}`] === today()

  const give = (f: Flower, kind: CareKind) => {
    const action = ACTIONS.find((a) => a.kind === kind)!
    setEffect({ id: f.id, kind, key: Date.now() })
    setNote(action.say(f.name))
    if (doneToday(f.id, kind)) return // still plays, counts once a day
    const next = { ...readLog(), [`${f.id}:${kind}`]: today() }
    try {
      localStorage.setItem(CARE_LOCAL, JSON.stringify(next))
    } catch {
      /* counts for this visit only */
    }
    setLog(next)
    onCare(f.id, kind)
  }

  const makeItRain = () => {
    setRaining(true)
    setNote("The whole garden gets a drink.")
    window.clearTimeout(rainTimer.current)
    rainTimer.current = window.setTimeout(() => setRaining(false), 2600)
  }

  const total = (id: string) => Object.values(care[id] ?? {}).reduce((a, b) => a + (b ?? 0), 0)

  return (
    <section id="garden" className="scroll-mt-24 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-[0.16em] text-foreground/50 uppercase">The garden</p>
          <h2 className="text-3xl font-semibold tracking-tight">{flowers.length} flowers and counting</h2>
        </div>
        <div className="flex max-w-md flex-col items-start gap-3 sm:items-end">
          <p className="text-sm text-foreground/55 sm:text-right">
            {shared
              ? "Every flower here was made by someone who visited. Tap one to water it, give it sun, sing to it or send it a butterfly."
              : "Flowers you plant stay in this browser. Tap one to look after it."}
          </p>
          <button type="button" onClick={makeItRain} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40">
            <CloudRain className="h-4 w-4" /> Make it rain
          </button>
        </div>
      </div>

      <div className="relative h-[440px] overflow-hidden rounded-3xl sm:h-[480px]" style={{ background: "linear-gradient(#eaf5ff 0%, #f4f9ee 55%, #d9ecc6 56%, #c4e0ab 100%)" }}>
        {/* hills */}
        <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[52%] w-full">
          <path d="M0 14 C18 4 34 10 50 12 C68 14 82 4 100 10 L100 40 L0 40Z" fill="#cfe6b6" />
          <path d="M0 24 C20 16 40 26 60 22 C78 18 90 24 100 20 L100 40 L0 40Z" fill="#b9da9b" />
        </svg>

        {raining && <Rain />}

        {shown.map((f, i) => {
          const row = i % 3
          const x = 4 + (seeded(f.id, 7) * 0.8 + ((i * 0.37) % 1) * 0.2) * 92
          const bottom = 6 + row * 14 + seeded(f.id, 3) * 6
          const c = care[f.id] ?? {}
          // Water makes a flower grow, up to about a quarter bigger.
          const grow = 1 + Math.min(c.water ?? 0, 20) * 0.012
          const size = (62 + (2 - row) * 16 + seeded(f.id, 5) * 14) * grow
          const stem = (50 + seeded(f.id, 11) * 60) * grow
          const isOpen = open === f.id
          const fresh = highlight === f.id
          const fx = effect?.id === f.id ? effect : null
          return (
            <div key={f.id} className={cn("absolute -translate-x-1/2", fresh && "motion-safe:animate-[bloom_.9s_cubic-bezier(.2,.9,.3,1.3)]")} style={{ left: `${x}%`, bottom: `${bottom}%`, zIndex: isOpen ? 30 : 10 - row }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : f.id)}
                aria-expanded={isOpen}
                aria-label={`${f.name}${f.by ? `, found by ${f.by}` : ""}. Tap to look after it.`}
                className="group relative flex flex-col items-center rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b06ad6]"
              >
                {!isOpen && (
                  <span className="pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded-xl bg-white/95 px-3 py-1.5 text-left text-xs opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" style={fresh ? { opacity: 1 } : undefined}>
                    <span className="block font-semibold italic text-neutral-800">{f.name}</span>
                    <span className="block text-neutral-500">{f.by ? `found by ${f.by}` : "by a mystery visitor"}</span>
                  </span>
                )}
                <span
                  key={fx?.kind === "song" ? fx.key : undefined}
                  className={cn("relative block origin-bottom", fx?.kind === "song" ? "motion-safe:animate-[dance_.45s_ease-in-out_4_alternate]" : raining ? "motion-safe:animate-[dance_.6s_ease-in-out_3_alternate]" : "motion-safe:animate-[sway_var(--d)_ease-in-out_infinite_alternate]")}
                  style={{ ["--d" as string]: `${2.6 + seeded(f.id, 13) * 2}s` }}
                >
                  {(c.sun ?? 0) > 0 && <span aria-hidden className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(255,220,120,.45),transparent_65%)]" />}
                  <FlowerArt f={f} width={size} height={size} className={cn("relative block drop-shadow-[0_4px_6px_rgba(60,80,40,.18)] transition-transform duration-500 group-hover:scale-110", isOpen && "scale-110")} />
                  {(c.butterfly ?? 0) > 0 && <Butterfly className="absolute -right-1 top-0 h-5 w-5 motion-safe:animate-[flutter_1.6s_ease-in-out_infinite_alternate]" />}
                  <svg aria-hidden width={20} height={stem} viewBox={`0 0 20 ${stem}`} className="mx-auto -mt-2 block">
                    <path d={`M10 0 C12 ${stem * 0.4} 8 ${stem * 0.6} 10 ${stem}`} stroke="#6f9c5a" strokeWidth={2.2} fill="none" />
                    <path d={`M10 ${stem * 0.55} C16 ${stem * 0.45} 19 ${stem * 0.5} 19 ${stem * 0.42} C14 ${stem * 0.38} 11 ${stem * 0.45} 10 ${stem * 0.55}Z`} fill="#8bbf6d" />
                  </svg>
                </span>
              </button>
              {fx && <CareEffect key={fx.key} kind={fx.kind} size={size} />}
            </div>
          )
        })}

        {/* The care card sits at the top of the garden so it never gets cut off. */}
        {current && (
          <div role="dialog" aria-label={`Look after ${current.name}`} className="absolute inset-x-3 top-3 z-40 mx-auto max-w-md rounded-2xl bg-white/95 p-4 shadow-[0_12px_40px_-12px_rgba(40,60,30,.35)] ring-1 ring-black/5 backdrop-blur motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold italic text-neutral-800">{current.name}</p>
                <p className="text-xs text-neutral-500">
                  {current.by ? `found by ${current.by}` : "by a mystery visitor"}
                  {total(current.id) > 0 && ` · cared for ${total(current.id)} ${total(current.id) === 1 ? "time" : "times"}`}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {ACTIONS.map((a) => {
                const done = doneToday(current.id, a.kind)
                const n = care[current.id]?.[a.kind] ?? 0
                return (
                  <button
                    key={a.kind}
                    type="button"
                    onClick={() => give(current, a.kind)}
                    className={cn("flex flex-col items-center gap-1 rounded-xl border px-1 py-2.5 text-[11px] font-medium transition-all active:scale-95", done ? "border-[#b06ad6]/30 bg-[#f4ecfb] text-[#6b3f8f]" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400")}
                  >
                    <span className="text-xl leading-none" aria-hidden>
                      {a.emoji}
                    </span>
                    <span className="leading-tight">{done ? a.done : a.label}</span>
                    <span className="tabular-nums text-neutral-400">{n}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-center text-sm text-foreground/55">
        {note}
      </p>
    </section>
  )
}

function Butterfly({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path d="M12 12 C8 4 2 4 3 9 C4 13 9 13 12 12Z" fill="#d98ae0" opacity=".9" />
      <path d="M12 12 C16 4 22 4 21 9 C20 13 15 13 12 12Z" fill="#b48ef0" opacity=".9" />
      <path d="M12 12 C9 15 5 18 7 20 C9 21 11 16 12 12Z" fill="#e9a4c7" opacity=".9" />
      <path d="M12 12 C15 15 19 18 17 20 C15 21 13 16 12 12Z" fill="#e9a4c7" opacity=".9" />
      <path d="M12 8 L12 16" stroke="#3b2a6b" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/** A short burst over the flower: drops, sun rays, notes or a butterfly flying in. */
function CareEffect({ kind, size }: { kind: CareKind; size: number }) {
  const box = { width: size * 1.4, left: `calc(50% - ${size * 0.7}px)`, bottom: "35%", height: size * 1.6 }
  if (kind === "water")
    return (
      <span aria-hidden className="pointer-events-none absolute" style={box}>
        <svg viewBox="0 0 40 28" className="absolute -top-3 left-[52%] h-7 w-10 origin-bottom-left motion-safe:animate-[tilt_1.4s_ease-in-out_forwards]">
          <path d="M12 8 H30 V24 Q30 26 28 26 H14 Q12 26 12 24Z" fill="#8fa8f5" />
          <path d="M12 12 L2 4" stroke="#8fa8f5" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 11 Q38 11 36 19" stroke="#5b78d6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="2" cy="4" r="2.5" fill="#5b78d6" />
        </svg>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="absolute top-6 h-2.5 w-1.5 rounded-full bg-[#79c4e8] motion-safe:animate-[drip_1s_ease-in_forwards]" style={{ left: `${30 + ((i * 37) % 40)}%`, animationDelay: `${i * 90}ms`, opacity: 0 }} />
        ))}
      </span>
    )
  if (kind === "sun")
    return (
      <span aria-hidden className="pointer-events-none absolute grid place-items-center" style={box}>
        <span className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,214,90,.75),rgba(255,214,90,0)_65%)] motion-safe:animate-[sunburst_1.6s_ease-out_forwards]" />
      </span>
    )
  if (kind === "song")
    return (
      <span aria-hidden className="pointer-events-none absolute" style={box}>
        {["♪", "♫", "♪", "♬"].map((n, i) => (
          <span key={i} className="absolute bottom-1/2 text-lg font-semibold text-[#8a5bc0] motion-safe:animate-[floatup_1.8s_ease-out_forwards]" style={{ left: `${20 + i * 20}%`, animationDelay: `${i * 220}ms`, opacity: 0 }}>
            {n}
          </span>
        ))}
      </span>
    )
  return (
    <span aria-hidden className="pointer-events-none absolute" style={box}>
      <span className="absolute inset-0" style={{ ["--w" as string]: `${size * 0.85}px` }}><Butterfly className="absolute h-7 w-7 motion-safe:animate-[flyin_1.6s_cubic-bezier(.3,.7,.3,1)_forwards]" /></span>
    </span>
  )
}

function Rain() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {Array.from({ length: 70 }, (_, i) => (
        <span
          key={i}
          className="absolute -top-6 h-5 w-[2px] rounded-full bg-[#79c4e8]/80 motion-safe:animate-[rainfall_.8s_linear_3]"
          style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i * 37) % 800}ms` }}
        />
      ))}
    </span>
  )
}
