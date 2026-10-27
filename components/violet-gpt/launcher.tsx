"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { HOME_HINT, PAGE_HINTS } from "@/lib/violet-gpt/hints"
import { VioletAvatar } from "./avatar"

// The chat engine and knowledge base load only after the first click.
const VioletChat = dynamic(() => import("./chat"), { ssr: false })

const HINT_KEY = "violet-gpt-hint-seen:"

export function VioletGPTLauncher() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [hint, setHint] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // One bubble per page per visit: a greeting on the homepage, a "why this project matters" line on each project.
  useEffect(() => {
    setHint(null)
    const path = (pathname || "/").replace(/\/$/, "") || "/"
    const text = path === "/" ? HOME_HINT : PAGE_HINTS[path]
    if (!text) return
    let seen = false
    try {
      seen = sessionStorage.getItem(HINT_KEY + path) === "1"
    } catch {}
    if (seen) return
    const show = setTimeout(() => {
      setHint(text)
      try {
        sessionStorage.setItem(HINT_KEY + path, "1")
      } catch {}
    }, path === "/" ? 3500 : 1200)
    const hide = setTimeout(() => setHint(null), path === "/" ? 11000 : 12000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [pathname])

  const close = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => buttonRef.current?.focus())
  }, [])

  return (
    <div data-violet-gpt>
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:flex-row">
          {hint && (
            <div
              role="status"
              className="relative max-w-[250px] sm:mb-3 sm:max-w-[280px] rounded-2xl rounded-br-md border border-border bg-background shadow-[0_12px_32px_rgba(0,0,0,0.12)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2"
            >
              <button
                type="button"
                onClick={() => {
                  setHint(null)
                  setLoaded(true)
                  setOpen(true)
                }}
                className="block w-full py-2.5 pl-4 pr-8 text-left text-[13px] leading-snug text-foreground sm:text-sm"
              >
                {hint}
              </button>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setHint(null)}
                className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <button
            ref={buttonRef}
            type="button"
            aria-label="Open Mini Violet, a guide to Violet's work"
            aria-expanded={open}
            aria-controls="violet-gpt-panel"
            onClick={() => {
              setHint(null)
              setLoaded(true)
              setOpen(true)
            }}
            onPointerEnter={() => setLoaded(true)}
            className="group relative grid h-14 w-14 place-items-center rounded-full border-[3px] border-background bg-background shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:h-16 sm:w-16"
          >
            <span className="block overflow-hidden rounded-full">
              <VioletAvatar mood="idle" size={64} className="h-[50px] w-[50px] sm:h-[58px] sm:w-[58px]" />
            </span>
            <span className="absolute -left-1 -top-1 rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-background">
              Mini
            </span>
          </button>
        </div>
      )}
      {loaded && <VioletChat open={open} onClose={close} />}
    </div>
  )
}
