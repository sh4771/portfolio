import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutExperience } from "@/components/about/about-experience"

export const metadata: Metadata = {
  title: "About - Violet",
  description:
    "Violet Hyun, a product designer in New York who turns complex information, workflows, and systems into something people can use with confidence.",
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutExperience />
      </main>
      <Footer />
    </>
  )
}
