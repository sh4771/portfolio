"use client"

import type React from "react"
import Image from "next/image"
import {
  Route,
  GitBranch,
  Lightbulb,
  AlertTriangle,
  FlaskConical,
  LineChart,
  Map as MapIcon,
  Code2,
  ArrowRight,
  ArrowDown,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { vendeluxProjects, type InfoBox } from "@/lib/vendelux-projects"

const ICONS: Record<InfoBox["icon"], React.ElementType> = {
  route: Route,
  "git-branch": GitBranch,
  bulb: Lightbulb,
  "alert-triangle": AlertTriangle,
  flask: FlaskConical,
  "chart-line": LineChart,
  map: MapIcon,
  code: Code2,
}

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
      <article className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-2xl font-medium text-foreground">{active.title}</h1>
          <p className="text-base text-muted-foreground">{active.oneLiner}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <span>Vendelux</span>
            <span>{active.duration}</span>
            <span>{active.tools.join(", ")}</span>
          </div>
        </header>

        <div className="space-y-2 text-[15px] leading-relaxed text-foreground/90">
          <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
            Role
          </h2>
          {active.role.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Info boxes */}
        <div className="grid grid-cols-1 gap-3">
          {active.boxes.map((box, i) => (
            <InfoBoxCard key={i} box={box} />
          ))}
        </div>

        {/* Compact before/after grid, real screenshots across multiple areas */}
        {active.media.beforeAfterSet && active.media.beforeAfterSet.length > 0 && (
          <div className="space-y-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Before / after, across the app
            </p>
            {active.media.beforeAfterSet.map((pair, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{pair.label}</p>
                <p className="text-sm leading-relaxed text-foreground/70">{pair.description}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Before</span>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                      <Image src={pair.before} alt={`${pair.label}, before`} fill className="object-contain" sizes="500px" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">After</span>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                      <Image src={pair.after} alt={`${pair.label}, after`} fill className="object-contain" sizes="500px" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}

function InfoBoxCard({ box }: { box: InfoBox }) {
  const Icon = ICONS[box.icon]
  const borderClass =
    box.variant === "accent"
      ? "border-2 border-foreground/70"
      : box.variant === "danger"
        ? "border border-red-800/40"
        : "border border-border/60"
  const iconColorClass =
    box.variant === "accent"
      ? "text-foreground"
      : box.variant === "danger"
        ? "text-red-700 dark:text-red-400"
        : "text-muted-foreground"

  return (
    <div className={cn("rounded-xl p-4 sm:p-5", borderClass)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColorClass)} strokeWidth={1.75} />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-medium text-foreground">{box.label}</p>
          <div className="space-y-1.5 text-sm leading-relaxed text-foreground/80">
            {box.body.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {box.quote && (
            <blockquote className="border-l-2 border-foreground/20 pl-3 text-sm italic leading-relaxed text-foreground/70">
              {box.quote}
            </blockquote>
          )}

          {box.steps && box.steps.length > 0 && (
            <ol className="space-y-1 pl-5 text-sm leading-relaxed text-foreground/80 [&>li]:list-decimal">
              {box.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          )}

          {box.flow && box.flow.length > 0 && (
            <div className="space-y-2 pt-1">
              {box.flow.map((group, gi) => (
                <div key={gi}>
                  <div className="flex flex-wrap items-center gap-2">
                    {group.steps.map((step, si) => (
                      <span key={si} className="contents">
                        {si > 0 && (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        )}
                        <span className="rounded-md border border-border/60 bg-foreground/[0.04] px-3 py-1.5 text-sm text-foreground/90">
                          {step}
                        </span>
                      </span>
                    ))}
                    {group.note && (
                      <span className="text-xs italic text-muted-foreground">{group.note}</span>
                    )}
                  </div>
                  {gi < box.flow!.length - 1 && (
                    <ArrowDown className="my-1 h-3.5 w-3.5 text-muted-foreground/50" />
                  )}
                </div>
              ))}
            </div>
          )}

          {box.code && (
            <code className="mt-1 inline-block rounded-md bg-foreground/[0.06] px-2.5 py-1.5 text-xs">
              {box.code}
            </code>
          )}

          {box.thumbnailImages && box.thumbnailImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              {box.thumbnailImages.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]"
                >
                  <Image src={src} alt="Design review notes" fill className="object-contain" sizes="400px" />
                </div>
              ))}
            </div>
          )}

          {box.codeBlocks && box.codeBlocks.length > 0 && (
            <div className="space-y-3">
              {box.codeBlocks.map((block, i) => (
                <div key={i} className="space-y-1.5">
                  {block.heading && (
                    <p className="text-sm leading-relaxed text-foreground/80">{block.heading}</p>
                  )}
                  {block.image ? (
                    <div className="relative w-full overflow-hidden rounded-md border border-border/40">
                      <Image
                        src={block.image}
                        alt={block.heading ?? "Design spec screenshot"}
                        width={block.imageWidth ?? 1600}
                        height={block.imageHeight ?? 1000}
                        className="h-auto w-full"
                        sizes="600px"
                      />
                    </div>
                  ) : (
                    <pre className="overflow-x-auto rounded-md bg-foreground/[0.06] px-3 py-2.5 text-xs leading-relaxed">
                      {block.content}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {box.footer && (
            <p className="text-sm leading-relaxed text-foreground/80">{box.footer}</p>
          )}

          {box.stat && (
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xl font-medium text-foreground">{box.stat.value}</span>
              <span className="text-xs text-muted-foreground">{box.stat.caption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
