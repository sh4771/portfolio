"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export const SNIFFR_URL = "https://claude.ai/artifact/LsoXdGx7DXNGmu2Xdd92oy"

const DOGS = [
  { id: "mochi", name: "Mochi", age: 3, breed: "Shiba Inu", dist: "1.2 mi", tags: ["Sniff walks", "Sunbathing", "Zoomies"] },
  { id: "biscuit", name: "Biscuit", age: 2, breed: "Golden Retriever", dist: "0.8 mi", tags: ["Fetch", "Swimming", "Tug"] },
  { id: "bear", name: "Bear", age: 4, breed: "Bernese Mountain Dog", dist: "1.5 mi", tags: ["Stoop sitting", "Snow days"] },
  { id: "noodle", name: "Noodle", age: 5, breed: "Dachshund", dist: "3.4 mi", tags: ["Digging", "Treat hunts"] },
  { id: "luna", name: "Luna", age: 1, breed: "Siberian Husky", dist: "1.9 mi", tags: ["Running", "Howling"] },
]
// Autoplay: like, like, pass, like, pass, then the deck loops.
const MOVES: ("like" | "nope")[] = ["like", "like", "nope", "like", "nope"]

/* ---------- static phone with the swipe screenshot (cover tile) ---------- */

function ShotPhone({ className, dim }: { className?: string; dim?: boolean }) {
  return (
    <div className={cn("absolute aspect-[9/19] rounded-[14%/6.6%] bg-neutral-900 p-[2.2%] ring-1 ring-neutral-400/40 shadow-[0_24px_50px_rgba(20,24,40,0.25)]", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-white">
        <div className="flex h-[6.5%] items-center justify-between px-[9%] text-[clamp(6px,0.9vw,11px)] font-semibold text-neutral-900">
          <span>9:41</span>
          <span className="absolute left-1/2 top-[1.4%] h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-neutral-900" />
          <span className="tracking-tighter">●●● ▮</span>
        </div>
        <div className="relative h-[93.5%] w-full">
          <Image src="/images/sniffr/swipe.webp" alt="" fill className="object-cover object-top" sizes="(min-width: 640px) 260px, 45vw" />
        </div>
        {dim && <div className="absolute inset-0 bg-neutral-900/45" />}
      </div>
    </div>
  )
}

export function SniffrCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e9e9eb] transition-colors duration-500 ease-out group-hover:bg-[#dce7f0]">
      <ShotPhone
        dim
        className="left-[52%] top-[22%] w-[34%] rotate-[14deg] transition-transform duration-500 ease-out group-hover:translate-x-[4%] group-hover:-translate-y-[3%] group-hover:rotate-[18deg] motion-reduce:transition-none"
      />
      <ShotPhone className="left-[20%] top-[12%] w-[38%] transition-transform duration-500 ease-out group-hover:-translate-x-[3%] group-hover:-translate-y-[5%] group-hover:-rotate-[2deg] motion-reduce:transition-none" />
    </div>
  )
}

/* ---------- autoplaying swipe demo (panel preview) ---------- */

function Paw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="url(#sniffr-brand)">
        <ellipse cx="12" cy="20" rx="5" ry="6.5" />
        <ellipse cx="20" cy="11" rx="5" ry="6.5" />
        <ellipse cx="29" cy="11" rx="5" ry="6.5" />
        <ellipse cx="37" cy="20" rx="5" ry="6.5" />
        <path d="M24 23c-7 0-13 8-13 14 0 5 4 6 7 5 2-.6 4-1.6 6-1.6s4 1 6 1.6c3 1 7 0 7-5 0-6-6-14-13-14z" />
      </g>
    </svg>
  )
}

function DogCard({ dog, style, stamp }: { dog: (typeof DOGS)[number]; style?: React.CSSProperties; stamp?: "like" | "nope" | null }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[18px] bg-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)]" style={style}>
      <Image src={`/images/sniffr/${dog.id}.webp`} alt="" fill className="object-cover" sizes="240px" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-3.5 text-white">
        <p className="text-[22px] font-extrabold leading-none tracking-tight">
          {dog.name} <span className="text-lg font-semibold">{dog.age}</span>
        </p>
        <p className="text-[11px] font-medium opacity-90">
          {dog.breed} · {dog.dist} away
        </p>
        <div className="flex flex-wrap gap-1">
          {dog.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/30 bg-white/20 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
              {t}
            </span>
          ))}
        </div>
      </div>
      <span
        className={cn(
          "absolute top-5 rounded-md border-[3px] px-2 py-0.5 text-xl font-black tracking-wider transition-opacity duration-200",
          stamp === "like" ? "left-4 -rotate-12 border-emerald-400 text-emerald-400 opacity-100" : "",
          stamp === "nope" ? "right-4 rotate-12 border-rose-500 text-rose-500 opacity-100" : "",
          !stamp && "opacity-0",
        )}
      >
        {stamp === "nope" ? "NOPE" : "LIKE"}
      </span>
    </div>
  )
}

const LIKED_YOU = new Set(["biscuit", "bear", "luna"])

/**
 * A working mini prototype of the swipe screen. It plays itself until the visitor
 * touches it; then they drag cards or tap the buttons, and some likes are matches.
 */
export function SniffrDemo({ playing }: { playing: boolean }) {
  const [i, setI] = useState(0)
  const [fly, setFly] = useState<null | "like" | "nope">(null)
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [auto, setAuto] = useState(true)
  const [match, setMatch] = useState<string | null>(null)
  const [reduce, setReduce] = useState(false)
  const startX = useRef(0)
  const busy = useRef(false)

  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), [])

  const top = DOGS[i % DOGS.length]
  const next = DOGS[(i + 1) % DOGS.length]

  const decide = useCallback(
    (kind: "like" | "nope") => {
      if (busy.current) return
      busy.current = true
      const dog = DOGS[i % DOGS.length]
      setFly(kind)
      setTimeout(() => {
        setI((x) => x + 1)
        setFly(null)
        setDx(0)
        busy.current = false
        if (kind === "like" && LIKED_YOU.has(dog.id)) setMatch(dog.id)
      }, 420)
    },
    [i],
  )

  // Autoplay until the visitor takes over.
  useEffect(() => {
    if (!playing || !auto || reduce || match) return
    const t = setTimeout(() => decide(MOVES[i % MOVES.length]), 1400)
    return () => clearTimeout(t)
  }, [playing, auto, reduce, match, i, decide])
  // An autoplayed match closes itself.
  useEffect(() => {
    if (!match || !auto) return
    const t = setTimeout(() => setMatch(null), 1800)
    return () => clearTimeout(t)
  }, [match, auto])

  const takeOver = () => setAuto(false)
  const onDown = (e: React.PointerEvent) => {
    if (busy.current || match) return
    takeOver()
    startX.current = e.clientX
    setDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => dragging && setDx(e.clientX - startX.current)
  const onUp = () => {
    if (!dragging) return
    setDragging(false)
    if (Math.abs(dx) > 80) decide(dx > 0 ? "like" : "nope")
    else setDx(0)
  }

  const stamp = fly ?? (dx > 30 ? "like" : dx < -30 ? "nope" : null)
  const topStyle: React.CSSProperties = fly
    ? { transform: `translateX(${fly === "like" ? 140 : -140}%) rotate(${fly === "like" ? 18 : -18}deg)`, transition: "transform .42s cubic-bezier(.4,.1,.6,1)" }
    : { transform: `translateX(${dx}px) rotate(${dx / 18}deg)`, transition: dragging ? "none" : "transform .25s ease" }
  const matched = match ? DOGS.find((d) => d.id === match) : null

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center bg-[#dce7f0] sm:aspect-[16/10]">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="sniffr-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FD267A" />
            <stop offset="1" stopColor="#FF6036" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative aspect-[9/19] h-[92%] rounded-[34px] bg-neutral-900 p-[7px] shadow-[0_24px_60px_rgba(20,24,40,0.28)] ring-1 ring-neutral-400/40">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-white">
          <div className="relative flex h-8 shrink-0 items-center justify-between px-5 text-[10px] font-semibold text-neutral-900">
            <span>9:41</span>
            <span className="absolute left-1/2 top-1.5 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-neutral-900" />
            <span className="tracking-tighter">●●● ▮</span>
          </div>
          <div className="flex h-9 shrink-0 items-center justify-center gap-1">
            <Paw className="h-5 w-5" />
            <span className="bg-gradient-to-br from-[#FD267A] to-[#FF6036] bg-clip-text text-lg font-black tracking-tight text-transparent">sniffr</span>
          </div>
          <div className="relative mx-2.5 flex-1 touch-none select-none">
            <DogCard dog={next} style={{ transform: fly || Math.abs(dx) > 10 ? "scale(1)" : "scale(.96)", transition: "transform .3s ease" }} />
            <div
              className={cn("absolute inset-0", dragging ? "cursor-grabbing" : "cursor-grab")}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <DogCard key={i} dog={top} style={topStyle} stamp={stamp} />
            </div>
          </div>
          <div className="flex h-16 shrink-0 items-center justify-center gap-4">
            <button
              type="button"
              aria-label={`Pass on ${top.name}`}
              onClick={() => {
                takeOver()
                decide("nope")
              }}
              className={cn("grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-bold text-rose-500 shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform hover:scale-110", stamp === "nope" && "scale-110")}
            >
              ✕
            </button>
            <button
              type="button"
              aria-label={`Like ${top.name}`}
              onClick={() => {
                takeOver()
                decide("like")
              }}
              className={cn("grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-emerald-500 shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform hover:scale-110", stamp === "like" && "scale-110")}
            >
              ♥
            </button>
          </div>

          {matched && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#FD267A]/95 to-[#FF6036]/95 px-6 text-center text-white motion-safe:animate-[sniffr-fade_.2s_ease-out]">
              <p className="text-3xl font-black italic tracking-tight">It&apos;s a match!</p>
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white">
                <Image src={`/images/sniffr/${matched.id}.webp`} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <p className="text-sm font-medium">{matched.name} wagged at you too.</p>
              {!auto && (
                <button type="button" onClick={() => setMatch(null)} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#D0104F]">
                  Keep swiping
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm">
        {auto ? "Autoplaying · drag a card to try it" : "Drag the card or tap ✕ / ♥"}
      </p>
      <a
        href={SNIFFR_URL}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-neutral-800 shadow-sm transition-colors hover:bg-white"
      >
        Full prototype ↗
      </a>
    </div>
  )
}
