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
      "I found that alphabetical filtering hid organizers' actual workflow, explored alternatives for a defined task, and learned that visual density can't override system constraints.",
    duration: "Late March – April 2026 · Shipped",
    tools: ["Figma", "Claude Code"],
    role: [
      "I worked closely with my manager (PM) through iterative feedback rounds, and we shaped the new hierarchy together.",
      "I independently explored multiple structural hierarchies and refined them based on stakeholder feedback across several rounds.",
    ],
    boxes: [
      {
        icon: "route",
        label: "The organizer's job",
        body: [
          "For the event follow-up workflow I focused on, organizers first needed to identify the event before they narrowed the attendee list.",
          "The alphabetical filter menu buried that first decision, the one organizers had to make before anything else.",
        ],
      },
      {
        icon: "git-branch",
        label: "Directions I explored",
        body: [
          "I explored three structural directions and reviewed them through stakeholder feedback rounds rather than direct usability testing with organizers.",
          "Alphabetical categories with better search kept discoverability but ignored task order.",
          "Audience-attribute-first served broad prospecting well, but it slowed organizers down on the event follow-up task I focused on.",
          "Event-first prioritized that task, so I chose it for this workflow while leaving audience attributes available for broader prospecting.",
        ],
      },
      {
        icon: "bulb",
        label: "Key decision",
        variant: "accent",
        body: [
          "I moved Event to the top and grouped attendance, export, and speaker status right after it, because organizers needed to identify the event before narrowing the attendee list.",
        ],
        codeBlocks: [
          {
            heading: "This changed the interaction from browsing a long menu to constructing an audience in decision order.",
            content:
              "Before: Filter menu\nAccount\nAttendance status\nCompany\nCreated date\nEvent\nExport status\n...\n\nAfter: Build audience from an event\n1. Choose event: Spring Summit 2026\n2. Choose participation: Attended\n3. Choose operational state: Not exported\n4. Review audience: 184 people\n5. Save segment",
          },
        ],
        footer:
          "Organizers often maintained several event audiences. Counts were intended to help them compare saved audience sizes, for example whether \"Spring Summit attendees, not exported\" at 184 people was large enough for follow-up, before they opened or applied a segment.",
      },
      {
        icon: "alert-triangle",
        label: "A mistake engineering caught in review",
        variant: "danger",
        body: [
          "I introduced a sub-12px type size to fit more into the filter interface. An engineer flagged it: it broke the product's type scale and raised readability and accessibility concerns.",
        ],
        footer:
          "I kept the established minimum text size and created density through stronger section labels, shorter filter names, and spacing that separated groups without adding visual noise. I now check hierarchy changes against design-system tokens before I present a high-fidelity direction.",
      },
      {
        icon: "flask",
        label: "How I'd validate this today",
        body: [
          "Before building screens, I would write the task logic in detail: what information an organizer has, what they need to decide first, what they can refine later, and which exceptions matter.",
          "I would then build an HTML prototype and test competing entry points against the same task.",
        ],
        quote:
          "Create a follow-up audience for Spring Summit attendees who have not been exported.",
        codeBlocks: [
          {
            content: "Start with an event\nStart with audience attributes\nStart with a saved segment",
          },
        ],
        footer:
          "I would also ask AI to argue against the Event-first approach and identify cases where attributes, accounts, or saved segments should come first. I would treat those outputs as hypotheses to evaluate rather than answers to accept.",
      },
      {
        icon: "chart-line",
        label: "Outcome",
        body: [
          "The product shipped. Monthly active organizers increased from 2 to 74 during the following months, alongside a separate product launch.",
          "I can't attribute that increase to Smart Segments without feature-level usage or task-completion data.",
        ],
        codeBlocks: [
          {
            heading: "Feature-level measures I would track next:",
            content:
              "Number of segments created using Event filters\nTime to create an event follow-up segment\nFilter abandonment rate\nUse of saved-segment counts\nNumber of segments applied to campaigns",
          },
        ],
        stat: { value: "2 → 74", caption: "monthly active organizers, correlation only" },
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
      "I redesigned how customers interpret event-outreach predictions, replacing an unexplained single number with a transparent, adjustable estimate.",
    duration: "July 21 – Aug 26, 2026 · Ongoing",
    tools: ["Figma", "v0"],
    role: [
      "I worked as the sole designer, mainly with customer-facing team members who brought recurring customer questions and objections into the design process.",
      "My feedback loop focused on customer-proxy insight: what confused customers, what the team repeatedly had to explain, and which parts of the estimate people distrusted.",
    ],
    boxes: [
      {
        icon: "route",
        label: "The customer's job",
        body: [
          "A customer plans outreach for an event and needs to decide whether a target audience is large enough to produce a useful number of meetings.",
          "They need this estimate to plan sales-team capacity, outreach volume, event goals, and follow-up expectations.",
        ],
        quote:
          "If I invite 2,500 people from these segments, how many meetings should I expect my team to book?",
        codeBlocks: [
          {
            heading: "The old experience showed one value, with none of the reasoning behind it.",
            content: "Expected Meetings: 36",
          },
        ],
        footer:
          "Customers couldn't see the audience size behind the number, the conversion rate driving it, whether it was a guarantee or a forecast, or how changing segments would change the result. The team also changed the conversion rate five times over about 13 months, which made the estimate hard to explain consistently.",
      },
      {
        icon: "map",
        label: "The old journey",
        body: [],
        steps: [
          "The customer selects one or more audience segments.",
          "The planner shows an Expected Meetings number.",
          "The customer sees \"36 meetings.\"",
          "The customer asks, \"Where did 36 come from?\"",
          "A teammate manually explains the calculation, if they know the current conversion rate.",
          "The customer changes the segment selection.",
          "The customer struggles to tell whether the estimate changed because of audience size, conversion assumptions, or both.",
        ],
        footer:
          "The issue went beyond unclear copy. The UI presented an estimate as a precise answer while it hid the assumptions that created it.",
      },
      {
        icon: "bulb",
        label: "Key decision: turn a hardcoded outcome into an inspectable calculation",
        variant: "accent",
        body: [
          "An estimate should show its assumptions, its uncertainty, and the action that changes it.",
          "I designed the panel around three questions a customer would naturally ask: what result should I expect, what assumptions created it, and what happens if I change my audience?",
        ],
        codeBlocks: [
          {
            heading: "Show a range instead of a single number.",
            content: "Expected Meetings: 28 to 44\nBased on your selected audience of 2,500 contacts",
          },
          {
            heading: "Surface the conversion rate behind the estimate.",
            content: "Audience size: 2,500\nHistorical conversion rate: 1.4%\nExpected meetings: 28 to 44",
          },
          {
            heading: "Add an expandable \"Why this estimate?\" for customers who want confidence before they act.",
            content:
              "Why this estimate?\nThis range uses:\n• Your selected audience size\n• The current historical conversion rate for similar outreach\n• A lower and upper estimate to account for normal variation",
          },
          {
            heading: "Recalculate live as segments change.",
            content:
              "VP/Director, Enterprise: 1,200\nPast event attendees: 800\nHigh-intent accounts: 500\nTotal audience: 2,500 → Expected Meetings: 28 to 44\n\nRemove High-intent accounts (500):\nTotal audience: 2,000 → Expected Meetings: 22 to 35",
          },
        ],
      },
      {
        icon: "git-branch",
        label: "Alternatives I considered",
        body: [
          "I considered three directions before I landed on the final design.",
        ],
        codeBlocks: [
          {
            heading: "Option 1: keep one number, add a tooltip.",
            content: "Expected Meetings: 36 (i)",
          },
          {
            heading: "Option 2: show only the conversion rate.",
            content: "Estimated conversion rate: 1.4%",
          },
          {
            heading: "Option 3, selected: show a range, the assumptions, and live updates.",
            content:
              "Expected Meetings: 28 to 44\nBased on 2,500 contacts and a 1.4% historical conversion rate.\n[Why this estimate?]",
          },
        ],
        footer:
          "I chose option 3 because it gives customers an outcome, reveals the main assumption behind it, and lets them see how changing their plan changes the result.",
      },
      {
        icon: "flask",
        label: "Validation plan",
        body: [
          "I will test whether the panel changes trust and decision-making with real customers.",
        ],
        quote:
          "You have 2,500 contacts across three segments. You need to decide whether this audience can support a goal of 30 meetings.",
        steps: [
          "What do you think this estimate means?",
          "What information is driving it?",
          "Would you use this to plan outreach? Why?",
          "What would you change if you needed 50 meetings?",
          "What information would make you trust this estimate more?",
        ],
        footer:
          "I will compare answers against the previous single-number version to see whether customers understand the calculation and whether the range feels useful.",
      },
      {
        icon: "flask",
        label: "Prototyping this with AI",
        body: [
          "I would write the calculation logic and interaction states before I produce high-fidelity UI, using a lightweight HTML prototype with segment checkboxes, a live Expected Meetings range, a visible conversion-rate assumption, an expandable \"Why this estimate?\" section, and a scenario where the conversion rate changes.",
        ],
        codeBlocks: [
          {
            heading: "Edge cases I'd design for:",
            content:
              "No audience selected\nExpected Meetings: Select at least one segment\n\nSmall audience (42 contacts)\nExpected Meetings: 0 to 1\n\nInsufficient historical data\nExpected Meetings: Estimate unavailable\nWe need more outreach data for this audience.\n\nConversion rate updated from 1.4% to 1.1%\nExpected Meetings: 22 to 35",
          },
        ],
        footer:
          "I would use AI to generate a functional prototype and state variations, and I would define the calculation, information hierarchy, wording, and trust model myself.",
      },
      {
        icon: "chart-line",
        label: "Outcome",
        body: [
          "Design reviews continued through August 26, 2026. I haven't tested the panel with customers yet.",
          "The next milestone is customer validation: confirm whether customers understand the estimate, identify its inputs, and use it with more confidence when they plan outreach.",
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
