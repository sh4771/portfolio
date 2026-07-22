"use client"

import Image from "next/image"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-6 py-16 text-center">
        <Image
          src="/vh_logo.png"
          alt="VH logo"
          width={64}
          height={64}
          className="h-16 w-16 object-contain footer-float"
        />

        <p className="text-lg text-foreground">
          Thanks for visiting. Let&apos;s get in touch!
        </p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="mailto:violethyun@nyu.edu"
            className="transition-colors hover:text-foreground"
          >
            violethyun@nyu.edu
          </a>
          <a
            href="https://www.linkedin.com/in/violet-hyun/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-muted-foreground/60">
          © Violet Hyun {year}
        </p>
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
