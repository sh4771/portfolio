import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Altrovia · Violet Hyun",
  description:
    "Altrovia: a clinical trial intelligence workspace that shows where every AI number comes from. Adobe Designathon, now being revisited.",
}

export default function ClinicalTrialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased">
      {children}
    </div>
  )
}
