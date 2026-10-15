"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const STATS = [
  { num: "10+", label: "features shipped" },
  { num: "5+", label: "projects led end to end" },
  { num: "5+", label: "years across design, art, and research" },
]

/** Where each stat lands, relative to the flower's center (desktop / phone). */
const SPOTS_DESKTOP = [
  { x: -320, y: -30, r: -8 },
  { x: 0, y: -170, r: 0 },
  { x: 320, y: -30, r: 8 },
]
const SPOTS_MOBILE = [
  { x: -112, y: -125, r: -6 },
  { x: 0, y: -195, r: 0 },
  { x: 112, y: -125, r: 6 },
]

function OrganizationIcon({ domain }: { domain: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      aria-hidden="true"
      onError={() => setFailed(true)}
      className="mr-[0.2em] inline-block h-4 w-4 align-[-0.2em] object-contain"
    />
  )
}

function MetaLink({ href, domain, children }: { href: string; domain: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="ml-[0.25em] whitespace-nowrap transition-colors duration-200 ease-out hover:text-foreground"
    >
      <OrganizationIcon domain={domain} />
      {children}
    </a>
  )
}

function FlowerStats() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const lastPointer = useRef<string>("mouse")

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)")
    const update = () => setMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  const spots = mobile ? SPOTS_MOBILE : SPOTS_DESKTOP

  return (
    <div className="relative mx-auto h-[300px] w-full lg:h-[260px]">
      {/* Flower: always turning clockwise, low enough for the stats to bloom around it */}
      <div className="absolute left-1/2 top-[230px] -translate-x-1/2 -translate-y-1/2 lg:top-[180px]">
        <button
          type="button"
          aria-label={open ? "Hide highlights" : "Show highlights"}
          aria-expanded={open}
          onPointerEnter={(e) => {
            lastPointer.current = e.pointerType
            if (e.pointerType === "mouse") setOpen(true)
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setOpen(false)
          }}
          onPointerDown={(e) => {
            lastPointer.current = e.pointerType
          }}
          onClick={() => {
            if (lastPointer.current !== "mouse") setOpen((v) => !v)
          }}
          onFocus={(e) => {
            // Keyboard focus opens it; a tap is handled by onClick instead.
            if (e.currentTarget.matches(":focus-visible")) setOpen(true)
          }}
          onBlur={() => setOpen(false)}
          className="relative block h-[120px] w-[120px] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground lg:h-[148px] lg:w-[148px]"
        >
          <span
            className="block h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `scale(${open ? 1.06 : 1})` }}
          >
            <img
              src="/images/flower.png"
              alt=""
              draggable={false}
              className="flower-spin block h-full w-full select-none"
            />
          </span>
        </button>

        {STATS.map((s, i) => {
          const spot = spots[i]
          const delay = open ? 100 + i * 90 : (2 - i) * 40
          return (
            <div
              key={s.label}
              aria-hidden={!open}
              className="pointer-events-none absolute left-1/2 top-1/2 flex flex-col items-center whitespace-nowrap"
              style={{
                transform: open
                  ? `translate(calc(-50% + ${spot.x}px), calc(-50% + ${spot.y}px)) rotate(${spot.r}deg) scale(1)`
                  : "translate(-50%, -50%) rotate(0deg) scale(0.3)",
                opacity: open ? 1 : 0,
                transition: `transform 650ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 300ms ease ${delay}ms`,
              }}
            >
              <span className="text-3xl font-extrabold leading-none tracking-tight text-foreground/50 lg:text-5xl">
                {s.num}
              </span>
              <span className="mt-1 w-[175px] whitespace-normal text-center text-sm font-semibold leading-snug text-foreground lg:w-[240px] lg:text-xl">{s.label}</span>
            </div>
          )
        })}
      </div>

      <p
        className="absolute left-1/2 top-[310px] -translate-x-1/2 text-[11px] tracking-[0.14em] text-text-muted transition-opacity duration-300 lg:top-[268px]"
        style={{ opacity: open ? 0 : 1 }}
      >
        {mobile ? "TAP ME" : "HOVER ME"}
      </p>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const children = containerRef.current?.querySelectorAll("[data-animate]")
    if (!children) return

    children.forEach((el, i) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = "0"
      htmlEl.style.transform = "translateY(12px)"
      htmlEl.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`

      requestAnimationFrame(() => {
        htmlEl.style.opacity = "1"
        htmlEl.style.transform = "translateY(0)"
      })
    })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const { bottom } = section.getBoundingClientRect()
      setShowScrollHint(bottom > window.innerHeight * 0.5)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-svh flex-col justify-center pt-24 pb-20">
      <div ref={containerRef} className="mx-auto w-full max-w-[900px] px-6 text-center">
        <div data-animate>
          <FlowerStats />
        </div>

        <h1 data-animate className="mt-14 text-3xl font-extrabold leading-tight tracking-tight text-foreground lg:mt-10">
          Hi, I&apos;m Violet Hyun
        </h1>

        <p data-animate className="mt-2 text-xl font-normal leading-snug tracking-tight text-foreground">
          I make complex information more approachable for everyone.
        </p>

        <p
          data-animate
          className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base text-foreground/50"
        >
          <span>
            {"Now @"}
            <MetaLink href="https://www.vendelux.com/" domain="vendelux.com">
              Vendelux
            </MetaLink>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {"Computational Design Practices @"}
            <MetaLink
              href="https://www.arch.columbia.edu/programs/15-m-s-computational-design-practices"
              domain="arch.columbia.edu"
            >
              Columbia
            </MetaLink>
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`fixed bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 ${showScrollHint ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted">Scroll</span>
        <div className="scroll-arrow">
          <ChevronDown className="h-5 w-5 text-foreground/50" />
        </div>
      </div>

      <style jsx>{`
        .scroll-arrow {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-arrow {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
