import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SectionTracker } from "@/components/section-tracker"

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = caseStudies[slug]
  if (!study) return { title: "Not Found" }
  return {
    title: `${study.title} \u2014 Violet Hyun`,
    description: study.overview ? study.overview.slice(0, 160) : study.subtitle.slice(0, 160),
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) notFound()

  const sections = [
    { id: "overview", label: "Overview" },
    study.problem && { id: "problem", label: study.problem.title },
    study.research && { id: "research", label: study.research.title },
    study.insights && { id: "insights", label: study.insights.title },
    study.designProcess && { id: "process", label: study.designProcess.title },
    study.prototype && { id: "prototype", label: study.prototype.title },
    study.outcome && { id: "outcome", label: study.outcome.title },
    study.gallery && study.gallery.length > 0 && { id: "gallery", label: "Gallery" },
  ].filter(Boolean) as { id: string; label: string }[]

  return (
    <>
      <Navigation />
      <SectionTracker sections={sections} />
      <main className="pt-32 pb-12">
        <div className="mx-auto w-full max-w-[900px] px-6">
          {/* Back link */}
          <Link
            href="/#work"
            className="mb-14 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          {/* Header */}
          <div id="overview" className="space-y-6 scroll-mt-32">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">
                {study.title}
              </h1>
              <p className="text-sm text-foreground/50">{study.subtitle}</p>
              {study.credit ? (
                <p className="text-xs text-foreground/40">
                  {study.credit.text}{" "}
                  <a
                    href={study.credit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-foreground/30 underline-offset-2 hover:text-foreground/70"
                  >
                    {study.credit.name}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4 text-sm">
              <MetaItem label="Context" value={study.category} />
              <MetaItem label="Timeline" value={study.duration} />
              <MetaItem label="What I did" value={study.role} />
            </div>

            {study.overview ? (
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-foreground/60">
                {study.overview}
              </p>
            ) : null}
          </div>

          {/* Hero image */}
          <div
            className={`mt-10 overflow-hidden rounded-2xl border-t border-border/40 pt-10 ${study.heroTreatAsLogo ? "bg-white" : "bg-muted/30"}`}
          >
            <div className="relative aspect-[16/9]">
              <div
                className={
                  study.heroTreatAsLogo
                    ? "absolute inset-[8%] sm:inset-[10%]"
                    : "absolute inset-[4%]"
                }
              >
                <Image
                  src={study.image}
                  alt={`${study.title} project hero`}
                  fill
                  className="object-contain"
                  priority
                  sizes="900px"
                />
              </div>
            </div>
          </div>


          {/* Problem */}
          {study.problem ? (
            <ContentBlock id="problem" label={study.problem.title}>
              <p className="text-sm leading-relaxed text-foreground/70">
                {study.problem.body}
              </p>
            </ContentBlock>
          ) : null}

          {/* Research */}
          {study.research ? (
            <ContentBlock id="research" label={study.research.title}>
              <p className="text-sm leading-relaxed text-foreground/70">
                {study.research.body}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {study.research.methods.map((method, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                    {method}
                  </li>
                ))}
              </ul>
            </ContentBlock>
          ) : null}

          {/* Insights */}
          {study.insights ? (
            <ContentBlock id="insights" label={study.insights.title}>
              <div className="flex flex-col gap-6">
                {study.insights.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs tabular-nums text-muted-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm font-medium text-foreground">
                        {item.heading}
                      </h4>
                    </div>
                    <p className="pl-9 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </ContentBlock>
          ) : null}

          {/* Design Process */}
          {study.designProcess ? (
            <ContentBlock id="process" label={study.designProcess.title}>
              <p className="mb-6 text-sm leading-relaxed text-foreground/70">
                {study.designProcess.body}
              </p>
              <div className="grid grid-cols-2 gap-5">
                {study.designProcess.phases.map((phase, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 border-t border-border/30 pt-3"
                  >
                    <span className="text-xs tabular-nums text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-sm font-medium text-foreground">
                      {phase.label}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </ContentBlock>
          ) : null}

          {/* Prototype */}
          {study.prototype ? (
            <ContentBlock id="prototype" label={study.prototype.title}>
              <p className="text-sm leading-relaxed text-foreground/70">
                {study.prototype.body}
              </p>
            </ContentBlock>
          ) : null}

          {/* Outcome */}
          {study.outcome ? (
            <ContentBlock id="outcome" label={study.outcome.title}>
              <p className="text-sm leading-relaxed text-foreground/70">
                {study.outcome.body}
              </p>
              {study.outcome.metrics && (
                <div className="mt-8 grid grid-cols-3 gap-5">
                  {study.outcome.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <p className="font-serif text-xl font-normal text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </ContentBlock>
          ) : null}

          {/* Gallery */}
          {study.gallery && study.gallery.length > 0 ? (
            <ContentBlock id="gallery" label="Gallery">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {study.gallery.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/30 bg-muted/30">
                      <div className="absolute inset-[6%]">
                        <Image
                          src={item.image}
                          alt={item.caption ?? `${study.title} gallery image ${i + 1}`}
                          fill
                          className="object-contain"
                          sizes="450px"
                        />
                      </div>
                    </div>
                    {item.caption ? (
                      <p className="text-xs text-foreground/40">{item.caption}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </ContentBlock>
          ) : null}

          {/* Next project link */}
          <div className="border-t border-border/30 pt-12 text-center">
            <p className="text-xs tracking-[0.15em] text-muted-foreground/40 uppercase">
              Continue
            </p>
            <Link
              href="/#work"
              className="mt-2 inline-block font-serif text-lg tracking-tight text-foreground transition-colors hover:text-accent"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-1 block text-xs text-foreground/40">{label}</span>
      <span className="text-foreground/70">{value}</span>
    </div>
  )
}

function ContentBlock({
  id,
  label,
  children,
}: {
  id?: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="mt-12 scroll-mt-32 border-t border-border/30 pt-6"
    >
      <p className="mb-4 text-xs tracking-[0.15em] text-muted-foreground/40 uppercase">
        {label}
      </p>
      {children}
    </section>
  )
}
