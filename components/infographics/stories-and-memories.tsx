export default function StoriesAndMemories() {
  return (
    <div className="space-y-6">

      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        Insight · Stories and memories
      </span>

      <div className="flex flex-col md:flex-row gap-10 items-start">

        {/* Left: text hierarchy */}
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="text-2xl md:text-3xl font-light">
            Every garment carries a history.
          </h2>

          <p className="text-sm text-foreground/90 font-medium leading-relaxed">
            <span className="text-foreground/90 font-medium">PASSIT ON</span> is my bet that when a
            garment&apos;s history is easy to see,{" "}
            <span className="text-foreground/90 font-medium">worn can feel as compelling as new</span>
            , so I design for a visible chain of custody instead of another shop-new funnel.
          </p>

          <p className="text-sm text-foreground/60 leading-relaxed">
            Part of the spark was hand-me-down Abercrombie kids&apos; clothes with names scribbled
            inside: cousins and siblings signing in wobbly kid handwriting, which made each pass-down
            feel human in a way a fresh tag never could.
          </p>
        </div>

        {/* Right: video box */}
        <div
          className="rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center w-full md:w-auto"
          style={{ height: "320px", aspectRatio: "3/4", background: "var(--muted)" }}
        >
          <video
            src="/videos/passiton_story.mov"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-auto object-contain"
          />
        </div>

      </div>
    </div>
  )
}
