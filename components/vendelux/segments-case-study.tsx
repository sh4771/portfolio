"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  Component as ComponentIcon,
  ExternalLink,
  FlaskConical,
  Shuffle,
  Timer,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PLUM = "#4a0e4e"
/** Plum that stays legible in dark mode. */
const PLUM_TEXT = "text-[#4a0e4e] dark:text-[#d9a6dd]"
const PROTO = "/work/vendelux/prototypes/segments-patterns.html"

const PHASES = [
  {
    id: "phase-1",
    n: "Phase 1",
    when: "Apr – May 2026",
    title: "Build the foundation",
    body: "Library, filter sidebar, column picker, create and save modal, tooltips, components.",
    status: "Shipped",
  },
  {
    id: "phase-2",
    n: "Phase 2",
    when: "May – Oct 2026",
    title: "Learn from real usage",
    body: "Reuse analytics, customer calls, and an October design review.",
    status: "Measured",
  },
  {
    id: "phase-3",
    n: "Phase 3",
    when: "Oct 2026",
    title: "Design the next iteration",
    body: "Three interaction patterns, prototyped in HTML, plus a handed-off proposal.",
    status: "Not yet shipped",
  },
]

const STATS = [
  { n: "45.5%", l: "of selected segments were reused across 2+ events", c: "1,319 of 2,900" },
  { n: "82.5%", l: "of companies selecting segments reused one across events", c: "236 of 286, grouped by email domain" },
  { n: "51.5%", l: "of segments were picked again on a later day", c: "Median 35 days between first and last use" },
  { n: "11,446", l: "deliberate segment selections by 881 users", c: "May to Oct 2026" },
]

const ISSUES = [
  "Filters hid behind extra clicks",
  "The new filtering interface behaved differently from the builder",
  "Include and exclude were hard to understand",
  "Important filter categories got overlooked",
  "Long lists of criteria were hard to navigate",
]

const QUOTES = [
  "There doesn't seem to be like any way to see like how many people are included in this.",
  "I wonder if I actually messed it up and accidentally saved over the segment with new filters.",
  "There's too many segments in there… he can't find what he's looking for.",
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="cs-eyebrow">{children}</p>
}

function Shot({
  src,
  alt,
  w,
  h,
  caption,
  className,
}: {
  src: string
  alt: string
  w: number
  h: number
  caption?: string
  className?: string
}) {
  return (
    <figure className={cn("space-y-2", className)}>
      <div className="overflow-hidden rounded-xl border border-border/50 bg-white">
        <Image src={src} alt={alt} width={w} height={h} className="h-auto w-full" sizes="(min-width: 900px) 800px, 100vw" />
      </div>
      {caption && <figcaption className="cs-caption">{caption}</figcaption>}
    </figure>
  )
}

/** Same-origin prototype iframe that sizes itself from the height the prototype reports. */
function Prototype({ view, title, initial }: { view: "three" | "prop"; title: string; initial: number }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(initial)
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== ref.current?.contentWindow) return
      if (e.data?.source === "segments-proto" && typeof e.data.height === "number") setHeight(Math.ceil(e.data.height))
    }
    window.addEventListener("message", onMsg)
    return () => window.removeEventListener("message", onMsg)
  }, [])

  // Same origin, so also measure directly once loaded (covers a load that beats hydration).
  const roRef = useRef<ResizeObserver | null>(null)
  const onLoad = () => {
    try {
      const win = ref.current?.contentWindow as (Window & typeof globalThis) | null
      const doc = ref.current?.contentDocument
      if (!win || !doc) return
      const measure = () => setHeight(Math.ceil(doc.documentElement.scrollHeight))
      measure()
      roRef.current?.disconnect()
      roRef.current = new win.ResizeObserver(measure)
      roRef.current.observe(doc.body)
    } catch {}
  }
  // If the iframe finished loading before hydration, onLoad never fired: measure now.
  useEffect(() => {
    const doc = ref.current?.contentDocument
    if (doc && doc.readyState === "complete" && doc.URL !== "about:blank") onLoad()
    return () => roRef.current?.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-[#F5F3F2] p-3 sm:p-4">
      <iframe
        ref={ref}
        src={`${PROTO}?view=${view}`}
        title={title}
        onLoad={onLoad}
        loading="lazy"
        className="block w-full border-0"
        style={{ height }}
      />
    </div>
  )
}

export function SegmentsCaseStudy() {
  return (
    <article className="space-y-20">
      {/* Header */}
      <header className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="cs-h1">Segments</h1>
          <p className="text-sm text-foreground/60">Apr – Oct 2026 · Product Intern</p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50 sm:grid-cols-4">
          {[
            ["Role", "Product Intern"],
            ["Team", "PM, 2 engineers, team lead"],
            ["Users", "Event marketers"],
            ["Goal", "Build an audience once, reuse it everywhere"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-4">
              <dt className="cs-eyebrow mb-1">{k}</dt>
              <dd className="text-sm text-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Phase timeline doubles as the table of contents */}
        <ol className="grid gap-3 sm:grid-cols-3">
          {PHASES.map((p, i) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="group flex h-full flex-col gap-2 rounded-xl border border-border/60 p-4 transition-colors hover:border-foreground/40"
              >
                <span className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {p.n} · {p.when}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-base font-semibold text-foreground">{p.title}</span>
                <span className="text-sm leading-relaxed text-foreground/65">{p.body}</span>
                <span
                  className={cn(
                    "mt-auto w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    i === 0 && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                    i === 1 && "bg-sky-500/15 text-sky-700 dark:text-sky-300",
                    i === 2 && "bg-foreground/10 text-foreground/70",
                  )}
                >
                  {p.status}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </header>

      {/* Context */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Eyebrow>Context</Eyebrow>
          <h2 className="cs-h2">From static lists to reusable audiences</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-xl border border-border/60 p-4">
            <p className="text-sm font-semibold text-foreground">Before: Lists</p>
            <p className="mt-1 text-sm text-foreground/65">Static contacts, rebuilt for every event. Hard to see what a filter changed.</p>
          </div>
          <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-muted-foreground sm:rotate-0" />
          <div className="rounded-xl border-2 p-4" style={{ borderColor: PLUM }}>
            <p className="text-sm font-semibold text-foreground">After: Segments</p>
            <p className="mt-1 text-sm text-foreground/65">Reusable filters that apply to any event or campaign.</p>
          </div>
        </div>

        {/* How a segment works */}
        <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          <div className="flex flex-col gap-2 rounded-xl border border-border/60 p-3">
            <span className="cs-eyebrow">Every attendee</span>
            <div
              aria-hidden
              className="h-10 rounded-md opacity-50"
              style={{ backgroundImage: "radial-gradient(circle, currentColor 2px, transparent 2.5px)", backgroundSize: "9px 9px" }}
            />
            <b className="mt-auto text-sm">40,000 people</b>
          </div>
          <ArrowRight aria-hidden className="mx-auto h-4 w-4 rotate-90 self-center text-muted-foreground sm:rotate-0" />
          <div className="flex flex-col gap-2 rounded-xl border border-border/60 p-3">
            <span className="cs-eyebrow">Filter</span>
            <div className="flex flex-wrap gap-1 text-[11px]">
              {["Event", "Confirmed", "+ VP, Director"].map((c) => (
                <span key={c} className="rounded-full border border-border/70 px-2 py-0.5">
                  {c}
                </span>
              ))}
              <span className="rounded-full border border-red-700/40 px-2 py-0.5 text-red-700 dark:text-red-400">− Sponsors</span>
            </div>
            <b className="mt-auto text-sm">In decision order</b>
          </div>
          <ArrowRight aria-hidden className="mx-auto h-4 w-4 rotate-90 self-center text-muted-foreground sm:rotate-0" />
          <div className="flex flex-col gap-2 rounded-xl p-3 text-white" style={{ backgroundColor: PLUM }}>
            <span className="text-[11px] font-semibold tracking-[0.12em] text-white/70 uppercase">Saved segment</span>
            <span className="rounded-md bg-white/15 px-2 py-1 text-xs">Spring Summit, not exported</span>
            <b className="mt-auto text-sm">184 people</b>
          </div>
          <ArrowRight aria-hidden className="mx-auto h-4 w-4 rotate-90 self-center text-muted-foreground sm:rotate-0" />
          <div className="flex flex-col gap-2 rounded-xl border border-border/60 p-3">
            <span className="cs-eyebrow">Reuse</span>
            <span className="rounded-md border border-dashed border-foreground/30 px-2 py-1 text-xs">Next event</span>
            <span className="rounded-md border border-dashed border-foreground/30 px-2 py-1 text-xs">The one after</span>
            <b className="mt-auto text-sm">No rebuilding</b>
          </div>
        </div>
        <p className="cs-caption">Example numbers for illustration.</p>

        <ul className="grid gap-2 sm:grid-cols-4">
          {[
            [Timer, "Fast-moving MVP"],
            [FlaskConical, "No research team"],
            [ComponentIcon, "Existing design system"],
            [Shuffle, "New model, old habits"],
          ].map(([Icon, label]) => {
            const I = Icon as React.ElementType
            return (
              <li key={label as string} className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2.5 text-sm text-foreground/80">
                <I className="h-4 w-4 shrink-0 text-muted-foreground" />
                {label as string}
              </li>
            )
          })}
        </ul>
      </section>

      {/* Problem */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="cs-h2">Lists were slow to build and impossible to reuse</h2>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl bg-muted/40 p-5 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-5xl font-semibold tracking-tight whitespace-nowrap text-foreground">12–24 hrs</p>
          <p className="text-sm leading-relaxed text-foreground/70">
            for our team to build a single list for a customer (May 2026 product meeting). Lists couldn&apos;t exclude
            competitors or sponsors, combine CRM data, or be saved for the next event.
          </p>
        </div>
        <Shot
          src="/images/vendelux/segments-raw-attendee-table.png"
          alt="Raw table of confirmed attendees with job title, function, seniority, and organization columns"
          w={1316}
          h={856}
          caption="Before: raw attendee data, with no path to an audience."
          className="max-w-[620px]"
        />
        <blockquote className="border-l-2 border-foreground/30 pl-4 text-lg leading-snug text-foreground">
          How might we help marketers find, refine, and reuse audiences without rebuilding targeting every time?
        </blockquote>
      </section>

      {/* Role */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Eyebrow>My role</Eyebrow>
          <h2 className="cs-h2">I owned the design, end to end</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border-2 p-4" style={{ borderColor: PLUM }}>
            <p className="cs-eyebrow mb-2">I designed</p>
            <ul className="grid gap-1.5 text-sm text-foreground/85 sm:grid-cols-2">
              {["Segment library", "Filter sidebar", "Column picker", "Create and save modal", "Info tooltips", "Reusable components", "Next-iteration prototypes", "Engineering handoff"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className={cn("h-3.5 w-3.5 shrink-0", PLUM_TEXT)} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-xl border border-border/60 p-4 text-sm text-foreground/75">
            <p className="cs-eyebrow">I partnered with</p>
            <p><b className="text-foreground">PM:</b> requirements and priorities</p>
            <p><b className="text-foreground">Engineers:</b> feasibility, implementation, design system</p>
          </div>
        </div>
      </section>

      {/* Phase 1 */}
      <section id="phase-1" className="scroll-mt-32 space-y-10">
        <div className="space-y-2">
          <Eyebrow>Phase 1 · Apr – May 2026</Eyebrow>
          <h2 className="cs-h2">Building the foundation</h2>
        </div>

        <div className="space-y-4">
          <h3 className="cs-h3">Three ways to organize the filters</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Alphabetical", "Easy to scan, but ignores how marketers work.", false],
              ["Audience-first", "Great for “who,” slow for event follow-up.", false],
              ["Event-first", "Pick the event, then refine the audience.", true],
            ].map(([t, d, sel]) => (
              <div
                key={t as string}
                className={cn("rounded-xl p-4", sel ? "border-2" : "border border-border/60")}
                style={sel ? { borderColor: PLUM } : undefined}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  {sel && <Check className={cn("h-4 w-4", PLUM_TEXT)} />}
                  {t as string}
                </p>
                <p className="mt-1 text-sm text-foreground/65">{d as string}</p>
              </div>
            ))}
          </div>
          <p className="cs-caption">Compared as clickable prototypes in stakeholder reviews.</p>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-[260px_1fr]">
          <Shot
            src="/images/vendelux/segments-event-first-sidebar.png"
            alt="Segments sidebar: Event at the top with Attendance Status, Already Exported, and Speaker, then People, Organization, Sponsor, and Deals. 345 of 56,584 attendees match."
            w={482}
            h={894}
            className="mx-auto w-full max-w-[260px]"
          />
          <div className="space-y-3">
            <h3 className="cs-h3">Event goes first</h3>
            <p className="text-sm leading-relaxed text-foreground/70">
              Marketers pick the event before anything else, so it sits at the top with attendance, export, and speaker
              status. People, Organization, Sponsor, and Deals follow.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><span className={cn("font-semibold", PLUM_TEXT)}>1</span>Filters follow the order of the decision</li>
              <li className="flex gap-2"><span className={cn("font-semibold", PLUM_TEXT)}>2</span>A live count shows the result as filters change</li>
              <li className="flex gap-2"><span className={cn("font-semibold", PLUM_TEXT)}>3</span>Every category stays one click away</li>
            </ul>
          </div>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-[1fr_300px]">
          <Shot
            src="/images/vendelux/segments-library.png"
            alt="Segments library with Segments and Lists tabs, an explainer banner, search, Create Segment, and saved segments tagged People or Orgs"
            w={940}
            h={1078}
          />
          <div className="space-y-3">
            <h3 className="cs-h3">One home for saved audiences</h3>
            <p className="text-sm leading-relaxed text-foreground/70">Reuse starts where people find what they saved.</p>
            <ul className="flex flex-wrap gap-2 text-xs">
              {["Segments vs. Lists tabs", "“Reusable filters” explainer", "People / Orgs tags", "Search", "Favorite"].map((t) => (
                <li key={t} className="rounded-full border border-border/70 px-3 py-1 text-foreground/80">{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="cs-h3">Include vs. exclude, without relying on color</h3>
          <p className="text-sm leading-relaxed text-foreground/70">
            Included and excluded values shared one list, told apart only by color. I split them into explicit modes, with
            a count on every value.
          </p>
          <div className="grid max-w-[560px] gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <span className="cs-eyebrow">Before</span>
              <Shot src="/images/vendelux/segments-include-exclude-before.png" alt="Included and excluded values mixed in one list, distinguished only by color" w={4843} h={7892} />
            </div>
            <div className="space-y-1.5">
              <span className="cs-eyebrow">After</span>
              <Shot src="/images/vendelux/segments-include-exclude-after.png" alt="Separate Include and Exclude modes with search, and plus or minus values with counts" w={6947} h={7892} />
            </div>
          </div>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <h3 className="cs-h3">Specs first, then Figma MCP</h3>
            <p className="text-sm leading-relaxed text-foreground/70">
              I wrote specs for the tooltips and components, then generated the variants with the Figma MCP plugin API.
              I made the hierarchy, grouping, and labeling calls. The tool handled repetition.
            </p>
            <div className="rounded-xl border border-red-700/30 p-4">
              <p className="text-sm font-semibold text-foreground">Where I got it wrong</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                I used text under 12px to fit more in. An engineer flagged it. I went back to the minimum size and found
                density through labels and spacing instead.
              </p>
            </div>
          </div>
          <Shot
            src="/images/vendelux/segments-component-library-mcp-spec.png"
            alt="Component library spec: filter toggles, section headers, selected-count button, save and reset, and toasts with documented states"
            w={6775}
            h={8000}
          />
        </div>
      </section>

      {/* Phase 2 */}
      <section id="phase-2" className="scroll-mt-32 space-y-10">
        <div className="space-y-2">
          <Eyebrow>Phase 2 · May – Oct 2026</Eyebrow>
          <h2 className="cs-h2">Learning from real usage</h2>
        </div>

        <div id="results" className="scroll-mt-32 space-y-4 outline-none">
          <h3 className="cs-h3">Customers came back to their audiences</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.n} className="rounded-xl p-5 text-white" style={{ backgroundColor: PLUM }}>
                <p className="text-3xl font-semibold tracking-tight">{s.n}</p>
                <p className="mt-2 text-sm font-medium">{s.l}</p>
                <p className="mt-1 text-xs text-white/70">{s.c}</p>
              </div>
            ))}
          </div>
          <details className="group rounded-xl border border-border/60 px-4 py-3 text-sm">
            <summary className="cursor-pointer font-medium text-foreground">How these were measured</summary>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-foreground/70">
              <li>Product analytics, May 4 to Oct 25, 2026. Product-wide, not my design alone.</li>
              <li>A selection counts when the segment on an event page changed 4+ seconds after the last page view. Auto-loaded segments are excluded.</li>
              <li>Companies are grouped by email domain, excluding free email.</li>
              <li>Not measured: whether people found the right audience, or whether saves succeeded.</li>
            </ul>
          </details>
        </div>

        <div className="space-y-4">
          <h3 className="cs-h3">But the filters still confused people</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="cs-eyebrow">October design review</p>
              <ol className="space-y-2">
                {ISSUES.map((x, i) => (
                  <li key={x} className="flex gap-3 rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground/80">
                    <span className="font-semibold text-red-700 dark:text-red-400">{i + 1}</span>
                    {x}
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-2">
              <p className="cs-eyebrow">What customers said</p>
              {QUOTES.map((q) => (
                <p key={q} className="rounded-2xl rounded-tl-sm border border-border/60 bg-foreground/[0.03] px-4 py-2.5 text-sm italic text-foreground/85">
                  &ldquo;{q}&rdquo;
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phase 3 */}
      <section id="phase-3" className="scroll-mt-32 space-y-10">
        <div className="space-y-2">
          <Eyebrow>Phase 3 · Oct 2026</Eyebrow>
          <h2 className="cs-h2">Designing the next iteration</h2>
          <p className="text-sm text-foreground/65">
            Three interaction patterns on the same filters and counts. Try excluding &ldquo;Intern&rdquo; in each.
          </p>
        </div>
        <Prototype view="three" title="Three clickable interaction patterns for include and exclude" initial={700} />

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="cs-h3">Proposed: a visible filter list, with the choice next to the value</h3>
            <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
              Handed off · not shipped as of Oct 26, 2026
            </span>
          </div>
          <p className="text-sm text-foreground/65">Each numbered change answers an issue from the October review. It&apos;s clickable too.</p>
        </div>
        <Prototype view="prop" title="Proposed Segments filter sidebar with callouts" initial={840} />
        <a
          href={PROTO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
        >
          Open the prototype full screen
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>

      {/* Learned */}
      <section className="space-y-4 rounded-2xl bg-muted/40 p-6">
        <Eyebrow>What I learned</Eyebrow>
        <p className="text-lg leading-snug text-foreground">
          Control isn&apos;t enough. People need to see what their filters are doing.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          Customers proved they wanted to reuse audiences, and showed me reuse breaks down when they can&apos;t tell
          which filters are active, how many people match, or whether a change saved. Next, I&apos;d measure task success
          and time to the right audience.
        </p>
      </section>
    </article>
  )
}
