import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { CaseHero } from "@/components/case-hero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { VendeluxCaseStudies } from "@/components/vendelux/vendelux-case-studies"

export const metadata = {
  title: "Vendelux · Violet Hyun",
  description:
    "Product design case studies from my time at Vendelux, an AI-powered B2B event intelligence platform.",
  robots: { index: false, follow: false },
}

export default function VendeluxPage() {
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

          <CaseHero
            slug="vendelux"
            title="Vendelux"
            roles={["Product design", "Product Intern"]}
            tagline="An AI event-marketing platform that helps companies pick the right events, people and meetings."
            when="March 2026 – Present"
            forWhom="Vendelux, B2B event intelligence"
            summary="I designed workflows that help event marketers narrow huge attendee lists to the right audience, and tools that help forward-deployed engineers run outreach campaigns faster."
            scope="Segment building, campaign tooling and attendance forecasting, across customer-facing and internal tools."
          />

          <Suspense fallback={null}>
            <VendeluxCaseStudies />
          </Suspense>

          <div className="mt-24">
            <ContinueLink />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
