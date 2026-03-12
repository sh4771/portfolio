"use client"

import {
  Archive,
  Heart,
  DollarSign,
  Trash2,
  ArrowRight,
  Shirt,
} from "lucide-react"

const disposalMethods = [
  {
    percentage: 63,
    label: "Store unused at home",
    icon: Archive,
    description: "Kept in closets, boxes, or storage",
  },
  {
    percentage: 55,
    label: "Donate clothing",
    icon: Heart,
    description: "Given to charities or friends",
  },
  {
    percentage: 35,
    label: "Sell clothing",
    icon: DollarSign,
    description: "Resold through apps or stores",
  },
  {
    percentage: 35,
    label: "Throw away",
    icon: Trash2,
    description: "Disposed in regular trash",
  },
]

export default function DisposalBehavior() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          03 — Disposal Behavior
        </span>
        <h2 className="text-2xl md:text-3xl font-light">
          Where does unwanted clothing go?
        </h2>
      </div>

      <div className="relative">
        {/* Flow Diagram */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Source: Closet */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-foreground rounded-xl flex flex-col items-center justify-center bg-card">
              <Shirt className="w-8 h-8 md:w-10 md:h-10 text-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Closet</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center">
            <div className="w-12 h-0.5 bg-foreground/30" />
            <ArrowRight className="w-5 h-5 text-foreground/30 -ml-1" />
          </div>
          <div className="md:hidden">
            <ArrowRight className="w-5 h-5 text-foreground/30 rotate-90" />
          </div>

          {/* Destinations */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {disposalMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="border border-border rounded-xl p-4 md:p-6 bg-card hover:border-foreground transition-colors h-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-3xl md:text-4xl font-light text-foreground mb-2">
                      {method.percentage}%
                    </span>
                    <span className="text-xs md:text-sm text-foreground font-medium mb-1">
                      {method.label}
                    </span>
                    <span className="text-xs text-muted-foreground hidden md:block">
                      {method.description}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Connecting Lines (visible on desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[180px] right-0 h-0.5 -z-10">
          <div className="absolute top-0 left-0 w-16 h-0.5 bg-gradient-to-r from-foreground/30 to-transparent" />
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
        Most unwanted clothing never leaves the home — stored away rather than
        recycled or donated. This &quot;closet purgatory&quot; represents a significant
        opportunity for sustainable fashion interventions.
      </p>
    </div>
  )
}
