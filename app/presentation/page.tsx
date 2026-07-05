import type { Metadata } from "next"
import { Suspense } from "react"
import { PresentationDeck } from "@/components/presentation/presentation-deck"

export const metadata: Metadata = {
  title: "Presentation — Violet Hyun",
  description: "Presentation deck.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PresentationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-foreground/50">
          Loading deck…
        </div>
      }
    >
      <PresentationDeck />
    </Suspense>
  )
}
