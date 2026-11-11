"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { C, EdgeCaseGrid, LivePrototype, PositionMap } from "@/components/reconcile/story"

/**
 * Version B · Play the case
 * The reader is the finance manager. Five small challenges, each one a real
 * moment in the product. Answering reveals the research and the decision behind it.
 */

function Reveal({ show, chain, title, body, shot }: { show: boolean; chain: string; title: string; body: string; shot: string }) {
  if (!show) return null
  return (
    <div className="grid items-center gap-6 rounded-3xl p-5 motion-safe:animate-[sniffr-rise_.4s_ease-out] sm:grid-cols-[1fr_180px] sm:p-7" style={{ background: C.accent50 }}>
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-wide" style={{ color: C.accent }}>{chain}</p>
        <p className="text-xl font-semibold leading-snug tracking-tight text-neutral-900 text-balance">{title}</p>
        <p className="text-sm text-neutral-600">{body}</p>
      </div>
      <div className="mx-auto w-[160px] overflow-hidden rounded-[1.4rem] border-[5px] border-neutral-900 bg-white sm:w-full">
        <Image src={shot} alt={title} width={780} height={1688} className="h-auto w-full" sizes="180px" />
      </div>
    </div>
  )
}

function Level({ n, done, title, children }: { n: number; done: boolean; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white transition-colors" style={{ background: done ? C.positive : "#171717" }}>
          {done ? "✓" : n}
        </span>
        <p className="text-xs font-semibold tracking-[0.14em] text-foreground/45 uppercase">Challenge {n} of 5</p>
      </div>
      <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-balance">{title}</h2>
      {children}
    </section>
  )
}

function Choice({ label, onClick, state }: { label: string; onClick: () => void; state?: "right" | "wrong" | "idle" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all",
        state === "right" && "border-transparent text-white",
        state === "wrong" && "border-transparent bg-neutral-200 text-neutral-500 line-through dark:bg-neutral-800",
        (!state || state === "idle") && "border-border/60 hover:-translate-y-0.5 hover:border-foreground/40",
      )}
      style={state === "right" ? { background: C.positive } : undefined}
    >
      {label}
    </button>
  )
}

/* 1 · Is it lost? */
function One({ onDone }: { onDone: () => void }) {
  const [pick, setPick] = useState<string | null>(null)
  const opts = ["Saltmarsh lost all $51.62", "Most of it is just late", "It's a bank error"]
  const right = opts[1]
  return (
    <Level n={1} done={pick === right} title="Saltmarsh expected $1,192.87 and got $1,141.25. How much of the $51.62 is really gone?">
      <div className="grid gap-3 sm:grid-cols-3">
        {opts.map((o) => (
          <Choice
            key={o}
            label={o}
            state={pick === null ? "idle" : o === right ? (pick === o ? "right" : "idle") : pick === o ? "wrong" : "idle"}
            onClick={() => {
              setPick(o)
              if (o === right) onDone()
            }}
          />
        ))}
      </div>
      {pick && pick !== right && <p className="text-sm text-foreground/55">Most tools would show it that way too. Try again.</p>}
      <Reveal
        show={pick === right}
        chain="R4 → H2 → D3 · Timing apart from loss"
        title="Only $2.90 is gone for good. The rest is timing."
        body="Competitors absorb timing gaps, which also hides when money arrives. Reconcile gives timing a grey clock and a date, and only turns it amber when the date passes."
        shot="/images/reconcile/ondine.webp"
      />
    </Level>
  )
}

/* 2 · Build the bridge */
const CAUSES = [
  { id: "a", label: "Payment still pending", v: -139.16, right: true },
  { id: "b", label: "Refund after cutoff", v: 90.44, right: true },
  { id: "c", label: "Cross-border card fee", v: -2.9, right: true },
  { id: "d", label: "Currency rounding", v: -0.33, right: false },
  { id: "e", label: "Duplicate charge", v: -51.62, right: false },
]
function Two({ onDone }: { onDone: () => void }) {
  const [on, setOn] = useState<string[]>([])
  const total = on.reduce((s, id) => s + CAUSES.find((c) => c.id === id)!.v, 0)
  const solved = Math.abs(total + 51.62) < 0.005 && on.every((id) => CAUSES.find((c) => c.id === id)!.right) && on.length === 3
  const toggle = (id: string) => {
    const next = on.includes(id) ? on.filter((x) => x !== id) : [...on, id]
    setOn(next)
    const t = next.reduce((s, x) => s + CAUSES.find((c) => c.id === x)!.v, 0)
    if (Math.abs(t + 51.62) < 0.005 && next.length === 3 && next.every((x) => CAUSES.find((c) => c.id === x)!.right)) onDone()
  }
  const pct = Math.min(100, (Math.abs(total) / 139.16) * 100)
  return (
    <Level n={2} done={solved} title="Now explain it. Pick the causes that add up to −$51.62, to the cent.">
      <div className="flex flex-wrap gap-2">
        {CAUSES.map((c) => {
          const active = on.includes(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={cn("rounded-full border px-4 py-2 text-sm transition-all", active ? "border-transparent text-white" : "border-border/60 hover:border-foreground/40")}
              style={active ? { background: c.v > 0 ? C.positive : c.label.includes("fee") ? C.under : "#525252" } : undefined}
            >
              {c.label} <span className="tabular-nums opacity-70">{c.v > 0 ? "+" : "−"}${Math.abs(c.v).toFixed(2)}</span>
            </button>
          )
        })}
      </div>
      <div className="rounded-2xl border border-border/50 p-5">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-foreground/55">Your causes add up to</span>
          <span className="text-2xl font-semibold tabular-nums" style={{ color: solved ? C.positive : undefined }}>
            {total < 0 ? "−" : total > 0 ? "+" : ""}${Math.abs(total).toFixed(2)}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: solved ? C.positive : C.accent }} />
        </div>
        <p className="mt-2 text-xs text-foreground/50">{solved ? "Check: causes net to the gap. ✓" : "Target −$51.62. A single “duplicate charge” would match, but nothing records it."}</p>
      </div>
      <Reveal
        show={solved}
        chain="R2 → H1 → D2 · A bridge that adds up"
        title="That's the core screen: expected, one row per cause, recorded."
        body="Every tool I studied lists what's in a payout. None says why it differs. The bridge has a check line, so a cause that doesn't add up can't hide."
        shot="/images/reconcile/why.webp"
      />
    </Level>
  )
}

/* 3 · How sure? */
const CLAIMS = [
  { text: "Fee matched to record adj_MC2M, to the cent", level: "Confirmed" },
  { text: "CAD rate gap. The processor doesn't publish its rate", level: "Likely" },
  { text: "A guess with no evidence behind it", level: "Hypothesis" },
]
const LV = [
  { name: "Confirmed", color: C.positive },
  { name: "Likely", color: C.accent },
  { name: "Hypothesis", color: C.warn },
]
function Three({ onDone }: { onDone: () => void }) {
  const [ans, setAns] = useState<Record<number, string>>({})
  const solved = CLAIMS.every((c, i) => ans[i] === c.level)
  const set = (i: number, l: string) => {
    const next = { ...ans, [i]: l }
    setAns(next)
    if (CLAIMS.every((c, k) => next[k] === c.level)) onDone()
  }
  return (
    <Level n={3} done={solved} title="Every cause gets a label. How sure is each one?">
      <div className="space-y-3">
        {CLAIMS.map((c, i) => {
          const wrong = ans[i] && ans[i] !== c.level
          return (
            <div key={c.text} className="flex flex-col gap-3 rounded-2xl border border-border/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm">{c.text}</p>
              <div className="flex shrink-0 gap-1.5">
                {LV.map((l) => {
                  const picked = ans[i] === l.name
                  return (
                    <button
                      key={l.name}
                      type="button"
                      onClick={() => set(i, l.name)}
                      className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition-all", picked ? "text-white" : "hover:opacity-80")}
                      style={{ background: picked ? (wrong ? "#a3a3a3" : l.color) : "transparent", color: picked ? "#fff" : l.color, boxShadow: `inset 0 0 0 1px ${picked && wrong ? "#a3a3a3" : l.color}` }}
                    >
                      {l.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <Reveal
        show={solved}
        chain="R3 → H3 → D4 · Say how sure"
        title="Confirmed closes itself. A Hypothesis needs a written reason."
        body="Leading tools earn trust by showing why they matched. I picked three plain labels over a confidence percentage, because a percentage says nothing about what to do next."
        shot="/images/reconcile/atlas.webp"
      />
    </Level>
  )
}

/* 4 · The race */
function Four({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<"idle" | "lost">("idle")
  return (
    <Level n={4} done={state === "lost"} title="Two people open the same case. Tap Assign to me.">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { who: "You", you: true },
          { who: "Daniel", you: false },
        ].map((p) => (
          <div key={p.who} className="rounded-2xl border border-border/50 p-5">
            <p className="text-xs text-foreground/45">{p.who}&apos;s phone</p>
            <p className="mt-1 text-sm font-semibold">Saltmarsh · $2.90 fee</p>
            {p.you ? (
              state === "idle" ? (
                <button
                  type="button"
                  onClick={() => {
                    setState("lost")
                    onDone()
                  }}
                  className="mt-4 w-full rounded-xl py-3 text-sm font-semibold text-white transition-transform active:scale-95"
                  style={{ background: C.accent }}
                >
                  Assign to me
                </button>
              ) : (
                <div className="mt-4 rounded-xl px-3 py-3 text-sm motion-safe:animate-[sniffr-fade_.3s]" style={{ background: "#fef3ec", color: C.under }}>
                  Daniel took this case a moment ago. You didn&apos;t lose any of your work.
                </div>
              )
            ) : (
              <div className={cn("mt-4 rounded-xl py-3 text-center text-sm font-semibold transition-colors", state === "lost" ? "text-white" : "bg-foreground/5 text-foreground/40")} style={state === "lost" ? { background: C.positive } : undefined}>
                {state === "lost" ? "Assigned to Daniel ✓" : "Assign to me"}
              </div>
            )}
          </div>
        ))}
      </div>
      <Reveal
        show={state === "lost"}
        chain="Edge case · 1 of 45"
        title="Daniel was faster. First tap wins, and you see who."
        body="I listed 45 edge cases across 6 areas. In finance, a number that silently changes sends people back to Excel. This one changed the design."
        shot="/images/reconcile/conflict.webp"
      />
    </Level>
  )
}

/* 5 · The rule */
function Five({ onDone }: { onDone: () => void }) {
  const [pick, setPick] = useState<"now" | "preview" | null>(null)
  return (
    <Level n={5} done={pick === "preview"} title="The same $2.90 card fee showed up for the third week. What should happen?">
      <div className="flex gap-1.5">
        {[1, 2, 3].map((w) => (
          <span key={w} className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: C.under, opacity: 0.4 + w * 0.2 }}>
            Week {w} · −$2.90
          </span>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice label="Learn it silently and auto-close from now on" state={pick === "now" ? "wrong" : "idle"} onClick={() => setPick("now")} />
        <Choice
          label="Suggest a rule, show what it would touch, apply to future payouts only"
          state={pick === "preview" ? "right" : "idle"}
          onClick={() => {
            setPick("preview")
            onDone()
          }}
        />
      </div>
      {pick === "now" && <p className="text-sm text-foreground/55">That&apos;s silent auto-learning. You&apos;d never know what it changed. Try the other one.</p>}
      <Reveal
        show={pick === "preview"}
        chain="R1 → H5 → D6 · Rules, with a preview"
        title="Repeats become rules, but only after you see the preview."
        body="Matching is table stakes, so the fight is the exceptions left over. A rule clears them, as long as it never rewrites a payout that already closed."
        shot="/images/reconcile/rule.webp"
      />
    </Level>
  )
}

export function VersionB() {
  const [done, setDone] = useState<boolean[]>([false, false, false, false, false])
  const mark = (i: number) => () => setDone((d) => d.map((x, k) => (k === i ? true : x)))
  const count = done.filter(Boolean).length
  const Steps = [One, Two, Three, Four, Five]
  return (
    <div className="space-y-24">
      <header className="space-y-6 pt-4">
        <p className="cs-eyebrow">Fintech product design · Solo · 2026</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          You&apos;re the finance manager. <span style={{ color: C.accent }}>Close the payout.</span>
        </h1>
        <p className="max-w-xl text-base text-foreground/65">Reconcile explains why a seller payout doesn&apos;t match. Play five moments from the product, and see the research behind each design call.</p>
      </header>

      <div className="sticky top-20 z-20 -mx-2 rounded-full border border-border/50 bg-background/85 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold tabular-nums">{count}/5</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${count * 20}%`, background: count === 5 ? C.positive : C.accent }} />
          </div>
          <span className="text-foreground/50">{count === 5 ? "Payout closed" : "Saltmarsh · −$51.62"}</span>
        </div>
      </div>

      {Steps.map((S, i) => (
        <div key={i} className={cn("transition-opacity duration-500", i > 0 && !done[i - 1] && "pointer-events-none opacity-25")}>
          <S onDone={mark(i)} />
        </div>
      ))}

      <section className="space-y-6">
        <p className="cs-eyebrow">Where the research came from</p>
        <h2 className="cs-h2">I studied 6 products. Competitors solved matching, but nobody explains the gap.</h2>
        <PositionMap />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">Edge cases</p>
        <h2 className="cs-h2">I mapped 45 edge cases. Tap any dot.</h2>
        <EdgeCaseGrid />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">Prototype v3</p>
        <h2 className="cs-h2">Now try the real thing.</h2>
        <LivePrototype />
      </section>
    </div>
  )
}
