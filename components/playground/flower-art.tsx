"use client"

import { useId } from "react"
import { petalOutline, strokeToPath, type Flower } from "@/lib/flower"

type Art = Pick<Flower, "petals" | "shape" | "layers" | "color" | "color2" | "center" | "strokes" | "mode">

/** Small deterministic wobble so petals look grown, not stamped. */
const jitter = (k: number, salt: number) => {
  const x = Math.sin(k * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** Very pale petals take their outline and veins from the center color, so they stay visible. */
const isPale = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 225
}

/** Faint veins running from the base of a petal toward its tip. */
const VEINS = ["M0 -0.02 C0.01 -0.35 0 -0.6 0 -0.9", "M0 -0.04 C0.06 -0.3 0.12 -0.55 0.16 -0.78", "M0 -0.04 C-0.06 -0.3 -0.12 -0.55 -0.16 -0.78", "M0 -0.06 C0.1 -0.25 0.2 -0.4 0.24 -0.58", "M0 -0.06 C-0.1 -0.25 -0.2 -0.4 -0.24 -0.58"]

/**
 * Draws any playground flower as SVG, in a translucent x-ray style: layered petals that
 * fade from a saturated base to a pale rim, fine veins and a cluster of stamens.
 * The flower spans -1..1, centered on the origin.
 */
export function FlowerArt({ f, className, title, ...svg }: { f: Art; className?: string; title?: string } & Omit<React.SVGProps<SVGSVGElement>, "viewBox">) {
  const uid = useId().replace(/:/g, "")
  const n = Math.max(3, f.petals)
  const step = 360 / n
  const outline = petalOutline(f.shape)
  const g1 = `fa-${uid}-1`
  const g2 = `fa-${uid}-2`
  const glow = `fa-${uid}-g`

  // Outer tier, a second tier of the same color tucked between them, then the inner color.
  const tiers: { scale: number; offset: number; grad: string; ink: string; count: number }[] = [
    { scale: 1, offset: 0, grad: g1, ink: isPale(f.color) ? f.center : f.color, count: n },
    { scale: 0.82, offset: step / 2, grad: g1, ink: isPale(f.color) ? f.center : f.color, count: n },
  ]
  if (f.layers === 2) tiers.push({ scale: 0.56, offset: step / 4, grad: g2, ink: isPale(f.color2) ? f.center : f.color2, count: n })

  const stamens = 30
  return (
    <svg {...svg} viewBox="-1.12 -1.12 2.24 2.24" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <radialGradient id={g1} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={f.color} stopOpacity="0.95" />
          <stop offset="0.35" stopColor={f.color} stopOpacity="0.5" />
          <stop offset="0.8" stopColor={f.color} stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id={g2} cx="0" cy="0" r="0.6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={f.color2} stopOpacity="0.95" />
          <stop offset="0.6" stopColor={f.color2} stopOpacity="0.45" />
          <stop offset="1" stopColor={f.color2} stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id={glow} cx="0" cy="0" r="0.45" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={f.center} stopOpacity="0.55" />
          <stop offset="1" stopColor={f.center} stopOpacity="0" />
        </radialGradient>
      </defs>

      {f.mode === "draw" && f.strokes ? (
        Array.from({ length: n }, (_, k) => (
          <g key={k} transform={`rotate(${k * step})`}>
            {f.strokes!.map((s, i) => (
              <g key={i}>
                <path d={strokeToPath(s.p)} fill="none" stroke={s.c} strokeOpacity={0.22} strokeWidth={s.w * 2.6} strokeLinecap="round" strokeLinejoin="round" />
                <path d={strokeToPath(s.p)} fill="none" stroke={s.c} strokeOpacity={0.85} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
          </g>
        ))
      ) : (
        tiers.map((t, ti) =>
          Array.from({ length: t.count }, (_, k) => {
            const rot = k * step + t.offset + (jitter(k, ti) - 0.5) * 8
            const sc = t.scale * (0.94 + jitter(k, ti + 3) * 0.1)
            return (
              <g key={`${ti}-${k}`} transform={`rotate(${rot}) scale(${sc})`}>
                <path d={outline} fill={`url(#${t.grad})`} stroke={t.ink} strokeOpacity={0.7} strokeWidth={0.01} />
                {VEINS.map((v, vi) => (
                  <path key={vi} d={v} fill="none" stroke={t.ink} strokeOpacity={0.3} strokeWidth={0.005} />
                ))}
              </g>
            )
          }),
        )
      )}

      {/* stamens */}
      <circle r={0.42} fill={`url(#${glow})`} />
      {Array.from({ length: stamens }, (_, k) => {
        const a = (k / stamens) * Math.PI * 2 + jitter(k, 9) * 0.3
        const len = 0.12 + jitter(k, 11) * 0.16
        const x = Math.cos(a) * len
        const y = Math.sin(a) * len
        return (
          <g key={k}>
            <line x1={0} y1={0} x2={x} y2={y} stroke={f.center} strokeOpacity={0.55} strokeWidth={0.006} />
            <circle cx={x} cy={y} r={0.012 + jitter(k, 13) * 0.01} fill={f.center} />
          </g>
        )
      })}
      <circle r={0.035} fill={f.center} />
    </svg>
  )
}
