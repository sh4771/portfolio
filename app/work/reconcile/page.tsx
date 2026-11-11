import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, EyeOff, Lightbulb, Play, Rocket, ShieldCheck, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { Bridge, Decisions, EdgeCaseGrid, EvidenceLadder, LivePrototype, PositionMap, TheQuestion, TraceMap, Versions } from "@/components/reconcile/story"

export const metadata = {
  title: "Reconcile · Violet Hyun",
  description:
    "A payout reconciliation app that tells a marketplace finance manager why a seller payout differs from what the ledger expected, without touching the numbers.",
}

const P = "text-sm text-foreground/60 text-pretty leading-relaxed"
const B = "font-medium text-foreground/90"

function Head({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="cs-eyebrow">{eyebrow}</p>
      <h2 className="cs-h2">{title}</h2>
      {children}
    </div>
  )
}

const GAPS = [
  { icon: Users, k: "No per-seller view", v: "Tools work per bank line, GL entry or period. Marketplaces think in sellers." },
  { icon: EyeOff, k: "No sense of how sure", v: "Some tools show their reasoning. None labels a cause as proven or inferred." },
  { icon: Clock, k: "No arrival date", v: "Tools hide timing gaps, but that's exactly what people ask finance about." },
]

const REFLECTION = [
  {
    n: "01",
    icon: Lightbulb,
    ring: "from-foreground/12 to-foreground/5 ring-foreground/10",
    tint: "text-foreground/80",
    title: "What I learned",
    body: (
      <>
        <p>
          Writing out <strong className={B}>45 edge cases</strong> did more than catch bugs. Three of them,
          causes that don&apos;t add up, overdue timing and two people assigning at once, made me <strong className={B}>rework a decision</strong>.
        </p>
        <p>
          In finance, one number that looks wrong sends people back to Excel. I started treating every edge case as a{" "}
          <strong className={B}>trust problem</strong>, and that framing decided what the product says out loud.
        </p>
      </>
    ),
  },
  {
    n: "02",
    icon: ShieldCheck,
    ring: "from-violet-500/15 to-violet-600/5 ring-violet-500/20",
    tint: "text-violet-800/85 dark:text-violet-200/90",
    title: "If I had more time",
    body: (
      <>
        <p>
          I would design the cases I ranked next: <strong className={B}>reopening a case after the data changes</strong>, and an
          expired connection that leaves every number quietly stale.
        </p>
        <p>
          I&apos;m curious how a rule should behave months later, when the fee it learned <strong className={B}>changes on its own</strong>.
        </p>
      </>
    ),
  },
  {
    n: "03",
    icon: Rocket,
    ring: "from-sky-500/15 to-sky-600/5 ring-sky-500/25",
    tint: "text-sky-800/85 dark:text-sky-200/90",
    title: "Next step",
    body: (
      <>
        <p>
          I plan to run <strong className={B}>five moderated sessions</strong> with marketplace finance and payment ops people, on their
          own phones. I haven&apos;t run them yet.
        </p>
        <p>
          I wrote each hypothesis with the signal that would prove it wrong, so every session gives one of them a{" "}
          <strong className={B}>real chance to fail</strong>.
        </p>
      </>
    ),
  },
]

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-[900px] space-y-24 px-6">
          <Link href="/#work" className="!mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          {/* Hero */}
          <header id="overview" className="scroll-mt-32 space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="cs-h1">Explaining Why a Seller Payout Doesn&apos;t Match</h1>
                <p className="text-sm text-text-secondary">Product Design · Fintech, solo project</p>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4 text-sm">
                <div>
                  <span className="mb-1 block text-xs text-text-secondary">Context</span>
                  <span className="text-foreground/70">Self-initiated fintech project</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground/40">Timeline</span>
                  <span className="text-foreground/70">November 2026</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground/40">What I did</span>
                  <span className="text-foreground/70">Research, Product Strategy, UX/UI Design, Prototyping</span>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                Led research and end-to-end design of Reconcile, a payout reconciliation app that tells a marketplace finance manager why a
                seller payout differs from what the ledger expected.
              </p>

              <div className="grid max-w-2xl gap-8 border-t border-border/40 pt-8 sm:grid-cols-2 sm:gap-10">
                <div className="space-y-2">
                  <h2 className="cs-h2">Product scope</h2>
                  <p className={P}>
                    A read-only connection to the processor and the ledger, a bridge that explains each payout to the cent, evidence labels on
                    every cause, shared cases for the team, and rules that clear repeat differences.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="cs-h2">Use case</h2>
                  <p className={P}>
                    A finance manager sees a seller payout come in $51.62 short. She needs to know which part is late, which part is gone, and
                    how sure the app is, so she can close it without rebuilding a spreadsheet.
                  </p>
                </div>
              </div>

              <a href="#prototype" className="inline-flex items-center gap-2 pt-1 text-sm text-foreground/60 transition-colors hover:text-foreground">
                <Play className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.75} />
                Try the live prototype
              </a>

              <div className="mt-8 overflow-hidden rounded-2xl">
                <Image src="/images/reconcile/cover.webp" alt="Reconcile splash screen and the Why it differs screen" width={1440} height={1080} priority className="h-auto w-full" sizes="(max-width: 900px) 100vw, 900px" />
              </div>
            </div>

            {/* Problem */}
            <div className="space-y-6 rounded-2xl border border-border/50 p-6 md:p-8">
              <div className="space-y-2">
                <h2 className="cs-h2">The payout lands. The numbers don&apos;t match.</h2>
                <p className={P}>
                  Every payout cycle, the processor pays a seller a different amount than the ledger expected. Finance has to explain the gap,
                  and today they rebuild that answer by hand in a spreadsheet.
                </p>
              </div>
              <TheQuestion />
            </div>

            {/* Approach */}
            <Head eyebrow="Approach" title="How I approached the problem">
              <p className={P}>
                I studied six reconciliation and payments products and one practitioner thread to see how finance teams explain a payout that
                doesn&apos;t match.
              </p>
              <p className={P}>
                Every tool I looked at matched records well. None of them told finance <em>why</em> a payout differed. That suggested the hard
                part wasn&apos;t matching; it was explaining, and showing how sure the explanation is.
              </p>
            </Head>

            <div className="grid items-center gap-10 md:grid-cols-[220px_1fr] md:gap-12">
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-normal md:text-4xl">6</span>
                  <div>
                    <p className="text-base font-medium">products studied</p>
                    <p className="text-xs text-foreground/50">plus 1 practitioner thread</p>
                  </div>
                </div>
                <p className={P}>I mapped each one by what it explains and who it serves.</p>
                <p className="border-t border-border/50 pt-3 text-xs text-foreground/40">Competitive positioning</p>
              </div>
              <PositionMap />
            </div>
          </header>

          {/* 01 · Gaps */}
          <section id="research" className="scroll-mt-32 space-y-8">
            <Head eyebrow="01 · Research gaps" title="What do today's tools leave out?">
              <p className={P}>Three gaps showed up across every product I studied.</p>
            </Head>
            <div className="space-y-5 rounded-2xl border border-foreground/10 bg-muted/15 p-6 md:p-8">
              <div className="space-y-1">
                <span className="cs-eyebrow">Key takeaway</span>
                <p className="text-sm font-medium text-foreground/90">The challenge underneath the research</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {GAPS.map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex flex-col gap-2 rounded-xl border border-border/50 bg-background/80 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10">
                      <Icon className="h-4 w-4 text-foreground/75" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-medium">{k}</p>
                    <p className="text-xs leading-relaxed text-foreground/60">{v}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 border-l-2 border-foreground pl-5">
                <span className="cs-eyebrow">Aha moment</span>
                <p className="text-sm font-semibold leading-relaxed text-foreground/60 md:text-base">
                  Finance already has tools that match. What they lack is <span className="text-foreground/80">an answer they can trust</span> and
                  pass on to whoever asks.
                </p>
                <div className="rounded-2xl border border-foreground/12 bg-gradient-to-br from-foreground/[0.04] to-muted/40 px-5 py-5 md:px-6 md:py-6">
                  <p className="text-lg font-semibold leading-snug tracking-tight sm:text-xl md:text-2xl">What if every payout could explain itself?</p>
                  <p className="mt-2 text-sm text-foreground/55">And say how sure it is, to the cent?</p>
                </div>
              </div>
            </div>
          </section>

          {/* 02 · Trace */}
          <section id="trace" className="scroll-mt-32 space-y-8">
            <Head eyebrow="02 · From research to screen" title="How did each finding become a screen?">
              <p className={P}>
                I turned four findings and one gap into six hypotheses, and wrote each with the signal that would prove it wrong. Each
                hypothesis then became one decision and one screen. Hover or tap any box to trace it.
              </p>
            </Head>
            <TraceMap />
          </section>

          {/* Design intent */}
          <section id="design-intent" className="max-w-3xl scroll-mt-32 space-y-4">
            <p className="cs-eyebrow">Design intent</p>
            <h2 className="cs-h2">What I set out to build</h2>
            <p className={P}>
              From there, I focused on a product that explains each seller payout as a short chain of causes that add up, labels how sure it
              is about each one, and never touches the numbers, so finance can close the gap and defend the answer.
            </p>
          </section>

          {/* Solutions */}
          <section id="solutions" className="scroll-mt-32 space-y-16 md:space-y-20">
            <div className="space-y-2">
              <p className="cs-eyebrow">Final designs</p>
              <h2 className="cs-h2">Solutions</h2>
              <p className="max-w-2xl text-sm text-foreground/60 text-pretty">Six decisions that turn a payout gap into an answer finance can trust.</p>
            </div>

            <div className="space-y-6">
              <Head eyebrow="Decision 2 · The core screen" title="A bridge that adds up to the cent">
                <p className={P}>
                  The screen starts at what the ledger expected, adds one row per cause, and ends at what the processor paid. A check line
                  proves the causes net to the gap. Toggle to see what&apos;s really lost.
                </p>
              </Head>
              <Bridge />
            </div>

            <div className="space-y-6">
              <Head eyebrow="Decision 4 · Evidence" title="Every cause says how sure it is">
                <p className={P}>Confirmed closes on its own. Likely needs a person. A Hypothesis needs a written reason.</p>
              </Head>
              <EvidenceLadder />
            </div>

            <div className="space-y-6">
              <Head eyebrow="All six decisions" title="What I rejected, and what I chose">
                <p className={P}>Competitors usually ship the option I rejected. Use the arrows to compare.</p>
              </Head>
              <Decisions />
            </div>
          </section>

          {/* Edge cases */}
          <section id="edge-cases" className="scroll-mt-32 space-y-8">
            <Head eyebrow="03 · Edge cases" title="Where could the answer break?">
              <p className={P}>
                I listed 45 edge cases across six areas and wrote a design response for each. I built eight into the prototype. Tap a dot to see
                the case and the response.
              </p>
            </Head>
            <EdgeCaseGrid />
          </section>

          {/* Prototype */}
          <section id="prototype" className="scroll-mt-32 space-y-8">
            <Head eyebrow="Live prototype" title="Three builds, three questions">
              <p className={P}>
                I built the prototype in three rounds, each to answer one question. As you close cases, reconciliation climbs from{" "}
                <span className="font-semibold tabular-nums text-foreground/80">90.3% to 91.7%</span>.
              </p>
            </Head>
            <Versions />
            <LivePrototype />
          </section>

          {/* Reflection */}
          <section id="reflection" className="relative scroll-mt-32">
            <div
              className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 -z-10 rounded-[40px] opacity-90 blur-3xl"
              style={{ background: "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(91, 63, 217, 0.12), transparent 50%), radial-gradient(ellipse 70% 50% at 85% 70%, rgba(59, 130, 246, 0.08), transparent 45%)" }}
            />
            <div className="relative space-y-6 md:space-y-8">
              {REFLECTION.map(({ n, icon: Icon, ring, tint, title, body }, i) => (
                <article
                  key={n}
                  className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-card via-background to-muted/60 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 md:p-8 ${i === 1 ? "md:ml-4 lg:ml-8" : i === 2 ? "md:mr-4 lg:mr-10" : ""}`}
                >
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[5rem] font-light leading-none text-foreground/[0.07] md:text-[6.5rem]" aria-hidden>
                    {n}
                  </span>
                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ring-2 ring-offset-2 ring-offset-background ${ring}`}>
                      <Icon className={`h-6 w-6 ${tint}`} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 space-y-3">
                      <h2 className="cs-h2">{title}</h2>
                      <div className="space-y-3 text-sm leading-relaxed text-foreground/65">{body}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
