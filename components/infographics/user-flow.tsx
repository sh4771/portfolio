"use client"

import { ArrowRight, Play, Home, Trophy, User, BarChart3 } from "lucide-react"

const flowSteps = [
  { icon: Play, label: "Onboarding", description: "Account setup & tutorial" },
  { icon: Home, label: "Home", description: "Game discovery & selection" },
  { icon: BarChart3, label: "Gameplay", description: "Play games, earn impact" },
  { icon: Trophy, label: "Impact", description: "View contributions & rewards" },
  { icon: User, label: "Profile", description: "Track progress & achievements" },
]

export default function UserFlow() {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <p className="text-xs text-foreground/40">Structure</p>
        <h2 className="text-lg md:text-xl font-medium tracking-tight">
          Information Architecture & User Flow
        </h2>
        <p className="text-sm text-foreground/60 max-w-2xl">
          This structure ensured that impact feedback remained visible without interrupting gameplay
        </p>
      </div>

      {/* Flow Diagram */}
      <div 
        className="rounded-2xl p-8 md:p-10 overflow-x-auto"
        style={{
          background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
        }}
      >
        <div className="flex items-center justify-between min-w-[600px] gap-2">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-3"
                  style={{
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <step.icon className="w-6 h-6 text-foreground/70" />
                </div>
                <h4 className="text-sm font-medium">{step.label}</h4>
                <p className="text-xs text-foreground/50 mt-1 max-w-[100px]">{step.description}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-foreground/20 mx-4 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Feedback Loop */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="flex items-center justify-center gap-3 text-xs text-foreground/40">
            <span className="px-3 py-1.5 rounded-full bg-foreground/5">
              Impact visible at every step
            </span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-foreground/5">
              Continuous feedback loop
            </span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-foreground/5">
              Sustained engagement
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
