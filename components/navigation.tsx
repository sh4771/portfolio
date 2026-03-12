"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "FEATURED" },
  { href: "/about", label: "ABOUT" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-6">
      {/* Floating pill nav */}
      <nav className="flex w-full max-w-[640px] items-center justify-between rounded-full border border-border/60 bg-card/80 px-5 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-colors hover:text-foreground hover:border-foreground/30"
        >
          <Image
            src="/vh_logo.png"
            alt="VH logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-[11px] font-medium tracking-[0.15em] transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col items-center justify-center gap-1 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              "block h-px w-4 bg-foreground transition-all duration-300",
              mobileOpen && "translate-y-[3px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-4 bg-foreground transition-all duration-300",
              mobileOpen && "-translate-y-[2px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 left-6 right-6 z-50 rounded-2xl border border-border bg-card/95 p-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-[11px] font-medium tracking-[0.15em] transition-colors hover:text-foreground",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
