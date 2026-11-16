/** Route results from the Grasshopper analysis (start point to Riverside Park). */
export type RouteId = "shortest" | "balanced" | "greenest"

export const GREEN = "var(--route-green)"

export const ROUTES: {
  id: RouteId
  name: string
  exposure: number
  length: number
  extraM: number
  extraPct: number
  minutes: number
  path: string
}[] = [
  {
    id: "shortest",
    name: "Shortest",
    exposure: 18,
    length: 1000,
    extraM: 0,
    extraPct: 0,
    minutes: 12.0,
    path: "M510 320 V290 H390 V230 H270 V110 H170 V50",
  },
  {
    id: "balanced",
    name: "Balanced",
    exposure: 45,
    length: 1080,
    extraM: 80,
    extraPct: 8,
    minutes: 12.9,
    path: "M510 320 V290 H330 V170 H170 V50",
  },
  {
    id: "greenest",
    name: "Greenest",
    exposure: 62,
    length: 1110,
    extraM: 110,
    extraPct: 11,
    minutes: 13.2,
    path: "M510 320 V290 H164 V50",
  },
]

/* ---------- Base map: a simplified Upper West Side, west of Amsterdam Ave ---------- */

// Deterministic scatter so trees and buildings render the same on server and client.
function rand(seed: number) {
  let x = seed
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}

const TREES = (() => {
  const r = rand(7)
  const out: { x: number; y: number; r: number }[] = []
  for (let i = 0; i < 70; i++) out.push({ x: 42 + r() * 132, y: 4 + r() * 352, r: 3.5 + r() * 5.5 })
  return out
})()

const AVENUES = [
  { x: 270, w: 13, name: "WEST END AVE" },
  { x: 390, w: 17, name: "BROADWAY" },
  { x: 510, w: 13, name: "AMSTERDAM AVE" },
]
const LANES = [330, 450]
const STREETS = [
  { y: 50, name: "W 86 ST" },
  { y: 110, name: "W 84 ST" },
  { y: 170, name: "W 82 ST" },
  { y: 230, name: "W 81 ST" },
  { y: 290, name: "W 79 ST" },
  { y: 348, name: "W 78 ST" },
]

/** Building footprints: each block split into a few lots, with a light courtyard gap. */
const BUILDINGS = (() => {
  const r = rand(23)
  const xs = [194, 270, 330, 390, 450, 510, 600]
  const ys = [0, 50, 110, 170, 230, 290, 348, 360]
  const out: { x: number; y: number; w: number; h: number; tone: number }[] = []
  for (let i = 0; i < xs.length - 1; i++)
    for (let j = 0; j < ys.length - 1; j++) {
      const x0 = xs[i] + 10, x1 = xs[i + 1] - 10, y0 = ys[j] + 8, y1 = ys[j + 1] - 8
      if (x1 - x0 < 12 || y1 - y0 < 8) continue
      const lots = 2 + Math.floor(r() * 3)
      const lw = (x1 - x0) / lots
      for (let k = 0; k < lots; k++) {
        const split = r() > 0.5
        const top = { x: x0 + k * lw + 1, y: y0, w: lw - 2, h: split ? (y1 - y0) * 0.42 : y1 - y0, tone: r() }
        out.push(top)
        if (split) out.push({ x: top.x, y: y0 + (y1 - y0) * 0.58, w: top.w, h: (y1 - y0) * 0.42, tone: r() })
      }
    }
  return out
})()

function Label({ x, y, children, rotate, size = 8.5 }: { x: number; y: number; children: string; rotate?: boolean; size?: number }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight="600"
      letterSpacing="1"
      fill="var(--map-label)"
      stroke="var(--map-land)"
      strokeWidth="3"
      paintOrder="stroke"
      textAnchor="middle"
      transform={rotate ? `rotate(-90 ${x} ${y})` : undefined}
    >
      {children}
    </text>
  )
}

function Subway({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7.5" fill="#ee352e" stroke="var(--map-road)" strokeWidth="2" />
      <text x={x} y={y + 3.2} fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">
        1
      </text>
    </g>
  )
}

/** Simplified Upper West Side map with Riverside Park along the west edge and three candidate routes. */
export function RouteMap({ active, className, walker = false }: { active: RouteId; className?: string; walker?: boolean }) {
  return (
    <svg
      viewBox="0 0 600 360"
      role="img"
      aria-label={`Map of the Upper West Side highlighting the ${active} route to Riverside Park`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="360" fill="var(--map-land)" />

      {/* buildings */}
      <g>
        {BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="1.5" fill="var(--map-bldg)" opacity={0.75 + b.tone * 0.25} />
        ))}
      </g>

      {/* side streets and the two mid-block lanes */}
      <g stroke="var(--map-road)" strokeWidth="9">
        {STREETS.map((s) => (
          <line key={s.y} x1="180" x2="600" y1={s.y} y2={s.y} />
        ))}
      </g>
      <g stroke="var(--map-road)" strokeWidth="6">
        {LANES.map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="360" />
        ))}
      </g>
      {/* avenues */}
      <g stroke="var(--map-avenue)">
        {AVENUES.map((a) => (
          <line key={a.x} x1={a.x} x2={a.x} y1="0" y2="360" strokeWidth={a.w} />
        ))}
      </g>

      {/* Hudson River, Riverside Park, Henry Hudson Pkwy */}
      <rect x="0" y="0" width="190" height="360" fill="var(--park-fill)" />
      <path d="M0 0 H34 C 30 60, 40 120, 32 180 S 38 300, 30 360 H0 Z" fill="var(--map-water)" />
      <path d="M48 0 C 44 90, 52 200, 46 360" fill="none" stroke="var(--map-road)" strokeWidth="7" opacity="0.9" />
      <g fill="none" stroke="var(--map-path)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M95 0 C 120 60, 80 110, 110 170 S 90 290, 125 360" />
        <path d="M110 170 C 135 175, 150 160, 170 165" />
        <path d="M100 70 C 125 60, 150 55, 170 50" />
        <path d="M118 290 C 140 280, 155 292, 176 288" />
      </g>
      <g fill="var(--park-tree)">
        {TREES.map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={t.r} opacity={0.55 + (i % 4) * 0.12} />
        ))}
      </g>
      {/* 20 m buffer edge along Riverside Dr */}
      <line x1="178" x2="178" y1="0" y2="360" stroke={GREEN} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
      {/* Riverside Drive */}
      <path d="M188 0 C 184 90, 192 200, 186 360" fill="none" stroke="var(--map-avenue)" strokeWidth="11" />

      {/* labels */}
      <Label x={16} y={180} rotate size={8}>HUDSON RIVER</Label>
      <Label x={196} y={250} rotate>RIVERSIDE DR</Label>
      {AVENUES.map((a) => (
        <Label key={a.name} x={a.x + 3} y={a.name === "BROADWAY" ? 140 : 200} rotate>
          {a.name}
        </Label>
      ))}
      {STREETS.slice(0, 5).map((s) => (
        <Label key={s.name} x={570} y={s.y + 3}>
          {s.name}
        </Label>
      ))}
      <text x="60" y="345" fontSize="11" fontWeight="700" fill="var(--park-ink)" letterSpacing="1.5">
        RIVERSIDE PARK
      </text>
      <Subway x={404} y={50} />
      <Subway x={404} y={305} />

      {ROUTES.filter((r) => r.id !== active).map((r) => (
        <path
          key={r.id}
          d={r.path}
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity="0.18"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {ROUTES.filter((r) => r.id === active).map((r) => (
        <path
          key={r.id}
          d={r.path}
          fill="none"
          stroke={r.id === "shortest" ? "var(--foreground)" : GREEN}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      <circle cx="510" cy="320" r="10" fill="var(--background)" stroke="var(--foreground)" strokeWidth="4" />
      {walker && (
        <g>
          <circle r="16" fill="#3b82f6" opacity="0.2">
            <animateMotion dur="9s" repeatCount="indefinite" path={ROUTES.find((r) => r.id === active)!.path} />
          </circle>
          <circle r="8" fill="#3b82f6" stroke="#fff" strokeWidth="3">
            <animateMotion dur="9s" repeatCount="indefinite" path={ROUTES.find((r) => r.id === active)!.path} />
          </circle>
        </g>
      )}
      <circle cx="170" cy="50" r="10" fill="var(--foreground)" />
    </svg>
  )
}
