import { ArrowRight } from "lucide-react"
import { GREEN } from "./route-data"

const POINTS = Array.from({ length: 13 }, (_, i) => {
  const x = 40 + i * 40
  // the route bends toward the park in the middle, so those samples fall inside the buffer
  const y = i < 4 ? 150 : i < 9 ? 82 : 150
  const near = i >= 4 && i < 9
  return { x, y, near }
})

const STEPS = [
  { tool: "Divide Distance", body: "Sample the walking route into evenly spaced points." },
  { tool: "Pull Point", body: "Measure each point's nearest distance to mapped green space." },
  { tool: "Threshold", body: "Mark points within 20 m as green-adjacent." },
  { tool: "Dispatch", body: "Split green-adjacent points from the rest and count both." },
]

/** Diagram of the Green Exposure metric plus the Grasshopper steps that compute it. */
export function ExposureMethod() {
  const near = POINTS.filter((p) => p.near).length

  return (
    <div className="space-y-8">
      <figure className="space-y-3">
        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-muted/20 p-4 md:p-6">
          <svg viewBox="0 0 560 220" role="img" aria-label="Route sample points, with the points inside a 20 meter park buffer highlighted" className="w-full">
            <rect x="170" y="10" width="200" height="44" rx="10" fill="var(--park-fill)" />
            <text x="270" y="38" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--park-ink)" letterSpacing="1.5">
              PARK
            </text>
            <rect x="160" y="10" width="220" height="92" rx="14" fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="6 6" />
            <text x="388" y="96" fontSize="12" fill={GREEN}>20 m buffer</text>
            <path
              d="M40 150 H160 V82 H360 V150 H520"
              fill="none"
              stroke="var(--foreground)"
              strokeOpacity="0.25"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {POINTS.map((p) => (
              <circle
                key={p.x}
                cx={p.x}
                cy={p.y}
                r="7"
                fill={p.near ? GREEN : "var(--background)"}
                stroke={p.near ? GREEN : "var(--foreground)"}
                strokeWidth="2"
              />
            ))}
            <g fontSize="12" fill="var(--muted-foreground)">
              <circle cx="48" cy="196" r="6" fill={GREEN} />
              <text x="60" y="200">green-adjacent</text>
              <circle cx="178" cy="196" r="6" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2" />
              <text x="190" y="200">not near green space</text>
            </g>
          </svg>
        </div>
        <figcaption className="cs-caption">
          Here {near} of {POINTS.length} sample points sit inside the buffer, so this route&apos;s green exposure is{" "}
          {Math.round((near / POINTS.length) * 100)}%.
        </figcaption>
      </figure>

      <div className="rounded-2xl border border-foreground/10 p-5 text-center md:p-6">
        <p className="cs-eyebrow">The metric</p>
        <p className="mt-3 text-lg font-medium tracking-tight text-foreground md:text-xl">
          Green exposure = green-adjacent points ÷ total route points × 100
        </p>
      </div>

      <ol className="grid gap-3 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.tool} className="relative rounded-xl border border-border/60 p-4">
            <span className="cs-caption">0{i + 1}</span>
            <p className="mt-1 text-sm font-medium text-foreground">{s.tool}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/70">{s.body}</p>
            {i < STEPS.length - 1 && (
              <ArrowRight
                className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground md:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
