"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  GraduationCap,
  Linkedin,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { id: "hello", label: "Hello" },
  { id: "at-a-glance", label: "At a glance" },
  { id: "off-the-clock", label: "Off the clock" },
  { id: "fun-fact", label: "Fun fact" },
]

const INTRO = [
  "I'm Violet Hyun, a product designer in New York drawn to complex problems, because they usually hide the most important human needs.",
]

const EXPERIENCE = [
  { org: "Vendelux", role: "Product Intern", when: "Mar 2026 – Present", domain: "vendelux.com", href: "https://www.vendelux.com/", now: true },
  { org: "Stealth AI startup", role: "UX Designer", when: "Nov 2025 – Jan 2026" },
  { org: "Columbia ROAR Lab", role: "Web Designer & Graduate Researcher", when: "May 2025 – Mar 2026", domain: "columbia.edu", href: "https://roar.me.columbia.edu/" },
  { org: "Miss K Cosmetics", role: "Design", when: "May – Aug 2023", domain: "misskcosmetics.com", logo: "/images/logos/miss-k.png", href: "https://misskcosmetics.com/" },
  { org: "K Museum of Contemporary Art", role: "Design", when: "May – Aug 2022", domain: "kmcaseoul.org", logo: "/images/logos/kmca.png", href: "https://www.kmcaseoul.org/" },
  { org: "Chloé", role: "Merchandising", domain: "chloe.com", href: "https://www.chloe.com/" },
]

const EDUCATION = [
  { org: "Columbia University GSAPP", degree: "M.S. Computational Design Practices", when: "May 2026", domain: "columbia.edu" },
  { org: "NYU Tisch School of the Arts", degree: "B.F.A. Interactive Media Arts, CS minor", when: "Dec 2024", domain: "nyu.edu" },
]

const TOOLS = ["Figma", "Claude Code", "Cursor", "Figma MCP", "v0", "Framer", "HTML/CSS", "Python", "Rhino + Grasshopper"]

/* ---------- small pieces ---------- */

function Logo({ domain, logo, label }: { domain?: string; logo?: string; label: string }) {
  // Try a local logo file first, then two favicon services, then fall back to the initial.
  const sources = [
    logo,
    domain && `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    domain && `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ].filter(Boolean) as string[]
  const [idx, setIdx] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const next = useCallback(() => setIdx((i) => i + 1), [])
  // A source can fail before hydration attaches onError; check after each swap.
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) next()
  }, [idx, next])
  const src = sources[idx]
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/60 bg-white">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          ref={imgRef}
          src={src}
          alt=""
          className={src === logo ? "h-7 w-7 object-contain" : "h-5 w-5 object-contain"}
          onError={next}
        />
      ) : (
        <span className="text-xs font-semibold text-neutral-500">{label.slice(0, 1)}</span>
      )}
    </span>
  )
}

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
    // Where the chat button sits (bottom-right corner).
    const size = window.innerWidth >= 640 ? 64 : 56
    const inset = window.innerWidth >= 640 ? 24 : 20
    const fromCx = window.innerWidth - inset - size / 2
    const fromCy = window.innerHeight - inset - size / 2
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
    fig.onfinish = () => {
      setPhase("landed")
      setOverlay(null)
      document.documentElement.classList.remove("mv-intro")
    }
    return () => {
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
            width: window.innerWidth >= 640 ? 64 : 56,
            height: window.innerWidth >= 640 ? 64 : 56,
            right: window.innerWidth >= 640 ? 24 : 20,
            bottom: window.innerWidth >= 640 ? 24 : 20,
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
                right: (window.innerWidth >= 640 ? 24 : 20) + 26,
                bottom: (window.innerWidth >= 640 ? 24 : 20) + 26,
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
      </div>
    </div>
  )
}

function Glance() {
  const card = "rounded-2xl border border-border/60 bg-card p-4 shadow-[0_8px_24px_rgba(28,26,22,0.05)]"
  return (
    <div className="w-full space-y-5">
      <SectionHeader eyebrow="At a glance" title="Work and contact" />
      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr]">
        {/* Experience */}
        <section className={cn(card, "lg:row-span-2")} aria-labelledby="exp-h">
          <h3 id="exp-h" className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Briefcase className="h-4 w-4 text-foreground/50" /> Experience
          </h3>
          <ol className="space-y-1">
            {EXPERIENCE.map((e) => {
              const body = (
                <>
                  <Logo domain={e.domain} logo={"logo" in e ? e.logo : undefined} label={e.org} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {e.org}
                      {e.now && <span className="rounded-full bg-emerald-500/15 px-1.5 py-px text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">Now</span>}
                    </span>
                    <span className="block text-xs text-foreground/60">
                      {e.role}
                      {e.when && <> · {e.when}</>}
                    </span>
                  </span>
                </>
              )
              return (
                <li key={e.org}>
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/60">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 px-2 py-1.5">{body}</div>
                  )}
                </li>
              )
            })}
          </ol>
        </section>

        {/* Résumé */}
        <a href="/Resume_Violet_Hyun.pdf" target="_blank" rel="noreferrer" className={cn(card, "group flex flex-col justify-between gap-6 transition-colors hover:border-foreground/30")}>
          <span className="flex items-center justify-between">
            <FileText className="h-6 w-6 text-foreground/70" />
            <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span>
            <span className="block text-lg font-semibold text-foreground">Résumé, PDF</span>
            <span className="text-xs text-foreground/55">Updated 2026</span>
          </span>
        </a>

        {/* Contact */}
        <div className="grid gap-3">
          <a href="mailto:violethyun@nyu.edu" className={cn(card, "flex items-center gap-3 transition-colors hover:border-foreground/30")}>
            <Mail className="h-5 w-5 text-foreground/60" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">Email</span>
              <span className="block truncate text-xs text-foreground/55">violethyun@nyu.edu</span>
            </span>
          </a>
          <a href="https://www.linkedin.com/in/violet-hyun/" target="_blank" rel="noreferrer" className={cn(card, "flex items-center gap-3 transition-colors hover:border-foreground/30")}>
            <Linkedin className="h-5 w-5 text-foreground/60" />
            <span>
              <span className="block text-sm font-semibold text-foreground">LinkedIn</span>
              <span className="block text-xs text-foreground/55">violet-hyun</span>
            </span>
          </a>
        </div>

        {/* Education */}
        <section className={cn(card, "lg:col-span-2")} aria-labelledby="edu-h">
          <h3 id="edu-h" className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <GraduationCap className="h-4 w-4 text-foreground/50" /> Education
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {EDUCATION.map((e) => (
              <li key={e.org} className="flex items-center gap-3">
                <Logo domain={e.domain} label={e.org} />
                <span>
                  <span className="block text-sm font-medium text-foreground">{e.org}</span>
                  <span className="block text-xs text-foreground/60">{e.degree} · {e.when}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Toolkit */}
        <section className={cn(card, "lg:col-span-3")} aria-labelledby="tools-h">
          <h3 id="tools-h" className="mb-2 text-sm font-semibold text-foreground">Toolkit</h3>
          <ul className="flex flex-wrap gap-1.5">
            {TOOLS.map((t) => (
              <li key={t} className="rounded-full border border-border/70 px-3 py-1 text-xs text-foreground/75">{t}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

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
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        {HOBBIES.map((h) => (
          <div key={h.title} className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              {h.photos.map((ph) => (
                <Photo key={ph.src} src={ph.src} alt={ph.alt} sizes="(min-width: 1024px) 180px, 30vw" />
              ))}
            </div>
            <div className="space-y-1">
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
    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
      <figure className="mx-auto w-full max-w-[300px] space-y-2.5 lg:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/50">
          <Image src="/images/about-chunhyang.jpg" alt="Violet backstage at the Global Miss Chunhyang pageant, holding a violin" fill className="object-cover" sizes="320px" />
        </div>
      </figure>
      <SectionHeader eyebrow="Fun fact"
        title="As Global Miss Chunhyang, I learned to carry my roots with confidence and grace."
      />
    </div>
  )
}

/* ---------- page: sticky section index + one normal scroll ---------- */

const SECTIONS: [string, () => React.JSX.Element][] = [
  ["hello", Hello],
  ["at-a-glance", Glance],
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
    <div className="mx-auto w-full max-w-[1200px] px-6 pb-28 pt-24 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-32">
      {/* Desktop: sticky index */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 space-y-10">
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">Violet Hyun</p>
            <p className="text-sm text-foreground/55">Product designer, New York</p>
          </div>
          <nav aria-label="On this page">
            <ol className="space-y-0.5">
              {NAV.map((n) => {
                const on = active === n.id
                return (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={(e) => goTo(e, n.id)}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "group flex items-center gap-3 py-1.5 text-sm transition-colors",
                        on ? "text-foreground" : "text-foreground/45 hover:text-foreground/80",
                      )}
                    >
                      <span aria-hidden className={cn("h-px transition-all duration-300", on ? "w-8 bg-foreground" : "w-4 bg-foreground/30 group-hover:w-6")} />
                      {n.label}
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>
          <div className="space-y-2 border-t border-border/60 pt-6 text-sm text-foreground/60">
            <a href="/Resume_Violet_Hyun.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
              Résumé PDF <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href="mailto:violethyun@nyu.edu" className="block hover:text-foreground">violethyun@nyu.edu</a>
            <a href="https://www.linkedin.com/in/violet-hyun/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Mobile: sticky chip bar */}
        <nav ref={chipsRef} aria-label="On this page" className="sticky top-16 z-30 -mx-6 mb-10 flex gap-1 overflow-x-auto border-b border-border/60 bg-background/90 px-6 py-2.5 backdrop-blur [scrollbar-width:none] lg:hidden">
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

        <div className="space-y-28 lg:space-y-36">
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
