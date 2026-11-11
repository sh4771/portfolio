"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/* Reconcile's own palette, taken from its design system tokens */
export const C = {
  accent: "#5b3fd9",
  accent50: "#f2effe",
  accent100: "#e1dafd",
  under: "#b4540b",
  over: "#5b3fd9",
  timing: "#a3a3a3",
  positive: "#07a35a",
  warn: "#ed6f0e",
}

export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, seen }
}

export function Phone({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-white shadow-[0_24px_60px_rgba(30,20,80,0.18)]", className)}>
      <Image src={src} alt={alt} width={780} height={1688} priority={priority} className="h-auto w-full" sizes="(max-width: 768px) 60vw, 260px" />
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 1. The question: one payout, animated from expected to recorded   *
 * ---------------------------------------------------------------- */

export function TheQuestion() {
  const { ref, seen } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="grid gap-3 rounded-3xl p-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:p-8" style={{ background: C.accent50 }}>
      <div className="rounded-2xl bg-white p-4 text-neutral-900">
        <p className="text-xs text-neutral-500">Ledger expected</p>
        <p className="text-2xl font-semibold tabular-nums">$1,192.87</p>
      </div>
      <span className="hidden text-neutral-400 sm:block">→</span>
      <div className="rounded-2xl bg-white p-4 text-neutral-900">
        <p className="text-xs text-neutral-500">Processor paid</p>
        <p className="text-2xl font-semibold tabular-nums">$1,141.25</p>
      </div>
      <span className="hidden text-neutral-400 sm:block">=</span>
      <div className="rounded-2xl p-4 text-white transition-transform duration-700" style={{ background: C.under, transform: seen ? "scale(1)" : "scale(.94)" }}>
        <p className="text-xs text-white/75">Saltmarsh Candles</p>
        <p className="text-2xl font-semibold tabular-nums">−$51.62</p>
      </div>
      <p className="text-center text-lg font-semibold text-neutral-900 sm:col-span-5 sm:pt-3">Why?</p>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 2. Positioning map                                                *
 * ---------------------------------------------------------------- */

const PLAYERS = [
  { name: "BlackLine", x: 0.12, y: 0.16 },
  { name: "Numeric", x: 0.3, y: 0.26 },
  { name: "Stripe reports", x: 0.14, y: 0.58 },
  { name: "Modern Treasury", x: 0.44, y: 0.74 },
  { name: "Simetrik", x: 0.58, y: 0.62 },
  { name: "Ledge", x: 0.72, y: 0.5 },
]

export function PositionMap() {
  const [hover, setHover] = useState<string | null>(null)
  const W = 640
  const H = 400
  const pad = 44
  const px = (x: number) => pad + x * (W - pad * 2)
  const py = (y: number) => H - pad - y * (H - pad * 2)
  return (
    <figure className="space-y-3">
      <div className="overflow-hidden rounded-3xl border border-border/50 bg-white p-2 text-neutral-900 sm:p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Positioning map: competitors cluster on listing what matched; Reconcile sits alone in explaining why for payment ops">
          <rect x={px(0.62)} y={py(1)} width={px(1) - px(0.62)} height={py(0.55) - py(1)} rx="14" fill={C.accent50} />
          <text x={px(0.64)} y={py(0.98) + 14} fontSize="11" fill={C.accent} fontWeight="600">THE EMPTY CORNER</text>
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#d4d4d4" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#d4d4d4" />
          <text x={pad} y={H - 14} fontSize="12" fill="#737373">Lists what matched</text>
          <text x={W - pad} y={H - 14} fontSize="12" fill="#737373" textAnchor="end">Explains why it differs →</text>
          <text x={16} y={H - pad} fontSize="12" fill="#737373" transform={`rotate(-90 16 ${H - pad})`}>Accounting close</text>
          <text x={16} y={pad + 92} fontSize="12" fill="#737373" transform={`rotate(-90 16 ${pad + 92})`}>Payment ops ↑</text>
          {PLAYERS.map((p) => (
            <g key={p.name} onMouseEnter={() => setHover(p.name)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <circle cx={px(p.x)} cy={py(p.y)} r={hover === p.name ? 9 : 7} fill="#a3a3a3" />
              <text x={px(p.x) + 12} y={py(p.y) + 4} fontSize="13" fill="#404040">{p.name}</text>
            </g>
          ))}
          <circle cx={px(0.86)} cy={py(0.84)} r="22" fill={C.accent} opacity="0.15">
            <animate attributeName="r" values="14;26;14" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={px(0.86)} cy={py(0.84)} r="10" fill={C.accent} />
          <text x={px(0.86)} y={py(0.84) + 40} fontSize="14" fill={C.accent} fontWeight="700" textAnchor="middle">Reconcile</text>
        </svg>
      </div>
      <figcaption className="text-xs text-text-secondary">My read of public product pages and docs, not a measured score.</figcaption>
    </figure>
  )
}

/* ---------------------------------------------------------------- *
 * 3. Traceability map: research → hypothesis → decision → screen    *
 * ---------------------------------------------------------------- */

export type Node = { id: string; label: string; detail: string }
export const R: Node[] = [
  { id: "R1", label: "Matching is table stakes", detail: "The fight is over the exceptions left after automation." },
  { id: "R2", label: "The “why” is still manual", detail: "Tools list what's in a payout, not why it differs." },
  { id: "R3", label: "Trust needs visible reasoning", detail: "Leading tools show why a match was made." },
  { id: "R4", label: "Timing is hidden, not explained", detail: "Absorbing timing also hides when money arrives." },
  { id: "G", label: "Nobody works per seller payout", detail: "Tools work per bank line, GL entry or period." },
]
export const HY: Node[] = [
  { id: "H1", label: "Causes that add up to the cent", detail: "Wrong if testers still ask for a spreadsheet." },
  { id: "H2", label: "Timing apart from loss stops false alarms", detail: "Wrong if testers call the $516.28 money lost." },
  { id: "H3", label: "Evidence labels build trust", detail: "Wrong if a Hypothesis closes as fast as Confirmed." },
  { id: "H4", label: "The seller payout is the unit of work", detail: "Wrong if testers look for a date or batch first." },
  { id: "H5", label: "Repeats become rules, with a preview", detail: "Wrong if testers can't tell what a rule changes." },
  { id: "H6", label: "Read-only, said up front, earns the connect", detail: "Wrong if testers quit at the connect step." },
]
export const DE: Node[] = [
  { id: "D1", label: "Seller payout as the unit", detail: "Every list, case and number hangs off a payout." },
  { id: "D2", label: "A bridge that adds up", detail: "Expected → one row per cause → recorded, with a check." },
  { id: "D3", label: "Timing apart from loss", detail: "Grey clock tag and a clear date. Late timing turns amber." },
  { id: "D4", label: "Say how sure", detail: "Confirmed, Likely, Hypothesis. No record needs a note." },
  { id: "D5", label: "Read-only, said out loud", detail: "No edit controls. Connect sheets say what we can't do." },
  { id: "D6", label: "Rules, with a preview", detail: "After 3 repeats, suggest a rule for future payouts only." },
]
export const SC: Node[] = [
  { id: "S1", label: "Home · Payouts · Cases", detail: "/images/reconcile/payouts.webp" },
  { id: "S2", label: "Why it differs", detail: "/images/reconcile/why.webp" },
  { id: "S3", label: "Timing card · Overdue", detail: "/images/reconcile/ondine.webp" },
  { id: "S4", label: "Atlas: $0.33 left", detail: "/images/reconcile/atlas.webp" },
  { id: "S5", label: "Connect sheet", detail: "/images/reconcile/connect.webp" },
  { id: "S6", label: "Suggested rule", detail: "/images/reconcile/rule.webp" },
]
export const EDGES: [string, string][] = [
  ["R2", "H1"], ["R4", "H2"], ["R3", "H3"], ["G", "H4"], ["R1", "H5"], ["R3", "H5"], ["R3", "H6"],
  ["H4", "D1"], ["H1", "D2"], ["H2", "D3"], ["H3", "D4"], ["H6", "D5"], ["H5", "D6"],
  ["D1", "S1"], ["D2", "S2"], ["D3", "S3"], ["D4", "S4"], ["D5", "S5"], ["D6", "S6"],
]

export function chainOf(id: string) {
  const set = new Set([id])
  // walk left and right separately so a node only lights its own chain
  const walk = (dir: 0 | 1) => {
    const frontier = [id]
    while (frontier.length) {
      const n = frontier.pop()!
      for (const e of EDGES) {
        const [from, to] = dir ? e : [e[1], e[0]]
        if (from === n && !set.has(to)) {
          set.add(to)
          frontier.push(to)
        }
      }
    }
  }
  walk(1)
  walk(0)
  return set
}

const COLS: { title: string; nodes: Node[]; tint: string }[] = [
  { title: "Research", nodes: R, tint: "#f5f5f5" },
  { title: "Hypothesis", nodes: HY, tint: "#fef3ec" },
  { title: "Decision", nodes: DE, tint: C.accent50 },
  { title: "Screen", nodes: SC, tint: "#ebf8f2" },
]

export function TraceMap() {
  const wrap = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [paths, setPaths] = useState<{ d: string; a: string; b: string }[]>([])
  const [active, setActive] = useState<string>("R3")
  const lit = useMemo(() => chainOf(active), [active])

  const measure = useCallback(() => {
    const w = wrap.current
    if (!w) return
    const box = w.getBoundingClientRect()
    const out: { d: string; a: string; b: string }[] = []
    for (const [a, b] of EDGES) {
      const ea = refs.current[a]
      const eb = refs.current[b]
      if (!ea || !eb) continue
      const ra = ea.getBoundingClientRect()
      const rb = eb.getBoundingClientRect()
      const x1 = ra.right - box.left
      const y1 = ra.top + ra.height / 2 - box.top
      const x2 = rb.left - box.left
      const y2 = rb.top + rb.height / 2 - box.top
      const mx = (x1 + x2) / 2
      out.push({ d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, a, b })
    }
    setPaths(out)
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (wrap.current) ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [measure])

  const activeNode = [...R, ...HY, ...DE, ...SC].find((n) => n.id === active)!
  const screen = SC.find((s) => lit.has(s.id))

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-3xl border border-border/50 bg-white p-4 text-neutral-900 sm:p-6">
        <div ref={wrap} className="relative grid min-w-[760px] grid-cols-4 gap-x-10">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {paths.map((p) => {
              const on = lit.has(p.a) && lit.has(p.b)
              return <path key={p.a + p.b} d={p.d} fill="none" stroke={on ? C.accent : "#e5e5e5"} strokeWidth={on ? 2 : 1.2} style={{ transition: "stroke .25s" }} />
            })}
          </svg>
          {COLS.map((col) => (
            <div key={col.title} className="relative flex flex-col gap-2">
              <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">{col.title}</p>
              {col.nodes.map((n) => {
                const on = lit.has(n.id)
                return (
                  <button
                    key={n.id}
                    ref={(el) => {
                      refs.current[n.id] = el
                    }}
                    type="button"
                    onMouseEnter={() => setActive(n.id)}
                    onFocus={() => setActive(n.id)}
                    onClick={() => setActive(n.id)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-left text-xs leading-snug transition-all duration-200",
                      on ? "text-neutral-900 shadow-sm ring-1" : "text-neutral-400",
                    )}
                    style={{ background: on ? col.tint : "#fafafa", ...(on ? { ["--tw-ring-color" as string]: C.accent100 } : {}) }}
                  >
                    <span className="font-semibold" style={{ color: on ? C.accent : undefined }}>{n.id === "G" ? "Gap" : n.id}</span> {n.label}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="grid items-center gap-5 sm:grid-cols-[1fr_160px]">
        <div key={active} className="space-y-1 motion-safe:animate-[sniffr-fade_.25s_ease-out]">
          <p className="text-xs font-semibold" style={{ color: C.accent }}>{active === "G" ? "Gap" : active}</p>
          <p className="text-lg font-semibold leading-snug">{activeNode.label}</p>
          {active.startsWith("S") ? null : <p className="text-sm text-foreground/60">{activeNode.detail}</p>}
          <p className="pt-2 text-xs text-foreground/45">Hover or tap any box to trace it end to end.</p>
        </div>
        {screen && (
          <div key={screen.id} className="mx-auto w-[150px] motion-safe:animate-[sniffr-rise_.3s_ease-out] sm:w-full">
            <Phone src={screen.detail} alt={screen.label} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 4. The bridge: a waterfall that adds up to the cent               *
 * ---------------------------------------------------------------- */

const STEPS = [
  { label: "Expected", v: 1192.87, kind: "total" as const },
  { label: "Payment still pending", v: -139.16, kind: "timing" as const, note: "clears Nov 11" },
  { label: "Refund after cutoff", v: 90.44, kind: "timing" as const, note: "off the Nov 11 payout" },
  { label: "Cross-border card fee", v: -2.9, kind: "fee" as const, note: "permanent" },
  { label: "Recorded", v: 1141.25, kind: "total" as const },
]

export function Bridge() {
  const { ref, seen } = useInView<HTMLDivElement>(0.35)
  const [onlyPermanent, setOnlyPermanent] = useState(false)
  // Zoom the y-axis to the interesting band so a $2.90 fee is still visible.
  const lo = 1040
  const hi = 1200
  const H = 260
  const y = (v: number) => H - ((v - lo) / (hi - lo)) * H
  let run = 0
  const bars = STEPS.map((s) => {
    if (s.kind === "total") {
      run = s.v
      return { ...s, top: y(s.v), h: H - y(s.v) }
    }
    const a = run
    const b = run + s.v
    run = b
    return { ...s, top: y(Math.max(a, b)), h: Math.max(3, Math.abs(y(a) - y(b))) }
  })
  const fmt = (v: number) => (v < 0 ? "−" : v > 0 ? "+" : "") + "$" + Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2 })
  return (
    <div ref={ref} className="space-y-4 rounded-3xl border border-border/50 bg-white p-4 text-neutral-900 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">Saltmarsh Candles · PO-30227</p>
        <div className="inline-flex rounded-full bg-neutral-100 p-1 text-xs">
          <button type="button" onClick={() => setOnlyPermanent(false)} className={cn("rounded-full px-3 py-1.5", !onlyPermanent && "bg-white shadow-sm")}>All causes</button>
          <button type="button" onClick={() => setOnlyPermanent(true)} className={cn("rounded-full px-3 py-1.5", onlyPermanent && "bg-white shadow-sm")}>What's really lost</button>
        </div>
      </div>
      <div className="grid grid-cols-5 items-end gap-2 sm:gap-4" style={{ height: H + 24 }}>
        {bars.map((b, i) => {
          const color = b.kind === "total" ? "#171717" : b.kind === "timing" ? C.timing : C.under
          const dim = onlyPermanent && b.kind === "timing"
          return (
            <div key={b.label} className="relative h-full">
              <div
                className="absolute inset-x-0 rounded-md transition-all duration-700 ease-out"
                style={{
                  top: seen ? b.top + 24 : H + 24,
                  height: seen ? b.h : 0,
                  background: color,
                  opacity: dim ? 0.15 : 1,
                  transitionDelay: `${i * 160}ms`,
                  backgroundImage: b.kind === "timing" ? "repeating-linear-gradient(135deg, transparent 0 5px, rgba(255,255,255,.45) 5px 8px)" : undefined,
                }}
              />
              <span className="absolute inset-x-0 text-center text-[11px] font-semibold tabular-nums transition-opacity duration-500 sm:text-xs" style={{ top: b.top + 4, opacity: seen ? (dim ? 0.3 : 1) : 0, transitionDelay: `${i * 160 + 400}ms`, color: b.kind === "total" ? "#171717" : color }}>
                {b.kind === "total" ? "$" + b.v.toLocaleString("en-US", { minimumFractionDigits: 2 }) : fmt(b.v)}
              </span>
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-5 gap-2 text-center text-[10px] leading-tight text-neutral-500 sm:gap-4 sm:text-xs">
        {STEPS.map((s) => (
          <span key={s.label}>
            {s.label}
            {"note" in s && s.note ? <span className="block text-neutral-400">{s.note}</span> : null}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-100 pt-3 text-xs text-neutral-600">
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: C.timing }} /> Timing, clears on its own</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: C.under }} /> Permanent</span>
        <span className="ml-auto font-semibold" style={{ color: C.positive }}>{onlyPermanent ? "Only $2.90 is really gone" : "Causes net to −$51.62 ✓"}</span>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 5. Evidence ladder                                                *
 * ---------------------------------------------------------------- */

const LEVELS = [
  { name: "Confirmed", color: C.positive, bg: "#ebf8f2", can: "Closes on its own", example: "Fee matched to record adj_MC2M, to the cent" },
  { name: "Likely", color: C.accent, bg: C.accent50, can: "A person confirms it", example: "CAD rate gap. The processor doesn't publish its rate" },
  { name: "Hypothesis", color: C.warn, bg: "#fef3ec", can: "Needs a written note", example: "A guess with no evidence. Closing logs it as a guess" },
]

export function EvidenceLadder() {
  const [i, setI] = useState(2)
  return (
    <div className="grid gap-5 sm:grid-cols-[1fr_200px] sm:items-center">
      <div className="space-y-2">
        {LEVELS.map((l, k) => (
          <button
            key={l.name}
            type="button"
            onClick={() => setI(k)}
            className={cn("flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all", k === i ? "border-transparent shadow-sm" : "border-border/50 opacity-70 hover:opacity-100")}
            style={{ background: k === i ? l.bg : undefined, marginLeft: `${k * 6}%`, width: `${100 - k * 6}%` }}
          >
            <span className="rounded-full px-2.5 py-1 text-xs font-semibold text-white" style={{ background: l.color }}>{l.name}</span>
            <span className="min-w-0 flex-1 text-sm">
              <b className="text-neutral-900">{l.can}</b>
              <span className="block truncate text-xs text-neutral-500">{l.example}</span>
            </span>
          </button>
        ))}
        <p className="pt-1 text-xs text-foreground/45">Less proof, more human judgment. A percentage looked precise but gave people nothing to check.</p>
      </div>
      <div className="mx-auto w-[160px] sm:w-full">
        <Phone src={i === 0 ? "/images/reconcile/why.webp" : i === 1 ? "/images/reconcile/atlas.webp" : "/images/reconcile/atlas.webp"} alt="Evidence labels in the prototype" />
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 6. Decisions: rejected vs chosen, with the screen                 *
 * ---------------------------------------------------------------- */

export const DECISIONS = [
  { id: "D1", title: "Make the seller payout the unit of work", from: "H4 · the gap no competitor fills", rejected: "A bank-line view or a period summary", chose: "Every list, case and number hangs off a seller payout", shot: "/images/reconcile/payouts.webp" },
  { id: "D2", title: "Explain the difference as a bridge", from: "H1 · R2", rejected: "A transaction list, or a one-line AI summary", chose: "Expected, one row per cause, recorded, and a check that it adds up", shot: "/images/reconcile/why.webp" },
  { id: "D3", title: "Keep timing apart from loss", from: "H2 · R4", rejected: "Hiding timing gaps like Ledge does", chose: "Grey clock tag with the date it clears. Late timing turns amber", shot: "/images/reconcile/home-timing.webp" },
  { id: "D4", title: "Say how sure every explanation is", from: "H3 · R3", rejected: "A confidence percentage", chose: "Confirmed, Likely, Hypothesis. No record needs a note", shot: "/images/reconcile/atlas.webp" },
  { id: "D5", title: "Read-only, said out loud", from: "H6", rejected: "Inline “fix” or “adjust” buttons", chose: "No edit controls. Say what Reconcile can't do before each connection", shot: "/images/reconcile/connect.webp" },
  { id: "D6", title: "Turn repeats into rules, with a preview", from: "H5 · R1", rejected: "Silent auto-learning", chose: "After 3 repeats, preview the rule. It only touches future payouts", shot: "/images/reconcile/rule.webp" },
]

export function Decisions() {
  const [i, setI] = useState(0)
  const d = DECISIONS[i]
  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist" aria-label="Decisions">
        {DECISIONS.map((x, k) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={cn("shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-colors", k === i ? "border-transparent text-white" : "border-border/60 text-foreground/65 hover:border-foreground/40")}
            style={k === i ? { background: C.accent } : undefined}
          >
            {x.id}
          </button>
        ))}
      </div>
      <div key={d.id} className="grid items-center gap-6 rounded-3xl border border-border/50 p-5 motion-safe:animate-[sniffr-fade_.25s_ease-out] sm:grid-cols-[1fr_220px] sm:p-7">
        <div className="space-y-5">
          <div>
            <p className="text-xs text-foreground/45">From {d.from}</p>
            <p className="mt-1 text-2xl font-semibold leading-tight tracking-tight text-balance">{d.title}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-2xl bg-foreground/[0.04] p-3">
              <span className="mt-0.5 shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/50">Rejected</span>
              <span className="text-sm text-foreground/50 line-through decoration-foreground/30">{d.rejected}</span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl p-3" style={{ background: C.accent50 }}>
              <span className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white" style={{ background: C.accent }}>Chose</span>
              <span className="text-sm font-medium text-neutral-900">{d.chose}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setI((i + DECISIONS.length - 1) % DECISIONS.length)} className="rounded-full border border-border/60 px-3 py-1.5 text-xs hover:border-foreground/40" aria-label="Previous decision">←</button>
            <button type="button" onClick={() => setI((i + 1) % DECISIONS.length)} className="rounded-full border border-border/60 px-3 py-1.5 text-xs hover:border-foreground/40" aria-label="Next decision">→</button>
          </div>
        </div>
        <div className="mx-auto w-[180px] sm:w-full">
          <Phone src={d.shot} alt={`${d.title} in the prototype`} />
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 7. 45 edge cases, grouped, each one tappable                      *
 * ---------------------------------------------------------------- */

type Edge = { t: string; r: string; built?: boolean; changed?: boolean; next?: boolean }
const AREAS: { name: string; rule: string; cases: Edge[] }[] = [
  {
    name: "Money & data",
    rule: "Numbers always add up. When they don't, show it.",
    cases: [
      { t: "Causes don't add up to the difference", r: "An “unexplained $X” row, and no closing until it's explained", built: true, changed: true, next: true },
      { t: "Errors that cancel out (+$10, −$10)", r: "Show “Check needed” instead of Matched" },
      { t: "Ledger in USD, payout in EUR", r: "Show the rate and its date. FX is its own cause" },
      { t: "Refunds bigger than sales", r: "“Seller owes” label with the next deduction date" },
      { t: "Expected payout never arrived", r: "“Missing record” with a contact-the-processor action" },
      { t: "Payout with no ledger entry", r: "“Unexpected payout”. Fix the ledger in the ledger" },
      { t: "Same payout ID twice", r: "Group with a warning, count it once" },
      { t: "One expected payout split in two", r: "Allow 1-to-many matches, say it was split" },
      { t: "Exactly at the $0.50 tolerance", r: "Say whether the edge counts. Log auto-matches" },
      { t: "$0.01 or $1,250,000.00", r: "Wide tabular numbers. Never abbreviate or hide a cent" },
    ],
  },
  {
    name: "Timing",
    rule: "When a timing guess is wrong, it's the riskiest moment.",
    cases: [
      { t: "Timing money misses its date", r: "Next day it turns Overdue (amber) and the owner is told", built: true, changed: true, next: true },
      { t: "Only part of it arrives", r: "Count what arrived, split the rest out as delayed" },
      { t: "11:59 PM ET is tomorrow in UTC", r: "Name the cutoff time zone in the cause" },
      { t: "Friday payout lands Monday", r: "Business days in the due date. Weekends aren't delays" },
      { t: "Daylight saving week", r: "Compute cutoffs in local time, test it" },
      { t: "Timing turned off in setup", r: "Show it as a normal difference, link to turn it on" },
    ],
  },
  {
    name: "Evidence",
    rule: "Less proof needs more human judgment. Only Confirmed closes itself.",
    cases: [
      { t: "Only a Hypothesis", r: "A note is required, logged as closed on a guess" },
      { t: "Two causes explain the same amount", r: "Show both, the person picks, the reason is logged" },
      { t: "No cause found", r: "“Cause unknown” plus a processor inquiry template" },
      { t: "Data changes after closing", r: "Reopen automatically, keep the old explanation", next: true },
      { t: "Reopened by hand", r: "Ask for a reason, log who and when" },
      { t: "Someone tries to edit an amount", r: "Not allowed. Fix the source in NetSuite, with a link", built: true },
    ],
  },
  {
    name: "Cases & teamwork",
    rule: "Ownership is always clear, and nothing unowned disappears.",
    cases: [
      { t: "Two people assign at once", r: "First tap wins. The other sees who took it", built: true, changed: true, next: true },
      { t: "Owner leaves the company", r: "Back to Triage, admin is told, notes stay" },
      { t: "Can't finish a case", r: "Unassign or hand off with a note" },
      { t: "Mine is empty", r: "“Nothing assigned” with a way to Triage" },
      { t: "Triage is empty", r: "A calm “everything has an owner”, no confetti", built: true },
      { t: "View-only role", r: "“View only” instead of the button, plus request access" },
      { t: "Fixing a note", r: "Editable, marked edited, history kept, never deleted" },
      { t: "One person holds 30 cases", r: "Flag cases older than 7 days, show workload to admins" },
    ],
  },
  {
    name: "Connecting",
    rule: "Stale or missing data leads to wrong calls, even when the numbers match.",
    cases: [
      { t: "Cancelled at the processor login", r: "“Not connected” and retry, without looking like an error" },
      { t: "Only some permissions granted", r: "List what's missing and what that breaks", built: true },
      { t: "Token expired", r: "“Last synced 3 days ago” banner on every screen", next: true },
      { t: "API outage, 90 of 144 imported", r: "Say so, retry, and don't compute a match rate yet" },
      { t: "Broken CSV", r: "Show which rows and why, import the good ones" },
      { t: "Brand-new account", r: "“We'll tell you when the first payout lands” plus sample data" },
      { t: "Huge first sync", r: "Run in the background, browse what's done" },
      { t: "Workspace already exists", r: "Offer to request to join it" },
      { t: "Bad invite emails", r: "Validate, merge duplicates, confirm outside domains", built: true },
    ],
  },
  {
    name: "Screens & access",
    rule: "Readable at any size, by anyone.",
    cases: [
      { t: "Very long seller names", r: "Truncate in lists, wrap in detail, amounts on one line" },
      { t: "No search results", r: "Empty state plus clear filters, keep the query", built: true },
      { t: "Offline on the subway", r: "Show the last data, disable assign, notes and close" },
      { t: "200% text size", r: "Amounts wrap instead of clipping" },
      { t: "Color-blind users", r: "Always a − or + sign, and icons with text on tags" },
      { t: "Screen readers", r: "Read “$51.62 short”, not “minus 51.62”" },
    ],
  },
]

export function EdgeCaseGrid() {
  const [sel, setSel] = useState<{ a: number; c: number }>({ a: 0, c: 0 })
  const [filter, setFilter] = useState<"all" | "built" | "changed">("all")
  const cur = AREAS[sel.a].cases[sel.c]
  const match = (e: Edge) => filter === "all" || (filter === "built" ? e.built : e.changed)
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 text-xs">
        {([
          ["all", "All 45"],
          ["built", "In the prototype · 8"],
          ["changed", "Changed the design · 3"],
        ] as const).map(([k, l]) => (
          <button key={k} type="button" onClick={() => setFilter(k)} className={cn("rounded-full border px-3 py-1.5", filter === k ? "border-transparent text-white" : "border-border/60 text-foreground/65")} style={filter === k ? { background: C.accent } : undefined}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {AREAS.map((area, a) => (
          <div key={area.name} className="rounded-2xl border border-border/50 p-3">
            <p className="text-xs font-semibold">{area.name}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {area.cases.map((e, c) => {
                const on = sel.a === a && sel.c === c
                const hit = match(e)
                return (
                  <button
                    key={e.t}
                    type="button"
                    onClick={() => setSel({ a, c })}
                    aria-label={e.t}
                    aria-pressed={on}
                    className={cn("h-5 w-5 rounded-full transition-all", on && "ring-2 ring-offset-2 ring-offset-background")}
                    style={{
                      background: !hit ? "color-mix(in srgb, currentColor 10%, transparent)" : e.changed ? C.under : e.built ? C.accent : "color-mix(in srgb, currentColor 35%, transparent)",
                      ["--tw-ring-color" as string]: C.accent,
                    }}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div key={cur.t} className="rounded-2xl p-4 motion-safe:animate-[sniffr-fade_.2s_ease-out]" style={{ background: C.accent50 }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.accent }}>{AREAS[sel.a].name}</p>
        <p className="mt-1 text-base font-semibold text-neutral-900">{cur.t}</p>
        <p className="mt-1 text-sm text-neutral-700">→ {cur.r}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
          {cur.changed && <span className="rounded-full px-2 py-0.5 text-white" style={{ background: C.under }}>Changed the design</span>}
          {cur.built && <span className="rounded-full px-2 py-0.5 text-white" style={{ background: C.accent }}>In the prototype</span>}
          {cur.next && <span className="rounded-full bg-white px-2 py-0.5 text-neutral-700">Top 5 to design next</span>}
        </div>
        <p className="mt-3 text-xs italic text-neutral-500">{AREAS[sel.a].rule}</p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 * 8. Versions: what each round asked, and the number that moved     *
 * ---------------------------------------------------------------- */

const VERSIONS = [
  { v: "v1", name: "Design canvas", q: "Does one model work on desktop and mobile?" },
  { v: "v2", name: "Test build", q: "Can a stranger use it end to end?" },
  { v: "v3", name: "Decision build", q: "Does each decision hold up under its hardest case?" },
]

export function Versions() {
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {VERSIONS.map((v, k) => (
        <li key={v.v} className="relative rounded-2xl border border-border/50 p-4" style={k === 2 ? { background: C.accent50, borderColor: "transparent" } : undefined}>
          <span className="text-xs font-semibold" style={{ color: C.accent }}>{v.v}</span>
          <p className={cn("mt-1 text-sm font-semibold", k === 2 && "text-neutral-900")}>{v.name}</p>
          <p className={cn("mt-1 text-xs", k === 2 ? "text-neutral-600" : "text-foreground/55")}>{v.q}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------------------------------------------------------------- *
 * 9. Live prototype with a guided walkthrough                       *
 * ---------------------------------------------------------------- */

const WALK = [
  { hash: "splash", title: "Connect, read-only", body: "Get started, then connect Stripe and NetSuite. Read what Reconcile can't do." },
  { hash: "home", title: "Spot the overdue timing", body: "Open the Timing card. One item is late, so it needs you." },
  { hash: "investigate", title: "Explain Saltmarsh", body: "Expand a cause, assign it, add a note, mark it explained." },
  { hash: "home", title: "Turn on the rule", body: "Back on Home, review the suggested rule." },
  { hash: "atlas", title: "Close Atlas with a note", body: "$0.33 has no record, so it needs a written reason." },
  { hash: "cases", title: "Lose a race", body: "Assign Lumen Glassworks. Daniel got there first." },
]

export function LivePrototype() {
  const [i, setI] = useState(0)
  const [src, setSrc] = useState("/prototypes/reconcile.html#splash")
  const go = (k: number) => {
    setI(k)
    setSrc(`/prototypes/reconcile.html?s=${k}#${WALK[k].hash}`)
  }
  return (
    <div className="grid items-start gap-6 sm:grid-cols-[1fr_340px]">
      <ol className="space-y-1.5">
        {WALK.map((w, k) => (
          <li key={k}>
            <button type="button" onClick={() => go(k)} aria-current={k === i ? "step" : undefined} className={cn("w-full rounded-2xl px-4 py-3 text-left transition-colors", k === i ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.03]")}>
              <span className="flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-foreground/40">{k + 1}</span>
                <span className={cn("text-sm font-medium", k === i ? "text-foreground" : "text-foreground/60")}>{w.title}</span>
              </span>
              {k === i && <span className="mt-1 block pl-6 text-xs text-foreground/60">{w.body}</span>}
            </button>
          </li>
        ))}
        <li className="px-4 pt-2 text-xs text-foreground/45">About 4 minutes. All data is synthetic but adds up to the cent.</li>
      </ol>
      <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[2.4rem] border-[8px] border-neutral-900 bg-black shadow-[0_24px_60px_rgba(30,20,80,0.2)]">
        <iframe key={src} src={src} title="Reconcile prototype" className="block h-[700px] w-full border-0 bg-white" loading="lazy" />
      </div>
    </div>
  )
}
