import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FlowerStudio } from "@/components/playground/flower-studio"

export const metadata: Metadata = {
  title: "Playground · Violet Hyun",
  description: "Draw a flower, build one, or grow one from a word, then plant it in a garden for the next visitor.",
}

export default function PlaygroundPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-28 lg:pt-36">
        <div className="site-col space-y-12">
          <header className="max-w-2xl space-y-3">
            <p className="text-xs font-medium tracking-[0.16em] text-foreground/50 uppercase">Playground</p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Grow a flower</h1>
            <p className="text-lg leading-snug text-foreground/65 text-pretty">
              Draw one, build one, or grow one from a word. Then plant it in the garden for the next visitor to find.
            </p>
          </header>
          <FlowerStudio />
        </div>
      </main>
      <Footer />
    </>
  )
}
