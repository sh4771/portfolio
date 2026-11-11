import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { Bridge, Decisions, EdgeCaseGrid, EvidenceLadder, LivePrototype, PositionMap, TheQuestion, TraceMap, Versions } from "@/components/reconcile/story"

export const metadata = {
  title: "Reconcile · Violet Hyun",
  description:
    "A payout reconciliation app that tells a marketplace finance manager why a seller payout differs from what the ledger expected, without touching the numbers.",
}

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 space-y-6">
      <div className="space-y-2">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h2 className="cs-h2 max-w-2xl text-balance">{title}</h2>
        {lead ? <p className="max-w-xl text-sm text-foreground/60">{lead}</p> : null}
      </div>
      {children}
    </section>
  )
}

const GAPS = [
  { k: "Per seller payout", v: "Tools work per bank line, GL entry or period. Marketplaces think in sellers." },
  { k: "How sure", v: "Some tools show reasoning. None labels a cause as proven or inferred." },
  { k: "When it arrives", v: "Tools hide timing gaps, but that's exactly what people ask finance about." },
]

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-[960px] space-y-24 px-6">
          <Link href="/#work" className="!mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          {/* Overview */}
          <header id="overview" className="scroll-mt-32 space-y-8">
            <div className="space-y-3">
              <h1 className="cs-h1">Reconcile: Explaining Why a Seller Payout Doesn&apos;t Match</h1>
              <p className="text-sm text-text-secondary">Fintech product design · Solo project · November 2026</p>
              <p className="max-w-xl text-base leading-relaxed text-foreground/75 text-pretty">
                Reconcile tells a marketplace finance manager why a seller payout differs from what the ledger expected, and lets them close the gap without touching the numbers.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Research", "Product strategy", "Design system", "Mobile + desktop UI", "Prototype"].map((t) => (
                <span key={t} className="rounded-full border border-border/60 px-3 py-1 text-foreground/65">{t}</span>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image src="/images/reconcile/cover.webp" alt="Reconcile splash screen and the Why it differs screen" width={1440} height={1080} priority className="h-auto w-full" sizes="(max-width: 960px) 100vw, 960px" />
            </div>
          </header>

          {/* The question */}
          <Section id="question" eyebrow="The question" title="Every tool matches records, but none tells finance why a payout differs." lead="Today, finance rebuilds that answer by hand in a spreadsheet every payout cycle.">
            <TheQuestion />
          </Section>

          {/* Research */}
          <Section id="research" eyebrow="Research · 6 products, 1 practitioner thread" title="Competitors solved matching. Nobody explains the gap.">
            <PositionMap />
            <div className="grid gap-3 sm:grid-cols-3">
              {GAPS.map((g, i) => (
                <div key={g.k} className="rounded-2xl border border-border/50 p-4">
                  <p className="text-xs text-foreground/45">Gap {i + 1}</p>
                  <p className="mt-1 text-sm font-semibold">Nobody shows {g.k.toLowerCase()}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/60">{g.v}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Traceability */}
          <Section id="trace" eyebrow="From research to screen" title="Every screen traces back to something I learned." lead="I turned four findings and one gap into six hypotheses, and wrote each with the signal that would prove it wrong. Each hypothesis then became one decision and one screen.">
            <TraceMap />
          </Section>

          {/* Bridge */}
          <Section id="bridge" eyebrow="Decision 2 · The core screen" title="The bridge explains the gap down to the cent." lead="Toggle to see what's really lost. Most of the gap is timing that clears on its own.">
            <Bridge />
          </Section>

          {/* Evidence */}
          <Section id="evidence" eyebrow="Decision 4" title="Every cause tells you how sure Reconcile is.">
            <EvidenceLadder />
          </Section>

          {/* Decisions */}
          <Section id="decisions" eyebrow="Six decisions" title="For each decision, I rejected what competitors ship and chose a clearer option." lead="Use the arrows to compare what I rejected with what I chose.">
            <Decisions />
          </Section>

          {/* Edge cases */}
          <Section id="edge-cases" eyebrow="Edge cases · 45 across 6 areas" title="I mapped 45 edge cases, because one wrong number sends finance back to Excel." lead="Tap a dot to see the case and how the design responds.">
            <EdgeCaseGrid />
          </Section>

          {/* Prototype */}
          <Section id="prototype" eyebrow="Prototype" title="I built three rounds, each to answer one question.">
            <Versions />
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm">
              <span className="text-foreground/55">Reconciliation rises as cases close</span>
              <span className="font-semibold tabular-nums">90.3% → 91.0% → 91.7%</span>
              <span className="text-xs text-foreground/45">130, 131, then 132 of 144 payouts</span>
            </div>
            <LivePrototype />
          </Section>

          {/* Next */}
          <Section id="next" eyebrow="Next" title="Next, I'll give every hypothesis a chance to fail." lead="I'll run five moderated sessions with marketplace finance and payment ops people, on their own phones. I haven't run them yet.">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["H2", "“How much is really missing this week?”", "Separates the $516.28 timing from real gaps"],
                ["H1 · H4", "“Why did Saltmarsh get less?”", "Names the 3 causes in 2 minutes, no spreadsheet"],
                ["H3", "“Close Atlas Map Prints.”", "Writes a real reason for the $0.33"],
              ].map(([h, task, pass]) => (
                <div key={task} className="rounded-2xl border border-border/50 p-4">
                  <p className="text-xs font-semibold text-[#5b3fd9]">{h}</p>
                  <p className="mt-1 text-sm font-medium">{task}</p>
                  <p className="mt-2 text-xs text-foreground/55">Pass: {pass}</p>
                </div>
              ))}
            </div>
          </Section>

          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
