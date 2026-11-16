"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CaseHero } from "@/components/case-hero"
import { Section, StatusCards } from "@/components/vendelux/kit"

/** The prototype's own accent, used sparingly so the planner screens and the page read as one story. */
const INK = "#4B47C9"
const INK_BG = "bg-[#ECEAF9] text-[#3A3591] dark:bg-[#4B47C9]/25 dark:text-[#c9c6ff]"

function Ref({ n }: { n: number }) {
  return (
    <a href={`#src-${n}`} className="ml-0.5 align-super text-[10px] font-semibold text-foreground/45 no-underline hover:text-foreground">
      [{n}]
    </a>
  )
}

/** One working phone. The prototype lives in a static page so the same code runs here and on its own. */
function Phone({ v, label, className }: { v: "final" | "a" | "b" | "c"; label: string; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[330px]", className)}>
      <div className="aspect-[390/844] w-full">
        <iframe src={`/prototypes/adhd-planner.html?v=${v}`} title={label} loading="lazy" className="h-full w-full border-0 bg-transparent" />
      </div>
    </div>
  )
}

const DECISIONS = ["Open app", "Title", "Date", "Time", "Duration", "Reminder"]

function SixDecisions() {
  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-5">
      <p className="cs-eyebrow">Saving one reminder, most apps</p>
      <ol className="flex flex-wrap items-center gap-1.5">
        {DECISIONS.map((d, i) => (
          <li key={d} className="flex items-center gap-1.5">
            <span className={cn("rounded-lg border px-2.5 py-1.5 text-xs", i >= 3 ? "border-dashed border-foreground/25 text-foreground/45 line-through decoration-foreground/30" : "border-border/70 text-foreground/80")}>{d}</span>
            {i < DECISIONS.length - 1 && <span aria-hidden className="text-foreground/30">→</span>}
          </li>
        ))}
      </ol>
      <p className="text-sm text-foreground/60">Somewhere around decision three, the task dies.</p>
      <div className="border-t border-border/60 pt-4">
        <p className="cs-eyebrow mb-2">Saving it here</p>
        <span className={cn("inline-block rounded-lg px-2.5 py-1.5 text-xs font-medium", INK_BG)}>&ldquo;laundry tonight, email prof at 3, renew passport sometime&rdquo;</span>
      </div>
    </div>
  )
}

const STATS: { n: string; body: React.ReactNode }[] = [
  { n: "16.7%", body: <>of people with ADHD still use their planner after 3 months, per a Brazilian study cited by SingularityApp.<Ref n={2} /></> },
  { n: "6", body: <>decisions to save one reminder in most apps. Each one taxes the executive function ADHD impairs.</> },
  { n: "10.8%", body: <>of the variance in adult ADHD quality of life came from organization-in-time factors, including how people feel about time failures.<Ref n={1} /></> },
]

const INSIGHTS: { title: string; body: React.ReactNode; rule: string }[] = [
  { title: "Time is invisible", body: <>Barkley frames ADHD as a disorder of self-regulation across time. A deadline weeks away doesn&rsquo;t feel real until it&rsquo;s hours away.<Ref n={3} /></>, rule: "Show time as space you can see." },
  { title: "A closed planner is a forgotten planner", body: <>Prospective memory struggles mean the planner can&rsquo;t help if you forget to open it.<Ref n={4} /></>, rule: "The app comes to you. Reminders on by default." },
  { title: "The undone list is where systems die", body: <>Yesterday&rsquo;s unfinished tasks pile up as overdue debt, and people quit rather than face them.<Ref n={5} /></>, rule: "Nothing goes overdue. It rests until tomorrow." },
  { title: "Shame is part of the problem", body: <>How people feel about time failures predicts well-being, beyond the diagnosis itself.<Ref n={1} /></>, rule: "No red walls, no broken streaks." },
  { title: "Novelty starts, friction stops", body: <>Attention runs on interest, novelty, challenge and urgency. New planners get a burst of attention, then fade.<Ref n={6} /></>, rule: "Zero setup on day one." },
  { title: "One place, few steps", body: <>Coaches and community writers agree: ADHD-friendly tools are visible, simple and forgiving.<Ref n={7} /></>, rule: "One input for everything." },
]

const COMPETITORS: { name: string; model: string; love: React.ReactNode; hate: React.ReactNode }[] = [
  { name: "Tiimo", model: "Clock blocks with icons and a live timer", love: <>Visual timeline, transition reminders. iPhone App of the Year 2025<Ref n={8} /></>, hate: <>Price, timer bugs<Ref n={9} />. Setup takes the executive function users lack<Ref n={8} /></> },
  { name: "Structured", model: "Vertical clock line, inbox drawer", love: <>Gaps show as real space; calm first launch<Ref n={10} /></>, hate: <>Recurring tasks and Replan behind Pro<Ref n={10} />; fiddly drag placement</> },
  { name: "Llama Life", model: "Ordered queue, a timer per task", love: <>The projected finish time helps with time blindness<Ref n={11} /></>, hate: <>No fixed anchors; users ask for routines at set times<Ref n={11} /></> },
  { name: "Sunsama", model: "Day columns plus calendar, guided ritual", love: "Calm daily planning ritual", hate: <>Price; the daily ritual is hard to sustain<Ref n={12} /></> },
  { name: "Clever Fox", model: "Paper page with hourly rows", love: "Prompts remove decision fatigue", hate: "One fixed layout; paper can't remind you" },
  { name: "Goblin Tools", model: "Single task, nested AI breakdown", love: "Instant task breakdown; nothing to fall behind on", hate: "A utility, not a planner" },
]

/** Where the audited products compete, and the empty column this planner takes. */
function EffortMap() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card p-5">
      <div className="space-y-2">
        <p className="cs-eyebrow">How the day looks</p>
        {COMPETITORS.map((c) => (
          <span key={c.name} className="block rounded-lg border border-border/70 px-2.5 py-1.5 text-xs text-foreground/75">{c.name}</span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="cs-eyebrow">How tasks get in</p>
        <span className="block flex-1 rounded-lg border border-dashed border-foreground/25 px-2.5 py-1.5 text-xs text-foreground/45">No one, from the six I audited</span>
        <span className="block rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white" style={{ background: INK }}>This planner</span>
      </div>
    </div>
  )
}

const HYPOTHESES = [
  { tag: "H1 · Capture", bet: "If people can dump tasks in plain language and the app picks the times, they'll capture more of what's in their head.", measure: "Tasks captured per day, seconds per task, vs. manual entry." },
  { tag: "H2 · Approve, don't build", bet: "Showing proposals as dashed blocks on the timeline before saving will earn more trust than silent auto-scheduling.", measure: "Batch acceptance rate, edits per batch, self-reported trust." },
  { tag: "H3 · Default reminders", bet: "Reminders on by default, with no setup, will lower the number of forgotten tasks.", measure: "Completion rate of captured tasks within their day." },
  { tag: "H4 · Clock as the frame", bet: "People with fixed commitments will prefer a clock timeline to a pure queue, as long as drift doesn't punish them.", measure: "Preference ranking across drafts A, B, C and A+." },
  { tag: "H5 · No overdue", bet: "Moving unfinished work to Tomorrow instead of marking it overdue will bring more people back after a bad day.", measure: "Next-day return rate after a low-completion day." },
  { tag: "H6 · The forgotten step", bet: "Adding the second step people forget, like moving laundry to the dryer, will feel helpful, not intrusive.", measure: "Removal rate of auto-added steps." },
]

const DRAFTS = {
  a: {
    tab: "A · Clock timeline",
    from: "Inspired by Structured and Tiimo. Every task sits at a clock time, gaps show as free space, and an inbox holds tasks without a time.",
    bet: "Seeing the whole day on a clock makes time feel real.",
    added: "A one-tap “Running late +15m” that shifts flexible tasks and leaves fixed events alone.",
    tryIt: "Tap “Time passes” three times without doing anything, then look at the day.",
    tradeoff: "Strong sense of the day. But drift turns tasks into “Missed” and “Overlaps” warnings, which rebuilds the shame loop I wanted to remove.",
    verdict: "Kept the clock as the frame: fixed commitments need fixed positions. Changed capture and drift so they stop costing effort.",
  },
  b: {
    tab: "B · Queue with finish time",
    from: "Inspired by Llama Life. No clock grid: one task at a time with a countdown, what's next, and a live “You'll finish around…” line.",
    bet: "A projected finish time shows time without slots you can fall behind on.",
    added: "Quick add with a duration at the end (“Call mom 10”) and a Not now list.",
    tryIt: "Start the timer, tap Not now, and watch the finish time update.",
    tradeoff: "The calmest draft. But the 11:00 meeting becomes just another task in the list, and I lost the shape of my day.",
    verdict: "Kept the finish-time idea and one-line quick add, which became the brain dump. Dropped the clock-free list.",
  },
  c: {
    tab: "C · Anchors and flow",
    from: "A hybrid: pinned events stay at fixed times, and flexible tasks reflow around them on their own.",
    bet: "Auto-reflow means a late start never breaks the plan.",
    added: "A fresh-start banner, “Break it down” steps, a heads-up when a timer will run into a meeting, and “won't fit today, rest in Later.”",
    tryIt: "Tap “Time passes” and watch flexible tasks slide around the pinned ones.",
    tradeoff: "The most forgiving draft, but also the busiest. Tasks moving on their own can feel like losing control.",
    verdict: "Kept “nothing goes overdue” and the fresh-start tone. Changed it so the app proposes moves and the user approves them.",
  },
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
      <div className="grid items-start gap-8 md:grid-cols-[300px_minmax(0,1fr)]">
        <Phone key={k} v={k} label={`Interactive prototype, draft ${k.toUpperCase()}`} className="md:max-w-[300px]" />
        <div className="space-y-3">
          <p className="text-base text-foreground/75">{d.from}</p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["The bet", d.bet],
                ["What I added", d.added],
                ["Try this", d.tryIt],
                ["Tradeoff", d.tradeoff],
              ] as const
            ).map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-border/60 bg-card p-4">
                <dt className="cs-eyebrow mb-1.5">{t}</dt>
                <dd className="text-sm text-foreground/75">{b}</dd>
              </div>
            ))}
          </dl>
          <p className="rounded-2xl bg-amber-500/15 p-4 text-sm text-amber-900 dark:text-amber-200">{d.verdict}</p>
        </div>
      </div>
    </div>
  )
}

const FINAL: { title: string; body: string; h?: string }[] = [
  { title: "The chat sits under the timeline", body: "You watch tasks land in your day while you type, so you never wonder where something went.", h: "H2" },
  { title: "Text is the only required field", body: "Time, duration and reminder come from the sentence or from defaults: laundry 40 min, a call 15 min. A number at the end overrides it.", h: "H1" },
  { title: "Fuzzy words map to windows", body: "“Tonight” means after 6pm, “at 3” pins 3:00, and “sometime” goes to tomorrow. People talk in windows, not timestamps.", h: "H1" },
  { title: "Proposals look different until you approve them", body: "Dashed border and a New tag. One tap approves the batch, the X removes one, and Undo clears everything.", h: "H2" },
  { title: "Reminders are on by default", body: "The bell shows only after approval, so it reads as a promise, not a setting.", h: "H3" },
  { title: "The app adds the step you forget", body: "“Laundry” also schedules “Move laundry to dryer” 45 minutes later. ADHD brains drop the second step, not the first.", h: "H6" },
  { title: "Overflow rests in Tomorrow, never overdue", body: "Anything that doesn't fit today becomes a soft chip for tomorrow. No red counts.", h: "H5" },
  { title: "Calm by default", body: "One accent color, no streaks, and a short “Nice one” instead of confetti. 44px touch targets throughout.", h: "H5" },
]

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

export function AdhdPlannerCaseStudy() {
  return (
    <div className="space-y-24">
      <CaseHero
        slug="adhd-planner"
        title="Designing a Day Planner for ADHD Brains"
        roles={["Product designer, solo"]}
        tagline="An ADHD day planner that turns a messy brain dump into a scheduled, reminded day. Saving a task costs one sentence instead of six decisions."
        when="Concept sprint, Nov 2026"
        forWhom="Adults with ADHD who drop small tasks"
        summary="User research, a competitive audit of six planners, and four working prototypes. Status: concept, usability testing next."
      />

      <Section eyebrow="Try it" title="The phone works. Dump a messy list into the chat.">
        <div className="grid items-center gap-8 md:grid-cols-[300px_minmax(0,1fr)]">
          <Phone v="final" label="Interactive prototype, final A+ direction" className="md:max-w-[300px]" />
          <div className="space-y-3">
            <p className="text-base text-foreground/75">Tap &ldquo;Try a sample dump,&rdquo; or type your own, like:</p>
            <p className={cn("inline-block rounded-xl px-3 py-2 text-sm font-medium", INK_BG)}>laundry tonight, email prof at 3, renew passport sometime</p>
            <p className="cs-caption">Proposals land on the timeline with a dashed border. &ldquo;Looks good&rdquo; saves them with reminders on.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="01 · The problem" title="Planners fail people with ADHD before the planning starts, and again after the plan breaks.">
        <p className="max-w-[65ch] text-base text-foreground/75">I kept losing small tasks: laundry, a text back, an email to a professor. I knew they mattered. I just couldn&rsquo;t make myself open an app, type a title, pick a day, pick a time, guess a duration and set a reminder. That chain of tiny decisions is where the task dies. Research says I&rsquo;m not alone.</p>
        <div className="grid items-stretch gap-3 md:grid-cols-2">
          <SixDecisions />
          <div className="grid gap-3">
            {STATS.map((s) => (
              <div key={s.n} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4">
                <span className="w-16 shrink-0 text-2xl font-semibold tracking-tight tabular-nums" style={{ color: INK }}>{s.n}</span>
                <p className="text-sm text-foreground/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="02 · Research" title="Six insights, six design rules.">
        <p className="max-w-[65ch] text-base text-foreground/75">I reviewed clinical research, ADHD coaching literature and community writing. Each insight became a rule I held every screen to.</p>
        <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((x) => (
            <div key={x.title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4">
              <h3 className="cs-h3">{x.title}</h3>
              <p className="flex-1 text-sm text-foreground/70">{x.body}</p>
              <p className={cn("rounded-lg px-3 py-2 text-xs font-medium", INK_BG)}>Rule: {x.rule}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="03 · Competitive landscape" title="Everyone competes on how the day looks.">
        <p className="max-w-[65ch] text-base text-foreground/75">I audited six products across four layout models and read their app store and community reviews.</p>
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 text-xs text-foreground/50">
                {["Product", "Layout model", "What users love", "What users complain about"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c) => (
                <tr key={c.name} className="border-b border-border/40 align-top last:border-0">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-foreground/70">{c.model}</td>
                  <td className="px-4 py-3 text-foreground/70">{c.love}</td>
                  <td className="px-4 py-3 text-foreground/70">{c.hate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid items-stretch gap-3 sm:grid-cols-3">
          {[
            ["Users stay for visible time", "The timeline and the finish time get the strongest praise."],
            ["Users leave over setup", "Building the plan is the hard part, and most apps put it on day one."],
            ["Users leave over bad days", "Repair comes as a paid add-on or a manual chore, never as part of the layout."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-border/60 bg-card p-4">
              <h3 className="cs-h3 mb-1.5">{t}</h3>
              <p className="text-sm text-foreground/70">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="04 · Opportunity" title="Nobody competes on how things get into the day.">
        <div className="grid items-stretch gap-3 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-6 rounded-3xl p-6 text-white" style={{ background: INK }}>
            <p className="text-lg leading-snug font-medium text-balance">Every product I audited assumes the user will enter tasks properly. For ADHD users, that entry step is exactly where things fall apart.</p>
            <p className="text-sm text-white/75">If capture costs one sentence and the app makes the small decisions, the timeline finally has something to show.</p>
          </div>
          <EffortMap />
        </div>
        <div className="grid items-stretch gap-3 sm:grid-cols-3">
          {["How might we make capturing a task cost one sentence?", "How might we let the app decide when, without taking away control?", "How might a plan bend on a bad day without turning red?"].map((q) => (
            <p key={q} className="rounded-2xl border border-border/60 bg-card p-4 text-base font-medium leading-snug">{q}</p>
          ))}
        </div>
      </Section>

      <Section eyebrow="05 · Hypotheses" title="What I believe, and how I'll find out.">
        <p className="max-w-[65ch] text-base text-foreground/75">These are bets, not findings. Each one has a metric for the next round of testing.</p>
        <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HYPOTHESES.map((h) => (
            <div key={h.tag} className="flex flex-col gap-2.5 rounded-2xl border border-border/60 bg-card p-4">
              <span className={cn("self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold", INK_BG)}>{h.tag}</span>
              <p className="flex-1 text-sm text-foreground/80">{h.bet}</p>
              <p className="text-xs text-foreground/50">Measure: {h.measure}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="06 · Explorations" title="Three drafts, three ways to organize a day.">
        <p className="max-w-[65ch] text-base text-foreground/75">I built each layout as a working prototype with the same tasks, colors and celebration, so only the layout changes. Each one has a &ldquo;Time passes&rdquo; control to simulate a slipping day.</p>
        <Drafts />
      </Section>

      <Section eyebrow="07 · Final direction" title="A+ · The clock you can talk to.">
        <p className="max-w-[65ch] text-base text-foreground/75">A+ keeps draft A&rsquo;s clock and moves the effort into capture. You dump everything in one message. The app proposes times, durations and reminders, and shows them on the timeline before anything is saved.</p>
        <div className="grid items-start gap-8 md:grid-cols-[300px_minmax(0,1fr)]">
          <Phone v="final" label="Interactive prototype, final A+ direction" className="md:sticky md:top-28 md:max-w-[300px]" />
          <ol className="space-y-2.5">
            {FINAL.map((f, i) => (
              <li key={f.title} className="flex gap-3 rounded-2xl border border-border/60 bg-card p-4">
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold", INK_BG)}>{i + 1}</span>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="cs-h3">{f.title}</h3>
                    {f.h && <span className="shrink-0 text-[11px] font-semibold" style={{ color: INK }}>{f.h}</span>}
                  </div>
                  <p className="text-sm text-foreground/70">{f.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="08 · Test plan" title="How I'll validate it.">
        <div className="grid items-stretch gap-3 sm:grid-cols-2">
          {[
            ["Who and how", "5 to 8 adults who self-identify as having ADHD. 30-minute moderated remote sessions, think-aloud. Each person tries A, B, C and A+ in a rotated order."],
            ["Tasks", "Add the five things on your mind right now. Tap “Time passes” three times, then fix your day. Find what's happening tomorrow. Rank the four versions."],
            ["Metrics", "Seconds to capture five tasks. Batch acceptance and edit rate. Preference ranking. One-word feeling after a slipped day."],
            ["Success looks like", "A+ captures five tasks in under 30 seconds, most batches get approved with at most one edit, and nobody describes a slipped day as “failed” or “behind.”"],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="cs-eyebrow mb-1.5">{t}</p>
              <p className="text-sm text-foreground/75">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="09 · Limits and next steps" title="What's real, and what's next.">
        <StatusCards
          items={[
            { tag: "What the prototype fakes", tone: "open", body: "Simple keyword rules stand in for a language model. The mic drops in a scripted example. Data resets on reload." },
            { tag: "Next: capture outside the app", tone: "next", body: "A lock-screen widget, Siri or the Action Button, and a share-sheet option for texts and screenshots." },
            { tag: "Next: onboarding as the first dump", tone: "next", body: "The first screen is the chat: “What's on your mind?” The first plan builds itself, with no setup wizard." },
          ]}
        />
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
