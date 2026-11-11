/** The little things visitors can do for a flower in the garden. */
export const CARE_KINDS = ["water", "sun", "song", "butterfly"] as const
export type CareKind = (typeof CARE_KINDS)[number]
export type Care = Partial<Record<CareKind, number>>
export const CARE_PREFIX = "care/"
export const FLOWER_ID = /^[a-z0-9-]{6,40}$/

/** Turns blob paths like care/<flower>/<kind>/<stamp> into counts per flower. */
export function tallyCare(paths: string[]) {
  const care: Record<string, Care> = {}
  for (const p of paths) {
    const [, id, kind] = p.split("/")
    if (!id || !CARE_KINDS.includes(kind as CareKind)) continue
    const c = (care[id] ??= {})
    c[kind as CareKind] = (c[kind as CareKind] ?? 0) + 1
  }
  return care
}
