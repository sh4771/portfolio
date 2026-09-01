"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

function LockedForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<"wrong_password" | "not_configured" | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("from") || "/work/vendelux"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch("/api/vendelux-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push(destination)
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({ reason: "wrong_password" }))
      setError(data.reason === "not_configured" ? "not_configured" : "wrong_password")
    }
  }

  return (
    <main className="pt-40 pb-24">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 text-foreground/60">
          <Lock className="h-5 w-5" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-medium text-foreground">
            This case study is private
          </h1>
          <p className="text-sm text-muted-foreground">
            My Vendelux work covers unreleased product details, so this
            section is password-protected. Reach out if you'd like access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40"
          />
          {error === "wrong_password" && (
            <p className="text-sm text-red-500">
              That password didn't work — try again.
            </p>
          )}
          {error === "not_configured" && (
            <p className="text-sm text-red-500">
              Access isn't set up correctly yet — the site owner needs to
              check the password configuration.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-60"
          >
            {loading ? "Checking…" : "Unlock"}
          </button>
        </form>

        <a
          href="mailto:violethyun@nyu.edu"
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Request access
        </a>
      </div>
    </main>
  )
}

export default function VendeluxLockedPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={null}>
        <LockedForm />
      </Suspense>
      <Footer />
    </>
  )
}
