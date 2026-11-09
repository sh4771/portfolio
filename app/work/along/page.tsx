import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"

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

const FINDINGS = [
  { stat: "0/10", label: "said the walk takes too long", title: "Time isn't the problem. Sameness is.", body: "All 10 took the fastest or usual route, and none picked a nicer one. Nothing gave them a reason to go another way." },
  { stat: "8/10", label: "made an unplanned stop recently", title: "People still want unexpected discoveries.", body: "Shops, sales and pop-ups pull people off course, even on routes built for speed." },
  { stat: "9/10", label: "say they find out too late", title: "Discoveries get lost along the way.", body: "Local finds live in social feeds, and routes live in map apps. By the time people hear about something, it's often over." },
  { stat: "10/10", label: "would go to a sample sale 3 minutes off route", title: "A small detour feels worth it when it's clear.", body: "7 of 10 hold back because they don't know what's there. Clear details make the detour an easy choice." },
]

const THEMES = [
  { theme: "Sameness, not time, is the problem", must: "Keep the route people already take, and make it feel new.", where: "Daily check-in, route with optional sidequests" },
  { theme: "Discovery still happens, by accident", must: "Suggest the kinds of places people already stop for.", where: "Vibe categories, Lolo's pick on Explore" },
  { theme: "Finds live in feeds, routes live in maps", must: "Put what's on today directly on the route.", where: "3+ sidequests along the way, map pins" },
  { theme: "A detour needs a reason and a cost", must: "Show what it is and the minutes it adds, every time.", where: "\"Café · +5 min\", What to expect" },
  { theme: "Timing decides if a nudge helps or annoys", must: "Ask first, cap it at a few, and make skipping one tap.", where: "Check-in time budget, accept / decline, Skip" },
  { theme: "Walks leave little behind", must: "Keep each journey as a memory, and let Lolo show what it added up to.", where: "Journey memories, Lolo grows with each adventure" },
]

const SCREENS = [
  { src: "/images/along/check-in.webp", title: "Daily check-in", body: "Lolo asks what you're in the mood for and how much extra time you have. Skipping takes one tap." },
  { src: "/images/along/sidequests.webp", title: "3 sidequests along the way", body: "Each stop shows what it is and the minutes it adds. Home stays the destination either way." },
  { src: "/images/along/walking-nav.webp", title: "Walking nav", body: "Turn-by-turn directions, with the next sidequest called out right under the turn." },
  { src: "/images/along/lolo-grew.webp", title: "Lolo grows", body: "Finishing a sidequest makes Lolo celebrate and pick up a trait, like round glasses from a vintage shop." },
  { src: "/images/along/memory.webp", title: "Journey memory", body: "Every walk becomes a memory with its places, photos and notes, so it doesn't vanish when you arrive." },
]

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-foreground bg-background shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <Image src={src} alt={alt} width={390} height={844} className="h-auto w-full" sizes="(max-width: 768px) 45vw, 200px" />
    </div>
  )
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 space-y-8">
      <div className="space-y-2">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h2 className="cs-h2 max-w-2xl text-balance">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Figure({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption?: string }) {
  return (
    <figure className="space-y-3">
      <a href={src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-border/50 bg-white">
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" sizes="(max-width: 900px) 100vw, 900px" />
      </a>
      {caption ? <figcaption className="text-xs text-text-secondary">{caption}</figcaption> : null}
    </figure>
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
                <p className="text-sm text-text-secondary">Product Design · Designathon</p>
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
                Along tucks a few small sidequests, like a pop-up, a sample sale or a new café, into the route you already
                walk. Lolo, a companion who grows with every walk, turns those stops into something you keep.
              </p>

              <div className="grid max-w-2xl gap-8 border-t border-border/40 pt-8 sm:grid-cols-2 sm:gap-10">
                <div className="space-y-2">
                  <h2 className="cs-h2">Product scope</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    A daily check-in, destination search, a route with 3+ sidequests to accept or skip, walking navigation,
                    moment capture, and a collection of journeys and Lolo&apos;s growth.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="cs-h2">Use case</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    Someone walking from the NYU building to home with 20 spare minutes wants to stumble onto something good
                    on the way, without planning a whole outing.
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Tools: Figma</p>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <Image src="/images/along/hero.webp" alt="Along splash screen with Lolo and the line Take the long way." width={1600} height={900} priority className="h-auto w-full" sizes="(max-width: 900px) 100vw, 900px" />
            </div>
          </header>

          {/* Problem */}
          <Section id="problem" eyebrow="The problem" title="In New York, a 40-minute walk is just part of the day.">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,240px)_1fr] sm:items-center">
              <div className="rounded-2xl bg-[#f7dc6f] p-6 text-neutral-900">
                <p className="text-5xl font-semibold tracking-tight">37.6%</p>
                <p className="mt-2 text-sm">of New York City trips were made on foot in 2024.</p>
                <p className="mt-2 text-[11px] text-neutral-700">Source: NYC DOT, 2024 Citywide Mobility Survey</p>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-foreground/70">
                <p>
                  Everyone walks here, and long distances start to feel normal. Autumn leaves, pop-ups and limited-time
                  events sit all along the way, but they&apos;re easy to miss.
                </p>
                <p>Map apps get you there fast. None of them care what happens on the way.</p>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl bg-neutral-900 p-6 text-white sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">Problem statement</p>
              <p className="text-lg leading-snug text-[#f7dc6f] sm:text-xl">
                Everyday walkers in New York need a way to notice what&apos;s worth stopping for on the routes they already
                take, because the apps they rely on are built for the fastest path, and local discoveries reach them too late.
              </p>
              <p className="border-t border-white/15 pt-4 text-sm text-white/80">
                How might we help people value the journey of an everyday walk, not just the destination?
              </p>
            </div>
          </Section>

          {/* Research */}
          <Section id="research" eyebrow="Research" title="We studied tools built for speed, then asked people what they miss.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/50 p-5">
                <p className="text-3xl font-semibold tracking-tight">5 apps</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  Google Maps, Pleasant Routes, ShadePath, Corner and 8it, tested on an iPhone to see how each treats the
                  journey, from routes to local finds and stops.
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 p-5">
                <p className="text-3xl font-semibold tracking-tight">10 responses</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  People ages 18 to 29 on their last long walk and what they discovered along it: 7 with a walking routine
                  and 3 who recently moved.
                </p>
              </div>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
              The apps split into two camps. Some get you there, and some show you where to go. None of them value the way
              there, and none of them remember the walk once you arrive.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {FINDINGS.map((f) => (
                <div key={f.stat} className="space-y-2 rounded-2xl border border-border/50 p-5">
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-4xl font-semibold tracking-tight">{f.stat}</p>
                  <p className="text-xs text-text-secondary">{f.label}</p>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/60">{f.body}</p>
                </div>
              ))}
            </div>
            <Figure src="/images/along/research.webp" alt="Full research board: problem, research questions, competitive analysis and survey findings" width={1225} height={3600} caption="The full research board. Click to open it at full size." />
          </Section>

          {/* Synthesis */}
          <Section id="synthesis" eyebrow="Synthesis" title="Six themes, each turned into a rule the design had to follow.">
            <Figure src="/images/along/affinity.webp" alt="Affinity map grouping survey answers, app findings and quotes into six themes" width={2400} height={1701} caption="Survey answers in yellow, app findings in blue, quotes in pink. Each violet bar is the design rule that came out of it." />
            <ol className="divide-y divide-border/40 border-y border-border/40">
              {THEMES.map((t, i) => (
                <li key={t.theme} className="grid gap-1 py-4 sm:grid-cols-[2rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-6">
                  <span className="text-xs tabular-nums text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium">{t.theme}</span>
                  <span className="text-sm text-foreground/70">
                    {t.must} <span className="block text-xs text-text-secondary">In the prototype: {t.where}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Flow */}
          <Section id="flow" eyebrow="Flow" title="Plan today, walk, then look back.">
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
              The app follows a day in four parts: a first open that introduces Lolo, a quick plan for today, the walk
              itself, and a look back at what you collected. Sidequests are always optional, so walking straight home stays
              one tap away.
            </p>
            <Figure src="/images/along/flow.webp" alt="Flow map of Along from first open through planning, walking and looking back" width={2400} height={1079} />
          </Section>

          {/* Design */}
          <Section id="design" eyebrow="The design" title="Keep the route. Add a reason to slow down.">
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {SCREENS.map((s) => (
                <div key={s.src} className="space-y-3">
                  <Phone src={s.src} alt={s.title} />
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/60">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Lolo */}
          <Section id="lolo" eyebrow="Lolo" title="A companion who grows, in place of badges.">
            <div className="grid gap-8 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-center">
              <Phone src="/images/along/meet-lolo.webp" alt="Meet Lolo onboarding screen" />
              <div className="space-y-3 text-sm leading-relaxed text-foreground/70">
                <p>
                  Early versions rewarded walks with collectible badges. I replaced them with one character who changes as
                  you explore.
                </p>
                <p>
                  Finishing a sidequest makes Lolo celebrate, gain experience and pick up something from the place, and every
                  walk adds a memory to your collection.
                </p>
                <p className="text-foreground">
                  Lolo represents who you&apos;ve become through exploring. Your collection holds everything you&apos;ve
                  experienced.
                </p>
              </div>
            </div>
            <Figure src="/images/along/brand.webp" alt="Along logo directions and splash explorations" width={1600} height={1000} caption="Five logo directions. The final mark uses Lolo the guide." />
          </Section>

          {/* Prototype */}
          <Section id="prototype" eyebrow="Prototype" title="Try the walk.">
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-neutral-100">
              <iframe src={PROTOTYPE_EMBED} title="Along clickable prototype" allowFullScreen className="block h-[760px] w-full border-0" />
            </div>
            <a href={PROTOTYPE_LINK} target="_blank" rel="noreferrer" className="inline-block text-sm underline decoration-text-muted underline-offset-2 hover:text-foreground">
              Open the prototype in Figma ↗
            </a>
          </Section>

          {/* Reflection */}
          <Section id="reflection" eyebrow="What I'd test next" title="An early signal, not proof.">
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
              Ten survey answers point in a direction, but they don&apos;t prove behavior. Next I&apos;d put the prototype
              in people&apos;s hands on real walks and watch two things: how often they accept a sidequest, and whether
              they come back the next day for a new check-in.
            </p>
          </Section>

          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
