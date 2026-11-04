"use client"

import { useEffect, useState } from "react"
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
// Like, like, pass, like, pass: then the deck loops.
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

export function SniffrDemo({ playing }: { playing: boolean }) {
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState<"idle" | "like" | "nope">("idle")
  const [reduce, setReduce] = useState(false)

  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), [])

  useEffect(() => {
    if (!playing || reduce) return
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const step = (n: number) => {
      timers.push(
        setTimeout(() => {
          if (!alive) return
          setPhase(MOVES[n % MOVES.length])
          timers.push(
            setTimeout(() => {
              if (!alive) return
              setI((x) => x + 1)
              setPhase("idle")
              step(n + 1)
            }, 520),
          )
        }, 1300),
      )
    }
    step(0)
    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [playing, reduce])

  const top = DOGS[i % DOGS.length]
  const next = DOGS[(i + 1) % DOGS.length]
  const fly =
    phase === "like"
      ? { transform: "translateX(135%) rotate(18deg)", transition: "transform .5s cubic-bezier(.4,.1,.6,1)" }
      : phase === "nope"
        ? { transform: "translateX(-135%) rotate(-18deg)", transition: "transform .5s cubic-bezier(.4,.1,.6,1)" }
        : { transform: "none", transition: "none" }

  return (
    <a
      href={SNIFFR_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the Sniffr prototype in a new tab"
      className="group relative flex aspect-[16/11] items-center justify-center bg-[#dce7f0] sm:aspect-[16/10]"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="sniffr-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FD267A" />
            <stop offset="1" stopColor="#FF6036" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative aspect-[9/19] h-[90%] rounded-[34px] bg-neutral-900 p-[7px] shadow-[0_24px_60px_rgba(20,24,40,0.28)] ring-1 ring-neutral-400/40">
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
          <div className="relative mx-2.5 flex-1">
            <DogCard dog={next} style={{ transform: phase === "idle" ? "scale(.96)" : "scale(1)", transition: "transform .5s ease" }} />
            <DogCard key={i} dog={top} style={fly} stamp={phase === "idle" ? null : phase} />
          </div>
          <div className="flex h-16 shrink-0 items-center justify-center gap-4">
            <span className={cn("grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-bold text-rose-500 shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform", phase === "nope" && "scale-110")}>✕</span>
            <span className={cn("grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-emerald-500 shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform", phase === "like" && "scale-110")}>♥</span>
          </div>
        </div>
      </div>

      <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-neutral-800 shadow-sm transition-colors group-hover:bg-white">
        Try it yourself ↗
      </span>
    </a>
  )
}
