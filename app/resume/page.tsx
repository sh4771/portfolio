import { redirect } from "next/navigation"

/** The resume now lives on the About page. */
export default function ResumePage() {
  redirect("/about#resume")
}
