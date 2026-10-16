import { useId } from "react"

export type AvatarMood = "idle" | "wave" | "thinking"

/**
 * Custom Memoji-inspired portrait of Violet, drawn as SVG.
 * Original artwork: no outlines, volume comes from soft gradients. No Apple assets.
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
  const url = (name: string) => `url(#${id(name)})`
  const look = mood === "thinking" ? { x: 2.5, y: -3 } : { x: 0, y: 0 }

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
        <radialGradient id={id("bg")} cx="50%" cy="30%" r="80%">
          <stop offset="0" stopColor="#f4effb" />
          <stop offset="1" stopColor="#d6c8ee" />
        </radialGradient>

        {/* skin: warm center, cooler shaded edge for a rounded 3D head */}
        <radialGradient id={id("skin")} cx="46%" cy="40%" r="62%">
          <stop offset="0" stopColor="#ffe4d3" />
          <stop offset="0.55" stopColor="#f7c9ae" />
          <stop offset="0.85" stopColor="#e8a98a" />
          <stop offset="1" stopColor="#d99277" />
        </radialGradient>
        <radialGradient id={id("skinHand")} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ffe0cc" />
          <stop offset="1" stopColor="#e7a585" />
        </radialGradient>
        <linearGradient id={id("neck")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c98468" />
          <stop offset="0.45" stopColor="#eab093" />
          <stop offset="1" stopColor="#f2c0a4" />
        </linearGradient>
        <radialGradient id={id("cheek")} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f08f8f" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f08f8f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("nose")} cx="50%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff0e6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff0e6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("noseShade")} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c97e64" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c97e64" stopOpacity="0" />
        </radialGradient>

        {/* hair: deep brown with a glossy band */}
        <linearGradient id={id("hair")} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#5b4034" />
          <stop offset="0.5" stopColor="#3a2820" />
          <stop offset="1" stopColor="#24170f" />
        </linearGradient>
        <linearGradient id={id("hairBack")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e1f18" />
          <stop offset="1" stopColor="#1c120c" />
        </linearGradient>
        <radialGradient id={id("hairGloss")} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#a07a63" stopOpacity="0.75" />
          <stop offset="1" stopColor="#a07a63" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={id("iris")} cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#8a5c3c" />
          <stop offset="0.7" stopColor="#4a2d1c" />
          <stop offset="1" stopColor="#2a180e" />
        </radialGradient>
        <radialGradient id={id("eyeWhite")} cx="50%" cy="60%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9e4e4" />
        </radialGradient>
        <linearGradient id={id("lip")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9737b" />
          <stop offset="1" stopColor="#b8525d" />
        </linearGradient>
        <linearGradient id={id("sweater")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf3" />
          <stop offset="1" stopColor="#e3d7c6" />
        </linearGradient>
        <radialGradient id={id("pearl")} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d7cfc7" />
        </radialGradient>
        <clipPath id={id("clip")}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id("clip")})`}>
        {background && <rect width="200" height="200" fill={url("bg")} />}

        {/* long hair, back layer falling past the shoulders */}
        <path
          d="M40 96 C36 46 66 22 102 22 C140 22 168 48 162 98 C160 132 170 168 160 204 L40 204 C30 168 42 132 40 96 Z"
          fill={url("hairBack")}
        />

        {/* sweater + neck */}
        <path d="M24 204 C28 170 58 154 100 154 C142 154 172 170 176 204 Z" fill={url("sweater")} />
        <path d="M84 128 L84 156 Q100 170 116 156 L116 128 Z" fill={url("neck")} />

        {/* ears + pearls */}
        <ellipse cx="56" cy="104" rx="8" ry="11" fill={url("skinHand")} />
        <ellipse cx="144" cy="104" rx="8" ry="11" fill={url("skinHand")} />
        <circle cx="56" cy="118" r="4" fill={url("pearl")} />
        <circle cx="144" cy="118" r="4" fill={url("pearl")} />

        {/* head: wide forehead, soft rounded jaw */}
        <path
          d="M56 92 C56 58 76 40 100 40 C124 40 144 58 144 92 C144 124 126 146 100 146 C74 146 56 124 56 92 Z"
          fill={url("skin")}
        />

        {/* cheeks */}
        <ellipse cx="72" cy="114" rx="12" ry="8" fill={url("cheek")} />
        <ellipse cx="128" cy="114" rx="12" ry="8" fill={url("cheek")} />

        {/* brows: soft filled shapes, not lines */}
        <path d="M67 78 Q80 69 93 75 Q80 73 68 80 Z" fill="#4a3226" />
        <path d="M107 75 Q120 69 133 78 L132 80 Q120 73 107 75 Z" fill="#4a3226" />

        {/* eyes */}
        {[80, 120].map((cx) => {
          const left = cx < 100
          return (
            <g key={cx}>
              <ellipse cx={cx} cy="98" rx="11.5" ry="12" fill={url("eyeWhite")} />
              <circle cx={cx + look.x} cy={99 + look.y} r="8.6" fill={url("iris")} />
              <circle cx={cx + look.x} cy={99 + look.y} r="4.2" fill="#140a05" />
              <circle cx={cx + look.x + 3} cy={95.4 + look.y} r="2.8" fill="#ffffff" />
              <circle cx={cx + look.x - 2.8} cy={102.6 + look.y} r="1.2" fill="#ffffff" opacity="0.8" />
              {/* upper lash line: a soft filled crescent with a tiny flick */}
              <path
                d={
                  left
                    ? `M${cx - 12.5} 97 Q${cx - 1} 81 ${cx + 12} 94 Q${cx} 86.5 ${cx - 12.5} 97 Z M${cx - 12} 95 Q${cx - 15} 92 ${cx - 16} 89 Q${cx - 12} 91 ${cx - 10} 93 Z`
                    : `M${cx + 12.5} 97 Q${cx + 1} 81 ${cx - 12} 94 Q${cx} 86.5 ${cx + 12.5} 97 Z M${cx + 12} 95 Q${cx + 15} 92 ${cx + 16} 89 Q${cx + 12} 91 ${cx + 10} 93 Z`
                }
                fill="#1e120b"
              />
              {/* lid shadow */}
              <path
                d={`M${cx - 11} 87 Q${cx} 78 ${cx + 11} 87`}
                stroke="#c88a70"
                strokeOpacity="0.45"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )
        })}

        {/* nose: shading and a highlight instead of a line */}
        <ellipse cx="100" cy="114" rx="7" ry="4" fill={url("noseShade")} />
        <ellipse cx="100" cy="106" rx="3.2" ry="7" fill={url("nose")} />
        <ellipse cx="96.6" cy="114.5" rx="1.5" ry="1" fill="#b46c55" opacity="0.6" />
        <ellipse cx="103.4" cy="114.5" rx="1.5" ry="1" fill="#b46c55" opacity="0.6" />

        {/* mouth */}
        {mood === "thinking" ? (
          <path d="M92 128 Q100 125.5 108 127.5 Q100 130 92 128 Z" fill={url("lip")} />
        ) : (
          <g>
            <path d="M87 124 Q100 141 113 124 Q100 127.5 87 124 Z" fill="#6e2a33" />
            <path d="M89.5 124.8 Q100 128.2 110.5 124.8 L109.4 127.6 Q100 130.4 90.6 127.6 Z" fill="#ffffff" />
            <path d="M94 135 Q100 137.6 106 135 Q100 139.4 94 135 Z" fill="#d97a82" opacity="0.8" />
          </g>
        )}

        {/* front hair: side part, soft volume over the forehead, falling straight down */}
        <path
          d="M52 104 C46 64 66 34 98 32 C132 30 156 54 150 100 C146 82 140 68 128 58 C118 66 104 60 92 52 C80 64 66 78 60 104 C58 140 62 172 72 204 L50 204 C42 172 48 134 52 104 Z"
          fill={url("hair")}
        />
        <path
          d="M150 100 C152 136 148 172 134 204 L154 204 C162 170 160 132 150 100 Z"
          fill={url("hair")}
        />
        {/* gloss bands */}
        <ellipse cx="86" cy="46" rx="22" ry="9" fill={url("hairGloss")} transform="rotate(-18 86 46)" />
        <ellipse cx="124" cy="46" rx="16" ry="6" fill={url("hairGloss")} opacity="0.6" transform="rotate(22 124 46)" />
        <ellipse cx="57" cy="132" rx="5" ry="22" fill={url("hairGloss")} opacity="0.7" />
        <ellipse cx="152" cy="134" rx="4" ry="20" fill={url("hairGloss")} opacity="0.6" />

        {/* waving hand */}
        {mood === "wave" && (
          <g className="violet-wave" style={{ transformOrigin: "164px 190px" }}>
            <path d="M150 204 L156 166 L178 168 L176 204 Z" fill={url("sweater")} />
            <rect x="152" y="120" width="32" height="40" rx="15" fill={url("skinHand")} />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={152.5 + i * 7.8} y={102 + Math.abs(i - 1.5) * 4} width="7.2" height="28" rx="3.6" fill={url("skinHand")} />
            ))}
            <rect x="142" y="130" width="15" height="7.5" rx="3.75" fill={url("skinHand")} transform="rotate(-35 150 133)" />
          </g>
        )}

        {/* thinking: hand to chin */}
        {mood === "thinking" && (
          <g>
            <path d="M116 204 L122 170 L150 172 L148 204 Z" fill={url("sweater")} />
            <ellipse cx="127" cy="147" rx="15" ry="11.5" fill={url("skinHand")} />
            <rect x="116" y="128" width="7.5" height="22" rx="3.75" fill={url("skinHand")} transform="rotate(-18 120 139)" />
          </g>
        )}
      </g>
    </svg>
  )
}
