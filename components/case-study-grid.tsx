"use client"

import Image from "next/image"
import Link from "next/link"
import { Hourglass, Lock } from "lucide-react"
import { useEffect } from "react"
import { CoverMeta, ProjectCover, type CoverSpec } from "@/components/project-cover"
import { COVERS } from "@/lib/covers"

export interface CaseStudy {
  slug: string
  title: string
  /** Short name shown under the cover. */
  name?: string
  /** Clean gallery cover built from prototype screens. */
  cover?: CoverSpec
  /** Minutes to read the case study (words / 230 wpm, plus time for images). */
  readMins?: number
  description: string
  tags: string[]
  category: string
  image: string
  /** When false, project stays routable at /work/[slug] but is omitted from the homepage grid. */
  showOnHomepage?: boolean
  /** Optional AI-adjacent tools (shown as small chips under tags). */
  aiTools?: string[]
  softSkills: string[]
  /** Logo-style artwork: white field + contain in the card frame */
  cardTreatAsLogo?: boolean
  /** Optional: play a looping video inside a device mockup frame instead of a static image */
  video?: string
  mockupFrame?: string
  mockupBounds?: { left: number; right: number; top: number; bottom: number }
  /** Featured projects span the full grid row with a wider frame. */
  featured?: boolean
  /** Shown as a bento: the main card plus one tile per sub-project. */
  group?: {
    label: string
    meta: string
    locked?: boolean
    items: { slug: string; title: string; challenge: string; image?: string; soon?: boolean; readMins?: number }[]
  }
}

const projects: CaseStudy[] = [
  {
    slug: "vendelux",
    name: "Vendelux: How event teams target, plan, and connect",
    cover: COVERS["vendelux"],
    readMins: 24,
    title: "Designing How Event Teams Target, Plan, and Connect",
    description:
      "At Vendelux I support product UI and system design on an AI-powered B2B event intelligence platform that helps teams identify high-ROI conferences, pre-book qualified meetings, and connect event spend to pipeline in Salesforce and HubSpot.",
    tags: ["2026", "Product Design", "B2B"],
    category: "Product Design",
    softSkills: ["Design ownership", "Systems thinking", "Cross-functional collaboration"],
    image: "/images/vendelux-cover-poster.jpg",
    video: "/videos/vendelux-cover.mp4",
    featured: true,
    aiTools: ["Claude Code", "Claude Design", "Figma MCP", "Cursor"],
    group: {
      label: "Vendelux",
      meta: "Product Intern · 2026",
      locked: true,
      items: [
        { slug: "segments", readMins: 5, title: "Segments", challenge: "Guiding marketers to the right audience", image: "/images/vendelux/thumbs/segments.jpg" },
        { slug: "campaign-admin", readMins: 10, title: "Campaign Admin", challenge: "Turning a cut feature into a faster setup flow", image: "/images/vendelux/thumbs/campaign-admin.jpg" },
        { slug: "meeting-planner", readMins: 9, title: "Meeting Planner", challenge: "Making a forecast people can trust", image: "/images/vendelux/thumbs/meeting-planner.jpg" },
        { slug: "planner", title: "Planner", challenge: "Making dense event data easy to scan", soon: true },
      ],
    },
  },
  {
    slug: "passiton",
    name: "PASSIT ON: Traceable garment lifecycles",
    cover: COVERS["passiton"],
    readMins: 8,
    title: "PASSIT ON: Designing Traceable Garment Lifecycles",
    description:
      "Led research and end-to-end design of a blockchain-enabled fashion reuse app focused on extending garment lifecycle through traceability.",
    tags: ["2026", "UI/UX Design", "Case Study"],
    category: "Product Design",
    softSkills: ["Human-centered design", "Research synthesis", "0-to-1 product thinking"],
    image: "/images/passiton.jpg",
    video: "/videos/passiton-cover.mp4",
    aiTools: ["Claude Code", "Cursor"],
  },
  {
    slug: "greener-routes",
    name: "Greener Walking Routes",
    cover: COVERS["greener-routes"],
    readMins: 5,
    title: "Greener Walking Routes",
    description:
      "A walking-navigation prototype that recommends routes with higher green exposure, built for Computational Modeling at Columbia GSAPP, advised by Luc Wilson and Meli Harvey.",
    tags: ["2026", "Spatial Design", "In progress"],
    category: "Spatial Design",
    softSkills: [],
    image: "/images/greener-routes/screen-route-choice.png",
    video: "/videos/greener-routes-cover.mp4",
  },
  {
    slug: "along",
    name: "Along: Sidequests on your everyday walk",
    cover: COVERS["along"],
    readMins: 3,
    title: "Along: Making the Everyday Walk Worth Taking the Long Way",
    description:
      "A walking app for New York that tucks small sidequests into the route you already take, with a companion, Lolo, who grows with every walk.",
    tags: ["2026", "Product Design", "Designathon"],
    category: "Product Design",
    softSkills: ["UX research", "Interaction design", "Brand"],
    image: "/images/along/cover.webp",
    aiTools: ["Figma"],
  },
  {
    slug: "reconcile",
    name: "Reconcile: Explaining seller payouts",
    cover: COVERS["reconcile"],
    readMins: 4,
    title: "Reconcile: Explaining Why a Seller Payout Doesn't Match",
    description:
      "A payout reconciliation app that tells a marketplace finance manager why a seller payout differs from what the ledger expected, without touching the numbers.",
    tags: ["2026", "Fintech", "Product Design"],
    category: "Product Design",
    softSkills: ["Research to decisions", "Edge-case thinking", "Design systems"],
    image: "/images/reconcile/cover.webp",
    aiTools: ["Claude Design", "Claude Code"],
  },
  {
    slug: "games4peace",
    name: "Games4Peace: Casual play for social impact",
    cover: COVERS["games4peace"],
    readMins: 4,
    title: "Turning Casual Play into Measurable Social Impact",
    description:
      "Designing an interactive system that transforms playful user interactions into measurable social impact.",
    tags: ["2024–2025", "UI/UX Design", "Case Study"],
    category: "Product Design",
    softSkills: ["Design thinking", "Behavioral insight", "Systems thinking"],
    image: "/images/games4peace.jpg",
    video: "/videos/games4peace-hero.mp4",
    aiTools: ["Cursor", "Claude Code"],
  },
  {
    slug: "schedulink",
    name: "Schedulink: Real-time plans with friends",
    cover: COVERS["schedulink"],
    readMins: 4,
    title: "Real-Time Availability for Social Planning",
    description:
      "Designing a social scheduling system that helps college students coordinate spontaneous plans.",
    tags: ["2025", "Product Design", "UX Design", "Interaction Design"],
    category: "Interaction Design",
    softSkills: ["Interaction design", "Rapid prototyping", "User advocacy"],
    image: "/images/schedulink.jpg",
    aiTools: ["Cursor", "Claude Code", "V0"],
  },
  {
    slug: "cast",
    name: "C.A.S.T: A stabilizing torso for postural control",
    cover: COVERS["cast"],
    readMins: 2,
    showOnHomepage: false, // shown in For Fun
    title: "Restoring Postural Control: A Cable-Activated Stabilizing Torso (C.A.S.T)",
    description:
      "Designing a wearable assistive device that helps restore postural stability for spinal cord injury patients.",
    tags: ["2025", "Wearable Design", "UX Research", "Human-Centered Robotics"],
    category: "UX Research",
    softSkills: ["Human-centered research", "Systems thinking", "Cross-disciplinary collaboration"],
    image: "/images/cast.jpg",
    aiTools: ["ChatGPT", "Perplexity", "Gemini"],
  },
  {
    slug: "clinical-trials",
    name: "Decision Clarity in Clinical Trials",
    cover: COVERS["clinical-trials"],
    readMins: 5,
    showOnHomepage: false, // shown in For Fun
    title: "Designing Decision Clarity in Clinical Trial Systems",
    description:
      "Adobe Designathon: clinical trial intelligence platform for clearer decisions, transparent AI recommendations, and actionable dashboards.",
    tags: ["2026", "UI/UX Design", "Case Study"],
    category: "Product Design",
    softSkills: ["Design thinking", "Decision framing", "Design ownership"],
    image: "/images/clinical-trials/monitor-mockup-static.png",
    aiTools: ["Claude Code", "Cursor", "Figma MCP"],
    video: "/videos/clinical-trials-prototype.mov#t=3",
  },
]

export function CaseStudyCard({ project, inGroup = false }: { project: CaseStudy; inGroup?: boolean }) {
  const year = project.tags[0] ?? ""
  return (
    <>
      <Link href={`/work/${project.slug}`} className="group block w-full text-left">
        <article>
          {project.cover ? (
            <ProjectCover spec={project.cover} alt={`${project.name ?? project.title} cover`} large={inGroup} className={project.cover.bg === "#ffffff" ? "ring-1 ring-inset ring-black/5" : undefined} />
          ) : (
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-card">
              <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover" sizes="400px" />
            </div>
          )}
          <CoverMeta
            year={year}
            title={project.name ?? project.title}
            readMins={project.readMins}
            extra={project.group ? ` · ${project.group.items.filter((x) => !x.soon).length} projects` : undefined}
          />
        </article>
      </Link>
    </>
  )
}

/* A Vendelux sub-project tile, opening its own panel. */
function GroupTile({ parent, item, index }: { parent: CaseStudy; item: NonNullable<CaseStudy["group"]>["items"][number]; index: number }) {
  const href = `/work/${parent.slug}?project=${item.slug}`
  return (
    <>
      <Link
        href={href}
        className={`group/tile grid h-full w-full grid-cols-[104px_1fr] items-center gap-3 rounded-2xl p-2.5 text-left transition-[border-color,transform] duration-200 hover:translate-x-0.5 sm:grid-cols-[120px_1fr] ${
          item.soon ? "border border-dashed border-foreground/25 hover:border-foreground/45" : "border border-border/60 bg-card hover:border-foreground/30"
        }`}
      >
        {item.image ? (
          <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-white">
            <Image src={item.image} alt="" fill className="object-cover object-left-top transition-transform duration-500 group-hover/tile:scale-105" sizes="120px" />
          </span>
        ) : (
          <span aria-hidden className="grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-foreground/20 text-foreground/40">
            <Hourglass className="h-5 w-5" />
          </span>
        )}
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-foreground/45">
            {String(index + 1).padStart(2, "0")} · {item.title}
            {item.soon && (
              <span className="rounded-full bg-amber-500/20 px-1.5 py-px text-[10px] font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-300">Coming soon</span>
            )}
          </span>
          <span className="mt-0.5 block text-sm font-medium leading-snug text-foreground">{item.challenge}</span>
          {item.readMins ? <span className="mt-0.5 block text-xs text-foreground/45">{item.readMins} min read</span> : null}
        </span>
      </Link>
    </>
  )
}

/** Featured company card with a tile per sub-project, so all of them are visible from the homepage. */
function GroupedCaseStudy({ project }: { project: CaseStudy }) {
  const g = project.group!
  return (
    <div className="sm:col-span-2 lg:col-span-3">
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/60">
        <span className="font-medium text-foreground">{g.label}</span>
        <span>· {g.meta}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-foreground/50">
          {g.items.filter((x) => !x.soon).length} projects
          {g.items.some((x) => x.soon) && <> · {g.items.filter((x) => x.soon).length} in progress</>}
          {g.locked && (
            <>
              <span aria-hidden>·</span>
              <Lock className="h-3 w-3" aria-hidden />
              Password protected
            </>
          )}
        </span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2.1fr_1fr]">
        <CaseStudyCard project={project} inGroup />
        <ol className="grid content-start gap-3 lg:auto-rows-fr lg:content-stretch">
          {g.items.map((item, i) => (
            <li key={item.slug} className="lg:h-full">
              <GroupTile parent={project} item={item} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

const homepageProjects = projects.filter((p) => p.showOnHomepage !== false)

export function CaseStudyGrid() {
  // Old shared links pointed at a panel (#p-slug). Send them to the case study page.
  useEffect(() => {
    const m = window.location.hash.match(/^#p-(.+)$/)
    if (!m || m[1] === "dating-app-for-dogs") return
    const slug = m[1]
    const sub = slug.match(/^vendelux-(.+)$/)
    window.location.replace(sub ? `/work/vendelux?project=${sub[1]}` : `/work/${slug}`)
  }, [])

  return (
    <section id="work" className="pb-24 pt-6">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        {/* Two-up grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {homepageProjects.map((project) =>
            project.group ? (
              <GroupedCaseStudy key={project.slug} project={project} />
            ) : (
              <CaseStudyCard key={project.slug} project={project} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export { projects }
