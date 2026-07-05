"use client"

import Image from "next/image"
import Link from "next/link"
import ProblemDownstreamImpact from "@/components/passiton/problem-downstream-impact"
import ClothingLifecycle from "@/components/infographics/clothing-lifecycle"
import type { PresentationSlide } from "@/lib/presentation-deck"

const presentationComponents = {
  "passiton-downstream": ProblemDownstreamImpact,
  "passiton-lifecycle": ClothingLifecycle,
} as const

function Kicker({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/40">
      {children}
    </p>
  )
}

function SlideFrame({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto flex h-full w-full max-w-[1100px] flex-col justify-center px-8 py-16 md:px-12 ${className}`}
    >
      {children}
    </div>
  )
}

export function SlideRenderer({ slide }: { slide: PresentationSlide }) {
  switch (slide.type) {
    case "title":
      return (
        <SlideFrame className="items-center text-center">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {slide.title}
          </h1>
          {slide.subtitle ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60 md:text-lg">
              {slide.subtitle}
            </p>
          ) : null}
          <div className="mt-12 flex items-center gap-3">
            <Image
              src="/vh_logo.png"
              alt="VH"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-[11px] tracking-[0.12em] text-foreground/40 uppercase">
              Press → or Space to begin
            </p>
          </div>
        </SlideFrame>
      )

    case "agenda":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {slide.title}
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {slide.items.map((item, index) => (
              <li
                key={item.label}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm"
              >
                <span className="text-2xl font-light tabular-nums text-foreground/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  {item.detail ? (
                    <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                      {item.detail}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </SlideFrame>
      )

    case "section":
      return (
        <SlideFrame className="items-center text-center">
          <Kicker>{slide.label}</Kicker>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {slide.title}
          </h2>
          {slide.image ? (
            <div
              className={`relative mt-10 aspect-[16/10] w-full max-w-xl overflow-hidden rounded-2xl ${
                slide.treatAsLogo ? "bg-white" : "bg-card"
              }`}
            >
              <div className={slide.treatAsLogo ? "absolute inset-[12%]" : "absolute inset-0"}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={slide.treatAsLogo ? "object-contain" : "object-cover"}
                  sizes="(max-width: 768px) 100vw, 640px"
                  priority
                />
              </div>
            </div>
          ) : null}
          {slide.tags ? (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/10 px-3 py-1 text-[10px] tracking-[0.1em] text-foreground/50 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </SlideFrame>
      )

    case "subsection":
      return (
        <SlideFrame>
          <div className="flex items-start gap-6">
            {slide.number ? (
              <span className="text-5xl font-light tabular-nums text-foreground/15 md:text-6xl">
                {slide.number}
              </span>
            ) : null}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {slide.title}
              </h2>
              {slide.subtitle ? (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/60 md:text-lg">
                  {slide.subtitle}
                </p>
              ) : null}
              {slide.tags ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-foreground/10 px-3 py-1 text-[10px] tracking-[0.1em] text-foreground/50 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </SlideFrame>
      )

    case "statement":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {slide.headline}
          </h2>
          {slide.body ? (
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/60 md:text-lg">
              {slide.body}
            </p>
          ) : null}
        </SlideFrame>
      )

    case "bullets":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {slide.title}
          </h2>
          <ul className="mt-10 max-w-3xl space-y-4">
            {slide.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 text-base leading-relaxed text-foreground/70 md:text-lg"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                {item}
              </li>
            ))}
          </ul>
        </SlideFrame>
      )

    case "phases":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {slide.title}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {slide.phases.map((phase, index) => (
              <div
                key={phase.label}
                className="rounded-2xl border border-border/60 bg-card/30 p-5"
              >
                <p className="text-[10px] tracking-[0.15em] text-foreground/35 uppercase">
                  {String(index + 1).padStart(2, "0")} · {phase.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </SlideFrame>
      )

    case "insights":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {slide.title}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {slide.items.map((item) => (
              <div
                key={item.heading}
                className="rounded-2xl border border-border/60 bg-card/30 p-5"
              >
                <h3 className="text-sm font-semibold text-foreground">{item.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.body}</p>
              </div>
            ))}
          </div>
        </SlideFrame>
      )

    case "metrics":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          {slide.title ? (
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {slide.title}
            </h2>
          ) : null}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {slide.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border/60 bg-gradient-to-br from-card/90 via-background to-muted/40 p-6 text-center"
              >
                <p className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-3 text-xs tracking-[0.12em] text-foreground/50 uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </SlideFrame>
      )

    case "gallery": {
      const columns = slide.columns ?? (slide.images.length >= 3 ? 3 : 2)
      const gridClass =
        columns === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2"

      return (
        <SlideFrame className="py-10">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <h2 className="mt-2 max-w-4xl text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {slide.title}
          </h2>
          <div className={`mt-4 grid gap-3 ${gridClass}`}>
            {slide.images.map((image) => (
              <div key={image.src} className="flex min-w-0 flex-col gap-1.5">
                <div className="relative h-[24vh] min-h-[140px] overflow-hidden rounded-xl border border-border/50 bg-card">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
                {image.label ? (
                  <p className="text-[10px] leading-snug text-foreground/50">{image.label}</p>
                ) : null}
              </div>
            ))}
          </div>
          {slide.caption ? (
            <p className="mt-3 text-sm text-foreground/50">{slide.caption}</p>
          ) : null}
        </SlideFrame>
      )
    }

    case "image": {
      const isScreenshot = slide.variant === "screenshot"
      return (
        <SlideFrame className={isScreenshot ? "py-12" : undefined}>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          {slide.title ? (
            <h2
              className={`max-w-3xl font-semibold tracking-tight text-foreground ${
                isScreenshot
                  ? "mt-2 text-lg md:text-xl"
                  : "mt-4 text-2xl md:text-3xl"
              }`}
            >
              {slide.title}
            </h2>
          ) : null}
          <div
            className={`relative w-full overflow-hidden rounded-2xl ${
              slide.treatAsLogo
                ? "aspect-[16/9] max-h-[55vh] bg-white"
                : isScreenshot
                  ? "mt-4 aspect-[16/10] max-h-[68vh] bg-card"
                  : "mt-8 aspect-[16/10] max-h-[60vh] bg-card"
            }`}
          >
            <div className={slide.treatAsLogo ? "absolute inset-[8%]" : "absolute inset-0"}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </div>
          </div>
          {slide.caption ? (
            <p className={`text-sm text-foreground/50 ${isScreenshot ? "mt-2" : "mt-4"}`}>
              {slide.caption}
            </p>
          ) : null}
        </SlideFrame>
      )
    }

    case "video":
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          {slide.title ? (
            <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {slide.title}
            </h2>
          ) : null}
          <div className="relative mt-8 aspect-video w-full max-h-[60vh] overflow-hidden rounded-2xl bg-foreground/5">
            <video
              key={slide.src}
              className="h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
            >
              <source src={slide.src} type="video/quicktime" />
              <source src={slide.src} type="video/mp4" />
            </video>
          </div>
          {slide.caption ? (
            <p className="mt-4 text-sm text-foreground/50">{slide.caption}</p>
          ) : null}
        </SlideFrame>
      )

    case "component": {
      const Component = presentationComponents[slide.componentId]
      return (
        <SlideFrame>
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          {slide.title ? (
            <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {slide.title}
            </h2>
          ) : null}
          <div className="mt-8 max-h-[65vh] overflow-y-auto pr-2">
            <Component />
          </div>
        </SlideFrame>
      )
    }

    case "closing":
      return (
        <SlideFrame className="items-center text-center">
          <Image
            src="/vh_logo.png"
            alt="VH"
            width={48}
            height={48}
            className="mb-8 h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {slide.title}
          </h2>
          {slide.subtitle ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg">
              {slide.subtitle}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {slide.links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="rounded-full border-2 border-border bg-card/50 px-5 py-2 text-[11px] tracking-[0.08em] text-muted-foreground backdrop-blur-md transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border-2 border-border bg-card/50 px-5 py-2 text-[11px] tracking-[0.08em] text-muted-foreground backdrop-blur-md transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </SlideFrame>
      )

    default:
      return null
  }
}
