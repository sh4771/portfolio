import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ClinicalTrialsVisualCaseStudy } from "@/components/clinical-trials/clinical-trials-visual-case-study"
import { SectionTracker } from "@/components/section-tracker"

const sections = [
  { id: "overview", label: "Project overview" },
  { id: "demo", label: "Demo" },
  { id: "problem", label: "Problem discovery" },
  { id: "approach", label: "Our approach" },
  { id: "trust", label: "Building trust" },
  { id: "research", label: "UX research" },
  { id: "visual", label: "Visual system" },
  { id: "build", label: "How we built it" },
  { id: "challenges", label: "Design challenges" },
  { id: "feedback", label: "User feedback" },
  { id: "final", label: "Final UI" },
  { id: "fixed", label: "What we fixed" },
  { id: "more-time", label: "If we had more time" },
  { id: "note", label: "Personal note" },
]

export default function Page() {
  return (
    <>
    <SectionTracker
      sections={sections}
      activeClass="text-[#111111] opacity-100"
      dotActiveClass="bg-[#3D6469]"
      mutedClass="text-[#111111]/60"
      dotMutedClass="bg-[#111111]/25"
      jumpButtonClass="border-[#111111]/15 bg-white/80 text-[#111111]/70 hover:text-[#111111] hover:border-[#3D6469]/40"
    />
    <main className="min-h-screen bg-[#F2EDE2] px-4 py-12 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-[1100px] space-y-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5F6672] transition-colors hover:text-[#3D6469]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <ClinicalTrialsVisualCaseStudy prototypeVideoSrc="/videos/clinical-trials-prototype.mov#t=3" />

        <div className="h-px w-full bg-[#3D6469]" />
        <div className="pt-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6672]">Continue</p>
          <Link
            href="/#work"
            className="mt-2 inline-block text-sm font-semibold text-[#111111] transition-colors hover:text-[#3D6469]"
          >
            View all projects
          </Link>
        </div>
      </div>
    </main>
    </>
  )
}
