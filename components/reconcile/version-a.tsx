"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CaseHero } from "@/components/case-hero"
import { C, EdgeCaseGrid, LivePrototype, PositionMap } from "@/components/reconcile/story"

/**
 * Version A · Scroll story
 * A sticky phone on the right. Each step on the left is one link in the chain
 * (research → hypothesis → decision), and the phone swaps to the screen it became.
 */

type Step = {
  kicker: string
  title: string
  body: string
  decision?: boolean
  shot: string
  visual?: "question" | "gap" | "split" | "ladder" | "lock" | "rule" | "race"
}

const STEPS: Step[] = [
  { kicker: "The problem", title: "A seller received $51.62 less than expected.", body: "Saltmarsh expected $1,192.87 but received $1,141.25. Finance teams manually review transactions and spreadsheets to explain differences like this every payout cycle.", shot: "/images/reconcile/splash.webp", visual: "question" },
  { kicker: "01 · Explaining payout differences", title: "Existing tools show the numbers, not the reasons.", decision: true, body: "I designed a reconciliation breakdown that connects the expected payout to the recorded amount. Each row identifies a cause, and the total accounts for the difference.", shot: "/images/reconcile/why.webp", visual: "split" },
  { kicker: "02 · Organizing by seller", title: "Existing tools organize transactions, not sellers.", decision: true, body: "I organized the interface around individual seller payouts, so finance teams can review transactions, investigate differences, and manage cases in one place.", shot: "/images/reconcile/payouts.webp", visual: "gap" },
  { kicker: "03 · Making timing visible", title: "Delayed payments look like missing money.", decision: true, body: "I separated temporary delays from actual losses using status indicators and expected settlement dates. Overdue payments move into \u201cNeeds you\u201d for review.", shot: "/images/reconcile/ondine.webp" },
  { kicker: "04 · Communicating confidence", title: "Not every discrepancy has a confirmed explanation.", decision: true, body: "I introduced three confidence levels: Confirmed, Likely, and Hypothesis. Confirmed causes can resolve automatically, while unsupported explanations require manual review.", shot: "/images/reconcile/atlas.webp", visual: "ladder" },
  { kicker: "05 · Building trust", title: "Connecting financial accounts raises concerns about data access.", decision: true, body: "I made read-only permissions explicit during onboarding and removed editing controls. Closing a case records the decision without changing financial data.", shot: "/images/reconcile/connect.webp", visual: "lock" },
  { kicker: "06 · Automating recurring issues", title: "Finance teams investigate the same fees repeatedly.", decision: true, body: "Reconcile identifies recurring discrepancies and suggests automation rules after three occurrences. Users preview each rule before applying it to future payouts.", shot: "/images/reconcile/rule.webp", visual: "rule" },
  { kicker: "Edge case · Concurrent editing", title: "Two finance managers open the same case.", body: "The first action takes priority. The second manager sees who updated the case, preventing conflicting decisions.", shot: "/images/reconcile/conflict.webp", visual: "race" },
]

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
      <CaseHero
        nested
        slug="reconcile"
        title="Reconcile"
        roles={["Research", "Product strategy", "UX/UI Design", "Prototyping"]}
        tagline="Every dollar accounted for."
        when="November 2026"
        forWhom="Self-initiated fintech project"
        summary="Reconcile helps marketplace finance teams identify and explain differences between expected and actual seller payouts."
        scope="A read-only connection to the processor and ledger, a breakdown that explains each payout to the cent, confidence labels, shared cases and automation rules."
        useCase="A finance manager sees a seller payout come in $51.62 short and needs to know which part is delayed, which part is lost, and how sure the app is."
      />

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
              <p className="cs-eyebrow">{s.kicker}</p>
              <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-balance">{s.title}</h2>
              <div className="max-w-md space-y-1.5">
                {s.decision && <p className="text-xs font-semibold" style={{ color: C.accent }}>Design decision</p>}
                <p className="text-sm text-foreground/65">{s.body}</p>
              </div>
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
            <p className="mt-3 text-center text-xs text-foreground/45">{step.kicker}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="cs-eyebrow">Competitive landscape</p>
          <h2 className="cs-h2">Existing tools focus on matching transactions.</h2>
          <p className="text-sm text-foreground/60">I reviewed publicly available product documentation to identify opportunities for clearer, seller-level explanations.</p>
        </div>
        <PositionMap />
      </section>
      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="cs-eyebrow">Edge cases</p>
          <h2 className="cs-h2">I mapped 45 edge cases to test the system.</h2>
          <p className="text-sm text-foreground/60">Three directly influenced the design, including how Reconcile handles unexplained differences.</p>
          <p className="text-sm text-foreground/60">When causes don&apos;t account for the full gap, Reconcile displays the remaining amount as &ldquo;Unexplained&rdquo; and prevents the case from closing.</p>
        </div>
        <EdgeCaseGrid />
      </section>
      <section id="results" className="scroll-mt-32 space-y-6">
        <div className="max-w-2xl space-y-2">
          <p className="cs-eyebrow">Interactive prototype</p>
          <h2 className="cs-h2">Test the reconciliation workflow.</h2>
          <p className="text-sm text-foreground/60">Connect accounts, investigate a delayed payment, explain a payout difference, create an automation rule, and close a case.</p>
          <p className="text-xs text-foreground/45">All prototype data is synthetic and reconciles to the cent.</p>
        </div>
        <LivePrototype />
      </section>
    </div>
  )
}
