"use client"

import Image from "next/image"
import { FunProjectCard, type PanelProject } from "@/components/fun/project-panel"
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

/* Panel preview: the demo video, restarted and played as soon as the panel opens. */
function VideoPreview({ video, poster, href, external, label }: { video: string; poster: string; href: string; external?: boolean; label: string }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={label} className="group relative block aspect-[16/10] bg-neutral-100">
      <video autoPlay muted loop playsInline preload="auto" poster={poster} className="h-full w-full object-cover">
        <source src={video} type="video/quicktime" />
        <source src={video} type="video/mp4" />
      </video>
      <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-neutral-800 shadow-sm transition-colors group-hover:bg-white">
        {external ? "Try it yourself ↗" : "Read the case study →"}
      </span>
    </a>
  )
}

const GREENER: PanelProject = {
  slug: "greener-routes",
  title: "Greener Walking Routes",
  year: "2026",
  category: "Spatial Design",
  description:
    "A walking-navigation prototype that recommends routes with higher green exposure, built for Computational Modeling at Columbia GSAPP, advised by Luc Wilson and Meli Harvey.",
  actions: [{ label: "Read the case study", href: "/work/greener-routes", primary: true }],
  openHref: "/work/greener-routes",
  stack: [
    { label: "Status", items: ["In progress"] },
    { label: "Focus", items: ["Spatial design", "Route metrics"] },
    { label: "Tools", items: ["Rhino", "Grasshopper"] },
  ],
}

const RESTAURANT: PanelProject = {
  slug: "restaurant-bot",
  title: "Restaurant Bot",
  year: "2026",
  category: "Creative Technology",
  description: "A live p5.js chatbot sketch built for Chatbots for Art's Sake at NYU, advised by Carrie Wang.",
  actions: [
    { label: "Read the case study", href: "/work/restaurant-bot" },
    { label: "Try the bot", href: "https://editor.p5js.org/sh6363/full/mnrKWZok0", external: true, primary: true },
  ],
  openHref: "https://editor.p5js.org/sh6363/full/mnrKWZok0",
  openExternal: true,
  stack: [
    { label: "Skills", items: ["Creative experimentation", "Iterative prototyping", "Technical communication"] },
    { label: "Course", items: ["Chatbots for Art's Sake, NYU"] },
    { label: "Tools", items: ["p5.js"] },
  ],
}

const SNIFFR: PanelProject = {
  slug: "dating-app-for-dogs",
  title: "Dating App for Dogs",
  year: "2026",
  category: "Product Design",
  description:
    "Sniffr, a swipe-to-match app for dogs. Owners browse nearby pups by breed, distance, and favorite activities, then match for park dates.",
  actions: [{ label: "Try the app", href: SNIFFR_URL, external: true, primary: true }],
  openHref: SNIFFR_URL,
  openExternal: true,
  stack: [
    { label: "Concept", items: ["Swipe matching", "Breed + distance filters"] },
    { label: "Design", items: ["Mobile UI", "Interaction design"] },
    { label: "Prototype", items: ["Claude Design"] },
  ],
}

export function FunGrid() {
  return (
    <section id="fun" className="pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground">For Fun</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
          Course projects and experiments outside of client work, things I build because a question was interesting enough to chase.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2">
          <FunProjectCard
            project={GREENER}
            cover={<VideoCover video="/videos/greener-routes-cover.mp4" image="/images/greener-routes/screen-route-choice.png" title={GREENER.title} />}
            preview={() => <VideoPreview video="/videos/greener-routes-cover.mp4" poster="/images/greener-routes/screen-route-choice.png" href="/work/greener-routes" label="Open the Greener Walking Routes case study" />}
          />
          <FunProjectCard
            project={RESTAURANT}
            cover={<VideoCover video="/videos/restaurant-bot-demo.mov" image="/images/restaurant-bot-cover.png" title={RESTAURANT.title} softSkills={["Creative experimentation", "Iterative prototyping", "Technical communication"]} />}
            preview={() => <VideoPreview video="/videos/restaurant-bot-demo.mov" poster="/images/restaurant-bot-cover.png" href={RESTAURANT.openHref} external label="Open the Restaurant Bot in a new tab" />}
          />
          <FunProjectCard project={SNIFFR} cover={<SniffrCover />} preview={(open) => <SniffrDemo playing={open} />} />
        </div>
      </div>
    </section>
  )
}
