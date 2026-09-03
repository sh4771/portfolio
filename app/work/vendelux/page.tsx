import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
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

          <div className="mb-14 space-y-4">
            <p className="text-sm leading-relaxed text-text-secondary">
              Vendelux helps B2B companies turn event attendance into sales pipeline. It matches
              who&apos;s attending an event against a company&apos;s ideal customer profile, then helps
              their team reach out and book meetings before, during, and after the event. The three
              projects below touch different parts of that workflow.
            </p>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/40">
              <Image
                src="/images/vendelux/campaign-admin-after-summary.png"
                alt="Vendelux campaign summary view"
                fill
                className="object-cover object-top"
                sizes="900px"
              />
            </div>
          </div>

          <Suspense fallback={null}>
            <VendeluxCaseStudies />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
