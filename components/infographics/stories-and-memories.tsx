export default function StoriesAndMemories() {
  return (
    <div className="space-y-6">

      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        Stories and Memories
      </span>

      <div className="flex flex-col md:flex-row gap-10 items-start">

        {/* Left: text hierarchy */}
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="text-2xl md:text-3xl font-light">
            Every garment carries a history.
          </h2>

          <p className="text-sm text-foreground/90 font-medium leading-relaxed">
            Clothing has always carried memory.
          </p>

          <p className="text-sm text-foreground/60 leading-relaxed">
            Long before digital systems, people left their names inside
            garments as they passed them on.
          </p>

          <p className="text-sm text-foreground/60 leading-relaxed">
            <span className="text-foreground/90 font-medium">PASS IT ON</span> extends
            this behavior into a visible chain of custody.
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
