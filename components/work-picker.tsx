"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/** Order of the work grid below Vendelux when nothing is picked. */
export const DEFAULT_ORDER = ["reconcile", "adhd-planner", "greener-routes", "along", "passiton", "games4peace", "schedulink"]

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

/** Slides grid items from their old spot to the new one when the order changes. */
export function useFlip(container: React.RefObject<HTMLElement | null>, key: unknown) {
  const last = useRef<Map<string, DOMRect>>(new Map())
  useLayoutEffect(() => {
    const el = container.current
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-flip]"))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    items.forEach((item) => {
      const prev = last.current.get(item.dataset.flip!)
      const now = item.getBoundingClientRect()
      if (prev && !reduce) {
        const dx = prev.left - now.left
        const dy = prev.top - now.top
        if (dx || dy) item.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 450, easing: "cubic-bezier(.2,.7,.2,1)" })
      } else if (!prev && last.current.size && !reduce) {
        item.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease-out" })
      }
    })
    last.current = new Map(items.map((i) => [i.dataset.flip!, i.getBoundingClientRect()]))
  }, [container, key])
}
