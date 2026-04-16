import Image from "next/image"
import { BarChart3, Database, EyeOff, ArrowDown, ArrowRight } from "lucide-react"

function SectionRule() {
  return <div className="h-px w-full bg-[#578186]" aria-hidden />
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#578186]">{label}</p>
      <h2 className="text-xl font-bold leading-tight tracking-tight text-[#111111] md:text-2xl lg:text-[1.65rem]">{title}</h2>
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[4px] border border-[#578186]/35 bg-white/60 px-3 py-2 text-left shadow-sm">
      {children}
    </div>
  )
}

export function ClinicalTrialsVisualCaseStudy({ prototypeVideoSrc }: { prototypeVideoSrc: string }) {
  return (
    <div className="space-y-16 md:space-y-20">
      {/* 1 — Project overview */}
      <section className="space-y-6">
        <SectionRule />
        <SectionHeader label="Project overview" title="Designing decision clarity in clinical trial systems" />
        <p className="text-xs font-bold uppercase tracking-wide text-[#578186]">UI/UX design · Adobe designathon</p>
        <p className="max-w-3xl text-sm leading-relaxed text-[#111111] md:text-[15px]">
          We redesigned a clinical intelligence workspace for faster, defensible decisions under time pressure. The sprint
          centered trust, transparent AI signals, and a calmer hierarchy than typical enterprise dashboards. The full
          flow was built end-to-end in 10 hours with Hongxin Li under rapid critique loops.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip>
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#578186]">Timeline</p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">10 hr build · April 2026</p>
          </Chip>
          <Chip>
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#578186]">Role</p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">UX / UI · Strategy</p>
          </Chip>
          <Chip>
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#578186]">Tools</p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">Figma · Adobe Express · Cursor</p>
          </Chip>
          <Chip>
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#578186]">Team</p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">Violet Hyun · Hongxin Li</p>
          </Chip>
        </div>
        <div className="max-w-4xl space-y-2">
          <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-[#E6E4DD] p-4 shadow-sm sm:p-6 md:p-8">
            <Image
              src="/images/clinical-trials-hero-mockup.png"
              alt="Altrovia clinical trial intelligence dashboard mockup on a Studio Display"
              width={1024}
              height={765}
              className="h-auto w-full rounded-[4px]"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
          <p className="text-xs leading-relaxed text-[#6B7280]">
            <span className="font-bold uppercase tracking-[0.15em] text-[#578186]">Mockup · </span>
            High-fidelity hero from the designathon submission. Other sections on this page still use placeholders until
            export assets are added.
          </p>
        </div>
      </section>

      {/* 2 — Problem discovery */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="Problem discovery" title="Amendments cost teams before protocols ship" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { stat: "$43M", sub: "avg amendment cost per trial" },
            { stat: "$20M", sub: "estimated preventable exposure" },
            { stat: "75%", sub: "of trials require amendments" },
          ].map((s) => (
            <div
              key={s.stat}
              className="rounded-[4px] border border-[#578186]/30 bg-white/70 px-4 py-6 text-center shadow-sm md:py-8"
            >
              <p className="text-3xl font-bold tabular-nums text-[#578186] md:text-4xl">{s.stat}</p>
              <p className="mt-2 text-xs leading-snug text-[#6B7280]">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { Icon: BarChart3, title: "Poor benchmarking", body: "Weak baselines inflate risk signals." },
            { Icon: Database, title: "No precedent data", body: "Teams guess instead of comparing cohorts." },
            { Icon: EyeOff, title: "Opaque AI", body: "Outputs arrive without lineage or confidence." },
          ].map(({ Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-[8px] border border-[#111111]/10 bg-white/50 px-4 py-6 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-[4px] bg-[#578186]/15 text-[#578186]">
                <Icon className="size-6" strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-sm font-bold text-[#111111]">{title}</p>
              <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-[#6B7280]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — Our approach */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="Our approach" title="From problem list to design principles" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[8px] border border-[#111111]/10 bg-white/40 p-5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#578186]">Problems</p>
            <ol className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-[#111111]">
              <li className="flex gap-3">
                <span className="font-bold text-[#578186]">1</span>
                No defined target user
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#578186]">2</span>
                Unclear goals per workflow stage
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#578186]">3</span>
                Weak product differentiation
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#578186]">4</span>
                Visual system lacked clinical authority
              </li>
            </ol>
          </div>
          <div className="grid gap-3">
            {[
              { n: "01", t: "Confidence", d: "Users need certainty from dense data, not more widgets." },
              { n: "02", t: "Clarity over depth", d: "Design for decision clarity and trust over feature count." },
              { n: "03", t: "Right signal, right moment", d: "Surface what matters now; guide the next action." },
              { n: "04", t: "Clinical structure", d: "A disciplined system that reads as serious, not consumer." },
            ].map((c) => (
              <div key={c.n} className="rounded-[4px] border border-[#578186]/25 bg-[#578186]/[0.08] px-4 py-3">
                <p className="text-xs font-bold text-[#578186]">{c.n}</p>
                <p className="mt-1 text-sm font-bold text-[#111111]">{c.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
        <blockquote className="rounded-[8px] border border-[#578186]/30 bg-white/60 px-6 py-5 text-center text-sm font-normal italic leading-relaxed text-[#111111] md:text-base">
          &quot;Design for decision <strong className="not-italic text-[#578186]">clarity and trust</strong>, not for more
          features or more information.&quot;
        </blockquote>
      </section>

      {/* 4 — How do we build trust */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="Strategy" title="How do we build the trust?" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              n: "01",
              t: "Competitor analysis",
              lines: [
                "Mapped Medidata, Veeva, Palantir, and product references.",
                "Captured strengths and gaps in a structured pros/cons chart.",
              ],
            },
            {
              n: "02",
              t: "Key insight",
              lines: [
                "Trusted tools show their reasoning.",
                "Palantir, Cursor, and Supabase never hide the machine.",
              ],
            },
            {
              n: "03",
              t: "Design principles",
              lines: [
                "Surface AI visibly; never obscure how a value was generated.",
                "Give review and override at every sensitive step.",
              ],
            },
            {
              n: "04",
              t: "Design direction",
              lines: [
                "Sharper borders and teal for AI-augmented zones.",
                "Layouts modeled on analyst tools, not marketing sites.",
              ],
            },
          ].map((col) => (
            <div key={col.n} className="rounded-[8px] border border-[#111111]/10 bg-white/50 p-4">
              <p className="text-2xl font-bold text-[#578186]">{col.n}</p>
              <p className="mt-2 text-sm font-bold text-[#111111]">{col.t}</p>
              {col.lines.map((line) => (
                <p key={line} className="mt-2 text-xs leading-relaxed text-[#6B7280]">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="rounded-[8px] bg-[#578186] px-5 py-4 text-white shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wide text-white/90">Outcome</p>
          <p className="mt-2 text-sm leading-relaxed text-white/95">
            A shared strategy: build trust through <strong>structure, transparency, and control</strong>—validated with
            stakeholder interviews and feedback from current users.
          </p>
        </div>
      </section>

      {/* 5 — UX research */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="UX research" title="From scan to synthesis to wires" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {[
            { step: "01", title: "Competitor analysis", sub: "Mapped references" },
            { step: "02", title: "Adobe Express", sub: "Pros / cons chart" },
            { step: "03", title: "Wireframes", sub: "Clinical patterns" },
          ].map((s, i) => (
            <div key={s.step} className="flex flex-1 items-center gap-3">
              <div className="min-w-0 flex-1 rounded-[8px] border border-[#578186]/30 bg-white/60 px-4 py-3 text-center">
                <p className="text-xs font-bold text-[#578186]">{s.step}</p>
                <p className="mt-1 text-sm font-bold text-[#111111]">{s.title}</p>
                <p className="mt-0.5 text-[11px] text-[#6B7280]">{s.sub}</p>
              </div>
              {i < 2 ? (
                <ArrowRight className="hidden shrink-0 text-[#578186] md:block" strokeWidth={1.5} aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#578186]">Annotated boards</p>
          <p className="text-xs text-[#6B7280]">
            Two annotated scans—clinical enterprise vs. product-marketing references—were reorganized in Adobe Express into
            the four-quadrant pros / cons chart.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-white p-2 shadow-sm">
              <Image
                src="/images/clinical-trials-ux-board-clinical-vendors.png"
                alt="Annotated competitor scan: Medidata, Veeva, and Palantir marketing and product pages with green and red notes"
                width={381}
                height={152}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </div>
            <figcaption className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
              01 · Clinical platforms · Medidata · Veeva · Palantir
            </figcaption>
          </figure>
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-white p-2 shadow-sm">
              <Image
                src="/images/clinical-trials-ux-board-product-landings.png"
                alt="Annotated references: Linear, Supabase, Anduril, Scale.ai, Bunker, Vercel, and Palantir AI landing heroes with notes"
                width={381}
                height={154}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </div>
            <figcaption className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
              02 · Product / dev landings · Linear · Supabase · Anduril · Scale · Bunker · Vercel · Palantir AI
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-[8px] border border-dashed border-[#578186]/35 bg-[#578186]/[0.06] px-4 py-5 text-center md:flex-row md:justify-center md:gap-5">
          <ArrowDown className="size-5 shrink-0 text-[#578186] md:hidden" strokeWidth={1.75} aria-hidden />
          <span className="rounded-[4px] border border-[#578186]/40 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#578186]">
            Adobe Express
          </span>
          <p className="max-w-md text-xs leading-snug text-[#6B7280]">
            Typography, crops, and callout colors were aligned so both boards could collapse into one legible comparison.
          </p>
          <ArrowRight className="hidden size-5 shrink-0 text-[#578186] md:block" strokeWidth={1.75} aria-hidden />
        </div>
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-white p-2 shadow-sm">
            <Image
              src="/images/clinical-trials-ux-pros-cons-synthesis.png"
              alt="Pros and cons synthesis grid: branding mismatch, bad visual systems vs. readability, credibility, and related notes"
              width={526}
              height={294}
              className="h-auto w-full"
              sizes="(max-width: 1100px) 100vw, 900px"
            />
          </div>
          <figcaption className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
            03 · Synthesis · Cons / pros matrix from both boards
          </figcaption>
        </figure>
        <div className="rounded-[8px] border border-[#111111]/10 bg-[#111111]/[0.04] p-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-[#578186]">Reference set</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {["Medidata", "Veeva", "Palantir", "Linear.app", "Supabase", "Anduril", "Vercel", "Bunker", "Primer.ai", "Scale.ai"].map(
              (name) => (
                <span
                  key={name}
                  className="rounded-[4px] border border-[#578186]/20 bg-white/70 py-2 text-center text-[11px] font-semibold text-[#111111]"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-[#111111]">
          <strong className="text-[#578186]">Takeaway:</strong> the most trusted products show their reasoning—so we
          tightened hierarchy, surfaced AI lineage, and borrowed navigation patterns from Linear and Palantir.
        </p>
      </section>

      {/* 6 — Visual system */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="Visual system" title="Color and type" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#578186]">Palette</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { hex: "#578186", name: "Altrovia teal", use: "Primary actions" },
              { hex: "#EAEFF0", name: "Teal light", use: "Nav / hover" },
              { hex: "#F7F8FA", name: "Surface", use: "Cards" },
              { hex: "#151819", name: "Dark", use: "Primary text" },
              { hex: "#6B7280", name: "Mid", use: "Secondary text" },
              { hex: "#E5E7EA", name: "Border", use: "Dividers" },
            ].map((sw) => (
              <div key={sw.hex} className="flex items-center gap-3 rounded-[4px] border border-[#111111]/10 bg-white/60 p-3">
                <div className="size-10 shrink-0 rounded-[4px] border border-[#111111]/10 shadow-inner" style={{ backgroundColor: sw.hex }} />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#111111]">{sw.hex}</p>
                  <p className="text-[11px] font-semibold text-[#578186]">{sw.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{sw.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#578186]">Typography</p>
          <div className="mt-3 space-y-4 rounded-[8px] border border-[#111111]/10 bg-white/50 p-5">
            <p className="text-3xl font-bold leading-tight text-[#111111]">Display — trial overview</p>
            <p className="text-lg font-semibold text-[#111111]">Section header · active module</p>
            <p className="text-sm font-medium text-[#111111]">Button · AI badge · table label</p>
            <p className="text-sm font-normal leading-relaxed text-[#6B7280]">Body copy for dense tables and helper text.</p>
            <p className="text-xs font-light text-[#6B7280]">Caption · meta · timestamps</p>
          </div>
        </div>
      </section>

      {/* 7 — How we built it */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="Process" title="How we built it" />
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-[#F5F1E6] p-1 shadow-sm">
            <Image
              src="/images/clinical-trials-how-we-built-montage.png"
              alt="Process montage: exploration thumbnails and wireframes, dashboard UI, and Cursor editor with code and diffs"
              width={1024}
              height={252}
              className="h-auto w-full rounded-[4px]"
              sizes="(max-width: 1100px) 100vw, 900px"
            />
          </div>
          <figcaption className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
            From exploration grids and wireframes to dashboard UI and Cursor implementation
          </figcaption>
        </figure>
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[640px] items-stretch gap-2 md:min-w-0 md:gap-3">
            {[
              { n: "01", t: "Moodboard", tag: "Figma" },
              { n: "02", t: "Dashboard", tag: "Figma" },
              { n: "03", t: "MCP revisions", tag: "Figma MCP" },
              { n: "04", t: "Prototype", tag: "Cursor" },
              { n: "05", t: "AI assist", tag: "AI" },
            ].map((s, i) => (
              <div key={s.n} className="flex flex-1 items-center gap-2">
                <div className="min-w-0 flex-1 rounded-[4px] border border-[#578186]/35 bg-[#578186]/10 px-3 py-3 text-center">
                  <p className="text-[11px] font-bold text-[#578186]">{s.n}</p>
                  <p className="mt-1 text-xs font-bold text-[#111111]">{s.t}</p>
                  <span className="mt-2 inline-block rounded-[4px] bg-white/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#578186]">
                    {s.tag}
                  </span>
                </div>
                {i < 4 ? <ArrowRight className="hidden shrink-0 text-[#578186] sm:block" size={16} strokeWidth={1.5} /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[8px] border border-[#111111]/15 bg-[#111111]/[0.06] px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#578186]">Challenge</p>
          <p className="mt-2 text-sm font-semibold text-[#111111]">UI rules drifted across eight pages.</p>
          <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
            We cleaned up manually in Figma and Cursor—fast, but not perfectly consistent without a final audit pass.
          </p>
        </div>
      </section>

      {/* 8 — Design challenges */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="Design challenges" title="Where the sprint got hard" />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              n: "01",
              title: "Understanding real user needs",
              sum: "No direct access to end users.",
              bullets: [
                "Deep pass on the existing product and company context.",
                "Structured questions to Chris on goals and pain points.",
                "Used stakeholder input as a proxy for interviews.",
              ],
            },
            {
              n: "02",
              title: "Maintaining UI consistency",
              sum: "AI speed without precision.",
              bullets: [
                "Ran batches through Cursor to auto-fix drift.",
                "Still needed manual polish on edge spacing.",
                "Good enough workflow, not a perfect pipeline.",
              ],
            },
          ].map((card) => (
            <div key={card.n} className="rounded-[8px] border border-[#111111]/10 bg-white/60 p-5">
              <p className="text-xs font-bold text-[#578186]">{card.n}</p>
              <p className="mt-2 text-lg font-bold text-[#111111]">{card.title}</p>
              <p className="mt-1 text-sm text-[#6B7280]">{card.sum}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#111111]">
                {card.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#578186]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 9 — User feedback */}
      <section className="space-y-8">
        <SectionRule />
        <SectionHeader label="User feedback" title="What we heard" />
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              name: "Emily Shen",
              role: "NYU alum · Product designer, Palantir",
              quote: "Rounded corners feel too sales-y. A serious clinical product needs sharper borders for authority.",
              bullets: ["Sharpen corners and grid rhythm.", "Borrow analyst-grade density.", "Reduce decorative chrome."],
              sessionSrc: "/images/clinical-trials-feedback-emily-shen.png",
              sessionW: 372,
              sessionH: 302,
              sessionAlt: "Video call screenshot from feedback session with Emily Shen",
            },
            {
              name: "Christos",
              role: "Altrovia AI",
              quote: "The dashboard should read as a portfolio: clients see status and risk at a glance.",
              bullets: ["Stronger emphasis on active trials.", "More visual hierarchy than tables alone.", "Client-ready overview first."],
              sessionSrc: "/images/clinical-trials-feedback-christos.png",
              sessionW: 473,
              sessionH: 302,
              sessionAlt: "Video call screenshot from feedback session with Christos",
            },
          ].map((p) => (
            <div key={p.name} className="space-y-4">
              <div>
                <p className="text-lg font-bold text-[#111111]">{p.name}</p>
                <p className="text-xs font-semibold text-[#578186]">{p.role}</p>
              </div>
              <blockquote className="rounded-[8px] border border-[#578186]/25 bg-[#578186]/[0.07] px-4 py-4 text-sm italic leading-relaxed text-[#111111]">
                &quot;{p.quote}&quot;
              </blockquote>
              <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-[#111111]/[0.04] shadow-sm">
                <Image
                  src={p.sessionSrc}
                  alt={p.sessionAlt}
                  width={p.sessionW}
                  height={p.sessionH}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#578186]">Key feedback</p>
                <ul className="mt-2 space-y-2 text-sm text-[#111111]">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#578186]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10 — Final UI */}
      <section className="space-y-6">
        <SectionRule />
        <SectionHeader label="Final UI" title="Seven core screens" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              name: "Workspace",
              cap: "Overview · trial cards · new trial CTA",
              src: "/images/clinical-trials-ui-01-workspace.png",
              w: 1024,
              h: 640,
              alt: "Altrovia workspace: trial table, search, filters, and pagination",
            },
            {
              n: "02",
              name: "Design parameters",
              cap: "AI badge · collapsible rows · label/value rhythm",
              src: "/images/clinical-trials-ui-02-design-parameters.png",
              w: 1024,
              h: 640,
              alt: "Design parameters for TALAPRO-2 with AI-extracted badge and expandable protocol sections",
            },
            {
              n: "03",
              name: "Run analysis",
              cap: "Saved runs · scope badges · timestamps",
              src: "/images/clinical-trials-ui-03-run-analysis.png",
              w: 1024,
              h: 640,
              alt: "Trial analysis hub listing saved intelligence runs with scope tags and view actions",
            },
            {
              n: "04",
              name: "View results",
              cap: "Comparator table · amendment callouts",
              src: "/images/clinical-trials-ui-04-view-results.png",
              w: 1024,
              h: 640,
              alt: "Trial intelligence analysis: KPIs, feasibility cards, enrollment curve, benchmark table",
            },
            {
              n: "05",
              name: "Generate protocol",
              cap: "Status bar · ten sections · readiness CTA",
              src: "/images/clinical-trials-ui-05-generate-protocol.png",
              w: 1024,
              h: 640,
              alt: "Generate protocol flow with readiness metrics and ten-section outline",
            },
            {
              n: "06",
              name: "Version gallery",
              cap: "Latest draft · history notes",
              src: "/images/clinical-trials-ui-06-version-gallery.png",
              w: 1024,
              h: 640,
              alt: "Version gallery with latest draft card and chronological protocol history",
            },
            {
              n: "07",
              name: "Complexity assessment",
              cap: "Wizard · review · score bar",
              src: "/images/clinical-trials-ui-07-complexity-assessment.png",
              w: 1024,
              h: 640,
              alt: "Review extracted data step: study basics form and live complexity score footer",
            },
          ].map((ui) => (
            <div key={ui.n} className="space-y-2">
              <div className="overflow-hidden rounded-[8px] border border-[#111111]/10 bg-white shadow-sm">
                <Image
                  src={ui.src}
                  alt={ui.alt}
                  width={ui.w}
                  height={ui.h}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
                {ui.n} · {ui.name}
              </p>
              <p className="text-xs leading-snug text-[#111111]">{ui.cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo video — compact, visual */}
      <section className="space-y-4">
        <SectionRule />
        <SectionHeader label="Demo" title="Prototype walkthrough" />
        <div className="overflow-hidden rounded-[8px] border border-[#111111]/15 bg-black shadow-lg">
          <video controls playsInline preload="metadata" className="aspect-video w-full object-contain">
            <source src={prototypeVideoSrc} type="video/quicktime" />
            <source src={prototypeVideoSrc} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 11 — What we fixed */}
      <section className="space-y-6">
        <SectionRule />
        <SectionHeader label="Reflection" title="What we fixed" />
        <p className="max-w-3xl text-sm leading-relaxed text-[#6B7280]">
          We closed the biggest trust and layout gaps first: clearer AI provenance, consistent sidebars, and scanning
          patterns that felt clinical instead of consumer.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { t: "AI trust was invisible", f: "Added extraction badges and source callouts on parameters." },
            { t: "Sidebar overlap", f: "Rebuilt footer alignment across sidebars in one coordinated pass." },
            { t: "Consumer tone", f: "Shifted to sharper borders after Palantir-informed critique." },
            { t: "Hard-to-scan parameters", f: "Collapsible rows with muted label vs. dark value." },
          ].map((x) => (
            <div key={x.t} className="rounded-[4px] border border-[#111111]/10 bg-white/70 p-4 shadow-sm">
              <p className="text-sm font-bold text-[#111111]">{x.t}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{x.f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12 — If we had more time... */}
      <section className="space-y-6">
        <SectionRule />
        <SectionHeader label="Reflection" title="If we had more time..." />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { t: "Design consistency", d: "Full grid audit for spacing and alignment across every screen." },
            { t: "Landing page", d: "Stronger clinical value story with real marketing visuals." },
            { t: "User testing", d: "Sessions with trial ops to validate AI trust patterns." },
            { t: "Dashboard visuals", d: "More emphasis on active trials and status, beyond tables." },
          ].map((w) => (
            <div key={w.t} className="rounded-[8px] border border-dashed border-[#578186]/35 bg-white/40 p-4">
              <p className="text-sm font-bold text-[#111111]">{w.t}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13 — Personal note */}
      <section>
        <SectionRule />
        <div className="rounded-[8px] bg-[#578186]/12 px-6 py-10 text-center md:px-12 md:py-12">
          <p className="text-4xl font-light leading-none text-[#578186]/50" aria-hidden>
            &ldquo;
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-normal italic leading-relaxed text-[#111111] md:text-base">
            The time pressure was extreme, but we hustled as hard as we could and still landed something that felt worth
            showing. I am proud of that outcome. When you are forced to move that fast, you end up trying to use AI in a
            smarter, more deliberate way, not just as a shortcut around the hard parts.
          </p>
        </div>
      </section>
    </div>
  )
}
