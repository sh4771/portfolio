import Link from "next/link"

const V = [
  { k: "a", name: "A · Scroll story" },
  { k: "b", name: "B · Play the case" },
  { k: "c", name: "C · Design board" },
]

/** Preview-only switcher so the three versions can be compared. Removed once one is picked. */
export function VersionSwitch({ current }: { current: string }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-border/60 bg-background/90 p-1 text-xs shadow-lg backdrop-blur [html.embed_&]:hidden">
      {V.map((v) => (
        <Link key={v.k} href={`/work/reconcile/${v.k}`} className={v.k === current ? "rounded-full bg-foreground px-3 py-1.5 font-semibold text-background" : "rounded-full px-3 py-1.5 text-foreground/65 hover:text-foreground"}>
          {v.name}
        </Link>
      ))}
    </div>
  )
}
