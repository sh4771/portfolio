"use client"

import { RefreshCw, TrendingUp, Users, Smile, Shirt, EyeOff, Sparkles } from "lucide-react"

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
          04 · Buying Motivations
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
        Most abandoned clothes are not worn out. They stop being worn because they no longer fit,
        have already been posted on social media, or feel overexposed. They pile up in rooms, unworn but not unusable.
      </p>

      <div className="space-y-5 rounded-2xl border border-foreground/10 bg-muted/15 p-6 md:p-8">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Key takeaway
          </span>
          <p className="text-sm font-medium text-foreground/90">Challenge behind the purchase drivers</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shirt, label: "Still wearable" },
            { icon: EyeOff, label: "Story unseen" },
            { icon: Sparkles, label: "New feels easier" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-background/80 px-2 py-4 text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10">
                <Icon className="h-4 w-4 text-foreground/75" strokeWidth={1.75} />
              </div>
              <span className="text-[11px] font-medium leading-tight text-foreground/80 md:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="border-l-2 border-foreground pl-5 space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Aha moment
          </span>
          <div className="space-y-2 text-base font-semibold leading-relaxed text-foreground/60">
            <p>
              <span className="text-foreground/80">People think new is better.</span>
            </p>
            <p>
              Watching still-wearable pieces pile up, I realized the friction was not only damage.
            </p>
            <p>
              It was that{" "}
              <span className="text-foreground/80">reuse rarely feels as clear as checkout.</span>
            </p>
            <p>
              Then it clicked:{" "}
              <span className="text-foreground/80">worn can hold more value</span> when{" "}
              <span className="text-foreground/80">stories and memories are visible</span>.
            </p>
            <p>
              So the work became{" "}
              <span className="text-foreground/80">making existing value legible in the product</span>
              , not adding another way to shop new.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
