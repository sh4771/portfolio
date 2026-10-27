"use client"

import Image from "next/image"
import Link from "next/link"
import { Lock } from "lucide-react"

export interface CaseStudy {
  slug: string
  title: string
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
    items: { slug: string; title: string; blurb: string; image: string }[]
  }
}

const projects: CaseStudy[] = [
  {
    slug: "vendelux",
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
        { slug: "segments", title: "Segments", blurb: "Build an audience once, reuse it across events", image: "/images/vendelux/thumbs/segments.jpg" },
        { slug: "campaign-admin", title: "Campaign Admin", blurb: "Set up related sub-campaigns without repeating work", image: "/images/vendelux/thumbs/campaign-admin.jpg" },
        { slug: "meeting-planner", title: "Meeting Planner", blurb: "Show how a meeting forecast is calculated", image: "/images/vendelux/thumbs/meeting-planner.jpg" },
      ],
    },
  },
  {
    slug: "passiton",
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
    slug: "games4peace",
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

function CaseStudyCard({ project, inGroup = false }: { project: CaseStudy; inGroup?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${project.featured && !inGroup ? "sm:col-span-2" : ""}`}
    >
      <article>
        {/* Image / video mockup */}
        <div
          className={`relative w-full overflow-hidden rounded-2xl ${inGroup ? "aspect-[4/3] sm:aspect-[16/10]" : project.featured ? "aspect-[4/3] sm:aspect-[2/1]" : "aspect-[4/3]"} ${project.cardTreatAsLogo ? "bg-white" : "bg-card"}`}
        >
          {project.video && project.mockupFrame && project.mockupBounds ? (
            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                <Image
                  src={project.mockupFrame}
                  alt={`${project.title} device mockup`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes={project.featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 640px"}
                />
                <div
                  className="absolute overflow-hidden rounded-[2px] bg-black"
                  style={{
                    left: `${project.mockupBounds.left}%`,
                    right: `${project.mockupBounds.right}%`,
                    top: `${project.mockupBounds.top}%`,
                    bottom: `${project.mockupBounds.bottom}%`,
                  }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  >
                    <source src={project.video} type="video/quicktime" />
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          ) : project.video ? (
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.image}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              >
                <source src={project.video} type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={`${project.title} case study preview`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes={project.featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 640px"}
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 flex items-end bg-neutral-950/70 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <div className="flex flex-wrap gap-1.5">
              {project.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-900"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Text below image */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className={`min-w-0 flex-1 ${project.featured ? "text-base" : "text-sm"} font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground`}>
            {project.title}
          </h3>
          <span className="shrink-0 text-right text-[10px] uppercase tracking-[0.08em] text-foreground/45">
            {project.category}
          </span>
        </div>
      </article>
    </Link>
  )
}

/** Featured company card with a tile per sub-project, so all of them are visible from the homepage. */
function GroupedCaseStudy({ project }: { project: CaseStudy }) {
  const g = project.group!
  return (
    <div className="sm:col-span-2">
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/60">
        <span className="font-medium text-foreground">{g.label}</span>
        <span>· {g.meta}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-foreground/50">
          {g.items.length} projects
          {g.locked && (
            <>
              <span aria-hidden>·</span>
              <Lock className="h-3 w-3" aria-hidden />
              Password protected
            </>
          )}
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <CaseStudyCard project={project} inGroup />
        <ol className="grid content-start gap-3 lg:grid-rows-3 lg:content-stretch">
          {g.items.map((item, i) => (
            <li key={item.slug} className="lg:h-full">
              <Link
                href={`/work/${project.slug}?project=${item.slug}`}
                className="group/tile grid h-full grid-cols-[104px_1fr] items-center gap-3 rounded-2xl border border-border/60 bg-card p-2.5 transition-[border-color,transform] duration-200 hover:translate-x-0.5 hover:border-foreground/30 sm:grid-cols-[120px_1fr]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-white">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover object-left-top transition-transform duration-500 group-hover/tile:scale-105"
                    sizes="120px"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold tracking-[0.08em] text-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-sm font-medium text-foreground">{item.title}</span>
                  <span className="block text-xs leading-snug text-foreground/60">{item.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

const homepageProjects = projects.filter((p) => p.showOnHomepage !== false)

export function CaseStudyGrid() {
  return (
    <section id="work" className="pb-24 pt-6">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        {/* Two-up grid */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2">
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
