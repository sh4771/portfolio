import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { CaseStudyGrid } from "@/components/case-study-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CaseStudyGrid />
      </main>
      <Footer />
    </>
  )
}
