"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Check, CornerUpLeft, CornerUpRight, Flag, Leaf, MoveUp, RotateCcw, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"
import { GREEN, ROUTES, RouteMap, type RouteId } from "./route-data"

type Step = "home" | "prefs" | "routes" | "walking" | "done"

const DIRECTIONS = [
  { icon: MoveUp, text: "Head north on Elm St" },
  { icon: CornerUpLeft, text: "Turn left onto Oak St" },
  { icon: TreePine, text: "Enter the Riverside Park path" },
  { icon: Leaf, text: "Follow the tree-lined trail" },
  { icon: CornerUpRight, text: "Exit onto Main St" },
  { icon: Flag, text: "Arrive at destination" },
]

function Primary({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-auto w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
    >
      {children}
    </button>
  )
}

function Back({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 hover:text-foreground">
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

/** A working walk-through of the app: destination, preferences, route choice, directions. */
export function PhonePrototype() {
  const [step, setStep] = useState<Step>("home")
  const [destination, setDestination] = useState("Riverside Park")
  const [maxDetour, setMaxDetour] = useState(15)
  const [preferGreen, setPreferGreen] = useState(true)
  const [chosen, setChosen] = useState<RouteId>("greenest")

  const available = useMemo(() => ROUTES.filter((r) => r.extraPct <= maxDetour), [maxDetour])
  const recommended: RouteId = preferGreen
    ? available.reduce((a, b) => (b.exposure > a.exposure ? b : a)).id
    : "shortest"
  const route = ROUTES.find((r) => r.id === chosen)!
  const place = destination.trim() || "Riverside Park"

  const reset = () => {
    setStep("home")
    setDestination("Riverside Park")
    setMaxDetour(15)
    setPreferGreen(true)
    setChosen("greenest")
  }

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[10px] border-foreground bg-background shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
        <div className="flex h-8 items-center justify-between px-6 text-[11px] font-semibold text-foreground">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-foreground" aria-hidden="true" />
          <span className="w-7" />
        </div>

        <div key={step} className="vendelux-step-in flex h-[600px] flex-col gap-4 px-5 pb-6 pt-3" aria-live="polite">
          {step === "home" && (
            <>
              <div>
                <p className="cs-eyebrow">Greener routes · NYC</p>
                <h4 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Where to today?</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Find a walk that works for you, not just the clock.</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-foreground/10">
                <RouteMap active="greenest" className="block aspect-[5/3] h-auto w-full" />
              </div>
              <label className="space-y-1.5">
                <span className="cs-caption">Destination</span>
                <input
                  value={destination}
                  maxLength={60}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-foreground/60"
                />
              </label>
              <Primary onClick={() => setStep("prefs")}>Find a greener route</Primary>
            </>
          )}

          {step === "prefs" && (
            <>
              <Back label="Back" onClick={() => setStep("home")} />
              <div>
                <h4 className="text-xl font-semibold tracking-tight text-foreground">Route preferences</h4>
                <p className="mt-1 text-xs text-muted-foreground">Going to {place}.</p>
              </div>
              <div className="rounded-xl border border-border/60 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">Maximum detour</span>
                  <span className="text-sm tabular-nums text-foreground">{maxDetour}%</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">How much longer than the shortest route you&apos;ll walk.</p>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={5}
                  value={maxDetour}
                  aria-label="Maximum detour percentage"
                  onChange={(e) => setMaxDetour(Number(e.target.value))}
                  className="mt-3 w-full"
                  style={{ accentColor: GREEN }}
                />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferGreen}
                onClick={() => setPreferGreen((v) => !v)}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/60 p-4 text-left"
              >
                <span>
                  <span className="block text-sm font-medium text-foreground">Prioritize green space</span>
                  <span className="mt-1 block text-xs text-muted-foreground">Favor parks over minimizing time.</span>
                </span>
                <span
                  className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
                  style={{ background: preferGreen ? GREEN : "var(--border)" }}
                >
                  <span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                    style={{ transform: `translateX(${preferGreen ? 22 : 2}px)` }}
                  />
                </span>
              </button>
              <div className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 text-xs text-foreground/80">
                <span>Green-space buffer</span>
                <span>20 m (fixed)</span>
              </div>
              <Primary
                onClick={() => {
                  setChosen(recommended)
                  setStep("routes")
                }}
              >
                Compare routes
              </Primary>
            </>
          )}

          {step === "routes" && (
            <>
              <Back label="Preferences" onClick={() => setStep("prefs")} />
              <div>
                <h4 className="text-xl font-semibold tracking-tight text-foreground">Compare routes</h4>
                <p className="mt-1 text-xs text-muted-foreground">Within {maxDetour}% of the shortest distance.</p>
              </div>
              <div className="space-y-2">
                {available.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={chosen === r.id}
                    onClick={() => setChosen(r.id)}
                    className={cn(
                      "w-full rounded-xl p-3 text-left transition-colors",
                      chosen === r.id ? "border-2 border-foreground/70 bg-foreground/[0.03]" : "border border-border/60",
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{r.name}</span>
                      {r.id === recommended && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background" style={{ background: GREEN }}>
                          Recommended
                        </span>
                      )}
                    </span>
                    <span className="mt-2 grid grid-cols-3 text-xs text-foreground/75 tabular-nums">
                      <span>
                        <span className="block text-base font-light" style={{ color: r.id === "shortest" ? undefined : GREEN }}>
                          {r.exposure}%
                        </span>
                        green
                      </span>
                      <span>
                        <span className="block text-base font-light">{r.length.toLocaleString()} m</span>
                        {r.extraM ? `+${r.extraPct}%` : "shortest"}
                      </span>
                      <span>
                        <span className="block text-base font-light">{r.minutes.toFixed(1)}</span>
                        min
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              {available.length < ROUTES.length && (
                <p className="text-[11px] text-muted-foreground">Raise the detour limit to see more routes.</p>
              )}
              <Primary onClick={() => setStep("walking")}>Start walking</Primary>
            </>
          )}

          {step === "walking" && (
            <>
              <Back label="Routes" onClick={() => setStep("routes")} />
              <div className="overflow-hidden rounded-2xl border border-foreground/10">
                <RouteMap active={chosen} className="block aspect-[5/3] h-auto w-full" />
              </div>
              <div className="grid grid-cols-3 text-center text-xs text-foreground/75 tabular-nums">
                <span>
                  <span className="block text-lg font-light text-foreground">{route.exposure}%</span>green
                </span>
                <span>
                  <span className="block text-lg font-light text-foreground">{route.length.toLocaleString()} m</span>distance
                </span>
                <span>
                  <span className="block text-lg font-light text-foreground">{route.minutes.toFixed(1)} min</span>time
                </span>
              </div>
              <ol className="space-y-2.5 overflow-y-auto">
                {DIRECTIONS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-foreground/85">
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {text}
                  </li>
                ))}
              </ol>
              <Primary onClick={() => setStep("done")}>Finish demo walk</Primary>
            </>
          )}

          {step === "done" && (
            <>
              <div className="mt-16 flex flex-col items-center gap-4 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full" style={{ background: GREEN }}>
                  <Check className="h-8 w-8 text-background" />
                </span>
                <h4 className="text-2xl font-semibold tracking-tight text-foreground">You made it.</h4>
                <p className="text-sm leading-relaxed text-foreground/70">
                  You took the {route.name.toLowerCase()} route to {place}.
                  {route.extraM > 0 &&
                    ` ${(route.minutes - ROUTES[0].minutes).toFixed(1)} extra minutes bought you ${route.exposure}% green exposure instead of ${ROUTES[0].exposure}%.`}
                </p>
              </div>
              <p className="rounded-xl bg-muted/40 p-3 text-center text-xs text-muted-foreground">A simulated walk. Nothing is tracked.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 py-3.5 text-sm font-semibold text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                Try another route
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
