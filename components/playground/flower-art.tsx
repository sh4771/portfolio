import { petalOutline, strokeToPath, type Flower } from "@/lib/flower"

type Art = Pick<Flower, "petals" | "shape" | "layers" | "color" | "color2" | "center" | "strokes" | "mode">

/** Draws any playground flower as SVG. The flower spans -1..1, centered on the origin. */
export function FlowerArt({ f, className, title, ...svg }: { f: Art; className?: string; title?: string } & Omit<React.SVGProps<SVGSVGElement>, "viewBox">) {
  const n = Math.max(3, f.petals)
  const step = 360 / n
  const outline = petalOutline(f.shape)
  return (
    <svg {...svg} viewBox="-1.12 -1.12 2.24 2.24" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {f.mode === "draw" && f.strokes ? (
        Array.from({ length: n }, (_, k) => (
          <g key={k} transform={`rotate(${k * step})`}>
            {f.strokes!.map((s, i) => (
              <path key={i} d={strokeToPath(s.p)} fill="none" stroke={s.c} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </g>
        ))
      ) : (
        <>
          {Array.from({ length: n }, (_, k) => (
            <path key={`o${k}`} d={outline} transform={`rotate(${k * step}) scale(1.02)`} fill={f.color} stroke="rgba(60,40,60,.18)" strokeWidth={0.012} />
          ))}
          {f.layers === 2 &&
            Array.from({ length: n }, (_, k) => (
              <path key={`i${k}`} d={outline} transform={`rotate(${k * step + step / 2}) scale(0.6)`} fill={f.color2} stroke="rgba(60,40,60,.14)" strokeWidth={0.012} />
            ))}
        </>
      )}
      <circle r={0.17} fill={f.center} stroke="rgba(60,40,60,.15)" strokeWidth={0.012} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <circle key={k} cx={Math.cos((k * Math.PI) / 3) * 0.08} cy={Math.sin((k * Math.PI) / 3) * 0.08} r={0.018} fill="rgba(60,40,40,.25)" />
      ))}
    </svg>
  )
}
