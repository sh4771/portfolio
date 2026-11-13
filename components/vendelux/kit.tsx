"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/** Shared building blocks so every Vendelux case study reads as one system. */

export const PLUM = "#4a0e4e"
export const PLUM_TEXT = "text-[#4a0e4e] dark:text-[#d9a6dd]"

export function Section({ eyebrow, title, children, id }: { eyebrow: string; title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-6">
      <div className="space-y-2">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h2 className="cs-h2">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function CaseHeader({ eyebrow, title, lead, meta, facts }: { eyebrow: string; title: string; lead?: string; meta: string; facts: [string, string][] }) {
  return (
    <header className="space-y-6">
      <div className="space-y-1.5">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h1 className="cs-h1">{title}</h1>
        {lead && <p className="text-base text-foreground/75">{lead}</p>}
        <p className="text-sm text-foreground/60">{meta}</p>
      </div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50 sm:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-background p-4">
            <dt className="cs-eyebrow mb-1">{k}</dt>
            <dd className="text-sm text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

/** `frame` (an aspect class) gives paired images one shared shape; the image fits inside it. */
export function Shot({ src, alt, w, h, caption, gif, className, frame }: { src: string; alt: string; w: number; h: number; caption?: string; gif?: boolean; className?: string; frame?: string }) {
  return (
    <figure className={cn("space-y-2", className)}>
      <div className={cn("overflow-hidden rounded-xl border border-border/50 bg-white", frame && "relative", frame)}>
        {frame ? (
          <Image src={src} alt={alt} fill unoptimized={gif} className="object-contain" sizes="(min-width: 900px) 600px, 100vw" />
        ) : (
          <Image src={src} alt={alt} width={w} height={h} unoptimized={gif} className="h-auto w-full" sizes="(min-width: 900px) 800px, 100vw" />
        )}
      </div>
      {caption && <figcaption className="cs-caption">{caption}</figcaption>}
    </figure>
  )
}

const TONES = {
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  muted: "bg-foreground/10 text-foreground/70",
  next: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  open: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
}

export function StatusCards({ items }: { items: { tag: string; tone: keyof typeof TONES; body: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((c) => (
        <div key={c.tag} className="space-y-2 rounded-2xl border border-border/60 bg-card p-4">
          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", TONES[c.tone])}>{c.tag}</span>
          <p className="text-sm text-foreground/75">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

/** Two columns of short tags; the accent column is the one that matters. */
export function SplitTags({ cols }: { cols: { title: string; items: string[]; accent?: boolean }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cols.map((c) => (
        <div key={c.title} className={cn("rounded-2xl p-4", c.accent ? "text-white" : "border border-border/60 bg-card")} style={c.accent ? { backgroundColor: PLUM } : undefined}>
          <p className={cn("mb-3 text-[11px] font-semibold tracking-wide uppercase", c.accent ? "text-white/70" : "text-foreground/55")}>{c.title}</p>
          <ul className="flex flex-wrap gap-1.5">
            {c.items.map((t) => (
              <li key={t} className={cn("rounded-md px-2 py-1 text-xs", c.accent ? "bg-white/15" : "border border-border/60")}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** A number that flashes when it changes, so cause and effect is visible. */
export function Live({ value, className }: { value: string; className?: string }) {
  const [flash, setFlash] = useState(false)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setFlash(true)
    const t = setTimeout(() => setFlash(false), 700)
    return () => clearTimeout(t)
  }, [value])
  return <span className={cn("rounded px-1 tabular-nums transition-colors duration-500", flash ? "bg-amber-300/60 dark:bg-amber-400/30" : "bg-transparent", className)}>{value}</span>
}

/** One before/after pair at a time: pick a screen, flip the version. */
export function BeforeAfter({ pairs }: { pairs: { label: string; note: string; before: string; after: string }[] }) {
  const [i, setI] = useState(0)
  const [after, setAfter] = useState(true)
  const p = pairs[i]
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {pairs.length > 1 &&
            pairs.map((x, k) => (
              <button key={x.label} type="button" onClick={() => setI(k)} aria-pressed={i === k} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors", i === k ? "border-foreground bg-foreground text-background" : "border-border/70 text-foreground/70 hover:border-foreground/40")}>
                {x.label}
              </button>
            ))}
        </div>
        <div role="radiogroup" aria-label="Version" className="inline-flex rounded-full bg-muted p-1 text-xs font-semibold">
          {(
            [
              [false, "Before"],
              [true, "After"],
            ] as const
          ).map(([k, label]) => (
            <button key={label} type="button" role="radio" aria-checked={after === k} onClick={() => setAfter(k)} className={cn("rounded-full px-3 py-1.5", after === k ? "bg-background text-foreground shadow-sm" : "text-foreground/55")}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/50 bg-white">
        <Image key={(after ? p.after : p.before) + i} src={after ? p.after : p.before} alt={`${p.label}, ${after ? "after" : "before"}`} fill sizes="(min-width: 900px) 800px, 100vw" className="object-contain motion-safe:animate-in motion-safe:fade-in" />
      </div>
      <p className="cs-caption">{p.note}</p>
    </div>
  )
}
