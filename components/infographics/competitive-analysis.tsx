"use client"

import { Gamepad2, Heart, Sparkles } from "lucide-react"

const categories = [
  {
    icon: Gamepad2,
    label: "Casual Gaming Apps",
    pros: ["High engagement", "Low friction onboarding", "Habit-forming loops"],
    cons: ["No social impact", "Often monetization-focused"],
  },
  {
    icon: Heart,
    label: "Donation Platforms",
    pros: ["Clear mission", "Trust signals", "Impact reporting"],
    cons: ["High friction", "One-time engagement", "Abstract feedback"],
  },
  {
    icon: Sparkles,
    label: "Gamified Impact Products",
    pros: ["Combines play + purpose", "Reward systems", "Community features"],
    cons: ["Complex onboarding", "Impact often unclear"],
  },
]

const keyInsights = [
  {
    number: "01",
    title: "Low-friction onboarding",
    description: "significantly increases participation",
  },
  {
    number: "02",
    title: "Clear game descriptions",
    description: "build trust and reduce drop-off",
  },
  {
    number: "03",
    title: "Visible impact tracking",
    description: "strengthens emotional connection",
  },
  {
    number: "04",
    title: "Cumulative rewards",
    description: "encourage long-term engagement",
  },
]

export default function CompetitiveAnalysis() {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <p className="text-xs text-foreground/40">Research</p>
        <h2 className="text-lg md:text-xl font-medium tracking-tight">
          Competitive Analysis
        </h2>
        <p className="text-sm text-foreground/60 max-w-2xl">
          I began by analyzing existing platforms across three categories
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="border border-border/50 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                <cat.icon className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="text-sm font-medium">{cat.label}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-foreground/40 mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {cat.pros.map((pro, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground/60">
                      <span className="w-1 h-1 rounded-full bg-green-500/60 mt-1.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs text-foreground/40 mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {cat.cons.map((con, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground/60">
                      <span className="w-1 h-1 rounded-full bg-red-400/60 mt-1.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div 
        className="rounded-2xl p-8 md:p-10"
        style={{
          background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
        }}
      >
        <h3 className="text-sm font-medium mb-6">Key Insights Extracted</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyInsights.map((insight, i) => (
            <div key={i} className="space-y-2">
              <span className="text-xs text-foreground/30 font-mono">{insight.number}</span>
              <h4 className="text-sm font-medium text-foreground/90">{insight.title}</h4>
              <p className="text-xs text-foreground/50">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
