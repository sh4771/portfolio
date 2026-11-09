"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const YELLOW = "#f7dc6f"
const VIOLET = "#5b3fe0"

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, seen }
}

function Phone({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.6rem] border-[5px] border-foreground bg-background shadow-[0_20px_50px_rgba(0,0,0,0.14)]", className)}>
      <Image src={src} alt={alt} width={390} height={844} className="h-auto w-full" sizes="240px" />
    </div>
  )
}

/* ---------- Research: four findings as filling 10-dot meters ---------- */

const FINDINGS = [
  { n: 0, label: "say the walk takes too long", take: "Time isn't the problem. Sameness is." },
  { n: 8, label: "made an unplanned stop recently", take: "People still want surprises." },
  { n: 9, label: "find out about things too late", take: "Finds live in feeds, not on routes." },
  { n: 10, label: "would detour 3 min for a sample sale", take: "A clear detour is an easy yes." },
]

export function Findings() {
  const { ref, seen } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {FINDINGS.map((f, i) => (
        <div key={f.label} className="flex flex-col gap-3 rounded-2xl border border-border/50 p-4">
          <p className="text-4xl font-semibold tabular-nums tracking-tight">
            {f.n}
            <span className="text-lg text-foreground/40">/10</span>
          </p>
          <div className="grid grid-cols-10 gap-1" aria-hidden>
            {Array.from({ length: 10 }).map((_, d) => (
              <span
                key={d}
                className="aspect-square rounded-full transition-colors duration-300"
                style={{
                  background: seen && d < f.n ? YELLOW : "color-mix(in srgb, currentColor 12%, transparent)",
                  transitionDelay: `${i * 150 + d * 60}ms`,
                }}
              />
            ))}
          </div>
          <p className="text-xs text-foreground/55">{f.label}</p>
          <p className="mt-auto text-sm font-medium leading-snug">{f.take}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Synthesis: pick a theme, see the rule and the screen it became ---------- */

const THEMES = [
  { short: "Sameness", theme: "Sameness, not time, is the problem", must: "Keep the route people already take. Make it feel new.", screen: "/images/along/check-in.webp" },
  { short: "Accidental finds", theme: "Discovery still happens, by accident", must: "Suggest the places people already stop for.", screen: "/images/along/check-in.webp" },
  { short: "Feeds vs. maps", theme: "Finds live in feeds, routes live in maps", must: "Put what's on today right on the route.", screen: "/images/along/sidequests.webp" },
  { short: "Cost of a detour", theme: "A detour needs a reason and a cost", must: "Show what it is and the minutes it adds.", screen: "/images/along/sidequests.webp" },
  { short: "Timing", theme: "Timing decides if a nudge helps or annoys", must: "Ask first, cap it at a few, one tap to skip.", screen: "/images/along/walking-nav.webp" },
  { short: "Nothing left", theme: "Walks leave little behind", must: "Keep each walk as a memory. Let Lolo grow.", screen: "/images/along/memory.webp" },
]

export function ThemeExplorer() {
  const [i, setI] = useState(0)
  const t = THEMES[i]
  return (
    <div className="grid gap-6 rounded-3xl border border-border/50 p-4 sm:grid-cols-[1fr_200px] sm:p-6">
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Research themes">
          {THEMES.map((x, k) => (
            <button
              key={x.short}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                k === i ? "border-transparent text-white" : "border-border/60 text-foreground/65 hover:border-foreground/40",
              )}
              style={k === i ? { background: VIOLET } : undefined}
            >
              {String(k + 1).padStart(2, "0")} {x.short}
            </button>
          ))}
        </div>
        <div key={i} className="space-y-4 motion-safe:animate-[sniffr-fade_.25s_ease-out]">
          <p className="text-sm text-foreground/55">{t.theme}</p>
          <p className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl text-balance">{t.must}</p>
        </div>
        <p className="mt-auto text-xs text-foreground/45">Tap a theme to see the screen it turned into.</p>
      </div>
      <div key={t.screen + i} className="mx-auto w-[170px] motion-safe:animate-[sniffr-rise_.3s_ease-out] sm:w-full">
        <Phone src={t.screen} alt={t.theme} />
      </div>
    </div>
  )
}

/* ---------- The walk: one phone, five steps, autoplays until touched ---------- */

const STEPS = [
  { src: "/images/along/check-in.webp", title: "Check in", body: "Pick today's mood and how much extra time you have." },
  { src: "/images/along/sidequests.webp", title: "Pick sidequests", body: "3 stops on your way, each with the minutes it adds." },
  { src: "/images/along/walking-nav.webp", title: "Walk", body: "The next sidequest sits right under each turn." },
  { src: "/images/along/lolo-grew.webp", title: "Lolo grows", body: "Every stop gives Lolo something from the place." },
  { src: "/images/along/memory.webp", title: "Keep the memory", body: "The walk stays, with its places, photos and notes." },
]

export function WalkThrough() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const { ref, seen } = useInView<HTMLDivElement>()

  useEffect(() => {
    if (!auto || !seen) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setTimeout(() => setI((x) => (x + 1) % STEPS.length), 2800)
    return () => clearTimeout(t)
  }, [auto, seen, i])

  const go = (k: number) => {
    setAuto(false)
    setI((k + STEPS.length) % STEPS.length)
  }

  return (
    <div ref={ref} className="grid items-center gap-8 rounded-3xl p-5 sm:grid-cols-[220px_1fr] sm:p-8" style={{ background: "color-mix(in srgb, #f7dc6f 22%, transparent)" }}>
      <div className="relative mx-auto w-[200px] sm:w-full">
        {STEPS.map((s, k) => (
          <div key={s.src} className={cn("transition-opacity duration-500", k === i ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0")}>
            <Phone src={s.src} alt={s.title} />
          </div>
        ))}
      </div>
      <ol className="space-y-1.5">
        {STEPS.map((s, k) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => go(k)}
              aria-current={k === i ? "step" : undefined}
              className={cn("w-full rounded-2xl px-4 py-3 text-left transition-colors", k === i ? "bg-background shadow-sm" : "hover:bg-background/50")}
            >
              <span className="flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-foreground/40">{k + 1}</span>
                <span className={cn("text-sm font-medium", k === i ? "text-foreground" : "text-foreground/60")}>{s.title}</span>
              </span>
              {k === i && <span className="mt-1 block pl-6 text-xs text-foreground/60">{s.body}</span>}
              {k === i && auto && (
                <span className="mt-2 ml-6 block h-0.5 overflow-hidden rounded-full bg-foreground/10">
                  <span key={i} className="block h-full origin-left bg-foreground/50 motion-safe:animate-[along-progress_2.8s_linear_forwards]" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- Lolo: tap to see him grow ---------- */

export function LoloGrow() {
  const [grown, setGrown] = useState(false)
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[220px_1fr]">
      <button type="button" onClick={() => setGrown((g) => !g)} className="group relative mx-auto block w-[200px] sm:w-full" aria-label={grown ? "Show Lolo at the start" : "Show Lolo after a few walks"}>
        <div className={cn("transition-opacity duration-500", grown ? "opacity-0" : "opacity-100")}>
          <Phone src="/images/along/meet-lolo.webp" alt="Lolo on day one" />
        </div>
        <div className={cn("absolute inset-0 transition-opacity duration-500", grown ? "opacity-100" : "opacity-0")}>
          <Phone src="/images/along/lolo-grew.webp" alt="Lolo after a vintage sidequest, wearing round glasses" />
        </div>
      </button>
      <div className="space-y-4">
        <div className="inline-flex rounded-full border border-border/60 p-1 text-sm">
          <button type="button" onClick={() => setGrown(false)} className={cn("rounded-full px-4 py-1.5 transition-colors", !grown && "bg-foreground text-background")}>
            Day one
          </button>
          <button type="button" onClick={() => setGrown(true)} className={cn("rounded-full px-4 py-1.5 transition-colors", grown && "bg-foreground text-background")}>
            After a few walks
          </button>
        </div>
        <p className="max-w-sm text-2xl font-semibold leading-tight tracking-tight text-balance">
          {grown ? "Round glasses, from a vintage shop stop." : "Small for now. Every place leaves a mark."}
        </p>
        <p className="max-w-sm text-sm text-foreground/55">One companion that grows with you, in place of a pile of badges.</p>
      </div>
    </div>
  )
}
