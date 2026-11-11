"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Lock, Maximize2, Minimize2, RotateCcw, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT_LINKS, PROJECTS, PROMPTS, type Project } from "@/lib/violet-gpt/knowledge"
import { MAX_INPUT, reply, replyForPrompt, resolveIntent, type Reply } from "@/lib/violet-gpt/engine"
import { VioletAvatar } from "./avatar"

interface Message {
  id: number
  role: "user" | "assistant"
  text: string[]
  projects?: Project[]
  next?: string[]
  showContact?: boolean
  source?: "ai" | "local"
}

let nextId = 1
const AI_TIMEOUT_MS = 17000

/** Ask the server (Gemini). Returns null on any failure so the caller can fall back. */
async function askAI(message: string): Promise<Reply | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS)
  try {
    const res = await fetch("/api/violet-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.ok || typeof data.answer !== "string") return null
    const projects = (data.projectIds as string[])
      .map((id) => PROJECTS.find((p) => p.id === id))
      .filter(Boolean) as Project[]
    return { intent: "unknown", body: [data.answer], projects, next: data.next ?? [] }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
const toMessage = (r: Reply): Message => ({
  id: nextId++,
  role: "assistant",
  text: r.body,
  projects: r.projects,
  next: r.next,
  showContact: r.showContact,
  source: "local",
})

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group block rounded-xl border border-border/70 bg-background p-3 transition-colors hover:border-foreground/40"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">{project.title}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      <span className="mt-0.5 block text-xs text-muted-foreground">{project.summary}</span>
      {project.evidence && (
        <span className="mt-2 block text-xs leading-relaxed text-foreground/80">{project.evidence}</span>
      )}
      {project.note && (
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3" />
          {project.note}
        </span>
      )}
    </Link>
  )
}

export default function VioletChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(() => [toMessage(reply("welcome"))])
  const [input, setInput] = useState("")
  const [announce, setAnnounce] = useState("")
  const [pending, setPending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // Wide screens get the compact bar that replaces the dock; phones keep the bottom sheet.
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches)
  // `shown` trails `open` by a frame so the bar can animate in instead of popping.
  const [shown, setShown] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const compact = wide && !expanded

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)")
    const update = () => setWide(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  // While Mini is open as a bar, the dock steps aside for her.
  useEffect(() => {
    if (!open) return setShown(false)
    let b = 0
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(() => setShown(true))))
    return () => {
      cancelAnimationFrame(a)
      cancelAnimationFrame(b)
    }
  }, [open])


  useEffect(() => {
    if (!open) {
      setExpanded(false)
      return
    }
    if (!compact) headingRef.current?.focus()
  }, [open, compact])

  useEffect(() => {
    if (shown && compact) inputRef.current?.focus({ preventScroll: true })
  }, [shown, compact])

  useEffect(() => {
    for (const el of [scrollRef.current, stackRef.current]) if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    const last = messages[messages.length - 1]
    if (last?.role === "assistant" && messages.length > 1) setAnnounce(last.text.join(" "))
  }, [messages])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const push = (userText: string, r: Reply) =>
    setMessages((m) => [...m, { id: nextId++, role: "user", text: [userText] }, toMessage(r)])

  const choose = (promptId: string) => {
    const p = PROMPTS[promptId]
    if (p) push(p.label, replyForPrompt(promptId))
  }

  const send = async () => {
    const text = input.trim().slice(0, MAX_INPUT)
    if (!text || pending) return
    setInput("")
    const { intent, skill } = resolveIntent(text)
    const local = reply(intent, skill)

    // Private topics never leave the browser.
    if (intent === "private") {
      push(text, local)
      return
    }

    setMessages((m) => [...m, { id: nextId++, role: "user", text: [text] }])
    setPending(true)
    const ai = await askAI(text)
    setPending(false)
    setMessages((m) => [
      ...m,
      ai
        ? { ...toMessage({ ...ai, next: ai.next.length ? ai.next : local.next }), source: "ai" }
        : toMessage(local),
    ])
  }

  const reset = () => {
    setMessages([toMessage(reply("welcome"))])
    setAnnounce("")
    setPending(false)
    headingRef.current?.focus()
  }

  const lastIndex = messages.length - 1

  /** The conversation. In the bar, each message floats as its own card above the bar. */
  const thread = (floating: boolean) => (
    <>
        {messages.map((m, i) => (
        <div key={m.id} className={cn("flex gap-2 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300", m.role === "user" && "justify-end")}>
          {m.role === "assistant" && (
            <span className="mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <VioletAvatar mood={i === 0 ? "wave" : "idle"} size={32} />
            </span>
          )}
          <div className={cn("max-w-[85%] space-y-2", m.role === "user" && "max-w-[80%]")}>
            <div
              className={cn(
                "space-y-2 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "assistant"
                  ? cn("rounded-tl-md text-foreground", floating ? "bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5 dark:bg-neutral-900" : "bg-muted/70")
                  : cn("rounded-tr-md bg-foreground text-background", floating && "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"),
              )}
            >
              {m.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            {m.source === "ai" && (
              <p className="px-1 text-[11px] text-muted-foreground">Answered by Gemini from Violet&apos;s published work</p>
            )}
            {m.projects && m.projects.length > 0 && (
              <div className="space-y-2">
                {m.projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            )}
            {m.showContact && (
              <div className="flex flex-wrap gap-2">
                {CONTACT_LINKS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm text-foreground hover:border-foreground/40"
                  >
                    {c.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
            {i === lastIndex && m.role === "assistant" && m.next && m.next.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {m.next.map((id) =>
                  PROMPTS[id] ? (
                    <button
                      key={id}
                      type="button"
                      onClick={() => choose(id)}
                      disabled={pending}
                      className={cn("min-h-9 rounded-full border border-border px-3 py-1.5", floating ? "bg-white shadow-sm dark:bg-neutral-900" : "bg-background", " text-left text-xs text-foreground/85 transition-colors hover:border-foreground/40 hover:text-foreground")}
                    >
                      {PROMPTS[id].label}
                    </button>
                  ) : null,
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {pending && (
        <div className="flex gap-2" aria-label="Mini Violet is thinking">
          <span className="mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <VioletAvatar mood="thinking" size={32} />
          </span>
          <div className={cn("flex items-center gap-1 rounded-2xl rounded-tl-md px-4 py-3", floating ? "bg-white shadow-sm ring-1 ring-black/5 dark:bg-neutral-900" : "bg-muted/70")}>
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-foreground/50 motion-safe:animate-bounce"
                style={{ animationDelay: `${d * 120}ms` }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )


  const form = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void send()
      }}
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pl-4 pr-1.5 focus-within:border-foreground/50",
        compact ? "min-w-0 flex-1" : "mx-3 mb-2",
      )}
    >
      <label htmlFor="violet-gpt-input" className="sr-only">
        Ask about Violet&apos;s work
      </label>
      <input
        id="violet-gpt-input"
        ref={inputRef}
        value={input}
        maxLength={MAX_INPUT}
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Violet's work..."
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        aria-label="Send"
        disabled={!input.trim() || pending}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-opacity disabled:opacity-30"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  )

  if (compact)
    return (
      <section
        id="violet-gpt-panel"
        role="dialog"
        aria-label="Mini Violet"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          // A corner card: clear of the reading column, and above the dock on narrower screens.
          "fixed right-6 bottom-[calc(96px+env(safe-area-inset-bottom,0px))] z-[60] w-[min(400px,calc(100vw-48px))] text-foreground min-[1180px]:bottom-[calc(24px+env(safe-area-inset-bottom,0px))]",
          !open && "pointer-events-none",
        )}
      >
        {/* One solid card grows out of the dock: the bar first, then the conversation unfolds above it. */}
        <div
          className={cn(
            "flex origin-bottom-right flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.3)] ring-1 ring-black/5 transition-[opacity,transform,visibility] duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none dark:bg-neutral-900 dark:ring-white/10",
            shown ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-3 scale-[0.9] opacity-0",
          )}
        >
          <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none", shown ? "grid-rows-[1fr] delay-150" : "grid-rows-[0fr]")}>
            <div className="min-h-0 overflow-hidden">
              <div ref={stackRef} className="max-h-[min(58vh,520px)] space-y-4 overflow-y-auto overscroll-contain px-4 pt-4 pb-3">
                <p className="text-center text-[11px] text-muted-foreground">Typed questions are answered by Google Gemini. Please don&apos;t share personal info.</p>
                {thread(false)}
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {announce}
          </p>
          <div className="flex items-center gap-2 border-t border-border/60 p-2">
            <span className="overflow-hidden rounded-full">
              <VioletAvatar mood={pending ? "thinking" : "idle"} size={40} />
            </span>
            {form}
            <button type="button" onClick={() => setExpanded(true)} aria-label="See the full chat" title="See the full chat" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Maximize2 className="h-4 w-4" />
            </button>
            <button type="button" onClick={onClose} aria-label="Close Mini Violet" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    )

  return (
    <section
      id="violet-gpt-panel"
      role="dialog"
      aria-labelledby="violet-gpt-title"
      hidden={!open}
      className={cn(
        "fixed z-[60] flex flex-col overflow-hidden border border-border bg-background text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
        "inset-x-0 bottom-0 max-h-[min(90dvh,760px)] rounded-t-3xl pb-[env(safe-area-inset-bottom)]",
        "sm:inset-x-auto sm:bottom-[96px] sm:left-[calc(50%-210px)] sm:w-[420px] sm:max-h-[min(640px,calc(100dvh-128px))] sm:rounded-3xl sm:pb-0",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-4 motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]",
      )}
    >
      <header className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
        <span className="overflow-hidden rounded-full">
          <VioletAvatar mood="idle" size={44} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="violet-gpt-title" ref={headingRef} tabIndex={-1} className="text-base font-semibold tracking-tight outline-none">
            Mini Violet
          </h2>
          <p className="text-xs text-muted-foreground">A guide to Violet&apos;s work as a product designer</p>
        </div>
        {wide && (
          <button type="button" onClick={() => setExpanded(false)} aria-label="Back to the chat bar" className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Minimize2 className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          aria-label="Start over"
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Mini Violet"
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <div ref={scrollRef} className="min-h-[280px] flex-1 space-y-4 overflow-y-auto px-4 py-4">
{thread(false)}
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      {form}
      <p className="px-4 pb-3 text-center text-[11px] text-muted-foreground">
        Typed questions are answered by Google Gemini and sent to Google. Please don&apos;t share personal info. Not a live chat with Violet.
      </p>
    </section>
  )
}
