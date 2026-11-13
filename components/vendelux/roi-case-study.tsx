"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Check, ExternalLink, Link2Off, MousePointer2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Live, PLUM, PLUM_TEXT, Section } from "./kit"


/* The calculator's own demo inputs (Microsoft Ignite 2026). Not customer data. */
const DEMO = { booth: 30000, sponsorship: 15000, travel: 9000, other: 5000, attendees: 1012, capture: 15, opp: 40, deal: 30000, win: 25, ltv: 60000 }

const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : n >= 10_000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n).toLocaleString()}`

function Slider({ id, label, value, min, max, step, suffix, prefix, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; suffix?: string; prefix?: string; onChange: (v: number) => void }) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="flex items-baseline justify-between text-xs text-foreground/65">
        {label}
        <b className="text-sm tabular-nums text-foreground">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </b>
      </span>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[#4a0e4e]" />
    </label>
  )
}

/* ---------- the interactive calculator ---------- */

function Calculator() {
  const [v, setV] = useState(DEMO)
  const [basis, setBasis] = useState<"won" | "ltv">("won")
  const set = (k: keyof typeof DEMO) => (n: number) => setV((s) => ({ ...s, [k]: n }))
  const m = useMemo(() => {
    const budget = v.booth + v.sponsorship + v.travel + v.other
    const leads = v.attendees * (v.capture / 100)
    const opps = leads * (v.opp / 100)
    const pipeline = opps * v.deal
    const deals = opps * (v.win / 100)
    const won = deals * v.deal
    const ret = basis === "won" ? won : deals * v.ltv
    return { budget, leads, opps, pipeline, deals, won, ret, multiple: ret / budget, net: ((ret - budget) / budget) * 100 }
  }, [v, basis])

  const steps = [
    { n: 1, title: "Investment", out: money(m.budget), sub: "4 spend lines" },
    { n: 2, title: "Reach", out: Math.round(m.leads).toLocaleString(), sub: "captured leads" },
    { n: 3, title: "Conversion", out: money(m.pipeline), sub: `${Math.round(m.opps)} opportunities` },
    { n: 4, title: "Close", out: money(m.won), sub: "closed-won" },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
        {/* headline steps: the panel's four sections, each showing its result */}
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl bg-muted/50 p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/55">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#4a0e4e] text-[9px] text-white">{s.n}</span>
                {s.title}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                <Live value={s.out} />
              </p>
              <p className="text-[11px] text-foreground/50">{s.sub}</p>
            </li>
          ))}
        </ol>

        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <Slider id="roi-booth" label="Booth" prefix="$" value={v.booth} min={0} max={80000} step={1000} onChange={set("booth")} />
          <Slider id="roi-capture" label="Capture rate (attendees → leads)" suffix="%" value={v.capture} min={1} max={40} step={1} onChange={set("capture")} />
          <Slider id="roi-sponsor" label="Sponsorship" prefix="$" value={v.sponsorship} min={0} max={60000} step={1000} onChange={set("sponsorship")} />
          <Slider id="roi-opp" label="Lead → opportunity" suffix="%" value={v.opp} min={5} max={80} step={1} onChange={set("opp")} />
          <Slider id="roi-travel" label="Travel" prefix="$" value={v.travel} min={0} max={30000} step={500} onChange={set("travel")} />
          <Slider id="roi-deal" label="Average deal size" prefix="$" value={v.deal} min={5000} max={100000} step={1000} onChange={set("deal")} />
          <Slider id="roi-other" label="Other" prefix="$" value={v.other} min={0} max={20000} step={500} onChange={set("other")} />
          <Slider id="roi-win" label="Win rate" suffix="%" value={v.win} min={5} max={60} step={1} onChange={set("win")} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div role="radiogroup" aria-label="Calculate return from" className="inline-flex rounded-full bg-muted p-1 text-xs font-semibold">
            {(
              [
                ["won", "Closed-won revenue"],
                ["ltv", "Lifetime value (advanced)"],
              ] as const
            ).map(([k, label]) => (
              <button key={k} type="button" role="radio" aria-checked={basis === k} onClick={() => setBasis(k)} className={cn("rounded-full px-3 py-1.5 transition-colors", basis === k ? "bg-background text-foreground shadow-sm" : "text-foreground/55")}>
                {label}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setV(DEMO)} className="text-xs font-semibold text-foreground/55 hover:text-foreground">
            Reset to demo inputs
          </button>
        </div>
      </div>

      {/* the board card: only decision values */}
      <div className="space-y-2">
        <p className="cs-eyebrow">Planner card · live</p>
        <div className="rounded-2xl border-2 bg-card p-4 shadow-[0_16px_40px_-24px_rgba(28,26,22,0.4)]" style={{ borderColor: PLUM }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Microsoft Ignite 2026</p>
              <p className="text-[11px] text-foreground/50">Conference · Sponsor</p>
            </div>
            <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-700 dark:text-sky-300">Evaluating</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              ["Budget", money(m.budget)],
              [basis === "won" ? "Closed-won" : "LTV return", money(m.ret)],
              ["Gross multiple", `${m.multiple.toFixed(1)}x`],
            ].map(([k, val], i) => (
              <div key={k} className={cn("rounded-lg p-2", i ? "bg-[#4a0e4e]/[0.07]" : "bg-muted/60")}>
                <p className="text-[10px] text-foreground/50">{k}</p>
                <p className="text-sm font-semibold text-foreground">
                  <Live value={val} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-foreground/55">
            <Live value={`${Math.round(m.leads)} leads → ${Math.round(m.opps)} opps → ${money(m.pipeline)} pipeline`} />
          </p>
        </div>
        <p className="text-[11px] leading-relaxed text-foreground/50">
          Net ROI: <Live value={`${Math.round(m.net)}%`} /> · (return − budget) ÷ budget
        </p>
      </div>
    </div>
  )
}

/* ---------- page ---------- */

export function RoiCaseStudy() {
  return (
    <article className="space-y-20">
      {/* Header: the finding is the hook */}
      <header className="space-y-6">
        <div className="space-y-1.5">
          <p className="cs-eyebrow">Vendelux · ROI Calculator</p>
          <h1 className="cs-h1">Making Event ROI Forecasts More Reliable</h1>
          <p className="text-base text-foreground/75">Same event. Same inputs. 2x the projected return.</p>
          <p className="text-sm text-foreground/60">Sep – Nov 2026 · Sole product designer · Handed off to engineering</p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50 sm:grid-cols-4">
          {[
            ["Role", "Sole product designer"],
            ["Team", "PM, CEO, engineering"],
            ["Users", "Event marketers, budget owners"],
            ["Goal", "Decide which events are worth the spend"],
          ].map(([k, val]) => (
            <div key={k} className="bg-background p-4">
              <dt className="cs-eyebrow mb-1">{k}</dt>
              <dd className="text-sm text-foreground">{val}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* 1. The discrepancy */}
      <Section eyebrow="01 · The discrepancy" title="How you define return changes which event looks like a winner">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Old calculator", basis: "Lifetime value basis", value: 15.4, accent: false },
            { label: "Redesign default", basis: "Closed-won basis", value: 7.7, accent: true },
          ].map((c) => (
            <div key={c.label} className={cn("rounded-2xl p-5", c.accent ? "text-white" : "border border-border/60 bg-card")} style={c.accent ? { backgroundColor: PLUM } : undefined}>
              <p className={cn("text-xs font-semibold", c.accent ? "text-white/70" : "text-foreground/55")}>
                {c.label} · {c.basis}
              </p>
              <p className="mt-2 text-6xl font-semibold tracking-tight tabular-nums">{c.value}x</p>
              <div className={cn("mt-4 h-2 overflow-hidden rounded-full", c.accent ? "bg-white/20" : "bg-muted")}>
                <div className={cn("h-full rounded-full", c.accent ? "bg-white" : "bg-foreground/40")} style={{ width: `${(c.value / 15.4) * 100}%` }} />
              </div>
              <p className={cn("mt-2 text-xs", c.accent ? "text-white/70" : "text-foreground/50")}>Gross return multiple: revenue ÷ budget</p>
            </div>
          ))}
        </div>
        <p className="cs-caption">
          Microsoft Ignite 2026, $59k budget, using the calculator&apos;s own demo inputs, not customer data. On closed-won, net ROI is about 672%: ($455k − $59k) ÷ $59k.
        </p>
      </Section>

      {/* 2. Why the workflow failed */}
      <Section eyebrow="02 · Why the workflow failed" title="No customer ever used the old calculator">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-5">
            <div className="flex items-baseline gap-3">
              <p className="text-5xl font-semibold tracking-tight tabular-nums text-foreground">258</p>
              <p className="text-sm text-foreground/60">calculator events in 90 days</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full rounded-full" style={{ backgroundColor: PLUM }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground/75">
                  <b className="text-foreground">7</b> Vendelux staff: all 258
                </span>
                <span className="text-foreground/75">
                  Customers: <b className="text-red-700 dark:text-red-400">0</b>
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground/65">That gap is why the calculator moved into Planner, where customers already plan events.</p>
          </div>
          <div className="space-y-3 rounded-2xl bg-muted/40 p-5">
            <span className="inline-block rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">Demand, not impact</span>
            <p className="text-5xl font-semibold tracking-tight tabular-nums text-foreground">5</p>
            <p className="text-sm text-foreground/65">renewal conversations in the week of Nov 2 depended on proof of ROI.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* before */}
          <div className="space-y-3 rounded-2xl border border-border/60 bg-card p-4">
            <p className="cs-eyebrow">Before</p>
            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs font-semibold text-foreground">Planner card</p>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-dashed border-foreground/30 px-2 py-1.5 text-xs text-foreground/60">
                Budget: <span className="font-mono">60k?</span>
                <span className="h-3.5 w-px animate-pulse bg-foreground/70" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-foreground/50">
              <Link2Off className="h-3.5 w-3.5" /> no connection
            </div>
            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs font-semibold text-foreground">Separate page: Calculate ROI</p>
              <p className="mt-1 text-[11px] text-foreground/60">Leads → sales × lifetime value</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-red-700/30 p-2.5 text-[11px] text-red-700 dark:text-red-400">
              <X className="h-3.5 w-3.5" /> &ldquo;Open performance dashboard&rdquo; went nowhere
            </div>
          </div>

          <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-muted-foreground md:rotate-0" />

          {/* after */}
          <div className="space-y-3 rounded-2xl border-2 bg-card p-4" style={{ borderColor: PLUM }}>
            <p className={cn("cs-eyebrow", PLUM_TEXT)}>After</p>
            <div className="grid grid-cols-[1fr_1.3fr] gap-2">
              <div className="space-y-1.5 rounded-xl bg-muted/50 p-2">
                <p className="text-[10px] font-semibold text-foreground/55">Board</p>
                {["Ignite", "Trade show", "Summit"].map((e, i) => (
                  <div key={e} className={cn("rounded-md bg-background px-2 py-1 text-[10px]", i === 0 && "ring-2 ring-[#4a0e4e]")}>
                    {e}
                  </div>
                ))}
              </div>
              <div className="space-y-1 rounded-xl border border-border/60 p-2">
                <p className="text-[10px] font-semibold text-foreground/55">Event panel</p>
                {["Investment", "Reach", "Conversion", "Close"].map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5 text-[10px] text-foreground/75">
                    <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#4a0e4e] text-[8px] text-white">{i + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-foreground/60">The panel calculates and fills the card. Nothing leaves Planner.</p>
          </div>
        </div>
        <ul className="grid gap-2 sm:grid-cols-4">
          {["Disconnected calculator", "Budget typed from memory", "No opportunity stage", "Card had 6 fields, math filled 5"].map((t) => (
            <li key={t} className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2.5 text-sm text-foreground/80">
              <X className="h-4 w-4 shrink-0 text-red-700/70 dark:text-red-400" /> {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Exploration */}
      <Section eyebrow="03 · Exploration" title="Three ways in, one calculator">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              k: "A",
              t: "Link out",
              d: "Leaves the panel, loses context",
              sketch: (
                <div className="flex items-center gap-2">
                  <div className="h-14 flex-1 rounded-md border border-border/70 bg-background" />
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <div className="h-14 flex-1 rounded-md border border-dashed border-border bg-background" />
                </div>
              ),
            },
            {
              k: "B",
              t: "Per-field calculators",
              d: "Splits the funnel across fields",
              sketch: (
                <div className="space-y-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="h-3.5 flex-1 rounded border border-border/70 bg-background" />
                      <div className="h-3.5 w-8 rounded bg-foreground/15" />
                    </div>
                  ))}
                </div>
              ),
            },
            {
              k: "C",
              t: "One calculator in the panel",
              d: "Fills every card field in place",
              chosen: true,
              sketch: (
                <div className="flex gap-1.5">
                  <div className="h-14 w-1/3 rounded-md border border-border/70 bg-background" />
                  <div className="flex h-14 flex-1 flex-col justify-center gap-1 rounded-md bg-[#4a0e4e]/10 px-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-1.5 rounded-full bg-[#4a0e4e]/50" style={{ width: `${90 - i * 15}%` }} />
                    ))}
                  </div>
                </div>
              ),
            },
          ].map((o) => (
            <div key={o.k} className={cn("space-y-3 rounded-2xl p-4", o.chosen ? "border-2" : "border border-border/60")} style={o.chosen ? { borderColor: PLUM } : undefined}>
              <div className="rounded-xl bg-muted/50 p-3">{o.sketch}</div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                {o.chosen && <Check className={cn("h-4 w-4", PLUM_TEXT)} />}
                {o.k}. {o.t}
              </p>
              <p className="text-xs text-foreground/60">{o.d}</p>
            </div>
          ))}
        </div>
        <p className="cs-caption">Whiteboarded live with our PM. Her call: no new page, calculate inside the panel.</p>
      </Section>

      {/* 4. The forecast */}
      <Section eyebrow="04 · A forecast you can defend" title="Change an assumption, watch what moves">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {["1,012 qualified attendees", "152 captured leads", "61 opportunities", "$1.82M pipeline", "$455k closed-won"].map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              {i > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              <span className={cn("rounded-md px-2 py-1", i === 2 || i === 3 ? "border border-dashed border-[#4a0e4e]/60 bg-[#4a0e4e]/[0.06]" : "bg-muted/60")}>{s}</span>
            </span>
          ))}
        </div>
        <p className="cs-caption">Dashed: the opportunity and pipeline stages I added, because B2B teams report pipeline first.</p>
        <Calculator />
        <p className="flex items-center gap-1.5 text-xs text-foreground/50">
          <MousePointer2 className="h-3.5 w-3.5" /> Drag any input. Changed numbers flash.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-white">
              <Image src="/images/vendelux/roi-closed-won.jpg" alt="Budget and performance panel: $59,000 budget, $455,400 projected closed-won revenue, 7.7x" width={1100} height={420} className="h-auto w-full" sizes="(min-width: 768px) 400px, 100vw" />
            </div>
            <figcaption className="cs-caption">The prototype: closed-won by default, labelled gross.</figcaption>
          </figure>
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-white">
              <Image src="/images/vendelux/roi-ltv.jpg" alt="The same panel on lifetime value: $910,800 and 15.4x" width={1100} height={420} className="h-auto w-full" sizes="(min-width: 768px) 400px, 100vw" />
            </div>
            <figcaption className="cs-caption">Lifetime value stays available as an advanced option.</figcaption>
          </figure>
        </div>
      </Section>

      {/* 5. In context */}
      <Section eyebrow="05 · In context" title="Marketers compare events, so the board stays visible">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/30 p-4">
          <div className="grid grid-cols-2 gap-3 pr-[38%] sm:grid-cols-3">
            {[
              { e: "Microsoft Ignite", b: "$59k", x: "7.7x", on: true },
              { e: "Trade show", b: "$42k", x: "4.1x" },
              { e: "Regional summit", b: "$75k", x: "2.3x" },
              { e: "Partner expo", b: "$120k", x: "5.6x" },
              { e: "Field dinner", b: "$28k", x: "3.0x" },
              { e: "Industry forum", b: "$90k", x: "1.4x" },
            ].map((c) => (
              <div key={c.e} className={cn("rounded-xl bg-background p-3 shadow-sm", c.on && "ring-2 ring-[#4a0e4e]")}>
                <p className="truncate text-xs font-semibold text-foreground">{c.e}</p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-[11px] text-foreground/55">{c.b}</span>
                  <span className={cn("text-base font-semibold tabular-nums", c.on ? PLUM_TEXT : "text-foreground/80")}>{c.x}</span>
                </div>
              </div>
            ))}
          </div>
          {/* the drawer: wide, no blur behind it */}
          <div className="absolute inset-y-3 right-3 w-[35%] space-y-2 rounded-xl border border-border/60 bg-card p-3 shadow-[-12px_0_30px_-20px_rgba(0,0,0,0.35)]">
            <p className="text-[11px] font-semibold text-foreground">Ignite · Budget &amp; performance</p>
            {["Investment", "Reach", "Conversion", "Close"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5 text-[10px] text-foreground/75">
                <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#4a0e4e] text-[8px] text-white">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
        <p className="cs-caption">Illustrative board: every event except Ignite is a placeholder.</p>
      </Section>

      {/* 6. What review changed */}
      <Section eyebrow="06 · What review changed" title="Three of my assumptions didn't survive review">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: "No made-up numbers", before: "Prefilled $212 per lead", after: "Empty fields. Lifetime value and close rate remembered." },
            { t: "Keep the board visible", before: "Narrow drawer, blurred page", after: "Wider drawer, no blur" },
            { t: "Lead with the decision", before: "Budget and leads repeated on the card", after: "Decision values first, the funnel in one line" },
          ].map((c) => (
            <div key={c.t} className="space-y-3 rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{c.t}</p>
              <p className="flex items-start gap-2 text-xs text-foreground/50 line-through decoration-foreground/30">
                <X className="mt-px h-3.5 w-3.5 shrink-0 no-underline" /> {c.before}
              </p>
              <p className="flex items-start gap-2 text-xs text-foreground/80">
                <Check className={cn("mt-px h-3.5 w-3.5 shrink-0", PLUM_TEXT)} /> {c.after}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Pivotal decisions */}
      <Section eyebrow="07 · Decisions" title="Three calls that shaped it">
        <div className="overflow-hidden rounded-2xl border border-border/60">
          {[
            ["Calculate inside Planner", "Workflow design: the decision happens where the event lives"],
            ["Closed-won as the default", "Financial judgment: don't let an optimistic basis drive spend"],
            ["No prefill, defer reconciliation", "Data integrity and scope: ship a smaller, honest release"],
          ].map(([d, why], i) => (
            <div key={d} className={cn("grid gap-1 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6", i && "border-t border-border/60")}>
              <p className="text-sm font-semibold text-foreground">{d}</p>
              <p className="text-sm text-foreground/65">{why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="08 · Impact" title="What changed for the calculator" id="results">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { big: "15.4x → 7.7x", t: "Projected return cut in half", d: "Closed-won instead of lifetime value removed about a 2x overstatement, on the calculator's own example inputs." },
            { big: "5 → 6", t: "Every plan field filled", d: "The card shows six plan values. Adding the opportunity step lets the calculator produce pipeline too." },
            { big: "2 inputs", t: "Entered once, not every event", d: "Lifetime value and close rate carry over to the next event." },
          ].map((c) => (
            <div key={c.t} className="space-y-2 rounded-2xl border border-border/60 bg-card p-5">
              <p className={cn("text-3xl font-semibold tracking-tight tabular-nums", PLUM_TEXT)}>{c.big}</p>
              <p className="text-sm font-semibold text-foreground">{c.t}</p>
              <p className="text-xs leading-relaxed text-foreground/60">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="09 · Across the Planner redesign" title="Fewer steps, fewer conflicting numbers">
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <div className="hidden grid-cols-[1.1fr_2fr_1.4fr_auto] gap-4 bg-muted/40 px-4 py-2.5 text-[11px] font-semibold tracking-wide text-foreground/55 uppercase md:grid">
            <span>Area</span>
            <span>Before → After</span>
            <span>Impact</span>
            <span>Type</span>
          </div>
          {[
            { a: "Ways to add an event", before: "2 buttons, 2 windows", after: "1 button, 1 window", impact: "50% fewer entry points", type: "Counted" },
            { a: "Adding an event that isn't on Vendelux", before: "~8 steps: search, cancel, reopen, retype the name", after: "~5: search, pick “Add as private”, fill the link, submit", impact: "~35–40% fewer steps", type: "Estimated" },
            { a: "Wrong files uploaded to Import", before: "2 of 5 real customer files weren't event lists, and nothing said so", after: "A clear error before anything is created", impact: "40% of sample uploads now caught", type: "Counted" },
            { a: "Board space above the fold", before: "Summary tiles plus a separate Columns row (~200px)", after: "Removed", impact: "~20% more board on a typical laptop", type: "Estimated" },
            { a: "ROI headline accuracy", before: "Showed 22.3x as ROI", after: "21.3x, the correct figure", impact: "~5% overstatement removed", type: "Counted" },
            { a: "Conflicting counts on the board", before: "Tiles said 3 and 2; columns showed 4 and 5", after: "One source for every count", impact: "2 conflicts → 0", type: "Counted" },
            { a: "Header actions", before: "Add event, Add private event, Import, Export", after: "3 buttons", impact: "25% fewer header buttons", type: "Counted" },
          ].map((r, i) => (
            <div key={r.a} className={cn("grid gap-2 px-4 py-4 md:grid-cols-[1.1fr_2fr_1.4fr_auto] md:items-center md:gap-4", i && "border-t border-border/60")}>
              <p className="text-sm font-semibold text-foreground">{r.a}</p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="rounded-md bg-muted/60 px-2 py-1 text-foreground/55 line-through decoration-foreground/25">{r.before}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                <span className="rounded-md bg-[#4a0e4e]/[0.07] px-2 py-1 text-foreground/85">{r.after}</span>
              </div>
              <p className={cn("text-sm font-semibold", PLUM_TEXT)}>{r.impact}</p>
              <span className={cn("w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold", r.type === "Counted" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-foreground/10 text-foreground/65")}>{r.type}</span>
            </div>
          ))}
        </div>
        <p className="cs-caption">Counted: measured in the product or from real files. Estimated: step counts and screen space, not usage data.</p>
      </Section>

      {/* 10. Outcome */}
      <Section eyebrow="10 · Outcome" title="Where it stands">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { tag: "Live in dev", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", body: "Planner redesign, on real data" },
            { tag: "Deferred", tone: "bg-foreground/10 text-foreground/70", body: "Full calculator reconciliation and card aggregates" },
            { tag: "Next", tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300", body: "Test with marketers' real numbers, then link forecasts to post-event actuals" },
          ].map((c) => (
            <div key={c.tag} className="space-y-2 rounded-2xl border border-border/60 bg-card p-4">
              <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", c.tone)}>{c.tag}</span>
              <p className="text-sm text-foreground/75">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="cs-caption">
          Checked against the live product, the math and PM and CEO reviews. No moderated user tests yet, and the 2x gap comes from demo inputs, not a measured change across customers.
        </p>
      </Section>
    </article>
  )
}
