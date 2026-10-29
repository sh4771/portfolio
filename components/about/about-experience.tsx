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
  Sparkles,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const SECTIONS = ["Hello", "At a glance", "Off the clock", "The longer story", "Fun fact"]

const INTRO = [
  "I'm Violet Hyun, a product designer in New York drawn to complex problems, because they usually hide the most important human needs.",
  "I like products where the information, workflows, or systems feel overwhelming at first. I figure out what actually matters, cut the friction, and turn that complexity into something people use with confidence. My background in research, computational design, and art keeps me thinking about the whole system behind an experience.",
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

const LEADERSHIP = [
  { image: "/images/experience-roar.jpg", role: "Lead Design Engineer, Web Designer", org: "ROAR Lab, Columbia University", href: "https://roar.me.columbia.edu/" },
  { image: "/images/experience-design-engineering.jpg", role: "Founder, President", org: "Design & Engineering @ NYU", href: "https://www.instagram.com/de_nyu/" },
  { image: "/images/experience-louvre.jpg", role: "Team Lead, Visiting Artist", org: "Louvre Abu Dhabi", href: "https://www.louvreabudhabi.ae/" },
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
          className={src === logo ? "h-7 w-7 object-contain" : "h-5 w-5 object-contain"}
          onError={next}
        />
      ) : (
        <span className="text-xs font-semibold text-neutral-500">{label.slice(0, 1)}</span>
      )}
    </span>
  )
}

function Eyebrow({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-foreground/55 uppercase">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </p>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="underline decoration-foreground/30 underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/60">
      {children}
    </a>
  )
}

function Polaroid({ src, alt, caption, rotate, className }: { src: string; alt: string; caption?: string; rotate: number; className?: string }) {
  return (
    <figure
      className={cn(
        "rounded-md bg-white p-2.5 pb-3 shadow-[0_18px_40px_rgba(28,26,22,0.16)] transition-transform duration-300 ease-out hover:z-10 hover:!rotate-0 hover:scale-[1.03]",
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-100">
        <Image src={src} alt={alt} fill className="object-cover" sizes="260px" />
      </div>
      {caption && <figcaption className="pt-2 text-center text-[13px] font-medium text-neutral-700">{caption}</figcaption>}
    </figure>
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
    <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-20">
      <div className="relative mx-auto w-full max-w-[280px] lg:max-w-none">
        <div className="rounded-[32px] bg-white/70 p-3 shadow-[0_24px_60px_rgba(28,26,22,0.12)] dark:bg-white/5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <Image src="/images/about-photo.png" alt="Portrait of Violet Hyun" fill priority className="object-cover" sizes="(min-width: 1024px) 330px, 280px" />
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
      <div className="space-y-2">
        <Eyebrow icon={Sparkles}>At a glance</Eyebrow>
        <h2 className="cs-h2">Résumé, work, and how to reach me</h2>
      </div>
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

function OffTheClock() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-2">
        <Eyebrow>When I&apos;m not designing</Eyebrow>
        <h2 className="cs-h2">Off the clock</h2>
      </div>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          <div className="relative mx-auto flex h-[260px] max-w-[440px] items-center justify-center">
            <Polaroid src="/images/about-food-2.jpg" alt="Homemade dishes" rotate={-8} className="absolute left-0 top-4 w-[150px]" />
            <Polaroid src="/images/about-food-3.jpg" alt="Kitchen party" rotate={7} className="absolute right-0 top-2 w-[150px]" />
            <Polaroid src="/images/about-food-1.jpg" alt="Beli top 5% restaurant ranker badge" rotate={-1} caption="Top 5% on Beli" className="relative w-[160px]" />
          </div>
          <div className="mx-auto max-w-[440px] space-y-1.5 text-center">
            <p className="text-sm font-semibold text-foreground">Food is my biggest love language.</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              I&apos;m in the <TextLink href="https://beliapp.co/">top 5% of restaurant rankers on Beli in NYC</TextLink>. I even made a little{" "}
              <TextLink href="https://editor.p5js.org/sh6363/full/mnrKWZok0">NYC restaurant bot</TextLink> for fun. Ask me what to eat anytime, I got you!
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="relative mx-auto flex h-[260px] max-w-[440px] items-center justify-center">
            <Polaroid src="/images/about-sports-1.jpg" alt="Gym workout" rotate={-7} className="absolute left-0 top-3 w-[150px]" />
            <Polaroid src="/images/about-sports-3.jpg" alt="Skiing with friends" rotate={8} className="absolute right-0 top-5 w-[150px]" />
            <Polaroid src="/images/about-sports-2.jpg" alt="Golfing" rotate={2} caption="Golf, volleyball, gym, running" className="relative w-[160px]" />
          </div>
          <div className="mx-auto max-w-[440px] space-y-1.5 text-center">
            <p className="text-sm font-semibold text-foreground">I enjoy all kinds of sports.</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              I spend time with my friends golfing, playing volleyball, going to the gym, and running.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LongerStory() {
  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div className="space-y-5">
        <Eyebrow icon={Users}>The longer story</Eyebrow>
        <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
          Design is how I connect <span className="scribble-underline">people</span>,{" "}
          <span className="scribble-underline">systems</span>, and <span className="scribble-underline">stories</span>.
        </p>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/70">
          <p>
            I currently work as a Product Intern at <TextLink href="https://www.vendelux.com/">Vendelux</TextLink>.
          </p>
          <p>
            Before Vendelux, I led web design and research at Columbia University&apos;s{" "}
            <TextLink href="https://roar.me.columbia.edu/">Robotics and Rehabilitation Lab</TextLink>, collaborating with researchers, students, and people with spinal cord injuries to rebuild the lab&apos;s digital experience.
          </p>
          <p>
            My previous experience also includes design roles at <TextLink href="https://misskcosmetics.com/">Miss K Cosmetics</TextLink> and{" "}
            <TextLink href="https://www.kmcaseoul.org/">K Museum of Contemporary Art</TextLink>, as well as merchandising at{" "}
            <TextLink href="https://www.chloe.com/">Chloé</TextLink>.
          </p>
          <p className="text-foreground/55">
            Whether I&apos;m at home or in my home away from home, I build a community with people around shared interests.
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {LEADERSHIP.map((x, i) => (
          <li key={x.org} className={cn(i === 1 && "lg:translate-y-8")}>
            <a href={x.href} target="_blank" rel="noreferrer" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted/50">
                <Image src={x.image} alt={x.org} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 200px, 33vw" />
              </div>
              <p className="mt-2 text-xs font-medium text-foreground/80">{x.role}</p>
              <p className="text-xs text-foreground/55 underline decoration-foreground/25 underline-offset-2 group-hover:text-foreground/80">{x.org}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FunFact() {
  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
      <Polaroid src="/images/about-chunhyang.jpg" alt="Violet backstage at the Chunhyang pageant, holding a violin" rotate={-3} caption="Backstage, contestant no. 4" className="mx-auto w-full max-w-[320px]" />
      <div className="max-w-[540px] space-y-5">
        <Eyebrow>Fun fact</Eyebrow>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          I represented Korea as Global Miss Chunhyang.
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-foreground/70">
          <p>
            Chunhyang is one of Korea&apos;s most loved stories, about a woman who stays true to herself no matter who pressures her. The pageant celebrates that kind of beauty: grace, conviction, and respect for where you come from.
          </p>
          <p>I care about the same things in design: work that looks good, stands for something, and treats people with respect.</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- horizontal scroller ---------- */

export function AboutExperience() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [horizontal, setHorizontal] = useState(false)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const N = SECTIONS.length

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px) and (min-height: 600px)")
    const update = () => setHorizontal(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  // Vertical scroll drives the horizontal slide; snap so each section lands cleanly.
  useEffect(() => {
    const track = trackRef.current
    if (!horizontal || !track) {
      if (track) track.style.transform = ""
      return
    }
    document.documentElement.classList.add("about-snap")
    let raf = 0
    const update = () => {
      raf = 0
      const outer = outerRef.current
      if (!outer) return
      const vh = window.innerHeight
      const top = outer.getBoundingClientRect().top
      const total = outer.offsetHeight - vh
      const p = Math.min(1, Math.max(0, -top / total))
      track.style.transform = `translate3d(${-p * (N - 1) * window.innerWidth}px, 0, 0)`
      setActive(Math.round(p * (N - 1)))
      setPinned(top <= 0 && top > -total - vh * 0.5)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      document.documentElement.classList.remove("about-snap")
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [horizontal, N])

  const goTo = useCallback(
    (i: number) => {
      const outer = outerRef.current
      if (!outer) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const y = outer.getBoundingClientRect().top + window.scrollY + i * window.innerHeight
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" })
    },
    [],
  )

  // Arrow keys move one section at a time while the slides are pinned.
  useEffect(() => {
    if (!horizontal) return
    const onKey = (e: KeyboardEvent) => {
      if (!pinned || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === "ArrowRight") {
        e.preventDefault()
        goTo(Math.min(N - 1, active + 1))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goTo(Math.max(0, active - 1))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [horizontal, pinned, active, goTo, N])

  const sections = [Hello, Glance, OffTheClock, LongerStory, FunFact]

  return (
    // Layout (stacked vs. pinned slides) is pure CSS, so the first paint is already right;
    // JS only drives the slide offset, snapping, and the section nav.
    <div ref={outerRef} className="about-outer relative overflow-x-clip" style={{ "--n": N } as React.CSSProperties}>
      {SECTIONS.map((_, i) => (
        <div key={i} aria-hidden className="about-snap-pt pointer-events-none absolute left-0 hidden w-px snap-start" style={{ top: `${i * 100}vh`, height: "100vh" }} />
      ))}
      <div className="about-pin">
        <div ref={trackRef} className="about-track will-change-transform">
          {sections.map((S, i) => (
            <section
              key={SECTIONS[i]}
              aria-label={SECTIONS[i]}
              className="about-slide flex items-center px-6 py-16 first:pt-32"
              inert={horizontal && i !== active ? true : undefined}
            >
              <div className="mx-auto w-full max-w-[1120px]">
                <S />
              </div>
            </section>
          ))}
        </div>
      </div>

      {horizontal && (
        <nav
          aria-label="About sections"
          className={cn(
            "fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/60 bg-background/85 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur transition-opacity",
            pinned ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {SECTIONS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => goTo(i)}
              aria-current={active === i ? "step" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition-colors",
                active === i ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
