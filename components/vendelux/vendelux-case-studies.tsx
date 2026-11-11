"use client"

import type React from "react"
import { useEffect, useRef } from "react"
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
  User,
  MessageCircle,
  Check,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { vendeluxProjects, type InfoBox } from "@/lib/vendelux-projects"
import { SegmentsCaseStudy } from "./segments-case-study"
import { RoiCaseStudy } from "./roi-case-study"
import { MeetingPlannerCaseStudy } from "./meeting-planner-case-study"
import { ComingSoon } from "./coming-soon"

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

  // Arriving with ?project= (from a homepage tile, or after the password screen):
  // skip the page intro and land on the project tabs.
  const tabsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!searchParams.get("project")) return
    const frame = requestAnimationFrame(() => {
      const el = tabsRef.current
      if (!el) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
    })
    return () => cancelAnimationFrame(frame)
    // Only on first arrival; tab clicks on the page keep their scroll position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectProject(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("project", slug)
    router.push(`/work/vendelux?${params.toString()}`, { scroll: false })
  }

  return (
    <div>
      {/* Pill switcher */}
      <div ref={tabsRef} className="mb-10 flex flex-wrap gap-2">
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
            {project.comingSoon && (
              <span className="ml-1.5 rounded-full bg-amber-300 px-1.5 py-px text-[10px] font-semibold tracking-wide text-amber-950 uppercase">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active project content */}
      {active.slug === "segments" ? (
        <SegmentsCaseStudy />
      ) : active.slug === "roi-calculator" ? (
        <RoiCaseStudy />
      ) : active.slug === "meeting-planner" ? (
        <MeetingPlannerCaseStudy />
      ) : active.comingSoon ? (
        <ComingSoon project={active} />
      ) : (
      <article className="space-y-8">
        <header className="space-y-1.5">
          <p className="cs-eyebrow">{active.title}</p>
          <h1 className="cs-h1">{active.challenge ?? active.title}</h1>
          <p className="text-sm text-foreground/60">
            {active.duration}
            {" · "}
            {active.whatIDid}
          </p>
          {active.role.map((p, i) => (
            <p key={i} className="text-xs text-foreground/50">
              {p}
            </p>
          ))}
        </header>

        {/* Quick facts */}
        {active.quickFacts && active.quickFacts.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-border/40 bg-muted/10">
            <div className="grid grid-cols-1 divide-y divide-border/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {active.quickFacts.slice(0, 3).map((fact, i) => (
                <div key={i} className="p-4">
                  <span className="cs-eyebrow mb-1 block">
                    {fact.label}
                  </span>
                  <span className="text-base text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
            {active.quickFacts.slice(3).map((fact, i) => (
              <div key={i} className="border-t border-border/40 p-4">
                <span className="cs-eyebrow mb-1 block">
                  {fact.label}
                </span>
                <span className="text-base text-foreground">{fact.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 rounded-lg border border-border/40 bg-muted/20 p-4">
          <p className="text-sm leading-relaxed text-foreground/80">{active.intro.text}</p>
        </div>

        {/* Before shot + transition */}
        {active.beforeShot && (
          <div className="space-y-2">
            <span className="cs-eyebrow">
              {active.beforeShot.label ?? "Before"}
            </span>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
              <Image
                src={active.beforeShot.image}
                alt={active.beforeShot.alt}
                fill
                className="object-contain"
                sizes="800px"
              />
            </div>
          </div>
        )}
        {active.transition && (
          <p className="text-sm leading-relaxed text-foreground/70 italic">{active.transition}</p>
        )}

        {/* Info boxes */}
        <div className="grid grid-cols-1 gap-3">
          {active.boxes.map((box, i) => (
            <InfoBoxCard
              key={i}
              box={box}
              id={i === active.boxes.findIndex((b) => b.icon === "chart-line") ? "results" : undefined}
            />
          ))}
        </div>

        {/* Compact before/after grid, real screenshots across multiple areas */}
        {active.media.beforeAfterSet && active.media.beforeAfterSet.length > 0 && (
          <div className="space-y-8 pt-2">
            <p className="cs-eyebrow">
              Before / after, across the app
            </p>
            {active.media.beforeAfterSet.map((pair, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{pair.label}</p>
                <p className="text-sm leading-relaxed text-foreground/70">{pair.description}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="cs-eyebrow">Before</span>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                      <Image src={pair.before} alt={`${pair.label}, before`} fill className="object-contain" sizes="500px" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="cs-eyebrow">After</span>
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
      )}
    </div>
  )
}

function InfoBoxCard({ box, id }: { box: InfoBox; id?: string }) {
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
    <div id={id} className={cn("scroll-mt-32 rounded-xl p-4 sm:p-5 outline-none", borderClass)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColorClass)} strokeWidth={1.75} />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
            {box.label}
            {box.badge && (
              <span className="rounded-full border border-amber-600/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-400">
                {box.badge}
              </span>
            )}
          </p>
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

          {box.timeline && box.timeline.length > 0 && (
            <ol className="relative grid gap-4 pt-2 sm:grid-flow-col sm:auto-cols-fr sm:gap-3">
              <span aria-hidden className="absolute left-[5px] top-3 bottom-3 w-px bg-border sm:left-0 sm:right-0 sm:top-[7px] sm:bottom-auto sm:h-px sm:w-auto" />
              {box.timeline.map((t, i) => (
                <li key={i} className="relative pl-6 sm:pl-0 sm:pt-6">
                  <span aria-hidden className={cn("absolute left-0 top-1 h-[11px] w-[11px] rounded-full border-2 border-background sm:top-[2px]", i === box.timeline!.length - 1 ? "bg-[#4a0e4e]" : "bg-foreground/40")} />
                  <p className="text-xs font-semibold tabular-nums text-foreground">{t.when}</p>
                  <p className="mt-0.5 text-xs leading-snug text-foreground/65">{t.what}</p>
                </li>
              ))}
            </ol>
          )}

          {box.funnel && box.funnel.length > 0 && (
            <div className="flex flex-wrap items-stretch gap-1.5 pt-1">
              {box.funnel.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                  <div className={cn("rounded-lg px-3 py-2", f.added ? "border border-dashed border-[#4a0e4e]/60 bg-[#4a0e4e]/[0.06]" : "border border-border/60 bg-foreground/[0.03]")}>
                    <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">{f.added ? `New · ${f.label}` : f.label}</p>
                    <p className="text-base font-semibold tabular-nums text-foreground">{f.value}</p>
                    {f.note && <p className="text-[11px] text-muted-foreground">{f.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {box.compare && (
            <div className="space-y-2 pt-1">
              {box.compare.bars.map((b, i) => {
                const max = Math.max(...box.compare!.bars.map((x) => x.value))
                return (
                  <div key={i} className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)] items-center gap-3">
                    <span className="text-xs text-foreground/70">{b.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-6 rounded-md", b.accent ? "bg-[#4a0e4e]" : "bg-foreground/15")} style={{ width: `${Math.max(6, (b.value / max) * 100)}%` }} />
                      <span className={cn("shrink-0 text-sm font-semibold tabular-nums", b.accent ? "text-foreground" : "text-foreground/60")}>{b.display}</span>
                    </div>
                  </div>
                )
              })}
              {box.compare.caption && <p className="text-xs text-muted-foreground">{box.compare.caption}</p>}
            </div>
          )}

          {box.split && box.split.length > 0 && (
            <div className="grid gap-3 pt-1 sm:grid-cols-2">
              {box.split.map((col, i) => (
                <div key={i} className={cn("rounded-lg p-3", col.accent ? "bg-[#4a0e4e] text-white" : "border border-border/60 bg-foreground/[0.03]")}>
                  <p className={cn("mb-2 text-[10px] font-semibold tracking-wide uppercase", col.accent ? "text-white/70" : "text-muted-foreground")}>{col.title}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {col.items.map((it) => (
                      <li key={it} className={cn("rounded-md px-2 py-1 text-xs", col.accent ? "bg-white/15" : "border border-border/60 bg-background")}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {box.tree && (
            <div className="space-y-0 pt-1">
              <div className="mx-auto max-w-md rounded-lg bg-[#4a0e4e] p-3 text-white">
                <p className="text-sm font-semibold">{box.tree.root}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {box.tree.rootItems.map((it) => (
                    <span key={it} className="rounded-md bg-white/15 px-2 py-0.5 text-xs">{it}</span>
                  ))}
                </div>
              </div>
              <div aria-hidden className="mx-auto h-4 w-px bg-border" />
              <div className="relative grid gap-2 sm:grid-cols-3">
                <span aria-hidden className="absolute left-[16.6%] right-[16.6%] top-0 hidden h-px bg-border sm:block" />
                {box.tree.children.map((c) => (
                  <div key={c.title} className="relative rounded-lg border border-border/60 bg-foreground/[0.03] p-3 sm:mt-4">
                    <span aria-hidden className="absolute -top-4 left-1/2 hidden h-4 w-px bg-border sm:block" />
                    <p className="text-sm font-medium text-foreground">{c.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {c.items.map((it) => (
                        <span key={it} className="rounded-md border border-border/60 bg-background px-2 py-0.5 text-xs text-foreground/75">{it}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

          {box.journey && box.journey.length > 0 && (
            <div className="relative space-y-3 py-1 pl-8">
              <div className="vendelux-dash-line absolute top-1 bottom-1 left-[13px] w-px" />
              {box.journey.map((turn, i) => {
                const ActorIcon = turn.actor === "customer" ? User : MessageCircle
                return (
                  <div
                    key={i}
                    className="vendelux-step-in relative"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <span className="absolute top-0 -left-8 flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background">
                      <ActorIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    </span>
                    {turn.isQuote ? (
                      <div className="inline-block rounded-2xl rounded-tl-sm border border-border/60 bg-foreground/[0.04] px-3.5 py-2 text-sm text-foreground/90 italic">
                        &ldquo;{turn.text}&rdquo;
                      </div>
                    ) : (
                      <p className="pt-1 text-sm leading-relaxed text-foreground/80">{turn.text}</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {box.questionCards && box.questionCards.length > 0 && (
            <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
              {box.questionCards.map((q, i) => (
                <div
                  key={i}
                  className="vendelux-step-in flex items-start gap-2.5 rounded-lg border border-border/60 bg-foreground/[0.03] p-3"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[11px] font-medium text-foreground/70">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/85">{q}</p>
                </div>
              ))}
            </div>
          )}

          {box.optionCards && box.optionCards.length > 0 && (
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
              {box.optionCards.map((opt, i) => (
                <div
                  key={i}
                  className={cn(
                    "vendelux-step-in space-y-1.5 rounded-lg p-3",
                    opt.selected
                      ? "border-2 border-foreground/70 bg-foreground/[0.04]"
                      : "border border-border/60",
                  )}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="flex items-center gap-1.5">
                    {opt.selected && <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />}
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/70">{opt.description}</p>
                  {opt.example && (
                    <pre className="overflow-x-auto rounded bg-foreground/[0.06] px-2 py-1.5 text-[11px] leading-relaxed whitespace-pre-wrap">
                      {opt.example}
                    </pre>
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

          {box.inlineBeforeAfter && (
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
              <div className="space-y-1.5">
                <span className="cs-eyebrow">Before</span>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                  <Image src={box.inlineBeforeAfter.before} alt={`${box.label}, before`} fill className="object-contain" sizes="400px" />
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="cs-eyebrow">After</span>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                  <Image src={box.inlineBeforeAfter.after} alt={`${box.label}, after`} fill className="object-contain" sizes="400px" />
                </div>
              </div>
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

          {box.stepCompare && (
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
              <div className="space-y-1.5">
                <span className="cs-eyebrow">
                  {box.stepCompare.beforeLabel}
                </span>
                <ol className="space-y-1 text-sm text-foreground/70 [&>li]:list-decimal [&>li]:pl-1.5 pl-4">
                  {box.stepCompare.beforeSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-1.5">
                <span className="cs-eyebrow">
                  {box.stepCompare.afterLabel}
                </span>
                <ol className="space-y-1 text-sm text-foreground/70 [&>li]:list-decimal [&>li]:pl-1.5 pl-4">
                  {box.stepCompare.afterSteps.map((step, i) => (
                    <li
                      key={i}
                      className={cn(
                        box.stepCompare!.highlightAfterIndexes?.includes(i) &&
                          "-ml-1.5 rounded-md bg-amber-400/20 pl-2.5 font-medium text-foreground",
                      )}
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {box.beforeAfterPairs && box.beforeAfterPairs.length > 0 && (
            <div className="space-y-6 pt-1">
              {box.beforeAfterPairs.map((pair, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-medium text-foreground">{pair.label}</p>
                  <p className="text-sm leading-relaxed text-foreground/70">{pair.description}</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <span className="cs-eyebrow">Before</span>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                        <Image src={pair.before} alt={`${pair.label}, before`} fill className="object-contain" sizes="500px" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="cs-eyebrow">After</span>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-foreground/[0.03]">
                        <Image src={pair.after} alt={`${pair.label}, after`} fill className="object-contain" sizes="500px" />
                      </div>
                    </div>
                  </div>
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

          {box.numberedCards && box.numberedCards.length > 0 && (
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
              {box.numberedCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 text-white"
                  style={{ backgroundColor: "#4a0e4e" }}
                >
                  <p className="text-2xl font-semibold">{card.number}</p>
                  <p className="mt-3 text-base font-medium">{card.title}</p>
                  {card.description && (
                    <p className="mt-1 text-sm text-white/75">{card.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {box.barChart && (
            <div className="pt-2">
              <div className="flex items-end gap-3">
                {box.barChart.bars.map((bar, i) => {
                  const max = Math.max(...box.barChart!.bars.map((b) => b.value))
                  const heightPct = Math.max((bar.value / max) * 100, 4)
                  return (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">{bar.value}</span>
                      <div className="flex h-32 w-full items-end">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-b from-rose-300 to-rose-600"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{bar.label}</span>
                    </div>
                  )
                })}
              </div>
              {box.barChart.summary && (
                <p className="pt-4 text-xl font-medium text-foreground">{box.barChart.summary}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
