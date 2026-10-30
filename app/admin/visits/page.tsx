import type { Metadata } from "next"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth"
import { logStorageReady, readVisits, type Visit } from "@/lib/visit-log"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Visits", robots: { index: false, follow: false } }

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

const PROJECT_NAMES: Record<string, string> = {
  segments: "Segments",
  "campaign-admin": "Campaign Admin",
  "meeting-planner": "Meeting Planner",
  planner: "Planner",
}

function projectOf(page: string | null) {
  if (!page) return "—"
  const p = new URL(page, "https://x").searchParams.get("project")
  return p ? (PROJECT_NAMES[p] ?? p) : "Overview"
}

function place(v: Visit) {
  return [v.city, v.region, v.country].filter(Boolean).join(", ") || "—"
}

function Login({ error }: { error?: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-5 px-6">
      <h1 className="text-xl font-semibold">Visit log</h1>
      <form action="/api/admin-auth" method="post" className="space-y-3">
        <label htmlFor="admin-pw" className="block text-sm text-foreground/60">Admin password</label>
        <input id="admin-pw" name="password" type="password" autoFocus required className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm" />
        <button type="submit" className="w-full rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background">Open log</button>
      </form>
      {error === "wrong" && <p className="text-sm text-red-500">That password didn&apos;t match. Try again.</p>}
      {error === "not_configured" && <p className="text-sm text-red-500">ADMIN_PASSWORD isn&apos;t set in Vercel yet.</p>}
    </main>
  )
}

export default async function VisitsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const token = adminToken()
  const jar = await cookies()
  if (!token || jar.get(ADMIN_COOKIE)?.value !== token) {
    return <Login error={(await searchParams).error} />
  }

  const ready = logStorageReady()
  const visits = ready ? await readVisits() : []
  const opened = visits.filter((v) => v.ok)
  const byCode = new Map<string, number>()
  for (const v of opened) byCode.set(v.code ?? "General", (byCode.get(v.code ?? "General") ?? 0) + 1)

  return (
    <main className="mx-auto max-w-[1100px] space-y-8 px-6 py-16">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Vendelux visit log</h1>
        <p className="text-sm text-foreground/60">Every password attempt on the private case studies, newest first. Times are New York time.</p>
      </header>

      {!ready && (
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
          Storage isn&apos;t connected yet, so nothing is being saved. In Vercel, open this project&apos;s Storage tab, create a Blob store, and connect it to the project. Logging starts on the next deploy.
        </p>
      )}

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <p className="text-xs text-foreground/55">Unlocked</p>
          <p className="text-2xl font-semibold tabular-nums">{opened.length}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <p className="text-xs text-foreground/55">Wrong attempts</p>
          <p className="text-2xl font-semibold tabular-nums">{visits.length - opened.length}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <p className="text-xs text-foreground/55">By code</p>
          <p className="text-sm">{byCode.size ? [...byCode].map(([k, n]) => `${k} ${n}`).join(" · ") : "—"}</p>
        </div>
      </section>

      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-card text-xs text-foreground/55">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Result</th>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Device</th>
              <th className="px-4 py-3 font-medium">IP</th>
            </tr>
          </thead>
          <tbody>
            {visits.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-foreground/50">No visits recorded yet. They&apos;ll appear here as soon as someone enters a password.</td>
              </tr>
            )}
            {visits.map((v) => (
              <tr key={v.at + v.ip} className="border-t border-border/60">
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">{fmt.format(new Date(v.at))}</td>
                <td className="px-4 py-3">
                  <span className={v.ok ? "rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-300" : "rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-300"}>
                    {v.ok ? "Unlocked" : "Wrong"}
                  </span>
                </td>
                <td className="px-4 py-3">{v.code ?? "—"}</td>
                <td className="px-4 py-3">{projectOf(v.page)}</td>
                <td className="px-4 py-3">{place(v)}</td>
                <td className="px-4 py-3 text-foreground/70">{v.device ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground/60">{v.ip ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
