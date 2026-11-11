"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Clean, uniform project covers: a flat colored tile with a phone or browser frame,
 * cropped at the bottom. Inside the frame runs a quick interaction demo: either a real
 * screen recording of the prototype, or a tap-through of the real prototype screens
 * with a touch indicator and iOS-style push transitions. The round button pauses it.
 */
export type FlowStep = {
  src: string
  /** Where the finger taps before moving on, in % of the screen. */
  tap?: [number, number]
  /** How the NEXT screen arrives after this step. */
  next?: "push" | "fade" | "none"
  hold?: number
}

export type CoverSpec = {
  kind: "phone" | "desktop" | "image" | "video"
  /** Tile background. */
  bg: string
  /** Static screens. The first one doubles as the poster. */
  screens: string[]
  /** A real screen recording to play inside the frame. */
  video?: string
  /** A scripted tap-through of real screens. */
  flow?: FlowStep[]
  dark?: boolean
  fit?: "contain" | "cover"
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, inView }
}

/* ---------- tap-through of real screens ---------- */

function Flow({ steps, playing, sizes, alt }: { steps: FlowStep[]; playing: boolean; sizes: string; alt: string }) {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [how, setHow] = useState<"push" | "fade" | "none">("fade")
  const [tap, setTap] = useState<"off" | "on" | "press">("off")

  useEffect(() => {
    if (!playing) return
    const s = steps[cur]
    const timers: ReturnType<typeof setTimeout>[] = []
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
    const hold = s.hold ?? 1100
    const advance = () => {
      const nextIdx = (cur + 1) % steps.length
      setTap("off")
      setHow(nextIdx === 0 ? "fade" : s.next ?? "push")
      setPrev(cur)
      setCur(nextIdx)
    }
    if (s.tap) {
      at(hold, () => setTap("on"))
      at(hold + 450, () => setTap("press"))
      at(hold + 700, advance)
    } else {
      at(hold, advance)
    }
    return () => timers.forEach(clearTimeout)
  }, [cur, playing, steps])

  const step = steps[cur]
  const curSrc = step.src
  const prevSrc = prev !== null ? steps[prev].src : null
  const changed = prevSrc !== null && prevSrc !== curSrc
  const layers = steps.map((x) => x.src).filter((src, k, all) => all.indexOf(src) === k)
  return (
    <>
      {layers.map((src, k) => {
        const isCur = src === curSrc
        const isPrev = changed && src === prevSrc
        const anim = isCur && changed
          ? how === "push"
            ? "animate-[cover-push-in_.42s_cubic-bezier(.2,.8,.2,1)_both]"
            : "animate-[cover-fade-in_.35s_ease-out_both]"
          : isPrev && how === "push"
            ? "animate-[cover-push-out_.42s_cubic-bezier(.2,.8,.2,1)_both]"
            : ""
        return (
          <div key={src} className={cn("absolute inset-0", isCur ? "z-20 opacity-100" : isPrev ? "z-10 opacity-100" : "z-0 opacity-0", anim)}>
            <Image src={src} alt={k === 0 ? alt : ""} fill sizes={sizes} className="object-cover object-top" />
          </div>
        )
      })}
      {step.tap && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-30 h-[9%] max-h-7 min-h-4 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90 bg-neutral-500/40 shadow-[0_2px_8px_rgba(0,0,0,.25)] transition-[opacity,transform] duration-200",
            tap === "off" ? "scale-125 opacity-0" : tap === "on" ? "scale-100 opacity-100" : "scale-75 opacity-100",
          )}
          style={{ left: `${step.tap[0]}%`, top: `${step.tap[1]}%` }}
        />
      )}
    </>
  )
}

/* ---------- the cover ---------- */

export function ProjectCover({ spec, alt, large = false, className }: { spec: CoverSpec; alt: string; large?: boolean; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const animated = !!spec.video || !!spec.flow
  const playing = animated && inView && !paused && !reduced

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [playing])

  const toggle = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setPaused((p) => !p)
  }

  const phoneSizes = "(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
  const deskSizes = large ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"

  const screen = (sizes: string) =>
    spec.video ? (
      <video ref={videoRef} muted loop playsInline preload="metadata" poster={spec.screens[0]} className="absolute inset-0 h-full w-full object-cover object-top">
        <source src={spec.video} type="video/mp4" />
      </video>
    ) : spec.flow ? (
      <Flow steps={spec.flow} playing={playing} sizes={sizes} alt={alt} />
    ) : (
      <Image src={spec.screens[0]} alt={alt} fill sizes={sizes} className="object-cover object-top" />
    )

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden rounded-2xl", large ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[3/2]", className)} style={{ background: spec.bg }}>
      {spec.kind === "video" && spec.video && (
        <video ref={videoRef} muted loop playsInline preload="metadata" poster={spec.screens[0]} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <source src={spec.video} type="video/mp4" />
        </video>
      )}

      {spec.kind === "phone" && (
        <div className="absolute left-1/2 top-[8%] w-[34%] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-[3%]">
          <div className={cn("aspect-[9/19.5] rounded-[16%/7.4%] p-[3.2%] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]", spec.dark ? "bg-neutral-800 ring-1 ring-white/10" : "bg-neutral-950 ring-1 ring-black/5")}>
            <div className="relative h-full w-full overflow-hidden rounded-[13%/6%] bg-white">{screen(phoneSizes)}</div>
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
            <div className="relative aspect-[16/10] w-full bg-white">{screen(deskSizes)}</div>
          </div>
        </div>
      )}

      {spec.kind === "image" && (
        <div className={cn("absolute transition-transform duration-700 ease-out group-hover:scale-[1.03]", spec.fit === "cover" ? "inset-0" : "inset-[8%]")}>
          <Image src={spec.screens[0]} alt={alt} fill sizes="(min-width: 1024px) 400px, 90vw" className={spec.fit === "cover" ? "object-cover" : "object-contain"} />
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
            "absolute bottom-3 left-3 z-40 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors sm:bottom-4 sm:left-4 sm:h-9 sm:w-9",
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
