"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowDown } from "lucide-react"

/** Section id that holds each project's results. Vendelux tags its active project's results box with id="results". */
const RESULTS: Record<string, string> = {
  "/work/vendelux": "results",
  "/work/passiton": "solutions",
  "/work/games4peace": "screens",
  "/work/greener-routes": "routes",
  "/work/clinical-trials": "final",
  "/work/cast": "problem",
  "/work/schedulink": "screens",
}

/** A small "Jump to results" pill on every project page. Hides once the results are on screen. */
export function JumpToResults() {
  const pathname = (usePathname() || "/").replace(/\/$/, "")
  const searchParams = useSearchParams()
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTarget(null)
    setVisible(false)
    if (!pathname.startsWith("/work/")) return
    const id = RESULTS[pathname] ?? "outcome"
    // The page may still be rendering client sections, so look for the target briefly.
    let tries = 0
    const find = () => {
      const el = document.getElementById(id)
      if (el) setTarget(el)
      else if (tries++ < 20) timer = window.setTimeout(find, 150)
    }
    let timer = window.setTimeout(find, 100)
    return () => window.clearTimeout(timer)
  }, [pathname, searchParams])

  useEffect(() => {
    if (!target) return
    const update = () => setVisible(target.getBoundingClientRect().top > window.innerHeight * 0.7)
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [target])

  if (!target || !visible) return null

  return (
    <button
      type="button"
      data-jump-results
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
        target.focus({ preventScroll: true })
      }}
      className="fixed bottom-5 left-5 z-40 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-background/90 px-4 text-sm font-medium text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur transition-colors hover:border-foreground/40 sm:bottom-6 sm:left-6 motion-safe:animate-in motion-safe:fade-in"
    >
      Jump to results
      <ArrowDown className="h-4 w-4" />
    </button>
  )
}
