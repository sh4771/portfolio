"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check, ChevronDown, Info, MousePointer2, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Live, PLUM, PLUM_TEXT, Section, BeforeAfter } from "./kit"

const BASELINE = 0.6

/* ---------- live estimate, shown three ways ---------- */

function EstimateLab() {
  const [prospects, setProspects] = useState(2500)
  const [returning, setReturning] = useState(true)
  const [history, setHistory] = useState(1.4)
  const [why, setWhy] = useState(true)
  // The real rule: first campaign uses the 0.6% baseline; later ones use the higher of baseline and the customer's own rate.
  const rate = returning ? Math.max(BASELINE, history) : BASELINE
  const usingOwn = returning && history > BASELINE
  const point = Math.round(prospects * (rate / 100))
  // Range for display only, matching the 28 to 44 shown for 2,500 × 1.4% in the design.
  const lo = Math.round(point * 0.8)
  const hi = Math.round(point * 1.257)

  return (
    <div className="space-y-4">
      <div className="grid gap-x-6 gap-y-4 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-2 sm:p-5">
        <label htmlFor="mp-prospects" className="block space-y-1.5">
          <span className="flex items-baseline justify-between text-xs text-foreground/65">
            Matched prospects <b className="text-sm tabular-nums text-foreground">{prospects.toLocaleString()}</b>
          </span>
          <input id="mp-prospects" type="range" min={200} max={8000} step={100} value={prospects} onChange={(e) => setProspects(Number(e.target.value))} className="w-full accent-[#4a0e4e]" />
        </label>
        <div className="space-y-1.5">
          <div role="radiogroup" aria-label="Campaign history" className="inline-flex rounded-full bg-muted p-1 text-xs font-semibold">
            {(
              [
                [false, "First campaign"],
                [true, "Returning customer"],
              ] as const
            ).map(([k, label]) => (
              <button key={label} type="button" role="radio" aria-checked={returning === k} onClick={() => setReturning(k)} className={cn("rounded-full px-3 py-1.5 transition-colors", returning === k ? "bg-background text-foreground shadow-sm" : "text-foreground/55")}>
                {label}
              </button>
            ))}
          </div>
          <label htmlFor="mp-rate" className={cn("block space-y-1.5 transition-opacity", !returning && "pointer-events-none opacity-40")}>
            <span className="flex items-baseline justify-between text-xs text-foreground/65">
              Your historical rate <b className="text-sm tabular-nums text-foreground">{history.toFixed(1)}%</b>
            </span>
            <input id="mp-rate" type="range" min={0.2} max={3} step={0.1} value={history} disabled={!returning} onChange={(e) => setHistory(Number(e.target.value))} className="w-full accent-[#4a0e4e]" />
          </label>
        </div>
      </div>

      {/* the formula, live */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-muted/40 p-4 text-sm">
        <span className="rounded-lg bg-background px-3 py-2 shadow-sm">
          <span className="block text-[10px] text-foreground/50">Matched prospects</span>
          <b>
            <Live value={prospects.toLocaleString()} />
          </b>
        </span>
        <span className="text-foreground/40">×</span>
        <span className="rounded-lg bg-background px-3 py-2 shadow-sm">
          <span className="block text-[10px] text-foreground/50">{usingOwn ? "Your rate" : "Baseline rate"}</span>
          <b>
            <Live value={`${rate.toFixed(1)}%`} />
          </b>
        </span>
        <span className="text-foreground/40">=</span>
        <span className="rounded-lg px-3 py-2 text-white" style={{ backgroundColor: PLUM }}>
          <span className="block text-[10px] text-white/70">Formula output</span>
          <b>
            <Live value={`${point} meetings`} />
          </b>
        </span>
      </div>

      {/* three ways to show the same number */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-3 rounded-2xl border border-border/60 bg-card p-4">
          <p className="cs-eyebrow">A · Number + tooltip</p>
          <p className="flex items-center gap-2 text-sm text-foreground">
            Expected Meetings: <b className="text-2xl">
              <Live value={String(point)} />
            </b>
            <Info className="h-4 w-4 text-muted-foreground" />
          </p>
          <p className="text-xs text-foreground/55">Still reads as exact.</p>
        </div>
        <div className="space-y-3 rounded-2xl border border-border/60 bg-card p-4">
          <p className="cs-eyebrow">B · Rate only</p>
          <p className="text-sm text-foreground">
            Historical rate: <b className="text-2xl">
              <Live value={`${rate.toFixed(1)}%`} />
            </b>
          </p>
          <p className="text-xs text-foreground/55">Pushes the math onto the customer.</p>
        </div>
        <div className="space-y-3 rounded-2xl border-2 bg-card p-4" style={{ borderColor: PLUM }}>
          <p className={cn("cs-eyebrow flex items-center gap-1.5", PLUM_TEXT)}>
            <Check className="h-3.5 w-3.5" /> C · Outcome + inputs
          </p>
          <div>
            <p className="text-xs text-foreground/55">Expected meetings</p>
            <p className="text-2xl font-semibold text-foreground">
              <Live value={`${lo} to ${hi}`} />
            </p>
            <p className="text-xs text-foreground/60">
              <Live value={`${prospects.toLocaleString()} × ${rate.toFixed(1)}%`} /> {usingOwn ? "your rate" : "baseline"}
            </p>
          </div>
          <button type="button" onClick={() => setWhy((w) => !w)} aria-expanded={why} className={cn("flex items-center gap-1 text-xs font-semibold", PLUM_TEXT)}>
            Why this estimate? <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", why && "rotate-180")} />
          </button>
          {why && (
            <ul className="space-y-1 text-[11px] leading-relaxed text-foreground/65">
              <li>• Your matched prospects for this event</li>
              <li>• {usingOwn ? "Your own historical rate, above the 0.6% baseline" : returning ? "The 0.6% baseline, since it's higher than your rate" : "The 0.6% baseline, since this is your first campaign"}</li>
              <li>• A range, because the formula isn&apos;t as precise as one number</li>
            </ul>
          )}
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-foreground/50">
        <MousePointer2 className="h-3.5 w-3.5" /> Drag the inputs. The formula is the real one; the range width is illustrative.
      </p>
    </div>
  )
}


const PAIRS = [
  { label: "Main page", note: "A flat table became a “Needs attention” panel plus campaign cards.", before: "/images/vendelux/mp-before-mainpage.png", after: "/images/vendelux/mp-after-mainpage.png" },
  { label: "Create campaign", note: "One long form became a four-step wizard with a live forecast.", before: "/images/vendelux/mp-before-creationflow.png", after: "/images/vendelux/mp-after-creationflow.png" },
  { label: "Email sequences", note: "Expanded emails became a collapsible list, plus call and LinkedIn scripts.", before: "/images/vendelux/mp-before-emailsequence.png", after: "/images/vendelux/mp-after-emailsequence.png" },
  { label: "Event detail", note: "Flat text became sections plus a “Fix to launch” checklist.", before: "/images/vendelux/mp-before-eventdetail.png", after: "/images/vendelux/mp-after-eventdetail.png" },
]

/* ---------- page ---------- */

export function MeetingPlannerCaseStudy() {
  return (
    <article className="space-y-20">
      <header className="space-y-6">
        <div className="space-y-1.5">
          <p className="cs-eyebrow">Vendelux · Meeting Planner</p>
          <h1 className="cs-h1">&ldquo;Expected Meetings: 36.&rdquo; Where did 36 come from?</h1>
          <p className="text-sm text-foreground/60">Jul – Aug 2026 · Product Intern · In design review</p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50 sm:grid-cols-4">
          {[
            ["Role", "Product Intern, sole designer"],
            ["Team", "PM, 2 engineers, team lead"],
            ["Users", "Customers planning event outreach"],
            ["Goal", "Plan outreach around a number they trust"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-4">
              <dt className="cs-eyebrow mb-1">{k}</dt>
              <dd className="text-sm text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Section eyebrow="01 · The question" title="Customers asked for a plan and got a bare number">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col justify-center rounded-2xl bg-muted/40 p-5">
            <p className="text-lg leading-snug text-foreground">&ldquo;If I invite 2,500 people from these segments, how many meetings should I expect?&rdquo;</p>
            <p className="mt-2 text-xs text-foreground/50">The customer&apos;s question</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card p-5">
            <p className="text-xs text-foreground/50">What they got</p>
            <p className="text-sm text-foreground/70">Expected Meetings</p>
            <p className="text-6xl font-semibold tracking-tight text-foreground">36</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-border/60 p-4">
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((k) => (
              <span key={k} className="h-6 w-1.5 rounded-full" style={{ backgroundColor: PLUM, opacity: 0.4 + k * 0.15 }} />
            ))}
          </div>
          <p className="text-sm text-foreground/75">
            <b className="text-foreground">5 rate changes in about 13 months.</b> Even teammates struggled to explain the number.
          </p>
        </div>
      </Section>

      <Section eyebrow="02 · Where it broke" title="Every follow-up question landed on a person">
        <ol className="space-y-2">
          {[
            { who: "c", t: "Selects audience segments." },
            { who: "s", t: "Shows Expected Meetings: 36." },
            { who: "c", t: "“Where did 36 come from?”", q: true },
            { who: "s", t: "A teammate explains it by hand, if they know the current rate." },
            { who: "c", t: "Changes segments. Can't tell what moved the number.", bad: true },
          ].map((m, k) => (
            <li key={k} className={cn("flex items-end gap-2", m.who === "c" ? "justify-start" : "justify-end")}>
              {m.who === "c" && <User className="h-5 w-5 shrink-0 rounded-full bg-muted p-1 text-foreground/60" />}
              <span className={cn("max-w-[78%] rounded-2xl px-3.5 py-2 text-sm", m.who === "c" ? "rounded-bl-md bg-muted/60" : "rounded-br-md bg-card ring-1 ring-border/60", m.q && "italic", m.bad && "ring-1 ring-red-700/40")}>{m.t}</span>
              {m.who === "s" && <Bot className="h-5 w-5 shrink-0 rounded-full bg-muted p-1 text-foreground/60" />}
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="03 · The decision" title="Show the math, in three ways, and pick one" id="results">
        <EstimateLab />
      </Section>

      <Section eyebrow="04 · In the real flow" title="The forecast updates as the campaign takes shape">
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-xl border border-border/50 bg-white">
            <Image src="/images/vendelux/meeting-planner-create-campaign-flow.gif" alt="Create Campaign flow with a forecast panel that updates as event, timing and audience change" width={1280} height={1488} unoptimized className="mx-auto h-auto w-full max-w-[560px]" />
          </div>
          <figcaption className="cs-caption">Matched leads, the range, the rate and price per meeting update together.</figcaption>
        </figure>
      </Section>

      <Section eyebrow="05 · Division of work" title="My calls vs. v0's">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl p-4 text-white" style={{ backgroundColor: PLUM }}>
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-white/70 uppercase">My calls</p>
            <ul className="flex flex-wrap gap-1.5">
              {["Range instead of a number", "Which inputs to show", "“Why this estimate?” copy", "How segment changes update it"].map((t) => (
                <li key={t} className="rounded-md bg-white/15 px-2 py-1 text-xs">{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-4">
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-foreground/55 uppercase">v0&apos;s work</p>
            <ul className="flex flex-wrap gap-1.5">
              {["Panel layout", "Display states", "Live recalculation"].map((t) => (
                <li key={t} className="rounded-md border border-border/60 px-2 py-1 text-xs">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="06 · How I'll test it" title="Understanding and trust, measured separately">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { k: "Understanding", q: "What's driving this estimate?", pass: "Names audience size and rate" },
            { k: "Trust", q: "Would you set a goal with it?", pass: "Treats it as a signal, not a promise" },
            { k: "Decision", q: "Does the range change your plan?", pass: "Adjusts audience, goal or effort" },
          ].map((c) => (
            <div key={c.k} className="space-y-3 rounded-2xl border border-border/60 bg-card p-4">
              <p className={cn("text-sm font-semibold", PLUM_TEXT)}>{c.k}</p>
              <p className="text-sm italic text-foreground/75">&ldquo;{c.q}&rdquo;</p>
              <p className="flex items-start gap-1.5 text-xs text-foreground/60">
                <Check className="mt-px h-3.5 w-3.5 shrink-0" /> {c.pass}
              </p>
            </div>
          ))}
        </div>
        <p className="cs-caption">Compared against the old single-number version. Not run with customers yet.</p>
      </Section>

      <Section eyebrow="07 · Across the app" title="Before and after">
        <BeforeAfter pairs={PAIRS} />
      </Section>

      <Section eyebrow="08 · Where it stands" title="In review, customer validation next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { tag: "Done", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", body: "Design reviews with Customer Success through Aug 26, 2026" },
            { tag: "Not yet", tone: "bg-foreground/10 text-foreground/70", body: "Shipped to engineering or tested with customers" },
            { tag: "Next", tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300", body: "Validate whether customers understand and plan with the range" },
          ].map((c) => (
            <div key={c.tag} className="space-y-2 rounded-2xl border border-border/60 bg-card p-4">
              <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", c.tone)}>{c.tag}</span>
              <p className="text-sm text-foreground/75">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-foreground/70">Writing the test plan before Figma kept me honest. Next time I&apos;d put a rough prototype in front of customers sooner.</p>
      </Section>
    </article>
  )
}
