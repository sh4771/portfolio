import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { CaseStudyGrid } from "@/components/case-study-grid"
import { FunGrid } from "@/components/fun-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CaseStudyGrid />
        <FunGrid />
      </main>
      <Footer />
    </>
  )
}
