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

/** Schematic street grid with a park strip along the west edge and three candidate routes. */
export function RouteMap({ active, className }: { active: RouteId; className?: string }) {
  return (
    <svg
      viewBox="0 0 600 360"
      role="img"
      aria-label={`Schematic map highlighting the ${active} route to Riverside Park`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="360" fill="var(--muted)" />
      {/* street grid */}
      <g stroke="var(--background)" strokeWidth="14">
        {[50, 110, 170, 230, 290].map((y) => (
          <line key={`h${y}`} x1="0" x2="600" y1={y} y2={y} />
        ))}
        {[190, 270, 330, 390, 450, 510].map((x) => (
          <line key={`v${x}`} x1={x} x2={x} y1="0" y2="360" />
        ))}
      </g>
      {/* park strip + 20 m buffer */}
      <rect x="0" y="0" width="150" height="360" fill="var(--park-fill)" />
      <rect x="150" y="0" width="28" height="360" fill="var(--park-fill)" opacity="0.45" />
      <line x1="178" x2="178" y1="0" y2="360" stroke={GREEN} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
      <g fill="var(--park-tree)">
        {[40, 105, 170, 240, 305].map((y, i) => (
          <circle key={y} cx={i % 2 ? 60 : 100} cy={y} r="18" />
        ))}
      </g>
      <text x="22" y="345" fontSize="13" fontWeight="600" fill="var(--park-ink)" letterSpacing="1.5">
        RIVERSIDE PARK
      </text>

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
      <circle cx="170" cy="50" r="10" fill="var(--foreground)" />
    </svg>
  )
}
