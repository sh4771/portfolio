import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { AdhdPlannerCaseStudy } from "@/components/adhd-planner/case-study"

export const metadata = {
  title: "Dump It, Don't Plan It · Violet Hyun",
  description: "An ADHD day planner that turns a messy brain dump into a scheduled, reminded day.",
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="site-col space-y-16">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <AdhdPlannerCaseStudy />
          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
