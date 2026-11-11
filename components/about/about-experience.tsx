"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { RESUME_PDF } from "@/lib/resume"
import { ResumeDeck } from "@/components/about/resume-deck"
import {
  Coffee,
  Download,
  FileText,
  Hand,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DOCK, miniOffsetFromCenter } from "@/lib/dock"

export const ABOUT_NAV: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "hello", label: "Hello", icon: Hand },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "off-the-clock", label: "Off the clock", icon: Coffee },
  { id: "fun-fact", label: "Fun fact", icon: Sparkles },
]
const NAV = ABOUT_NAV

const INTRO = [
  "I'm Violet Hyun, a product designer in New York drawn to complex problems, because they usually hide the most important human needs.",
]

/* ---------- small pieces ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium tracking-[0.16em] text-foreground/50 uppercase">{children}</p>
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-[640px] text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
    </div>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="underline decoration-foreground/30 underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/60">
      {children}
    </a>
  )
}

function Photo({ src, alt, sizes = "260px", className }: { src: string; alt: string; sizes?: string; className?: string }) {
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-2xl bg-muted/50", className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
    </div>
  )
}

/* ---------- Mini Violet intro: flies from the chat button to the photo, then talks ---------- */

function useIntroFlight(slotRef: React.RefObject<HTMLDivElement | null>) {
  const [phase, setPhase] = useState<"waiting" | "flying" | "landed">("waiting")
  const [overlay, setOverlay] = useState<null | { x: number; y: number; w: number; h: number }>(null)
  const figRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const slot = slotRef.current
    if (reduce || !slot || window.scrollY > 80) {
      setPhase("landed")
      return
    }
    const r = slot.getBoundingClientRect()
    if (r.bottom < 0 || r.top > window.innerHeight) {
      setPhase("landed")
      return
    }
    document.documentElement.classList.add("mv-intro")
    setOverlay({ x: r.left, y: r.top, w: r.width, h: r.height })
    setPhase("flying")
    return () => document.documentElement.classList.remove("mv-intro")
  }, [slotRef])

  useEffect(() => {
    if (phase !== "flying" || !overlay || !figRef.current || !discRef.current) return
    // Where Mini Violet sits in the dock.
    const size = 38
    const fromCx = window.innerWidth / 2 + miniOffsetFromCenter()
    const fromCy = window.innerHeight - DOCK.bottom - DOCK.height / 2
    const toCx = overlay.x + overlay.w / 2
    const toCy = overlay.y + overlay.h / 2
    const dx = fromCx - toCx
    const dy = fromCy - toCy
    const s = size / overlay.h

    const disc = discRef.current.animate(
      [
        { transform: "scale(1)", opacity: 1, filter: "brightness(1)" },
        { transform: "scale(1.35)", opacity: 1, filter: "brightness(1.6)", offset: 0.55 },
        { transform: "scale(0.6)", opacity: 0, filter: "brightness(2)" },
      ],
      { duration: 650, easing: "cubic-bezier(.3,.7,.4,1)", fill: "forwards" },
    )
    const fig = figRef.current.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0 },
        { transform: `translate(${dx}px, ${dy}px) scale(${s * 1.4})`, opacity: 1, offset: 0.3 },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 140}px) scale(${(s + 1) / 2})`, opacity: 1, offset: 0.68 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ],
      { duration: 1500, delay: 380, easing: "cubic-bezier(.45,.05,.25,1)", fill: "forwards" },
    )
    const land = () => {
      setPhase("landed")
      setOverlay(null)
      document.documentElement.classList.remove("mv-intro")
    }
    fig.onfinish = land
    // The flying figure is pinned to the screen, so scrolling mid-flight would leave it
    // stranded over other content. Skip straight to the landed state instead.
    const startY = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) < 8) return
      disc.cancel()
      fig.cancel()
      land()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      disc.cancel()
      fig.cancel()
    }
  }, [phase, overlay])

  const flight =
    phase === "flying" && overlay ? (
      <>
        <div
          ref={discRef}
          aria-hidden
          className="pointer-events-none fixed z-[70] overflow-hidden rounded-full shadow-[0_0_40px_10px_rgba(217,166,221,0.6)]"
          style={{
            width: 38,
            height: 38,
            left: window.innerWidth / 2 + miniOffsetFromCenter() - 19,
            bottom: DOCK.bottom + (DOCK.height - 38) / 2,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mini-violet/head.webp" alt="" className="h-full w-full bg-[#e2d3f3] object-cover" />
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            aria-hidden
            className="mv-spark pointer-events-none fixed z-[70] h-3 w-3"
            style={
              {
                left: window.innerWidth / 2 + miniOffsetFromCenter() - 6,
                bottom: DOCK.bottom + DOCK.height / 2 - 6,
                "--a": `${i * 60 + 15}deg`,
                animationDelay: `${i * 30}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        <div
          ref={figRef}
          aria-hidden
          className="pointer-events-none fixed z-[70] origin-center opacity-0"
          style={{ left: overlay.x, top: overlay.y, width: overlay.w, height: overlay.h }}
        >
          <Image src="/images/mini-violet/figure.webp" alt="" fill className="object-contain drop-shadow-[0_18px_22px_rgba(28,26,22,0.25)]" sizes="240px" priority />
        </div>
      </>
    ) : null

  return { phase, flight }
}

function TypedIntro({ start }: { start: boolean }) {
  const [n, setN] = useState(0)
  const first = INTRO[0]
  useEffect(() => {
    if (!start) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(first.length)
      return
    }
    let i = 0
    const t = setInterval(() => {
      i += 2
      setN(Math.min(i, first.length))
      if (i >= first.length) clearInterval(t)
    }, 22)
    return () => clearInterval(t)
  }, [start, first])
  const done = n >= first.length
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-foreground/80">
      {/* Full text for screen readers; the typed copy is decorative */}
      <p className="sr-only">{INTRO.join(" ")}</p>
      <p aria-hidden className="text-base font-medium leading-snug text-foreground">
        {first.slice(0, n)}
        <span className="opacity-0">{first.slice(n)}</span>
      </p>
      {INTRO.slice(1).map((p, i) => (
        <p
          key={i}
          aria-hidden
          className={cn("transition-all duration-700", done ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
          style={{ transitionDelay: done ? `${i * 250}ms` : "0ms" }}
        >
          {p}
        </p>
      ))}
    </div>
  )
}

/* ---------- sections ---------- */

function Hello() {
  const slotRef = useRef<HTMLDivElement>(null)
  const { phase, flight } = useIntroFlight(slotRef)
  return (
    <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,290px)_minmax(0,1fr)] lg:gap-14">
      <div className="relative mx-auto w-full max-w-[280px] lg:max-w-none">
        <div className="rounded-[32px] bg-white/70 p-3 shadow-[0_24px_60px_rgba(28,26,22,0.12)] dark:bg-white/5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <Image src="/images/about-photo.png" alt="Portrait of Violet Hyun" fill priority className="object-cover" sizes="(min-width: 1024px) 290px, 280px" />
          </div>
        </div>
        {/* Mini Violet lands here */}
        <div ref={slotRef} className="absolute -bottom-6 right-0 h-[190px] w-[92px] sm:-right-12 sm:h-[215px] sm:w-[104px]">
          <div className={cn("relative h-full w-full", phase === "landed" ? "opacity-100" : "opacity-0")}>
            <div className="h-full w-full motion-safe:animate-[mv-bob_3.2s_ease-in-out_infinite]">
              <Image src="/images/mini-violet/figure.webp" alt="Mini Violet, a 3D figure of Violet, waving" fill className="object-contain drop-shadow-[0_18px_22px_rgba(28,26,22,0.25)]" sizes="130px" />
            </div>
          </div>
        </div>
        {flight}
      </div>

      <div className="max-w-[560px] space-y-6">
        <div className="space-y-3">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Violet Hyun</h1>
        </div>
        <div
          className={cn(
            "relative rounded-3xl rounded-bl-md border border-border/60 bg-card p-5 shadow-[0_16px_40px_rgba(28,26,22,0.08)] transition-all duration-500 sm:p-6",
            phase === "landed" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          <p className="mb-3 flex items-center gap-2 text-xs font-medium text-foreground/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Mini Violet
          </p>
          <TypedIntro start={phase === "landed"} />
        </div>
        {/* The fastest way to the resume: right under the intro */}
        <div className="flex flex-wrap gap-2">
          <a href="#resume" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85">
            <FileText className="h-4 w-4" />
            See my resume
          </a>
          <a href={RESUME_PDF} download className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40">
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  )
}

/* Numbers in **double stars** render bold, matching the PDF. */
const HOBBIES = [
  {
    title: "Food is my love language.",
    body: (
      <>
        <TextLink href="https://beliapp.co/">Top 5% on Beli in NYC</TextLink>, plus a{" "}
        <TextLink href="https://editor.p5js.org/sh6363/full/mnrKWZok0">restaurant bot</TextLink> I built.
      </>
    ),
    photos: [
      { src: "/images/about-food-1.jpg", alt: "Beli top 5% restaurant ranker badge" },
      { src: "/images/about-food-2.jpg", alt: "Homemade dishes" },
      { src: "/images/about-food-3.jpg", alt: "Kitchen party" },
    ],
  },
  {
    title: "Sports with friends.",
    body: <>Golf, volleyball, the gym, and running.</>,
    photos: [
      { src: "/images/about-sports-2.jpg", alt: "Golfing" },
      { src: "/images/about-sports-1.jpg", alt: "Gym workout" },
      { src: "/images/about-sports-3.jpg", alt: "Skiing with friends" },
    ],
  },
]

function OffTheClock() {
  return (
    <div className="w-full space-y-10">
      <SectionHeader eyebrow="Off the clock" title="When I'm not designing" />
      <div className="grid gap-3 lg:grid-cols-2">
        {HOBBIES.map((h, i) => (
          <div key={h.title} className="space-y-4 rounded-3xl border border-border/60 bg-card p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(28,26,22,0.35)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="grid grid-cols-3 gap-2.5">
              {h.photos.map((ph) => (
                <Photo key={ph.src} src={ph.src} alt={ph.alt} sizes="(min-width: 1024px) 180px, 30vw" />
              ))}
            </div>
            <div className="space-y-1 px-1 pb-1">
              <p className="text-sm font-semibold text-foreground">{h.title}</p>
              <p className="max-w-[460px] text-sm leading-relaxed text-foreground/65">{h.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FunFact() {
  return (
    <div className="grid w-full items-center gap-8 rounded-[32px] bg-[#f4ecfb] p-5 sm:grid-cols-[minmax(0,200px)_minmax(0,1fr)] sm:p-8 lg:gap-12 dark:bg-[#2a2230]">
      <figure className="mx-auto w-full max-w-[200px] -rotate-2 transition-transform duration-500 hover:rotate-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/50">
          <Image src="/images/about-chunhyang.jpg" alt="Violet backstage at the Global Miss Chunhyang pageant, holding a violin" fill className="object-cover" sizes="220px" />
        </div>
      </figure>
      <div className="max-w-[560px] space-y-4">
        <Eyebrow>Fun fact</Eyebrow>
        <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-[1.75rem]">I want to share where I&apos;m from through what I design.</h2>
        <p className="text-[15px] leading-relaxed text-foreground/65">
          I was Global Miss Chunhyang, a title from one of Korea&apos;s representative beauty pageants, and I performed on violin on that stage.
          Representing Korea made me want to carry its culture into my work, and to tell stories that move people from knowing something to
          caring about it.
        </p>
      </div>
    </div>
  )
}

/* ---------- page: sticky section index + one normal scroll ---------- */

const SECTIONS: [string, () => React.JSX.Element][] = [
  ["hello", Hello],
  ["resume", ResumeDeck],
  ["off-the-clock", OffTheClock],
  ["fun-fact", FunFact],
]

export function AboutExperience() {
  const [active, setActive] = useState(NAV[0].id)
  const chipsRef = useRef<HTMLElement>(null)

  // Mobile: keep the active chip visible in the horizontal chip bar.
  useEffect(() => {
    const bar = chipsRef.current
    const chip = bar?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!bar || !chip || bar.scrollWidth <= bar.clientWidth) return
    bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" })
  }, [active])

  // Highlight the section that crosses a line about a third of the way down the screen.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let cur = NAV[0].id
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = NAV[NAV.length - 1].id
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const goTo = useCallback((e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    history.replaceState(null, "", `#${id}`)
  }, [])

  return (
    <div className="site-col pb-28 pt-24">
      <div className="min-w-0">
        {/* Mobile: sticky chip bar */}
        <nav ref={chipsRef} aria-label="On this page" className="sticky top-0 z-30 -mx-6 mb-10 flex gap-1 overflow-x-auto border-b border-border/60 bg-background/90 py-4 pl-[72px] pr-6 backdrop-blur [scrollbar-width:none] ">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => goTo(e, n.id)}
              aria-current={active === n.id ? "location" : undefined}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors",
                active === n.id ? "bg-foreground text-background" : "text-foreground/60",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="space-y-20 lg:space-y-24">
          {SECTIONS.map(([id, S]) => (
            <section key={id} id={id} aria-label={NAV.find((n) => n.id === id)?.label} className="scroll-mt-32">
              <S />
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
