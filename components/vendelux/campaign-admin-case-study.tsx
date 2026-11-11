"use client"

import { useState } from "react"
import { Check, Copy, MousePointer2, Repeat, Scissors, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { BeforeAfter, CaseHeader, Live, PLUM, PLUM_TEXT, Section, Shot, SplitTags, StatusCards } from "./kit"

const SHARED = ["Status", "Sender", "Sending window", "Cadence"]
const SUBS = ["Enterprise", "Mid-market", "SMB"]

/** Step through setting up three sub-campaigns, the old way or with Duplicate. */
function StepCounter() {
  const [dup, setDup] = useState(true)
  // Old: open, set Draft, enter shared settings for each of three (9). Duplicate: copy, change segment, save (3).
  const steps = dup
    ? ["Duplicate sub-campaign", "Change the segment", "Save"]
    : SUBS.flatMap((s) => [`Open ${s}`, `Set ${s} to Draft`, `Enter shared settings`])
  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Setup method" className="inline-flex rounded-full bg-muted p-1 text-xs font-semibold">
          {(
            [
              [false, "Old flow"],
              [true, "With Duplicate"],
            ] as const
          ).map(([k, label]) => (
            <button key={label} type="button" role="radio" aria-checked={dup === k} onClick={() => setDup(k)} className={cn("rounded-full px-3 py-1.5 transition-colors", dup === k ? "bg-background text-foreground shadow-sm" : "text-foreground/55")}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-foreground/70">
          <b className="text-2xl text-foreground">
            <Live value={String(steps.length)} />
          </b>{" "}
          steps
        </p>
      </div>
      <ol className="grid grid-cols-3 gap-2 sm:grid-cols-9">
        {steps.map((s, i) => (
          <li
            key={s + i}
            className={cn("flex min-h-16 flex-col justify-between rounded-lg p-2 text-[10px] leading-tight motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95", dup ? "text-white sm:col-span-3" : "bg-muted/60 text-foreground/70")}
            style={{ ...(dup ? { backgroundColor: PLUM } : {}), animationDelay: `${i * 40}ms` }}
          >
            <span className={cn("font-semibold tabular-nums", dup ? "text-white/70" : "text-foreground/45")}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <p className="flex items-center gap-1.5 text-xs text-foreground/50">
        <MousePointer2 className="h-3.5 w-3.5" /> Flip between flows. Tested on the repeated-setup task.
      </p>
    </div>
  )
}

export function CampaignAdminCaseStudy() {
  return (
    <article className="space-y-20">
      <CaseHeader
        eyebrow="Vendelux · Campaign Admin"
        title="Turning a cut feature into a faster setup flow"
        lead="Bulk editing was cut. Duplicate took setup from 9 steps to 3."
        meta="Jul – Aug 2026 · Product Intern · MVP in development"
        facts={[
          ["Role", "Product Intern, sole designer"],
          ["Team", "PM, engineers, data lead"],
          ["Users", "Forward-deployed engineers (FDEs)"],
          ["Goal", "Set up related sub-campaigns fast"],
        ]}
      />

      <Section eyebrow="01 · The task" title="Same settings, entered three times">
        <div className="grid gap-3 sm:grid-cols-3">
          {SUBS.map((s) => (
            <div key={s} className="space-y-2 rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{s}</p>
              {["Open sub-campaign", "Set to Draft", "Enter shared settings"].map((t) => (
                <p key={t} className="flex items-center gap-2 rounded-md bg-red-500/[0.07] px-2 py-1.5 text-xs text-foreground/75">
                  <Repeat className="h-3.5 w-3.5 shrink-0 text-red-700/70 dark:text-red-400" /> {t}
                </p>
              ))}
              <p className="rounded-md border border-dashed border-border px-2 py-1.5 text-xs text-foreground/60">Assign its own segment</p>
            </div>
          ))}
        </div>
        <p className="cs-caption">Red: identical work repeated for every sub-campaign.</p>
      </Section>

      <Section eyebrow="02 · The model" title="Set once at the top, vary only what differs">
        <div className="space-y-0">
          <div className="mx-auto max-w-md rounded-2xl p-4 text-white" style={{ backgroundColor: PLUM }}>
            <p className="text-sm font-semibold">Campaign: one event</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SHARED.map((t) => (
                <span key={t} className="rounded-md bg-white/15 px-2 py-0.5 text-xs">{t}</span>
              ))}
            </div>
          </div>
          <div aria-hidden className="mx-auto h-5 w-px bg-border" />
          <div className="relative grid gap-2 sm:grid-cols-3">
            <span aria-hidden className="absolute left-[16.6%] right-[16.6%] top-0 hidden h-px bg-border sm:block" />
            {SUBS.map((s) => (
              <div key={s} className="relative rounded-2xl border border-border/60 bg-card p-3 sm:mt-5">
                <span aria-hidden className="absolute -top-5 left-1/2 hidden h-5 w-px bg-border sm:block" />
                <p className="text-sm font-medium text-foreground">{s}</p>
                <span className="mt-1.5 inline-block rounded-md border border-border/60 px-2 py-0.5 text-xs text-foreground/75">Own segment</span>
              </div>
            ))}
          </div>
        </div>
        <p className="cs-caption">An FDE confirmed this matched how she organized campaigns, before I moved into UI.</p>
      </Section>

      <Section eyebrow="03 · What FDEs said" title="Three recurring pains">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Fragmented setup", "Split across creation and editing"],
            ["02", "Repeated work", "Same settings, again and again"],
            ["03", "Hard to scan", "Unclear what was active or pending"],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl p-4 text-white" style={{ backgroundColor: PLUM }}>
              <p className="text-2xl font-semibold">{n}</p>
              <p className="mt-3 text-sm font-semibold">{t}</p>
              <p className="mt-1 text-xs text-white/75">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="04 · First idea, then a wall" title="Bulk editing was cut, so I found another way">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Scissors className="h-4 w-4 text-red-700 dark:text-red-400" /> Bulk editing
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:text-red-400">Cut from MVP</span>
            </p>
            <Shot src="/images/vendelux/campaign-admin-bulk-edit.gif" alt="Selecting sub-campaigns with checkboxes and applying shared settings once" w={1280} h={1169} gif caption="Select rows, apply shared settings once." />
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Copy className={cn("h-4 w-4", PLUM_TEXT)} /> Duplicate
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">Shipping</span>
            </p>
            <Shot src="/images/vendelux/campaign-admin-duplicate-action.gif" alt="Duplicating a sub-campaign and changing only its segment" w={1280} h={850} gif caption="Copy a sub-campaign, change only what differs." />
          </div>
        </div>
        <p className="text-sm text-foreground/70">Backend support for bulk editing wasn&apos;t ready for the MVP, and I raised the gap too late. Duplicate kept the faster path without it.</p>
      </Section>

      <Section eyebrow="05 · Result" title="9 steps down to 3" id="results">
        <StepCounter />
      </Section>

      <Section eyebrow="06 · Custom presets" title="A library beats a one-off save">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { k: "A", t: "Toggle in the drawer", d: "Tied to one sub-campaign" },
            { k: "B", t: "Presets library", d: "Reusable across every campaign", chosen: true },
            { k: "C", t: "Save from existing", d: "Tied to one sub-campaign" },
          ].map((o) => (
            <div key={o.k} className={cn("space-y-1 rounded-2xl p-4", o.chosen ? "border-2" : "border border-border/60 bg-card")} style={o.chosen ? { borderColor: PLUM } : undefined}>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                {o.chosen ? <Check className={cn("h-4 w-4", PLUM_TEXT)} /> : <X className="h-4 w-4 text-foreground/35" />}
                {o.k}. {o.t}
              </p>
              <p className="text-xs text-foreground/60">{o.d}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Shot src="/images/vendelux/campaign-admin-custom-presets-compare.gif" alt="Three clickable directions for saving a custom preset" w={1208} h={1286} gif caption="The three directions, prototyped." />
          <Shot src="/images/vendelux/campaign-admin-custom-presets-shipped.gif" alt="Custom Preset entry point next to Saved presets in the product" w={1280} h={884} gif caption="Shipped: Custom Preset next to Saved presets." />
        </div>
      </Section>

      <Section eyebrow="07 · Across the tool" title="Before and after">
        <BeforeAfter
          pairs={[
            { label: "Campaign list", note: "Tabs for recent, drafts and cancelled, plus status tags. A top bar kept the list wide.", before: "/images/vendelux/campaign-admin-before-summary.png", after: "/images/vendelux/campaign-admin-after-summary.png" },
            { label: "Create campaign", note: "An unstyled internal form became a structured modal with labeled sections.", before: "/images/vendelux/campaign-admin-before-creation.png", after: "/images/vendelux/campaign-admin-after-creation.png" },
          ]}
        />
      </Section>

      <Section eyebrow="08 · What changed in my process" title="Feasibility first, not at handoff">
        <SplitTags
          cols={[
            { title: "Before", items: ["Design the ideal flow", "Check feasibility at handoff"] },
            { title: "Now", accent: true, items: ["Bring engineers into scoping", "Check feasibility first", "Try narration or a decision log"] },
          ]}
        />
      </Section>

      <Section eyebrow="09 · Where it stands" title="In development">
        <StatusCards
          items={[
            { tag: "In development", tone: "done", body: "MVP handed off Aug 28, 2026, with Duplicate" },
            { tag: "Open question", tone: "open", body: "Paused sub-campaign start date: two specs disagree. Handed to the PM." },
            { tag: "Not yet", tone: "muted", body: "Not live yet, so no adoption data to report" },
          ]}
        />
      </Section>
    </article>
  )
}
