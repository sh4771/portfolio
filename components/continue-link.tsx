import Link from "next/link"

/** Shared end-of-case-study link back to the work grid. */
export function ContinueLink() {
  return (
    <div className="border-t border-border/40 pt-12 text-center">
      <p className="cs-eyebrow">Continue</p>
      <Link
        href="/#work"
        className="mt-2 inline-block text-base tracking-tight text-foreground transition-colors hover:text-foreground/60"
      >
        View all projects
      </Link>
    </div>
  )
}
