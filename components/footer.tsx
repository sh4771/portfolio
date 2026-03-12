import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { href: "/about", label: "ABOUT", external: false },
  { href: "https://www.linkedin.com/in/violet-hyun/", label: "LINKEDIN", external: true },
  { href: "mailto:violethyun@nyu.edu", label: "EMAIL", external: true },
  { href: "/Resume_Violet_Hyun.pdf", label: "RESUME", external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border/30">
      <div className="mx-auto w-full max-w-[640px] px-6 py-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Image
            src="/vh_logo.png"
            alt="VH logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />

          {/* Nav Links - Round Buttons with Glass Effect */}
          <div className="flex items-center justify-between flex-1 max-w-[400px] ml-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="px-4 py-2 rounded-full border-2 border-border text-[11px] tracking-[0.08em] text-muted-foreground transition-all hover:text-foreground hover:border-foreground/40 bg-card/50 backdrop-blur-md"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-full border-2 border-border text-[11px] tracking-[0.08em] text-muted-foreground transition-all hover:text-foreground hover:border-foreground/40 bg-card/50 backdrop-blur-md"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
