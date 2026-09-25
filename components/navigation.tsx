"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks: { href: string; label: string; external?: boolean; icon?: LucideIcon }[] = [
  { href: "/about", label: "About" },
  { href: "/Resume_Violet_Hyun.pdf", label: "Resume", external: true },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md shadow-[0_1px_24px_-8px_rgba(0,0,0,0.15)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/50 after:to-transparent">
      <nav className="flex w-full items-center justify-between px-6 py-4">
        {/* Left: logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/vh_logo.png"
              alt="VH logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </Link>

        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                title={link.icon ? link.label : undefined}
              >
                {link.icon ? <link.icon className="h-4 w-4 text-rose-500" aria-hidden="true" /> : null}
                {link.icon ? <span className="sr-only">{link.label}</span> : link.label}
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
        <div className="absolute top-full left-0 right-0 z-50 border-b border-border bg-card/95 p-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.icon ? <link.icon className="h-4 w-4 text-rose-500" aria-hidden="true" /> : null}
                  {link.icon ? <span className="sr-only">{link.label}</span> : link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
