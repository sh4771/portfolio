import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ClinicalTrialsVisualCaseStudy } from "@/components/clinical-trials/clinical-trials-visual-case-study"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F2EDE2] px-4 py-12 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-[1100px] space-y-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#578186]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <ClinicalTrialsVisualCaseStudy prototypeVideoSrc="/videos/clinical-trials-prototype.mov" />

        <div className="h-px w-full bg-[#578186]" />
        <div className="pt-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7280]">Continue</p>
          <Link
            href="/#work"
            className="mt-2 inline-block text-sm font-semibold text-[#111111] transition-colors hover:text-[#578186]"
          >
            View all projects
          </Link>
        </div>
      </div>
    </main>
  )
}
