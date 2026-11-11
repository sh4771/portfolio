import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { VersionA as ReconcileStory } from "@/components/reconcile/version-a"

export const metadata = {
  title: "Reconcile · Violet Hyun",
  description: "Reconcile helps marketplace finance teams identify and explain differences between expected and actual seller payouts.",
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="site-col space-y-16 ">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <ReconcileStory />
          <ContinueLink />
        </div>
      </main>
      <Footer />
    </>
  )
}
