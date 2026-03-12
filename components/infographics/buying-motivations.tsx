"use client"

import { RefreshCw, TrendingUp, Users, Smile } from "lucide-react"

const motivations = [
  {
    percentage: 65,
    label: "Replacing worn items",
    icon: RefreshCw,
  },
  {
    percentage: 61,
    label: "Keeping up with trends",
    icon: TrendingUp,
  },
  {
    percentage: 59,
    label: "Influenced by social media / others",
    icon: Users,
  },
  {
    percentage: 43,
    label: "Stress relief",
    icon: Smile,
  },
]

export default function BuyingMotivations() {
  const total = motivations.reduce((acc, m) => acc + m.percentage, 0)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          04 — Buying Motivations
        </span>
        <h2 className="text-2xl md:text-3xl font-light">
          What drives new purchases?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Circular Visualization */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-64 h-64 md:w-80 md:h-80"
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
            />

            {/* Segments */}
            {motivations.map((motivation, index) => {
              const segmentAngle = (motivation.percentage / total) * 360
              const previousAngles = motivations
                .slice(0, index)
                .reduce((acc, m) => acc + (m.percentage / total) * 360, 0)

              const startAngle = previousAngles - 90
              const endAngle = startAngle + segmentAngle

              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180

              const x1 = 100 + 70 * Math.cos(startRad)
              const y1 = 100 + 70 * Math.sin(startRad)
              const x2 = 100 + 70 * Math.cos(endRad)
              const y2 = 100 + 70 * Math.sin(endRad)

              const largeArc = segmentAngle > 180 ? 1 : 0

              const opacity = 1 - index * 0.2

              return (
                <path
                  key={index}
                  d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  className="text-foreground"
                  fill="currentColor"
                  style={{ opacity }}
                  stroke="var(--background)"
                  strokeWidth="2"
                />
              )
            })}

            {/* Center circle */}
            <circle cx="100" cy="100" r="35" fill="var(--background)" />
            <text
              x="100"
              y="95"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Purchase
            </text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Drivers
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-6">
          {motivations.map((motivation, index) => {
            const Icon = motivation.icon
            const opacity = 1 - index * 0.2

            return (
              <div key={index} className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-sm bg-foreground flex-shrink-0"
                  style={{ opacity }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      {motivation.label}
                    </span>
                  </div>
                </div>
                <span className="text-2xl font-light text-foreground flex-shrink-0">
                  {motivation.percentage}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
        While practical replacement needs remain the primary driver, social and
        emotional factors — trend-following, social influence, and retail
        therapy — collectively outweigh functional purchasing decisions.
      </p>
    </div>
  )
}
