/**
 * Resume content, copied from Resume_Violet_Hyun.pdf. Numbers in **double stars**
 * render bold, matching the PDF.
 */
export type ResumeEntry = {
  name: string
  role: string
  when?: string
  link?: string
  logo?: string
  /** Used for a favicon when there is no local logo file. */
  domain?: string
  bullets: string[]
}

export const RESUME_PDF = "/Resume_Violet_Hyun.pdf"

export const EXPERIENCE: ResumeEntry[] = [
  {
    name: "Vendelux",
    role: "Product Designer · B2B Sales Intelligence Platform",
    when: "Mar 2026 – Present",
    logo: "/images/logos/vendelux.png",
    bullets: [
      "Replaced a manual CRM export-and-filter process (**~30** min) with instant, self-serve filtering (under **1** min); the **38** segments created in week one were queried **50+** times each on average, nearly **2,000** queries total.",
      "Designed and launched a web-based event platform from **0** to **1**, growing engagement **1.8x** (**0.44** to **0.79** actions per query).",
      "Transformed one-off components into a reusable schema across **4** product surfaces, and introduced a documentation workflow the team adopted for testing new components.",
      "Ran usability testing with **4** Forward Deployed Engineers and redesigned their internal campaign tool, incorporating direct feedback and resolving requirements same-day before launch.",
    ],
  },
  {
    name: "Columbia Robotics and Rehabilitation Lab",
    role: "Web Designer & Graduate Researcher",
    when: "May 2025 – Mar 2026",
    logo: "/images/logos/columbia.png",
    bullets: [
      "Designed the interaction model and vest for C.A.S.T., a wearable for SCI patients, featuring **3** gesture-based control modes.",
      "Built and shipped the lab's site end to end, serving **4** distinct audiences from one content system.",
    ],
  },
  {
    name: "Stealth Startup",
    role: "User Experience Designer · AI-Native Scheduling App for Students",
    when: "Nov 2025 – Jan 2026",
    bullets: [
      "Shipped **200+** screens from concept to launch as the lead designer on a **4**-person team.",
      "Took the MVP from concept to shipped in **2** weeks, partnering with the CTO and engineers throughout.",
    ],
  },
]

export const PROJECTS: ResumeEntry[] = [
  {
    name: "PASSIT ON",
    role: "Advised by Michael Krisch",
    link: "/work/passiton",
    bullets: [
      "Built an NFC-based garment tracking platform addressing textile waste flowing into Ghana's Kantamanto Market.",
      "Presented to **70+** people and ran **3** rounds of usability testing with **30** users; **25** specifically cited the storytelling approach as the platform's strongest element.",
    ],
  },
  {
    name: "Greener Walking Routes",
    role: "Advised by Meli Harvey, Luc Wilson",
    link: "/work/greener-routes",
    bullets: [
      "Prototyped a walking-navigation tool favoring green exposure over speed, capping detours at **15%**.",
      "Gathered feedback from **20** real users, all of whom responded positively to the concept.",
    ],
  },
]

export const LEADERSHIP: ResumeEntry[] = [
  {
    name: "Design and Engineering Club, NYU",
    role: "Founder & President",
    when: "May 2023 – Dec 2024",
    domain: "nyu.edu",
    bullets: ["Founded a cross-disciplinary community of **50+** members bridging technology and art from zero, setting strategy and mission, and built visibility through campus club festivals and workshops."],
  },
  {
    name: "Women in Computing, NYU",
    role: "Event Coordinator",
    when: "May 2023 – Dec 2024",
    domain: "nyu.edu",
    bullets: ["Partnered with NYU alumni and industry professionals to run portfolio reviews and workshops that helped place **30+** women in roles."],
  },
]

/** Earlier roles from LinkedIn that the one-page PDF leaves out. */
export const EARLIER = [
  { name: "Chloé (Richemont)", role: "Merchandising Assistant", when: "Aug 2023 – Jan 2024", logo: "/images/logos/richemont.png", href: "https://www.chloe.com/" },
  { name: "Miss K Cosmetics", role: "Product Designer", when: "Jul – Sep 2023", logo: "/images/logos/miss-k.png", href: "https://misskcosmetics.com/" },
  { name: "K Museum of Contemporary Art", role: "Creative Intern", when: "Jun – Sep 2022", logo: "/images/logos/kmca.png", href: "https://www.kmcaseoul.org/" },
]

export const EDUCATION = [
  { when: "Aug 2026", school: "Columbia University, GSAPP", degree: "M.S. Computational Design Practices, HCI", logo: "/images/logos/columbia.png" },
  { when: "Dec 2024", school: "NYU, Tisch School of the Arts", degree: "B.F.A. Interactive Media Arts, CS Minor", domain: "nyu.edu" },
]

export const COURSEWORK = ["Mapping Systems", "Design in Methods", "Spatial UX", "Computational Modeling", "Prototyping in Urban Tech"]

export const SKILLS = [
  { k: "Agentic AI", v: "Claude Code, Claude MCP, Cursor, Figma Make, V0" },
  { k: "Design", v: "Figma, Adobe CS, Framer, Squarespace" },
  { k: "Research", v: "User Interviews, Usability Testing, A/B Testing" },
]
