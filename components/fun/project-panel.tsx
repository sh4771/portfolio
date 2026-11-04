"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, Link2, Maximize2, X } from "lucide-react"

export type PanelAction = { label: string; href: string; external?: boolean; primary?: boolean }

export type PanelProject = {
  slug: string
  title: string
  year: string
  category: string
  description: string
  actions?: PanelAction[]
  /** Opened by the expand icon and the preview: the live prototype or the case study. */
  openHref: string
  openExternal?: boolean
  stack?: { label: string; items: string[] }[]
}

/**
 * A For Fun project: a cover tile that opens a panel with the project's details and
 * an autoplaying preview. Every project in the section uses this, so they behave alike.
 */
export function FunProjectCard({
  project,
  cover,
  preview,
}: {
  project: PanelProject
  cover: React.ReactNode
  preview: (open: boolean) => React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Deep link: violethyun.com/#fun-<slug> opens the panel directly.
  useEffect(() => {
    if (window.location.hash === `#fun-${project.slug}`) setOpen(true)
  }, [project.slug])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const trigger = triggerRef.current
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
      trigger?.focus({ preventScroll: true })
    }
  }, [open])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(project.openExternal ? project.openHref : `${window.location.origin}/#fun-${project.slug}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }
  const ext = (external?: boolean) => (external ? { target: "_blank", rel: "noreferrer" } : {})

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="group block w-full text-left" aria-haspopup="dialog">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 bg-muted/30">{cover}</div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
            {project.title}
          </h3>
          <span className="shrink-0 text-right text-[10px] uppercase tracking-[0.08em] text-foreground/45">{project.category}</span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-neutral-900/35 backdrop-blur-sm sm:items-center sm:p-6 motion-safe:animate-[sniffr-fade_.2s_ease-out]"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`fun-${project.slug}-title`}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-[880px] overflow-y-auto rounded-t-[28px] bg-white text-neutral-900 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:rounded-[28px] motion-safe:animate-[sniffr-rise_.28s_cubic-bezier(.2,.8,.3,1)]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/85 px-5 py-4 backdrop-blur sm:px-7">
              <a href={project.openHref} {...ext(project.openExternal)} aria-label={project.openExternal ? "Open in a new tab" : "Open the full case study"} className="rounded-full p-1.5 text-neutral-400 transition-colors hover:text-neutral-900">
                <Maximize2 className="h-5 w-5" />
              </a>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-neutral-400 transition-colors hover:text-neutral-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8 px-6 pb-8 pt-4 sm:px-14 sm:pb-14 sm:pt-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-[520px] space-y-3">
                  <h2 id={`fun-${project.slug}-title`} className="text-2xl font-normal tracking-tight sm:text-3xl">
                    {project.title} <span className="text-neutral-400">• {project.year}</span>
                  </h2>
                  <p className="text-[15px] leading-relaxed text-neutral-600">{project.description}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button type="button" onClick={copy} aria-label="Copy link" className="grid h-10 w-10 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
                    {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Link2 className="h-5 w-5" />}
                  </button>
                  {(project.actions ?? []).map((a) => (
                    <a
                      key={a.label}
                      href={a.href}
                      {...ext(a.external)}
                      className={
                        a.primary
                          ? "inline-flex items-center gap-1.5 rounded-full bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
                          : "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-400"
                      }
                    >
                      {a.label} {a.external ? <ArrowUpRight className="h-4 w-4" /> : null}
                    </a>
                  ))}
                </div>
              </div>

              {project.stack && project.stack.length > 0 && (
              <dl className="grid grid-cols-2 gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
                {project.stack.map((s) => (
                  <div key={s.label} className="space-y-2">
                    <dt className="text-sm text-neutral-400">{s.label}</dt>
                    {s.items.map((i) => (
                      <dd key={i} className="text-[15px]">{i}</dd>
                    ))}
                  </div>
                ))}
              </dl>
              )}

              <div className="relative overflow-hidden rounded-3xl border border-neutral-200">{preview(open)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
