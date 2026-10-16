import { useId } from "react"

export type AvatarMood = "idle" | "wave" | "thinking"

/**
 * Custom Memoji-inspired portrait of Violet, drawn as SVG.
 * Original artwork: soft 3D shading via gradients, no Apple assets.
 */
export function VioletAvatar({
  mood = "idle",
  size = 64,
  background = true,
  className,
}: {
  mood?: AvatarMood
  size?: number
  background?: boolean
  className?: string
}) {
  const raw = useId()
  const id = (name: string) => `${raw.replace(/:/g, "")}-${name}`
  const eyeShiftX = mood === "thinking" ? 2.5 : 0
  const eyeShiftY = mood === "thinking" ? -3 : 0

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id={id("bg")} cx="50%" cy="35%" r="75%">
          <stop offset="0" stopColor="#f3edfb" />
          <stop offset="1" stopColor="#d8cbef" />
        </radialGradient>
        <radialGradient id={id("skin")} cx="45%" cy="38%" r="65%">
          <stop offset="0" stopColor="#ffe6d6" />
          <stop offset="0.6" stopColor="#f8cdb4" />
          <stop offset="1" stopColor="#e9ad8f" />
        </radialGradient>
        <linearGradient id={id("hair")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a352d" />
          <stop offset="1" stopColor="#2a1d18" />
        </linearGradient>
        <radialGradient id={id("hairShine")} cx="40%" cy="20%" r="50%">
          <stop offset="0" stopColor="#8a6656" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8a6656" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("sweater")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6ee" />
          <stop offset="1" stopColor="#e6dccd" />
        </linearGradient>
        <radialGradient id={id("iris")} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#7a5440" />
          <stop offset="1" stopColor="#2b1a12" />
        </radialGradient>
        <radialGradient id={id("pearl")} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9d2cb" />
        </radialGradient>
        <clipPath id={id("clip")}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id("clip")})`}>
        {background && <rect width="200" height="200" fill={`url(#${id("bg")})`} />}

        {/* hair, back layer */}
        <path
          d="M46 92 C40 48 70 24 102 24 C138 24 162 50 156 96 C154 128 162 160 150 186 L52 186 C40 160 48 128 46 92 Z"
          fill={`url(#${id("hair")})`}
        />
        {/* half-up bun */}
        <circle cx="104" cy="24" r="17" fill={`url(#${id("hair")})`} />
        <circle cx="99" cy="19" r="7" fill="#8a6656" opacity="0.35" />

        {/* sweater + neck */}
        <path d="M30 200 C34 168 62 152 100 152 C138 152 166 168 170 200 Z" fill={`url(#${id("sweater")})`} />
        <path d="M60 176 Q100 188 140 176" stroke="#d9cdbb" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M86 132 L86 156 Q100 166 114 156 L114 132 Z" fill="#eebba0" />
        {/* front locks over the shoulders */}
        <path d="M52 100 C44 132 48 162 60 196 L76 196 C66 166 62 134 64 106 Z" fill={`url(#${id("hair")})`} />
        <path d="M148 100 C156 132 152 162 140 196 L124 196 C134 166 138 134 136 106 Z" fill={`url(#${id("hair")})`} />

        {/* ears + pearl earrings */}
        <ellipse cx="55" cy="100" rx="8" ry="11" fill="#f2c2a6" />
        <ellipse cx="145" cy="100" rx="8" ry="11" fill="#f2c2a6" />
        <circle cx="55" cy="114" r="4" fill={`url(#${id("pearl")})`} />
        <circle cx="145" cy="114" r="4" fill={`url(#${id("pearl")})`} />

        {/* face */}
        <ellipse cx="100" cy="96" rx="45" ry="50" fill={`url(#${id("skin")})`} />

        {/* side-swept bangs */}
        <path
          d="M55 88 C54 54 78 38 104 38 C130 38 150 56 146 86 C138 70 124 58 104 54 C96 66 80 76 55 88 Z"
          fill={`url(#${id("hair")})`}
        />
        <ellipse cx="92" cy="48" rx="26" ry="9" fill={`url(#${id("hairShine")})`} opacity="0.7" />

        {/* eyebrows */}
        <path d="M70 80 Q80 75 90 79" stroke="#4a352d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M110 79 Q120 75 130 80" stroke="#4a352d" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* eyes */}
        {[80, 120].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="97" rx="8.5" ry="9.5" fill="#ffffff" />
            <circle cx={cx + eyeShiftX} cy={96 + eyeShiftY} r="7" fill={`url(#${id("iris")})`} />
            <circle cx={cx + eyeShiftX + 2.5} cy={93 + eyeShiftY} r="2.3" fill="#ffffff" />
            <path
              d={cx < 100 ? `M${cx - 11} 93 Q${cx} 84 ${cx + 9} 91` : `M${cx - 9} 91 Q${cx} 84 ${cx + 11} 93`}
              stroke="#2a1d18"
              strokeWidth="3.4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* cheeks, nose, mouth */}
        <ellipse cx="72" cy="116" rx="8" ry="5" fill="#f59a9a" opacity="0.35" />
        <ellipse cx="128" cy="116" rx="8" ry="5" fill="#f59a9a" opacity="0.35" />
        <path d="M98 108 Q100 114 103 112" stroke="#d99779" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {mood === "thinking" ? (
          <path d="M92 127 Q100 124 108 126" stroke="#b5525a" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <>
            <path d="M88 123 Q100 136 112 123 Q100 128 88 123 Z" fill="#b5525a" />
            <path d="M91 124.5 Q100 128.5 109 124.5" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* waving hand */}
        {mood === "wave" && (
          <g className="violet-wave" style={{ transformOrigin: "160px 186px" }}>
            <path d="M150 200 L158 162 L176 164 L172 200 Z" fill={`url(#${id("sweater")})`} />
            <rect x="152" y="118" width="30" height="40" rx="14" fill="#f6c7ab" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={152 + i * 7.5} y={100 + Math.abs(i - 1.5) * 4} width="7" height="26" rx="3.5" fill="#f6c7ab" />
            ))}
            <rect x="143" y="128" width="14" height="7" rx="3.5" fill="#f6c7ab" transform="rotate(-35 150 131)" />
          </g>
        )}

        {/* thinking hand on chin */}
        {mood === "thinking" && (
          <g>
            <path d="M118 200 L124 168 L150 170 L148 200 Z" fill={`url(#${id("sweater")})`} />
            <ellipse cx="128" cy="146" rx="14" ry="11" fill="#f6c7ab" />
            <rect x="118" y="128" width="7" height="20" rx="3.5" fill="#f6c7ab" transform="rotate(-20 121 138)" />
          </g>
        )}
      </g>
    </svg>
  )
}
