/**
 * Mini Violet knowledge base.
 * Only facts Violet already publishes on this site. Every project links to a real route.
 * Edit copy here; the chat UI reads everything from this file.
 */

export type Skill =
  | "ownership"
  | "research"
  | "data"
  | "ai"
  | "systems"
  | "accessibility"
  | "collaboration"
  | "interaction"

export type Intent =
  | "welcome"
  | "intro"
  | "team-fit"
  | "project-match"
  | "vendelux"
  | "process"
  | "ai-workflow"
  | "collaboration"
  | "background"
  | "philosophy"
  | "best-work"
  | "process-example"
  | "fun-fact"
  | "contact"
  | "skill"
  | "private"
  | "unknown"

export interface Project {
  id: string
  title: string
  summary: string
  evidence: string
  skills: Skill[]
  href: string
  note?: string
  priority: number
}

export interface Prompt {
  id: string
  label: string
  intent: Intent
  skill?: Skill
}

export interface Answer {
  body: string[]
  projectIds: string[]
  /** Optional one-line blurb per project card, replacing its default summary. */
  projectNotes?: Record<string, string>
  next: string[]
}

export const PROJECTS: Project[] = [
  {
    id: "vendelux",
    title: "Vendelux",
    summary: "Designing how event teams target, plan, and connect",
    evidence:
      "Designs the tools event teams use to build target audiences, manage campaigns, and plan meetings, working inside the Product and Engineering team.",
    skills: ["ownership", "data", "collaboration", "ai", "systems"],
    href: "/work/vendelux",
    note: "Password protected. Ask Violet for access.",
    priority: 1,
  },
  {
    id: "passiton",
    title: "PASSIT ON",
    summary: "Designing traceable garment lifecycles",
    evidence:
      "Surveyed 50 Gen Z respondents, then led research and end-to-end design of an NFC-tagged garment app with a working web prototype.",
    skills: ["research", "ownership", "systems", "interaction"],
    href: "/work/passiton",
    priority: 2,
  },
  {
    id: "greener-routes",
    title: "Greener Walking Routes",
    summary: "Designing walking routes around how a walk feels",
    evidence:
      "Built a green exposure metric from NYC Parks data in Grasshopper, then a clickable app that trades a minute of walking for a greener route.",
    skills: ["data", "systems", "ai", "interaction"],
    href: "/work/greener-routes",
    priority: 3,
  },
  {
    id: "clinical-trials",
    title: "Altrovia, Adobe Designathon",
    summary: "Designing decision clarity in clinical trial systems",
    evidence:
      "Redesigned a data-heavy clinical intelligence workspace in a 10-hour sprint, focused on trust in AI signals and a calmer hierarchy.",
    skills: ["data", "ai", "interaction", "collaboration"],
    href: "/work/clinical-trials",
    priority: 4,
  },
  {
    id: "games4peace",
    title: "Games4Peace",
    summary: "Turning casual play into measurable social impact",
    evidence:
      "Took a giving platform from competitive analysis and SWOT through wireframes to final screens, designing for motivation, not just clicks.",
    skills: ["research", "interaction", "ownership"],
    href: "/work/games4peace",
    priority: 5,
  },
  {
    id: "cast",
    title: "C.A.S.T, Columbia ROAR Lab",
    summary: "Restoring postural control with a wearable",
    evidence:
      "Worked with researchers and people with spinal cord injuries on an assistive vest and a single-button control system.",
    skills: ["accessibility", "research", "collaboration"],
    href: "/work/cast",
    priority: 6,
  },
  {
    id: "schedulink",
    title: "Schedulink",
    summary: "Real-time availability for social planning",
    evidence:
      "Designed onboarding, privacy settings, and a small design system for students coordinating spontaneous plans.",
    skills: ["interaction", "systems"],
    href: "/work/schedulink",
    priority: 7,
  },
]

export const SKILL_LABELS: Record<Skill, string> = {
  ownership: "End-to-end ownership",
  research: "UX research",
  data: "Data-heavy B2B UX",
  ai: "AI-assisted prototyping",
  systems: "Systems thinking",
  accessibility: "Accessibility",
  collaboration: "Working with engineers",
  interaction: "Interaction design",
}

export const PROMPTS: Record<string, Prompt> = {
  intro: { id: "intro", label: "Who is Violet?", intent: "intro" },
  team: { id: "team", label: "What would Violet bring to our team?", intent: "team-fit" },
  match: { id: "match", label: "Find a project for me", intent: "project-match" },
  vendelux: { id: "vendelux", label: "What does she do at Vendelux?", intent: "vendelux" },
  best: { id: "best", label: "Show me her best work", intent: "best-work" },
  process: { id: "process", label: "How does she solve complex problems?", intent: "process" },
  "process-example": { id: "process-example", label: "Show me an example", intent: "process-example" },
  fun: { id: "fun", label: "What's something not on her resume?", intent: "fun-fact" },
  ai: { id: "ai", label: "How does she use AI?", intent: "ai-workflow" },
  collab: { id: "collab", label: "How does she work with engineers?", intent: "collaboration" },
  background: { id: "background", label: "What's her background?", intent: "background" },
  philosophy: { id: "philosophy", label: "What does she care about?", intent: "philosophy" },
  contact: { id: "contact", label: "How can I reach her?", intent: "contact" },
  ...Object.fromEntries(
    (Object.keys(SKILL_LABELS) as Skill[]).map((skill) => [
      `skill-${skill}`,
      { id: `skill-${skill}`, label: SKILL_LABELS[skill], intent: "skill" as Intent, skill },
    ]),
  ),
}

export const WELCOME_PROMPTS = ["team", "best", "process", "fun"]

export const SKILL_PROMPTS = ["ownership", "research", "data", "ai", "accessibility", "collaboration"].map(
  (s) => `skill-${s}`,
)

export const ANSWERS: Record<Exclude<Intent, "skill" | "project-match">, Answer> = {
  welcome: {
    body: [
      "Hi! I'm Mini Violet 👋 Think of me as your shortcut to getting to know Violet. Want to explore her work or see what she'd bring to your team?",
    ],
    projectIds: [],
    next: WELCOME_PROMPTS,
  },
  intro: {
    body: [
      "Violet Hyun is a product designer on Vendelux's Product and Engineering team, designing how event teams target, plan, and connect.",
      "She makes complex information approachable, drawing on Interactive Media Arts at NYU Tisch and Computational Design Practices at Columbia GSAPP.",
    ],
    projectIds: ["vendelux", "greener-routes"],
    next: ["team", "process", "match"],
  },
  "team-fit": {
    body: [
      "Violet brings product ownership, creative problem-solving, and technical curiosity. At Vendelux, she collaborated with PMs and engineers to ship customer-facing features in a fast-paced startup. She's great at turning complex problems into intuitive experiences and moving ideas from concept to launch.",
      "Want to see her work in action?",
    ],
    projectIds: [],
    next: ["best", "process", "fun"],
  },
  vendelux: {
    body: [
      "Violet is a Product Designer on Vendelux's Product and Engineering team. Vendelux is an AI-powered event intelligence platform.",
      "She designs how event teams build target audiences, manage outreach campaigns, and plan meetings, across both customer-facing and internal tools.",
    ],
    projectIds: ["vendelux"],
    next: ["collab", "ai", "match"],
  },
  process: {
    body: [
      "Violet starts by understanding what users actually need, then explores solutions through research, rapid prototyping, and collaboration. She loves experimenting with AI and emerging technologies to move faster while keeping the experience intuitive and thoughtful.",
      "Want to see an example of her design process?",
    ],
    projectIds: [],
    next: ["process-example", "ai", "best"],
  },
  "process-example": {
    body: [
      "PASSIT ON shows it end to end. Violet ran surveys and interviews with Gen Z first, then designed and prototyped an NFC garment app around what she learned.",
    ],
    projectIds: ["passiton"],
    next: ["best", "team", "fun"],
  },
  "best-work": {
    body: ["Here are three projects worth exploring! ✨", "Which one catches your eye?"],
    projectIds: ["vendelux", "passiton", "greener-routes"],
    projectNotes: {
      vendelux: "Simplifying complex B2B workflows to help event marketers find and manage target audiences.",
      passiton: "Making clothing ownership more transparent through NFC technology and digital garment passports.",
      "greener-routes": "Using geospatial data to design smarter navigation based on shade and greenery.",
    },
    next: ["process", "team", "fun"],
  },
  "fun-fact": {
    body: [
      "Fun fact! Violet started as an artist before becoming a product designer. 🎨 She loves turning everyday observations into creative solutions, especially when technology can make people's lives a little easier.",
      "And yes, her love for playful interactions is probably why I exist! 🤭",
    ],
    projectIds: [],
    next: ["best", "team", "contact"],
  },
  "ai-workflow": {
    body: [
      "Violet uses AI to explore and prototype faster, with tools like Claude Code, Cursor, Figma MCP, and Claude Design, then reviews the output by hand for usability, edge cases, and design system consistency.",
      "The Greener Routes prototype and the Altrovia sprint are good examples.",
    ],
    projectIds: ["greener-routes", "clinical-trials"],
    next: ["process", "collab"],
  },
  collaboration: {
    body: [
      "She works inside Vendelux's Product and Engineering team and brings engineers in early, so designs come with the specs and states they need to build.",
      "Outside of work she has led cross-disciplinary teams, including researchers and patients at Columbia's ROAR Lab.",
    ],
    projectIds: ["vendelux", "cast"],
    next: ["process", "team"],
  },
  background: {
    body: [
      "Violet studied Interactive Media Arts at NYU Tisch and an M.S. in Computational Design Practices at Columbia GSAPP.",
      "Before Vendelux she led web design and research at Columbia's ROAR Lab and designed for Miss K Cosmetics and K Museum of Contemporary Art, with merchandising at Chloé.",
    ],
    projectIds: ["cast"],
    next: ["philosophy", "team", "contact"],
  },
  philosophy: {
    body: [
      "She cares about the gap between knowing something and caring about it. Good design closes that gap and changes what people actually do.",
      "That idea runs through PASSIT ON, which makes a garment's history visible so keeping it can compete with buying new.",
    ],
    projectIds: ["passiton", "greener-routes"],
    next: ["process", "match"],
  },
  contact: {
    body: [
      "The best way to reach Violet is LinkedIn or email. That's also how to ask for the Vendelux case study password.",
    ],
    projectIds: [],
    next: ["team", "match"],
  },
  private: {
    body: [
      "I only share what Violet has published in her portfolio. For anything else, like availability or logistics, please reach out to her directly.",
    ],
    projectIds: [],
    next: ["contact", "team"],
  },
  unknown: {
    body: [
      "I don't have a reliable answer to that yet. I can tell you about Violet's projects, process, use of AI, or experience instead.",
    ],
    projectIds: [],
    next: WELCOME_PROMPTS,
  },
}

export const CONTACT_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/violet-hyun/" },
  { label: "Email", href: "mailto:violethyun@nyu.edu" },
]
