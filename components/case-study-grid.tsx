"use client"

import Image from "next/image"
import Link from "next/link"

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
}

const projects: CaseStudy[] = [
  {
    slug: "vendelux",
    title: "Product Designer, Vendelux",
    description:
      "At Vendelux I support product UI and system design on an AI-powered B2B event intelligence platform that helps teams identify high-ROI conferences, pre-book qualified meetings, and connect event spend to pipeline in Salesforce and HubSpot.",
    tags: ["2026", "Product Design", "B2B"],
    category: "Product Design",
    softSkills: ["Design ownership", "Systems thinking", "Cross-functional collaboration"],
    image: "/images/vendelux-cover.png",
    video: "/videos/vendelux-cover.mp4",
    cardTreatAsLogo: true,
    aiTools: ["Claude Code", "Claude Design", "Figma MCP", "Cursor"],
  },
  {
    slug: "passiton",
    title: "Designing Traceable Garment Lifecycles",
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

function CaseStudyCard({ project }: { project: CaseStudy }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article>
        {/* Image / video mockup */}
        <div
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${project.cardTreatAsLogo ? "bg-white" : "bg-card"}`}
        >
          {project.video && project.mockupFrame && project.mockupBounds ? (
            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                <Image
                  src={project.mockupFrame}
                  alt={`${project.title} device mockup`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 flex items-end bg-foreground/65 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
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
          <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
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

const homepageProjects = projects.filter((p) => p.showOnHomepage !== false)

export function CaseStudyGrid() {
  return (
    <section id="work" className="pb-24 pt-6">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        {/* Two-up grid */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2">
          {homepageProjects.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { projects }
