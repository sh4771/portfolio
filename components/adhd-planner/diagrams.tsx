"use client"

import type { LucideIcon } from "lucide-react"
import {
  Bell,
  BellRing,
  Calendar,
  CalendarClock,
  CheckCheck,
  Clock,
  CloudRain,
  Eye,
  Feather,
  FlaskConical,
  Gauge,
  ListPlus,
  MessageSquareText,
  PanelBottom,
  PenLine,
  Settings2,
  Smartphone,
  SquareDashed,
  Sunrise,
  ThumbsDown,
  ThumbsUp,
  Timer,
  TriangleAlert,
  Type,
  Users,
  X,
} from "lucide-react"
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

const card = "rounded-2xl border border-border/60 bg-card"

function IconDot({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "md" | "lg" }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-xl", INK_BG, size === "lg" ? "h-11 w-11" : "h-8 w-8")}>
      <Icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} aria-hidden />
    </span>
  )
}

/* ---------- 01 Problem ---------- */

const CHAIN: [LucideIcon, string][] = [
  [Smartphone, "Open"],
  [Type, "Title"],
  [Calendar, "Date"],
  [Clock, "Time"],
  [Timer, "Length"],
  [Bell, "Alert"],
]

/** Six steps to save a reminder, fading out where the task gets dropped, against one sentence. */
export function DecisionChain() {
  return (
    <div className={cn(card, "space-y-5 p-5")}>
      <div className="space-y-3">
        <p className="cs-eyebrow">Most apps · 6 decisions</p>
        <ol className="grid grid-cols-6 gap-1.5">
          {CHAIN.map(([Icon, label], i) => (
            <li key={label} className="flex flex-col items-center gap-1.5" style={{ opacity: i < 3 ? 1 : 0.25 + (5 - i) * 0.08 }}>
              <span className={cn("grid h-10 w-10 place-items-center rounded-xl border", i < 3 ? "border-border/70" : "border-dashed border-foreground/30")}>
                <Icon className="h-4 w-4 text-foreground/70" aria-hidden />
              </span>
              <span className="text-[11px] text-foreground/60">{label}</span>
            </li>
          ))}
        </ol>
        <p className="flex items-center gap-1.5 text-xs text-red-700 dark:text-red-300">
          <TriangleAlert className="h-3.5 w-3.5" aria-hidden /> Task dropped here
        </p>
      </div>
      <div className="space-y-2 border-t border-border/60 pt-4">
        <p className="cs-eyebrow">This planner · 1 sentence</p>
        <p className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-white" style={{ background: INK }}>
          <MessageSquareText className="h-3.5 w-3.5 shrink-0" aria-hidden /> laundry tonight, email prof at 3
        </p>
      </div>
    </div>
  )
}

export function ProblemStats() {
  const stats: [string, React.ReactNode][] = [
    ["16.7%", <>still use their planner after 3 months<Ref n={2} /></>],
    ["6", "decisions to save one reminder"],
    ["10.8%", <>of the variation in ADHD quality of life explained by time management<Ref n={1} /></>],
  ]
  return (
    <div className="grid gap-3">
      {stats.map(([n, t]) => (
        <div key={n} className={cn(card, "flex items-center gap-4 p-4")}>
          <span className="w-20 shrink-0 text-3xl font-semibold tracking-tight tabular-nums" style={{ color: INK }}>
            {n}
          </span>
          <p className="text-sm text-foreground/70">{t}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Four moments: research and hypotheses ---------- */

const STAGES: { name: string; icon: LucideIcon }[] = [
  { name: "Capture", icon: PenLine },
  { name: "Plan", icon: CalendarClock },
  { name: "Remember", icon: BellRing },
  { name: "Recover", icon: Sunrise },
]

function StageRow({ children }: { children: (i: number) => React.ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {STAGES.map((s, i) => (
        <div key={s.name} className={cn(card, "relative flex flex-col gap-3 p-4")}>
          <div className="flex items-center gap-2.5">
            <IconDot icon={s.icon} size="lg" />
            <span className="text-sm font-semibold">{s.name}</span>
          </div>
          {children(i)}
          {i < STAGES.length - 1 && (
            <span aria-hidden className="absolute top-7 -right-[11px] z-10 hidden h-5 w-5 place-items-center rounded-full border border-border/60 bg-background text-[11px] text-foreground/50 md:grid">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

const RESEARCH: { breaks: React.ReactNode; rules: string[] }[] = [
  { breaks: <>Setup kills momentum<Ref n={6} /></>, rules: ["Zero setup", "One input"] },
  { breaks: <>Time feels unreal<Ref n={3} /></>, rules: ["Time as visible space"] },
  { breaks: <>Closed app, forgotten task<Ref n={4} /></>, rules: ["Reminders on by default"] },
  { breaks: <>Overdue pile, then shame<Ref n={5} /><Ref n={1} /></>, rules: ["Nothing goes overdue", "No red, no streaks"] },
]

export function ResearchJourney() {
  return (
    <StageRow>
      {(i) => (
        <>
          <p className="flex items-start gap-1.5 text-xs text-red-700 dark:text-red-300">
            <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{RESEARCH[i].breaks}</span>
          </p>
          <div className="mt-auto flex flex-col gap-1.5">
            {RESEARCH[i].rules.map((r) => (
              <span key={r} className={cn("flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium", INK_BG)}>
                <CheckCheck className="h-3.5 w-3.5 shrink-0" aria-hidden /> {r}
              </span>
            ))}
          </div>
        </>
      )}
    </StageRow>
  )
}

const HYPS: { tag: string; bet: string; measure: string }[][] = [
  [{ tag: "H1", bet: "One sentence captures more", measure: "Tasks per day" }],
  [
    { tag: "H2", bet: "Approve beats auto-schedule", measure: "Acceptance rate" },
    { tag: "H4", bet: "Clock beats queue", measure: "Version ranking" },
  ],
  [
    { tag: "H3", bet: "Default reminders, fewer misses", measure: "Same-day completion" },
    { tag: "H6", bet: "Adding step two helps", measure: "Removal rate" },
  ],
  [{ tag: "H5", bet: "Tomorrow, not overdue, brings people back", measure: "Next-day return" }],
]

export function HypothesisMap() {
  return (
    <StageRow>
      {(i) => (
        <div className="flex flex-1 flex-col gap-2">
          {HYPS[i].map((h) => (
            <div key={h.tag} className="space-y-1.5 rounded-xl border border-border/60 bg-background p-3">
              <p className="text-xs font-medium">
                <span className="mr-1.5 font-semibold" style={{ color: INK }}>
                  {h.tag}
                </span>
                {h.bet}
              </p>
              <p className="flex items-center gap-1 text-[11px] text-foreground/50">
                <Gauge className="h-3 w-3" aria-hidden /> {h.measure}
              </p>
            </div>
          ))}
        </div>
      )}
    </StageRow>
  )
}

/* ---------- 03 Competitors ---------- */

/** Tiny drawings of each product's layout model. */
function LayoutGlyph({ kind }: { kind: "blocks" | "line" | "queue" | "columns" | "paper" | "nested" }) {
  const bar = "rounded-sm bg-foreground/25"
  return (
    <div aria-hidden className="h-12 w-12 shrink-0 rounded-lg border border-border/70 bg-background p-1.5">
      {kind === "blocks" && (
        <div className="flex h-full flex-col gap-1">
          <span className={cn(bar, "h-2.5 w-full")} style={{ background: INK, opacity: 0.6 }} />
          <span className={cn(bar, "h-1.5 w-3/4")} />
          <span className={cn(bar, "h-3 w-full")} />
        </div>
      )}
      {kind === "line" && (
        <div className="flex h-full gap-1">
          <span className="w-0.5 bg-foreground/40" />
          <div className="flex flex-1 flex-col justify-between">
            <span className={cn(bar, "h-1.5")} />
            <span className={cn(bar, "h-1.5 w-2/3")} />
            <span className={cn(bar, "h-1.5")} />
          </div>
        </div>
      )}
      {kind === "queue" && (
        <div className="flex h-full flex-col gap-1">
          <span className="h-3.5 rounded-sm" style={{ background: INK, opacity: 0.6 }} />
          <span className={cn(bar, "h-1.5")} />
          <span className={cn(bar, "h-1.5")} />
        </div>
      )}
      {kind === "columns" && (
        <div className="grid h-full grid-cols-3 gap-0.5">
          {[0, 1, 2].map((c) => (
            <span key={c} className="flex flex-col gap-0.5">
              <span className={cn(bar, "h-2")} />
              <span className={cn(bar, "h-1.5")} />
            </span>
          ))}
        </div>
      )}
      {kind === "paper" && (
        <div className="flex h-full flex-col justify-between">
          {[0, 1, 2, 3, 4].map((r) => (
            <span key={r} className="h-px bg-foreground/30" />
          ))}
        </div>
      )}
      {kind === "nested" && (
        <div className="flex h-full flex-col gap-1">
          <span className={cn(bar, "h-1.5")} />
          <span className={cn(bar, "ml-2 h-1.5")} />
          <span className={cn(bar, "ml-2 h-1.5")} />
          <span className={cn(bar, "ml-4 h-1.5")} />
        </div>
      )}
    </div>
  )
}

const COMPETITORS: { name: string; glyph: Parameters<typeof LayoutGlyph>[0]["kind"]; model: string; up: React.ReactNode; down: React.ReactNode }[] = [
  { name: "Tiimo", glyph: "blocks", model: "Clock blocks", up: <>Visual timeline<Ref n={8} /></>, down: <>Heavy setup<Ref n={8} /></> },
  { name: "Structured", glyph: "line", model: "Clock line", up: <>Gaps as space<Ref n={10} /></>, down: <>Replan is paid<Ref n={10} /></> },
  { name: "Llama Life", glyph: "queue", model: "Queue + timer", up: <>Finish time<Ref n={11} /></>, down: <>No fixed times<Ref n={11} /></> },
  { name: "Sunsama", glyph: "columns", model: "Day columns", up: "Calm ritual", down: <>Ritual hard to keep<Ref n={12} /></> },
  { name: "Clever Fox", glyph: "paper", model: "Paper rows", up: "Fewer decisions", down: "Can't remind you" },
  { name: "Goblin Tools", glyph: "nested", model: "AI breakdown", up: "Instant breakdown", down: "Not a planner" },
]

export function CompetitorGrid() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COMPETITORS.map((c) => (
          <div key={c.name} className={cn(card, "flex gap-3 p-4")}>
            <LayoutGlyph kind={c.glyph} />
            <div className="min-w-0 space-y-1.5">
              <p className="text-sm font-semibold">
                {c.name} <span className="font-normal text-foreground/45">· {c.model}</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300">
                <ThumbsUp className="h-3.5 w-3.5 shrink-0" aria-hidden /> <span>{c.up}</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-red-700 dark:text-red-300">
                <ThumbsDown className="h-3.5 w-3.5 shrink-0" aria-hidden /> <span>{c.down}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {(
          [
            [Eye, "Users stay for", "visible time"],
            [Settings2, "Users leave over", "setup"],
            [CloudRain, "Users leave over", "bad days"],
          ] as const
        ).map(([Icon, a, b]) => (
          <div key={b} className={cn(card, "flex items-center gap-3 p-4")}>
            <IconDot icon={Icon} />
            <p className="text-sm text-foreground/60">
              {a} <span className="font-semibold text-foreground">{b}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- 04 Opportunity ---------- */

export function EffortMap() {
  return (
    <div className={cn(card, "grid grid-cols-2 gap-3 p-5")}>
      <div className="space-y-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60">
          <Eye className="h-3.5 w-3.5" aria-hidden /> How the day looks
        </p>
        {COMPETITORS.map((c) => (
          <span key={c.name} className="block rounded-lg border border-border/70 px-2.5 py-1.5 text-xs text-foreground/75">
            {c.name}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60">
          <PenLine className="h-3.5 w-3.5" aria-hidden /> How tasks get in
        </p>
        <span className="grid flex-1 place-items-center rounded-lg border border-dashed border-foreground/25 text-xs text-foreground/40">empty</span>
        <span className="block rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white" style={{ background: INK }}>
          This planner
        </span>
      </div>
    </div>
  )
}

export function HowMightWe() {
  const items: [LucideIcon, string][] = [
    [MessageSquareText, "Capture in one sentence"],
    [CheckCheck, "App suggests, you approve"],
    [Sunrise, "Bad days bend, never turn red"],
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map(([Icon, t]) => (
        <div key={t} className={cn(card, "flex items-center gap-3 p-4")}>
          <IconDot icon={Icon} size="lg" />
          <p className="text-sm font-medium leading-snug">{t}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- 06 Drafts ---------- */

const MERGE = [
  { d: "A · Clock", kept: ["Clock frame"], dropped: ["Missed warnings"] },
  { d: "B · Queue", kept: ["Quick add", "Finish time"], dropped: ["No clock"] },
  { d: "C · Anchors", kept: ["No overdue", "Fresh start"], dropped: ["Auto-moving tasks"] },
]

export function DraftMerge() {
  return (
    <div className={cn(card, "space-y-3 p-5")}>
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
      <div aria-hidden className="grid grid-cols-3 text-center text-foreground/30">
        <span>↓</span>
        <span>↓</span>
        <span>↓</span>
      </div>
      <div className="rounded-xl p-3 text-center text-sm font-semibold text-white" style={{ background: INK }}>
        A+
      </div>
    </div>
  )
}

/* ---------- 07 Final ---------- */

const PARSE = [
  { said: "tonight", becomes: "After 6pm" },
  { said: "at 3", becomes: "3:00 pinned" },
  { said: "sometime", becomes: "Tomorrow" },
]

export function CapturePipeline() {
  const step = cn(card, "flex flex-col gap-2.5 p-4")
  const label = (n: number, t: string) => (
    <p className="cs-eyebrow">
      {n} · {t}
    </p>
  )
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      <div className={step}>
        {label(1, "Type")}
        <p className="self-start rounded-2xl rounded-br-sm px-3 py-2 text-xs text-white" style={{ background: INK }}>
          laundry tonight, email prof at 3, renew passport sometime
        </p>
      </div>
      <div className={step}>
        {label(2, "Words → time")}
        <ul className="space-y-1.5">
          {PARSE.map((p) => (
            <li key={p.said} className="flex items-center gap-1.5 text-xs">
              <span className="rounded-md border border-border/70 px-1.5 py-1 text-foreground/75">{p.said}</span>
              <span aria-hidden className="text-foreground/35">→</span>
              <span className={cn("rounded-md px-1.5 py-1 font-medium", INK_BG)}>{p.becomes}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5 text-xs">
            <span className="flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-1 font-medium text-emerald-800 dark:text-emerald-300">
              <ListPlus className="h-3 w-3" aria-hidden /> Move to dryer
            </span>
            <span className="text-foreground/50">+45m</span>
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
      </div>
      <div className={step}>
        {label(4, "Approved")}
        {["Laundry", "Email prof"].map((t) => (
          <div key={t} className="flex items-center justify-between rounded-lg border border-border/70 bg-background px-2.5 py-2 text-xs">
            {t}
            <Bell className="h-3 w-3 text-foreground/60" aria-label="Reminder on" />
          </div>
        ))}
      </div>
    </div>
  )
}

const FINAL: [LucideIcon, string, string][] = [
  [PanelBottom, "Chat under the timeline", "H2"],
  [Type, "Text is the only field", "H1"],
  [Clock, "Words become time windows", "H1"],
  [SquareDashed, "Dashed until approved", "H2"],
  [Bell, "Reminders on by default", "H3"],
  [ListPlus, "Adds the step you forget", "H6"],
  [Sunrise, "Overflow rests in Tomorrow", "H5"],
  [Feather, "Calm: no streaks, no confetti", "H5"],
]

export function FinalDecisions() {
  return (
    <ol className="grid grid-cols-2 gap-2.5">
      {FINAL.map(([Icon, t, h]) => (
        <li key={t} className={cn(card, "flex flex-col gap-2.5 p-3.5")}>
          <div className="flex items-start justify-between">
            <IconDot icon={Icon} />
            <span className="text-[11px] font-semibold" style={{ color: INK }}>
              {h}
            </span>
          </div>
          <p className="text-sm font-medium leading-snug">{t}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------- 08 Test plan ---------- */

const ORDERS = [
  ["A", "B", "C", "A+"],
  ["B", "C", "A+", "A"],
  ["C", "A+", "A", "B"],
  ["A+", "A", "B", "C"],
]

export function TestPlan() {
  const tasks: [LucideIcon, string][] = [
    [PenLine, "Add 5 tasks"],
    [Clock, "Time passes, fix the day"],
    [Calendar, "Find tomorrow"],
    [CheckCheck, "Rank 4 versions"],
  ]
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className={cn(card, "space-y-4 p-5")}>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" aria-hidden /> 5 to 8 adults with ADHD
            </span>
            <span className="flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5" aria-hidden /> 30 min, remote, think-aloud
            </span>
          </p>
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tasks.map(([Icon, t], i) => (
              <li key={t} className="flex flex-col items-start gap-2 rounded-xl border border-border/60 bg-background p-3">
                <IconDot icon={Icon} />
                <span className="text-xs">
                  <span className="font-semibold" style={{ color: INK }}>
                    {i + 1}.
                  </span>{" "}
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={cn(card, "space-y-2 p-5")}>
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
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["< 30s", "to capture 5 tasks"],
          ["≤ 1", "edit per batch"],
          ["0", "people saying “failed”"],
        ].map(([n, t]) => (
          <div key={n} className={cn(card, "p-4")}>
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

/* ---------- 09 Next ---------- */

export function NextSteps() {
  const items: [LucideIcon, string, string, string][] = [
    [FlaskConical, "Faked for now", "Keyword rules, scripted mic, resets on reload", "bg-amber-500/15 text-amber-800 dark:text-amber-300"],
    [Smartphone, "Next", "Capture from the lock screen and Siri", "bg-sky-500/15 text-sky-700 dark:text-sky-300"],
    [MessageSquareText, "Next", "Onboarding is the first brain dump", "bg-sky-500/15 text-sky-700 dark:text-sky-300"],
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map(([Icon, tag, t, tone]) => (
        <div key={t} className={cn(card, "flex items-start gap-3 p-4")}>
          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", tone)}>
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="cs-eyebrow mb-1">{tag}</p>
            <p className="text-sm">{t}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
