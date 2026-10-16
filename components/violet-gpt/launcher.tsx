"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { VioletAvatar } from "./avatar"

// The chat engine and knowledge base load only after the first click.
const VioletChat = dynamic(() => import("./chat"), { ssr: false })

const HINT_KEY = "violet-gpt-hint-seen"

export function VioletGPTLauncher() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [hint, setHint] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // One gentle greeting per visit, after a short delay. Never loops.
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(HINT_KEY) === "1"
    } catch {}
    if (seen) return
    const show = setTimeout(() => setHint(true), 3500)
    const hide = setTimeout(() => setHint(false), 11000)
    try {
      sessionStorage.setItem(HINT_KEY, "1")
    } catch {}
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => buttonRef.current?.focus())
  }, [])

  return (
    <div data-violet-gpt>
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 flex items-end gap-2 sm:bottom-6 sm:right-6">
          {hint && (
            <button
              type="button"
              onClick={() => {
                setHint(false)
                setLoaded(true)
                setOpen(true)
              }}
              className="mb-3 hidden max-w-[220px] rounded-2xl rounded-br-md border border-border bg-background px-4 py-2.5 text-left text-sm text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.12)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2 sm:block"
            >
              Hiring a product designer? Ask me about Violet.
            </button>
          )}
          <button
            ref={buttonRef}
            type="button"
            aria-label="Open Mini Violet, a guide to Violet's work"
            aria-expanded={open}
            aria-controls="violet-gpt-panel"
            onClick={() => {
              setHint(false)
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
