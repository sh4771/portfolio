import { Hourglass } from "lucide-react"
import type { VendeluxProject } from "@/lib/vendelux-projects"

/** Placeholder tab for a project that's still being designed. */
export function ComingSoon({ project }: { project: VendeluxProject }) {
  return (
    <article className="space-y-8">
      <header className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="cs-eyebrow">{project.title}</p>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-300">
            Coming soon
          </span>
        </div>
        <h1 className="cs-h1">{project.challenge ?? project.title}</h1>
        <p className="text-sm text-foreground/60">{project.duration}</p>
      </header>

      <div className="flex flex-col items-start gap-5 rounded-2xl border border-dashed border-foreground/25 p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-muted/60 text-foreground/60">
          <Hourglass className="h-6 w-6" />
        </span>
        <div className="space-y-2">
          <p className="text-lg leading-snug text-foreground">I&apos;m designing this right now.</p>
          <p className="text-sm leading-relaxed text-foreground/70">
            {project.oneLiner} It&apos;s customer-facing and central to how teams decide which events are worth the
            spend. The case study is coming soon.
          </p>
        </div>
      </div>
    </article>
  )
}
