export interface VendeluxProject {
  slug: string
  navLabel: string
  title: string
  oneLiner: string
  duration: string
  tools: string[]
  role: string
  problem: string
  process?: string
  keyDecision: string
  mistake?: string
  outcome: string
  media: {
    beforeAfter?: { before: string; after: string; caption?: string }
    gif?: { src: string; caption?: string }
  }
}

export const vendeluxProjects: VendeluxProject[] = [
  {
    slug: "segments",
    navLabel: "Smart Segments",
    title: "Smart Segments",
    oneLiner:
      "Redesigned attendee filtering around organizer workflow instead of alphabetical order.",
    duration: "Late March – April 2026 · Shipped",
    tools: ["Figma", "Claude Code"],
    role:
      "Worked closely with my manager (PM) through iterative feedback rounds, shaping the new hierarchy together. Independently tested multiple structural hierarchies and refined based on stakeholder feedback across several rounds.",
    problem:
      "Customers struggled to manage events and campaigns without meaningful ways to filter attendees. Filter categories were sorted alphabetically — disconnected from how organizers actually worked, which buried the filters they needed most.",
    keyDecision:
      "We moved Event — including attendance status, already exported, and speaker — to the top of the hierarchy, since organizers need to identify relevant events before narrowing down attendees. I tested this against alternative structures and iterated based on feedback across several rounds. I also surfaced filter counts directly in the segment list, so organizers could compare segments at a glance.",
    mistake:
      "An early Figma pass broke the product's established type scale, introducing a sub-12px font size that failed accessibility standards — caught by an engineer on review, not by me. The fix was to revert the type change and solve the density problem with capitalization instead, which taught me to test hierarchy changes against the existing design system, not just against the content.",
    outcome:
      "Shipped. Monthly active organizers grew from 2 to 74 in the following months — though this overlapped with a separate, concurrent product launch, so I can't claim the growth as caused by this redesign alone. What it does show is that the surface is live and used at real scale.",
    media: {
      beforeAfter: {
        before: "/images/vendelux/segments-before-placeholder.png",
        after: "/images/vendelux/segments-after-placeholder.png",
        caption: "Alphabetical hierarchy (before) vs. Event-first hierarchy (after) — placeholder",
      },
      gif: {
        src: "/images/vendelux/segments-demo-placeholder.gif",
        caption: "Filtering by Event and applying a segment — placeholder",
      },
    },
  },
  {
    slug: "campaign-admin",
    navLabel: "Campaign Admin",
    title: "Campaign Admin",
    oneLiner:
      "Redesigned an internal tool for launching outreach campaigns, cutting a multi-step process into bulk actions.",
    duration: "July 10 – Aug 28, 2026 (7 weeks) · In progress",
    tools: ["Figma", "v0"],
    role:
      "Sole designer, working through a structured ticket-and-spec process with a PM, engineer, and data lead — closer to a formal cross-functional build than a collaborative design pass.",
    problem:
      "Creating a campaign took three separate steps across multiple pages, and sub-campaigns that shared the same settings still had to be configured individually — a pain point three different team members had independently flagged months before the redesign started.",
    process:
      "Before building anything, I mapped the full user journey and walked it past an actual person doing this job, who confirmed the new nested campaign → sub-campaign structure made sense. I iterated the structure based on her reaction rather than assuming it was right.",
    keyDecision:
      "I redesigned the flow around two bulk actions: applying status and settings across all sub-campaigns at once, and applying a segment across every sub-campaign from one column instead of checking each individually. Together, these cut the process of creating three identical sub-campaigns from 7 clicks to 3 in my prototype — a 57% reduction.",
    mistake:
      "My first draft read as too close to the original tool — a reskin rather than a real fix to the underlying workflow — and needed a full rework to actually change how the job got done. Later, I caught a conflict between two engineering specs on date-handling logic and had to get the PM to arbitrate before design could move forward.",
    outcome:
      "In progress. Feature scope locked Aug 24; design continued refining details (status display, pause/unpause behavior) through Aug 28. Handed to engineering; not yet live.",
    media: {
      beforeAfter: {
        before: "/images/vendelux/campaign-admin-before-placeholder.png",
        after: "/images/vendelux/campaign-admin-after-placeholder.png",
        caption: "7-click flow (before) vs. 3-click Apply to All flow (after) — placeholder",
      },
      gif: {
        src: "/images/vendelux/campaign-admin-demo-placeholder.gif",
        caption: "Apply to All and Compare Segments 'All' column — placeholder",
      },
    },
  },
  {
    slug: "meeting-planner",
    navLabel: "Meeting Planner",
    title: "Meeting Planner",
    oneLiner:
      "Redesigned how customers see event outreach predictions, replacing a number nobody could fully explain.",
    duration: "July 21 – Aug 26, 2026 · Ongoing",
    tools: ["Figma", "v0"],
    role:
      "Sole designer, working primarily with customer-facing team members rather than engineering — my main feedback loop here was customer-proxy insight, not build feasibility.",
    problem:
      "Customers saw an \"Expected Meetings\" number with no visible explanation of how it was calculated. Internally, the team didn't fully trust it either — the conversion rate behind it changed five times over about 13 months, and multiple people, including leadership, had asked how it was actually calculated.",
    keyDecision:
      "I redesigned the prediction panel to show Expected Meetings as a range instead of a single hardcoded number, surface the conversion rate driving the estimate, and add a \"Why this estimate?\" explanation. The estimate also recalculates live as segments change.",
    outcome:
      "In progress. This hasn't been tested with a customer yet — the next step before shipping is validating whether the new panel actually rebuilds trust, not just assuming transparency solves it. Design reviews ran through Aug 26.",
    media: {
      beforeAfter: {
        before: "/images/vendelux/meeting-planner-before-placeholder.png",
        after: "/images/vendelux/meeting-planner-after-placeholder.png",
        caption: "Old hardcoded estimate (before) vs. transparent range + explanation (after) — placeholder",
      },
      gif: {
        src: "/images/vendelux/meeting-planner-demo-placeholder.gif",
        caption: "Expanding \"Why this estimate?\" — placeholder",
      },
    },
  },
]
