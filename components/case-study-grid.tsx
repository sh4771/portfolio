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
  /** Logo-style artwork: white field + contain in the card frame */
  cardTreatAsLogo?: boolean
  /** Optional: play a looping video inside a device mockup frame instead of a static image */
  video?: string
  mockupFrame?: string
  mockupBounds?: { left: number; right: number; top: number; bottom: number }
}

const projects: CaseStudy[] = [
  {
    slug: "clinical-trials",
    title: "Designing Decision Clarity in Clinical Trial Systems",
    description:
      "Adobe Designathon: clinical trial intelligence platform for clearer decisions, transparent AI recommendations, and actionable dashboards.",
    tags: ["2026", "UI/UX Design", "Case Study"],
    image: "/images/clinical-trials/monitor-mockup-static.png",
    aiTools: ["Claude Code", "Cursor", "Vibe coding"],
    video: "/videos/clinical-trials-prototype.mov",
    mockupFrame: "/images/clinical-trials/monitor-mockup.png",
    mockupBounds: { left: 8.18, right: 8.18, top: 0.3, bottom: 1.8 },
  },
  {
    slug: "vendelux",
    title: "Product Designer, Vendelux",
    description:
      "At Vendelux I support product UI and system design on an AI-powered B2B event intelligence platform that helps teams identify high-ROI conferences, pre-book qualified meetings, and connect event spend to pipeline in Salesforce and HubSpot.",
    tags: ["2026", "Product Design", "B2B"],
    image: "/images/vendelux-cover.png",
    cardTreatAsLogo: true,
    aiTools: ["Claude Code", "Claude Design", "Figma MCP", "Cursor"],
  },
  {
    slug: "passiton",
    title: "Designing Traceable Garment Lifecycles",
    description:
      "Led research and end-to-end design of a blockchain-enabled fashion reuse app focused on extending garment lifecycle through traceability.",
    tags: ["2026", "UI/UX Design", "Case Study"],
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
        {/* Image / video mockup */}
        <div
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${project.cardTreatAsLogo ? "bg-white" : "bg-card"}`}
        >
          {project.video && project.mockupFrame && project.mockupBounds ? (
            <div className="absolute inset-[6%]">
              <div className="relative h-full w-full">
                <Image
                  src={project.mockupFrame}
                  alt={`${project.title} device mockup`}
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 640px"
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
                    className="h-full w-full object-contain"
                  >
                    <source src={project.video} type="video/quicktime" />
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-[6%]">
              <Image
                src={project.image}
                alt={`${project.title} case study preview`}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>
          )}
        </div>

        {/* Text below image */}
        <div className="mt-5">
          {/* Tools — primary visual element */}
          {project.aiTools && project.aiTools.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.aiTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-sm font-semibold text-foreground transition-colors group-hover:border-foreground/30"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : null}

          {/* Title — secondary but distinguishable from description */}
          <h3 className="mt-3 text-sm font-medium text-foreground/80 leading-snug tracking-tight transition-colors group-hover:text-foreground">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-foreground/50">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-x-1 text-xs text-foreground/60">
            {project.tags.map((tag, index) => (
              <span key={tag} className="flex items-center">
                {tag}
                {index < project.tags.length - 1 && (
                  <span className="ml-1">•</span>
                )}
              </span>
            ))}
          </div>
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
        {/* Two-up grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {homepageProjects.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { projects }
