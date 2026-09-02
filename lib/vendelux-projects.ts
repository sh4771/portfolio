export interface InfoBox {
  icon: "route" | "git-branch" | "bulb" | "alert-triangle" | "flask" | "chart-line" | "map"
  label: string
  body: string[]
  variant?: "accent" | "danger" | "default"
  code?: string
  codeBlocks?: { heading?: string; content: string }[]
  steps?: string[]
  quote?: string
  footer?: string
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
          "I would use AI to generate that prototype fast, but I would keep the hierarchy decisions grounded in my own rationale rather than the model's.",
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
      "I redesigned an internal campaign-launch tool around bulk actions, reducing repetitive setup for related sub-campaigns.",
    duration: "July 10 – Aug 28, 2026 · In progress",
    tools: ["Figma", "v0"],
    role: [
      "I worked as the sole designer with a PM, engineer, and data lead through tickets and written specs.",
    ],
    boxes: [
      {
        icon: "route",
        label: "The operator's job-to-be-done",
        body: [
          "A campaign operator needs to launch several related outreach campaigns, for example one campaign per target account list, but with the same status, sending settings, and audience rules.",
        ],
        quote:
          "Create three sub-campaigns for the same event: Enterprise attendees, Mid-market attendees, and SMB attendees. Set each to Draft, use the same sender and cadence settings, then assign the appropriate audience segment.",
        steps: [
          "Create or open Sub-campaign A.",
          "Set its status to Draft.",
          "Configure its shared settings.",
          "Repeat those steps for Sub-campaign B.",
          "Repeat again for Sub-campaign C.",
          "Open each sub-campaign separately to assign a segment.",
          "Return to the campaign view to verify setup.",
        ],
        footer:
          "The problem went beyond click count. The structure treated related sub-campaigns as isolated objects, even though the operator managed them as a group.",
      },
      {
        icon: "map",
        label: "New model: campaign as the shared setup layer",
        body: [
          "I introduced a nested structure. The parent campaign holds shared operational controls, and sub-campaigns hold individual audience segments and exceptions.",
        ],
        codeBlocks: [
          {
            content:
              "Fall Event Follow-up\n├── Enterprise attendees\n├── Mid-market attendees\n└── SMB attendees",
          },
        ],
        footer:
          "This made the campaign the place to set common defaults, while sub-campaigns kept control over the differences that mattered.",
      },
      {
        icon: "bulb",
        label: "Key decision: design for shared intent, then allow exceptions",
        variant: "accent",
        body: [
          "I centered the redesign on two bulk actions.",
          "First, an operator selects Apply to all and sets status, sender, sending window, and cadence once instead of repeating that setup for every row.",
        ],
        codeBlocks: [
          {
            content:
              "Status: Draft\nSender: Violet Hyun\nSending window: Weekdays, 9 AM–5 PM\nCadence: 3-step outreach sequence\n[Apply to all sub-campaigns]",
          },
          {
            heading: "Second, an operator applies or compares segments from one All column instead of opening each sub-campaign separately.",
            content:
              "                All        Enterprise    Mid-market    SMB\nSegment      [Apply]      148 contacts  276 contacts  392 contacts\nStatus       Draft        Draft         Draft         Draft",
          },
        ],
        footer:
          "This made the shared action visible and kept sub-campaign rows available for the cases where an operator needed to override one setting.",
      },
      {
        icon: "chart-line",
        label: "Interaction impact in the prototype",
        body: [
          "For the task of applying the same status to three related sub-campaigns, an operator needed 7 clicks before this redesign: open each sub-campaign and set its status individually.",
          "After the redesign, an operator needs 3 clicks: select a status once, choose Apply to all, and confirm.",
          "This reflects a 57% reduction for this specific task in the prototype. It doesn't represent the complete campaign-creation workflow or production behavior.",
        ],
        stat: { value: "7 → 3", caption: "clicks for this task, in the prototype" },
      },
      {
        icon: "flask",
        label: "Validation before visual polish",
        body: [
          "Before I moved into detailed UI, I mapped the workflow and reviewed the proposed parent-campaign and sub-campaign structure with someone who does this work regularly.",
        ],
        quote:
          "You're launching three outreach variants for the same initiative. Which settings would you set once? Which would you control separately?",
        footer:
          "Her answers confirmed the nesting matched how she organized campaigns, and I revised the structure wherever the model felt unclear.",
      },
      {
        icon: "alert-triangle",
        label: "Early mistake: I polished the surface before I changed the model",
        variant: "danger",
        body: [
          "My first direction kept the original interaction pattern: each sub-campaign still behaved like a separate setup task. It looked cleaner, but it didn't eliminate the repeated work.",
          "The operator still had to set Draft three times for three related sub-campaigns, which made this a visual reskin instead of a workflow redesign.",
        ],
        footer:
          "I restarted from the operator's repeated task, apply the same setup across this group, and introduced bulk actions at the campaign level.",
      },
      {
        icon: "git-branch",
        label: "Cross-functional constraint: unresolved date logic",
        body: [
          "During the build, I found that two engineering specs described date behavior differently: whether a paused sub-campaign should keep its scheduled start date or require a new date when it resumes.",
          "Rather than designing around an assumption, I documented the conflict and asked the PM to make the product decision. I continued the interaction design only after that decision landed.",
        ],
        footer:
          "This reinforced that design execution depends on resolving product rules as much as clarifying the interface.",
      },
      {
        icon: "flask",
        label: "How I'd validate this flow today",
        body: [
          "Before I invest in high-fidelity screens, I'd write a detailed interaction brief and build a lightweight HTML prototype using the existing design-system tokens.",
        ],
        steps: [
          "Create three sub-campaigns for one event and set all of them to Draft.",
          "Apply the same sending settings to every sub-campaign, then pause only Mid-market.",
          "Compare audience sizes across all three segments before activating.",
          "Resume a paused sub-campaign and confirm how its scheduled date behaves.",
        ],
        footer:
          "I'd use AI to generate the functional prototype and edge states, like empty segments, mismatched settings, paused rows, and confirmation dialogs, but I'd define the hierarchy, task sequence, and product rules myself.",
      },
      {
        icon: "chart-line",
        label: "Outcome",
        body: [
          "I locked scope on August 24, 2026. By August 28, I'd handed the design to engineering, and I kept refining status display and pause and unpause behavior along the way.",
          "The feature isn't live yet, so I don't have an adoption or performance outcome to report.",
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
      "My main feedback loop here was customer-proxy insight rather than build feasibility.",
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
