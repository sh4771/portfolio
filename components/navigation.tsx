"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FileText, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * At the top of a page the menu sits as a vertical list on the left, icon + label.
 * Once you scroll, each item flies down into a floating pill dock at the bottom center,
 * and flies back when you return to the top. Phones always get the dock.
 */
type Item = { key: string; label: string; href: string; external?: boolean; icon: React.ReactNode }

const ITEMS: Item[] = [
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: (
      <span className="relative block h-[22px] w-[22px] overflow-hidden rounded-full ring-1 ring-black/10">
        <Image src="/images/about-photo.png" alt="" fill sizes="44px" className="object-cover" />
      </span>
    ),
  },
  { key: "work", label: "Work", href: "/#work", icon: <LayoutGrid className="h-[19px] w-[19px]" strokeWidth={2} /> },
  { key: "resume", label: "Resume", href: "/Resume_Violet_Hyun.pdf", external: true, icon: <FileText className="h-[19px] w-[19px]" strokeWidth={2} /> },
]

const SIDE_X = 28
const SIDE_Y = 96
const SIDE_GAP = 44
const SLOT = 48
const PAD = 8
const DOCK_H = 52
const DOCK_BOTTOM = 24

export function Navigation() {
  const pathname = usePathname()
  const [docked, setDocked] = useState(false)
  const [vw, setVw] = useState(0)
  const [vh, setVh] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }
    const onScroll = () => setDocked(window.scrollY > 120)
    measure()
    onScroll()
    // let the first paint land before animating anything
    requestAnimationFrame(() => setReady(true))
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // the sidebar needs a clear left margin; narrower screens always get the dock
  const mobile = vw > 0 && vw < 1360
  const asDock = docked || mobile
  const dockW = ITEMS.length * SLOT + PAD * 2
  const dockLeft = vw / 2 - dockW / 2
  const dockTop = vh - DOCK_BOTTOM - DOCK_H

  return (
    <div data-site-nav className={cn(!vw && "invisible")}>
      {/* Logo */}
      <Link href="/" aria-label="Home" className="fixed left-6 top-6 z-50 block transition-opacity duration-300 hover:opacity-70">
        <Image src="/vh_logo.png" alt="VH logo" width={32} height={32} className="h-8 w-8 object-contain" priority />
      </Link>

      {/* Dock background */}
      <div
        aria-hidden
        className="fixed z-40 rounded-full bg-white/85 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.22)] ring-1 ring-black/5 backdrop-blur-xl dark:bg-neutral-900/85 dark:ring-white/10"
        style={{
          left: dockLeft,
          top: dockTop,
          width: dockW,
          height: DOCK_H,
          opacity: asDock ? 1 : 0,
          transform: asDock ? "scale(1)" : "scale(.85)",
          transition: ready ? `opacity .35s ease ${asDock ? ".25s" : "0s"}, transform .45s cubic-bezier(.2,.9,.3,1.2) ${asDock ? ".2s" : "0s"}` : "none",
        }}
      />

      {/* Items: each one moves between its sidebar spot and its dock slot */}
      <nav aria-label="Main">
        <ul>
          {ITEMS.map((it, i) => {
            const x = asDock ? dockLeft + PAD + i * SLOT : SIDE_X
            const y = asDock ? dockTop + (DOCK_H - 40) / 2 : SIDE_Y + i * SIDE_GAP
            const active = it.href === pathname
            return (
              <li
                key={it.key}
                className="fixed left-0 top-0 z-50"
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                  transition: ready ? `transform ${0.62 + i * 0.08}s cubic-bezier(.65,0,.25,1) ${i * 0.05}s` : "none",
                }}
              >
                <Link
                  href={it.href}
                  target={it.external ? "_blank" : undefined}
                  rel={it.external ? "noreferrer" : undefined}
                  aria-label={it.label}
                  className={cn(
                    "group/nav relative flex h-10 items-center rounded-full text-foreground transition-colors",
                    asDock ? "w-10 justify-center hover:bg-foreground/[0.06]" : "gap-3 pr-3",
                  )}
                >
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center", !asDock && "w-6")}>{it.icon}</span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-[15px] font-medium transition-[opacity,transform] duration-200",
                      asDock ? "pointer-events-none absolute opacity-0 -translate-x-1" : "opacity-100",
                      active ? "text-foreground" : "text-foreground/75 group-hover/nav:text-foreground",
                    )}
                  >
                    {it.label}
                  </span>
                  {/* tooltip in the dock */}
                  {asDock && (
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover/nav:opacity-100">
                      {it.label}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
