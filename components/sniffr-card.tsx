"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Check, Link2, Maximize2, X } from "lucide-react"
import { cn } from "@/lib/utils"

const APP_URL = "https://claude.ai/artifact/LsoXdGx7DXNGmu2Xdd92oy"
const TITLE = "Dating App for Dogs"
const SCREEN = "/images/sniffr/swipe.webp"

const STACK = [
  { label: "Concept", items: ["Swipe matching", "Breed + distance filters"] },
  { label: "Design", items: ["Mobile UI", "Interaction design"] },
  { label: "Prototype", items: ["Claude Design"] },
]

/* A phone frame around the Sniffr swipe screen. */
function Phone({ className, dim }: { className?: string; dim?: boolean }) {
  return (
    <div className={cn("absolute aspect-[9/19] rounded-[14%/6.6%] bg-neutral-900 p-[2.2%] ring-1 ring-neutral-400/40 shadow-[0_24px_50px_rgba(20,24,40,0.25)]", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-white">
        <div className="flex h-[6.5%] items-center justify-between px-[9%] text-[clamp(6px,0.9vw,11px)] font-semibold text-neutral-900">
          <span>9:41</span>
          <span className="absolute left-1/2 top-[1.4%] h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-neutral-900" />
          <span className="tracking-tighter">●●● ▮</span>
        </div>
        <div className="relative h-[93.5%] w-full">
          <Image src={SCREEN} alt="" fill className="object-cover object-top" sizes="(min-width: 640px) 260px, 45vw" />
        </div>
        {dim && <div className="absolute inset-0 bg-neutral-900/45" />}
      </div>
    </div>
  )
}

function Cover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e9e9eb] transition-colors duration-500 ease-out group-hover:bg-[#dce7f0]">
      {/* back phone, tilted */}
      <Phone
        dim
        className="left-[52%] top-[22%] w-[34%] rotate-[14deg] transition-transform duration-500 ease-out group-hover:translate-x-[4%] group-hover:-translate-y-[3%] group-hover:rotate-[18deg] motion-reduce:transition-none"
      />
      {/* front phone */}
      <Phone className="left-[20%] top-[12%] w-[38%] transition-transform duration-500 ease-out group-hover:-translate-x-[3%] group-hover:-translate-y-[5%] group-hover:-rotate-[2deg] motion-reduce:transition-none" />
    </div>
  )
}

export function SniffrCard() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked; the Open button still works */
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full text-left" aria-haspopup="dialog">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30">
          <Cover />
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
            {TITLE}
          </h3>
          <span className="shrink-0 text-right text-[10px] uppercase tracking-[0.08em] text-foreground/45">Product Design</span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-neutral-900/35 backdrop-blur-sm sm:items-center sm:p-6 motion-safe:animate-[sniffr-fade_.2s_ease-out]"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sniffr-title"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-[880px] overflow-y-auto rounded-t-[28px] bg-white text-neutral-900 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:rounded-[28px] motion-safe:animate-[sniffr-rise_.28s_cubic-bezier(.2,.8,.3,1)]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/85 px-5 py-4 backdrop-blur sm:px-7">
              <a href={APP_URL} target="_blank" rel="noreferrer" aria-label="Open the app in a new tab" className="rounded-full p-1.5 text-neutral-400 transition-colors hover:text-neutral-900">
                <Maximize2 className="h-5 w-5" />
              </a>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-neutral-400 transition-colors hover:text-neutral-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8 px-6 pb-8 pt-4 sm:px-14 sm:pb-14 sm:pt-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-[520px] space-y-3">
                  <h2 id="sniffr-title" className="text-2xl font-normal tracking-tight sm:text-3xl">
                    {TITLE} <span className="text-neutral-400">• 2026</span>
                  </h2>
                  <p className="text-[15px] leading-relaxed text-neutral-600">
                    Sniffr, a swipe-to-match app for dogs. Owners browse nearby pups by breed, distance, and favorite activities, then match for park dates.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" onClick={copy} aria-label="Copy link" className="grid h-10 w-10 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
                    {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Link2 className="h-5 w-5" />}
                  </button>
                  <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]">
                    Try the app <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
                {STACK.map((s) => (
                  <div key={s.label} className="space-y-2">
                    <dt className="text-sm text-neutral-400">{s.label}</dt>
                    {s.items.map((i) => (
                      <dd key={i} className="text-[15px]">{i}</dd>
                    ))}
                  </div>
                ))}
              </dl>

              <a href={APP_URL} target="_blank" rel="noreferrer" className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-neutral-200" aria-label="Open the app in a new tab">
                <Cover />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
