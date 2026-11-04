"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * A muted, looping video with no controls of any kind. It always plays from
 * `start` seconds: on load, and again each time it loops. Clicks pass through,
 * and the browser's own controls, picture-in-picture, download and remote
 * playback are turned off.
 */
export function LockedVideo({ src, start = 0, className }: { src: string; start?: number; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const seek = () => {
      if (start && v.currentTime < start) v.currentTime = start
      v.play().catch(() => {})
    }
    const loop = () => {
      v.currentTime = start
      v.play().catch(() => {})
    }
    // Some browsers pause muted videos on tab switch; resume when visible again.
    const resume = () => document.visibilityState === "visible" && v.play().catch(() => {})
    if (v.readyState >= 1) seek()
    v.addEventListener("loadedmetadata", seek)
    v.addEventListener("ended", loop)
    document.addEventListener("visibilitychange", resume)
    return () => {
      v.removeEventListener("loadedmetadata", seek)
      v.removeEventListener("ended", loop)
      document.removeEventListener("visibilitychange", resume)
    }
  }, [start])

  return (
    <video
      ref={ref}
      src={start ? `${src}#t=${start}` : src}
      autoPlay
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      onContextMenu={(e) => e.preventDefault()}
      tabIndex={-1}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full select-none object-cover", className)}
    />
  )
}
