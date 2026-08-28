import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Resume - Violet",
  description: "Violet Hyun's resume.",
}

export default function ResumePage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="mx-auto w-full max-w-[600px] px-6 text-center">
          <h1 className="font-serif text-2xl font-normal tracking-tight text-foreground">
            Resume
          </h1>

          <div className="mt-10 flex justify-center">
            <a
              href="/Resume_Violet_Hyun.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card/50 px-10 py-10 transition-colors hover:border-foreground/30 hover:bg-card"
            >
              <FileText className="h-6 w-6 text-foreground/50 transition-colors group-hover:text-foreground" />
              <span className="text-sm font-medium tracking-wide text-foreground">
                View PDF
              </span>
            </a>
          </div>
        </div>

        <div className="mx-auto mt-20 w-full max-w-[1100px] px-6">
          <div className="overflow-hidden rounded-2xl border border-border/40">
            <iframe
              src="https://claw-machine-portfolio-page.replit.app/"
              title="Claw machine portfolio page"
              className="h-[85vh] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
