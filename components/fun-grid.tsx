"use client"

import Image from "next/image"
import { CaseStudyCard, projects } from "@/components/case-study-grid"
import { CaseStudyPanel, FunProjectCard, useDeepLinkedPanel, type PanelProject } from "@/components/fun/project-panel"
import { SNIFFR_URL, SniffrCover, SniffrDemo } from "@/components/fun/sniffr"

function VideoCover({ video, image, title, softSkills }: { video?: string; image: string; title: string; softSkills?: string[] }) {
  return (
    <>
      <div className="absolute inset-0">
        {video ? (
          <video autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]">
            <source src={video} type="video/quicktime" />
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image src={image} alt={`${title} preview`} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" sizes="450px" />
        )}
      </div>
      {softSkills && softSkills.length > 0 ? (
        <div className="pointer-events-none absolute inset-0 flex items-end bg-foreground/65 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="flex flex-wrap gap-1.5">
            {softSkills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-900">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

/* A For Fun project with a case study page: the panel is the case study itself. */
function FunCaseCard({ slug, title, category, cover }: { slug: string; title: string; category: string; cover: React.ReactNode }) {
  const { open, setOpen, onClose } = useDeepLinkedPanel(slug)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full text-left" aria-haspopup="dialog">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 bg-muted/30">{cover}</div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">{title}</h3>
          <span className="shrink-0 text-right text-[10px] uppercase tracking-[0.08em] text-foreground/45">{category}</span>
        </div>
      </button>
      <CaseStudyPanel title={title} href={`/work/${slug}`} open={open} onClose={onClose} />
    </>
  )
}

const SNIFFR: PanelProject = {
  slug: "dating-app-for-dogs",
  title: "Dating App for Dogs",
  year: "2026",
  category: "Product Design",
  description:
    "Sniffr, a swipe-to-match app for dogs. Owners browse nearby pups by breed, distance, and favorite activities, then match for park dates.",
  actions: [{ label: "Open full prototype", href: SNIFFR_URL, external: true, primary: true }],
  openHref: SNIFFR_URL,
  openExternal: true,
  stack: [
    { label: "Concept", items: ["Swipe matching", "Breed + distance filters"] },
    { label: "Design", items: ["Mobile UI", "Interaction design"] },
    { label: "Prototype", items: ["Claude Design"] },
  ],
}

// Moved here from the main grid.
const MOVED = ["clinical-trials", "cast"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => !!p)

export function FunGrid() {
  return (
    <section id="fun" className="pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">For Fun</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
          Course projects and experiments outside of client work, things I build because a question was interesting enough to chase.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2">
          <FunCaseCard
            slug="restaurant-bot"
            title="Restaurant Bot"
            category="Creative Technology"
            cover={<VideoCover video="/videos/restaurant-bot-demo.mov" image="/images/restaurant-bot-cover.png" title="Restaurant Bot" softSkills={["Creative experimentation", "Iterative prototyping", "Technical communication"]} />}
          />
          <FunProjectCard project={SNIFFR} cover={<SniffrCover />} preview={(open) => <SniffrDemo playing={open} />} />
          {MOVED.map((p) => (
            <CaseStudyCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
