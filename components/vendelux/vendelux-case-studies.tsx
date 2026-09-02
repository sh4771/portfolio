"use client"

import type React from "react"
import {
  Route,
  GitBranch,
  Lightbulb,
  AlertTriangle,
  FlaskConical,
  LineChart,
  Map as MapIcon,
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
        <div className="grid gap-3">
          {active.boxes.map((box, i) => (
            <InfoBoxCard key={i} box={box} />
          ))}
        </div>

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
          {box.code && (
            <code className="mt-1 inline-block rounded-md bg-foreground/[0.06] px-2.5 py-1.5 text-xs">
              {box.code}
            </code>
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
