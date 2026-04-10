import { Fragment } from "react"
import {
  ArrowRight,
  ExternalLink,
  Github,
  Globe,
  GitBranch,
  Nfc,
  ScanLine,
  Smartphone,
} from "lucide-react"

const REPO_URL = "https://github.com/sh4771/PassitOn"
const LIVE_URL = "https://passit-on-lac.vercel.app"

const storyboardSteps = [
  {
    step: 1,
    Icon: Nfc,
    title: "Tap the tag",
    body: "Hold the phone near the NFC chip in the care label.",
  },
  {
    step: 2,
    Icon: Smartphone,
    title: "Link opens",
    body: "The tag launches the garment URL in the browser. No app install.",
  },
  {
    step: 3,
    Icon: ScanLine,
    title: "Live UI loads",
    body: "Same screen as after the scan: materials, history, next steps in the live build.",
  },
  {
    step: 4,
    Icon: GitBranch,
    title: "Chain of custody",
    body: "From there they can follow the record or imagine passing the piece on.",
  },
] as const

export default function PassitOnLivePrototypeSection() {
  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-foreground/40">Live prototype · NFC</p>
        <h2 className="text-lg font-medium tracking-tight md:text-xl">
          What scanning the tag opens
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
          I shipped a working web build on Vercel and linked it from the physical NFC tags. The
          storyboard below is how I explain the handoff from label to screen; the phone frame is
          the actual hosted experience.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:bg-muted/50"
          >
            <Github className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.75} />
            PassitOn on GitHub
            <ExternalLink className="h-3.5 w-3.5 opacity-50" aria-hidden />
          </a>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:bg-muted/50"
          >
            <Globe className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.75} />
            passit-on-lac.vercel.app
            <ExternalLink className="h-3.5 w-3.5 opacity-50" aria-hidden />
          </a>
        </div>
      </div>

      {/* Storyboard */}
      <div>
        <p className="mb-6 text-xs font-medium uppercase tracking-wide text-foreground/45">
          Storyboard: scan to story
        </p>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-1">
          {storyboardSteps.map(({ step, Icon, title, body }, i) => (
            <Fragment key={step}>
              <div className="flex flex-1 gap-4 border-l-2 border-foreground/10 pl-4 md:flex-col md:items-center md:border-l-0 md:border-t-2 md:pl-0 md:pt-4 md:text-center">
                <div className="flex shrink-0 md:justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/12 to-foreground/5 ring-2 ring-foreground/10">
                    <Icon className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-baseline gap-2 md:justify-center">
                    <span className="font-mono text-[10px] text-foreground/35">0{step}</span>
                    <h3 className="text-sm font-medium text-foreground">{title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
              {i < storyboardSteps.length - 1 && (
                <div
                  className="hidden shrink-0 items-center justify-center self-center px-1 md:flex md:pt-10"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4 text-foreground/25" strokeWidth={1.25} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          To use real storyboard art later, add frames under{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[10px]">public/images/</code> and
          replace a step with <code className="rounded bg-muted px-1 py-0.5 text-[10px]">Image</code>.
        </p>
      </div>

      {/* Live embed */}
      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground/45">
          Hosted experience (live)
        </p>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
          <div className="w-full max-w-[300px] shrink-0">
            <div
              className="rounded-[2.25rem] border-[10px] border-foreground/85 bg-foreground/90 p-2 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)]"
              style={{ boxShadow: "0 32px 80px -20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            >
              <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[1.35rem] bg-muted">
                <iframe
                  src={LIVE_URL}
                  title="PASSIT ON live prototype at passit-on-lac.vercel.app"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allow="clipboard-read; clipboard-write; fullscreen"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Same URL the NFC tag resolves to.{" "}
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 underline underline-offset-2 hover:text-foreground"
              >
                Open full tab
              </a>
              {" "}if the preview is blank (some browsers block embeds).
            </p>
          </div>
          <div className="max-w-md space-y-3 rounded-2xl border border-border/60 bg-muted/20 p-5 text-sm text-foreground/65">
            <p>
              Repo:{" "}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/90 underline-offset-2 hover:underline"
              >
                github.com/sh4771/PassitOn
              </a>
            </p>
            <p>
              This Next.js app is what loads after a scan. I use it to demo the idea with a real URL
              on real tags, not only static mocks.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
