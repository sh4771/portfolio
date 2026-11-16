"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/** Order of the work grid below Vendelux when nothing is picked. */
export const DEFAULT_ORDER = ["reconcile", "mini-violet", "adhd-planner", "greener-routes", "along", "passiton", "games4peace", "schedulink"]

/** Fields a visitor can pick. Picked projects move to the front with a short reason. */
export const FIELDS: { label: string; top: { slug: string; why: string }[] }[] = [
  { label: "all my work", top: [] },
  {
    label: "B2B / SaaS",
    top: [
      { slug: "reconcile", why: "Finance ops workflow" },
      { slug: "clinical-trials", why: "Enterprise data screens" },
    ],
  },
  {
    label: "AI products",
    top: [
      { slug: "mini-violet", why: "A guardrailed AI guide, live on this site" },
      { slug: "clinical-trials", why: "Making AI signals trustworthy" },
    ],
  },
  { label: "Fintech", top: [{ slug: "reconcile", why: "Payout reconciliation, 45 edge cases" }] },
  {
    label: "Health / accessibility",
    top: [
      { slug: "adhd-planner", why: "Planner built around ADHD research" },
      { slug: "cast", why: "Designed with people with spinal cord injuries" },
      { slug: "clinical-trials", why: "Clinical decision tools" },
    ],
  },
  {
    label: "Consumer mobile",
    top: [
      { slug: "adhd-planner", why: "Working prototypes, 4 versions" },
      { slug: "along", why: "Companion-led walking app" },
      { slug: "greener-routes", why: "Map-first mobile flow" },
    ],
  },
  {
    label: "Maps / data viz",
    top: [
      { slug: "greener-routes", why: "Grasshopper route scoring" },
      { slug: "along", why: "Routes with sidequests" },
    ],
  },
  {
    label: "Hardware / IoT",
    top: [
      { slug: "cast", why: "Wearable vest and controls" },
      { slug: "passiton", why: "NFC garment passports" },
    ],
  },
]

/** "Show me all my work ▾" — one line that reads like a sentence and opens a short menu. */
export function WorkPicker({ value, onChange }: { value: number; onChange: (i: number) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", close)
    document.addEventListener("keydown", close)
    return () => {
      document.removeEventListener("pointerdown", close)
      document.removeEventListener("keydown", close)
    }
  }, [open])

  return (
    <div ref={ref} className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
      {value === 0 ? "Show me " : "Show me work in "}
      <span className="relative inline-block">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1 border-b-2 border-dotted border-[#4a0e4e] text-[#4a0e4e] transition-opacity hover:opacity-75 dark:border-[#d9a6dd] dark:text-[#d9a6dd]"
        >
          {FIELDS[value].label}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        {open && (
          <span role="listbox" aria-label="Show work in" className="absolute top-[calc(100%+8px)] left-0 z-20 flex min-w-[220px] flex-col rounded-xl border border-border/60 bg-background p-1 text-sm font-normal shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1">
            {FIELDS.map((f, i) => (
              <button
                key={f.label}
                type="button"
                role="option"
                aria-selected={i === value}
                onClick={() => {
                  onChange(i)
                  setOpen(false)
                }}
                className={cn("rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#ece2ee] hover:text-[#4a0e4e] dark:hover:bg-[#3a2a3c] dark:hover:text-[#d9a6dd]", i === value && "bg-[#ece2ee] text-[#4a0e4e] dark:bg-[#3a2a3c] dark:text-[#d9a6dd]")}
              >
                {f.label}
              </button>
            ))}
          </span>
        )}
      </span>
    </div>
  )
}

/**
 * Smooth reordering without moving DOM nodes (videos keep playing).
 * Call `capture()` right before the order changes; the layout effect then
 * animates every item from where it was on screen to where it lands.
 */
export function useFlip(container: React.RefObject<HTMLElement | null>, key: unknown) {
  const before = useRef<Map<string, DOMRect> | null>(null)

  const capture = () => {
    const el = container.current
    if (!el) return
    // Positions as currently drawn, including any animation still in flight.
    before.current = new Map(Array.from(el.querySelectorAll<HTMLElement>("[data-flip]")).map((i) => [i.dataset.flip!, i.getBoundingClientRect()]))
  }

  useLayoutEffect(() => {
    const el = container.current
    const prev = before.current
    before.current = null
    if (!el || !prev) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-flip]")).filter((i) => !i.hidden)
    items.forEach((i) => i.getAnimations().forEach((a) => a.cancel()))
    items.forEach((item) => {
      const from = prev.get(item.dataset.flip!)
      const to = item.getBoundingClientRect()
      if (from && from.width > 0) {
        const dx = from.left - to.left
        const dy = from.top - to.top
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return
        item.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }], { duration: 480, easing: "cubic-bezier(.22,.8,.24,1)" })
      } else {
        item.animate([{ opacity: 0, transform: "scale(.97)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: 120, easing: "ease-out", fill: "backwards" })
      }
    })
  }, [container, key])

  return capture
}
