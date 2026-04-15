import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clinical Trial Systems — Violet Hyun",
  description:
    "Adobe Designathon: clinical trial intelligence platform focused on decision clarity, trust, and actionable insights in data-heavy environments.",
}

export default function ClinicalTrialsLayout({ children }: { children: React.ReactNode }) {
  return children
}
