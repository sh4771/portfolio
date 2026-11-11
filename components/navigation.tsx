"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Flower2, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { DOCK, MINI_OPEN_EVENT, MINI_UNREAD_EVENT } from "@/lib/dock"
import { VioletAvatar } from "@/components/violet-gpt/avatar"

/**
 * One floating dock at the bottom center on every page: About, Work, Playground,
 * then Mini Violet after a divider. Mini's bubbles and chat open from her slot.
 */
const ITEMS = [
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: (
      <span className="relative block h-6 w-6 overflow-hidden rounded-full ring-1 ring-black/10">
        <Image src="/images/about-photo.png" alt="" fill sizes="48px" className="object-cover" />
      </span>
    ),
  },
  { key: "work", label: "Work", href: "/#work", icon: <LayoutGrid className="h-5 w-5" strokeWidth={2} /> },
  { key: "playground", label: "Playground", href: "/playground", icon: <Flower2 className="h-5 w-5" strokeWidth={2} /> },
]

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover/nav:opacity-100 group-focus-visible/nav:opacity-100">
      {children}
    </span>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [unread, setUnread] = useState(false)

  useEffect(() => {
    const on = (e: Event) => setUnread(Boolean((e as CustomEvent<boolean>).detail))
    window.addEventListener(MINI_UNREAD_EVENT, on)
    return () => window.removeEventListener(MINI_UNREAD_EVENT, on)
  }, [])

  const isActive = (href: string) => (href === "/#work" ? pathname === "/" || pathname.startsWith("/work") : pathname === href)

  return (
    <div data-site-nav>
      <Link href="/" aria-label="Home" className="fixed left-6 top-6 z-50 block transition-opacity duration-300 hover:opacity-70">
        <Image src="/vh_logo.png" alt="VH logo" width={32} height={32} className="h-8 w-8 object-contain" priority />
      </Link>

      <nav
        aria-label="Main"
        className="fixed left-1/2 z-50 flex -translate-x-1/2 items-center rounded-full bg-white/85 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.22)] ring-1 ring-black/5 backdrop-blur-xl dark:bg-neutral-900/85 dark:ring-white/10"
        style={{ bottom: `calc(${DOCK.bottom}px + env(safe-area-inset-bottom, 0px))`, height: DOCK.height, paddingInline: DOCK.pad }}
      >
        {ITEMS.map((it) => {
          const active = isActive(it.href)
          return (
            <Link
              key={it.key}
              href={it.href}
              aria-label={it.label}
              aria-current={active ? "page" : undefined}
              className="group/nav relative flex items-center justify-center text-foreground"
              style={{ width: DOCK.slot, height: DOCK.slot }}
            >
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full transition-colors", active ? "bg-foreground/[0.08]" : "group-hover/nav:bg-foreground/[0.05]")}>{it.icon}</span>
              <Tip>{it.label}</Tip>
            </Link>
          )
        })}

        <span aria-hidden className="mx-2 h-6 w-px bg-foreground/15" />

        <button
          type="button"
          aria-label="Open Mini Violet, a guide to Violet's work"
          onClick={() => window.dispatchEvent(new Event(MINI_OPEN_EVENT))}
          className="group/nav relative flex items-center justify-center"
          style={{ width: DOCK.slot, height: DOCK.slot }}
        >
          <span className="block overflow-hidden rounded-full ring-2 ring-white/80 transition-transform group-hover/nav:scale-110">
            <VioletAvatar mood="idle" size={38} />
          </span>
          {unread && <span aria-hidden className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#b06ad6] ring-2 ring-white motion-safe:animate-pulse" />}
          <Tip>Ask Mini Violet</Tip>
        </button>
      </nav>
    </div>
  )
}
