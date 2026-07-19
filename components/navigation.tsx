"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Mail, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/fun", label: "For Fun" },
  { href: "/resume", label: "Resume" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md shadow-[0_1px_24px_-8px_rgba(0,0,0,0.15)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/50 after:to-transparent">
      <nav className="flex w-full items-center justify-between px-6 py-4">
        {/* Left: logo, name, contact icons */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/vh_logo.png"
              alt="VH logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="mailto:violethyun@nyu.edu"
              aria-label="Email"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-foreground/60 transition-colors hover:text-foreground hover:border-foreground/30"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/violet-hyun/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-foreground/60 transition-colors hover:text-foreground hover:border-foreground/30"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
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
        <div className="absolute top-full left-0 right-0 z-50 border-b border-border bg-card/95 p-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
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
