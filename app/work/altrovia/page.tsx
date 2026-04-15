import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"

const FIGMA_FILE =
  "https://www.figma.com/design/3MzYMJaWIwklOpLgDcNROf/Altrovia-Redesign"

const problems = [
  {
    title: "Trust gap",
    body: "Users hesitate when they cannot verify who is on the other side of a booking or exchange.",
  },
  {
    title: "Fragmented context",
    body: "Key details were scattered across screens, so decisions felt slower and riskier than they needed to be.",
  },
  {
    title: "Visual noise",
    body: "Earlier explorations mixed too many accent colors and competing hierarchies, which diluted the brand.",
  },
  {
    title: "Onboarding drop-off",
    body: "First-time flows asked for commitment before showing why the product was worth the effort.",
  },
]

const trustPillars = [
  {
    title: "Transparent identity",
    body: "Clear signals for who you are interacting with and what they have done on the platform before.",
  },
  {
    title: "Consistent language",
    body: "Microcopy and labels that repeat the same promises the marketing page makes.",
  },
  {
    title: "Recoverable actions",
    body: "Obvious undo paths and status updates so mistakes do not feel permanent.",
  },
  {
    title: "Proof, not flair",
    body: "Screenshots, timestamps, and structured summaries instead of decorative trust badges alone.",
  },
]

const competitors = [
  { name: "Competitor A", pros: "Large user base, mature search", cons: "Heavy UI, weak mobile parity" },
  { name: "Competitor B", pros: "Clean visuals", cons: "Opaque pricing, shallow profiles" },
  { name: "Competitor C", pros: "Fast checkout", cons: "Limited dispute flow, noisy feeds" },
]

const flowSteps = [
  "Land on value proposition and primary CTA",
  "Authenticate or continue as guest with limits",
  "Complete profile and verification cues",
  "Core task (browse, book, or message)",
  "Confirmation with recap and next actions",
]

const challenges = [
  {
    title: "User research across two campuses",
    body: "We balanced Columbia and NYU schedules by running paired sessions, shared FigJam boards, and a single research repository so insights stayed comparable week to week.",
  },
  {
    title: "UI consistency at speed",
    body: "We locked tokens early (color, type, spacing) and reviewed every screen against a checklist so late iterations did not reintroduce one-off components.",
  },
]

const feedback = [
  {
    who: "Emily Shen",
    note: "Asked for clearer hierarchy on dense summary cards and suggested progressive disclosure for secondary metrics.",
  },
  {
    who: "Christos",
    note: "Flagged ambiguity in status labels; helped us rename states to match mental models from travel apps he already trusts.",
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F2EDE2] py-16 text-[#151819] transition-colors duration-300 md:px-8 px-4">
      <div className="mx-auto max-w-[900px] space-y-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B7280] transition-colors hover:text-[#578186]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* 1 — Cover */}
        <header className="space-y-8">
          <div className="overflow-hidden rounded-[28px] border border-[#151819]/10 bg-gradient-to-br from-[#578186]/15 via-[#F2EDE2] to-[#F2EDE2] px-6 py-14 shadow-[0_24px_60px_-28px_rgba(21,24,25,0.18)] md:px-12 md:py-16">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#578186]">Case study</p>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-[#151819] md:text-6xl">ALTROVIA</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B7280] md:text-lg">
              Redesigning a trustworthy, calm interface for planning and discovery, grounded in
              clarity, not decoration.
            </p>
          </div>
          <a
            href={FIGMA_FILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#578186]/40 bg-[#578186] px-5 py-2.5 text-sm font-medium text-[#F2EDE2] shadow-sm transition-colors hover:bg-[#4a7377]"
          >
            View in Figma
            <ExternalLink className="h-4 w-4 opacity-90" strokeWidth={2} />
          </a>
          <div className="space-y-2">
            <div className="relative mt-4 h-[240px] w-full overflow-hidden rounded-2xl border border-[#151819]/10 bg-[#F2EDE2] shadow-[0_20px_50px_-24px_rgba(21,24,25,0.15)] sm:h-[300px] md:h-[360px] lg:h-[400px]">
              <Image
                src="/images/altrovia-mockup.svg"
                alt="Altrovia cover mockup (first screen from Figma file)"
                width={1200}
                height={675}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
            <p className="text-center text-[11px] text-[#6B7280]">
              First screen from the Figma file. Export frame 1 as PNG and swap{" "}
              <code className="rounded bg-[#578186]/10 px-1 py-0.5 text-[10px] text-[#151819]">
                public/images/altrovia-mockup.png
              </code>{" "}
              (update src in code) for a crisp asset.
            </p>
          </div>
        </header>

        {/* 2 — Intro */}
        <section className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Team</p>
          <h2 className="text-lg font-medium tracking-tight md:text-xl">Who worked on this</h2>
          <div className="grid gap-6 border border-[#151819]/10 bg-[#F2EDE2] p-6 md:grid-cols-2 md:p-8 rounded-2xl">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Designer</p>
              <p className="text-base font-medium text-[#151819]">Violet Hyun</p>
              <p className="text-sm text-[#6B7280]">Columbia University</p>
            </div>
            <div className="space-y-2 border-t border-[#151819]/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Designer</p>
              <p className="text-base font-medium text-[#151819]">Hongxin Li</p>
              <p className="text-sm text-[#6B7280]">New York University</p>
            </div>
          </div>
        </section>

        {/* 3 — Problem + Goals */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Problem · Goals</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">What we needed to solve</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[#151819]/10 bg-[#F2EDE2] p-5 shadow-[0_4px_24px_-12px_rgba(21,24,25,0.12)]"
              >
                <h3 className="text-sm font-medium text-[#578186]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="rounded-2xl border border-[#151819]/10 p-6 md:p-8"
              style={{
                background: "linear-gradient(145deg, rgba(87,129,134,0.12) 0%, rgba(242,237,226,1) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#578186]">Insight</p>
              <p className="mt-3 text-sm leading-relaxed text-[#151819]">
                Trust is not a single widget. It is the cumulative effect of predictable layout, honest
                copy, and proof that appears exactly when anxiety spikes.
              </p>
            </div>
            <div
              className="rounded-2xl border border-[#151819]/10 p-6 md:p-8"
              style={{
                background: "linear-gradient(145deg, rgba(242,237,226,1) 0%, rgba(87,129,134,0.08) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#578186]">Strategy</p>
              <p className="mt-3 text-sm leading-relaxed text-[#151819]">
                We aligned on one primary accent, simplified navigation, and redesigned flows so each step
                answers the question users ask in that moment—not three screens later.
              </p>
            </div>
          </div>
        </section>

        {/* 4 — Trust */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Trust</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">How do we build trust?</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#6B7280]">
              Four pillars guided UI decisions from wireframes through final polish.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((t) => (
              <div
                key={t.title}
                className="flex flex-col rounded-2xl border border-[#151819]/10 bg-[#F2EDE2] p-5 text-left"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-[#578186]" />
                <h3 className="text-sm font-medium text-[#151819]">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 — Reference analysis */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Reference analysis</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Competitive landscape</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#151819]/10 bg-[#F2EDE2]">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#151819]/10 bg-[#578186]/10">
                  <th className="px-4 py-3 font-medium text-[#151819]">Product</th>
                  <th className="px-4 py-3 font-medium text-[#151819]">Pros</th>
                  <th className="px-4 py-3 font-medium text-[#151819]">Cons</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((row) => (
                  <tr key={row.name} className="border-b border-[#151819]/8 last:border-0">
                    <td className="px-4 py-3 font-medium text-[#578186]">{row.name}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{row.pros}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{row.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6 — Visual system */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Visual system</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Color and typography</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-[#151819]/10 p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Palette</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-[#151819]/10 shadow-sm" style={{ background: "#578186" }} />
                  <span className="text-[10px] text-[#6B7280]">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-[#151819]/10 shadow-sm" style={{ background: "#F2EDE2" }} />
                  <span className="text-[10px] text-[#6B7280]">Surface</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-[#151819]/20 shadow-sm" style={{ background: "#151819" }} />
                  <span className="text-[10px] text-[#6B7280]">Text</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border border-[#151819]/10 shadow-sm" style={{ background: "#6B7280" }} />
                  <span className="text-[10px] text-[#6B7280]">Muted</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-[#151819]/10 p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Type scale</p>
              <p className="text-3xl font-light text-[#151819]">Display</p>
              <p className="text-xl font-medium text-[#151819]">Section title</p>
              <p className="text-base text-[#151819]">Body emphasis</p>
              <p className="text-sm leading-relaxed text-[#6B7280]">Supporting copy for dense UI and tables.</p>
            </div>
          </div>
        </section>

        {/* 7 — Key flow + wireframes */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Key flow · Wireframes</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Five-step happy path</h2>
          </div>
          <ol className="space-y-4">
            {flowSteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl border border-[#151819]/10 bg-[#F2EDE2] p-4 md:items-center md:p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#578186] text-sm font-medium text-[#F2EDE2]">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-[#151819]">{step}</p>
              </li>
            ))}
          </ol>
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex aspect-[4/5] flex-col items-center justify-center rounded-2xl border border-dashed border-[#578186]/35 bg-[#578186]/[0.06] p-4 text-center"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-[#578186]">Wireframe</span>
                <span className="mt-2 text-[11px] text-[#6B7280]">Replace with exported frame {n}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8 — Design challenges */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Design challenges</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Where it got hard</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {challenges.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[#151819]/10 p-6 md:p-8"
                style={{
                  background: "linear-gradient(145deg, rgba(87,129,134,0.08) 0%, rgba(242,237,226,1) 100%)",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="text-base font-medium text-[#151819]">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9 — User feedback */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">User feedback</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">What we heard in critique</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {feedback.map((f) => (
              <blockquote
                key={f.who}
                className="rounded-2xl border-l-4 border-[#578186] bg-[#578186]/[0.06] px-5 py-6"
              >
                <p className="text-sm font-medium text-[#151819]">{f.who}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{f.note}</p>
              </blockquote>
            ))}
          </div>
        </section>

        {/* 10 — Final UI */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Final UI</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Seven key screens</h2>
            <p className="max-w-2xl text-sm text-[#6B7280]">
              Swap each tile with a PNG from Figma exports for pixel-perfect presentation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[9/16] flex-col items-center justify-center rounded-xl border border-[#151819]/10 bg-[#F2EDE2] p-2 text-center shadow-sm"
              >
                <span className="text-[10px] font-medium text-[#578186]">Screen {i + 1}</span>
                <span className="mt-1 text-[10px] leading-tight text-[#6B7280]">Drop UI export here</span>
              </div>
            ))}
          </div>
        </section>

        {/* 11 — Demo */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Demo</p>
            <h2 className="text-lg font-medium tracking-tight md:text-xl">Landing experience</h2>
            <p className="max-w-2xl text-sm text-[#6B7280]">
              When the marketing site is live, paste the URL into an iframe below. Until then, the
              Figma prototype stays the source of truth.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#151819]/10 bg-[#151819]/[0.03] shadow-inner">
            <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 p-8 text-center md:aspect-[2/1]">
              <p className="text-sm text-[#6B7280]">Embed your deployed landing page here</p>
              <a
                href={FIGMA_FILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#578186] underline-offset-4 hover:underline"
              >
                Open prototype in Figma
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 12 — Reflection */}
        <section className="space-y-8">
          <div
            className="space-y-6 rounded-[24px] border border-[#151819]/10 p-8 md:rounded-[32px] md:p-10"
            style={{
              background: "linear-gradient(145deg, rgba(87,129,134,0.1) 0%, rgba(242,237,226,1) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Reflection</p>
              <h2 className="text-lg font-medium tracking-tight md:text-xl">What we fixed · What is next</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-[#6B7280]">
              <p>
                <span className="font-medium text-[#151819]">What we fixed:</span> We removed competing
                accents, tightened the type scale, and rebuilt the densest tables so scanning matches the
                mental model from our research synthesis.
              </p>
              <p>
                <span className="font-medium text-[#151819]">If we had more time:</span> We would run a
                moderated usability study on the full happy path, instrument the prototype for click maps,
                and validate trust copy with people who have never seen Altrovia before.
              </p>
              <p>
                <span className="font-medium text-[#151819]">Personal note:</span> I left this project
                convinced that pairing a single disciplined palette with ruthless copy editing does more
                for credibility than any badge row ever could.
              </p>
            </div>
          </div>
        </section>

        {/* Footer pattern (matches other case studies) */}
        <div className="border-t border-[#151819]/15 pt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B7280]/70">Continue</p>
          <Link
            href="/#work"
            className="mt-2 inline-block text-base tracking-tight text-[#151819] transition-colors hover:text-[#578186]"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
