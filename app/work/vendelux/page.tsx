import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VendeluxCaseStudies } from "@/components/vendelux/vendelux-case-studies"

export const metadata = {
  title: "Vendelux — Violet Hyun",
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
            className="mb-14 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          <Suspense fallback={null}>
            <VendeluxCaseStudies />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
