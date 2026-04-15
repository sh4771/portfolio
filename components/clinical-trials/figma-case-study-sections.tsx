import { cn } from "@/lib/utils"

/** Figma MCP asset URLs (Altrovia Redesign) — refresh from Figma if expired (~7 days). */
const ASSETS = {
  coverMock: "https://www.figma.com/api/mcp/asset/6102f782-c3fc-4d3d-9109-78424671e364",
  introViolet: "https://www.figma.com/api/mcp/asset/b791d770-d5f0-4f67-a35f-8476ae1240de",
  introHongxin: "https://www.figma.com/api/mcp/asset/9cfcfc2a-3a0b-43d1-9fba-46eb14651bbe",
  /** 02 Design references — large board */
  uxRefBoard: "https://www.figma.com/api/mcp/asset/ce947b5b-a2dd-497d-90b4-2f897761f66c",
  /** 01 Competitor analysis — supporting screenshots */
  uxRefSmallA: "https://www.figma.com/api/mcp/asset/a5f7f139-7c14-49b6-9e4b-2e8f3075f3df",
  uxRefSmallB: "https://www.figma.com/api/mcp/asset/0f41c9bb-a1a2-4dd0-8f83-00874065f807",
  feedbackEmily: "https://www.figma.com/api/mcp/asset/1b495a26-ebf4-4854-b53b-7fa4be9668b6",
  feedbackChris: "https://www.figma.com/api/mcp/asset/2290f946-256b-4d52-988c-19edc461243d",
  ui01: "https://www.figma.com/api/mcp/asset/58e93b73-0239-4196-a487-c9e855349fb2",
  ui02: "https://www.figma.com/api/mcp/asset/cba3230e-ef87-48d9-8937-6b701bb28558",
  ui03: "https://www.figma.com/api/mcp/asset/7b154c4e-f038-406d-818f-2faf030d9707",
  ui04: "https://www.figma.com/api/mcp/asset/f6a17f86-01a0-4e4c-808c-4cab8d68f42c",
  ui05: "https://www.figma.com/api/mcp/asset/c38a1d84-0c4b-449b-a78c-24f4da561536",
  ui06: "https://www.figma.com/api/mcp/asset/dec2e9eb-8224-4500-8618-f72bd3be460c",
  ui07: "https://www.figma.com/api/mcp/asset/7a4e0982-f0e0-4038-ab58-f6707dfa85ff",
  wf1: "https://www.figma.com/api/mcp/asset/7b726738-ff25-49bd-bff6-d6586cd230c4",
  wf2: "https://www.figma.com/api/mcp/asset/94381ef4-bb58-46f7-b440-26b066284dff",
  wf3: "https://www.figma.com/api/mcp/asset/a2a7a232-cffd-40c6-b6de-f24d0bbe7a0b",
  wf4: "https://www.figma.com/api/mcp/asset/60e2f977-1985-40af-8d48-f7f20919cf42",
  wf5: "https://www.figma.com/api/mcp/asset/92fdf203-f575-4f60-80f2-3a34c9931ef7",
  wf6: "https://www.figma.com/api/mcp/asset/c694d9de-92cd-47a9-aab8-2d70eaed7b27",
  wf7: "https://www.figma.com/api/mcp/asset/56d7b7d0-39ac-4d63-9241-da6c11415e59",
  wf8: "https://www.figma.com/api/mcp/asset/943322c8-51bf-49ef-b96f-f771c969a703",
} as const

function FigmaImg({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Figma MCP temporary asset URLs
    <img src={src} alt={alt} className={cn("h-auto max-w-full rounded-lg border border-black/5", className)} loading="lazy" />
  )
}

function SectionShell({
  eyebrow,
  title,
  children,
  titleClassName,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  titleClassName?: string
}) {
  return (
    <section className="space-y-8 rounded-2xl border border-[#578186]/25 bg-[#f2ede2] px-5 py-10 md:px-10 md:py-12">
      <div className="h-px w-full bg-[#578186]" />
      <p className="text-[11px] font-normal uppercase tracking-wide text-[#578186]">{eyebrow}</p>
      <h2 className={cn("text-4xl font-bold lowercase leading-tight text-[#578186] md:text-5xl", titleClassName)}>
        {title}
      </h2>
      {children}
      <div className="h-px w-full bg-[#578186]" />
    </section>
  )
}

const colorTokens = [
  { hex: "#578186", name: "Altrovia Teal", use: "Primary action" },
  { hex: "#EAEFF0", name: "Teal Light", use: "Active nav / hover" },
  { hex: "#F7F8FA", name: "Surface", use: "Page background" },
  { hex: "#151819", name: "Dark", use: "Primary text" },
  { hex: "#6B7280", name: "Mid", use: "Secondary text" },
  { hex: "#9BA1AC", name: "Muted", use: "Labels / placeholders" },
  { hex: "#E5E7EA", name: "Border", use: "Dividers / cards" },
  { hex: "#1CAB72", name: "Success", use: "Complete / low risk" },
  { hex: "#EE3C3C", name: "Error", use: "Critical amendments" },
]

const typeScale = [
  { label: "Aa  Bold", use: "Screen titles / large headings", size: "20 - 72px", className: "text-2xl font-bold" },
  { label: "Aa  Semi Bold", use: "Section headers / active nav", size: "13 - 16px", className: "text-xl font-semibold" },
  { label: "Aa  Medium", use: "Buttons / labels / AI badge", size: "9 - 13px", className: "text-lg font-medium" },
  { label: "Aa  Regular", use: "Body text / breadcrumbs", size: "10 - 12px", className: "text-base font-normal" },
  { label: "Aa  Light", use: "Captions / muted meta", size: "9 - 10px", className: "text-sm font-light" },
]

const finalScreens = [
  {
    src: ASSETS.ui01,
    title: "01  Workspace",
    body: "Trial cards with status badges, stat summary row, + New Trial CTA. Entry point for all trial work.",
    note: "Sidebar: Overview active",
  },
  {
    src: ASSETS.ui02,
    title: "02  Design Parameters",
    body: "AI extraction badge, collapsible section rows with teal borders, muted label + dark value pattern.",
    note: "Sidebar: Design Parameters active",
  },
  {
    src: ASSETS.ui03,
    title: "03  Run Analysis",
    body: "Saved analyses with Wide/Standard/Strict scope badges, View buttons, timestamp display.",
    note: "Sidebar: Intelligence active",
  },
  {
    src: ASSETS.ui04,
    title: "04  View Results",
    body: "Comparator table: trial name, phase, N, primary endpoint, match quality (High/Medium/Low). Amendment risk callout.",
    note: "",
  },
  {
    src: ASSETS.ui05,
    title: "05  Generate Protocol",
    body: "Status bar (complexity, params, analysis date, amendments), 10-section 2-col grid, readiness CTA box.",
    note: "",
  },
  {
    src: ASSETS.ui06,
    title: "06  Version Gallery",
    body: "Latest version card with word count + quality score stats. Version history with change notes per draft.",
    note: "",
  },
  {
    src: ASSETS.ui07,
    title: "07  Complexity Assessment",
    body: "Multi-step wizard (Upload > Extract > Review > Calculate). Left section nav, dropdown fields, 6-dim score bar.",
    note: "",
  },
]

const wireframeShots = [
  ASSETS.wf1,
  ASSETS.wf2,
  ASSETS.wf3,
  ASSETS.wf4,
  ASSETS.wf5,
  ASSETS.wf6,
  ASSETS.wf7,
  ASSETS.wf8,
]

export function FigmaCaseStudySections({ prototypeVideoSrc }: { prototypeVideoSrc: string }) {
  return (
    <div className="space-y-16">
      {/* 01 — Cover */}
      <SectionShell eyebrow="NYU x Adobe Design Competition 2026" title="ALTROVIA" titleClassName="!normal-case text-center text-5xl md:text-7xl lg:text-8xl">
        <div className="mx-auto max-w-3xl pt-2">
          <FigmaImg src={ASSETS.coverMock} alt="Altrovia dashboard hero mockup" className="w-full shadow-2xl" />
        </div>
      </SectionShell>

      {/* 02 — Intro */}
      <SectionShell eyebrow="Introduction" title="introduction" titleClassName="!text-[2rem] md:!text-3xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 size-[200px] overflow-hidden rounded-full border-4 border-[#e9eff0] md:size-[220px]">
              <FigmaImg src={ASSETS.introViolet} alt="Violet Hyun" className="size-full border-0 object-cover" />
            </div>
            <p className="text-xl font-bold text-[#578186]">Violet Hyun</p>
            <p className="mt-1 text-xs font-bold text-[#1c1c1c]">Computational Design Practices</p>
            <p className="mt-1 text-xs text-[#578186]">Columbia University</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["UX Research", "Creative Tech", "Art"].map((t) => (
                <span key={t} className="rounded bg-[#e9eff0] px-2.5 py-1 text-[13px] text-[#578186]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 size-[200px] overflow-hidden rounded-full border-4 border-[#e9eff0] md:size-[220px]">
              <FigmaImg src={ASSETS.introHongxin} alt="Hongxin Li" className="size-full border-0 object-cover" />
            </div>
            <p className="text-xl font-bold text-[#578186]">Hongxin Li</p>
            <p className="mt-1 text-xs font-bold text-[#1c1c1c]">Integrated Design Media</p>
            <p className="mt-1 text-xs text-[#578186]">New York University</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Design", "Media", "Art"].map((t) => (
                <span key={t} className="rounded bg-[#e9eff0] px-2.5 py-1 text-[13px] text-[#578186]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      {/* 03 — Problem + Goals */}
      <SectionShell eyebrow="Our approach" title="the problem" titleClassName="!text-[2.5rem] md:!text-5xl">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-base font-bold text-[#1c1c1c]">PROBLEM</p>
            <div className="mt-2 h-0.5 w-full max-w-[300px] bg-[#578186]" />
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] font-bold leading-7 text-[rgba(47,47,47,0.9)]">
              <li>No defined target user</li>
              <li>Unclear user goals per workflow stage</li>
              <li>Weak product differentiation</li>
              <li>Visual system lacked clinical authority</li>
            </ol>
          </div>
          <div>
            <p className="text-base font-bold text-[#1c1c1c]">INSIGHT + STRATEGY</p>
            <div className="mt-2 h-0.5 w-full max-w-[340px] bg-[#578186]" />
            <div className="mt-4 space-y-4 text-[13px] leading-snug text-[#1c1c1c]">
              <p>
                <span className="font-bold text-[#578186]">01</span> Users make high-stakes decisions from complex
                data. They need confidence, not more information.
              </p>
              <p>
                <span className="font-bold text-[#578186]">02</span> Design for decision clarity and trust over feature
                depth.
              </p>
              <p>
                <span className="font-bold text-[#578186]">03</span> Surface the right signal at the right moment. Guide
                next actions. Reduce noise.
              </p>
              <p>
                <span className="font-bold text-[#578186]">04</span> Build a structured visual system suited to a
                clinical, high-stakes context.
              </p>
            </div>
          </div>
          <div className="rounded-[31px] bg-[#e9eff0] p-6">
            <p className="text-base font-bold text-[#578186]">GOALS</p>
            <p className="mt-3 text-base leading-relaxed text-[#1c1c1c]">
              &quot;Design for decision <strong>clarity and trust</strong>, not for more features or more
              information.&quot;
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 04 — Trust */}
      <SectionShell eyebrow="Problem + Design goals" title="how do we build the trust?" titleClassName="!text-3xl md:!text-[2.75rem]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              h: "Competitor Analysis",
              b: "Studied Medidata, Veeva, and Palantir alongside design references including Linear, Cursor, and Supabase. Mapped each product's branding strengths and weaknesses using a structured pros and cons chart built in Adobe Express.",
            },
            {
              n: "02",
              h: "Key Insight",
              b: "The most trusted products show their reasoning. Palantir makes AI logic visible step by step. Cursor embeds AI into real workflows. Supabase builds trust through transparency. None of them hide the machine.",
            },
            {
              n: "03",
              h: "Design Principles",
              b: "From those insights we defined three principles: surface AI outputs visibly and never obscure how a value was generated, give users control to review and override at every step, and use a visual language that signals structure and authority, not consumer software.",
            },
            {
              n: "04",
              h: "Design Direction",
              b: "Sharper borders to communicate clinical precision. Teal as the primary trust color distinguishing AI-augmented areas. A clear typographic hierarchy separating labels, values, and actions. Structured layouts modeled on analyst tools, not marketing sites.",
            },
          ].map((col) => (
            <div key={col.n} className="space-y-2">
              <p className="text-[28px] font-bold text-[#578186]">{col.n}</p>
              <div className="h-0.5 w-8 bg-[#578186]" />
              <p className="text-[13px] font-bold text-[#1c1c1c]">{col.h}</p>
              <p className="text-xs leading-relaxed text-[#6b6b6b]">{col.b}</p>
            </div>
          ))}
        </div>
        <div className="rounded-md bg-[#e9eff0] px-5 py-4">
          <p className="text-base font-bold text-[#578186]">OUTCOME</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#1c1c1c]">
            These four steps gave us a clear design strategy grounded in research: build trust through{" "}
            <strong>structure, transparency, and control.</strong> In order to achieve this, we tried to understand
            user&apos;s perspective by running <strong>interviews with Chris, and asked for feedback from the current users.</strong>
          </p>
        </div>
      </SectionShell>

      {/* 05 — Reference / UX research */}
      <SectionShell eyebrow="Key user flow + research" title="ux research" titleClassName="!text-[2.5rem] md:!text-[4rem]">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Competitor Analysis",
              d: "Studied Medidata, Veeva, Palantir and design references. Mapped branding strengths and weaknesses.",
            },
            {
              n: "02",
              t: "Organized with Adobe Express",
              d: "Used Adobe Express to structure findings into a pros and cons chart. Made insights actionable.",
            },
            { n: "03", t: "Wireframes", d: "Used top pros from the chart as a direct foundation. Built wireframes around patterns that fit a clinical context." },
          ].map((s) => (
            <div key={s.n}>
              <p className="text-[22px] font-bold text-[#578186]">{s.n}</p>
              <p className="mt-1 text-[13px] font-bold text-[#1c1c1c]">{s.t}</p>
              <p className="mt-2 text-base leading-snug text-[#6b6b6b]">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-[#d9d9d9] px-4 py-3">
          <p className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#578186]">
            {["Medidata", "Veeva", "Palantir", "Linear.app", "Cursor", "Supabase", "Anduril", "Vercel", "Primer.ai", "Scale.ai"].map(
              (b) => (
                <span key={b}>{b}</span>
              ),
            )}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-base font-bold text-[#1c1c1c]">01  COMPETITOR ANALYSIS</p>
            <div className="grid grid-cols-2 gap-2">
              <FigmaImg src={ASSETS.uxRefSmallA} alt="Competitor reference screenshot A" />
              <FigmaImg src={ASSETS.uxRefSmallB} alt="Competitor reference screenshot B" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-base font-bold text-[#1c1c1c]">02  DESIGN REFERENCES</p>
            <FigmaImg src={ASSETS.uxRefBoard} alt="Adobe Express pros and cons synthesis" />
          </div>
        </div>
        <div>
          <p className="text-base font-bold text-[#1c1c1c]">03  FROM RESEARCH TO WIREFRAMES</p>
          <div className="mt-2 h-px bg-[#578186]" />
          <p className="mt-4 text-xs leading-relaxed text-[#1c1c1c]">
            The Adobe Express chart surfaced one clear pattern:{" "}
            <strong className="font-bold">the most trusted products show their reasoning.</strong> That insight shaped
            every wireframe decision: sharper layouts, denser hierarchy, transparent AI surfacing, and sidebar
            navigation modeled on Linear and Palantir.
          </p>
        </div>
      </SectionShell>

      {/* 06 — Visual system */}
      <SectionShell eyebrow="Visual system" title="visual system" titleClassName="!text-[2.5rem] md:!text-[4rem]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#1c1c1c]">Color palette</p>
          <div className="mt-2 h-0.5 w-48 bg-[#578186]" />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colorTokens.map((c) => (
              <div key={c.hex} className="space-y-2">
                <div className="h-14 w-14 rounded-lg border border-black/10 shadow-sm" style={{ backgroundColor: c.hex }} />
                <p className="text-xs font-bold text-[#1c1c1c]">{c.hex}</p>
                <p className="text-xs font-bold text-[#1c1c1c]">{c.name}</p>
                <p className="text-xs text-[#6b6b6b]">{c.use}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#1c1c1c]">Typography</p>
          <div className="mt-2 h-0.5 w-48 bg-[#578186]" />
          <div className="mt-6 space-y-4">
            {typeScale.map((row) => (
              <div key={row.label} className="grid gap-4 border-b border-[#e5e7ea] pb-4 md:grid-cols-[1fr_2fr_auto] md:items-center">
                <p className={cn("whitespace-pre text-[#1c1c1c]", row.className)}>{row.label}</p>
                <p className="text-[15.6px] text-[#6b6b6b]">{row.use}</p>
                <p className="text-[15.6px] text-[#578186]">{row.size}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 07 — Key flow + wireframes */}
      <SectionShell eyebrow="Key user flow + how we built it" title="how we built it" titleClassName="!text-[2.5rem] md:!text-[4rem]">
        <div className="rounded-lg bg-[#f2e7d1] px-4 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { n: "01", t: ["Moodboard +", "Wireframes"], tags: ["Figma", "cosmos.so"] },
              { n: "02", t: ["Dashboard", "in Figma"], tags: ["Figma"] },
              { n: "03", t: ["MCP for", "Revisions"], tags: ["Figma MCP"] },
              { n: "04", t: ["Prototype", "with Cursor"], tags: ["Cursor AI"] },
              { n: "05", t: ["AI", "Throughout"], tags: ["AI-accelerated"] },
            ].map((step) => (
              <div key={step.n} className="text-left">
                <p className="text-[13px] font-bold text-[#578186]">{step.n}</p>
                {step.t.map((line) => (
                  <p key={line} className="text-xs font-bold leading-tight text-[#1c1c1c]">
                    {line}
                  </p>
                ))}
                <div className="mt-2 flex flex-wrap gap-1">
                  {step.tags.map((tag) => (
                    <span key={tag} className="rounded bg-[#e9eff0] px-2 py-0.5 text-[10px] text-[#578186]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {wireframeShots.map((src, i) => (
            <FigmaImg key={i} src={src} alt={`Process screenshot ${i + 1}`} className="aspect-video object-cover" />
          ))}
        </div>
        <div className="rounded-md bg-[#f2e7d1] px-5 py-3">
          <p className="text-base font-bold text-[#578186]">CHALLENGE</p>
          <p className="mt-1 text-xs leading-relaxed text-[#1c1c1c]">
            We could not consistently maintain UI rules across all 8 pages. Due to this problem, we had to manually
            cleanup in Figma and Cursor.
          </p>
        </div>
      </SectionShell>

      {/* 08 — Design challenges */}
      <SectionShell eyebrow="Design challenges" title="design challenges" titleClassName="!text-[2.5rem] md:!text-[3.5rem]">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-[13px] text-[#578186]">01</p>
            <p className="mt-2 text-xl font-bold text-[#151918]">Understanding Real User Needs</p>
            <p className="mt-2 text-base text-[#6b7280]">We had no direct access to end users, so we had to get creative.</p>
            <ul className="mt-4 space-y-3 text-base text-[#151918]">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                Researched the company and their existing product deeply.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                Asked Chris directly: what do your users care about, what do they look at, and where do they usually
                struggle?
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                Used that feedback as a stand-in for actual user interviews.
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] text-[#578186]">02</p>
            <p className="mt-2 text-xl font-bold text-[#151918]">Maintaining UI Consistency</p>
            <p className="mt-2 text-base text-[#6b7280]">
              AI tools are fast but not precise. Keeping the UI consistent was an ongoing battle.
            </p>
            <ul className="mt-4 space-y-3 text-base text-[#151918]">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                Pushed everything through Cursor to auto-clean inconsistencies.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                It got most things right, but minor details still needed manual fixes.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                Ended up being a useful workflow, just not a perfect one.
              </li>
            </ul>
          </div>
        </div>
        <p className="text-right text-base text-[#578186]">ALTROVIA · 2026</p>
      </SectionShell>

      {/* 09 — User feedback */}
      <SectionShell eyebrow="User feedback + iteration" title="user feedback + iteration" titleClassName="!text-[2.25rem] md:!text-[3.5rem]">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-base font-bold text-[#578186]">USER TESTER 01</p>
            <p className="mt-1 text-lg font-bold text-[#1c1c1c]">Emily Shen</p>
            <p className="text-base text-[#578186]">NYU Alum · Product Designer, Palantir</p>
            <FigmaImg src={ASSETS.feedbackEmily} alt="Session with Emily Shen" className="mt-4" />
            <blockquote className="mt-4 border-l-[3px] border-[#578186] pl-3 text-[13px] italic leading-relaxed text-[#1c1c1c]">
              &quot;Rounded corners feel too sales-y. A more serious, clinical product needs sharper borders to communicate
              authority and trust.&quot;
            </blockquote>
            <p className="mt-4 text-base font-bold text-[#578186]">IMPACT ON DESIGN</p>
            <p className="mt-2 text-base leading-relaxed text-[#6b6b6b]">
              Emily&apos;s Palantir perspective: designing for high-stakes analyst workflows: directly shaped our decision to
              move toward sharper borders and a more structured, clinical visual tone throughout.
            </p>
          </div>
          <div>
            <p className="text-base font-bold text-[#578186]">STAKEHOLDER REVIEW</p>
            <p className="mt-1 text-lg font-bold text-[#1c1c1c]">Christos</p>
            <p className="text-base text-[#578186]">Altrovia AI</p>
            <FigmaImg src={ASSETS.feedbackChris} alt="Session with Christos" className="mt-4" />
            <blockquote className="mt-4 border-l-[3px] border-[#578186] pl-3 text-[13px] italic leading-relaxed text-[#1c1c1c]">
              &quot;The dashboard needs to be a portfolio view: clients should see everything at once. More visuals, stronger
              emphasis on active trials and trial status.&quot;
            </blockquote>
            <p className="mt-4 text-base font-bold text-[#578186]">KEY FEEDBACK</p>
            <ul className="mt-2 space-y-2 text-base text-[#6b6b6b]">
              {[
                "Visual hierarchy: data needs to be more visual, not tabular",
                "Active trials + status need much stronger emphasis",
                "Dashboard should function as a client-facing portfolio view",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 bg-[#578186]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      {/* 10 — Final UI */}
      <SectionShell eyebrow="Final UI screens" title="final ui interface" titleClassName="!text-[2.25rem] md:!text-[3.5rem]">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {finalScreens.map((s) => (
            <div key={s.title}>
              <FigmaImg src={s.src} alt={s.title} className="aspect-[16/10] object-cover object-top" />
              <p className="mt-3 text-[13px] font-bold whitespace-pre-wrap text-[#1c1c1c]">{s.title}</p>
              <p className="mt-1 text-xs leading-snug text-[#6b6b6b]">{s.body}</p>
              {s.note ? <p className="mt-2 text-base text-[#578186]">{s.note}</p> : null}
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 11 — Demo */}
      <SectionShell eyebrow="demo" title="demo" titleClassName="!text-[2.25rem] md:!text-[3.5rem]">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-black shadow-lg">
          <video controls playsInline preload="metadata" className="aspect-video w-full object-contain">
            <source src={prototypeVideoSrc} type="video/quicktime" />
            <source src={prototypeVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-center text-xs text-[#6b6b6b]">
          Screen recording of the prototype (replaces placeholder in Figma file node 11 — Demo).
        </p>
      </SectionShell>

      {/* 12 — Reflection */}
      <SectionShell eyebrow="Reflection" title="reflection" titleClassName="!text-[2.25rem] md:!text-[3.5rem]">
        <p className="text-[11px] font-normal uppercase tracking-wide text-[#578186]">What we fixed</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { t: "AI trust was invisible", b: "Added AI extraction badge + source callouts on every parameter." },
            { t: "Sidebar was overlapping", b: "Used Figma MCP to reposition footer elements across all sidebars in one pass." },
            { t: "Visual tone felt too consumer", b: "Moved to sharper borders based on direct feedback from a Palantir designer." },
            { t: "Parameters were hard to scan", b: "Introduced collapsible rows + muted label vs. dark value pattern." },
          ].map((card, i) => (
            <div key={card.t} className={cn("rounded-md p-3", i % 2 === 0 ? "bg-[#eaeff0]" : "bg-[#f2f1eb]")}>
              <p className="text-[13px] font-bold text-[#151918]">{card.t}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#6b7280]">{card.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-[11px] font-normal uppercase tracking-wide text-[#578186]">If we had more time...</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { n: "01", t: "Design consistency", b: "A full grid audit to tighten spacing and alignment across every screen." },
            { n: "02", t: "Landing page", b: "Real visual elements and a stronger value statement for clinical teams." },
            { n: "03", t: "User testing", b: "Structured sessions with actual trial teams to validate the AI trust patterns." },
            { n: "04", t: "Dashboard visuals", b: "Stronger emphasis on active trials and status, not just tables." },
          ].map((w) => (
            <div key={w.n} className="rounded-lg bg-[#f2f1eb] p-3">
              <div className="flex size-7 items-center justify-center rounded bg-[#578186] text-[11px] font-bold text-white">
                {w.n}
              </div>
              <p className="mt-2 text-[13px] font-bold text-[#151918]">{w.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6b7280]">{w.b}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-[#eaeff0] px-6 py-5">
          <p className="text-sm leading-relaxed text-[#151918]">
            This was our first time building <strong>a real product under real time pressure</strong>. We learned that it is
            a skill to work fast with AI. This project truly taught us that speed itself is a design competency, especially
            since situations like this can happen in real-world work settings
          </p>
        </div>
        <p className="text-right text-[11px] tracking-wide text-[#578186]">ALTROVIA · 2026</p>
      </SectionShell>
    </div>
  )
}
