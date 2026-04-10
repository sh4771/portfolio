"use client"

import { Ruler, RefreshCw, Camera, Wrench, AlertTriangle, Shirt, History, TrendingUp } from "lucide-react"

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
  { label: "Damaged or defective", icon: Wrench },
  { label: "Poor quality / wears out quickly", icon: AlertTriangle },
]

const challengePoints = [
  {
    icon: Shirt,
    title: "Early exit",
    description: "Pieces leave rotation while the fabric still has life.",
  },
  {
    icon: History,
    title: "Invisible history",
    description: "Ownership, care, and impact rarely show up in everyday tools.",
  },
  {
    icon: TrendingUp,
    title: "New gets the spotlight",
    description: "Trends and feeds make replacement feel easier than reuse.",
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

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          02 · Discard Reasons
        </span>
        <h2 className="text-2xl font-light md:text-3xl">Why do people discard clothing?</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          PASSIT ON is framed around three patterns from research: fit, how &quot;worn out&quot;
          clothes feel, and social visibility, not only damage or quality.
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
        <div className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4 md:p-5">
          {additionalReasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div key={reason.label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-foreground/85">{reason.label}</span>
              </div>
            )
          })}
        </div>
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Included for context. The design story below centers on fit, wear fatigue, and social
          visibility, where the product can change behavior without leaning on repair-only
          narratives.
        </p>
      </div>

      {/* Key takeaway: challenge-first + visual */}
      <div
        className="space-y-6 rounded-2xl border border-foreground/10 bg-muted/15 p-6 md:p-8"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
      >
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Key takeaway
          </p>
          <p className="text-sm font-medium text-foreground/90">The challenge underneath the data</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {challengePoints.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-xl border border-border/50 bg-background/80 p-4 text-center sm:text-left"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 sm:mx-0">
                <Icon className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <span className="text-foreground/90">Size issues</span> and{" "}
          <span className="text-foreground/90">wear fatigue</span> pull still-wearable clothes out
          of use. <span className="text-foreground/90">Social feeds</span> shorten how long an
          outfit feels &quot;fresh.&quot; PASSIT ON targets that gap: make history and handoffs
          visible so keeping or passing something on can stand up to the default of buying new,
          not only so people can fix what broke.
        </p>
      </div>
    </div>
  )
}
