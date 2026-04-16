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
          className="passiton-stat-card relative overflow-hidden rounded-[28px] border border-foreground/10 bg-gradient-to-br from-card/90 via-background to-muted/40 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]"
          style={{ animationDelay: "0ms" }}
        >
          <p className="relative text-xs font-medium uppercase tracking-widest text-foreground/50">
            Around
          </p>
          <p className="relative mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 font-light tracking-tight text-foreground">
            <span className="text-5xl tabular-nums sm:text-6xl md:text-7xl">15</span>
            <span className="text-2xl font-light sm:text-3xl md:text-4xl">million</span>
          </p>
          <p className="relative mt-4 text-sm leading-snug text-foreground/70">
            garments arrive in <strong className="font-medium text-foreground/90">Ghana</strong>{" "}
            every week.
          </p>
        </div>

        {/* 40% */}
        <div
          className="passiton-stat-card relative overflow-hidden rounded-[28px] border border-foreground/10 bg-gradient-to-br from-card/90 via-background to-muted/40 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]"
          style={{ animationDelay: "120ms" }}
        >
          <p className="relative text-xs font-medium uppercase tracking-widest text-foreground/50">
            Nearly
          </p>
          <p className="relative mt-2 flex items-baseline gap-1 font-light tracking-tight text-foreground">
            <span className="text-5xl tabular-nums sm:text-6xl md:text-7xl">40</span>
            <span className="text-3xl sm:text-4xl md:text-5xl">%</span>
          </p>
          <p className="relative mt-4 text-sm leading-snug text-foreground/70">
            become <strong className="font-medium text-foreground/90">waste</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
