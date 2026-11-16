"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Check, CornerUpLeft, CornerUpRight, Flag, Leaf, MapPin, MoveUp, RotateCcw, Search, TreePine } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { GREEN, ROUTES, RouteMap, type RouteId } from "./route-data"

type Step = "home" | "prefs" | "routes" | "walking" | "done"

/** Turn-by-turn for each route, following the streets drawn on the map. */
const DIRECTIONS: Record<RouteId, { icon: LucideIcon; text: string }[]> = {
  greenest: [
    { icon: MoveUp, text: "Head north on Amsterdam Ave" },
    { icon: CornerUpLeft, text: "Turn left onto W 79 St" },
    { icon: TreePine, text: "Enter Riverside Park at Riverside Dr" },
    { icon: Leaf, text: "Follow the park path north" },
    { icon: Flag, text: "Arrive at W 86 St entrance" },
  ],
  balanced: [
    { icon: MoveUp, text: "Head north on Amsterdam Ave" },
    { icon: CornerUpLeft, text: "Turn left onto W 79 St" },
    { icon: CornerUpRight, text: "Turn right past Broadway" },
    { icon: CornerUpLeft, text: "Turn left onto W 82 St" },
    { icon: TreePine, text: "Enter Riverside Park" },
    { icon: Flag, text: "Arrive at W 86 St entrance" },
  ],
  shortest: [
    { icon: MoveUp, text: "Head north on Amsterdam Ave" },
    { icon: CornerUpLeft, text: "Turn left onto W 79 St" },
    { icon: CornerUpRight, text: "Turn right onto Broadway" },
    { icon: CornerUpLeft, text: "Turn left onto W 81 St" },
    { icon: CornerUpRight, text: "Turn right onto West End Ave" },
    { icon: CornerUpLeft, text: "Turn left onto W 84 St" },
    { icon: Flag, text: "Arrive at W 86 St entrance" },
  ],
}

function Primary({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-auto w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85">
      {children}
    </button>
  )
}

function Back({ label, onClick, floating }: { label: string; onClick: () => void; floating?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 hover:text-foreground",
        floating && "absolute top-3 left-3 z-10 rounded-full bg-background/95 px-3 py-2 shadow-sm ring-1 ring-black/5",
      )}
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

/** Green share as a bar, so routes compare at a glance. */
function GreenBar({ value, muted }: { value: number; muted?: boolean }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
      <span className="block h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: muted ? "var(--foreground)" : GREEN, opacity: muted ? 0.35 : 1 }} />
    </span>
  )
}

/** A working walk-through of the app: destination, preferences, route choice, directions. */
export function PhonePrototype() {
  const [step, setStep] = useState<Step>("home")
  const [destination, setDestination] = useState("Riverside Park")
  const [maxDetour, setMaxDetour] = useState(15)
  const [preferGreen, setPreferGreen] = useState(true)
  const [chosen, setChosen] = useState<RouteId>("greenest")
  const [turn, setTurn] = useState(0)

  const available = useMemo(() => ROUTES.filter((r) => r.extraPct <= maxDetour), [maxDetour])
  const recommended: RouteId = preferGreen ? available.reduce((a, b) => (b.exposure > a.exposure ? b : a)).id : "shortest"
  const route = ROUTES.find((r) => r.id === chosen)!
  const place = destination.trim() || "Riverside Park"
  const steps = DIRECTIONS[chosen]

  // While walking, the banner advances through the turns in step with the moving dot.
  useEffect(() => {
    if (step !== "walking") return
    setTurn(0)
    const t = setInterval(() => setTurn((i) => (i + 1) % steps.length), 9000 / steps.length)
    return () => clearInterval(t)
  }, [step, steps.length])

  const reset = () => {
    setStep("home")
    setDestination("Riverside Park")
    setMaxDetour(15)
    setPreferGreen(true)
    setChosen("greenest")
  }

  const Turn = steps[turn].icon

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[10px] border-foreground bg-background shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
        <div className="flex h-12 items-end justify-between px-7 pb-1 text-[11px] font-semibold text-foreground">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-foreground" aria-hidden="true" />
          <span className="w-7" />
        </div>

        <div key={step} className="vendelux-step-in flex h-[620px] flex-col gap-4 px-5 pb-6 pt-3" aria-live="polite">
          {step === "home" && (
            <>
              <div className="relative -mx-5 -mt-3 h-[215px] overflow-hidden">
                <RouteMap active="greenest" className="block h-full w-full" />
                <label className="absolute inset-x-3 top-3 flex items-center gap-2 rounded-full bg-background/95 px-4 py-3 shadow-sm ring-1 ring-black/5">
                  <Search className="h-4 w-4 shrink-0 text-foreground/50" aria-hidden />
                  <span className="sr-only">Destination</span>
                  <input value={destination} maxLength={60} onChange={(e) => setDestination(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none" />
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: GREEN }} aria-hidden />
                </label>
              </div>
              <div>
                <p className="cs-eyebrow">Greener routes · NYC</p>
                <h4 className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">Where to today?</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Find a walk that works for you, not just the clock.</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: GREEN }}>
                  <Leaf className="h-4 w-4 text-background" aria-hidden />
                </span>
                <span className="text-xs text-foreground/75">
                  The greenest route here runs <b className="font-semibold text-foreground">62%</b> along parks, for 1.2 extra minutes.
                </span>
              </div>
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
                <input type="range" min={0} max={30} step={5} value={maxDetour} aria-label="Maximum detour percentage" onChange={(e) => setMaxDetour(Number(e.target.value))} className="mt-3 w-full" style={{ accentColor: GREEN }} />
                {/* Which routes fit the limit, lit as the slider moves */}
                <div className="mt-3 grid grid-cols-3 gap-1">
                  {ROUTES.map((r) => {
                    const on = r.extraPct <= maxDetour
                    return (
                      <span key={r.id} className={cn("flex items-start gap-1.5 text-[11px] leading-tight transition-colors", on ? "text-foreground/75" : "text-foreground/30")}>
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full transition-colors" style={{ background: on ? (r.id === "shortest" ? "var(--foreground)" : GREEN) : "var(--border)" }} />
                        <span>
                          {r.name}
                          <span className="block tabular-nums opacity-70">{r.extraPct ? `+${r.extraPct}%` : "0%"}</span>
                        </span>
                      </span>
                    )
                  })}
                </div>
              </div>
              <button type="button" role="switch" aria-checked={preferGreen} onClick={() => setPreferGreen((v) => !v)} className="flex items-center justify-between gap-3 rounded-xl border border-border/60 p-4 text-left">
                <span>
                  <span className="block text-sm font-medium text-foreground">Prioritize green space</span>
                  <span className="mt-1 block text-xs text-muted-foreground">Favor parks over minimizing time.</span>
                </span>
                <span className="relative h-6 w-11 shrink-0 rounded-full transition-colors" style={{ background: preferGreen ? GREEN : "var(--border)" }}>
                  <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" style={{ transform: `translateX(${preferGreen ? 22 : 2}px)` }} />
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
              <div className="relative -mx-5 -mt-3 h-[200px] overflow-hidden">
                <RouteMap active={chosen} className="block h-full w-full" />
                <Back label="Preferences" onClick={() => setStep("prefs")} floating />
              </div>
              <div className="flex items-baseline justify-between">
                <h4 className="text-xl font-semibold tracking-tight text-foreground">Compare routes</h4>
                <p className="text-xs text-muted-foreground">≤ {maxDetour}% detour</p>
              </div>
              <div className="space-y-2">
                {available.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={chosen === r.id}
                    onClick={() => setChosen(r.id)}
                    className={cn("w-full space-y-2 rounded-xl p-3 text-left transition-colors", chosen === r.id ? "border-2 border-foreground/70 bg-foreground/[0.03]" : "border border-border/60")}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{r.name}</span>
                      {r.id === recommended && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide text-background uppercase" style={{ background: GREEN }}>
                          Recommended
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-9 text-sm font-semibold tabular-nums" style={{ color: r.id === "shortest" ? undefined : GREEN }}>
                        {r.exposure}%
                      </span>
                      <GreenBar value={r.exposure} muted={r.id === "shortest"} />
                    </span>
                    <span className="block text-xs text-foreground/60 tabular-nums">
                      {r.minutes.toFixed(1)} min · {r.length.toLocaleString()} m · {r.extraM ? `+${r.extraPct}%` : "shortest"}
                    </span>
                  </button>
                ))}
              </div>
              {available.length < ROUTES.length && <p className="text-[11px] text-muted-foreground">Raise the detour limit to see more routes.</p>}
              <Primary onClick={() => setStep("walking")}>Start walking</Primary>
            </>
          )}

          {step === "walking" && (
            <>
              <div className="relative -mx-5 -mt-3 h-[260px] overflow-hidden">
                <RouteMap active={chosen} walker className="block h-full w-full" />
                <div key={turn} className="absolute inset-x-3 top-3 flex items-center gap-3 rounded-2xl p-3 text-background shadow-lg motion-safe:animate-in motion-safe:fade-in" style={{ background: GREEN }}>
                  <Turn className="h-6 w-6 shrink-0" aria-hidden />
                  <span className="text-sm leading-snug font-semibold">{steps[turn].text}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 text-center text-xs text-foreground/60 tabular-nums">
                <span>
                  <span className="block text-lg font-semibold" style={{ color: GREEN }}>
                    {route.exposure}%
                  </span>
                  green
                </span>
                <span>
                  <span className="block text-lg font-semibold text-foreground">{route.minutes.toFixed(1)}</span>min
                </span>
                <span>
                  <span className="block text-lg font-semibold text-foreground">{route.length.toLocaleString()}</span>m
                </span>
              </div>
              <p className="flex items-center gap-2 text-xs text-foreground/60">
                <span className="font-semibold text-foreground/80">Then</span> {steps[(turn + 1) % steps.length].text}
              </p>
              <Primary onClick={() => setStep("done")}>Finish demo walk</Primary>
            </>
          )}

          {step === "done" && (
            <>
              <div className="mt-12 flex flex-col items-center gap-4 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full" style={{ background: GREEN }}>
                  <Check className="h-8 w-8 text-background" />
                </span>
                <h4 className="text-2xl font-semibold tracking-tight text-foreground">You made it.</h4>
                <p className="text-sm leading-relaxed text-foreground/70">You took the {route.name.toLowerCase()} route to {place}.</p>
              </div>
              {route.extraM > 0 && (
                <div className="space-y-2.5 rounded-xl border border-border/60 p-4">
                  <p className="cs-eyebrow">Green along the way</p>
                  {[
                    [`${route.name}, yours`, route.exposure, false],
                    ["Shortest", ROUTES[0].exposure, true],
                  ].map(([label, v, muted]) => (
                    <div key={label as string} className="space-y-1">
                      <span className="flex justify-between text-xs text-foreground/70">
                        <span>{label}</span>
                        <span className="tabular-nums">{v}%</span>
                      </span>
                      <GreenBar value={v as number} muted={muted as boolean} />
                    </div>
                  ))}
                  <p className="text-xs text-foreground/60">+{(route.minutes - ROUTES[0].minutes).toFixed(1)} min for it.</p>
                </div>
              )}
              <p className="text-center text-[11px] text-muted-foreground">A simulated walk. Nothing is tracked.</p>
              <button type="button" onClick={reset} className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 py-3.5 text-sm font-semibold text-foreground">
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
