"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Lock, RotateCcw, Send, X } from "lucide-react"
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
      <span className="mt-2 block text-xs leading-relaxed text-foreground/80">{project.evidence}</span>
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
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
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

  return (
    <section
      id="violet-gpt-panel"
      role="dialog"
      aria-labelledby="violet-gpt-title"
      hidden={!open}
      className={cn(
        "fixed z-[60] flex flex-col overflow-hidden border border-border bg-background text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
        "inset-x-0 bottom-0 max-h-[min(90dvh,760px)] rounded-t-3xl pb-[env(safe-area-inset-bottom)]",
        "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:max-h-[min(680px,calc(100dvh-48px))] sm:rounded-3xl sm:pb-0",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-200",
      )}
    >
      <header className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
        <span className="overflow-hidden rounded-full">
          <VioletAvatar mood="idle" size={44} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="violet-gpt-title" ref={headingRef} tabIndex={-1} className="text-base font-semibold tracking-tight outline-none">
            Violet GPT
          </h2>
          <p className="text-xs text-muted-foreground">A guide to Violet&apos;s work as a product designer</p>
        </div>
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
          aria-label="Close Violet GPT"
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <div ref={scrollRef} className="min-h-[280px] flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={m.id} className={cn("flex gap-2", m.role === "user" && "justify-end")}>
            {m.role === "assistant" && (
              <span className="mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <VioletAvatar mood={i === 0 ? "wave" : "idle"} size={32} />
              </span>
            )}
            <div className={cn("max-w-[85%] space-y-2", m.role === "user" && "max-w-[80%]")}>
              <div
                className={cn(
                  "space-y-2 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "assistant" ? "rounded-tl-md bg-muted/70 text-foreground" : "rounded-tr-md bg-foreground text-background",
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
                        className="min-h-9 rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs text-foreground/85 transition-colors hover:border-foreground/40 hover:text-foreground"
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
          <div className="flex gap-2" aria-label="Violet GPT is thinking">
            <span className="mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <VioletAvatar mood="thinking" size={32} />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-muted/70 px-4 py-3">
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
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void send()
        }}
        className="mx-3 mb-2 flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pl-4 pr-1.5 focus-within:border-foreground/50"
      >
        <label htmlFor="violet-gpt-input" className="sr-only">
          Ask about Violet&apos;s work
        </label>
        <input
          id="violet-gpt-input"
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
      <p className="px-4 pb-3 text-center text-[11px] text-muted-foreground">
        Typed questions are answered by Google Gemini and sent to Google. Please don&apos;t share personal info. Not a live chat with Violet.
      </p>
    </section>
  )
}
