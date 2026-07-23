"use client"

import { useEffect, useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Section {
  id: string
  label: string
}

export function SectionTracker({
  sections,
  activeClass = "text-foreground opacity-100",
  dotActiveClass = "bg-foreground",
  mutedClass = "text-foreground/60",
  dotMutedClass = "bg-foreground/25",
  jumpButtonClass = "border-border/60 bg-card/80 text-foreground/70 hover:text-foreground hover:border-foreground/30",
}: {
  sections: Section[]
  /** Override for pages with a fixed (non-theme-reactive) background, e.g. text-[#111111] */
  activeClass?: string
  dotActiveClass?: string
  mutedClass?: string
  dotMutedClass?: string
  /** Override for pages with a fixed (non-theme-reactive) background */
  jumpButtonClass?: string
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const jumpToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const jumpToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })

  return (
    <>
      {sections.length >= 2 && (
        <nav
          aria-label="Section navigation"
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
        >
          {sections.map((section) => {
            const isActive = activeId === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center justify-end gap-3"
              >
                <span
                  className={`whitespace-nowrap text-xs transition-opacity ${
                    isActive ? activeClass : `${mutedClass} opacity-0 group-hover:opacity-70`
                  }`}
                >
                  {section.label}
                </span>
                <span
                  className={`block h-1.5 w-1.5 shrink-0 rounded-full transition-all ${
                    isActive ? `scale-125 ${dotActiveClass}` : dotMutedClass
                  }`}
                />
              </a>
            )
          })}
        </nav>
      )}

      {/* Jump to top / bottom — visible on all screen sizes */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <button
          onClick={jumpToTop}
          aria-label="Jump to top"
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${jumpButtonClass}`}
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={jumpToBottom}
          aria-label="Jump to bottom"
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${jumpButtonClass}`}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}
