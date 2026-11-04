"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, Link2, Maximize2, X } from "lucide-react"

export type PanelAction = { label: string; href: string; external?: boolean; primary?: boolean }

export type PanelProject = {
  slug: string
  title: string
  readMins?: number
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
export function ProjectPanel({
  project,
  open,
  onClose,
  preview,
  note,
  extra,
}: {
  project: PanelProject
  open: boolean
  onClose: () => void
  preview?: (open: boolean) => React.ReactNode
  /** A short line under the description, e.g. "Password protected". */
  note?: React.ReactNode
  /** Extra content after the preview, e.g. a list of sub-projects. */
  extra?: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
      prevFocus?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(project.openExternal ? project.openHref : `${window.location.origin}/#p-${project.slug}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }
  const ext = (external?: boolean) => (external ? { target: "_blank", rel: "noreferrer" } : {})

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-neutral-900/35 backdrop-blur-sm sm:items-center sm:p-6 motion-safe:animate-[sniffr-fade_.2s_ease-out]"
          onClick={() => onClose()}
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
              <button ref={closeRef} type="button" onClick={() => onClose()} aria-label="Close" className="rounded-full p-1.5 text-neutral-400 transition-colors hover:text-neutral-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8 px-6 pb-8 pt-4 sm:px-14 sm:pb-14 sm:pt-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-[520px] space-y-3">
                  <h2 id={`fun-${project.slug}-title`} className="text-2xl font-normal tracking-tight sm:text-3xl">
                    {project.title} <span className="text-neutral-400">• {project.year}</span>
                  </h2>
                  {project.readMins ? <p className="text-sm text-neutral-400">{project.readMins} min read</p> : null}
                  <p className="text-[15px] leading-relaxed text-neutral-600">{project.description}</p>
                  {note ? <div className="text-sm text-neutral-500">{note}</div> : null}
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

              {preview ? <div className="relative overflow-hidden rounded-3xl border border-neutral-200">{preview(open)}</div> : null}
              {extra}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function useDeepLinkedPanel(slug: string) {
  const [open, setOpen] = useState(false)
  // violethyun.com/#p-<slug> opens the panel directly (older #fun-<slug> links too).
  useEffect(() => {
    const h = window.location.hash
    if (h === `#p-${slug}` || h === `#fun-${slug}`) setOpen(true)
  }, [slug])
  const onClose = useCallback(() => setOpen(false), [])
  return { open, setOpen, onClose }
}

export function FunProjectCard({
  project,
  cover,
  preview,
}: {
  project: PanelProject
  cover: React.ReactNode
  preview: (open: boolean) => React.ReactNode
}) {
  const { open, setOpen, onClose } = useDeepLinkedPanel(project.slug)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full text-left" aria-haspopup="dialog">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 bg-muted/30">{cover}</div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
            {project.title}
            {project.readMins ? <span className="mt-1 block text-xs font-normal text-foreground/45">{project.readMins} min read</span> : null}
          </h3>
          <span className="shrink-0 text-right text-[10px] uppercase tracking-[0.08em] text-foreground/45">{project.category}</span>
        </div>
      </button>
      <ProjectPanel project={project} open={open} onClose={onClose} preview={preview} />
    </>
  )
}

/**
 * The whole case study, inside the panel. It loads the project's page with the
 * site menu and footer hidden, so scrolling the panel is reading the case study.
 * A password-protected page shows its password screen right here.
 */
export function CaseStudyPanel({ title, href, open, onClose, readMins }: { title: string; href: string; open: boolean; onClose: () => void; readMins?: number }) {
  const [loaded, setLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    setLoaded(false)
    const prevFocus = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
      prevFocus?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-neutral-900/40 backdrop-blur-sm sm:items-center sm:p-6 motion-safe:animate-[sniffr-fade_.2s_ease-out]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[94vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-t-[28px] bg-background text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:h-[92vh] sm:rounded-[28px] motion-safe:animate-[sniffr-rise_.28s_cubic-bezier(.2,.8,.3,1)]"
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-border/50 px-4 py-3 sm:px-6">
          <a href={href} aria-label="Open as a full page" className="rounded-full p-1.5 text-foreground/45 transition-colors hover:text-foreground">
            <Maximize2 className="h-5 w-5" />
          </a>
          <p className="min-w-0 flex-1 truncate text-center text-sm font-medium text-foreground/70">
            {title}
            {readMins ? <span className="font-normal text-foreground/45"> · {readMins} min read</span> : null}
          </p>
          <button type="button" onClick={copy} aria-label="Copy link" className="rounded-full p-1.5 text-foreground/45 transition-colors hover:text-foreground">
            {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Link2 className="h-5 w-5" />}
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-foreground/45 transition-colors hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative min-h-0 flex-1">
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center" aria-hidden>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/15 border-t-foreground/60" />
            </div>
          )}
          <iframe
            src={href}
            title={title}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
    </div>
  )
}
