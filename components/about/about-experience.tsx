"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { COURSEWORK, EARLIER, EDUCATION, EXPERIENCE, LEADERSHIP, PROJECTS, RESUME_PDF, SKILLS, type ResumeEntry } from "@/lib/resume"
import {
  ArrowUpRight,
  Briefcase,
  Coffee,
  Download,
  FileText,
  GraduationCap,
  Hand,
  Eye,
  Linkedin,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DOCK, miniOffsetFromCenter } from "@/lib/dock"

export const ABOUT_NAV: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "hello", label: "Hello", icon: Hand },
  { id: "off-the-clock", label: "Off the clock", icon: Coffee },
  { id: "fun-fact", label: "Fun fact", icon: Sparkles },
  { id: "resume", label: "Resume", icon: FileText },
]
const NAV = ABOUT_NAV

const INTRO = [
  "I'm Violet Hyun, a product designer in New York drawn to complex problems, because they usually hide the most important human needs.",
]

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
          className={src === logo ? "h-full w-full object-cover" : "h-5 w-5 object-contain"}
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
      </div>
    </div>
  )
}

/* Numbers in **double stars** render bold, matching the PDF. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function ResumeGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-7">
      <h3 className="border-b border-border/60 pb-3 text-xs font-semibold tracking-[0.14em] text-foreground/55 uppercase">{title}</h3>
      {children}
    </section>
  )
}

function EntryBlock({ e }: { e: ResumeEntry }) {
  const name = e.link ? (
    <Link href={e.link} className="group/l inline-flex items-center gap-1 hover:underline hover:decoration-foreground/30 hover:underline-offset-4">
      {e.name}
      <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-colors group-hover/l:text-foreground" />
    </Link>
  ) : (
    e.name
  )
  return (
    <article className="grid grid-cols-[36px_minmax(0,1fr)] gap-x-4">
      <Logo logo={e.logo} domain={e.domain} label={e.name} />
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <h4 className="text-base font-semibold tracking-tight text-foreground">{name}</h4>
          {e.when ? <span className="text-sm tabular-nums text-foreground/50">{e.when}</span> : null}
        </div>
        <p className="text-sm text-foreground/55">{e.role}</p>
        <ul className="space-y-1.5 pt-1">
          {e.bullets.map((b) => (
            <li key={b} className="relative pl-4 text-[15px] leading-relaxed text-foreground/70 text-pretty before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2 before:bg-foreground/40">
              <Rich text={b} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Resume() {
  return (
    <div className="w-full space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader eyebrow="Resume" title="Experience and education" />
        <a href={RESUME_PDF} download className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85">
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div className="space-y-14">
          <ResumeGroup title="Experience">
            {EXPERIENCE.map((e) => (
              <EntryBlock key={e.name} e={e} />
            ))}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-medium text-foreground/45">Earlier</p>
              <ul className="space-y-1">
                {EARLIER.map((e) => (
                  <li key={e.name}>
                    <a href={e.href} target="_blank" rel="noreferrer" className="-mx-2 flex items-center gap-4 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/60">
                      <Logo logo={e.logo} label={e.name} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground">{e.name}</span>
                        <span className="block text-xs text-foreground/55">{e.role}</span>
                      </span>
                      <span className="text-xs tabular-nums text-foreground/45">{e.when}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ResumeGroup>
          <ResumeGroup title="Projects">
            {PROJECTS.map((e) => (
              <EntryBlock key={e.name} e={e} />
            ))}
          </ResumeGroup>
          <ResumeGroup title="Leadership">
            {LEADERSHIP.map((e) => (
              <EntryBlock key={e.name} e={e} />
            ))}
          </ResumeGroup>
        </div>

        <aside className="space-y-12">
          <ResumeGroup title="Education">
            {EDUCATION.map((ed) => (
              <div key={ed.school} className="grid grid-cols-[36px_minmax(0,1fr)] gap-x-4">
                <Logo logo={"logo" in ed ? ed.logo : undefined} domain={"domain" in ed ? ed.domain : undefined} label={ed.school} />
                <div className="space-y-0.5">
                  <p className="text-sm tabular-nums text-foreground/50">{ed.when}</p>
                  <p className="font-semibold tracking-tight text-foreground">{ed.school}</p>
                  <p className="text-sm text-foreground/60">{ed.degree}</p>
                </div>
              </div>
            ))}
          </ResumeGroup>
          <ResumeGroup title="Coursework">
            <ul className="flex flex-wrap gap-2">
              {COURSEWORK.map((c) => (
                <li key={c} className="rounded-full border border-border/70 px-3 py-1 text-sm text-foreground/70">
                  {c}
                </li>
              ))}
            </ul>
          </ResumeGroup>
          <ResumeGroup title="Skills">
            {SKILLS.map((sk) => (
              <div key={sk.k} className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{sk.k}</p>
                <p className="text-sm text-foreground/60">{sk.v}</p>
              </div>
            ))}
          </ResumeGroup>
          <ResumeGroup title="Contact">
            <div className="space-y-1 text-sm text-foreground/70">
              <a href="mailto:violethyun@nyu.edu" className="flex items-center gap-2.5 py-1 hover:text-foreground">
                <Mail className="h-4 w-4" /> violethyun@nyu.edu
              </a>
              <a href="https://www.linkedin.com/in/violet-hyun/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 py-1 hover:text-foreground">
                <Linkedin className="h-4 w-4" /> linkedin.com/in/violet-hyun <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </ResumeGroup>
        </aside>
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
    <div className="grid w-full items-center gap-10 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-14">
      <figure className="mx-auto w-full max-w-[220px]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/50">
          <Image src="/images/about-chunhyang.jpg" alt="Violet backstage at the Global Miss Chunhyang pageant, holding a violin" fill className="object-cover" sizes="220px" />
        </div>
      </figure>
      <div className="max-w-[560px] space-y-4">
        <Eyebrow>Fun fact</Eyebrow>
        <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-[1.75rem]">I care about stories that make people care.</h2>
        <p className="text-[15px] leading-relaxed text-foreground/65">
          I was Global Miss Chunhyang, a title named after a classic Korean folk tale, and I performed on violin on that stage. It taught me
          how a story can move a room from knowing something to caring about it, the same gap I try to close in design.
        </p>
      </div>
    </div>
  )
}

/* ---------- page: sticky section index + one normal scroll ---------- */

const SECTIONS: [string, () => React.JSX.Element][] = [
  ["hello", Hello],
  ["off-the-clock", OffTheClock],
  ["fun-fact", FunFact],
  ["resume", Resume],
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
