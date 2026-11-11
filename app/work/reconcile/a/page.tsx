import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"
import { VersionA } from "@/components/reconcile/version-a"
import { VersionSwitch } from "@/components/reconcile/version-switch"

export const metadata = {
  title: "Reconcile · Violet Hyun",
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-[1040px] space-y-16 px-6">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <VersionA />
          <ContinueLink />
        </div>
      </main>
      <VersionSwitch current="a" />
      <Footer />
    </>
  )
}
