"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <section className="relative flex min-h-svh flex-col justify-center">
      <div ref={containerRef} className="mx-auto w-full max-w-[680px] px-6">
        <h1
          data-animate
          className="text-[1.9rem] font-bold leading-[1.08] tracking-tight text-foreground"
        >
          {"Hello, I'm Violet Hyun!"}
        </h1>

        <p
          data-animate
          className="mt-2 text-[0.82rem] font-medium leading-tight tracking-[-0.01em] text-foreground/60 md:whitespace-nowrap"
        >
          {"— a product designer working at the intersection of "}
          <span className="scribble-underline font-semibold text-foreground/80">research</span>
          {", "}
          <span className="scribble-circle font-semibold text-foreground/80">storytelling</span>
          {", and "}
          <span className="scribble-highlight font-semibold text-foreground/80">systems thinking</span>
          {"."}
        </p>

        <div data-animate className="mt-6 space-y-4">
          <div className="grid grid-cols-[78px_1fr] gap-x-5">
            <p className="text-[11px] tracking-[0.14em] text-foreground/40 uppercase">
              Now
            </p>
            <p className="text-[13px] leading-relaxed text-foreground/60">
              {"Product design intern at "}
              <a
                href="https://www.vendelux.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sky-600 dark:text-sky-400 transition-colors duration-200 ease-out hover:text-sky-500 dark:hover:text-sky-300"
              >
                Vendelux
              </a>
              {"."}
            </p>
          </div>

          <div className="grid grid-cols-[78px_1fr] gap-x-5">
            <p className="text-[11px] tracking-[0.14em] text-foreground/40 uppercase">
              Previous
            </p>
            <p className="text-[13px] leading-relaxed text-foreground/60">
              {"Design + research at "}
              <a
                href="https://roar.me.columbia.edu/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sky-600 dark:text-sky-400 transition-colors duration-200 ease-out hover:text-sky-500 dark:hover:text-sky-300"
              >
                Robotics and Rehabilitation Lab at Columbia University
              </a>
              {". "}
              <a
                href="https://www.violethyun.com/portfolio/games4peace"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-foreground/60 transition-colors duration-200 ease-out hover:text-foreground"
              >
                Games4Peace
              </a>
              {", "}
              <a
                href="https://misskcosmetics.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-foreground/60 transition-colors duration-200 ease-out hover:text-foreground"
              >
                Miss K Cosmetics
              </a>
              {", "}
              <a
                href="https://www.kmcaseoul.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-foreground/60 transition-colors duration-200 ease-out hover:text-foreground"
              >
                K Museum of Contemporary Art
              </a>
              {", and "}
              <a
                href="https://www.chloe.com/en-us"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-foreground/60 transition-colors duration-200 ease-out hover:text-foreground"
              >
                Chloé
              </a>
              {"."}
            </p>
          </div>

          <div className="grid grid-cols-[78px_1fr] gap-x-5">
            <p className="text-[11px] tracking-[0.14em] text-foreground/40 uppercase">
              Education
            </p>
            <p className="text-[13px] leading-relaxed text-foreground/60">
              {"Design student at "}
              <a
                href="https://www.columbia.edu/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sky-600 dark:text-sky-400 transition-colors duration-200 ease-out hover:text-sky-500 dark:hover:text-sky-300"
              >
                Columbia University
              </a>
              {"; previously at "}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
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
          color: var(--foreground);
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
          color: var(--foreground);
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
          color: var(--foreground);
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
          animation: fadeInUp 1s ease 0.8s forwards;
          opacity: 0;
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
            opacity: 1;
          }

          .scroll-arrow {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
