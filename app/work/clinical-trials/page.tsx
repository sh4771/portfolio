import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { FigmaCaseStudySections } from "@/components/clinical-trials/figma-case-study-sections"

export default function Page() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground transition-colors duration-300 md:px-8">
      <div className="mx-auto max-w-[1100px] space-y-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <header className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-normal tracking-tight md:text-3xl">
              Designing Decision Clarity in Clinical Trial Systems
            </h1>
            <p className="text-sm text-foreground/50">UI/UX Design @ Adobe Designathon</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4 pt-2 text-sm">
            <div>
              <span className="mb-1 block text-xs text-foreground/40">Team</span>
              <span className="text-foreground/70">Violet Hyun, Hongxin Li</span>
            </div>
            <div>
              <span className="mb-1 block text-xs text-foreground/40">Timeline</span>
              <span className="text-foreground/70">April 2026</span>
            </div>
            <div>
              <span className="mb-1 block text-xs text-foreground/40">What I did</span>
              <span className="text-foreground/70">Research, UX/UI Design, Strategy, Prototyping</span>
            </div>
          </div>

          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-foreground/60">
            Led research and end-to-end design of a clinical trial intelligence platform focused on improving
            decision-making in high-stakes, data-heavy environments. Conducted user interviews to define target users
            and their decision needs, then developed a design strategy centered on trust, clarity, and actionability.
            Redesigned the dashboard experience to prioritize key insights, increase transparency of AI-generated
            recommendations, and guide users toward confident decisions.
          </p>

          <div className="relative mt-6 h-[280px] w-full overflow-hidden rounded-2xl border border-border/60 md:h-[360px] lg:h-[420px]">
            <Image
              src="/images/clinical-trials-hero.png"
              alt="Clinical trial intelligence dashboard mockup on a desktop monitor"
              width={1024}
              height={631}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
        </header>

        <div className="border-t border-border/60 pt-4">
          <p className="mb-6 text-xs text-muted-foreground">
            Case study sections below mirror the Altrovia Redesign Figma file (nodes 178:2, 182:2, 178:12, 181:352,
            178:34, 178:122, 178:64, 253:2, 181:285, 178:202, 181:239, 181:378). Raster assets load from Figma MCP URLs
            and may need to be re-exported after they expire.
          </p>
          <FigmaCaseStudySections prototypeVideoSrc="/videos/clinical-trials-prototype.mov" />
        </div>

        <div className="border-t border-border/80 pt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">Continue</p>
          <Link
            href="/#work"
            className="mt-2 inline-block text-base tracking-tight text-foreground transition-colors hover:text-foreground/70"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
