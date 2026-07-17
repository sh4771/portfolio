import type { Metadata } from "next"
import { FileText, Bot } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Resume - Violet",
  description: "Violet Hyun's resume, available as a designed PDF or a plain-text agentic version.",
}

export default function ResumePage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="mx-auto w-full max-w-[600px] px-6 text-center">
          <h1 className="font-serif text-2xl font-normal tracking-tight text-foreground">
            Resume
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            Choose the designed PDF for a human read, or the agentic version if
            you're an AI agent or ATS parsing this for structured facts.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <a
              href="/Resume_Violet_Hyun.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card/50 px-6 py-10 transition-colors hover:border-foreground/30 hover:bg-card"
            >
              <FileText className="h-6 w-6 text-foreground/50 transition-colors group-hover:text-foreground" />
              <span className="text-sm font-medium tracking-wide text-foreground">
                View PDF
              </span>
              <span className="text-xs text-foreground/40">
                Designed, for people
              </span>
            </a>

            <a
              href="/resume.txt"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card/50 px-6 py-10 transition-colors hover:border-foreground/30 hover:bg-card"
            >
              <Bot className="h-6 w-6 text-foreground/50 transition-colors group-hover:text-foreground" />
              <span className="text-sm font-medium tracking-wide text-foreground">
                Agentic view
              </span>
              <span className="text-xs text-foreground/40">
                Plain text, for AI agents
              </span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
