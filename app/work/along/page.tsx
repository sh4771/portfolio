import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { CaseHero } from "@/components/case-hero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { Findings, LoloGrow, ThemeExplorer, WalkThrough } from "@/components/along/interactive"

export const metadata = {
  title: "Along · Violet Hyun",
  description:
    "A walking app for New York that tucks small sidequests into the route you already take, with a companion, Lolo, who grows with every walk.",
}

/** Figma prototype, starting on the splash screen. Works when the file's link sharing allows viewing. */
const PROTOTYPE_EMBED =
  "https://embed.figma.com/proto/QLj64iFe5CMjJhWUDAfObr/Designathon---Prototype?node-id=302-9965&starting-point-node-id=302%3A9965&page-id=98%3A2&scaling=scale-down&content-scaling=fixed&embed-host=share&hide-ui=1"
const PROTOTYPE_LINK =
  "https://www.figma.com/proto/QLj64iFe5CMjJhWUDAfObr/Designathon---Prototype?node-id=302-9965&starting-point-node-id=302%3A9965&page-id=98%3A2&scaling=scale-down"

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 space-y-6">
      <div className="space-y-2">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h2 className="cs-h2 max-w-2xl text-balance">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Zoomable({ src, alt, width, height, hint }: { src: string; alt: string; width: number; height: number; hint: string }) {
  return (
    <a href={src} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-2xl border border-border/50 bg-white">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]" sizes="(max-width: 900px) 100vw, 900px" />
      <span className="absolute bottom-3 right-3 rounded-full bg-neutral-900/80 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">{hint} ↗</span>
    </a>
  )
}

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

          {/* Overview */}
          <CaseHero
            slug="along"
            title="Along"
            roles={["UX research", "Interaction design", "Brand", "Prototyping"]}
            tagline="A New York walking app that tucks small sidequests into the route you already take."
            when="November 2026"
            forWhom="Designathon, team project"
            summary="Map apps get you there fast. Along adds a reason to slow down: a few sidequests on your way, and a companion, Lolo, who grows with every walk."
          />

          {/* Problem */}
          <Section id="problem" eyebrow="The problem" title="Map apps get you there fast. None care what happens on the way.">
            <div className="grid gap-4 sm:grid-cols-[240px_1fr]">
              <div className="rounded-2xl bg-[#f7dc6f] p-6 text-neutral-900">
                <p className="text-5xl font-semibold tracking-tight">37.6%</p>
                <p className="mt-2 text-sm">of NYC trips were on foot in 2024</p>
                <p className="mt-3 text-[11px] text-neutral-700">NYC DOT, 2024 Citywide Mobility Survey</p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-neutral-900 p-6 text-white">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">How might we</p>
                <p className="mt-2 text-xl leading-snug text-[#f7dc6f] text-balance">help people value the journey of an everyday walk, not just the destination?</p>
              </div>
            </div>
          </Section>

          {/* Research */}
          <Section id="research" eyebrow="Research · 5 apps, 10 walkers" title="People don't mind long walks. They mind the same walk.">
            <Findings />
            <a href="/images/along/research.webp" target="_blank" rel="noreferrer" className="inline-block text-xs text-text-secondary underline decoration-text-muted underline-offset-2 hover:text-foreground">
              See the full research board ↗
            </a>
          </Section>

          {/* Synthesis */}
          <Section id="synthesis" eyebrow="Synthesis" title="Six themes, six design rules.">
            <ThemeExplorer />
            <Zoomable src="/images/along/affinity.webp" alt="Affinity map grouping survey answers, app findings and quotes into six themes" width={2400} height={1701} hint="Open the affinity map" />
          </Section>

          {/* Flow */}
          <Section id="flow" eyebrow="Flow" title="Plan today. Walk. Look back.">
            <Zoomable src="/images/along/flow.webp" alt="Flow map of Along from first open through planning, walking and looking back" width={2400} height={1079} hint="Open the flow map" />
          </Section>

          {/* Design */}
          <Section id="design" eyebrow="The design" title="Keep the route. Add a reason to slow down.">
            <WalkThrough />
          </Section>

          {/* Lolo */}
          <Section id="lolo" eyebrow="Lolo" title="A companion who grows with every walk.">
            <LoloGrow />
            <Zoomable src="/images/along/brand.webp" alt="Along logo directions and splash explorations" width={1600} height={1000} hint="Open the logo directions" />
          </Section>

          {/* Prototype */}
          <Section id="prototype" eyebrow="Prototype" title="Try the walk.">
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-neutral-100">
              <iframe src={PROTOTYPE_EMBED} title="Along clickable prototype" allowFullScreen loading="lazy" className="block h-[760px] w-full border-0" />
            </div>
            <a href={PROTOTYPE_LINK} target="_blank" rel="noreferrer" className="inline-block text-sm underline decoration-text-muted underline-offset-2 hover:text-foreground">
              Open in Figma ↗
            </a>
          </Section>

          {/* Next */}
          <Section id="next" eyebrow="Next" title="Test it on real walks.">
            <p className="max-w-xl text-sm text-foreground/60">
              10 answers are an early signal, not proof. Next: how often people accept a sidequest, and whether they check in again tomorrow.
            </p>
          </Section>

          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
