"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Clean, uniform project covers: a flat colored tile with the real prototype screens
 * inside a phone or browser frame, cropped at the bottom. Screens cross-fade on a loop
 * while the tile is on screen; the round button pauses it.
 */
export type CoverSpec = {
  kind: "phone" | "desktop" | "image"
  /** Tile background. */
  bg: string
  screens: string[]
  /** Light frame details on dark tiles. */
  dark?: boolean
  /** For kind "image": how the picture sits in the tile. */
  fit?: "contain" | "cover"
}

const STEP_MS = 2600

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, inView }
}

function Screens({ screens, i, sizes, alt, contain }: { screens: string[]; i: number; sizes: string; alt: string; contain?: boolean }) {
  return (
    <>
      {screens.map((src, k) => (
        <Image
          key={src}
          src={src}
          alt={k === 0 ? alt : ""}
          fill
          sizes={sizes}
          className={cn(contain ? "object-contain" : "object-cover object-top", "transition-opacity duration-700 ease-out", k === i ? "opacity-100" : "opacity-0")}
        />
      ))}
    </>
  )
}

export function ProjectCover({ spec, alt, large = false, className }: { spec: CoverSpec; alt: string; large?: boolean; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const animated = spec.screens.length > 1

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (!animated || paused || !inView || reduced) return
    const t = setTimeout(() => setI((x) => (x + 1) % spec.screens.length), STEP_MS)
    return () => clearTimeout(t)
  }, [animated, paused, inView, reduced, i, spec.screens.length])

  const toggle = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setPaused((p) => !p)
  }

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden rounded-2xl", large ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[3/2]", className)} style={{ background: spec.bg }}>
      {spec.kind === "phone" && (
        <div className="absolute left-1/2 top-[8%] w-[34%] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-[3%]">
          <div className={cn("aspect-[9/19.5] rounded-[16%/7.4%] p-[3.2%] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]", spec.dark ? "bg-neutral-800 ring-1 ring-white/10" : "bg-neutral-950 ring-1 ring-black/5")}>
            <div className="relative h-full w-full overflow-hidden rounded-[13%/6%] bg-white">
              <Screens screens={spec.screens} i={i} sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw" alt={alt} />
            </div>
          </div>
        </div>
      )}

      {spec.kind === "desktop" && (
        <div className={cn("absolute left-1/2 -translate-x-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-[2%]", large ? "top-[9%] w-[78%]" : "top-[12%] w-[84%]")}>
          <div className={cn("overflow-hidden rounded-[10px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ring-1", spec.dark ? "bg-neutral-800 ring-white/10" : "bg-white ring-black/10")}>
            <div className={cn("flex h-[18px] items-center gap-1 px-2.5 sm:h-[22px]", spec.dark ? "bg-neutral-800" : "bg-neutral-100")}>
              {[0, 1, 2].map((d) => (
                <span key={d} className={cn("h-[6px] w-[6px] rounded-full sm:h-[7px] sm:w-[7px]", spec.dark ? "bg-white/25" : "bg-neutral-300")} />
              ))}
            </div>
            <div className="relative aspect-[16/10] w-full bg-white">
              <Screens screens={spec.screens} i={i} sizes={large ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"} alt={alt} />
            </div>
          </div>
        </div>
      )}

      {spec.kind === "image" && (
        <div className={cn("absolute transition-transform duration-700 ease-out group-hover:scale-[1.03]", spec.fit === "cover" ? "inset-0" : "inset-[8%]")}>
          <Screens screens={spec.screens} i={i} sizes="(min-width: 1024px) 400px, 90vw" alt={alt} contain={spec.fit !== "cover"} />
        </div>
      )}

      {animated && !reduced && (
        <span
          role="button"
          tabIndex={0}
          aria-label={paused ? "Play cover animation" : "Pause cover animation"}
          onClick={toggle}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(e)}
          className={cn(
            "absolute bottom-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors sm:bottom-4 sm:left-4 sm:h-9 sm:w-9",
            spec.dark ? "bg-white/15 text-white hover:bg-white/25" : "bg-neutral-900/10 text-neutral-800 hover:bg-neutral-900/20",
          )}
        >
          {paused ? <Play className="h-3.5 w-3.5 fill-current" /> : <Pause className="h-3.5 w-3.5 fill-current" />}
        </span>
      )}
    </div>
  )
}

/** Year + title under a cover, like a product gallery. */
export function CoverMeta({ year, title, readMins, extra }: { year: string; title: string; readMins?: number; extra?: React.ReactNode }) {
  return (
    <div className="mt-3 space-y-0.5">
      <p className="text-sm text-foreground/45">
        {year}
        {readMins ? ` · ${readMins} min read` : ""}
        {extra}
      </p>
      <h3 className="text-[15px] font-medium leading-snug tracking-tight text-foreground/85 transition-colors group-hover:text-foreground">{title}</h3>
    </div>
  )
}
