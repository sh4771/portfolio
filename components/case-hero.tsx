import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ProjectCover } from "@/components/project-cover"
import { COVERS } from "@/lib/covers"

/**
 * The opening of every case study, laid out like a product page: name and roles on the
 * left, one line on the right, the interactive cover full width, then a compact fact grid.
 */
export function CaseHero({
  slug,
  title,
  roles,
  tagline,
  when,
  forWhom,
  summary,
  scope,
  useCase,
  links,
  note,
  nested = false,
}: {
  slug: string
  title: string
  roles: string[]
  tagline: string
  when: string
  forWhom: React.ReactNode
  summary: React.ReactNode
  scope?: React.ReactNode
  useCase?: React.ReactNode
  links?: { label: string; href: string }[]
  note?: React.ReactNode
  /** Set when the page already wraps this in its own <header>. */
  nested?: boolean
}) {
  const cover = COVERS[slug]
  const Root = nested ? "div" : "header"
  return (
    <Root id={nested ? undefined : "overview"} className="scroll-mt-32 space-y-10 md:space-y-12">
      <div className="grid gap-4 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-balance md:text-[2.5rem]">{title}</h1>
          <p className="text-sm text-foreground/50">
            {roles.map((r, i) => (
              <span key={r}>
                <span className="underline decoration-foreground/20 underline-offset-4">{r}</span>
                {i < roles.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
        <p className="text-lg leading-snug text-foreground/85 text-pretty md:pt-1.5 md:text-xl">{tagline}</p>
      </div>

      {cover ? <ProjectCover spec={cover} alt={`${title} interaction demo`} hero /> : null}

      <dl className="grid grid-cols-2 gap-x-10 gap-y-8 text-sm md:grid-cols-4">
        <div>
          <dt className="text-foreground/45">When</dt>
          <dd className="mt-1 text-foreground/90">{when}</dd>
        </div>
        <div>
          <dt className="text-foreground/45">For</dt>
          <dd className="mt-1 text-foreground/90">{forWhom}</dd>
        </div>
        <div className="col-span-2 space-y-4">
          <dd className="leading-relaxed text-foreground/60 text-pretty">{summary}</dd>
          {links?.length ? (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground/80 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground">
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {scope ? (
          <>
            <dt className="col-span-2 text-foreground/45 md:col-span-2">Product scope</dt>
            <dd className="col-span-2 -mt-6 leading-relaxed text-foreground/60 text-pretty md:mt-0">{scope}</dd>
          </>
        ) : null}
        {useCase ? (
          <>
            <dt className="col-span-2 text-foreground/45 md:col-span-2">Use case</dt>
            <dd className="col-span-2 -mt-6 leading-relaxed text-foreground/60 text-pretty md:mt-0">{useCase}</dd>
          </>
        ) : null}
        {note ? <dd className="col-span-2 text-xs text-foreground/45 md:col-span-4">{note}</dd> : null}
      </dl>
    </Root>
  )
}
