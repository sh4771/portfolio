"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { GREEN, ROUTES, RouteMap, type RouteId } from "./route-data"

const DETOUR_CAP = 15

/** Pick a route to see its map line, green exposure and detour against the 15% cap. */
export function RouteCompare() {
  const [active, setActive] = useState<RouteId>("greenest")
  const route = ROUTES.find((r) => r.id === active)!

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Candidate routes">
        {ROUTES.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={r.id === active}
            onClick={() => setActive(r.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              r.id === active
                ? "border-foreground bg-foreground text-background"
                : "border-border/60 text-foreground/70 hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {r.name}
            {r.id === "greenest" && <span className="ml-1.5 text-xs opacity-70">· recommended</span>}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-foreground/10">
          <RouteMap active={active} className="block aspect-[5/3] h-auto w-full" />
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-foreground/10 bg-muted/20 p-6">
          <div>
            <p className="cs-eyebrow">Green exposure</p>
            <p className="mt-2 flex items-baseline gap-1 font-light tracking-tight text-foreground">
              <span className="text-6xl tabular-nums">{route.exposure}</span>
              <span className="text-3xl">%</span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${route.exposure}%`, background: GREEN }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">of the route within 20 m of mapped green space</p>
          </div>

          <dl className="grid grid-cols-3 gap-3 border-t border-border/40 pt-4">
            <div>
              <dt className="cs-caption">Length</dt>
              <dd className="mt-1 text-base text-foreground tabular-nums">{route.length.toLocaleString()} m</dd>
            </div>
            <div>
              <dt className="cs-caption">Walk</dt>
              <dd className="mt-1 text-base text-foreground tabular-nums">{route.minutes.toFixed(1)} min</dd>
            </div>
            <div>
              <dt className="cs-caption">Extra</dt>
              <dd className="mt-1 text-base text-foreground tabular-nums">
                {route.extraM ? `+${route.extraM} m` : "none"}
              </dd>
            </div>
          </dl>

          <div>
            <div className="flex items-baseline justify-between">
              <p className="cs-caption">Detour vs. the {DETOUR_CAP}% cap</p>
              <p className="text-sm text-foreground tabular-nums">+{route.extraPct}%</p>
            </div>
            <div className="relative mt-2 h-1.5 rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-foreground transition-[width] duration-500"
                style={{ width: `${(route.extraPct / DETOUR_CAP) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="cs-caption">
        Numbers come from the Grasshopper analysis of one trip to Riverside Park. The map is a schematic, not to scale.
      </p>
    </div>
  )
}
