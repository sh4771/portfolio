import type { Metadata } from "next"
import { Inria_Sans } from "next/font/google"

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Clinical Trial Systems — Violet Hyun",
  description:
    "Adobe Designathon: clinical trial intelligence platform focused on decision clarity, trust, and actionable insights in data-heavy environments.",
}

export default function ClinicalTrialsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${inriaSans.className} antialiased`}>{children}</div>
}
