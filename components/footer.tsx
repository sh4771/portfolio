"use client"

import Image from "next/image"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-site-footer className="border-t border-border/60 bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div className="flex flex-col items-start gap-8">
          <Image
            src="/vh_logo.png"
            alt="VH logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain opacity-80 brightness-0 footer-float dark:brightness-100 dark:opacity-100"
          />

          <div className="space-y-3">
            <p className="feedback-note max-w-xl text-lg leading-relaxed text-foreground/75 sm:text-xl">
              Have a minute to play? After the game, feel free to leave me some thoughts!
            </p>
          </div>

          <p className="text-xs text-foreground/45">© Violet Hyun {year}</p>
        </div>

        <div className="w-full max-w-[420px] justify-self-center lg:justify-self-end">
          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card p-2 shadow-[0_24px_60px_-28px_rgba(28,26,22,0.35)]">
            <iframe
              src="/api/claw"
              title="Play Violet's feedback game"
              className="h-[520px] w-full rounded-[1.5rem] border-0 bg-[#ede6f5]"
              allow="fullscreen"
            />
          </div>
          <p className="mt-4 text-xs text-foreground/50">Play, then tell me what you noticed.</p>
        </div>
      </div>

      <style jsx>{`
        .footer-float {
          animation: footerFloat 3.2s ease-in-out infinite;
        }

        .feedback-note {
          animation: feedbackIn 0.8s ease-out both;
        }

        .feedback-emphasis {
          position: relative;
          display: inline-block;
          color: inherit;
        }

        .feedback-emphasis::after {
          content: "";
          position: absolute;
          right: -0.04em;
          bottom: -0.18em;
          left: -0.04em;
          height: 0.28em;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 8' preserveAspectRatio='none'%3E%3Cpath d='M1 5.2 C10 1.5 22 7 35 4 C49 1.4 63 6.9 77 3.9 C91 1.2 104 6.1 119 3.8' fill='none' stroke='%23b06ad6' stroke-width='1.35' stroke-linecap='round'/%3E%3C/svg%3E")
            no-repeat center / 100% 100%;
          transform: scaleX(0);
          transform-origin: left;
          animation: drawFeedback 0.7s ease-out 0.45s forwards;
        }

        @keyframes feedbackIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawFeedback {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes footerFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-float,
          .feedback-note,
          .feedback-emphasis::after {
            animation: none;
          }
        }
      `}</style>
    </footer>
  )
}
