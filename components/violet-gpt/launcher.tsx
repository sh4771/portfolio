"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { HOME_HINT, PAGE_HINTS } from "@/lib/violet-gpt/hints"
import { DOCK, MINI_OPEN_EVENT, MINI_UNREAD_EVENT, miniOffsetFromCenter } from "@/lib/dock"

// The chat engine and knowledge base load only after the first click.
const VioletChat = dynamic(() => import("./chat"), { ssr: false })

const HINT_KEY = "violet-gpt-hint-seen:"

export function VioletGPTLauncher() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [hint, setHint] = useState<string | null>(null)
  const pathname = usePathname()

  // Mini Violet lives in the dock now; the dock asks to open her and shows an unread dot.
  const setUnread = (v: boolean) => window.dispatchEvent(new CustomEvent(MINI_UNREAD_EVENT, { detail: v }))
  const openChat = useCallback(() => {
    setHint(null)
    setLoaded(true)
    setOpen(true)
    setUnread(false)
  }, [])
  useEffect(() => {
    window.addEventListener(MINI_OPEN_EVENT, openChat)
    return () => window.removeEventListener(MINI_OPEN_EVENT, openChat)
  }, [openChat])

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
      setUnread(true)
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
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('[aria-label^="Open Mini Violet"]')?.focus())
  }, [])

  return (
    <div data-violet-gpt>
      {/* The bubble rises out of Mini's slot in the dock, with its tail pointing at her. */}
      {!open && hint && (
        <div
          role="status"
          className="fixed z-50 w-[min(280px,calc(100vw-32px))] -translate-x-full motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
          style={{
            left: `calc(50% + ${miniOffsetFromCenter() + 26}px)`,
            bottom: `calc(${DOCK.bottom + DOCK.height + 12}px + env(safe-area-inset-bottom, 0px))`,
          }}
        >
          <div className="relative rounded-2xl rounded-br-md border border-border bg-background shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
            <button type="button" onClick={openChat} className="block w-full py-2.5 pl-4 pr-8 text-left text-[13px] leading-snug text-foreground sm:text-sm">
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
            <span aria-hidden className="absolute -bottom-[7px] right-[18px] h-3 w-3 rotate-45 border-b border-r border-border bg-background" />
          </div>
        </div>
      )}
      {loaded && <VioletChat open={open} onClose={close} />}
    </div>
  )
}
