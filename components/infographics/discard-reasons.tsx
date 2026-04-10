"use client"

import { Ruler, RefreshCw, Camera, Wrench, AlertTriangle } from "lucide-react"

/** Reasons that directly motivate the PASSIT ON concept */
const proposalReasons = [
  {
    percentage: 56,
    label: "Size issues",
    icon: Ruler,
  },
  {
    percentage: 44,
    label: "Feels like worn too often",
    icon: RefreshCw,
  },
  {
    percentage: 14,
    label: "Already posted on social media",
    icon: Camera,
  },
]

const additionalReasons = [
  {
    percentage: 68,
    label: "Damaged or defective",
    icon: Wrench,
  },
  {
    percentage: 66,
    label: "Poor quality / wears out quickly",
    icon: AlertTriangle,
  },
]

function ReasonRow({
  percentage,
  label,
  icon: Icon,
  maxPercentage,
  emphasized,
}: {
  percentage: number
  label: string
  icon: typeof Ruler
  maxPercentage: number
  emphasized?: boolean
}) {
  const barWidth = (percentage / maxPercentage) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
            emphasized ? "bg-foreground/10" : "bg-muted"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${emphasized ? "text-foreground" : "text-muted-foreground"}`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <span
              className={`truncate text-sm md:text-base ${emphasized ? "font-medium text-foreground" : "text-foreground"}`}
            >
              {label}
            </span>
            <span
              className={`flex-shrink-0 font-light text-foreground ${emphasized ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
            >
              {percentage}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                emphasized ? "bg-foreground" : "bg-foreground/40"
              }`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DiscardReasons() {
  const proposalMax = Math.max(...proposalReasons.map((r) => r.percentage))
  const additionalMax = Math.max(...additionalReasons.map((r) => r.percentage))

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          02 — Discard Reasons
        </span>
        <h2 className="text-2xl font-light md:text-3xl">Why do people discard clothing?</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          PASSIT ON is framed around three patterns from research—fit, how &quot;worn out&quot;
          clothes feel, and social visibility—not only damage or quality.
        </p>
      </div>

      <div
        className="space-y-6 rounded-2xl border border-foreground/10 bg-muted/20 p-6 md:p-8"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-foreground/70">
          What this proposal responds to
        </p>
        {proposalReasons.map((reason) => (
          <ReasonRow
            key={reason.label}
            {...reason}
            maxPercentage={proposalMax}
            emphasized
          />
        ))}
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Other factors people cite
        </p>
        <div className="space-y-5 opacity-90">
          {additionalReasons.map((reason) => (
            <ReasonRow key={reason.label} {...reason} maxPercentage={additionalMax} />
          ))}
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        <span className="text-foreground/90">Size issues</span> and{" "}
        <span className="text-foreground/90">wear fatigue</span> push clothes out of rotation
        while they&apos;re still usable; <span className="text-foreground/90">social media</span>{" "}
        accelerates that cycle when an outfit is &quot;done&quot; online. Together, these
        motivated a product story centered on passing items on while they still have life—not
        only on fixing quality or repairs.
      </p>
    </div>
  )
}
