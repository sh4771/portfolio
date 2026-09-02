export interface InfoBox {
  icon: "route" | "git-branch" | "bulb" | "alert-triangle" | "flask" | "chart-line" | "map"
  label: string
  body: string[]
  variant?: "accent" | "danger" | "default"
  code?: string
  stat?: { value: string; caption: string }
}

export interface VendeluxProject {
  slug: string
  navLabel: string
  title: string
  oneLiner: string
  duration: string
  tools: string[]
  role: string[]
  boxes: InfoBox[]
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
      "I redesigned attendee filtering around organizer workflow instead of alphabetical order.",
    duration: "Late March – April 2026 · Shipped",
    tools: ["Figma", "Claude Code"],
    role: [
      "I worked closely with my manager (PM) through iterative feedback rounds, and we shaped the new hierarchy together.",
      "I independently tested multiple structural hierarchies and refined them based on stakeholder feedback across several rounds.",
    ],
    boxes: [
      {
        icon: "route",
        label: "The organizer's job",
        body: [
          "After an event, organizers build a follow-up audience. They pick the event, narrow by attendance or export status, then save or apply the segment.",
          "The alphabetical filter menu buried that first decision, the one organizers had to make before anything else.",
        ],
      },
      {
        icon: "git-branch",
        label: "Three directions I tested",
        body: [
          "Alphabetical categories with better search kept discoverability but ignored task order.",
          "Audience-attribute-first helped broad prospecting but slowed down event follow-up.",
          "Event-first matched how organizers actually decided, so I chose it.",
        ],
      },
      {
        icon: "bulb",
        label: "Key decision",
        variant: "accent",
        body: [
          "I moved Event to the top and grouped attendance, export, and speaker status right after it, because organizers pick the event before anything else.",
          "I added visible counts to saved segments so organizers can compare audiences without opening each one.",
        ],
        code: "Spring Summit 2026 → Attended → Not exported → Attendee · 184 people",
      },
      {
        icon: "alert-triangle",
        label: "A mistake I caught late",
        variant: "danger",
        body: [
          "I introduced a sub-12px type size to fit more into the filter interface. An engineer flagged it in review: it broke the product's type scale and raised readability and accessibility concerns.",
          "I fixed the density with capitalization and spacing instead, and I now check hierarchy changes against design-system tokens before I present a high-fidelity direction.",
        ],
      },
      {
        icon: "flask",
        label: "How I'd validate this today",
        body: [
          "Looking back, I would write the workflow as tasks and build a lightweight clickable prototype before touching visual design, for example \"create a segment for Spring Summit attendees not yet exported.\"",
          "I would use AI to generate that prototype fast, but I would keep the hierarchy decisions grounded in my own rationale, not the model's.",
        ],
      },
      {
        icon: "chart-line",
        label: "Outcome",
        body: [
          "The redesign shipped, and monthly active organizers grew from 2 to 74 in the following months.",
          "A separate product launch happened in the same window, so I can't say this redesign alone caused the growth. It does confirm the workflow reached real users.",
        ],
        stat: { value: "2 → 74", caption: "monthly active organizers" },
      },
    ],
    media: {
      beforeAfter: {
        before: "/images/vendelux/segments-before-placeholder.png",
        after: "/images/vendelux/segments-after-placeholder.png",
        caption: "Alphabetical hierarchy (before) vs. Event-first hierarchy (after) (placeholder)",
      },
      gif: {
        src: "/images/vendelux/segments-demo-placeholder.gif",
        caption: "Filtering by Event and applying a segment (placeholder)",
      },
    },
  },
  {
    slug: "campaign-admin",
    navLabel: "Campaign Admin",
    title: "Campaign Admin",
    oneLiner:
      "I redesigned an internal tool for launching outreach campaigns, cutting a multi-step process into bulk actions.",
    duration: "July 10 – Aug 28, 2026 (7 weeks) · In progress",
    tools: ["Figma", "v0"],
    role: [
      "I worked as the sole designer through a structured ticket-and-spec process with a PM, engineer, and data lead. This was closer to a formal cross-functional build than a collaborative design pass.",
    ],
    boxes: [
      {
        icon: "route",
        label: "The problem",
        body: [
          "Creating a campaign took three separate steps across multiple pages. Even sub-campaigns with identical settings still required configuring each one individually.",
          "Three different team members had independently flagged this pain point months before I started the redesign.",
        ],
      },
      {
        icon: "map",
        label: "Process",
        body: [
          "Before I built anything, I mapped the full user journey and walked it past someone who does this job. She confirmed the new campaign-to-sub-campaign structure made sense, and I iterated based on her reaction rather than assuming I was right.",
        ],
      },
      {
        icon: "bulb",
        label: "Key decision",
        variant: "accent",
        body: [
          "I redesigned the flow around two bulk actions: applying status and settings across all sub-campaigns at once, and applying a segment across every sub-campaign from one column instead of checking each individually.",
          "Together, these cut the process of creating three identical sub-campaigns from 7 clicks to 3 in my prototype, a 57% reduction.",
        ],
      },
      {
        icon: "alert-triangle",
        label: "Mistakes I caught",
        variant: "danger",
        body: [
          "My first draft read as too close to the original tool: a reskin, not a real fix to the underlying workflow. It needed a full rework to actually change how the job got done.",
          "Later, I caught a conflict between two engineering specs on date-handling logic and asked the PM to arbitrate before design could move forward.",
        ],
      },
      {
        icon: "chart-line",
        label: "Status",
        body: [
          "I locked feature scope on Aug 24 and kept refining details (status display, pause and unpause behavior) through Aug 28.",
          "I handed the design to engineering. It isn't live yet.",
        ],
      },
    ],
    media: {
      beforeAfter: {
        before: "/images/vendelux/campaign-admin-before-placeholder.png",
        after: "/images/vendelux/campaign-admin-after-placeholder.png",
        caption: "7-click flow (before) vs. 3-click Apply to All flow (after) (placeholder)",
      },
      gif: {
        src: "/images/vendelux/campaign-admin-demo-placeholder.gif",
        caption: "Apply to All and Compare Segments 'All' column (placeholder)",
      },
    },
  },
  {
    slug: "meeting-planner",
    navLabel: "Meeting Planner",
    title: "Meeting Planner",
    oneLiner:
      "I redesigned how customers see event outreach predictions, replacing a number nobody could fully explain.",
    duration: "July 21 – Aug 26, 2026 · Ongoing",
    tools: ["Figma", "v0"],
    role: [
      "I worked as the sole designer, primarily with customer-facing team members rather than engineering.",
      "My main feedback loop here was customer-proxy insight, not build feasibility.",
    ],
    boxes: [
      {
        icon: "route",
        label: "The problem",
        body: [
          "Customers saw an \"Expected Meetings\" number with no visible explanation of how we calculated it.",
          "Internally, the team didn't fully trust it either. The conversion rate behind it changed five times over about 13 months, and multiple people, including leadership, had asked how we actually calculated it.",
        ],
      },
      {
        icon: "bulb",
        label: "Key decision",
        variant: "accent",
        body: [
          "I redesigned the prediction panel to show Expected Meetings as a range instead of a single hardcoded number, surface the conversion rate driving the estimate, and add a \"Why this estimate?\" explanation.",
          "The estimate also recalculates live as segments change.",
        ],
      },
      {
        icon: "chart-line",
        label: "Status",
        body: [
          "I haven't tested this with a customer yet. Before I ship, I need to validate whether the new panel actually rebuilds trust, rather than assuming transparency alone solves it.",
          "Design reviews ran through Aug 26.",
        ],
      },
    ],
    media: {
      beforeAfter: {
        before: "/images/vendelux/meeting-planner-before-placeholder.png",
        after: "/images/vendelux/meeting-planner-after-placeholder.png",
        caption: "Old hardcoded estimate (before) vs. transparent range + explanation (after) (placeholder)",
      },
      gif: {
        src: "/images/vendelux/meeting-planner-demo-placeholder.gif",
        caption: "Expanding \"Why this estimate?\" (placeholder)",
      },
    },
  },
]
