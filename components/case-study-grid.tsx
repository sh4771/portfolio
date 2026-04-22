"use client"

import Image from "next/image"
import Link from "next/link"

export interface CaseStudy {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  /** When false, project stays routable at /work/[slug] but is omitted from the homepage grid. */
  showOnHomepage?: boolean
  /** Optional AI-adjacent tools (shown as small chips under tags). */
  aiTools?: string[]
}

const projects: CaseStudy[] = [
  {
    slug: "vendelux",
    title: "Product Design Intern, Vendelux",
    description:
      "Vendelux is an AI-powered B2B event intelligence platform that helps teams identify high-ROI conferences, pre-book qualified meetings, and connect event spend to pipeline in Salesforce and HubSpot, where I support product UI and system design in Figma and Linear.",
    tags: ["2026", "Product intern", "B2B"],
    image: "/images/vendelux-cover.png",
    aiTools: ["Claude Code", "Claude Design", "Figma MCP", "Cursor"],
  },
  {
    slug: "clinical-trials",
    title: "Designing Decision Clarity in Clinical Trial Systems",
    description:
      "Adobe Designathon: clinical trial intelligence platform for clearer decisions, transparent AI recommendations, and actionable dashboards.",
    tags: ["2026", "UI/UX Design", "Case Study"],
    image: "/images/clinical-trials-hero.png",
    aiTools: ["Claude Code", "Cursor", "Vibe coding"],
  },
  {
    slug: "passiton",
    title: "Designing Traceable Garment Lifecycles",
    description:
      "Led research and end-to-end design of a blockchain-enabled fashion reuse app focused on extending garment lifecycle through traceability.",
    tags: ["2024", "UI/UX Design", "Case Study"],
    image: "/images/passiton.jpg",
    aiTools: ["Claude Code", "Cursor"],
  },
  {
    slug: "games4peace",
    title: "Turning Casual Play into Measurable Social Impact",
    description:
      "Designing an interactive system that transforms playful user interactions into measurable social impact.",
    tags: ["2024–2025", "UI/UX Design", "Case Study"],
    image: "/images/games4peace.jpg",
    aiTools: ["Cursor", "Claude Code"],
  },
  {
    slug: "schedulink",
    title: "Real-Time Availability for Social Planning",
    description:
      "Designing a social scheduling system that helps college students coordinate spontaneous plans.",
    tags: ["2025", "Product Design", "UX Design", "Interaction Design"],
    image: "/images/schedulink.jpg",
    aiTools: ["Cursor", "Claude Code", "Vibe coding"],
  },
  {
    slug: "cast",
    title: "Restoring Postural Control: A Cable-Activated Stabilizing Torso (C.A.S.T)",
    description:
      "Designing a wearable assistive device that helps restore postural stability for spinal cord injury patients.",
    tags: ["2025", "Wearable Design", "UX Research", "Human-Centered Robotics"],
    image: "/images/cast.jpg",
    aiTools: ["ChatGPT", "Perplexity", "Gemini"],
  },
]

function CaseStudyCard({ project }: { project: CaseStudy }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article>
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-card">
          <Image
            src={project.image}
            alt={`${project.title} case study preview`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>

        {/* Text below image */}
        <div className="mt-5">
          {/* Title */}
          <h3 className="text-base font-semibold text-foreground leading-snug tracking-tight transition-colors group-hover:text-foreground/70">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-foreground/60">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-x-1 text-xs text-foreground/40">
            {project.tags.map((tag, index) => (
              <span key={tag} className="flex items-center">
                {tag}
                {index < project.tags.length - 1 && (
                  <span className="ml-1">•</span>
                )}
              </span>
            ))}
          </div>
          {project.aiTools && project.aiTools.length > 0 ? (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.aiTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium text-foreground/60"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  )
}

const homepageProjects = projects.filter((p) => p.showOnHomepage !== false)

export function CaseStudyGrid() {
  return (
    <section id="work" className="pb-24 pt-6">
      <div className="mx-auto w-full max-w-[900px] px-6">
        {/* Stacked cards */}
        <div className="flex flex-col gap-16">
          {homepageProjects.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { projects }
