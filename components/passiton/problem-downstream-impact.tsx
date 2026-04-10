export default function ProblemDownstreamImpact() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-lg font-medium tracking-tight text-pretty md:text-xl">
          The impact does not end at the closet
        </h2>
        <p className="text-sm leading-relaxed text-foreground/65 md:text-base">
          When these garments leave the closet, the impact does not end there.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {/* 15 million */}
        <div
          className="passiton-stat-card relative overflow-hidden rounded-2xl border border-amber-900/15 bg-gradient-to-br from-amber-500/[0.12] via-background to-background p-6 shadow-[0_20px_50px_-28px_rgba(180,120,40,0.35)] dark:from-amber-400/10 dark:border-amber-200/10"
          style={{ animationDelay: "0ms" }}
        >
          <div
            className="passiton-stat-glow pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full bg-amber-400/25 blur-3xl dark:bg-amber-300/15"
            aria-hidden
          />
          <p className="relative text-xs font-medium uppercase tracking-widest text-amber-950/60 dark:text-amber-100/55">
            Around
          </p>
          <p className="relative mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 font-light tracking-tight text-amber-950 dark:text-amber-50">
            <span className="text-5xl tabular-nums sm:text-6xl md:text-7xl">15</span>
            <span className="text-2xl font-light sm:text-3xl md:text-4xl">million</span>
          </p>
          <p className="relative mt-4 text-sm leading-snug text-foreground/70 dark:text-foreground/65">
            garments arrive in <strong className="font-medium text-foreground/90">Ghana</strong>{" "}
            every week.
          </p>
        </div>

        {/* 40% */}
        <div
          className="passiton-stat-card relative overflow-hidden rounded-2xl border border-red-900/12 bg-gradient-to-br from-red-600/[0.10] via-background to-background p-6 shadow-[0_20px_50px_-28px_rgba(180,60,50,0.28)] dark:from-red-500/10 dark:border-red-200/10"
          style={{ animationDelay: "120ms" }}
        >
          <div
            className="passiton-stat-glow pointer-events-none absolute -left-10 -bottom-14 h-36 w-44 rounded-full bg-red-500/20 blur-3xl dark:bg-red-400/12"
            aria-hidden
          />
          <p className="relative text-xs font-medium uppercase tracking-widest text-red-950/55 dark:text-red-100/50">
            Nearly
          </p>
          <p className="relative mt-2 flex items-baseline gap-1 font-light tracking-tight text-red-950 dark:text-red-50">
            <span className="text-5xl tabular-nums sm:text-6xl md:text-7xl">40</span>
            <span className="text-3xl sm:text-4xl md:text-5xl">%</span>
          </p>
          <p className="relative mt-4 text-sm leading-snug text-foreground/70 dark:text-foreground/65">
            become <strong className="font-medium text-foreground/90">waste</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
