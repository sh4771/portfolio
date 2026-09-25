import Image from "next/image"
import Link from "next/link"

interface FunProject {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  video?: string
  embedUrl?: string
  tools?: string[]
  softSkills?: string[]
}

const funProjects: FunProject[] = [
  {
    slug: "greener-routes",
    title: "Greener Walking Routes",
    description:
      "A walking-navigation prototype that recommends routes with higher green exposure, built for Computational Modeling at Columbia GSAPP, advised by Luc Wilson and Meli Harvey.",
    tags: ["2026", "In progress"],
    image: "/images/greener-routes/screen-route-choice.png",
    tools: ["Rhino", "Grasshopper"],
  },
  {
    slug: "restaurant-bot",
    title: "Restaurant Bot",
    description:
      "A live p5.js chatbot sketch built for Chatbots for Art's Sake at NYU, advised by Carrie Wang.",
    tags: ["2026"],
    image: "/images/restaurant-bot-cover.png",
    video: "/videos/restaurant-bot-demo.mov",
    softSkills: ["Creative experimentation", "Iterative prototyping", "Technical communication"],
    embedUrl: "https://editor.p5js.org/sh6363/full/mnrKWZok0",
    tools: ["p5.js"],
  },
]

export function FunGrid() {
  return (
    <section id="fun" className="pb-24">
      <div className="mx-auto w-full max-w-[900px] px-6">
        <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">
          For Fun
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
          Course projects and experiments outside of client work, things I build
          because a question was interesting enough to chase.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {funProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 bg-muted/30">
                <div className="absolute inset-[6%]">
                  {project.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    >
                      <source src={project.video} type="video/quicktime" />
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="450px"
                    />
                  )}
                </div>
                {project.softSkills && project.softSkills.length > 0 ? (
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-foreground/65 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div className="flex flex-wrap gap-1.5">
                      {project.softSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 className="text-sm font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
                  {project.title}
                </h3>
                <div className="flex shrink-0 flex-wrap justify-end gap-x-1 text-right text-[10px] uppercase tracking-[0.08em] text-foreground/45">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
