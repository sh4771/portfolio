import { projects } from "@/components/case-study-grid"
import { caseStudies } from "@/lib/case-studies"

export type PresentationComponentId =
  | "passiton-downstream"
  | "passiton-lifecycle"

export type PresentationSlide =
  | {
      id: string
      type: "title"
      kicker?: string
      title: string
      subtitle?: string
      note?: string
    }
  | {
      id: string
      type: "agenda"
      kicker?: string
      title: string
      items: { label: string; detail?: string }[]
      note?: string
    }
  | {
      id: string
      type: "section"
      label: string
      title: string
      image?: string
      treatAsLogo?: boolean
      tags?: string[]
      note?: string
    }
  | {
      id: string
      type: "statement"
      kicker?: string
      headline: string
      body?: string
      note?: string
    }
  | {
      id: string
      type: "bullets"
      kicker?: string
      title: string
      items: string[]
      note?: string
    }
  | {
      id: string
      type: "phases"
      kicker?: string
      title: string
      phases: { label: string; description: string }[]
      note?: string
    }
  | {
      id: string
      type: "insights"
      kicker?: string
      title: string
      items: { heading: string; body: string }[]
      note?: string
    }
  | {
      id: string
      type: "metrics"
      kicker?: string
      title?: string
      metrics: { label: string; value: string }[]
      note?: string
    }
  | {
      id: string
      type: "image"
      kicker?: string
      title?: string
      src: string
      alt: string
      caption?: string
      treatAsLogo?: boolean
      note?: string
    }
  | {
      id: string
      type: "video"
      kicker?: string
      title?: string
      src: string
      caption?: string
      note?: string
    }
  | {
      id: string
      type: "component"
      kicker?: string
      title?: string
      componentId: PresentationComponentId
      note?: string
    }
  | {
      id: string
      type: "closing"
      title: string
      subtitle?: string
      links: { label: string; href: string; external?: boolean }[]
      note?: string
    }

const vendelux = caseStudies.vendelux
const clinical = projects.find((p) => p.slug === "clinical-trials")!
const passiton = caseStudies.passiton
const games4peace = caseStudies.games4peace
const schedulink = caseStudies.schedulink
const cast = caseStudies.cast

export const presentationSlides: PresentationSlide[] = [
  {
    id: "intro",
    type: "title",
    kicker: "Live interview walkthrough",
    title: "Violet Hyun",
    subtitle:
      "Product designer at the intersection of research, storytelling, and systems thinking.",
    note: "You've seen the portfolio — this is the narrative layer for our conversation.",
  },
  {
    id: "agenda",
    type: "agenda",
    kicker: "Today",
    title: "What we'll walk through",
    items: [
      { label: "Vendelux", detail: "Current role · B2B product design" },
      { label: "Clinical Trials", detail: "Adobe Designathon · decision clarity" },
      { label: "PASSIT ON", detail: "NFC garment lifecycle · research-led" },
      { label: "Games4Peace", detail: "Play → measurable social impact" },
      { label: "ScheduLink", detail: "Spontaneous social planning" },
      { label: "C.A.S.T", detail: "Wearable postural support · ROAR Lab" },
    ],
    note: "Roughly 3–4 minutes per project — jump around as questions come up.",
  },

  // —— Vendelux ——
  {
    id: "vendelux-section",
    type: "section",
    label: "Current role",
    title: vendelux.title,
    image: vendelux.image,
    treatAsLogo: vendelux.heroTreatAsLogo,
    tags: ["2026", "Product Design Intern", "B2B SaaS"],
    note: "High level only — unreleased work stays off the record.",
  },
  {
    id: "vendelux-context",
    type: "statement",
    kicker: "Context",
    headline: "AI-powered event intelligence for B2B teams",
    body: vendelux.overview,
    note: "Emphasize systems thinking: connecting event spend to pipeline in CRM.",
  },
  {
    id: "vendelux-process",
    type: "phases",
    kicker: "How I work",
    title: vendelux.designProcess.title,
    phases: vendelux.designProcess.phases,
    note: "Mention Figma MCP + Claude for speed without losing traceability.",
  },
  {
    id: "vendelux-reflection",
    type: "statement",
    kicker: "Reflection",
    headline: "Speed without clarity creates debt",
    body: vendelux.outcome.body,
  },

  // —— Clinical Trials ——
  {
    id: "clinical-section",
    type: "section",
    label: "Adobe Designathon 2026",
    title: clinical.title,
    image: clinical.image,
    tags: clinical.tags,
    note: "48-hour sprint — focus on decision clarity and transparent AI.",
  },
  {
    id: "clinical-problem",
    type: "statement",
    kicker: "Problem",
    headline: "Clinical trial decisions are high-stakes and opaque",
    body: clinical.description,
    note: "Stakeholders need to trust AI recommendations, not just see outputs.",
  },
  {
    id: "clinical-research",
    type: "image",
    kicker: "Research",
    title: "Synthesizing vendor landscapes & stakeholder needs",
    src: "/images/clinical-trials-ux-research.png",
    alt: "Clinical trials UX research synthesis board",
    note: "Walk through how we mapped competing tools and pain points.",
  },
  {
    id: "clinical-ui",
    type: "image",
    kicker: "Solution",
    title: "Workspace designed for clarity at every step",
    src: "/images/clinical-trials-ui-01-workspace.png",
    alt: "Clinical trials platform workspace UI",
    caption: "Analysis workspace with transparent parameters and version history",
  },
  {
    id: "clinical-prototype",
    type: "video",
    kicker: "Prototype",
    title: "End-to-end flow walkthrough",
    src: "/videos/clinical-trials-prototype.mov",
    caption: "From design parameters to protocol generation and results",
    note: "Let the video play — narrate the decision points as they appear.",
  },

  // —— Pass It On ——
  {
    id: "passiton-section",
    type: "section",
    label: "Columbia · 2026",
    title: passiton.title,
    image: passiton.image,
    tags: [passiton.category, passiton.year],
    note: "Lead designer — research through functional NFC prototype.",
  },
  {
    id: "passiton-problem",
    type: "component",
    kicker: "Problem",
    title: "The impact doesn't end at the closet",
    componentId: "passiton-downstream",
    note: "Use the stats to ground the sustainability argument before the product.",
  },
  {
    id: "passiton-lifecycle",
    type: "component",
    kicker: "System view",
    title: "Making invisible garment journeys visible",
    componentId: "passiton-lifecycle",
  },
  {
    id: "passiton-insights",
    type: "insights",
    kicker: "Research",
    title: passiton.insights!.title,
    items: passiton.insights!.items,
    note: "78% prefer passing to someone specific — this drove the NFC transfer flow.",
  },
  {
    id: "passiton-hifi",
    type: "image",
    kicker: "Design",
    title: "Condition & materials at the point of transfer",
    src: "/images/passiton-hifi-condition.png",
    alt: "PASSIT ON hi-fi condition screen",
    caption: "Garment history surfaced at the moment of handoff",
  },
  {
    id: "passiton-outcome",
    type: "metrics",
    kicker: "Outcome",
    title: passiton.outcome.title,
    metrics: passiton.outcome.metrics!,
    note: "Usability 92/100, +67% pass-on intent from testing.",
  },

  // —— Games4Peace ——
  {
    id: "games4peace-section",
    type: "section",
    label: "2024–2025",
    title: games4peace.title,
    image: games4peace.image,
    tags: [games4peace.category, games4peace.year],
  },
  {
    id: "games4peace-problem",
    type: "statement",
    kicker: "Problem",
    headline: games4peace.problem!.title,
    body: games4peace.problem!.body,
  },
  {
    id: "games4peace-insights",
    type: "insights",
    kicker: "Key insights",
    title: games4peace.insights!.title,
    items: games4peace.insights!.items,
    note: "Play lowers barriers — design for casual entry, measurable exit.",
  },
  {
    id: "games4peace-screens",
    type: "image",
    kicker: "Solution",
    title: "Final screens — play that funds real impact",
    src: "/images/games4peace-final-screens.png",
    alt: "Games4Peace final UI screens",
  },
  {
    id: "games4peace-demo",
    type: "video",
    kicker: "Prototype",
    title: "Game demo",
    src: "/videos/games4peace-gamedemo.mov",
    caption: "Casual play connected to donation tracking",
  },

  // —— ScheduLink ——
  {
    id: "schedulink-section",
    type: "section",
    label: "2025",
    title: schedulink.title,
    image: schedulink.image,
    tags: schedulink.tools.slice(0, 3),
  },
  {
    id: "schedulink-problem",
    type: "statement",
    kicker: "Problem",
    headline: "Students want spontaneous connection, not calendar admin",
    body: schedulink.problem!.body,
    note: "Group chat coordination fails — passive availability is the insight.",
  },
  {
    id: "schedulink-insights",
    type: "insights",
    kicker: "Research",
    title: schedulink.insights!.title,
    items: schedulink.insights!.items,
  },
  {
    id: "schedulink-home",
    type: "image",
    kicker: "Solution",
    title: "Glanceable availability within trusted circles",
    src: "/images/schedulink-home.png",
    alt: "ScheduLink home screen showing friend availability",
    caption: "Map-based view with warm, low-anxiety visual language",
  },

  // —— CAST ——
  {
    id: "cast-section",
    type: "section",
    label: "ROAR Lab · 2025",
    title: cast.title,
    image: cast.image,
    tags: cast.tools.slice(0, 3),
    note: "NDA-limited — speak to process and outcomes, not proprietary visuals.",
  },
  {
    id: "cast-problem",
    type: "statement",
    kicker: "Problem",
    headline: "Impaired trunk control limits daily independence",
    body: cast.problem!.body,
  },
  {
    id: "cast-insights",
    type: "insights",
    kicker: "Research",
    title: cast.insights!.title,
    items: cast.insights!.items,
    note: "Comfort and dignity drove form factor — not just technical performance.",
  },
  {
    id: "cast-outcome",
    type: "metrics",
    kicker: "Outcome",
    title: cast.outcome.title,
    metrics: cast.outcome.metrics!,
  },

  // —— Close ——
  {
    id: "closing",
    type: "closing",
    title: "Questions?",
    subtitle: "Happy to go deeper on any project, process, or collaboration.",
    links: [
      { label: "Portfolio", href: "/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/violet-hyun/", external: true },
      { label: "Email", href: "mailto:violethyun@nyu.edu", external: true },
      { label: "Resume", href: "/Resume_Violet_Hyun.pdf", external: true },
    ],
    note: "Press Esc to exit fullscreen. Arrow keys to navigate.",
  },
]

export function getSlideIndexById(id: string): number {
  return presentationSlides.findIndex((slide) => slide.id === id)
}
