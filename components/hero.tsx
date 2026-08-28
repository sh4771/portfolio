"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const TYPEWRITER_PHRASES = [
  { text: "digital interfaces", effect: "scribble-underline" },
  { text: "spatial computing", effect: "scribble-circle" },
  { text: "emerging technologies", effect: "scribble-highlight" },
]

const TYPE_SPEED_MS = 55
const DELETE_SPEED_MS = 30
const HOLD_MS = 1400
const PAUSE_MS = 350

function TypewriterWords() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mql.matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const current = TYPEWRITER_PHRASES[phraseIndex].text

    if (!deleting && subIndex === current.length) {
      const holdTimeout = setTimeout(() => setDeleting(true), HOLD_MS)
      return () => clearTimeout(holdTimeout)
    }

    if (deleting && subIndex === 0) {
      const pauseTimeout = setTimeout(() => {
        setDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length)
      }, PAUSE_MS)
      return () => clearTimeout(pauseTimeout)
    }

    const stepTimeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? DELETE_SPEED_MS : TYPE_SPEED_MS
    )
    return () => clearTimeout(stepTimeout)
  }, [subIndex, deleting, phraseIndex, reducedMotion])

  const current = TYPEWRITER_PHRASES[phraseIndex]
  const shownText = reducedMotion ? current.text : current.text.slice(0, subIndex)

  return (
    <span
      className={`${current.effect} font-semibold text-foreground`}
      style={{ display: "inline-block", minWidth: "1ch" }}
    >
      {shownText}
      {!reducedMotion && (
        <span className="typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </span>
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
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center pt-28 pb-20"
    >
      <div ref={containerRef} className="mx-auto w-full max-w-[760px] px-6">
        <h1
          data-animate
          className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground"
        >
          {"Hello, I'm Violet Hyun!"}
        </h1>

        <p
          data-animate
          className="mt-3 text-sm font-medium leading-tight tracking-[-0.01em] text-text-secondary md:whitespace-nowrap"
        >
          {"— a product designer working across "}
          <TypewriterWords />
          {" to shape human experience."}
        </p>

        <p
          data-animate
          className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary"
        >
          {"I bridge artistic imagination and practical, buildable reality through spatial thinking."}
        </p>

        <div data-animate className="mt-10 space-y-8">
          <div className="relative flex gap-5">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground" />
              <span className="mt-1.5 w-px flex-1 bg-text-muted" />
            </div>
            <div className="pb-1">
              <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
                Now
              </p>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-text-secondary">
                {"Product Designer at "}
                <a
                  href="https://www.vendelux.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block font-medium text-purple-900 transition-colors duration-200 ease-out hover:text-purple-950 dark:text-purple-200 dark:hover:text-purple-50"
                >
                  Vendelux
                </a>
                {", currently designing internal platform tools. Previously built customer-facing products."}
              </p>
            </div>
          </div>

          <div className="relative flex gap-5">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-text-muted bg-background" />
              <span className="mt-1.5 w-px flex-1 bg-text-muted" />
            </div>
            <div className="pb-1">
              <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
                Previously
              </p>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-text-secondary">
                {"Design and research at "}
                <a
                  href="https://roar.me.columbia.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-text-secondary underline decoration-text-muted underline-offset-2 transition-colors duration-200 ease-out hover:text-foreground"
                >
                  Robotics and Rehabilitation Lab at Columbia University
                </a>
                {", "}
                <a
                  href="https://misskcosmetics.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-text-secondary underline decoration-text-muted underline-offset-2 transition-colors duration-200 ease-out hover:text-foreground"
                >
                  Miss K Cosmetics
                </a>
                {", "}
                <a
                  href="https://www.kmcaseoul.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-text-secondary underline decoration-text-muted underline-offset-2 transition-colors duration-200 ease-out hover:text-foreground"
                >
                  K Museum of Contemporary Art
                </a>
                {", and "}
                <a
                  href="https://www.chloe.com/en-us"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-text-secondary underline decoration-text-muted underline-offset-2 transition-colors duration-200 ease-out hover:text-foreground"
                >
                  Chloé
                </a>
                {"."}
              </p>
            </div>
          </div>

          <div className="relative flex gap-5">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-text-muted bg-background" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
                Education
              </p>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-text-secondary">
                {"M.S. in Computational Design Practices at "}
                <a
                  href="https://www.arch.columbia.edu/programs/15-m-s-computational-design-practices"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sky-600 dark:text-sky-400 transition-colors duration-200 ease-out hover:text-sky-500 dark:hover:text-sky-300"
                >
                  Columbia University GSAPP
                </a>
                {"; previously studied Interactive Media Arts at "}
                <a
                  href="https://tisch.nyu.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-violet-600 dark:text-violet-400 transition-colors duration-200 ease-out hover:text-violet-500 dark:hover:text-violet-300"
                >
                  NYU Tisch
                </a>
                {"."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`fixed bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator transition-opacity duration-300 ${showScrollHint ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
          Scroll
        </span>
        <div className="scroll-arrow">
          <ChevronDown className="w-5 h-5 text-foreground/50" />
        </div>
      </div>

      <style jsx>{`
        .scribble-underline {
          position: relative;
          display: inline-block;
        }

        .scribble-underline::after {
          content: "";
          position: absolute;
          left: -0.08em;
          right: -0.08em;
          bottom: -0.22em;
          height: 8px;
          opacity: 0.6;
          transform: scaleX(0);
          transform-origin: left;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 8' preserveAspectRatio='none'%3E%3Cpath d='M1 5.2 C10 1.5 22 7 35 4 C49 1.4 63 6.9 77 3.9 C91 1.2 104 6.1 119 3.8' fill='none' stroke='currentColor' stroke-width='1.35' stroke-linecap='round'/%3E%3C/svg%3E");
          animation: drawScribble 0.6s ease forwards;
          filter: var(--scribble-filter, none);
        }

        .scribble-underline:nth-of-type(1)::after {
          animation-delay: 0.12s;
        }

        .scribble-underline:nth-of-type(2)::after {
          animation-delay: 0.22s;
        }

        .scribble-underline:nth-of-type(3)::after {
          animation-delay: 0.32s;
        }

        .scribble-circle {
          position: relative;
          display: inline-block;
          padding: 0 0.04em;
        }

        .scribble-circle::after {
          content: "";
          position: absolute;
          inset: -0.24em -0.26em -0.2em -0.26em;
          opacity: 0.6;
          transform: scale(0.9);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 124 38' preserveAspectRatio='none'%3E%3Cpath d='M9 18 C11 8, 24 4, 42 5 L90 6 C108 7, 118 12, 116 20 C114 30, 102 33, 84 33 L34 32 C17 31, 7 27, 9 18 Z' fill='none' stroke='currentColor' stroke-width='1.35' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          animation: drawCircle 0.6s ease 0.22s forwards;
          pointer-events: none;
          filter: var(--scribble-filter, none);
        }

        .scribble-highlight {
          position: relative;
          display: inline-block;
          padding: 0 0.04em;
          z-index: 0;
        }

        .scribble-highlight::before {
          content: "";
          position: absolute;
          left: -0.1em;
          right: -0.1em;
          top: 46%;
          bottom: 0.02em;
          border-radius: 0.2em;
          opacity: 0.3;
          transform: scaleX(0);
          transform-origin: left;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 34' preserveAspectRatio='none'%3E%3Cpath d='M2 14 C10 9, 20 18, 32 12 C48 6, 66 16, 82 11 C99 6, 118 17, 135 12 C145 9, 152 13, 158 11 L158 31 L2 31 Z' fill='currentColor'/%3E%3C/svg%3E");
          animation: drawHighlight 0.6s ease 0.3s forwards;
          pointer-events: none;
          z-index: -1;
          filter: var(--scribble-filter, none);
        }

        .scroll-indicator {
        }

        .scroll-arrow {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes drawScribble {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes drawCircle {
          to {
            transform: scale(1);
          }
        }

        @keyframes drawHighlight {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        .typewriter-cursor {
          display: inline-block;
          margin-left: 1px;
          animation: cursorBlink 0.9s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scribble-underline::after {
            animation: none;
            transform: scaleX(1);
          }

          .scribble-circle::after {
            animation: none;
            transform: scale(1);
          }

          .scribble-highlight::before {
            animation: none;
            transform: scaleX(1);
          }

          .scroll-indicator {
            animation: none;
          }

          .scroll-arrow {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
