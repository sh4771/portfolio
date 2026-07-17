import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

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

  return (
    <>
      <Navigation />
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
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">
                {study.title}
              </h1>
              <p className="text-sm text-foreground/50">{study.subtitle}</p>
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
            className={`mt-10 overflow-hidden rounded-2xl border-t border-border/40 pt-10 ${study.heroTreatAsLogo ? "bg-white" : ""}`}
          >
            <div className="relative aspect-[16/9]">
              <div
                className={
                  study.heroTreatAsLogo
                    ? "absolute inset-[8%] sm:inset-[10%]"
                    : "absolute inset-0"
                }
              >
                <Image
                  src={study.image}
                  alt={`${study.title} project hero`}
                  fill
                  className={
                    study.heroTreatAsLogo ? "object-contain" : "object-cover"
                  }
                  priority
                  sizes="900px"
                />
              </div>
            </div>
          </div>


          {/* Problem */}
          {study.problem ? (
            <ContentBlock label={study.problem.title}>
              <p className="text-sm leading-relaxed text-foreground/70">
                {study.problem.body}
              </p>
            </ContentBlock>
          ) : null}

          {/* Research */}
          {study.research ? (
            <ContentBlock label={study.research.title}>
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
            <ContentBlock label={study.insights.title}>
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
            <ContentBlock label={study.designProcess.title}>
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
            <ContentBlock label={study.prototype.title}>
              <p className="text-sm leading-relaxed text-foreground/70">
                {study.prototype.body}
              </p>
            </ContentBlock>
          ) : null}

          {/* Outcome */}
          {study.outcome ? (
            <ContentBlock label={study.outcome.title}>
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
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 border-t border-border/30 pt-6">
      <p className="mb-4 text-xs tracking-[0.15em] text-muted-foreground/40 uppercase">
        {label}
      </p>
      {children}
    </section>
  )
}
