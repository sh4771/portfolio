import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
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
          <header id="overview" className="scroll-mt-32 space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="cs-h1">Along: Making the Everyday Walk Worth Taking the Long Way</h1>
                <p className="text-sm text-text-secondary">Product Design · Designathon team project</p>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4 text-sm">
                <div>
                  <span className="mb-1 block text-xs text-text-secondary">Context</span>
                  <span className="text-foreground/70">Designathon, team project</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-text-secondary">Timeline</span>
                  <span className="text-foreground/70">November 2026</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-text-secondary">What I did</span>
                  <span className="text-foreground/70">UX research, Interaction design, Brand, Prototyping</span>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                New Yorkers walk everywhere, but map apps only care about getting there fast. Along keeps the route
                you already take and tucks a few small sidequests into it, with a companion, Lolo, who grows with every walk.
              </p>

              <div className="grid max-w-2xl gap-8 border-t border-border/40 pt-8 sm:grid-cols-2 sm:gap-10">
                <div className="space-y-2">
                  <h2 className="cs-h2">Product scope</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    A daily check-in, a route with 3+ optional sidequests, walking navigation, and a collection where
                    each walk becomes a memory and shapes how Lolo looks.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="cs-h2">Use case</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    Someone walking home with a little spare time wants the walk to feel a little different
                    today, without planning a whole outing.
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Tools: Figma, Figma MCP, Claude Design</p>

              <div className="mt-8 overflow-hidden rounded-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/images/along/cover-poster.webp"
                  aria-label="Animated cover: the Along wordmark with Lolo, and the app cycling through check-in, sidequests, walking and Lolo growing"
                  className="block aspect-[16/9] h-auto w-full object-cover"
                >
                  <source src="/videos/along-cover.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </header>

          {/* 01 Problem */}
          <Section id="problem" eyebrow="01 · The problem" title="Map apps get you there fast. None care what happens on the way.">
            <div className="grid gap-4 sm:grid-cols-[240px_1fr]">
              <div className="rounded-2xl bg-[#f7dc6f] p-6 text-neutral-900">
                <p className="text-5xl font-semibold tracking-tight">37.6%</p>
                <p className="mt-2 text-sm">of NYC trips were on foot in 2024</p>
                <p className="mt-3 text-[11px] text-neutral-700">NYC DOT, 2024 Citywide Mobility Survey</p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-border/50 p-6">
                <p className="text-base leading-relaxed text-foreground/75 text-pretty">
                  We pass countless little places every day: a pop-up, a gallery, a café we keep meaning to try.
                  But the walk is just the gap between A and B, so we take the fastest route and forget it the moment we arrive.
                </p>
              </div>
            </div>
          </Section>

          {/* 02 Research */}
          <Section id="research" eyebrow="02 · Research · 5 apps, 10 walkers" title="People don't mind long walks. They mind the same walk.">
            <Findings />
            <a href="/images/along/research.webp" target="_blank" rel="noreferrer" className="inline-block text-xs text-text-secondary underline decoration-text-muted underline-offset-2 hover:text-foreground">
              See the full research board ↗
            </a>
          </Section>

          {/* 03 Synthesis */}
          <Section id="synthesis" eyebrow="03 · Synthesis" title="Six themes, six design rules.">
            <ThemeExplorer />
            <Zoomable src="/images/along/affinity.webp" alt="Affinity map grouping survey answers, app findings and quotes into six themes" width={2400} height={1701} hint="Open the affinity map" />
          </Section>

          {/* 04 Opportunity */}
          <Section id="opportunity" eyebrow="04 · The opportunity" title="What if the walk itself held a little adventure?">
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center rounded-2xl bg-neutral-900 p-6 text-white">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">How might we</p>
                <p className="mt-2 text-xl leading-snug text-[#f7dc6f] text-balance">help people value the journey of an everyday walk, not just the destination?</p>
              </div>
              <ul className="space-y-3 rounded-2xl border border-border/50 p-6 text-sm text-foreground/75">
                {[
                  ["Keep the route", "Never replace the walk people already take."],
                  ["Show the cost", "Every stop says what it is and the minutes it adds."],
                  ["Ask first", "A few suggestions, one tap to skip."],
                  ["Leave something behind", "Each walk becomes a memory, and Lolo grows."],
                ].map(([t, b]) => (
                  <li key={t}><span className="font-medium text-foreground">{t}.</span> {b}</li>
                ))}
              </ul>
            </div>
          </Section>

          {/* 05 Flow */}
          <Section id="flow" eyebrow="05 · Flow" title="Plan today. Walk. Look back.">
            <Zoomable src="/images/along/flow.webp" alt="Flow map of Along from first open through planning, walking and looking back" width={2400} height={1079} hint="Open the flow map" />
          </Section>

          {/* 06 Solution */}
          <Section id="design" eyebrow="06 · The solution" title="Keep the route. Add a reason to slow down.">
            <WalkThrough />
          </Section>

          {/* 07 Lolo */}
          <Section id="lolo" eyebrow="07 · Lolo" title="A companion who grows with every walk.">
            <LoloGrow />
          </Section>

          {/* 08 Brand */}
          <Section id="brand" eyebrow="08 · Brand" title="Five directions. Lolo became the mark.">
            <p className="max-w-xl text-sm leading-relaxed text-foreground/60 text-pretty">
              We tried a wordmark, a map pin, a route line and a plain badge. Letting Lolo carry the logo kept the brand
              and the product telling the same story: the character you walk with is the app.
            </p>
            <Zoomable src="/images/along/logo-directions.webp" alt="Along primary lockup, dark version, app icons, color palette and the five logo directions explored, with Lolo the guide chosen" width={2400} height={1380} hint="Open the logo directions" />
          </Section>

          {/* 09 Prototype */}
          <Section id="prototype" eyebrow="09 · Prototype" title="Try the walk.">
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-neutral-100">
              <iframe src={PROTOTYPE_EMBED} title="Along clickable prototype" allowFullScreen loading="lazy" className="block h-[760px] w-full border-0" />
            </div>
            <a href={PROTOTYPE_LINK} target="_blank" rel="noreferrer" className="inline-block text-sm underline decoration-text-muted underline-offset-2 hover:text-foreground">
              Open in Figma ↗
            </a>
          </Section>

          {/* 10 Reflection */}
          <Section id="next" eyebrow="10 · Reflection" title="Test it on real walks.">
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
