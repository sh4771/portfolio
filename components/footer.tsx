"use client"

import Image from "next/image"
import { Heart } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 bg-[#171615] text-[#f4f0e9]">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_360px] lg:gap-20">
        <div className="flex flex-col items-start gap-8">
          <Image
            src="/vh_logo.png"
            alt="VH logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain footer-float"
          />

          <div className="space-y-3">
            <p className="max-w-lg text-sm leading-relaxed text-[#aaa39a]">
              Have a minute to play? Feedback is always welcome. Every curious player helps the
              next iteration get a little better.
            </p>
          </div>

          <p className="text-xs text-[#625e59]">© Violet Hyun {year}</p>
        </div>

        <div className="w-full max-w-[360px] justify-self-center lg:justify-self-end">
          <div className="overflow-hidden rounded-[2rem] border-[10px] border-[#d7d3ce] bg-[#d7d3ce] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
            <iframe
              src="https://claw-machine-portfolio-page.replit.app/"
              title="Play Violet's feedback game"
              className="h-[520px] w-full border-0 bg-[#171615]"
              loading="lazy"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-[#817b74]">
            <span>Play, then tell me what you noticed.</span>
            <a
              href="https://claw-machine-portfolio-page.replit.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the feedback game in a new tab"
              title="Open game in a new tab"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-400/40 text-rose-300 transition-colors hover:border-rose-300 hover:bg-rose-300/10"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-float {
          animation: footerFloat 3.2s ease-in-out infinite;
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
          .footer-float {
            animation: none;
          }
        }
      `}</style>
    </footer>
  )
}
