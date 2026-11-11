import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Resume · Violet Hyun",
  description: "Violet Hyun, Product Designer based in New York City.",
}

/* Numbers in **double stars** render bold, matching the PDF. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

type Entry = { name: string; role: string; when?: string; link?: string; bullets: string[] }

const EXPERIENCE: Entry[] = [
  {
    name: "Vendelux",
    role: "Product Designer · B2B Sales Intelligence Platform",
    when: "Mar 2026 – Present",
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

const PROJECTS: Entry[] = [
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

const LEADERSHIP: Entry[] = [
  {
    name: "Design and Engineering Club, NYU",
    role: "Founder & President",
    when: "May 2023 – Dec 2024",
    bullets: ["Founded a cross-disciplinary community of **50+** members bridging technology and art from zero, setting strategy and mission, and built visibility through campus club festivals and workshops."],
  },
  {
    name: "Women in Computing, NYU",
    role: "Event Coordinator",
    when: "May 2023 – Dec 2024",
    bullets: ["Partnered with NYU alumni and industry professionals to run portfolio reviews and workshops that helped place **30+** women in roles."],
  },
]

const EDUCATION = [
  { when: "Aug 2026", school: "Columbia University, GSAPP", degree: "M.S. Computational Design Practices, HCI" },
  { when: "Dec 2024", school: "NYU, Tisch School of the Arts", degree: "B.F.A. Interactive Media Arts, CS Minor" },
]

const COURSEWORK = ["Mapping Systems", "Design in Methods", "Spatial UX", "Computational Modeling", "Prototyping in Urban Tech"]

const SKILLS = [
  { k: "Agentic AI", v: "Claude Code, Claude MCP, Cursor, Figma Make, V0" },
  { k: "Design", v: "Figma, Adobe CS, Framer, Squarespace" },
  { k: "Research", v: "User Interviews, Usability Testing, A/B Testing" },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="border-b border-border/60 pb-3 text-xs font-semibold tracking-[0.14em] text-foreground/55 uppercase">{children}</h2>
}

function EntryBlock({ e }: { e: Entry }) {
  return (
    <article className="space-y-2.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[17px] font-semibold tracking-tight">
          {e.link ? (
            <Link href={e.link} className="group inline-flex items-center gap-1 hover:underline hover:decoration-foreground/30 hover:underline-offset-4">
              {e.name}
              <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-colors group-hover:text-foreground" />
            </Link>
          ) : (
            e.name
          )}
        </h3>
        {e.when ? <span className="text-sm tabular-nums text-foreground/50">{e.when}</span> : null}
      </div>
      <p className="text-sm text-foreground/55">{e.role}</p>
      <ul className="space-y-2 pt-1">
        {e.bullets.map((b) => (
          <li key={b} className="relative pl-5 text-[15px] leading-relaxed text-foreground/70 text-pretty before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-foreground/40">
            <Rich text={b} />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function ResumePage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-28">
        <div className="mx-auto w-full max-w-[1040px] px-6">
          {/* Header */}
          <header className="flex flex-col gap-6 border-b border-border/60 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Violet Hyun</h1>
              <p className="text-lg text-foreground/80">Product Designer Based in New York City</p>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/55">
                <a href="mailto:violethyun@nyu.edu" className="hover:text-foreground">violethyun@nyu.edu</a>
                <span aria-hidden className="text-foreground/25">|</span>
                <Link href="/" className="hover:text-foreground">violethyun.com</Link>
                <span aria-hidden className="text-foreground/25">|</span>
                <a href="https://www.linkedin.com/in/violet-hyun" target="_blank" rel="noreferrer" className="hover:text-foreground">linkedin.com/in/violet-hyun</a>
              </p>
            </div>
            <a
              href="/Resume_Violet_Hyun.pdf"
              download
              className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </header>

          <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_280px] lg:gap-16">
            {/* Main column */}
            <div className="space-y-14">
              <section className="space-y-8">
                <SectionTitle>Experience</SectionTitle>
                {EXPERIENCE.map((e) => (
                  <EntryBlock key={e.name} e={e} />
                ))}
              </section>
              <section className="space-y-8">
                <SectionTitle>Projects</SectionTitle>
                {PROJECTS.map((e) => (
                  <EntryBlock key={e.name} e={e} />
                ))}
              </section>
              <section className="space-y-8">
                <SectionTitle>Leadership</SectionTitle>
                {LEADERSHIP.map((e) => (
                  <EntryBlock key={e.name} e={e} />
                ))}
              </section>
            </div>

            {/* Side column */}
            <aside className="space-y-12 lg:sticky lg:top-28 lg:self-start">
              <section className="space-y-6">
                <SectionTitle>Education</SectionTitle>
                {EDUCATION.map((ed) => (
                  <div key={ed.school} className="space-y-1">
                    <p className="text-sm tabular-nums text-foreground/50">{ed.when}</p>
                    <p className="font-semibold tracking-tight">{ed.school}</p>
                    <p className="text-sm text-foreground/60">{ed.degree}</p>
                  </div>
                ))}
              </section>
              <section className="space-y-5">
                <SectionTitle>Coursework</SectionTitle>
                <ul className="flex flex-wrap gap-2">
                  {COURSEWORK.map((c) => (
                    <li key={c} className="rounded-full border border-border/70 px-3 py-1 text-sm text-foreground/70">
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="space-y-5">
                <SectionTitle>Skills</SectionTitle>
                {SKILLS.map((s) => (
                  <div key={s.k} className="space-y-1">
                    <p className="text-sm font-semibold">{s.k}</p>
                    <p className="text-sm text-foreground/60">{s.v}</p>
                  </div>
                ))}
              </section>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
