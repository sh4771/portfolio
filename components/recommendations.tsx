"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

/** Recommendations from the Vendelux team: one strong line up front, the full note on request. */
const RECOMMENDATIONS = [
  {
    initials: "GB",
    tone: "bg-[#2f6f73]",
    name: "Gina Bochis",
    role: "Product Manager, Vendelux",
    pull: "Our campaign tooling rebuild would not have shipped without her.",
    full: "Violet joined Vendelux as a product design intern and quickly became the person I trusted with some of our most challenging design projects: Segments (ICP targeting system), our internal outreach campaign management tool, and a full event planner redesign. She didn’t wait for a perfect spec: she sat with our internal teams to find where the old tools were failing them and their customers, prototyped fast, and came to every review with a clear view of what we should build, not just how it should look. She handled shifting priorities, a design system in flux, tight engineering constraints, and a lot of stakeholders with grace. Our campaign tooling rebuild would not have shipped without her.",
  },
  {
    initials: "EL",
    tone: "bg-[#4a0e4e]",
    name: "Eddie Li",
    role: "Full-Stack Engineer, Vendelux",
    pull: "Delivering handoffs that made building her work a pleasure.",
    full: "Violet was a fantastic collaborator on Segments and our design system. She was detail-oriented, took initiative, and brought a great attitude to every conversation, communicating design decisions clearly and delivering handoffs that made building her work a pleasure. I’d happily work with Violet again.",
  },
]

function Recommendation({ r, i }: { r: (typeof RECOMMENDATIONS)[number]; i: number }) {
  const [open, setOpen] = useState(false)
  const id = `rec-${r.initials}`
  return (
    <figure
      className="m-0 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both"
      style={{ animationDelay: `${i * 80}ms` }}
    >
      <blockquote className="m-0 text-lg font-medium leading-snug tracking-tight text-foreground text-balance">&ldquo;{r.pull}&rdquo;</blockquote>
      <div id={id} className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <p className="min-h-0 overflow-hidden text-sm leading-relaxed text-foreground/65 text-pretty">{r.full}</p>
      </div>
      <figcaption className="mt-auto flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span aria-hidden className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white", r.tone)}>
            {r.initials}
          </span>
          <span>
            <span className="block text-sm font-medium text-foreground">{r.name}</span>
            <span className="block text-xs text-foreground/55">{r.role}</span>
          </span>
        </span>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={id} className="shrink-0 text-xs font-semibold text-foreground/60 transition-colors hover:text-foreground">
          {open ? "Show less" : "Read full note"}
        </button>
      </figcaption>
    </figure>
  )
}

export function Recommendations() {
  return (
    <div className="space-y-3">
      <p className="cs-eyebrow">What my team says</p>
      <div className="grid items-start gap-3 sm:grid-cols-2">
        {RECOMMENDATIONS.map((r, i) => (
          <Recommendation key={r.name} r={r} i={i} />
        ))}
      </div>
    </div>
  )
}
