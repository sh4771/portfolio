"use client"

import { useEffect, useRef, useState } from "react"
import { Sun, Moon } from "lucide-react"

const LEVELS = 12

// WCAG Contrast Ratio Thresholds
const CONTRAST_PRIMARY = 7.0    // Primary text - optimal readability
const CONTRAST_SECONDARY = 4.5  // Secondary text - body text minimum
const CONTRAST_MUTED = 3.0      // Muted/disabled text - large text minimum

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function toHex(r: number, g: number, b: number) {
  return `#${Math.round(clamp(r, 0, 255)).toString(16).padStart(2,'0')}${Math.round(clamp(g, 0, 255)).toString(16).padStart(2,'0')}${Math.round(clamp(b, 0, 255)).toString(16).padStart(2,'0')}`
}

function sRGBtoLinear(c: number): number {
  const normalized = c / 255
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4)
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b)
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

interface RGB { r: number; g: number; b: number }

function adjustColorForContrast(
  textColor: RGB,
  bgColor: RGB,
  targetContrast: number,
  isDarkMode: boolean
): RGB {
  const bgLuminance = getRelativeLuminance(bgColor.r, bgColor.g, bgColor.b)
  let { r, g, b } = textColor
  let currentContrast = getContrastRatio(
    getRelativeLuminance(r, g, b),
    bgLuminance
  )
  
  if (currentContrast >= targetContrast) {
    return { r, g, b }
  }
  
  const maxIterations = 50
  let iteration = 0
  
  while (currentContrast < targetContrast && iteration < maxIterations) {
    if (isDarkMode) {
      r = clamp(r + 5, 0, 255)
      g = clamp(g + 5, 0, 255)
      b = clamp(b + 4, 0, 255)
    } else {
      r = clamp(r - 5, 0, 255)
      g = clamp(g - 5, 0, 255)
      b = clamp(b - 4, 0, 255)
    }
    
    currentContrast = getContrastRatio(
      getRelativeLuminance(r, g, b),
      bgLuminance
    )
    iteration++
  }
  
  return { r, g, b }
}

function generateContrastAwareColor(
  baseColor: RGB,
  bgColor: RGB,
  targetContrast: number,
  isDarkMode: boolean
): RGB {
  return adjustColorForContrast(baseColor, bgColor, targetContrast, isDarkMode)
}

function applyTheme(t: number) {
  const html = document.documentElement
  const isDarkMode = t > 0.5
  
  // Background: warm ivory (t=0) → deep charcoal (t=1)
  const bgR = lerp(250, 20, t)
  const bgG = lerp(247, 18, t)
  const bgB = lerp(240, 16, t)
  const bgColor: RGB = { r: bgR, g: bgG, b: bgB }
  
  // Base foreground colors (before contrast adjustment)
  const baseFgR = lerp(28, 250, t)
  const baseFgG = lerp(26, 247, t)
  const baseFgB = lerp(22, 240, t)
  
  // Primary text: highest contrast (≥7:1)
  const primaryText = generateContrastAwareColor(
    { r: baseFgR, g: baseFgG, b: baseFgB },
    bgColor,
    CONTRAST_PRIMARY,
    isDarkMode
  )
  
  // Secondary text: standard body text (≥4.5:1)
  const baseSecondaryR = lerp(60, 220, t)
  const baseSecondaryG = lerp(55, 215, t)
  const baseSecondaryB = lerp(48, 205, t)
  const secondaryText = generateContrastAwareColor(
    { r: baseSecondaryR, g: baseSecondaryG, b: baseSecondaryB },
    bgColor,
    CONTRAST_SECONDARY,
    isDarkMode
  )
  
  // Muted text: reduced but readable (≥3:1)
  const baseMutedR = lerp(100, 160, t)
  const baseMutedG = lerp(95, 155, t)
  const baseMutedB = lerp(85, 145, t)
  const mutedText = generateContrastAwareColor(
    { r: baseMutedR, g: baseMutedG, b: baseMutedB },
    bgColor,
    CONTRAST_MUTED,
    isDarkMode
  )
  
  // Surface/card colors with contrast-aware foreground
  const cardOffsetLight = -8
  const cardOffsetDark = 12
  const cardOffset = lerp(cardOffsetLight, cardOffsetDark, t)
  const cardR = clamp(bgR + cardOffset, 0, 255)
  const cardG = clamp(bgG + cardOffset, 0, 255)
  const cardB = clamp(bgB + cardOffset, 0, 255)
  const cardBg: RGB = { r: cardR, g: cardG, b: cardB }
  
  // Card foreground needs contrast against card background
  const cardForeground = generateContrastAwareColor(
    { r: primaryText.r, g: primaryText.g, b: primaryText.b },
    cardBg,
    CONTRAST_PRIMARY,
    isDarkMode
  )
  
  // Border: ensure visibility against background (≥3:1 preferred)
  const baseBorderR = lerp(220, 50, t)
  const baseBorderG = lerp(213, 48, t)
  const baseBorderB = lerp(195, 44, t)
  const borderColor = generateContrastAwareColor(
    { r: baseBorderR, g: baseBorderG, b: baseBorderB },
    bgColor,
    1.5,
    isDarkMode
  )
  
  // Apply semantic color tokens
  html.style.setProperty("--background", toHex(bgR, bgG, bgB))
  html.style.setProperty("--foreground", toHex(primaryText.r, primaryText.g, primaryText.b))
  html.style.setProperty("--card", toHex(cardR, cardG, cardB))
  html.style.setProperty("--card-foreground", toHex(cardForeground.r, cardForeground.g, cardForeground.b))
  html.style.setProperty("--popover", toHex(cardR, cardG, cardB))
  html.style.setProperty("--popover-foreground", toHex(cardForeground.r, cardForeground.g, cardForeground.b))
  html.style.setProperty("--muted", toHex(cardR, cardG, cardB))
  html.style.setProperty("--muted-foreground", toHex(mutedText.r, mutedText.g, mutedText.b))
  html.style.setProperty("--border", toHex(borderColor.r, borderColor.g, borderColor.b))
  html.style.setProperty("--input", toHex(borderColor.r, borderColor.g, borderColor.b))
  html.style.setProperty("--primary", toHex(primaryText.r, primaryText.g, primaryText.b))
  html.style.setProperty("--primary-foreground", toHex(bgR, bgG, bgB))
  html.style.setProperty("--secondary", toHex(cardR, cardG, cardB))
  html.style.setProperty("--secondary-foreground", toHex(secondaryText.r, secondaryText.g, secondaryText.b))
  html.style.setProperty("--accent", toHex(mutedText.r, mutedText.g, mutedText.b))
  html.style.setProperty("--accent-foreground", toHex(primaryText.r, primaryText.g, primaryText.b))
  
  // Semantic text hierarchy tokens
  html.style.setProperty("--text-primary", toHex(primaryText.r, primaryText.g, primaryText.b))
  html.style.setProperty("--text-secondary", toHex(secondaryText.r, secondaryText.g, secondaryText.b))
  html.style.setProperty("--text-muted", toHex(mutedText.r, mutedText.g, mutedText.b))
  html.style.setProperty("--surface", toHex(cardR, cardG, cardB))
  
  // Logo filter: darker in bright mode, normal/brighter in dark mode
  const logoBrightness = lerp(0.15, 1.0, t)
  html.style.setProperty("--logo-filter", `brightness(${logoBrightness})`)
  
  // Scribble filter: dark in light mode, light in dark mode
  const scribbleInvert = lerp(0, 1, t)
  const scribbleBrightness = lerp(0.3, 1.0, t)
  html.style.setProperty("--scribble-filter", `invert(${scribbleInvert}) brightness(${scribbleBrightness})`)
  
  // Toggle dark class for components that use dark: variants
  if (isDarkMode) {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }
}

// Check if it's nighttime in EST (6pm - 6am)
function isNightTimeEST(): boolean {
  const now = new Date()
  const estOffset = -5
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const estTime = new Date(utc + (3600000 * estOffset))
  const hour = estTime.getHours()
  return hour >= 18 || hour < 6
}

export default function ThemeToggle() {
  const [level, setLevel] = useState(() => {
    // Start with opposite of target (will animate to correct mode)
    return isNightTimeEST() ? 0 : LEVELS - 1
  })
  const [expanded, setExpanded] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const t = level / (LEVELS - 1)
    applyTheme(t)
  }, [level])

  // Initial animation: animate theme based on time of day
  useEffect(() => {
    if (hasAnimated) return
    
    const isNight = isNightTimeEST()
    const targetLevel = isNight ? LEVELS - 1 : 0
    const startLevel = isNight ? 0 : LEVELS - 1
    
    // Start expanded after a brief delay
    const openTimer = setTimeout(() => {
      setExpanded(true)
    }, 1000)
    
    // Animate the level change
    const animateTimer = setTimeout(() => {
      const duration = 1500
      const steps = Math.abs(targetLevel - startLevel)
      const stepDuration = duration / steps
      
      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        if (isNight) {
          setLevel(Math.min(startLevel + currentStep, targetLevel))
        } else {
          setLevel(Math.max(startLevel - currentStep, targetLevel))
        }
        
        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)
    }, 1200)
    
    // Close the toggle
    const closeTimer = setTimeout(() => {
      setExpanded(false)
      setHasAnimated(true)
    }, 3500)
    
    return () => {
      clearTimeout(openTimer)
      clearTimeout(animateTimer)
      clearTimeout(closeTimer)
    }
  }, [hasAnimated])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const relY = Math.min(rect.height, Math.max(0, e.clientY - rect.top))
    const pct = relY / rect.height
    setLevel(Math.round(pct * (LEVELS - 1)))
  }

  function handleMouseEnter() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setExpanded(true)
  }

  function handleMouseLeave() {
    closeTimerRef.current = setTimeout(() => setExpanded(false), 600)
  }

  function dotOpacity(i: number) {
    if (i === level) return 1
    return Math.max(0.15, 1 - Math.abs(i - level) * 0.1)
  }

  const t = level / (LEVELS - 1)
  
  const pillBgR = lerp(0, 255, t)
  const pillBgG = lerp(0, 255, t)
  const pillBgB = lerp(0, 255, t)
  const pillBgAlpha = lerp(0.06, 0.08, t)
  
  const pillBorderAlpha = lerp(0.10, 0.14, t)
  
  const dotR = lerp(40, 250, t)
  const dotG = lerp(38, 248, t)
  const dotB = lerp(35, 242, t)

  return (
    <div
      className="fixed bottom-8 right-6 z-50 flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-col items-center rounded-full relative"
        style={{
          background: `rgba(${pillBgR}, ${pillBgG}, ${pillBgB}, ${pillBgAlpha})`,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid rgba(${pillBgR}, ${pillBgG}, ${pillBgB}, ${pillBorderAlpha})`,
          boxShadow: `0 8px 32px rgba(0,0,0,${lerp(0.12, 0.28, t)}), inset 0 1px 0 rgba(255,255,255,${lerp(0.50, 0.10, t)})`,
          width: 44,
          height: expanded ? `${LEVELS * 22 + 20}px` : "52px",
          transition: `height ${expanded ? "0.35s" : "0.7s"} cubic-bezier(0.4, 0, 0.2, 1)`,
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,${lerp(0.40, 0.07, t)}) 0%, rgba(255,255,255,${lerp(0.10, 0.01, t)}) 60%, rgba(0,0,0,${lerp(0.05, 0.12, t)}) 100%)`,
          }}
        />

        <div
          ref={trackRef}
          onMouseMove={handleMouseMove}
          className="relative z-10"
          style={{
            width: 44,
            height: expanded ? `${LEVELS * 22 + 8}px` : "52px",
            opacity: expanded ? 1 : 0,
            transition: `opacity ${expanded ? "0.25s 0.1s" : "0.2s"} ease, height ${expanded ? "0.35s" : "0.7s"} cubic-bezier(0.4, 0, 0.2, 1)`,
            pointerEvents: expanded ? "auto" : "none",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <div 
            className="flex flex-col items-center justify-between absolute inset-x-0"
            style={{ top: 12, bottom: 8, gap: 0 }}
          >
            {Array.from({ length: LEVELS }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ width: 44, height: 22 }}
              >
                <span
                  style={{
                    display: "block",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: `rgba(${dotR}, ${dotG}, ${dotB}, ${dotOpacity(i)})`,
                  }}
                />
              </div>
            ))}
          </div>

          <div
            className="absolute flex items-center justify-center"
            style={{
              left: 0,
              right: 0,
              width: 44,
              height: 22,
              top: Math.max(12, Math.min(12 + (LEVELS - 1) * 22, 12 + level * 22)) - 1,
              transition: "top 0.15s ease",
              zIndex: 2,
            }}
          >
            {t < 0.5 ? (
              <Sun
                style={{
                  width: 15,
                  height: 15,
                  color: `rgba(${dotR}, ${dotG}, ${dotB}, 0.9)`,
                }}
              />
            ) : (
              <Moon
                style={{
                  width: 14,
                  height: 14,
                  color: `rgba(${dotR}, ${dotG}, ${dotB}, 0.9)`,
                }}
              />
            )}
          </div>
        </div>

        <div
          className="flex items-center justify-center relative z-10"
          style={{
            width: 44,
            height: 52,
            position: "absolute",
            bottom: 0,
            opacity: expanded ? 0 : 1,
            transition: `opacity ${expanded ? "0.15s" : "0.3s 0.4s"} ease`,
            pointerEvents: "none",
          }}
        >
          {t < 0.5 ? (
            <Sun
              style={{
                width: 15,
                height: 15,
                color: `rgba(${dotR}, ${dotG}, ${dotB}, 0.85)`,
              }}
            />
          ) : (
            <Moon
              style={{
                width: 14,
                height: 14,
                color: `rgba(${dotR}, ${dotG}, ${dotB}, 0.85)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
