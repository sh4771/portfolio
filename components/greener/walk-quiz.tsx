"use client"

import { useState } from "react"
import { Building2, Car, Clock, Leaf, RotateCcw, Sun, Thermometer } from "lucide-react"
import { cn } from "@/lib/utils"

type Pain = "sun" | "heat" | "noise" | "boring"

const PAINS: { id: Pain; icon: React.ElementType; title: string; note: string }[] = [
  { id: "sun", icon: Sun, title: "Too much sun", note: "Nowhere to hide from it." },
  { id: "heat", icon: Thermometer, title: "Heat and humidity", note: "Why is the sidewalk an oven?" },
  { id: "noise", icon: Car, title: "Noise and traffic", note: "Honk. Honk. Honk." },
  { id: "boring", icon: Building2, title: "Boring scenery", note: "Concrete. More concrete." },
]

const RESULTS: Record<Pain, { title: string; body: string }> = {
  sun: { title: "You're a shade seeker.", body: "Direct sunlight changes how you experience a walk." },
  heat: { title: "You're a cool-route hunter.", body: "Temperature and humidity can make even short trips feel exhausting." },
  noise: { title: "You're a peace-and-quiet walker.", body: "The environment around a route matters as much as its distance." },
  boring: { title: "You're a scenery chaser.", body: "You want the walk to offer something beyond getting there." },
}

/** Three-step reader quiz: what ruins a walk, would you detour, your result. */
export function WalkQuiz() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [pain, setPain] = useState<Pain | null>(null)
  const [detour, setDetour] = useState<"yes" | "no" | null>(null)

  const restart = () => {
    setStep(1)
    setPain(null)
    setDetour(null)
  }

  return (
    <div className="space-y-6 rounded-2xl border border-foreground/10 bg-muted/20 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="cs-eyebrow">{step === 3 ? "Your result" : `Question ${step} of 2`}</p>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-foreground/10" aria-hidden="true">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="vendelux-step-in space-y-6">
          <div className="space-y-2">
            <h3 className="cs-h2">What ruins a perfectly good walk?</h3>
            <p className="cs-body">Pick the thing that makes you say &ldquo;nope, I&apos;m taking the subway.&rdquo;</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {PAINS.map(({ id, icon: Icon, title, note }) => (
              <button
                key={id}
                type="button"
                aria-pressed={pain === id}
                onClick={() => setPain(id)}
                className={cn(
                  "flex min-h-[160px] flex-col justify-between rounded-xl bg-background p-4 text-left transition-[transform,border-color] duration-200 hover:-translate-y-1",
                  pain === id ? "border-2 border-foreground/70" : "border border-border/60",
                )}
              >
                <Icon className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
                <span className="space-y-1">
                  <span className="block text-sm font-medium text-foreground">{title}</span>
                  <span className="block text-xs leading-relaxed text-muted-foreground">{note}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {pain ? "Nice pick. Ready for the next question?" : "Choose one to continue."}
            </p>
            <button
              type="button"
              disabled={!pain}
              onClick={() => setStep(2)}
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next question
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="vendelux-step-in space-y-6">
          <div className="space-y-2">
            <h3 className="cs-h2">Would you walk 2 minutes longer for a better route?</h3>
            <p className="cs-body">Imagine a calmer, greener or more shaded walk, depending on what you care about.</p>
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-3">
            {[
              { id: "yes" as const, icon: Leaf, label: "Absolutely. Worth it." },
              { id: "no" as const, icon: Clock, label: "Nope. I'm in a hurry." },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setDetour(id)
                  setStep(3)
                }}
                className="flex min-h-[120px] flex-col justify-between rounded-xl border border-border/60 bg-background p-4 text-left transition-transform duration-200 hover:-translate-y-1"
              >
                <Icon className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && pain && (
        <div className="vendelux-step-in space-y-4" aria-live="polite">
          <h3 className="cs-h2">{RESULTS[pain].title}</h3>
          <p className="cs-body max-w-xl">
            {RESULTS[pain].body}{" "}
            {detour === "yes"
              ? "You might accept a small detour for a better experience."
              : "You value arriving quickly, so any alternative has to earn its extra time."}
          </p>
          <p className="text-xs text-muted-foreground">
            A playful reflection, not a scientific assessment. Answers are not saved.
          </p>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retake the quiz
          </button>
        </div>
      )}
    </div>
  )
}
