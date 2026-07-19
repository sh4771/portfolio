"use client"

import { useEffect, useState } from "react"

interface Section {
  id: string
  label: string
}

export function SectionTracker({ sections }: { sections: Section[] }) {
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

  if (sections.length < 2) return null

  return (
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
                isActive
                  ? "text-foreground opacity-100"
                  : "text-foreground/60 opacity-0 group-hover:opacity-70"
              }`}
            >
              {section.label}
            </span>
            <span
              className={`block h-1.5 w-1.5 shrink-0 rounded-full transition-all ${
                isActive ? "scale-125 bg-foreground" : "bg-foreground/25"
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
