"use client"

import { useEffect, useState } from "react"

const stages = [
  {
    label: "Purchase",
    description: "A new garment is bought",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Worn briefly",
    description: "Used only a few times",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    label: "Discarded",
    description: "Deemed out of style",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
  },
  {
    label: "Exported",
    description: "Shipped to Ghana",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Landfill",
    description: "Burned or buried",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
]

export default function ClothingLifecycle() {
  const [activeStage, setActiveStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <div className="w-full select-none">
      {/* Horizontal stage track */}
      <div className="relative flex items-start justify-between gap-0">
        {stages.map((stage, i) => {
          const isActive = i === activeStage
          const isPast = i < activeStage

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center cursor-pointer relative"
              onClick={() => { setActiveStage(i); setPaused(true) }}
              onMouseEnter={() => { setPaused(true); setHoveredStage(i) }}
              onMouseLeave={() => { setPaused(false); setHoveredStage(null) }}
            >
              {/* Card border wraps icon + label when active or hovered */}
              <div
                className="flex flex-col items-center gap-3 rounded-xl px-2 pt-3 pb-2 w-full transition-all duration-300"
                style={{
                  border: isActive
                    ? "1px solid var(--foreground)"
                    : hoveredStage === i
                    ? "1px solid var(--border)"
                    : "1px solid transparent",
                  background: isActive ? "var(--muted)" : "transparent",
                }}
              >
                {/* Connector line + node row */}
                <div className="w-full flex items-center">
                  {/* Left connector */}
                  <div
                    className="flex-1 h-px transition-colors duration-500"
                    style={{
                      background: i === 0 ? "transparent" : isPast || isActive ? "var(--foreground)" : "var(--border)",
                    }}
                  />

                  {/* Icon node — fixed size, never scales */}
                  <div
                    className="relative flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      width: 40,
                      height: 40,
                      background: isActive
                        ? "var(--foreground)"
                        : isPast
                        ? "var(--surface-2, var(--muted))"
                        : "var(--background)",
                      border: `1px solid ${isActive || isPast ? "var(--foreground)" : "var(--border)"}`,
                      color: isActive ? "var(--background)" : "var(--muted-foreground)",
                      opacity: isPast ? 0.5 : 1,
                    }}
                  >
                    <div style={{ width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {stage.icon}
                    </div>
                  </div>

                  {/* Right connector */}
                  <div
                    className="flex-1 h-px transition-colors duration-500"
                    style={{
                      background: i === stages.length - 1 ? "transparent" : isPast ? "var(--foreground)" : "var(--border)",
                    }}
                  />
                </div>

                {/* Label + description */}
                <div className="text-center">
                  <p
                    className="text-xs font-medium leading-tight transition-colors duration-300"
                    style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {stage.label}
                  </p>
                  <p
                    className="text-xs leading-snug transition-all duration-400"
                    style={{
                      color: "var(--muted-foreground)",
                      opacity: isActive ? 0.7 : 0,
                      maxHeight: isActive ? "32px" : "0px",
                      overflow: "hidden",
                      marginTop: isActive ? "2px" : "0px",
                    }}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Loop-back arrow */}
      <div className="flex items-center mt-5 gap-2">
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        <svg
          width="160"
          height="18"
          viewBox="0 0 160 18"
          fill="none"
          style={{ color: "var(--muted-foreground)", opacity: 0.4, flexShrink: 0 }}
        >
          <path
            d="M0 4 Q80 -8 160 4"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />
          <polyline points="4,0 0,4 5,8" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      <p className="text-center text-xs mt-2" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>
        cycle repeats indefinitely
      </p>
    </div>
  )
}
