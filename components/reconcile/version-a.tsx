"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Bridge, C, EdgeCaseGrid, LivePrototype, PositionMap } from "@/components/reconcile/story"

/**
 * Version A · Scroll story
 * A sticky phone on the right. Each step on the left is one link in the chain
 * (research → hypothesis → decision), and the phone swaps to the screen it became.
 */

type Step = {
  chain: string[]
  kicker: string
  title: string
  body: string
  shot: string
  visual?: "question" | "gap" | "split" | "ladder" | "lock" | "rule" | "race"
}

const STEPS: Step[] = [
  { chain: ["The question"], kicker: "A Tuesday morning", title: "Saltmarsh expected $1,192.87. It got $1,141.25.", body: "Finance has to explain the −$51.62. Today, they rebuild a spreadsheet every payout to do it.", shot: "/images/reconcile/splash.webp", visual: "question" },
  { chain: ["R2", "H1", "D2"], kicker: "Tools say what. Nobody says why.", title: "So I made the core screen a bridge that adds up.", body: "Expected, one row per cause, recorded. A check line proves the causes net to the gap.", shot: "/images/reconcile/why.webp", visual: "split" },
  { chain: ["Gap", "H4", "D1"], kicker: "Tools work per bank line or period", title: "Marketplaces think in sellers, so every screen does too.", body: "Every list, case and number hangs off one seller payout.", shot: "/images/reconcile/payouts.webp", visual: "gap" },
  { chain: ["R4", "H2", "D3"], kicker: "Tools hide timing", title: "I gave timing a grey clock and a date, never a red flag.", body: "When timing misses its date, it turns amber and moves to Needs you.", shot: "/images/reconcile/ondine.webp" },
  { chain: ["R3", "H3", "D4"], kicker: "Trust comes from visible reasoning", title: "Every cause says how sure it is.", body: "Confirmed closes itself. Anything without a record needs a written reason.", shot: "/images/reconcile/atlas.webp", visual: "ladder" },
  { chain: ["R3", "H6", "D5"], kicker: "Connecting books is scary", title: "Say what it can't do, before asking for access.", body: "No edit controls anywhere. Closing a case confirms no amounts change.", shot: "/images/reconcile/connect.webp", visual: "lock" },
  { chain: ["R1", "H5", "D6"], kicker: "The same fee, every week", title: "Reconcile turns repeats into rules, but only with a preview.", body: "After three repeats, Reconcile suggests a rule that only touches future payouts.", shot: "/images/reconcile/rule.webp", visual: "rule" },
  { chain: ["Edge case"], kicker: "Two people, one case", title: "First tap wins, and the other person sees who.", body: "One of 45 edge cases. Three of them changed the design.", shot: "/images/reconcile/conflict.webp", visual: "race" },
]

function ChainChips({ chain, active }: { chain: string[]; active: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chain.map((c, i) => {
        const tone = c.startsWith("R") || c === "Gap" ? "#737373" : c.startsWith("H") ? C.warn : c.startsWith("D") ? C.accent : C.under
        return (
          <span key={c} className="flex items-center gap-1.5">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-500"
              style={{ background: active ? tone : "transparent", color: active ? "#fff" : tone, boxShadow: `inset 0 0 0 1px ${tone}`, transitionDelay: `${i * 120}ms` }}
            >
              {c}
            </span>
            {i < chain.length - 1 && <span className="text-foreground/30">→</span>}
          </span>
        )
      })}
    </div>
  )
}

function StepVisual({ kind, active }: { kind?: Step["visual"]; active: boolean }) {
  if (kind === "split")
    return (
      <div className="flex h-10 overflow-hidden rounded-xl text-[10px] font-semibold text-white">
        <span className="flex items-center justify-center transition-all duration-700" style={{ width: active ? "73%" : "0%", background: C.timing }}>Pending −$139.16</span>
        <span className="flex items-center justify-center transition-all delay-150 duration-700" style={{ width: active ? "25%" : "0%", background: "#c4c4c4" }}>Refund</span>
        <span className="flex items-center justify-center transition-all delay-300 duration-700" style={{ width: active ? "2%" : "0%", background: C.under }} />
      </div>
    )
  if (kind === "ladder")
    return (
      <div className="flex gap-1.5">
        {[["Confirmed", C.positive], ["Likely", C.accent], ["Hypothesis", C.warn]].map(([l, c], i) => (
          <span key={l} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all duration-500" style={{ background: c, opacity: active ? 1 : 0.2, transform: active ? "none" : "translateY(6px)", transitionDelay: `${i * 120}ms` }}>
            {l}
          </span>
        ))}
      </div>
    )
  if (kind === "question")
    return (
      <p className="text-6xl font-semibold tabular-nums tracking-tight transition-colors duration-700" style={{ color: active ? C.under : "currentColor" }}>
        −$51.62
      </p>
    )
  return null
}

export function VersionA() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const step = STEPS[active]
  return (
    <div className="space-y-28">
      {/* Hero */}
      <header className="space-y-6 pt-4">
        <p className="cs-eyebrow">Fintech product design · Solo · 2026</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Payout discrepancies are <span style={{ color: C.accent }}>hard to explain.</span>
        </h1>
        <p className="max-w-xl text-base text-foreground/65">Finance teams manually compare transactions and spreadsheets to identify missing amounts. Reconcile shows exactly where each discrepancy comes from.</p>
        <div className="flex items-center gap-2 text-xs text-foreground/45">
          <span className="inline-block h-6 w-[2px] animate-pulse rounded-full bg-foreground/30" /> Scroll
        </div>
      </header>

      {/* Scrolly */}
      <section className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-i={i}
              className={cn("flex min-h-[78vh] flex-col justify-center gap-5 transition-opacity duration-500", active === i ? "opacity-100" : "opacity-30")}
            >
              <ChainChips chain={s.chain} active={active === i} />
              <p className="text-sm text-foreground/50">{s.kicker}</p>
              <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-balance">{s.title}</h2>
              <p className="max-w-md text-sm text-foreground/65">{s.body}</p>
              <StepVisual kind={s.visual} active={active === i} />
              {/* phone inline on small screens */}
              <div className="mx-auto mt-2 w-[220px] lg:hidden">
                <div className="overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-white">
                  <Image src={s.shot} alt={s.title} width={780} height={1688} className="h-auto w-full" sizes="220px" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-[12vh]">
            <div className="relative overflow-hidden rounded-[2.4rem] border-[8px] border-neutral-900 bg-white shadow-[0_30px_80px_rgba(60,40,160,0.25)]" style={{ aspectRatio: "390 / 844" }}>
              {STEPS.map((s, i) => (
                <Image key={s.shot + i} src={s.shot} alt={s.title} fill className={cn("object-cover object-top transition-all duration-700", active === i ? "scale-100 opacity-100" : "scale-[1.03] opacity-0")} sizes="320px" />
              ))}
            </div>
            <div className="mt-5 flex justify-center gap-1.5">
              {STEPS.map((_, i) => (
                <span key={i} className="h-1.5 rounded-full transition-all duration-300" style={{ width: active === i ? 20 : 6, background: active === i ? C.accent : "color-mix(in srgb, currentColor 20%, transparent)" }} />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-foreground/45">{step.chain.join(" → ")}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <p className="cs-eyebrow">Where it sits</p>
        <h2 className="cs-h2">Competitors solved matching. Nobody explains the gap.</h2>
        <PositionMap />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">The bridge, live</p>
        <h2 className="cs-h2">Toggle to see what&apos;s really lost.</h2>
        <Bridge />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">Edge cases</p>
        <h2 className="cs-h2">I mapped 45 edge cases. Tap any dot.</h2>
        <EdgeCaseGrid />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">Prototype v3</p>
        <h2 className="cs-h2">Try it yourself.</h2>
        <LivePrototype />
      </section>
    </div>
  )
}
