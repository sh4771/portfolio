import "./altrovia.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Altrovia — Violet Hyun",
  description:
    "Case study: Altrovia redesign — trust, visual system, flows, and final UI (Columbia × NYU collaboration).",
}

export default function AltroviaLayout({ children }: { children: React.ReactNode }) {
  return <div className="altrovia-root">{children}</div>
}
