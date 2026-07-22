"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Screen {
  n: string
  name: string
  cap: string
  src: string
  w: number
  h: number
  alt: string
}

const AUTOPLAY_MS = 3800

export function ScreensGallery({ screens }: { screens: Screen[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, reducedMotion, screens.length])

  const current = screens[index]

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main frame */}
      <div className="relative">
        <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-white shadow-sm">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.w}
            height={current.h}
            className="h-auto w-full animate-[fadeIn_0.4s_ease]"
            sizes="(max-width: 1100px) 100vw, 900px"
            priority={index === 0}
          />
        </div>

        <button
          onClick={() => setIndex((i) => (i - 1 + screens.length) % screens.length)}
          aria-label="Previous screen"
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#111111]/10 bg-white/90 text-[#111111] shadow-sm transition-colors hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % screens.length)}
          aria-label="Next screen"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#111111]/10 bg-white/90 text-[#111111] shadow-sm transition-colors hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5F6672]">
          {current.n} · {current.name}
        </p>
        <p className="text-xs leading-snug text-[#111111]">{current.cap}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {screens.map((s, i) => (
          <button
            key={s.n}
            onClick={() => setIndex(i)}
            aria-label={`Show screen ${s.n}: ${s.name}`}
            aria-current={i === index}
            className={`rounded-[4px] border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${
              i === index
                ? "border-[#3D6469] bg-[#3D6469] text-white"
                : "border-[#111111]/10 bg-white text-[#5F6672] hover:border-[#3D6469]/40"
            }`}
          >
            {s.n}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
