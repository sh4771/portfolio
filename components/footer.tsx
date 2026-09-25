"use client"

import Image from "next/image"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 bg-[#171615] text-[#f4f0e9]">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div className="flex flex-col items-start gap-8">
          <Image
            src="/vh_logo.png"
            alt="VH logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain footer-float"
          />

          <div className="space-y-3">
            <p className="feedback-note max-w-xl text-lg leading-relaxed text-[#d1cbc3] sm:text-xl">
              Have a minute to play? After the game, feel free to leave me some thoughts!
            </p>
          </div>

          <p className="text-xs text-[#625e59]">© Violet Hyun {year}</p>
        </div>

        <div className="w-full max-w-[420px] justify-self-center lg:justify-self-end">
          <div className="overflow-hidden rounded-[2rem] border-[10px] border-[#d7d3ce] bg-[#d7d3ce] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
            <iframe
              src="/api/claw"
              title="Play Violet's feedback game"
              className="h-[520px] w-full border-0 bg-[#171615]"
              allow="fullscreen"
            />
          </div>
          <p className="mt-4 text-xs text-[#817b74]">Play, then tell me what you noticed.</p>
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
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 8' preserveAspectRatio='none'%3E%3Cpath d='M1 5.2 C10 1.5 22 7 35 4 C49 1.4 63 6.9 77 3.9 C91 1.2 104 6.1 119 3.8' fill='none' stroke='%23d1cbc3' stroke-width='1.35' stroke-linecap='round'/%3E%3C/svg%3E")
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
