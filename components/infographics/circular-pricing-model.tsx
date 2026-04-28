"use client"

import { Repeat } from "lucide-react"

/** Brief explainer: full diagrams lived in earlier iterations of the case study */
export default function CircularPricingModel() {
  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs uppercase tracking-wide text-foreground/40">
        Circular pricing
      </p>
      <h2 className="text-lg font-medium tracking-tight md:text-xl">
        Resale price steps down over the chain
      </h2>
      <p className="text-sm leading-relaxed text-foreground/60 text-pretty">
        Each handoff lowers the list price so the next buyer can afford the piece. Earlier owners
        can earn a small share of later sales; the platform can use membership or per-sale fees to
        stay sustainable.
      </p>
      <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/25 p-4 text-sm text-foreground/65">
        <Repeat
          className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45"
          strokeWidth={1.75}
          aria-hidden
        />
        <p className="leading-relaxed">
          The Urban Tech hi-fi condition screen (above) shows purchase versus suggested resale in
          the listing flow.
        </p>
      </div>
    </section>
  )
}
