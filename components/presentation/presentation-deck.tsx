"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { SlideRenderer } from "@/components/presentation/slide-renderer"
import {
  getSlideIndexById,
  presentationSlides,
} from "@/lib/presentation-deck"

function clampIndex(index: number) {
  return Math.max(0, Math.min(index, presentationSlides.length - 1))
}

function parseInitialIndex(searchParams: URLSearchParams): number {
  const slideParam = searchParams.get("slide")
  if (slideParam) {
    const byId = getSlideIndexById(slideParam)
    if (byId >= 0) return byId

    const byNumber = Number.parseInt(slideParam, 10)
    if (!Number.isNaN(byNumber)) return clampIndex(byNumber - 1)
  }
  return 0
}

export function PresentationDeck() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentIndex, setCurrentIndex] = useState(() => parseInitialIndex(searchParams))
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [isAnimating, setIsAnimating] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const currentSlide = presentationSlides[currentIndex]

  const syncUrl = useCallback(
    (index: number) => {
      const slide = presentationSlides[index]
      const params = new URLSearchParams(searchParams.toString())
      params.set("slide", slide.id)
      router.replace(`/presentation?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index)
      if (nextIndex === currentIndex || isAnimating) return

      setDirection(nextIndex > currentIndex ? "forward" : "backward")
      setIsAnimating(true)
      setCurrentIndex(nextIndex)
      syncUrl(nextIndex)

      window.setTimeout(
        () => setIsAnimating(false),
        reducedMotion ? 0 : 320,
      )
    },
    [currentIndex, isAnimating, reducedMotion, syncUrl],
  )

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  useEffect(() => {
    document.documentElement.dataset.presentation = "true"
    return () => {
      delete document.documentElement.dataset.presentation
    }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          event.preventDefault()
          goNext()
          break
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          event.preventDefault()
          goPrev()
          break
        case "Home":
          event.preventDefault()
          goTo(0)
          break
        case "End":
          event.preventDefault()
          goTo(presentationSlides.length - 1)
          break
        case "n":
        case "N":
          setShowNotes((value) => !value)
          break
        case "f":
        case "F":
          if (document.fullscreenElement) {
            void document.exitFullscreen()
          } else {
            void containerRef.current?.requestFullscreen()
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goNext, goPrev, goTo])

  const handleSurfaceClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest("a, button, video, input, textarea")) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const zone = x / bounds.width

    if (zone < 0.28) goPrev()
    else if (zone > 0.72) goNext()
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void containerRef.current?.requestFullscreen()
    }
  }

  const progress = ((currentIndex + 1) / presentationSlides.length) * 100

  return (
    <div
      ref={containerRef}
      data-presentation
      className="presentation-deck relative h-dvh w-full overflow-hidden bg-background"
      onClick={handleSurfaceClick}
    >
      <div
        className="presentation-progress absolute inset-x-0 top-0 z-20 h-[3px] bg-border/40"
        aria-hidden
      >
        <div
          className="h-full bg-foreground/70 transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
        <p className="text-[10px] tracking-[0.18em] text-foreground/35 uppercase">
          Presentation
        </p>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNotes((value) => !value)}
            className={`rounded-full border px-3 py-1 text-[10px] tracking-[0.1em] uppercase transition-colors ${
              showNotes
                ? "border-foreground/30 bg-foreground/10 text-foreground/70"
                : "border-border/60 bg-card/50 text-foreground/45 hover:text-foreground/70"
            }`}
            aria-pressed={showNotes}
          >
            Notes
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-full border border-border/60 bg-card/50 p-2 text-foreground/45 transition-colors hover:text-foreground/70"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <div className="relative h-full w-full">
        <div
          key={currentSlide.id}
          className={`presentation-slide absolute inset-0 ${
            isAnimating && !reducedMotion
              ? direction === "forward"
                ? "presentation-slide-enter-forward"
                : "presentation-slide-enter-backward"
              : ""
          }`}
        >
          <SlideRenderer slide={currentSlide} />
        </div>
      </div>

      {showNotes && currentSlide.note ? (
        <aside className="pointer-events-none absolute inset-x-0 bottom-14 z-20 px-6">
          <div className="mx-auto max-w-3xl rounded-xl border border-border/50 bg-background/90 px-4 py-3 backdrop-blur-md">
            <p className="text-[10px] tracking-[0.15em] text-foreground/40 uppercase">
              Presenter note
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/70">{currentSlide.note}</p>
          </div>
        </aside>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-5 py-4">
        <p className="text-[10px] tabular-nums tracking-[0.12em] text-foreground/35">
          {String(currentIndex + 1).padStart(2, "0")} / {String(presentationSlides.length).padStart(2, "0")}
        </p>
        <p className="hidden text-[10px] tracking-[0.12em] text-foreground/30 uppercase sm:block">
          ← → navigate · N notes · F fullscreen
        </p>
        <div className="pointer-events-auto flex items-center gap-1">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="rounded-full border border-border/60 bg-card/50 p-2 text-foreground/45 transition-colors hover:text-foreground/70 disabled:opacity-30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === presentationSlides.length - 1}
            className="rounded-full border border-border/60 bg-card/50 p-2 text-foreground/45 transition-colors hover:text-foreground/70 disabled:opacity-30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
