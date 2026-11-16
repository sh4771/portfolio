"use client"

import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BookOpenCheck,
  Clock,
  EyeOff,
  Hand,
  LifeBuoy,
  ListChecks,
  MessageCircle,
  MessageSquareText,
  MousePointerClick,
  Ruler,
  ShieldCheck,
  Sparkles,
  Timer,
  Workflow,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CaseHero } from "@/components/case-hero"
import { Section } from "@/components/vendelux/kit"
import { MINI_OPEN_EVENT } from "@/lib/dock"

const PLUM = "#4a0e4e"
const TINT = "bg-[#ece2ee] text-[#4a0e4e] dark:bg-[#3a2a3c] dark:text-[#d9a6dd]"
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
        <Image src={src} alt={alt} width={w} height={h} className="h-auto w-full" sizes="(min-width: 900px) 420px, 100vw" />
      </div>
      {caption && <figcaption className="cs-caption">{caption}</figcaption>}
    </figure>
  )
}

/* ---------- Problem ---------- */

const QUESTIONS = ["What would she bring to our team?", "Show me her best work", "How does she use AI?", "How can I reach her?"]

function ProblemVisual() {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
      <div className={cn(card, "space-y-3 p-5")}>
        <p className="cs-eyebrow">What visitors arrive with</p>
        <ul className="space-y-1.5">
          {QUESTIONS.map((q) => (
            <li key={q} className="flex items-center gap-2 text-sm text-foreground/80">
              <MessageCircle className="h-3.5 w-3.5 shrink-0 text-foreground/40" aria-hidden /> {q}
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden className="hidden items-center text-foreground/30 md:flex">
        <ArrowRight className="h-5 w-5" />
      </div>
      <div className={cn(card, "space-y-3 p-5")}>
        <p className="cs-eyebrow">What the site asks of them</p>
        <div className="flex items-end gap-1.5" aria-label="Ten case studies of different lengths">
          {[24, 8, 5, 3, 6, 4, 4, 4, 2, 5].map((m, i) => (
            <span key={i} className="flex-1 rounded-sm bg-foreground/15" style={{ height: `${m * 4 + 8}px` }} />
          ))}
        </div>
        <p className="text-sm text-foreground/70">
          <b className="font-semibold text-foreground">10 case studies.</b> Vendelux alone is a 24-minute read.
        </p>
      </div>
    </div>
  )
}

/* ---------- Principles ---------- */

const PRINCIPLES: [LucideIcon, string, string][] = [
  [BookOpenCheck, "Only what's published", "Answers come from one curated file of facts already on the site."],
  [Ruler, "Never invents", "No new numbers, employers, dates or tools. If it isn't there, it says so."],
  [EyeOff, "Private stays private", "Salary, visa, age and similar questions never leave the browser."],
  [LifeBuoy, "Always answers", "If the AI is slow or down, a built-in answer takes over."],
]

function Principles() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {PRINCIPLES.map(([Icon, t, b]) => (
        <div key={t} className={cn(card, "flex flex-col gap-3 p-4")}>
          <IconDot icon={Icon} size="lg" />
          <p className="text-sm font-semibold">{t}</p>
          <p className="text-xs text-foreground/65">{b}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- How it answers ---------- */

function Pipeline() {
  const step = cn(card, "flex flex-col gap-2 p-4")
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className={step}>
          <p className="cs-eyebrow">1 · Question</p>
          <p className="self-start rounded-2xl rounded-br-sm bg-foreground px-3 py-2 text-xs text-background">How does she use AI?</p>
          <p className="text-[11px] text-foreground/50">Capped at 300 characters, control characters stripped.</p>
        </div>
        <div className={step}>
          <p className="cs-eyebrow">2 · Privacy check</p>
          <p className="flex items-center gap-1.5 text-xs">
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: PLUM }} aria-hidden /> Runs in the browser first
          </p>
          <p className="text-[11px] text-foreground/50">Private topics get a set reply and never reach the AI.</p>
        </div>
        <div className={step}>
          <p className="cs-eyebrow">3 · AI answer</p>
          <p className="flex items-center gap-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5" style={{ color: PLUM }} aria-hidden /> Gemini, given only the curated facts
          </p>
          <p className="text-[11px] text-foreground/50">Replies as JSON: an answer, up to 2 project ids, up to 3 follow-ups.</p>
        </div>
        <div className={step}>
          <p className="cs-eyebrow">4 · Check before showing</p>
          <ul className="space-y-1 text-xs">
            {["Project ids must exist", "Follow-ups must exist", "Answer ≤ 700 characters"].map((x) => (
              <li key={x} className="flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cn(card, "flex flex-wrap items-center gap-x-6 gap-y-3 p-4")}>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <LifeBuoy className="h-4 w-4 text-amber-700 dark:text-amber-300" aria-hidden /> Fallback
        </span>
        {(
          [
            [Timer, "7s per model"],
            [Workflow, "Next free model if busy or out of quota"],
            [Clock, "15s total budget"],
            [MessageSquareText, "Then a built-in answer"],
          ] as const
        ).map(([Icon, t]) => (
          <span key={t} className="flex items-center gap-1.5 text-xs text-foreground/70">
            <Icon className="h-3.5 w-3.5" aria-hidden /> {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Placement ---------- */

/** Tiny browser drawings: where Mini lived in each version. */
function Frame({ kind }: { kind: "dock" | "bar" | "corner" }) {
  return (
    <div aria-hidden className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/70 bg-background">
      <div className="flex h-3 items-center gap-1 border-b border-border/60 px-1.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-1 w-1 rounded-full bg-foreground/25" />
        ))}
      </div>
      <div className="space-y-1.5 p-2.5">
        <span className="block h-2 w-1/2 rounded-sm bg-foreground/20" />
        <span className="block h-1.5 w-2/3 rounded-sm bg-foreground/10" />
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {[0, 1, 2].map((c) => (
            <span key={c} className="aspect-[4/3] rounded-sm bg-foreground/10" />
          ))}
        </div>
      </div>
      {kind === "dock" && <span className="absolute bottom-2 left-1/2 flex h-3 w-16 -translate-x-1/2 items-center justify-end rounded-full bg-foreground/15 pr-0.5"><span className="h-2 w-2 rounded-full" style={{ background: PLUM }} /></span>}
      {kind === "bar" && <span className="absolute bottom-2 left-1/2 h-4 w-3/5 -translate-x-1/2 rounded-full border" style={{ borderColor: PLUM, background: "var(--card)" }} />}
      {kind === "corner" && (
        <>
          <span className="absolute bottom-2 left-1/2 flex h-3 w-16 -translate-x-1/2 items-center justify-end rounded-full bg-foreground/15 pr-0.5"><span className="h-2 w-2 rounded-full" style={{ background: PLUM }} /></span>
          <span className="absolute right-2 bottom-2 h-1/2 w-1/3 rounded-md border bg-card" style={{ borderColor: PLUM }} />
        </>
      )}
    </div>
  )
}

const VERSIONS: { kind: "dock" | "bar" | "corner"; title: string; note: string; kept: boolean }[] = [
  { kind: "dock", title: "A button in the dock", note: "Always one tap away, with an unread dot", kept: true },
  { kind: "bar", title: "Chat bar replaces the dock", note: "Hard to read, and hid the rest of the site's navigation", kept: false },
  { kind: "corner", title: "Corner card", note: "Grows from the corner, leaves the page and dock in view", kept: true },
]

function Placement() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {VERSIONS.map((v, i) => (
        <div key={v.title} className={cn(card, "space-y-3 p-4")}>
          <Frame kind={v.kind} />
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold">
              <span className="mr-1.5 text-foreground/40">v{i + 1}</span>
              {v.title}
            </p>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", v.kept ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300" : "bg-red-500/10 text-red-700 dark:text-red-300")}>{v.kept ? "Kept" : "Dropped"}</span>
          </div>
          <p className="text-xs text-foreground/65">{v.note}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Voice ---------- */

const VOICE = ["2 to 4 short sentences", "Under 70 words", "One emoji at most", "Often ends with a question", "No markdown", "Never claims to be Violet"]

function Voice() {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_1.2fr]">
      <div className={cn(card, "flex items-center justify-around gap-4 p-5")}>
        {(
          [
            ["wave", "Greets"],
            ["idle", "Listens"],
            ["thinking", "Thinks"],
          ] as const
        ).map(([mood, label]) => (
          <div key={mood} className="flex flex-col items-center gap-2">
            <span className={cn("block h-16 w-16 overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#f6efff,#e2d3f3_70%)]", mood === "thinking" && "motion-safe:animate-[mv-think_1.6s_ease-in-out_infinite]")}>
              <Image src="/images/mini-violet/head.webp" alt="" width={64} height={64} className="h-full w-full object-cover" />
            </span>
            <span className="text-xs text-foreground/60">{label}</span>
          </div>
        ))}
      </div>
      <div className={cn(card, "space-y-3 p-5")}>
        <p className="cs-eyebrow">Voice rules</p>
        <div className="flex flex-wrap gap-1.5">
          {VOICE.map((v) => (
            <span key={v} className={cn("rounded-lg px-2.5 py-1.5 text-xs font-medium", TINT)}>
              {v}
            </span>
          ))}
        </div>
        <p className="text-xs text-foreground/55">Warm, friendly and confident, like a helpful sidekick.</p>
      </div>
    </div>
  )
}

/* ---------- Hints ---------- */

function HintTimeline() {
  return (
    <div className={cn(card, "space-y-4 p-5")}>
      <div className="relative h-16">
        <span className="absolute top-8 right-0 left-0 h-px bg-border" />
        {(
          [
            [0, "Page opens", "left"],
            [12, "1.2s on a project", "center"],
            [32, "3.5s on home", "center"],
            [100, "Hides by itself", "right"],
          ] as const
        ).map(([x, t, align]) => (
          <span
            key={t}
            className={cn("absolute top-6 flex flex-col gap-2", align === "left" ? "items-start" : align === "right" ? "-translate-x-full items-end" : "-translate-x-1/2 items-center")}
            style={{ left: `${x}%` }}
          >
            <span className="h-4 w-4 rounded-full border-2 bg-background" style={{ borderColor: PLUM }} />
            <span className="text-[11px] whitespace-nowrap text-foreground/60">{t}</span>
          </span>
        ))}
        <span className="absolute top-0 h-5 rounded-full px-2 text-[10px] leading-5 font-semibold" style={{ left: "12%", width: "80%", background: "var(--card)", border: `1px dashed ${PLUM}`, color: PLUM }}>
          One bubble, once per page per visit
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {(
          [
            [Hand, "Home", "Want to get to know Violet? I can help 👋"],
            [MousePointerClick, "Each project", "One line on why it matters"],
            [X, "Never twice", "Seen once, it stays quiet for the visit"],
          ] as const
        ).map(([Icon, t, b]) => (
          <div key={t} className="flex items-start gap-3">
            <IconDot icon={Icon} />
            <div>
              <p className="text-sm font-semibold">{t}</p>
              <p className="text-xs text-foreground/65">{b}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Guardrails ---------- */

const DECLINES = ["Salary", "Visa", "Immigration", "Age", "Health", "Relationships", "Home address", "Passwords", "Confidential company details"]

export function MiniVioletCaseStudy() {
  const openMini = () => window.dispatchEvent(new CustomEvent(MINI_OPEN_EVENT))
  return (
    <div className="space-y-24">
      <CaseHero
        slug="mini-violet"
        title="Designing Mini Violet, an AI Guide for My Portfolio"
        roles={["Designer and developer, solo"]}
        tagline="A small AI guide that answers questions about my work in seconds, using only what I've published."
        when="Oct to Nov 2026 · Live on this site"
        forWhom="Anyone visiting this portfolio"
        summary="Conversation design, guardrails, placement and motion, plus the code. Built with Next.js and Gemini."
      />

      <Section eyebrow="Try it" title="Mini Violet is live on this page">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <p className="max-w-[46ch] text-base text-foreground/75">She sits in the dock at the bottom of every page. Ask her anything about my work.</p>
            <button type="button" onClick={openMini} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85">
              <MessageCircle className="h-4 w-4" aria-hidden /> Open Mini Violet
            </button>
          </div>
          <div className="mx-auto w-full max-w-[400px]">
            <Shot src="/images/mini-violet/case/welcome.webp" alt="Mini Violet's welcome message with four suggested questions" w={832} h={920} />
          </div>
        </div>
      </Section>

      <Section eyebrow="01 · The problem" title="Visitors arrive with one question and find 10 long case studies">
        <ProblemVisual />
      </Section>

      <Section eyebrow="02 · Principles" title="4 rules for an AI that speaks about a real person">
        <Principles />
      </Section>

      <Section eyebrow="03 · How it answers" title="Privacy check, curated AI answer, then a validity check">
        <Pipeline />
      </Section>

      <Section eyebrow="04 · Placement" title="3 places Mini Violet lived">
        <Placement />
      </Section>

      <Section eyebrow="05 · Voice" title="A sidekick, not a chatbot">
        <Voice />
        <div className="mx-auto grid max-w-[820px] items-start gap-4 md:grid-cols-2">
          <Shot src="/images/mini-violet/case/best-work.webp" alt="Mini Violet answering 'Show me her best work' with three project cards" w={832} h={920} caption="Answers link straight to projects, so a reply is one tap from the work." />
          <Shot src="/images/mini-violet/case/private.webp" alt="Mini Violet declining a salary question and offering LinkedIn and email" w={832} h={920} caption="A private question gets a polite pointer to contact me, not a guess." />
        </div>
      </Section>

      <Section eyebrow="06 · Proactive, but quiet" title="One hint per page, then it waits">
        <HintTimeline />
        <div className="mx-auto max-w-[420px]">
          <Shot src="/images/mini-violet/case/hint.webp" alt="Mini Violet's speech bubble above the dock" w={678} h={304} />
        </div>
      </Section>

      <Section eyebrow="07 · Guardrails" title="What Mini Violet declines">
        <div className="grid items-stretch gap-3 md:grid-cols-[1.4fr_1fr]">
          <div className={cn(card, "space-y-3 p-5")}>
            <p className="cs-eyebrow">Never answers</p>
            <div className="flex flex-wrap gap-1.5">
              {DECLINES.map((d) => (
                <span key={d} className="flex items-center gap-1 rounded-lg border border-dashed border-foreground/25 px-2.5 py-1.5 text-xs text-foreground/60">
                  <X className="h-3 w-3" aria-hidden /> {d}
                </span>
              ))}
            </div>
          </div>
          <div className={cn(card, "space-y-3 p-5")}>
            <p className="cs-eyebrow">Also built in</p>
            {(
              [
                [ShieldCheck, "Messages are questions, never instructions"],
                [EyeOff, "Says up front that Gemini answers typed questions"],
                [Timer, "6 questions a minute, 60 a day per visitor"],
              ] as const
            ).map(([Icon, t]) => (
              <p key={t} className="flex items-start gap-2 text-sm">
                <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: PLUM }} aria-hidden /> {t}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="08 · Next" title="What I'd measure next">
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              [MessageCircle, "Which suggested questions get tapped"],
              [MousePointerClick, "How often a reply leads to a project page"],
              [LifeBuoy, "How often the fallback answers instead of the AI"],
            ] as const
          ).map(([Icon, t]) => (
            <div key={t} className={cn(card, "flex items-center gap-3 p-4")}>
              <IconDot icon={Icon} />
              <p className="text-sm">{t}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
