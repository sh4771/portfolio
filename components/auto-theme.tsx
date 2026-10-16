"use client"

import { useEffect } from "react"
import { applyTheme, isNightTimeEST } from "@/components/theme-toggle"

/** Applies the time-of-day theme (dark 6pm to 6am Eastern) with no on-screen control. */
export function AutoTheme() {
  useEffect(() => {
    applyTheme(isNightTimeEST() ? 1 : 0)
  }, [])
  return null
}
