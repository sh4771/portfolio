"use client"

import { useState } from "react"
import { Hand, Lightbulb, ThumbsDown, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { CaseHero } from "@/components/case-hero"
import { Section } from "@/components/vendelux/kit"
import {
  INK,
  INK_BG,
  CapturePipeline,
  CompetitorGrid,
  DecisionChain,
  DraftMerge,
  EffortMap,
  FinalDecisions,
  HowMightWe,
  HypothesisMap,
  NextSteps,
  ProblemStats,
  ResearchJourney,
  TestPlan,
} from "@/components/adhd-planner/diagrams"

/** One working phone. The prototype lives in a static page so the same code runs here and on its own. */
function Phone({ v, label, className }: { v: "final" | "a" | "b" | "c"; label: string; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[300px]", className)}>
      <div className="aspect-[390/844] w-full">
        <iframe src={`/prototypes/adhd-planner.html?v=${v}`} title={label} loading="lazy" className="h-full w-full border-0 bg-transparent" />
      </div>
    </div>
  )
}

const DRAFTS = {
  a: { tab: "A · Clock", bet: "A clock makes time feel real", up: "Strong sense of the day", down: "Drift turns red: “Missed”", tryIt: "Tap “Time passes” 3 times" },
  b: { tab: "B · Queue", bet: "A finish time, no slots to miss", up: "The calmest draft", down: "Meetings lose their fixed time", tryIt: "Start the timer, then Not now" },
  c: { tab: "C · Anchors", bet: "Auto-reflow around fixed events", up: "The most forgiving", down: "Tasks moving alone feels out of control", tryIt: "Tap “Time passes” and watch tasks slide" },
} as const

function Drafts() {
  const [k, setK] = useState<keyof typeof DRAFTS>("a")
  const d = DRAFTS[k]
  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Drafts" className="flex flex-wrap gap-1.5">
        {(Object.keys(DRAFTS) as (keyof typeof DRAFTS)[]).map((key) => (
          <button key={key} role="tab" aria-selected={k === key} type="button" onClick={() => setK(key)} className={cn("rounded-full border px-3.5 py-2 text-xs transition-colors", k === key ? "border-foreground bg-foreground text-background" : "border-border/70 text-foreground/70 hover:border-foreground/40")}>
            {DRAFTS[key].tab}
          </button>
        ))}
      </div>
      <div className="grid items-center gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
        <Phone key={k} v={k} label={`Interactive prototype, draft ${k.toUpperCase()}`} className="md:max-w-[280px]" />
        <div className="space-y-3">
          {(
            [
              [Lightbulb, "Bet", d.bet, INK_BG],
              [ThumbsUp, "Worked", d.up, "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"],
              [ThumbsDown, "Broke", d.down, "bg-red-500/10 text-red-700 dark:text-red-300"],
              [Hand, "Try", d.tryIt, "bg-foreground/[0.06] text-foreground/70"],
            ] as const
          ).map(([Icon, t, body, tone]) => (
            <div key={t} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3.5">
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", tone)}>
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="cs-eyebrow">{t}</p>
                <p className="text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SOURCES: [string, string][] = [
  ["Grinblat & Rosenblum (2025), Organization in Time, Executive Functions, and Quality of Life in Adult ADHD. Summary: Simply Psychology", "https://www.simplypsychology.org/how-time-management-struggles-impact-adult-adhd-happiness.html"],
  ["SingularityApp: ADHD and planning", "https://singularity-app.com/blog/adhd-and-planning/"],
  ["Simply Psychology: Future blindness and Barkley's model", "https://www.simplypsychology.org/adhd-future-blindness.html"],
  ["Tiimo: Why productivity systems fail ADHD", "https://www.tiimoapp.com/resource-hub/why-productivity-systems-fail-adhd"],
  ["Templacity: Why planners die after a bad week", "https://templacity.com/?p=10942"],
  ["Life Skills Advocate: Interest-based nervous system", "https://lifeskillsadvocate.com/blog/interest-based-nervous-system/"],
  ["Fastreat community: Why planners don't stick", "https://www.fastreat.com/community/posts/planners-routines-dont-stick-adhd"],
  ["Inflow: Alternatives to Tiimo", "https://www.getinflow.io/post/best-alternatives-tiimo-adhd"],
  ["Habi: Tiimo alternatives", "https://habi.app/insights/tiimo-alternatives/"],
  ["Cool Curation: Structured app review", "https://coolcuration.com/structured-app-review-uk"],
  ["Google Play: Llama Life reviews", "https://play.google.com/store/apps/details?id=com.llamaapp"],
  ["NeuroLaunch: Tiimo and alternatives", "https://neurolaunch.com/tiimo-app-adhd/"],
]

const lead = "max-w-[60ch] text-base text-foreground/75"

export function AdhdPlannerCaseStudy() {
  return (
    <div className="space-y-24">
      <CaseHero
        slug="adhd-planner"
        title="Designing a Day Planner for ADHD Brains"
        roles={["Product designer, solo"]}
        tagline="Turn a messy brain dump into a planned, reminded day. One sentence instead of six decisions."
        when="Concept sprint, Nov 2026"
        forWhom="Adults with ADHD who drop small tasks"
        summary="Research, a 6-app audit, 4 working prototypes. Usability testing next."
      />

      <Section eyebrow="Try it" title="Interactive prototype: final direction (A+)">
        <div className="grid items-center gap-8 md:grid-cols-[300px_minmax(0,1fr)]">
          <Phone v="final" label="Interactive prototype, final A+ direction" className="md:max-w-[300px]" />
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-sm text-foreground/70">
              <Hand className="h-4 w-4" style={{ color: INK }} aria-hidden /> Tap &ldquo;Try a sample dump,&rdquo; or type:
            </p>
            <p className={cn("inline-block rounded-xl px-3 py-2 text-sm font-medium", INK_BG)}>laundry tonight, email prof at 3, renew passport sometime</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="01 · The problem" title="Most people with ADHD stop using their planner within 3 months">
        <p className={lead}>I kept losing laundry, texts and emails. Not because I forgot they mattered, but because saving them took too many steps.</p>
        <div className="grid items-stretch gap-3 md:grid-cols-2">
          <DecisionChain />
          <ProblemStats />
        </div>
      </Section>

      <Section eyebrow="02 · Research" title="What ADHD research says about planning">
        <ResearchJourney />
      </Section>

      <Section eyebrow="03 · Competitive landscape" title="6 planners audited across 4 layout models">
        <CompetitorGrid />
      </Section>

      <Section eyebrow="04 · Opportunity" title="The gap: every planner assumes tasks get entered properly">
        <div className="grid items-stretch gap-3 md:grid-cols-2">
          <div className="flex flex-col justify-center rounded-3xl p-6 text-white" style={{ background: INK }}>
            <p className="text-xl leading-snug font-medium text-balance">Everyone designs how the day looks. Nobody designs how tasks get in.</p>
          </div>
          <EffortMap />
        </div>
        <HowMightWe />
      </Section>

      <Section eyebrow="05 · Hypotheses" title="6 hypotheses to test">
        <HypothesisMap />
      </Section>

      <Section eyebrow="06 · Explorations" title="3 layout prototypes: clock, queue, and anchors">
        <Drafts />
        <DraftMerge />
      </Section>

      <Section eyebrow="07 · Final direction" title="A+: clock timeline with brain-dump capture">
        <CapturePipeline />
        <div className="grid items-start gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
          <Phone v="final" label="Interactive prototype, final A+ direction" className="md:sticky md:top-28 md:max-w-[280px]" />
          <FinalDecisions />
        </div>
      </Section>

      <Section eyebrow="08 · Test plan" title="Usability test plan">
        <TestPlan />
      </Section>

      <Section eyebrow="09 · Limits and next steps" title="Prototype limits and next steps">
        <NextSteps />
      </Section>

      <section className="space-y-3">
        <p className="cs-eyebrow">Sources</p>
        <ol className="list-decimal space-y-1.5 pl-5 text-xs text-foreground/60">
          {SOURCES.map(([t, href], i) => (
            <li key={href} id={`src-${i + 1}`} className="scroll-mt-28">
              <a href={href} target="_blank" rel="noreferrer" className="underline decoration-foreground/20 underline-offset-4 hover:text-foreground">
                {t}
              </a>
            </li>
          ))}
        </ol>
        <p className="cs-caption pt-2">All prototype data is sample data.</p>
      </section>
    </div>
  )
}
