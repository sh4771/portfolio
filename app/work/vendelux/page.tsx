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

          <div className="mb-14 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-normal tracking-tight">
                  Product Designer, Vendelux
                </h1>
                <p className="text-sm text-text-secondary">
                  Product Design · AI-powered B2B event intelligence platform
                </p>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm pt-4">
                <div>
                  <span className="block text-xs text-text-secondary mb-1">Context</span>
                  <span className="text-foreground/70">Vendelux</span>
                </div>
                <div>
                  <span className="block text-xs text-foreground/40 mb-1">Timeline</span>
                  <span className="text-foreground/70">March 2026 – Present</span>
                </div>
                <div>
                  <span className="block text-xs text-foreground/40 mb-1">What I did</span>
                  <span className="text-foreground/70">
                    Product design across segment building, campaign tooling, and forecasting
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-text-secondary">
              Vendelux helps B2B companies turn event attendance into sales pipeline: it matches
              who&apos;s attending a conference against a company&apos;s ideal customer profile, then
              helps their team reach out and book meetings before, during, and after the event. I
              joined as a product design intern still figuring out what &ldquo;good&rdquo; looks like on
              a live product with real customers on the other end, and I&apos;m still there. The three
              projects below are the ones that taught me the most, each one started with a workflow I
              watched someone actually get stuck on. None of them started as a feature request.
            </p>

            <div className="flex justify-center rounded-lg border border-border/40 bg-white py-10">
              <Image
                src="/images/vendelux-cover.png"
                alt="Vendelux logo"
                width={220}
                height={115}
                className="h-auto w-[200px]"
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
