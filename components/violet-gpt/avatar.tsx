import { cn } from "@/lib/utils"

export type AvatarMood = "idle" | "wave" | "thinking"

/** Mini Violet's 3D head, on a soft lavender disc. The full figure lives at /images/mini-violet/figure.webp. */
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
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full",
        background && "bg-[radial-gradient(circle_at_35%_30%,#f6efff,#e2d3f3_70%)]",
        mood === "thinking" && "motion-safe:animate-[mv-think_1.6s_ease-in-out_infinite]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/mini-violet/head.webp" alt="" width={size} height={size} className="h-full w-full object-cover" draggable={false} />
    </span>
  )
}
