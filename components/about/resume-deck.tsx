"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, Linkedin, Mail, Plus, Minus } from "lucide-react"
import { COURSEWORK, EARLIER, EDUCATION, EXPERIENCE, LEADERSHIP, PROJECTS, RESUME_PDF, SKILLS, type ResumeEntry } from "@/lib/resume"
import { cn } from "@/lib/utils"

/* ---------- what I built: the numbers lead ---------- */

const BUILT = [
  { n: 0, to: 1, show: "0→1", label: "event platform launched at Vendelux", href: "/work/vendelux" },
  { n: 200, suffix: "+", label: "screens shipped for an AI scheduling app", href: "/work/schedulink" },
  { n: 4, label: "product surfaces running on one component schema", href: "/work/vendelux" },
  { n: 1, label: "wearable designed for spinal cord injury patients", href: "/work/cast" },
]

/** One short line per card: what was built there. */
const HEADLINE: Record<string, string> = {
  Vendelux: "Launched an event platform from 0 to 1",
  "Columbia Robotics and Rehabilitation Lab": "Designed a gesture-controlled wearable",
  "Stealth Startup": "Shipped 200+ screens for an MVP in 2 weeks",
  "PASSIT ON": "Built NFC tracking for second-hand garments",
  "Greener Walking Routes": "Prototyped walking routes that favor green space",
  "Design and Engineering Club, NYU": "Founded a 50+ member club",
  "Women in Computing, NYU": "Helped place 30+ women in roles",
}

/** Where each card's peek leads, and the picture it shows. */
const PAGE: Record<string, string> = {
  Vendelux: "/work/vendelux",
  "Columbia Robotics and Rehabilitation Lab": "/work/cast",
  "Stealth Startup": "/work/schedulink",
  "PASSIT ON": "/work/passiton",
  "Greener Walking Routes": "/work/greener-routes",
}

const PREVIEW: Record<string, string> = {
  Vendelux: "/images/vendelux-cover-poster.jpg",
  "Columbia Robotics and Rehabilitation Lab": "/images/robotics-lab.jpg",
  "Stealth Startup": "/images/schedulink.jpg",
  "PASSIT ON": "/images/covers/posters/covers-passiton-poster.jpg",
  "Greener Walking Routes": "/images/covers/greener-routes/p1.webp",
  "Design and Engineering Club, NYU": "/images/experience-design-engineering.jpg",
}

/* ---------- small pieces ---------- */

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

function Mark({ e }: { e: { logo?: string; domain?: string; name: string } }) {
  const [broken, setBroken] = useState(false)
  const src = broken ? undefined : (e.logo ?? (e.domain ? `https://www.google.com/s2/favicons?domain=${e.domain}&sz=64` : undefined))
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/60 bg-white text-sm font-semibold text-foreground/70">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt="" onError={() => setBroken(true)} className="h-full w-full object-contain p-1" /> : e.name[0]}
    </span>
  )
}

/** Counts up once when the stats scroll into view. */
function Count({ to, suffix = "", show }: { to: number; suffix?: string; show?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el || show || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 900)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      setV(0)
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, show])
  return (
    <span ref={ref} className="tabular-nums">
      {show ?? `${v}${suffix}`}
    </span>
  )
}

function DeckCard({ e, i }: { e: ResumeEntry; i: number }) {
  const [open, setOpen] = useState(false)
  const title = e.link ? (
    <Link href={e.link} className="inline-flex items-center gap-1 hover:underline hover:underline-offset-4">
      {e.name}
      <ArrowUpRight className="h-3.5 w-3.5 text-foreground/40" />
    </Link>
  ) : (
    e.name
  )
  return (
    <article
      className="flex w-[min(320px,82vw)] shrink-0 snap-start flex-col gap-4 rounded-3xl border border-border/60 bg-card p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(28,26,22,0.35)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both"
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <div className="flex items-center gap-3">
        <Mark e={e} />
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-foreground">{title}</h4>
          <p className="text-xs tabular-nums text-foreground/50">{e.when ?? e.role}</p>
        </div>
      </div>
      <p className="text-lg font-semibold leading-snug tracking-tight text-foreground text-balance">{HEADLINE[e.name] ?? e.role}</p>
      {e.when && <p className="-mt-2 text-sm text-foreground/55">{e.role.split(" · ")[0]}</p>}
      <div className="mt-auto">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/60 transition-colors hover:text-foreground">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {open ? "Close" : PAGE[e.name] ? "Quick peek" : "Details"}
        </button>
        {/* A quick look at what was built, with a way into the full project. */}
        <div className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-3 pt-3">
              {PREVIEW[e.name] ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                  <Image src={PREVIEW[e.name]} alt={`${e.name} preview`} fill sizes="300px" className={cn("object-cover transition-transform duration-700", open ? "scale-100" : "scale-110")} />
                </div>
              ) : null}
              <ul className="space-y-1.5">
                {e.bullets.slice(0, PAGE[e.name] ? 1 : 3).map((b) => (
                  <li key={b} className="text-[13px] leading-relaxed text-foreground/65 text-pretty">
                    <Rich text={b} />
                  </li>
                ))}
              </ul>
              {PAGE[e.name] && (
                <Link href={PAGE[e.name]} tabIndex={open ? 0 : -1} className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85">
                  View project <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ---------- the section ---------- */

export function ResumeDeck() {
  const deckRef = useRef<HTMLDivElement>(null)
  const nudge = (dir: 1 | -1) => deckRef.current?.scrollBy({ left: dir * 336, behavior: "smooth" })
  const cards = [...EXPERIENCE, ...PROJECTS, ...LEADERSHIP]

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.16em] text-foreground/50 uppercase">Resume</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">What I&apos;ve built</h2>
        </div>
        <a href={RESUME_PDF} download className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85">
          <Download className="h-4 w-4" /> Resume PDF
        </a>
      </div>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {BUILT.map((b, i) => (
          <li key={b.label}>
          <Link
            href={b.href}
            className="group block h-full rounded-3xl border border-border/60 bg-card p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(28,26,22,0.35)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <p className="text-4xl font-semibold tracking-tight text-foreground">
              <Count to={b.to ?? b.n} suffix={b.suffix} show={b.show} />
            </p>
            <p className="mt-2 text-sm leading-snug text-foreground/60">{b.label}</p>
            <ArrowUpRight className="mt-3 h-4 w-4 text-foreground/30 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </Link>
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-foreground/55 uppercase">Experience, projects and leadership</p>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => nudge(-1)} aria-label="Previous" className="grid h-9 w-9 place-items-center rounded-full border border-border/70 transition-colors hover:border-foreground/40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => nudge(1)} aria-label="Next" className="grid h-9 w-9 place-items-center rounded-full border border-border/70 transition-colors hover:border-foreground/40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div ref={deckRef} className="-mx-6 flex snap-x snap-mandatory scroll-px-6 items-start gap-3 overflow-x-auto px-6 pb-3 pt-1 [scrollbar-width:none]">
          {cards.map((e, i) => (
            <DeckCard key={e.name} e={e} i={i} />
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-4 rounded-3xl border border-border/60 bg-card p-5">
          <p className="text-xs font-semibold tracking-[0.14em] text-foreground/55 uppercase">Education</p>
          {EDUCATION.map((ed) => (
            <div key={ed.school} className="flex gap-3">
              <Mark e={{ name: ed.school, logo: "logo" in ed ? ed.logo : undefined, domain: "domain" in ed ? ed.domain : undefined }} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{ed.school}</p>
                <p className="text-xs text-foreground/55">
                  {ed.degree} · {ed.when}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-3xl border border-border/60 bg-card p-5">
          <p className="text-xs font-semibold tracking-[0.14em] text-foreground/55 uppercase">Tools</p>
          <ul className="flex flex-wrap gap-1.5">
            {SKILLS.flatMap((s) => s.v.split(", ")).map((t) => (
              <li key={t} className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-foreground/70">
                {t}
              </li>
            ))}
          </ul>
          <p className="text-xs text-foreground/50">Coursework: {COURSEWORK.join(", ")}</p>
        </div>
        <div className="space-y-3 rounded-3xl border border-border/60 bg-card p-5">
          <p className="text-xs font-semibold tracking-[0.14em] text-foreground/55 uppercase">Earlier</p>
          {EARLIER.map((e) => (
            <a key={e.name} href={e.href} target="_blank" rel="noreferrer" className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-muted/60">
              <Mark e={e} />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{e.name}</span>
                <span className="block text-xs text-foreground/55">{e.role}</span>
              </span>
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <a href="mailto:violethyun@nyu.edu" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-border/70 hover:border-foreground/40">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/violet-hyun/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-border/70 hover:border-foreground/40">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
