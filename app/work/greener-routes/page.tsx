import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Lightbulb, MessageCirclePlus, Rocket } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { WalkQuiz } from "@/components/greener/walk-quiz"
import { Sunglasses } from "@/components/greener/sunglasses"
import { ExposureMethod } from "@/components/greener/exposure-method"
import { RouteCompare } from "@/components/greener/route-compare"
import { PhonePrototype } from "@/components/greener/phone-prototype"

export const metadata = {
  title: "Greener Walking Routes · Violet Hyun",
  description:
    "A walking-navigation concept that measures green exposure along a route and lets people trade a little time for a greener walk.",
}

const FINAL_SCREENS = [
  { src: "/images/greener-routes/proto-1-destination.png", caption: "Pick a destination" },
  { src: "/images/greener-routes/proto-2-preferences.png", caption: "Set the detour limit" },
  { src: "/images/greener-routes/proto-3-compare.png", caption: "Compare routes" },
  { src: "/images/greener-routes/proto-4-directions.png", caption: "Walk it turn by turn" },
  { src: "/images/greener-routes/proto-5-arrived.png", caption: "See what you gained" },
]

const NOTES = [
  { title: "Product decision", body: "Put the time-versus-experience tradeoff at the moment of route selection, where people actually decide." },
  { title: "Research hypothesis", body: "People understand the value of a greener route better when they see it right next to the ETA." },
  { title: "Scope", body: "Every interaction works. The map is a schematic and the numbers come from one analyzed trip." },
]

function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-foreground bg-background shadow-[0_24px_60px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)]">
      <Image src={src} alt={alt} width={640} height={1264} className="h-auto w-full" sizes="(max-width: 768px) 45vw, 180px" />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div
          className="mx-auto w-full max-w-[900px] px-6 space-y-24 [--park-fill:#cfe0c3] [--park-ink:#2f4d38] [--park-tree:#9cc28a] [--route-green:#3f7a52] dark:[--park-fill:#2f4436] dark:[--park-ink:#cfe0c3] dark:[--park-tree:#3f5e48] dark:[--route-green:#86c29a]"
        >
          <Link
            href="/#work"
            className="!mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          {/* Overview */}
          <header id="overview" className="space-y-12 scroll-mt-32">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="cs-h1">Designing Walking Routes Around How a Walk Feels</h1>
                <p className="text-sm text-text-secondary">
                  Spatial Analysis + Product Design · Columbia GSAPP Computational Modeling
                </p>
                <p className="text-xs text-text-secondary">
                  {"Course project, advised by Luc Wilson and "}
                  <a
                    href="https://www.arch.columbia.edu/faculty/2411-meli-harvey"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-text-muted underline-offset-2 hover:text-foreground"
                  >
                    Meli Harvey
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4 text-sm">
                <div>
                  <span className="mb-1 block text-xs text-text-secondary">Context</span>
                  <span className="text-foreground/70">Columbia GSAPP, Computational Modeling</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground/40">Timeline</span>
                  <span className="text-foreground/70">July 2026 – Present</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-foreground/40">What I did</span>
                  <span className="text-foreground/70">Spatial analysis, Grasshopper scripting, Prototyping</span>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                The shortest way isn&apos;t always the best one. I built a green exposure metric from NYC Parks
                data, then turned it into a walking app that shows what a route feels like, not just how long it
                takes.
              </p>

              <div className="grid max-w-2xl gap-8 border-t border-border/40 pt-8 sm:grid-cols-2 sm:gap-10">
                <div className="space-y-2">
                  <h2 className="cs-h2">Product scope</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    A route-scoring pipeline in Rhino and Grasshopper, plus a mobile flow for setting a detour limit,
                    comparing a shortest, balanced and greenest route, and walking it turn by turn.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="cs-h2">Use case</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    Someone walking somewhere on a hot afternoon wants to know if a slightly longer route would be
                    calmer and shadier, and exactly how much time it would cost them.
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Tools: Rhino, Grasshopper, NYC Parks Open Data, Claude Design
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/images/greener-routes/cover-poster.png"
                  aria-label="Animated mockup of the Greener Routes app screens"
                  className="block aspect-[4/3] h-auto w-full object-cover"
                >
                  <source src="/videos/greener-routes-cover.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </header>

          {/* 01 Quiz */}
          <section id="walk-check" className="space-y-8 scroll-mt-32">
            <div className="space-y-2">
              <p className="cs-eyebrow">01 · A quick walk check</p>
              <h2 className="cs-h2">Before the research, a question for you</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                We spend a lot of time deciding where to go. We rarely think about how we want to feel on the way
                there.
              </p>
            </div>
            <WalkQuiz />
          </section>

          {/* 02 Problem */}
          <section id="problem" className="space-y-8 scroll-mt-32">
            <div className="space-y-2">
              <p className="cs-eyebrow">02 · The problem is real</p>
              <h2 className="cs-h2">Heat keeps people from walking, and green space helps</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="passiton-stat-card relative overflow-hidden rounded-[28px] border border-foreground/10 bg-gradient-to-br from-card/90 via-background to-muted/40 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]">
                <p className="cs-eyebrow">US adults</p>
                <p className="mt-2 flex items-baseline gap-1 font-light tracking-tight text-foreground">
                  <span className="text-5xl tabular-nums sm:text-6xl md:text-7xl">36</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl">%</span>
                </p>
                <p className="mt-4 text-sm leading-snug text-foreground/70">
                  named <strong className="font-medium text-foreground/90">hot or humid conditions</strong> as a
                  reason they don&apos;t walk to places within 10 minutes of home.
                </p>
                <a
                  href="https://www.cdc.gov/pcd/issues/2025/24_0394.htm"
                  target="_blank"
                  rel="noreferrer"
                  className="cs-caption mt-4 inline-block underline decoration-text-muted underline-offset-2 hover:text-foreground"
                >
                  CDC, Preventing Chronic Disease (2025), 2022 SummerStyles survey of 3,967 adults
                </a>
              </div>
              <div
                className="passiton-stat-card relative overflow-hidden rounded-[28px] border border-foreground/10 bg-gradient-to-br from-card/90 via-background to-muted/40 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]"
                style={{ animationDelay: "120ms" }}
              >
                <p className="cs-eyebrow">On average</p>
                <p className="mt-2 flex items-baseline gap-1 font-light tracking-tight text-foreground">
                  <span className="text-5xl tabular-nums sm:text-6xl md:text-7xl">1.6</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl">°C</span>
                </p>
                <p className="mt-4 text-sm leading-snug text-foreground/70">
                  cooler in <strong className="font-medium text-foreground/90">urban forests</strong> than in
                  non-green urban areas, across a review of 308 studies.
                </p>
                <a
                  href="https://www.epa.gov/heatislands/benefits-trees-and-vegetation"
                  target="_blank"
                  rel="noreferrer"
                  className="cs-caption mt-4 inline-block underline decoration-text-muted underline-offset-2 hover:text-foreground"
                >
                  US EPA, Benefits of Trees and Vegetation
                </a>
              </div>
            </div>
            <p className="cs-caption max-w-2xl">
              These are outside research findings, not results from the quiz above. A greener route won&apos;t be
              1.6°C cooler every time.
            </p>
          </section>

          {/* 03 Personal */}
          <section id="why" className="space-y-8 scroll-mt-32">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <p className="cs-eyebrow">03 · Why I care</p>
                <h2 className="cs-h2">For me, it&apos;s personal</h2>
                <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                  My father is severely sensitive to sunlight, and I don&apos;t enjoy direct sun either.
                </p>
                <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                  That made me question something I had always taken for granted. Why does navigation treat the
                  fastest route as the default, when the most comfortable route can be a completely different one?
                </p>
              </div>
              <Sunglasses />
            </div>
          </section>

          {/* 04 Method */}
          <section id="method" className="space-y-8 scroll-mt-32">
            <div className="space-y-2">
              <p className="cs-eyebrow">04 · The design question</p>
              <h2 className="cs-h2">What if maps showed the experience of a walk, not just its ETA?</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                Navigation tools optimize for distance and time. I wanted environmental quality to count as a
                performance metric too, so I started with one data layer: green space from NYC Parks open data. A
                park only matters to a walker if the route actually brings them close to it.
              </p>
            </div>

            <ExposureMethod />

            <div className="grid gap-6 sm:grid-cols-2">
              <figure className="space-y-3">
                <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-muted/30">
                  <Image
                    src="/images/greener-routes/rhino-perspective.png"
                    alt="Rhino viewport showing route geometry against park boundaries"
                    width={558}
                    height={524}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="cs-caption">Rhino: route geometry against park boundaries</figcaption>
              </figure>
              <figure className="space-y-3">
                <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-muted/30">
                  <Image
                    src="/images/greener-routes/grasshopper-script.png"
                    alt="Grasshopper definition that samples routes and measures distance to green space"
                    width={592}
                    height={438}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="cs-caption">Grasshopper: sampling and scoring each route</figcaption>
              </figure>
            </div>
          </section>

          {/* 05 Routes */}
          <section id="routes" className="space-y-8 scroll-mt-32">
            <div className="space-y-2">
              <p className="cs-eyebrow">05 · Comparing routes</p>
              <h2 className="cs-h2">1.2 more minutes, more than three times the green</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                I scored three walking routes to Riverside Park. Any route had to stay within 15% of the shortest
                distance, so a greener walk never turns into a long one.
              </p>
            </div>
            <RouteCompare />
          </section>

          {/* 06 Prototype */}
          <section id="prototype" className="space-y-8 scroll-mt-32">
            <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="cs-eyebrow">06 · Try the product</p>
                  <h2 className="cs-h2">Don&apos;t just look. Take a walk.</h2>
                  <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
                    Enter a destination, set how far you&apos;re willing to detour, compare the routes that fit,
                    and start a simulated walk. Try lowering the detour limit and watch the greenest route drop out.
                  </p>
                </div>
                <div className="grid gap-3">
                  {NOTES.map((n) => (
                    <div key={n.title} className="rounded-xl border border-border/60 p-4">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/70">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <PhonePrototype />
            </div>
          </section>

          {/* 07 Screens */}
          <section id="screens" className="space-y-8 scroll-mt-32">
            <div className="space-y-2">
              <p className="cs-eyebrow">07 · Final designs</p>
              <h2 className="cs-h2">The full flow</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 text-pretty">
                Every step of the prototype above, start to finish. Each screen keeps the tradeoff visible: how
                much green you gain, and what it costs in minutes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
              {FINAL_SCREENS.map((s) => (
                <figure key={s.src} className="space-y-3">
                  <PhoneShot src={s.src} alt={s.caption} />
                  <figcaption className="text-center text-xs text-foreground/50">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Reflection */}
          <section id="reflection" className="space-y-6 scroll-mt-32 md:space-y-8">
            <div className="space-y-2">
              <p className="cs-eyebrow">Reflection</p>
              <h2 className="cs-h2">Can walking routes feel more human?</h2>
            </div>

            {[
              {
                n: "01",
                icon: Lightbulb,
                title: "What I learned",
                body: [
                  "A small, honest number beats a big promise. Showing “1.2 more minutes for 62% green exposure” lets people make the call themselves.",
                  "Capping the detour at 15% kept the greener option realistic instead of turning it into a scenic tour.",
                ],
              },
              {
                n: "02",
                icon: MessageCirclePlus,
                title: "Open questions",
                body: [
                  "Technical: how can I generate and compare many valid routes automatically instead of drawing each one by hand?",
                  "Conceptual: is being within 20 m of a park a fair measure of how much nature a walker actually experiences? Green space is not the same as shade.",
                ],
              },
              {
                n: "03",
                icon: Rocket,
                title: "Next step",
                body: [
                  "Add more data layers, like tree canopy and heat, so the score reflects comfort and not just proximity.",
                  "Test the flow with people who avoid the sun, and see whether they actually pick the greener route.",
                ],
              },
            ].map(({ n, icon: Icon, title, body }) => (
              <article
                key={n}
                className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-card via-background to-muted/60 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 md:p-8"
              >
                <span
                  className="pointer-events-none absolute -right-2 -top-4 select-none text-[5rem] font-light leading-none text-foreground/[0.07] md:text-[6.5rem]"
                  aria-hidden
                >
                  {n}
                </span>
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground/12 to-foreground/5 ring-2 ring-foreground/10 ring-offset-2 ring-offset-background">
                    <Icon className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 space-y-3">
                    <h3 className="cs-h2">{title}</h3>
                    <div className="space-y-3 text-sm leading-relaxed text-foreground/65">
                      {body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
