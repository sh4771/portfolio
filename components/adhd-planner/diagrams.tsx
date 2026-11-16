"use client"

import { Bell, X } from "lucide-react"
import { cn } from "@/lib/utils"

export const INK = "#4B47C9"
export const INK_BG = "bg-[#ECEAF9] text-[#3A3591] dark:bg-[#4B47C9]/25 dark:text-[#c9c6ff]"

export function Ref({ n }: { n: number }) {
  return (
    <a href={`#src-${n}`} className="ml-0.5 align-super text-[10px] font-semibold text-foreground/45 no-underline hover:text-foreground">
      [{n}]
    </a>
  )
}

const STAGES = ["Capture", "Plan", "Remember", "Recover"] as const
type Stage = (typeof STAGES)[number]

function StageHead({ i, name }: { i: number; name: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ background: INK }}>
        {i + 1}
      </span>
      <span className="text-sm font-semibold">{name}</span>
    </div>
  )
}

/** Four columns that read left to right as one day with a planner, with arrows between them. */
function StageRow({ children }: { children: (s: Stage, i: number) => React.ReactNode }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {STAGES.map((s, i) => (
        <div key={s} className="relative flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4">
          <StageHead i={i} name={s} />
          {children(s, i)}
          {i < STAGES.length - 1 && (
            <span aria-hidden className="absolute top-5 -right-[11px] z-10 hidden h-5 w-5 place-items-center rounded-full border border-border/60 bg-background text-[11px] text-foreground/50 md:grid">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

const RESEARCH: Record<Stage, { breaks: string; insights: { t: string; ref: number }[]; rules: string[] }> = {
  Capture: { breaks: "Six decisions before a task is saved", insights: [{ t: "Novelty starts, friction stops", ref: 6 }, { t: "One place, few steps", ref: 7 }], rules: ["Zero setup on day one", "One input for everything"] },
  Plan: { breaks: "A deadline feels unreal until it's hours away", insights: [{ t: "Time is invisible", ref: 3 }], rules: ["Show time as space you can see"] },
  Remember: { breaks: "The planner only helps if you open it", insights: [{ t: "A closed planner is a forgotten planner", ref: 4 }], rules: ["Reminders on by default"] },
  Recover: { breaks: "Overdue tasks pile up, and people quit", insights: [{ t: "The undone list is where systems die", ref: 5 }, { t: "Shame is part of the problem", ref: 1 }], rules: ["Nothing goes overdue", "No red walls, no broken streaks"] },
}

/** Research mapped onto the four moments where a planner can lose someone. */
export function ResearchJourney() {
  return (
    <div className="space-y-3">
      <StageRow>
        {(s) => {
          const r = RESEARCH[s]
          return (
            <>
              <p className="rounded-lg bg-red-500/10 px-2.5 py-2 text-xs text-red-800 dark:text-red-300">Breaks: {r.breaks}</p>
              <ul className="flex-1 space-y-1.5">
                {r.insights.map((x) => (
                  <li key={x.t} className="text-xs text-foreground/75">
                    {x.t}
                    <Ref n={x.ref} />
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1.5">
                {r.rules.map((rule) => (
                  <span key={rule} className={cn("rounded-lg px-2.5 py-1.5 text-xs font-medium", INK_BG)}>
                    Rule: {rule}
                  </span>
                ))}
              </div>
            </>
          )
        }}
      </StageRow>
      <p className="cs-caption">Sources: clinical research, ADHD coaching literature and community writing.</p>
    </div>
  )
}

const HYPS: Record<Stage, { tag: string; bet: string; measure: string }[]> = {
  Capture: [{ tag: "H1", bet: "Plain-language dumps capture more of what's in your head", measure: "Tasks per day, seconds per task" }],
  Plan: [
    { tag: "H2", bet: "Approving dashed proposals earns more trust than silent scheduling", measure: "Batch acceptance, edits per batch" },
    { tag: "H4", bet: "A clock beats a queue, if drift doesn't punish", measure: "Ranking of A, B, C, A+" },
  ],
  Remember: [
    { tag: "H3", bet: "Default reminders mean fewer forgotten tasks", measure: "Same-day completion rate" },
    { tag: "H6", bet: "Adding the forgotten second step feels helpful", measure: "Removal rate of added steps" },
  ],
  Recover: [{ tag: "H5", bet: "Tomorrow instead of overdue brings people back", measure: "Next-day return after a bad day" }],
}

/** The same four moments, with the bet I'm making at each one. */
export function HypothesisMap() {
  return (
    <StageRow>
      {(s) => (
        <div className="flex flex-1 flex-col gap-2">
          {HYPS[s].map((h) => (
            <div key={h.tag} className="flex-1 space-y-1.5 rounded-xl border border-border/60 bg-background p-3">
              <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", INK_BG)}>{h.tag}</span>
              <p className="text-xs text-foreground/80">{h.bet}</p>
              <p className="text-[11px] text-foreground/50">Measure: {h.measure}</p>
            </div>
          ))}
        </div>
      )}
    </StageRow>
  )
}

const MERGE = [
  { d: "A · Clock", kept: ["Clock as the frame"], dropped: ["Missed and Overlaps warnings"] },
  { d: "B · Queue", kept: ["One-line quick add", "Finish-time idea"], dropped: ["Clock-free list"] },
  { d: "C · Anchors", kept: ["Nothing goes overdue", "Fresh-start tone"], dropped: ["Tasks moving on their own"] },
]

/** What each draft gave to the final direction, and what it didn't. */
export function DraftMerge() {
  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-card p-5">
      <p className="cs-eyebrow">What made it into A+</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {MERGE.map((m) => (
          <div key={m.d} className="space-y-2 rounded-xl border border-border/60 bg-background p-3">
            <p className="text-sm font-semibold">{m.d}</p>
            <div className="flex flex-wrap gap-1.5">
              {m.kept.map((k) => (
                <span key={k} className={cn("rounded-md px-2 py-1 text-xs", INK_BG)}>
                  {k}
                </span>
              ))}
              {m.dropped.map((k) => (
                <span key={k} className="rounded-md border border-dashed border-foreground/25 px-2 py-1 text-xs text-foreground/45 line-through decoration-foreground/30">
                  {k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden className="flex justify-around text-foreground/30">
        <span>↓</span>
        <span>↓</span>
        <span>↓</span>
      </div>
      <div className="rounded-xl p-3 text-center text-sm font-semibold text-white" style={{ background: INK }}>
        A+ · Clock timeline with brain-dump capture
      </div>
    </div>
  )
}

const PARSE = [
  { said: "laundry tonight", becomes: "After 6pm · 40 min" },
  { said: "email prof at 3", becomes: "3:00, pinned" },
  { said: "renew passport sometime", becomes: "Tomorrow" },
]

/** One sentence in, an approved and reminded day out. */
export function CapturePipeline() {
  const step = "flex flex-col gap-2.5 rounded-2xl border border-border/60 bg-card p-4"
  const label = (n: number, t: string) => (
    <p className="cs-eyebrow">
      {n} · {t}
    </p>
  )
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_1.3fr_1fr_1fr]">
      <div className={step}>
        {label(1, "You type")}
        <p className="self-start rounded-2xl rounded-br-sm px-3 py-2 text-xs text-white" style={{ background: INK }}>
          laundry tonight, email prof at 3, renew passport sometime
        </p>
        <p className="text-[11px] text-foreground/50">Text is the only required field.</p>
      </div>
      <div className={step}>
        {label(2, "Words become windows")}
        <ul className="space-y-1.5">
          {PARSE.map((p) => (
            <li key={p.said} className="flex items-center gap-1.5 text-xs">
              <span className="truncate rounded-md border border-border/70 px-1.5 py-1 text-foreground/75">{p.said}</span>
              <span aria-hidden className="text-foreground/35">→</span>
              <span className={cn("shrink-0 rounded-md px-1.5 py-1 font-medium", INK_BG)}>{p.becomes}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5 text-xs">
            <span className="rounded-md bg-emerald-500/15 px-1.5 py-1 font-medium text-emerald-800 dark:text-emerald-300">+ Move laundry to dryer</span>
            <span className="text-foreground/50">45 min later</span>
          </li>
        </ul>
      </div>
      <div className={step}>
        {label(3, "Proposed")}
        {["Laundry", "Email prof"].map((t) => (
          <div key={t} className="flex items-center justify-between rounded-lg border border-dashed px-2.5 py-2 text-xs" style={{ borderColor: INK }}>
            {t}
            <span className="flex items-center gap-1.5">
              <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", INK_BG)}>New</span>
              <X className="h-3 w-3 text-foreground/50" aria-hidden />
            </span>
          </div>
        ))}
        <p className="text-[11px] text-foreground/50">Nothing is saved yet.</p>
      </div>
      <div className={step}>
        {label(4, "Looks good")}
        {["Laundry", "Email prof"].map((t) => (
          <div key={t} className="flex items-center justify-between rounded-lg border border-border/70 bg-background px-2.5 py-2 text-xs">
            {t}
            <Bell className="h-3 w-3 text-foreground/60" aria-label="Reminder on" />
          </div>
        ))}
        <p className="text-[11px] text-foreground/50">Reminders come on with approval.</p>
      </div>
    </div>
  )
}

const ORDERS = [
  ["A", "B", "C", "A+"],
  ["B", "C", "A+", "A"],
  ["C", "A+", "A", "B"],
  ["A+", "A", "B", "C"],
]

/** The session at a glance: who, what they do, the rotated order, and the bar for success. */
export function TestPlan() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="cs-eyebrow">One 30-minute session</p>
            <p className="text-xs text-foreground/50">5 to 8 adults with ADHD · remote · think-aloud</p>
          </div>
          <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {["Add 5 things on your mind", "Time passes ×3, fix your day", "Find tomorrow", "Rank the 4 versions"].map((t, i) => (
              <li key={t} className="rounded-lg border border-border/60 bg-background p-2.5 text-xs">
                <span className="mb-1 block text-[11px] font-semibold" style={{ color: INK }}>
                  Task {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-2 rounded-2xl border border-border/60 bg-card p-5">
          <p className="cs-eyebrow">Rotated order</p>
          <div className="grid grid-cols-[auto_repeat(4,1fr)] gap-1 text-center text-[11px]">
            {ORDERS.map((row, r) => (
              <div key={r} className="contents">
                <span className="pr-1 text-left text-foreground/45">P{r + 1}</span>
                {row.map((v) => (
                  <span key={v} className={cn("rounded py-1 font-semibold", v === "A+" ? "text-white" : "bg-foreground/[0.06] text-foreground/70")} style={v === "A+" ? { background: INK } : undefined}>
                    {v}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-foreground/45">So no version always goes first.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["< 30s", "to capture five tasks in A+"],
          ["≤ 1", "edit on most approved batches"],
          ["0", "people calling a slipped day “failed” or “behind”"],
        ].map(([n, t]) => (
          <div key={n} className="rounded-2xl border border-border/60 bg-card p-4">
            <p className="cs-eyebrow mb-1">Success looks like</p>
            <p className="text-3xl font-semibold tracking-tight tabular-nums" style={{ color: INK }}>
              {n}
            </p>
            <p className="text-sm text-foreground/70">{t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
