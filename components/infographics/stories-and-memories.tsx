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
            People think new equals good. I realized worn clothes can hold more value when
            that history is visible: who owned them, where they&apos;ve been.
          </p>

          <p className="text-sm text-foreground/60 leading-relaxed">
            That shifted my focus from designing another &quot;shop new&quot; flow to designing
            systems that make existing value legible, the way people used to write their names
            inside pieces they passed on.
          </p>

          <p className="text-sm text-foreground/60 leading-relaxed">
            <span className="text-foreground/90 font-medium">PASSIT ON</span> is the product
            direction that came out of that: a visible chain of custody, not a fresh SKU.
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
