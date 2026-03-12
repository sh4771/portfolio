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
    description: study.overview.slice(0, 160),
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
        <div className="mx-auto w-full max-w-[640px] px-6">
          {/* Back link */}
          <Link
            href="/#work"
            className="mb-14 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{study.category}</span>
            <span className="text-xs text-muted-foreground/30">{study.year}</span>
          </div>

          <h1 className="mt-2 font-serif text-[1.5rem] font-normal leading-snug tracking-tight text-foreground">
            {study.title}
          </h1>

          <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
            {study.subtitle}
          </p>

          {/* Meta row */}
          <div className="mt-10 grid grid-cols-2 gap-5 border-t border-border/40 pt-5 sm:grid-cols-4">
            <MetaItem label="Role" value={study.role} />
            <MetaItem label="Duration" value={study.duration} />
            <MetaItem label="Year" value={study.year} />
            <MetaItem label="Tools" value={study.tools.join(", ")} />
          </div>

          {/* Hero image */}
          <div className="mt-10 overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={study.image}
                alt={`${study.title} project hero`}
                fill
                className="object-cover"
                priority
                sizes="640px"
              />
            </div>
          </div>

          {/* Overview */}
          <ContentBlock label="Overview">
            <p className="text-[13px] leading-relaxed text-foreground/80">
              {study.overview}
            </p>
          </ContentBlock>

          {/* Problem */}
          <ContentBlock label={study.problem.title}>
            <p className="text-[13px] leading-relaxed text-foreground/70">
              {study.problem.body}
            </p>
          </ContentBlock>

          {/* Research */}
          <ContentBlock label={study.research.title}>
            <p className="text-[13px] leading-relaxed text-foreground/70">
              {study.research.body}
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {study.research.methods.map((method, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[13px] leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  {method}
                </li>
              ))}
            </ul>
          </ContentBlock>

          {/* Insights */}
          <ContentBlock label={study.insights.title}>
            <div className="flex flex-col gap-6">
              {study.insights.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] tabular-nums text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[13px] font-medium text-foreground">
                      {item.heading}
                    </h4>
                  </div>
                  <p className="pl-9 text-[13px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </ContentBlock>

          {/* Design Process */}
          <ContentBlock label={study.designProcess.title}>
            <p className="mb-6 text-[13px] leading-relaxed text-foreground/70">
              {study.designProcess.body}
            </p>
            <div className="grid grid-cols-2 gap-5">
              {study.designProcess.phases.map((phase, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 border-t border-border/30 pt-3"
                >
                  <span className="text-[11px] tabular-nums text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[13px] font-medium text-foreground">
                    {phase.label}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </ContentBlock>

          {/* Prototype */}
          <ContentBlock label={study.prototype.title}>
            <p className="text-[13px] leading-relaxed text-foreground/70">
              {study.prototype.body}
            </p>
          </ContentBlock>

          {/* Outcome */}
          <ContentBlock label={study.outcome.title}>
            <p className="text-[13px] leading-relaxed text-foreground/70">
              {study.outcome.body}
            </p>
            {study.outcome.metrics && (
              <div className="mt-8 grid grid-cols-3 gap-5">
                {study.outcome.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <p className="font-serif text-xl font-normal text-foreground">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ContentBlock>

          {/* Next project link */}
          <div className="border-t border-border/30 pt-12 text-center">
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
              Continue
            </p>
            <Link
              href="/#work"
              className="mt-2 inline-block font-serif text-[1.1rem] tracking-tight text-foreground transition-colors hover:text-accent"
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
      <p className="text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
        {label}
      </p>
      <p className="mt-1 text-[13px] text-foreground">{value}</p>
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
      <p className="mb-4 text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
        {label}
      </p>
      {children}
    </section>
  )
}
