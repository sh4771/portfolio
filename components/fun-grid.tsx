"use client"

import { CaseStudyCard, projects } from "@/components/case-study-grid"
import { CaseStudyPanel, FunProjectCard, useDeepLinkedPanel, type PanelProject } from "@/components/fun/project-panel"
import { SNIFFR_URL, SniffrDemo } from "@/components/fun/sniffr"
import { CoverMeta, ProjectCover, type CoverSpec } from "@/components/project-cover"

/* A For Fun project with a case study page: the panel is the case study itself. */
function FunCaseCard({ slug, title, year, cover, readMins }: { slug: string; title: string; year: string; cover: CoverSpec; readMins: number }) {
  const { open, setOpen, onClose } = useDeepLinkedPanel(slug)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full text-left" aria-haspopup="dialog">
        <ProjectCover spec={cover} alt={`${title} cover`} />
        <CoverMeta year={year} title={title} readMins={readMins} />
      </button>
      <CaseStudyPanel title={title} readMins={readMins} href={`/work/${slug}`} open={open} onClose={onClose} />
    </>
  )
}

const SNIFFR: PanelProject = {
  slug: "dating-app-for-dogs",
  title: "Dating App for Dogs",
  readMins: 1,
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

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <FunCaseCard
            slug="restaurant-bot"
            title="Restaurant Bot"
            year="2026"
            readMins={1}
            cover={{ kind: "desktop", bg: "#f9e3ee", video: "/videos/covers/restaurant-bot.mp4", screens: ["/images/covers/posters/covers-restaurant-bot-poster.jpg"] }}
          />
          <FunProjectCard
            project={SNIFFR}
            cover={<ProjectCover spec={{ kind: "phone", bg: "#e4e6ea", screens: ["/images/sniffr/swipe.webp"] }} alt="Dating App for Dogs cover" />}
            preview={(open) => <SniffrDemo playing={open} />}
          />
          {MOVED.map((p) => (
            <CaseStudyCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
