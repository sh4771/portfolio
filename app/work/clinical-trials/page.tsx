import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

const problems = [
  {
    title: "Signal overload",
    body: "Trial teams see too many metrics at once, so critical shifts in enrollment or safety signals get buried.",
  },
  {
    title: "Opaque AI outputs",
    body: "Recommendations from models felt like black boxes; reviewers could not trace why a suggestion appeared.",
  },
  {
    title: "High-stakes hesitation",
    body: "When decisions affect patients and timelines, unclear hierarchy made people second-guess the next action.",
  },
  {
    title: "Fragmented context",
    body: "Protocol details, cohort status, and historical runs lived in different views, slowing confident calls.",
  },
]

const decisionPillars = [
  {
    title: "Prioritized insights",
    body: "Surfaced the few indicators that mattered for the current decision moment, not every chart in the warehouse.",
  },
  {
    title: "Transparent AI",
    body: "Structured rationale, confidence, and source data next to recommendations so reviewers could audit quickly.",
  },
  {
    title: "Actionable paths",
    body: "Every summary pointed to a clear next step: drill down, escalate, or document, with guardrails for compliance.",
  },
  {
    title: "Trust through consistency",
    body: "Repeated language, spacing, and patterns across modules so dense domains felt predictable, not chaotic.",
  },
]

const competitors = [
  {
    name: "Legacy analytics suites",
    pros: "Deep reporting, enterprise integrations",
    cons: "Heavy setup, weak narrative for daily decision rituals",
  },
  {
    name: "Generic BI dashboards",
    pros: "Flexible charts",
    cons: "Little trial-specific semantics or protocol-aware defaults",
  },
  {
    name: "Point AI tools",
    pros: "Fast predictions",
    cons: "Thin explainability and weak handoff into regulated workflows",
  },
]

const flowSteps = [
  "Land on trial health snapshot with alerts and confidence tags",
  "Filter by site, cohort, or endpoint to align the room on one slice",
  "Open an AI recommendation with rationale, inputs, and version history",
  "Compare against protocol thresholds and past decision notes",
  "Log the decision, assign follow-ups, and export an audit-friendly summary",
]

const challenges = [
  {
    title: "Balancing depth with speed",
    body: "We had to serve both executives scanning status and analysts validating numbers without duplicating entire EDC workflows in the prototype.",
  },
  {
    title: "Language for uncertainty",
    body: "Copy and UI states had to communicate model confidence and data freshness without implying false precision in a regulated space.",
  },
]

const feedback = [
  {
    who: "Design critique",
    note: "Asked for stronger visual grouping between human-authored notes and model-generated suggestions to reduce misreads.",
  },
  {
    who: "Peer review",
    note: "Pushed for inline definitions of trial jargon so occasional stakeholders could follow the dashboard in live readouts.",
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground transition-colors duration-300 md:px-8">
      <div className="mx-auto max-w-[900px] space-y-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <header className="space-y-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-normal tracking-tight md:text-3xl">
                Designing Decision Clarity in Clinical Trial Systems
              </h1>
              <p className="text-sm text-foreground/50">UI/UX Design @ Adobe Designathon</p>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4 text-sm">
              <div>
                <span className="mb-1 block text-xs text-foreground/40">Team</span>
                <span className="text-foreground/70">2 Designers</span>
              </div>
              <div>
                <span className="mb-1 block text-xs text-foreground/40">Timeline</span>
                <span className="text-foreground/70">April 2026</span>
              </div>
              <div>
                <span className="mb-1 block text-xs text-foreground/40">What I did</span>
                <span className="text-foreground/70">Research, UX/UI Design, Strategy, Prototyping</span>
              </div>
            </div>

            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-foreground/60">
              Led research and end-to-end design of a clinical trial intelligence platform focused on improving
              decision-making in high-stakes, data-heavy environments. Conducted user interviews to define target
              users and their decision needs, then developed a design strategy centered on trust, clarity, and
              actionability. Redesigned the dashboard experience to prioritize key insights, increase transparency
              of AI-generated recommendations, and guide users toward confident decisions.
            </p>

            <div className="relative mt-8 h-[280px] w-full overflow-hidden rounded-2xl border border-border/60 md:h-[360px] lg:h-[420px]">
              <Image
                src="/images/clinical-trials-hero.svg"
                alt="Abstract placeholder for clinical trial dashboard mockup"
                width={1200}
                height={675}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Prototype</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Live prototype walkthrough</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Screen recording of the high-fidelity dashboard and flows from the design sprint.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]">
            <video
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black object-contain"
            >
              <source src="/videos/clinical-trials-prototype.mov" type="video/quicktime" />
              <source src="/videos/clinical-trials-prototype.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Problem · Goals</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">What we needed to solve</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]"
              >
                <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 md:p-8">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Insight</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Decision quality improved when we treated the dashboard as a briefing, not a warehouse: fewer
                default widgets, stronger sequencing, and explicit ties between data freshness and any AI output
                on screen.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 md:p-8">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Strategy</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Anchor every view on who is deciding what today, surface confidence and lineage beside
                recommendations, and funnel users into documented actions that match how trial teams already
                escalate issues offline.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Decision design</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">How we supported confident calls</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Four principles steered layout, copy, and component choices from sketches through the prototype.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decisionPillars.map((t) => (
              <div
                key={t.title}
                className="flex flex-col rounded-2xl border border-border/60 bg-card p-5 text-left"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-foreground/25" />
                <h3 className="text-sm font-medium text-foreground">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Reference analysis</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Landscape</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40">
                  <th className="px-4 py-3 font-medium text-foreground">Category</th>
                  <th className="px-4 py-3 font-medium text-foreground">Pros</th>
                  <th className="px-4 py-3 font-medium text-foreground">Cons</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((row) => (
                  <tr key={row.name} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.pros}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Visual system</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Color and typography</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-border/60 p-6">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Palette</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-border/60 bg-foreground shadow-sm" />
                  <span className="text-[10px] text-muted-foreground">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-border/60 bg-card shadow-sm" />
                  <span className="text-[10px] text-muted-foreground">Surface</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-border bg-muted shadow-sm" />
                  <span className="text-[10px] text-muted-foreground">Muted</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-border/60 p-6">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Type scale</p>
              <p className="text-3xl font-light text-foreground">Display</p>
              <p className="text-xl font-medium text-foreground">Section title</p>
              <p className="text-base text-foreground">Body emphasis</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Supporting copy tuned for dense tables, alerts, and rationale blocks.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Key flow</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Dashboard decision path</h2>
          </div>
          <ol className="space-y-4">
            {flowSteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4 md:items-center md:p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Design challenges</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Where it got hard</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border/60 bg-muted/25 p-6 md:p-8">
                <h3 className="text-base font-medium text-foreground">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Feedback</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">What we heard</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {feedback.map((f) => (
              <blockquote
                key={f.who}
                className="rounded-2xl border-l-4 border-foreground/25 bg-muted/30 px-5 py-6"
              >
                <p className="text-sm font-medium text-foreground">{f.who}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Final UI</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Key screens</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Replace tiles with exported frames from your prototype when ready.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex aspect-[9/16] flex-col items-center justify-center rounded-xl border border-border/60 bg-card p-2 text-center shadow-sm"
              >
                <span className="text-[10px] font-medium text-foreground/70">Screen {n}</span>
                <span className="mt-1 text-[10px] leading-tight text-muted-foreground">Add export</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-6 rounded-[24px] border border-border/60 bg-muted/20 p-8 md:rounded-[32px] md:p-10">
            <div className="space-y-2">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Reflection</p>
              <h2 className="text-lg font-medium tracking-tight md:text-xl">Outcomes and next steps</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">What improved:</span> A clearer hierarchy between
                monitoring metrics, model-assisted suggestions, and human notes, with explicit freshness and
                confidence so reviewers spend less time decoding the UI.
              </p>
              <p>
                <span className="font-medium text-foreground">If we had more time:</span> Co-design with clinical
                operations on real protocol templates, validate alert thresholds with historical trial data, and
                run moderated sessions on escalation and audit export flows.
              </p>
              <p>
                <span className="font-medium text-foreground">Takeaway:</span> In regulated, high-stakes domains,
                transparency beats novelty: show the why behind every recommendation, and design empty states and
                errors that preserve trust when data is incomplete.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-border/80 pt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">Continue</p>
          <Link
            href="/#work"
            className="mt-2 inline-block text-base tracking-tight text-foreground transition-colors hover:text-foreground/70"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
