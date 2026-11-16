"use client"

import { useState } from "react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Database,
  EyeOff,
  FileText,
  Hammer,
  LayoutDashboard,
  Layers,
  ListChecks,
  MessageSquareQuote,
  PenTool,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Square,
  Timer,
  Users,
  Wand2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CaseHero } from "@/components/case-hero"
import { Section } from "@/components/vendelux/kit"

/* Altrovia's own tokens, from the product */
const TEAL = "#3D6469"
const TINT = "bg-[#3D6469]/12 text-[#2c4a4e] dark:bg-[#3D6469]/30 dark:text-[#bfd8da]"
const card = "rounded-2xl border border-border/60 bg-card"

function IconDot({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "md" | "lg" }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-xl", TINT, size === "lg" ? "h-11 w-11" : "h-8 w-8")}>
      <Icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} aria-hidden />
    </span>
  )
}

function Shot({ src, alt, w, h, caption }: { src: string; alt: string; w: number; h: number; caption?: string }) {
  return (
    <figure className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-white">
        <Image src={src} alt={alt} width={w} height={h} className="h-auto w-full" sizes="(min-width: 900px) 800px, 100vw" />
      </div>
      {caption && <figcaption className="cs-caption">{caption}</figcaption>}
    </figure>
  )
}

/* ---------- Revisiting ---------- */

const NEXT: [LucideIcon, string, string][] = [
  [Ruler, "Design consistency", "A full grid audit across every screen"],
  [Users, "User testing", "Sessions with trial ops on AI trust patterns"],
  [LayoutDashboard, "Dashboard visuals", "Active trials and status, beyond tables"],
  [FileText, "Landing page", "A stronger clinical value story"],
]

function Revisiting() {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col justify-between gap-6 rounded-3xl p-6 text-white" style={{ background: TEAL }}>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase">
          <RefreshCw className="h-3 w-3" aria-hidden /> Revisiting
        </span>
        <p className="text-lg leading-snug font-medium text-balance">We built Altrovia in 10 hours. I&rsquo;m coming back to finish what the sprint couldn&rsquo;t.</p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {NEXT.map(([Icon, t, b]) => (
          <div key={t} className={cn(card, "flex items-start gap-3 p-4")}>
            <IconDot icon={Icon} />
            <div>
              <p className="text-sm font-semibold">{t}</p>
              <p className="text-xs text-foreground/60">{b}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- 01 Problem ---------- */

function AmendmentCost() {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_1.3fr]">
      <div className={cn(card, "flex flex-col justify-between gap-4 p-5")}>
        <p className="cs-eyebrow">Trials that need amendments</p>
        <div className="grid grid-cols-10 gap-1" aria-label="75 of 100 trials">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="aspect-square rounded-[3px]" style={{ background: i < 30 ? TEAL : "var(--border)" }} />
          ))}
        </div>
        <p className="text-sm text-foreground/70">
          <b className="text-2xl font-semibold tracking-tight" style={{ color: TEAL }}>
            75%
          </b>{" "}
          of trials
        </p>
      </div>
      <div className={cn(card, "flex flex-col justify-between gap-4 p-5")}>
        <p className="cs-eyebrow">Average amendment cost per trial</p>
        <div className="space-y-2">
          <div className="flex h-10 overflow-hidden rounded-lg text-xs font-semibold text-white">
            <span className="flex items-center px-3" style={{ width: `${(20 / 43) * 100}%`, background: TEAL }}>
              $20M preventable
            </span>
            <span className="flex flex-1 items-center bg-foreground/25 px-3 text-foreground/80">$23M</span>
          </div>
          <div className="flex justify-between text-[11px] text-foreground/50">
            <span>$0</span>
            <span>$43M</span>
          </div>
        </div>
        <p className="text-sm text-foreground/70">Nearly half of it, if caught early.</p>
      </div>
    </div>
  )
}

const CAUSES: [LucideIcon, string, string][] = [
  [BarChart3, "Baselines mislead", "Poor benchmarking inflates risk signals"],
  [Database, "No precedent data", "Nothing to compare cohorts against"],
  [EyeOff, "AI without lineage", "Outputs arrive without source or confidence"],
]

function Causes() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {CAUSES.map(([Icon, t, b]) => (
        <div key={t} className={cn(card, "flex flex-col gap-3 p-4")}>
          <IconDot icon={Icon} size="lg" />
          <p className="text-sm font-semibold">{t}</p>
          <p className="text-xs text-foreground/60">{b}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- 02 Research ---------- */

function ResearchFlow() {
  const steps: [LucideIcon, string, string][] = [
    [Layers, "Competitor scan", "Clinical platforms and product tools"],
    [ListChecks, "Pros and cons chart", "Organized in Adobe Express"],
    [PenTool, "Wireframes", "Built from the top pros"],
  ]
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {steps.map(([Icon, t, b], i) => (
          <div key={t} className="contents">
            <div className={cn(card, "flex items-center gap-3 p-4")}>
              <IconDot icon={Icon} />
              <div>
                <p className="text-sm font-semibold">{t}</p>
                <p className="text-xs text-foreground/60">{b}</p>
              </div>
            </div>
            {i < steps.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-foreground/30 md:block" aria-hidden />}
          </div>
        ))}
      </div>
      <div className={cn(card, "grid gap-4 p-5 md:grid-cols-[auto_1fr] md:items-center")}>
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <EyeOff className="h-4 w-4 text-amber-700 dark:text-amber-300" aria-hidden /> No access to end users
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {["Studied the existing product", "Structured questions to Christos", "Stakeholder input as a proxy"].map((x, i) => (
            <span key={x} className="flex items-center gap-2">
              <span className={cn("rounded-lg px-2.5 py-1.5 font-medium", TINT)}>{x}</span>
              {i < 2 && <ArrowRight className="h-3 w-3 text-foreground/30" aria-hidden />}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- 03 Competitive landscape ---------- */

const REFS = {
  "Clinical platforms": ["Medidata", "Veeva", "Palantir"],
  "Product and dev tools": ["Linear", "Supabase", "Anduril", "Scale.ai", "Cursor", "Vercel", "Primer.ai", "Bunker"],
}

function ReferenceMap() {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
      {Object.entries(REFS).map(([group, names]) => (
        <div key={group} className={cn(card, "space-y-3 p-4")}>
          <p className="cs-eyebrow">
            {group} · {names.length}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {names.map((n) => (
              <span key={n} className="rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs">
                {n}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const QUAD = [
  { side: "pro", t: "Readability and minimalism", who: "", b: "Focused and intentional. AI shown as part of a real workflow, not decoration." },
  { side: "pro", t: "Credibility", who: "Anduril · Primer.ai", b: "Feels strategic and important. Turns large data into decision-ready intelligence." },
  { side: "con", t: "Branding mismatch", who: "Cursor · Vercel", b: "Too developer or marketing in tone for clinical enterprise software." },
  { side: "con", t: "Weak visual systems", who: "", b: "So restrained it reads plain, and leans toward defense rather than health." },
] as const

function ProsCons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {QUAD.map((q) => (
        <div key={q.t} className={cn(card, "space-y-2 p-4")}>
          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", q.side === "pro" ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300" : "bg-red-500/10 text-red-700 dark:text-red-300")}>{q.side === "pro" ? "Borrow" : "Avoid"}</span>
          <p className="text-sm font-semibold">{q.t}</p>
          {q.who ? <p className="text-xs text-foreground/50">{q.who}</p> : null}
          <p className="text-xs text-foreground/70">{q.b}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- 04 Opportunity ---------- */

const MAP: [string, string, string][] = [
  ["No defined target user", "Confidence", "Certainty from dense data, not more widgets"],
  ["Unclear goals per workflow stage", "Right signal, right moment", "Surface what matters now, guide the next action"],
  ["Weak product differentiation", "Clarity over depth", "Decision clarity and trust over feature count"],
  ["Visual system lacked clinical authority", "Clinical structure", "Reads as serious, not consumer"],
]

function ProblemToPrinciple() {
  return (
    <div className={cn(card, "space-y-2 p-4 sm:p-5")}>
      <div className="hidden grid-cols-[1fr_auto_1.3fr] gap-3 px-1 text-[11px] font-semibold tracking-wide text-foreground/50 uppercase sm:grid">
        <span>Problem we found</span>
        <span />
        <span>Principle we set</span>
      </div>
      {MAP.map(([p, t, d]) => (
        <div key={p} className="grid items-center gap-2 rounded-xl border border-border/60 bg-background p-3 sm:grid-cols-[1fr_auto_1.3fr] sm:gap-3">
          <span className="text-sm text-foreground/70">{p}</span>
          <ArrowRight className="hidden h-4 w-4 text-foreground/30 sm:block" aria-hidden />
          <span>
            <span className="block text-sm font-semibold" style={{ color: TEAL }}>
              {t}
            </span>
            <span className="block text-xs text-foreground/60">{d}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

/* ---------- 05 Hypotheses ---------- */

const HYPS: [LucideIcon, string, string, string][] = [
  [Sparkles, "H1", "Showing how each value was generated builds trust", "Principle: surface AI visibly"],
  [ShieldCheck, "H2", "Review and override at every sensitive step keeps teams in control", "Principle: give control"],
  [LayoutDashboard, "H3", "A portfolio overview shows status and risk at a glance", "From Christos, Altrovia AI"],
  [Square, "H4", "Sharper borders and denser layouts read as clinical authority", "From Emily Shen, Palantir"],
]

function Hypotheses() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {HYPS.map(([Icon, tag, bet, from]) => (
        <div key={tag} className={cn(card, "flex items-start gap-3 p-4")}>
          <IconDot icon={Icon} size="lg" />
          <div className="space-y-1">
            <p className="text-sm">
              <span className="mr-1.5 font-semibold" style={{ color: TEAL }}>
                {tag}
              </span>
              {bet}
            </p>
            <p className="text-xs text-foreground/50">{from}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- 06 Explorations ---------- */

const BUILD: [LucideIcon, string, string][] = [
  [PenTool, "Moodboard", "Figma"],
  [LayoutDashboard, "Dashboard", "Figma"],
  [Wand2, "MCP revisions", "Figma MCP"],
  [Hammer, "Prototype", "Cursor"],
  [Sparkles, "AI assist", "AI"],
]

function BuildStrip() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        {BUILD.map(([Icon, t, tool], i) => (
          <div key={t} className="flex min-w-[96px] flex-1 items-center gap-2">
            <div className={cn(card, "flex flex-1 flex-col items-center gap-2 px-2 py-3 text-center")}>
              <IconDot icon={Icon} />
              <p className="text-xs font-semibold">{t}</p>
              <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[10px] text-foreground/60">{tool}</span>
            </div>
            {i < BUILD.length - 1 && <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-foreground/30 sm:block" aria-hidden />}
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-xs text-foreground/60">
        <Timer className="h-3.5 w-3.5" aria-hidden /> Challenge: UI rules drifted across 8 pages under time pressure.
      </p>
    </div>
  )
}

const CRITIQUE = [
  {
    name: "Emily Shen",
    role: "Product designer, Palantir",
    quote: "Rounded corners feel too sales-y. A serious clinical product needs sharper borders for authority.",
    asks: ["Sharper corners", "Analyst-grade density", "Less decoration"],
    img: "/images/clinical-trials-feedback-emily-shen.png",
    w: 372,
    h: 302,
  },
  {
    name: "Christos",
    role: "Altrovia AI",
    quote: "The dashboard should read as a portfolio: clients see status and risk at a glance.",
    asks: ["Active trials first", "Hierarchy beyond tables", "Client-ready overview"],
    img: "/images/clinical-trials-feedback-christos.png",
    w: 473,
    h: 302,
  },
]

function Critique() {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-2">
      {CRITIQUE.map((c) => (
        <figure key={c.name} className={cn(card, "m-0 flex flex-col gap-4 p-5")}>
          <div className="flex items-center gap-3">
            <span className="relative block h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-border/60">
              <Image src={c.img} alt={`Feedback session with ${c.name}`} fill className="object-cover" sizes="64px" />
            </span>
            <div>
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-foreground/55">{c.role}</p>
            </div>
          </div>
          <blockquote className="m-0 flex flex-1 gap-2 text-base leading-snug font-medium text-balance">
            <MessageSquareQuote className="mt-1 h-4 w-4 shrink-0" style={{ color: TEAL }} aria-hidden />
            {c.quote}
          </blockquote>
          <div className="flex flex-wrap gap-1.5">
            {c.asks.map((a) => (
              <span key={a} className={cn("rounded-lg px-2.5 py-1.5 text-xs font-medium", TINT)}>
                {a}
              </span>
            ))}
          </div>
        </figure>
      ))}
    </div>
  )
}

const FIXES: [string, string][] = [
  ["AI trust was invisible", "Extraction badges and source callouts"],
  ["Consumer tone", "Sharper borders after the Palantir critique"],
  ["Hard-to-scan parameters", "Collapsible rows, muted label, dark value"],
  ["Sidebar overlap", "One coordinated pass on footer alignment"],
]

function Fixes() {
  return (
    <div className={cn(card, "divide-y divide-border/60")}>
      {FIXES.map(([before, after]) => (
        <div key={before} className="grid items-center gap-2 p-3.5 sm:grid-cols-[1fr_auto_1.2fr] sm:gap-4">
          <span className="text-sm text-foreground/50 line-through decoration-foreground/25">{before}</span>
          <ArrowRight className="hidden h-4 w-4 text-foreground/30 sm:block" aria-hidden />
          <span className="text-sm font-medium">{after}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------- 07 Final direction: Altrovia's design system, live ---------- */

const SWATCHES = [
  ["#3D6469", "Altrovia teal", "Primary actions, AI zones"],
  ["#EAEFF0", "Teal light", "Nav, hover"],
  ["#F7F8FA", "Surface", "Cards"],
  ["#151819", "Ink", "Primary text"],
  ["#5F6672", "Mid", "Secondary text"],
  ["#E5E7EA", "Border", "Dividers"],
]

/** Specimens drawn in Altrovia's own style: sharp 4px corners, teal for anything AI-made. */
function DesignSystem() {
  const [open, setOpen] = useState(true)
  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr]">
        <div className={cn(card, "space-y-3 p-5")}>
          <p className="cs-eyebrow">Color</p>
          <div className="grid grid-cols-3 gap-2">
            {SWATCHES.map(([hex, name, use]) => (
              <div key={hex} className="space-y-1.5">
                <span className="block h-10 rounded-[4px] border border-black/10" style={{ background: hex }} />
                <p className="text-[11px] leading-tight font-semibold">{name}</p>
                <p className="text-[10px] leading-tight text-foreground/50">{use}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={cn(card, "space-y-2.5 p-5")}>
          <p className="cs-eyebrow">Type</p>
          {[
            ["Display", "text-2xl font-semibold tracking-tight", "Trial Intelligence Analysis"],
            ["Section", "text-base font-semibold", "Feasibility Reality Check"],
            ["Label", "text-[10px] font-semibold tracking-[0.14em] uppercase text-foreground/50", "Amendment risk"],
            ["Body", "text-sm text-foreground/70", "Parameters automatically extracted from uploaded synopsis"],
          ].map(([role, cls, sample]) => (
            <div key={role} className="grid grid-cols-[64px_1fr] items-baseline gap-3 border-b border-border/50 pb-2 last:border-0">
              <span className="text-[11px] text-foreground/45">{role}</span>
              <span className={cls}>{sample}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(card, "space-y-4 p-5")}>
        <p className="cs-eyebrow">Components from the product</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-[4px] border border-[#E5E7EA] bg-[#F7F8FA] p-4 text-[#151819]">
            <span className="inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-1 text-[11px] font-medium" style={{ borderColor: TEAL, color: TEAL, background: "#EAEFF0" }}>
              <Sparkles className="h-3 w-3" aria-hidden /> AI Extracted
            </span>
            <div className="rounded-[4px] border-l-[3px] bg-white p-3" style={{ borderColor: TEAL }}>
              <p className="text-sm font-semibold">3 high-priority amendments require review</p>
              <p className="text-xs" style={{ color: TEAL }}>
                Based on 847 similar Phase 3 trials · AI confidence: 82%
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Amendment risk", "3 Critical", "#b42318"],
                ["AI confidence", "82%", TEAL],
              ].map(([l, v, c]) => (
                <div key={l} className="rounded-[4px] border border-[#E5E7EA] bg-white p-3">
                  <p className="text-[9px] font-semibold tracking-[0.14em] text-[#5F6672] uppercase">{l}</p>
                  <p className="text-lg font-semibold" style={{ color: c }}>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-[4px] border border-[#E5E7EA] bg-[#F7F8FA] p-4 text-[#151819]">
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between rounded-[4px] border bg-white px-3 py-2 text-sm font-semibold" style={{ borderColor: TEAL }}>
              Basic Information
              {open ? <ChevronUp className="h-4 w-4 text-[#5F6672]" aria-hidden /> : <ChevronDown className="h-4 w-4 text-[#5F6672]" aria-hidden />}
            </button>
            {open && (
              <dl className="space-y-1.5 px-3 text-xs">
                {[
                  ["Phase", "Phase 3"],
                  ["Intervention", "Talazoparib"],
                  ["Sample size", "1018"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2">
                    <dt className="text-[#5F6672]/70">{k}</dt>
                    <dd className="m-0">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="flex flex-wrap items-center gap-1.5 border-t border-[#E5E7EA] pt-3">
              {[
                ["Low", "#067647", "#ECFDF3"],
                ["Moderate", "#B54708", "#FFFAEB"],
                ["High", "#B42318", "#FEF3F2"],
              ].map(([l, c, bg]) => (
                <span key={l} className="rounded-[4px] border px-2 py-0.5 text-[11px] font-medium" style={{ color: c, borderColor: c, background: bg }}>
                  {l}
                </span>
              ))}
              <span className="ml-auto flex gap-1.5">
                <span className="rounded-[4px] border border-[#E5E7EA] bg-white px-3 py-1.5 text-[11px]">Assess Protocol</span>
                <span className="rounded-[4px] px-3 py-1.5 text-[11px] font-medium text-white" style={{ background: TEAL }}>
                  Run Analysis
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-foreground/60">
          <span className="flex items-center gap-1.5">
            <Square className="h-3 w-3" aria-hidden /> 4px corners, never rounded
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" style={{ color: TEAL }} aria-hidden /> Teal marks anything AI-made
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="h-3 w-3" aria-hidden /> Layouts modeled on analyst tools
          </span>
        </div>
      </div>
    </div>
  )
}

const SCREENS = [
  ["Workspace", "workspace", "Overview, trial portfolio and amendment-risk trials"],
  ["Design parameters", "design-parameters", "AI badge, collapsible rows, label and value rhythm"],
  ["Run analysis", "run-analysis", "Saved runs with scope badges and timestamps"],
  ["View results", "view-results", "Amendment risk, feasibility check, enrollment trajectory"],
  ["Generate protocol", "generate-protocol", "Complexity score and ten-section outline"],
  ["Version gallery", "version-gallery", "Latest draft and version history"],
  ["Complexity assessment", "complexity-assessment", "Review step with a live score breakdown"],
  ["Protocol view", "protocol-view", "Generated sections, export and edit"],
] as const

function Screens() {
  const [i, setI] = useState(0)
  const [name, file, cap] = SCREENS[i]
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SCREENS.map(([n], k) => (
          <button key={n} type="button" onClick={() => setI(k)} aria-pressed={i === k} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors", i === k ? "border-foreground bg-foreground text-background" : "border-border/70 text-foreground/70 hover:border-foreground/40")}>
            {String(k + 1).padStart(2, "0")} · {n}
          </button>
        ))}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/50 bg-white">
        <Image key={file} src={`/images/clinical-trials/screens/${file}.png`} alt={`Altrovia ${name} screen`} fill sizes="(min-width: 900px) 900px, 100vw" className="object-contain motion-safe:animate-in motion-safe:fade-in" />
      </div>
      <p className="cs-caption">{cap}</p>
    </div>
  )
}

/* ---------- Page ---------- */

export function AltroviaCaseStudy({ prototypeVideoSrc }: { prototypeVideoSrc: string }) {
  return (
    <div className="space-y-24">
      <CaseHero
        slug="clinical-trials"
        title="Altrovia: Trustworthy AI Signals for Clinical Trial Teams"
        roles={["UX/UI", "Strategy"]}
        tagline="A clinical intelligence workspace that shows where every AI number comes from."
        when="April 2026 · 10-hour build · Revisiting"
        forWhom="Adobe Designathon, with Hongxin Li"
        summary="Competitor research, design principles, a clinical design system and 8 core screens, built end to end under rapid critique."
      />

      <Section eyebrow="Status" title="Why I'm returning to this project">
        <Revisiting />
      </Section>

      <Section eyebrow="01 · The problem" title="75% of trials need amendments, at $43M per trial on average">
        <AmendmentCost />
        <Causes />
      </Section>

      <Section eyebrow="02 · Research" title="Competitor scan to wireframes, with stakeholders as a proxy for users">
        <ResearchFlow />
      </Section>

      <Section eyebrow="03 · Competitive landscape" title="11 references across clinical platforms and product tools">
        <ReferenceMap />
        <ProsCons />
        <div className="grid gap-3 md:grid-cols-2">
          <Shot src="/images/clinical-trials-ux-board-clinical-vendors.png" alt="Annotated scan of Medidata, Veeva and Palantir" w={1143} h={456} caption="Clinical platforms, annotated" />
          <Shot src="/images/clinical-trials-ux-board-product-landings.png" alt="Annotated scan of product and dev tool landing pages" w={1143} h={462} caption="Product and dev tools, annotated" />
        </div>
        <div className="flex items-center gap-3 rounded-2xl p-4 text-white" style={{ background: TEAL }}>
          <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
          <p className="text-sm font-medium">The most trusted products show their reasoning. Palantir, Cursor and Supabase never hide the machine.</p>
        </div>
      </Section>

      <Section eyebrow="04 · Opportunity" title="4 problems mapped to 4 design principles">
        <ProblemToPrinciple />
      </Section>

      <Section eyebrow="05 · Hypotheses" title="4 hypotheses from our principles and critique">
        <Hypotheses />
      </Section>

      <Section eyebrow="06 · Explorations" title="5 build steps and 2 critique sessions">
        <BuildStrip />
        <Shot src="/images/clinical-trials-how-we-built-montage.png" alt="Exploration thumbnails, wireframes, dashboard UI and the Cursor editor" w={1024} h={252} />
        <Critique />
        <Fixes />
      </Section>

      <Section eyebrow="07 · Final direction" title="A clinical design system and 8 core screens">
        <DesignSystem />
        <div className="relative mx-auto w-full max-w-3xl">
          <Image src="/images/clinical-trials/monitor-mockup.png" alt="" width={672} height={331} className="h-auto w-full select-none" />
          <div className="absolute overflow-hidden rounded-[3px] bg-black" style={{ left: "8.2%", right: "8.2%", top: "0.3%", bottom: "1.8%" }}>
            <video autoPlay muted loop controls playsInline preload="metadata" className="h-full w-full object-cover" aria-label="Prototype walkthrough">
              <source src={prototypeVideoSrc} type="video/quicktime" />
              <source src={prototypeVideoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
        <Screens />
      </Section>

      <Section eyebrow="08 · Test plan" title="Planned sessions with trial operations teams">
        <div className={cn(card, "grid gap-4 p-5 md:grid-cols-[auto_1fr] md:items-center")}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <Users className="h-4 w-4" style={{ color: TEAL }} aria-hidden /> Trial ops teams
          </span>
          <div className="flex flex-wrap gap-1.5">
            {HYPS.map(([, tag, bet]) => (
              <span key={tag} className="rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs">
                <b className="mr-1" style={{ color: TEAL }}>
                  {tag}
                </b>
                {bet}
              </span>
            ))}
          </div>
        </div>
        <p className="cs-caption">Not run yet. Sessions will check the AI trust patterns against each hypothesis.</p>
      </Section>

      <Section eyebrow="09 · Limits and next steps" title="What the 10-hour build left out">
        <div className="grid items-stretch gap-3 md:grid-cols-2">
          <div className={cn(card, "space-y-2.5 p-5")}>
            <p className="cs-eyebrow">Limits</p>
            {["No direct access to end users", "UI rules drifted across 8 pages", "No final consistency audit"].map((x) => (
              <p key={x} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" /> {x}
              </p>
            ))}
          </div>
          <div className={cn(card, "space-y-2.5 p-5")}>
            <p className="cs-eyebrow">Next, now that I&rsquo;m back on it</p>
            {NEXT.map(([Icon, t]) => (
              <p key={t} className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4 shrink-0" style={{ color: TEAL }} aria-hidden /> {t}
              </p>
            ))}
          </div>
        </div>
        <p className="max-w-[65ch] text-sm text-foreground/65">
          It was our first time taking a designathon from wireframes to mockups. When everything moves this fast, you try to use AI efficiently, not just to skip the hard thinking.
        </p>
      </Section>
    </div>
  )
}
