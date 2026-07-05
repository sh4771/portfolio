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
      type: "subsection"
      number?: string
      title: string
      subtitle?: string
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
      variant?: "default" | "screenshot"
      note?: string
    }
  | {
      id: string
      type: "gallery"
      kicker?: string
      title: string
      caption?: string
      images: { src: string; alt: string; label?: string }[]
      columns?: 2 | 3
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
    title: "Violet Hyun",
    subtitle:
      "Product designer at the intersection of research, storytelling, and systems thinking.",
    note: "You've seen the portfolio — this is the narrative layer for our conversation.",
  },
  {
    id: "tools",
    type: "agenda",
    kicker: "Toolbox",
    title: "Key tools I work with",
    items: [
      { label: "Claude", detail: "Ideation, specs, and accelerating the design → ticket loop" },
      { label: "Figma MCP", detail: "Design system sync and Figma ↔ codebase bridge" },
      { label: "Cursor", detail: "Rapid prototyping and building alongside design" },
      { label: "Linear", detail: "Ticket hygiene, handoff docs, and traceable decisions" },
      { label: "v0", detail: "UI exploration and component direction" },
      { label: "Always learning", detail: "Passionate about picking up new tools as workflows evolve" },
    ],
    note: "Manager called out AI use explicitly — tie tools to real Vendelux examples.",
  },

  // —— Vendelux ——
  {
    id: "vendelux-section",
    type: "section",
    label: "Current role · Product Design Intern",
    title: vendelux.title,
    image: vendelux.image,
    treatAsLogo: vendelux.heroTreatAsLogo,
    tags: ["2026", "B2B SaaS", "AI-powered event intelligence"],
    note: "Three shipped projects in your first 30 days — this is the main interview story.",
  },
  {
    id: "vendelux-overview",
    type: "statement",
    kicker: "First 30 days",
    headline: "Three projects, one through-line: clarity at scale",
    body: "Segments redesign, a site-wide UI refresh grounded in a new design system, and a new Event Organizer platform — each shipped in tight collaboration with PMs and engineers, with fast post-launch iteration from real user feedback.",
    note: "Frame this as systems thinking: diagnose inconsistency, build foundations, ship, then iterate.",
  },

  // Project 1: Segments
  {
    id: "vendelux-segments",
    type: "subsection",
    number: "01",
    title: "Segments (Clementine) Redesign",
    subtitle: "Biggest project in my first 30 days — 1 PM, 2 software engineers",
    tags: ["30 days", "Filter UI", "Component library"],
    note: "This is the deepest project — spend the most time here if they ask about process.",
  },
  {
    id: "vendelux-segments-start",
    type: "statement",
    kicker: "How I started",
    headline: "Audited the current segment UI and annotated issues in Figma",
    body: "Before proposing solutions, I mapped readability problems, inconsistent patterns, and confusing filter states — then used those annotations to align the team on what needed to change.",
    note: "Emphasize diagnosis before design — you didn't jump to pixels.",
  },
  {
    id: "vendelux-segments-prelaunch-discovery",
    type: "gallery",
    kicker: "Pre-launch",
    title: "Discovery & annotations — calling out readability and inconsistency",
    images: [
      {
        src: "/images/presentation/vendelux/segments-annotated-issues.png",
        alt: "Figma annotations on Segments filter UI",
        label: "Annotated filter states, color semantics, and contrast issues",
      },
      {
        src: "/images/presentation/vendelux/segments-iterations-overview.png",
        alt: "Figma board showing Segments redesign iterations",
        label: "Current version → v1 → v2 → final",
      },
    ],
    caption: "Flagged issues in Figma comments before redesigning — aligned PM and engineers on what to fix",
    note: "Point to exclude-tag color feedback and the 'All | Clear' readability issue.",
  },
  {
    id: "vendelux-segments-prelaunch-system",
    type: "gallery",
    kicker: "Pre-launch",
    title: "Component library & engineering handoff specs",
    images: [
      {
        src: "/images/presentation/vendelux/segments-component-library.png",
        alt: "Component library for FilterToggle, SectionHeader, SaveView, and toasts",
        label: "Component library · DEV-6912",
      },
      {
        src: "/images/presentation/vendelux/segments-figma-specs.png",
        alt: "Figma specs for sidebar and column selection",
        label: "Interaction, dev & content tags for engineers",
      },
    ],
    caption: "FilterToggle, SectionHeader, Footer, SelectedButton, Status, SaveView — blue = interaction, green = dev, orange = content",
    note: "Shows systems thinking — not one-off screens.",
  },
  {
    id: "vendelux-segments-shipped",
    type: "metrics",
    kicker: "Shipped in 12 days",
    title: "What went to production",
    metrics: [
      { label: "Sidebar filter panel", value: "DEV-6909" },
      { label: "Column picker", value: "DEV-6910" },
      { label: "New Segment modal", value: "DEV-6911" },
      { label: "Component library", value: "DEV-6912" },
      { label: "Filter tooltips", value: "DEV-6913" },
    ],
    note: "Five tickets created in week one, all shipped within 12 days.",
  },
  {
    id: "vendelux-segments-launch",
    type: "image",
    kicker: "Launch",
    title: "Segments went live across all customer accounts",
    src: "/images/presentation/vendelux/segments-launch-announcement.png",
    alt: "Slack product-news announcement celebrating Segments launch with team shoutouts",
    variant: "screenshot",
    caption: "#product-news — biggest audience upgrade since lists launched, with shoutout to the design team",
    note: "Celebrate the launch — you were tagged in the shoutout. Mention live filtering, include/exclude, and no 250k cap.",
  },

  // Segments post-launch iteration
  {
    id: "vendelux-segments-postlaunch",
    type: "subsection",
    number: "↻",
    title: "Segments · Post-launch iteration",
    subtitle: "Real user feedback → Linear tickets → immediate changes",
    tags: ["User feedback", "Linear", "AI-assisted workflow"],
  },
  {
    id: "vendelux-segments-postlaunch-tickets",
    type: "gallery",
    kicker: "Post-launch",
    title: "Feedback became tickets — shipped within days",
    images: [
      {
        src: "/images/presentation/vendelux/post-launch-linear-tickets.png",
        alt: "Linear tickets for post-launch Segments iterations",
        label: "Linear · DEV-7042, DEV-7062, DEV-7083",
      },
      {
        src: "/images/presentation/vendelux/segments-slack-linear-tickets.png",
        alt: "Slack thread where Claude creates Linear UAT tickets",
        label: "PM used Claude to file UAT tickets from Slack",
      },
    ],
    caption: "Duplicate keyword bug → two Linear tickets with UAT labels, same day",
    note: "AI accelerated the feedback loop — you owned the design response.",
  },
  {
    id: "vendelux-segments-postlaunch-feedback",
    type: "gallery",
    kicker: "Post-launch",
    title: "User & team feedback drove immediate design changes",
    columns: 3,
    images: [
      {
        src: "/images/presentation/vendelux/segments-slack-keyword-feedback.png",
        alt: "Slack thread about segment keyword limits",
        label: "303 job titles → fuzzy-match categories",
      },
      {
        src: "/images/presentation/vendelux/post-launch-slack-segment-feedback.png",
        alt: "Slack thread about segment scope in event reports",
        label: "Segment scope vs. report output",
      },
      {
        src: "/images/presentation/vendelux/post-launch-slack-ui-feedback.png",
        alt: "Slack feedback about employee range filter chips",
        label: "'1k–5k 20' chip format confusion",
      },
    ],
    caption: "Engineering constraints, customer support, and internal QA — each surfaced a design iteration",
    note: "Shows you respond to technical constraints and real usage, not just visual polish.",
  },

  // Project 2: Site-wide redesign
  {
    id: "vendelux-redesign",
    type: "subsection",
    number: "02",
    title: "Site-wide UI Redesign",
    subtitle: "Proposed during product & engineering standup",
    tags: ["Design system", "UI consistency"],
  },
  {
    id: "vendelux-redesign-origin",
    type: "statement",
    kicker: "How it started",
    headline: "Flagged inconsistent UI in standup — proposed restarting with a design system",
    body: "During a product and engineering standup, I raised that our interfaces had drifted — inconsistent typography, spacing, and component patterns. I proposed stepping back to build a shared design system, then redesigning the site on that foundation.",
    note: "This shows initiative — you didn't wait to be asked. You identified the systemic problem.",
  },
  {
    id: "vendelux-redesign-iterations",
    type: "image",
    kicker: "Pre-launch · Iterations",
    title: "Typography, components, and page layouts rebuilt from scratch",
    src: "/images/presentation/vendelux/redesign-iterations-overview.png",
    alt: "Figma board showing site-wide redesign iterations including typography and component sheets",
    variant: "screenshot",
    caption: "Design system foundations → table layouts → page-level compositions",
  },

  // Project 3: Event Organizer platform
  {
    id: "vendelux-event-organizer",
    type: "subsection",
    number: "03",
    title: "Event Organizer Platform",
    subtitle: "30-day sprint from weekly standup",
    tags: ["New product", "Goal-setting", "Campaign creation"],
  },
  {
    id: "vendelux-event-organizer-brief",
    type: "insights",
    kicker: "The brief",
    title: "A new platform for event organizers",
    items: [
      {
        heading: "Target audience",
        body: "Event organizers creating campaigns — they need to set specific goals when launching outreach.",
      },
      {
        heading: "Biggest product shift",
        body: "Users can now reach the right people — sponsors, event directors, marketing leads — when organizing, not just browse a static list.",
      },
      {
        heading: "Timeline",
        body: "Scoped and designed within a 30-day window, presented at weekly standup alongside Segments and the redesign.",
      },
    ],
    note: "The goal-setting + stakeholder communication angle is the differentiator — lead with that.",
  },
  {
    id: "vendelux-event-organizer-screens",
    type: "gallery",
    kicker: "Event Organizer",
    title: "Events dashboard, campaign goals, and direct organizer messaging",
    columns: 3,
    images: [
      {
        src: "/images/presentation/vendelux/event-organizer-events-dashboard.png",
        alt: "Events dashboard with goal progress and pipeline metrics",
        label: "Events · goal progress at a glance",
      },
      {
        src: "/images/presentation/vendelux/event-organizer-create-campaign.png",
        alt: "Create campaign flow with live forecasted results",
        label: "Create campaign · live forecasts",
      },
      {
        src: "/images/presentation/vendelux/event-organizer-messaging.png",
        alt: "Messaging interface for event directors and sponsors",
        label: "Messaging · reach the right stakeholders",
      },
    ],
    caption: "Organizers set goals upfront, see forecasted results live, and message sponsors, directors, and marketing leads",
    note: "Lead with goal-setting + stakeholder communication as the differentiator.",
  },

  // Manager feedback
  {
    id: "vendelux-manager-review",
    type: "image",
    kicker: "30-day review",
    title: "Manager feedback — what landed and what I'm building on",
    src: "/images/presentation/vendelux/manager-30-day-review.png",
    alt: "30-day performance review from manager Gina Bochis highlighting shipped work",
    variant: "screenshot",
    note: "She loved AI use and taking feedback. Growth area: speak more confidently in standups.",
  },
  {
    id: "vendelux-manager-insights",
    type: "insights",
    kicker: "Reflection",
    title: "What I'm carrying forward",
    items: [
      {
        heading: "Strength: AI as a multiplier",
        body: "Using Claude, Figma MCP, and Cursor to move faster without skipping specs — my manager called this out explicitly.",
      },
      {
        heading: "Strength: Feedback → action",
        body: "Post-launch Slack threads became Linear tickets and design updates within days, not weeks.",
      },
      {
        heading: "Growth: Voice in the room",
        body: "I'm working on speaking more confidently in standups — the redesign proposal is an example of doing that.",
      },
    ],
    note: "End Vendelux here unless they want to go deeper on a specific ticket.",
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
