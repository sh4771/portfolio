"use client"

import { useState } from "react"

/** Sunglasses illustration that straightens and darkens on hover or tap. */
export function Sunglasses() {
  const [on, setOn] = useState(false)

  return (
    <div className="relative grid min-h-[280px] place-items-center">
      <span className="absolute right-2 top-0 z-10 grid h-24 w-24 rotate-12 place-items-center rounded-full border border-foreground/15 bg-background text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-foreground/80 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
        The sun
        <br />
        is not for
        <br />
        everyone
      </span>
      <button
        type="button"
        aria-pressed={on}
        aria-label="Put on the sunglasses"
        onClick={() => setOn((v) => !v)}
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        className="w-full max-w-[420px] rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <svg
          viewBox="0 0 600 300"
          role="img"
          aria-label="Illustration of sunglasses"
          className="w-full transition-[transform,filter] duration-500 ease-out"
          style={{
            transform: on ? "rotate(0deg) scale(1.06)" : "rotate(-12deg)",
            filter: on
              ? "drop-shadow(14px 24px 14px rgba(28,26,22,0.28)) brightness(0.75)"
              : "drop-shadow(14px 24px 14px rgba(28,26,22,0.18))",
          }}
        >
          <defs>
            <linearGradient id="gw-lens" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--text-muted)" />
              <stop offset="1" stopColor="var(--foreground)" />
            </linearGradient>
          </defs>
          <path d="M45 105 Q60 88 115 92 L235 103 Q260 109 257 145 L248 198 Q238 241 189 247 L125 244 Q76 239 59 197 Z" fill="url(#gw-lens)" stroke="var(--foreground)" strokeWidth="18" />
          <path d="M343 103 L465 92 Q520 88 535 105 L521 197 Q504 239 455 244 L391 247 Q342 241 332 198 L323 145 Q320 109 343 103 Z" fill="url(#gw-lens)" stroke="var(--foreground)" strokeWidth="18" />
          <path d="M255 123 Q290 99 324 123" fill="none" stroke="var(--foreground)" strokeWidth="19" strokeLinecap="round" />
          <path d="M52 113 L8 97 M548 113 L592 97" stroke="var(--foreground)" strokeWidth="20" strokeLinecap="round" />
          <path d="M88 130 L183 142 M370 141 L460 129" stroke="var(--background)" strokeWidth="8" strokeLinecap="round" opacity=".25" />
        </svg>
      </button>
      <span className="cs-caption absolute bottom-0 right-4">Hover or tap the glasses</span>
    </div>
  )
}
