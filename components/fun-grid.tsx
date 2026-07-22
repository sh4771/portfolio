import Image from "next/image"
import Link from "next/link"

const funProjects = [
  {
    slug: "greener-routes",
    title: "Greener Walking Routes",
    description:
      "A walking-navigation prototype that recommends routes with higher green exposure, built for Computational Modeling at Columbia GSAPP, advised by Luc Wilson and Meli Harvey.",
    tags: ["2026", "In progress"],
    image: "/images/greener-routes/screen-route-choice.png",
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
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="450px"
                  />
                </div>
              </div>
              <h3 className="mt-3 text-sm font-medium text-foreground/80 leading-snug tracking-tight transition-colors group-hover:text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-1 text-xs text-foreground/35">
                {project.tags.map((tag, index) => (
                  <span key={tag} className="flex items-center">
                    {tag}
                    {index < project.tags.length - 1 && (
                      <span className="ml-1">•</span>
                    )}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
