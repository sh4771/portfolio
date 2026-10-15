import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ClinicalTrialsVisualCaseStudy } from "@/components/clinical-trials/clinical-trials-visual-case-study"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"


export default function Page() {
  return (
    <>
    <Navigation />
    <main className="pt-32 pb-24">
      <div className="mx-auto w-full max-w-[900px] px-6">
        <Link
          href="/#work"
          className="mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <ClinicalTrialsVisualCaseStudy prototypeVideoSrc="/videos/clinical-trials-prototype.mov#t=3" />

        <div className="mt-24">
          <ContinueLink />
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
