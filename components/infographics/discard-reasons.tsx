"use client"

import { Wrench, AlertTriangle, Ruler, RefreshCw, Camera } from "lucide-react"

const reasons = [
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

export default function DiscardReasons() {
  const maxPercentage = Math.max(...reasons.map((r) => r.percentage))

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          02 — Discard Reasons
        </span>
        <h2 className="text-2xl md:text-3xl font-light">
          Why do people discard clothing?
        </h2>
      </div>

      <div className="space-y-6">
        {reasons.map((reason, index) => {
          const Icon = reason.icon
          const barWidth = (reason.percentage / maxPercentage) * 100

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="text-sm md:text-base text-foreground truncate">
                      {reason.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-light text-foreground flex-shrink-0">
                      {reason.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full transition-all duration-700"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
        Quality-related issues dominate disposal decisions, with damage and
        rapid wear accounting for the majority of discards. The &quot;already
        posted on social media&quot; phenomenon, while smaller, highlights the
        growing influence of digital presence on physical consumption.
      </p>
    </div>
  )
}
