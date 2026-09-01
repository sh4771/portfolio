"use client"

import type React from "react"
import { ArrowDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { vendeluxProjects } from "@/lib/vendelux-projects"

export function VendeluxCaseStudies() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeSlug = searchParams.get("project") || vendeluxProjects[0].slug
  const active =
    vendeluxProjects.find((p) => p.slug === activeSlug) || vendeluxProjects[0]

  function selectProject(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("project", slug)
    router.push(`/work/vendelux?${params.toString()}`, { scroll: false })
  }

  return (
    <div>
      {/* Pill switcher */}
      <div className="mb-10 flex flex-wrap gap-2">
        {vendeluxProjects.map((project) => (
          <button
            key={project.slug}
            onClick={() => selectProject(project.slug)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              project.slug === active.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border/60 text-foreground/70 hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {project.navLabel}
          </button>
        ))}
      </div>

      {/* Active project content */}
      <article className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-2xl font-medium text-foreground">{active.title}</h1>
          <p className="text-base text-muted-foreground">{active.oneLiner}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <span>Vendelux</span>
            <span>{active.duration}</span>
            <span>{active.tools.join(", ")}</span>
          </div>
        </header>

        <Section title="Role">
          {active.role.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>

        <Section title="The problem">
          {active.problem.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>

        {/* Visual bridge from problem to decision */}
        {active.bridgeQuestion && (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <ArrowDown className="h-4 w-4 text-muted-foreground/60" aria-hidden />
            <p className="max-w-md text-base font-medium italic text-foreground/80">
              {active.bridgeQuestion}
            </p>
          </div>
        )}

        {active.process && (
          <Section title="Process">
            {active.process.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>
        )}

        <Section title="Key decision">
          {active.keyDecision.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>

        {/* Before / after placeholder */}
        {active.media.beforeAfter && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <PlaceholderImage
                src={active.media.beforeAfter.before}
                label="Before"
              />
              <PlaceholderImage
                src={active.media.beforeAfter.after}
                label="After"
              />
            </div>
            {active.media.beforeAfter.caption && (
              <p className="text-xs text-muted-foreground">
                {active.media.beforeAfter.caption}
              </p>
            )}
          </div>
        )}

        {/* GIF placeholder */}
        {active.media.gif && (
          <div className="space-y-2">
            <PlaceholderImage src={active.media.gif.src} label="GIF" wide />
            {active.media.gif.caption && (
              <p className="text-xs text-muted-foreground">
                {active.media.gif.caption}
              </p>
            )}
          </div>
        )}

        {active.mistake && (
          <Section title="A mistake I made">
            {active.mistake.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>
        )}

        <Section title="Outcome">
          {active.outcome.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>
      </article>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  )
}

function PlaceholderImage({
  src,
  label,
  wide,
}: {
  src: string
  label: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-border/60 bg-foreground/[0.03]",
        wide ? "aspect-video" : "aspect-[4/3]",
      )}
    >
      {/* Swap this Image for the real asset once it's captured */}
      <span className="px-4 text-center text-xs text-muted-foreground">
        {label} placeholder. Drop asset at{" "}
        <code className="rounded bg-foreground/[0.06] px-1 py-0.5">{src}</code>
      </span>
    </div>
  )
}
