export interface InfoBox {
  icon: "route" | "git-branch" | "bulb" | "alert-triangle" | "flask" | "chart-line" | "map" | "code"
  label: string
  body: string[]
  variant?: "accent" | "danger" | "default"
  code?: string
  codeBlocks?: { heading?: string; content?: string; image?: string; imageWidth?: number; imageHeight?: number }[]
  thumbnailImages?: string[]
  steps?: string[]
  flow?: { steps: string[]; note?: string }[]
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
    beforeAfterSet?: { label: string; description: string; before: string; after: string }[]
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
        label: "What the organizer needed to do",
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
        footer:
          "The team didn't yet have a dedicated research function or an established organizer research panel, and this project moved within the Organizer MVP launch timeline. I used stakeholder and customer-facing feedback to evaluate the hierarchy, while recognizing that this was proxy feedback, not a substitute for direct organizer usability testing.",
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
            heading: "This changed the interaction from browsing a long menu to constructing an audience in decision order. Here, Event sits at the top with Attendance Status grouped right under it (Confirmed, Predicted, Historical), matching a saved segment against 40,153 attendees.",
            image: "/images/vendelux/segments-after-event-filter.gif",
            imageWidth: 1600,
            imageHeight: 967,
          },
        ],
        footer:
          "Organizers often maintained several event audiences. Counts were intended to help them compare saved audience sizes, for example whether \"Spring Summit attendees, not exported\" at 184 people was large enough for follow-up, before they opened or applied a segment.",
      },
      {
        icon: "git-branch",
        label: "A second decision: making include vs. exclude unambiguous",
        body: [
          "Job Title and Job Seniority originally mixed included and excluded values into one list, distinguished only by color. That's an easy state to misread at a glance, especially once an organizer has several values selected across both directions.",
          "I split each field into an explicit Include and Exclude section, each with its own toggle and its own list, so an organizer applying \"− Intern, 2,114\" doesn't have to infer exclusion from a color alone.",
        ],
        codeBlocks: [
          {
            image: "/images/vendelux/segments-include-exclude-before-after.png",
            imageWidth: 6704,
            imageHeight: 4405,
          },
        ],
      },
      {
        icon: "code",
        label: "My workflow",
        body: [
          "Once the hierarchy was set, I used the Figma MCP plugin API to script the tooltip system and component library from written specs, instead of building every variant by hand.",
        ],
        codeBlocks: [
          {
            image: "/images/vendelux/segments-tooltip-mcp-spec.png",
            imageWidth: 8000,
            imageHeight: 5101,
          },
          {
            heading: "I specced and scripted the rest of the component set the same way: filter toggles, section headers, the selected-count button, save and reset controls, and toast confirmations, each with its own documented states and interaction rules.",
            image: "/images/vendelux/segments-component-library-mcp-spec.png",
            imageWidth: 6775,
            imageHeight: 8000,
          },
        ],
        footer:
          "Mine: choosing the Event-first hierarchy, grouping attendance, export, and speaker filters around it, deciding which saved-segment counts to surface, and refining labels and spacing within the design system. Mechanical, and what I used MCP for: applying the same filter UI patterns across categories, generating repeated filter states, and producing layout variants.",
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
        icon: "chart-line",
        label: "Outcome",
        body: [
          "The product shipped. During the August 3–9, 2026 launch window, segment creation increased from 26 to 52 week over week.",
          "That indicates increased use of the broader organizer workflow, but I can't attribute it to Smart Segments alone: the same window included a separate Organizer MVP launch, and I don't yet have feature-level usage data isolating the redesigned filtering workflow from that.",
        ],
        codeBlocks: [
          {
            heading: "Feature-level measures I'm working to pull next, including monthly active organizers re-run by account-creation date (before vs. after July 6, 2026) to separate the two launches:",
            content:
              "Number of segments created using Event filters\nTime to create an event follow-up segment\nFilter abandonment rate\nUse of saved-segment counts\nNumber of segments applied to campaigns",
          },
        ],
        stat: { value: "26 → 52", caption: "segment creation, week over week (Aug 3–9, 2026)" },
      },
    ],
    media: {},
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
          "A campaign operator needs to launch several related sub-campaigns that share operational settings, such as status, sender, sending window, and cadence, while each sub-campaign targets a different audience segment.",
        ],
        quote:
          "Create three sub-campaigns for the same event: Enterprise attendees, Mid-market attendees, and SMB attendees. Set each to Draft, use the same sender and cadence settings, then assign the appropriate audience segment.",
        flow: [
          {
            steps: ["Open sub-campaign", "Set to Draft", "Configure shared settings"],
            note: "repeated for A, B, and C",
          },
          {
            steps: ["Assign audience segment"],
            note: "separately, per sub-campaign",
          },
          {
            steps: ["Return to campaign view to verify"],
          },
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
        label: "Key decision: separate shared setup from audience-specific setup",
        variant: "accent",
        body: [
          "I moved operational settings that apply across related sub-campaigns, such as Draft status, sender, sending window, and cadence, into a campaign-level bulk action. Each sub-campaign retained its own audience segment and any necessary exceptions.",
          "This model matched the operator's task: configure the shared outreach setup once, then tailor the audience for each outreach variant.",
          "Riskier actions, like activating or pausing live sub-campaigns, show a confirmation before they apply, since a bulk action here affects several live sub-campaigns at once.",
          "Audience segment stays a sub-campaign-level field in the same table, since each row targets a different audience. That lets an operator compare sizes across sub-campaigns at a glance, without the bulk action ever applying one segment to all of them.",
        ],
        codeBlocks: [
          {
            heading: "In the shipped version, an operator selects specific sub-campaigns with checkboxes, including a group-level checkbox for an entire outreach type, then applies shared settings to just that selection instead of an all-or-nothing action. An operator can still open an individual sub-campaign to override a value, which takes that row out of the bulk action going forward.",
            image: "/images/vendelux/campaign-admin-bulk-edit.gif",
            imageWidth: 1280,
            imageHeight: 1169,
          },
        ],
        footer:
          "This kept the bulk action limited to fields that are genuinely shared, and it kept audience assignment where each sub-campaign actually differs.",
      },
      {
        icon: "code",
        label: "Where judgment was mine, and where v0 did the mechanical work",
        body: [
          "Mine: separating shared campaign settings from sub-campaign-specific settings, choosing which controls belonged in bulk actions, defining exception and pause/resume states, and clarifying ambiguous product rules with the PM.",
          "Mechanical: generating repeated table rows, applying shared styles, and building out prototype states for confirmations, empty segments, and status variations.",
        ],
      },
      {
        icon: "git-branch",
        label: "Custom presets: three ways for FDEs to save settings",
        body: [
          "Beyond the fixed system preset batch (Early Confirmed, Late Confirmed, Predicted), FDEs needed a way to save their own settings as a reusable config. The real question was where saving should actually happen, so I built three clickable prototype directions to compare instead of debating it in the abstract: (A) a save toggle inside the sub-campaign creation drawer, (B) a dedicated presets library, and (C) capturing a preset from a sub-campaign you'd already built.",
        ],
        codeBlocks: [
          {
            image: "/images/vendelux/campaign-admin-custom-presets-compare.gif",
            imageWidth: 1208,
            imageHeight: 1286,
          },
          {
            heading: "Here's the dedicated library live in the product: a Custom Preset entry point sits alongside Saved presets and Compare Segments in the sub-campaign view.",
            image: "/images/vendelux/campaign-admin-custom-presets-shipped.gif",
            imageWidth: 1280,
            imageHeight: 973,
          },
        ],
        footer:
          "I chose B because a preset saved through a dedicated library is reusable across many sub-campaigns and campaigns rather than just the one it was created from. A and C both tie the preset's origin to a single sub-campaign, which limits reuse exactly where FDEs needed it most.",
      },
      {
        icon: "chart-line",
        label: "Interaction impact in the prototype",
        body: [
          "In the prototype, applying Draft status to three existing sub-campaigns took seven clicks in the prior flow: open each row, choose Draft, and return to the table.",
          "The redesigned flow took three clicks: choose Draft, select Apply to all, and confirm.",
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
          "Her feedback indicated that the nesting matched how she organized related campaigns. I revised parts of the structure where the distinction between shared settings and sub-campaign settings felt unclear.",
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
          "This reinforced that design execution depends on resolving product rules as much as clarifying the interface. As of this writing, the PM hadn't finalized that decision.",
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
      beforeAfterSet: [
        {
          label: "Create campaign",
          description:
            "The old tool (Vendelux Meetings Management V2) was an unstyled internal form: a flat page with a raw Team ID, plain radio buttons, and no visual hierarchy between required and optional fields. The redesign turns it into a structured modal, grouping Campaign Details, Event Association, and the auto-created Sub-Campaigns into clearly labeled sections.",
          before: "/images/vendelux/campaign-admin-before-creation.png",
          after: "/images/vendelux/campaign-admin-after-creation.png",
        },
        {
          label: "Campaign list",
          description:
            "The old view was a raw stats block (Campaigns, Sub-Campaigns, Ready to Launch, Pending Approval...) followed by a dense, unstyled table of every sub-campaign across every event. The redesign replaces it with a scannable list of campaigns, each showing its channel types, sub-campaign count, and status at a glance, with filtering and search.",
          before: "/images/vendelux/campaign-admin-before-summary.png",
          after: "/images/vendelux/campaign-admin-after-summary.png",
        },
      ],
    },
  },
  {
    slug: "meeting-planner",
    navLabel: "Meeting Planner",
    title: "Meeting Planner",
    oneLiner:
      "I found that the product presented an uncertain forecast as a precise fact, and redesigned it to expose the inputs and uncertainty behind the number.",
    duration: "July 21 – Aug 26, 2026 · Ongoing",
    tools: ["Figma", "v0"],
    role: [
      "I worked as the sole designer, mainly with customer-facing team members who brought recurring customer questions and objections into the design process.",
      "My feedback loop focused on customer-proxy insight: what the team repeatedly had to explain, and which parts of the estimate customers reportedly distrusted.",
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
          "Customer-facing teammates reported that customers often asked how the estimate was calculated and struggled to understand what drove it. The team also changed the underlying rate five times over about 13 months, which made the estimate hard to explain consistently.",
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
          "A teammate manually explains the calculation, if they know the current rate.",
          "The customer changes the segment selection.",
          "The customer struggles to tell whether the estimate changed because of audience size, rate assumptions, or both.",
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
            heading: "The real formula is a single deterministic calculation: matched prospects times a rate, where the rate is a 0.6% baseline for a customer's first campaign, or their own historical rate if it's higher on later campaigns.",
            content:
              "Expected meetings = Matched prospects × rate\nFirst campaign: rate = 0.6% baseline\nLater campaigns: rate = MAX(0.6%, customer's own historical rate)",
          },
          {
            heading: "Since the formula returns one exact number, I chose to present it as a range instead of a false-precision point estimate.",
            content:
              "Expected meetings: 28 to 44\nBased on:\n2,500 matched prospects\n1.4% (your own historical rate, above the 0.6% baseline)",
          },
          {
            heading: "The rate applies once to the whole audience. It doesn't break out by segment, and it doesn't compare against similar campaigns from other customers or events, so I kept the panel copy limited to what the formula actually does.",
            content:
              "Your expected meetings are calculated using your own historical conversion rate (or a baseline rate if you're new), applied to the number of matched prospects at this event.",
          },
          {
            heading: "Add an expandable \"Why this estimate?\" for customers who want confidence before they act.",
            content:
              "Why this estimate?\nThis range uses:\n• Your matched prospect count for this event\n• Your own historical conversion rate, or a 0.6% baseline if you're new\n• A range instead of one number, since the formula shouldn't be read as more precise than it is",
          },
          {
            heading: "In the real Create Campaign flow, the forecast panel updates live as an FDE sets the event, timing, and audience, matched leads, the expected meeting range, the conversion rate, and price per meeting all update together, with a \"Why this estimate?\" link for more detail.",
            image: "/images/vendelux/meeting-planner-create-campaign-flow.gif",
            imageWidth: 1280,
            imageHeight: 1488,
          },
        ],
        footer:
          "The baseline rate has moved more than once as the team recalibrated it against real campaign performance. That told me this was a monitored simplification the team actively revisits rather than a forgotten default, which shaped how much confidence I gave the estimate in the copy.",
      },
      {
        icon: "code",
        label: "Where judgment was mine, and where v0 did the mechanical work",
        body: [
          "Mine: choosing to replace a single forecast with a range, determining which inputs needed to be visible, writing the \"Why this estimate?\" explanation, and deciding how a segment change should affect the displayed estimate.",
          "Mechanical: laying out the panel, generating alternate display states, and implementing live recalculation once the underlying formula and rules were defined.",
        ],
      },
      {
        icon: "git-branch",
        label: "Alternatives I considered",
        body: [
          "I considered three directions before I landed on the final design, and weighed a real tradeoff for each one rather than just a description.",
        ],
        codeBlocks: [
          {
            heading: "Option 1: single number with a tooltip. Benefit: keeps a fast, compact planning view. Risk: keeps the estimate looking exact, so customers have to dig for the calculation.",
            content: "Expected Meetings: 36 (i)",
          },
          {
            heading: "Option 2: rate only. Benefit: makes the assumption visible. Risk: pushes the planning math back onto the customer.",
            content: "Historical conversion rate: 1.4%",
          },
          {
            heading: "Option 3, selected: outcome plus visible inputs. Benefit: supports planning while keeping the main assumption inspectable. Risk: still depends on whether customers trust the underlying data for their case.",
            content:
              "Expected meetings: 28 to 44\n2,500 contacts × 1.4% historical rate\n[Why this estimate?]",
          },
        ],
      },
      {
        icon: "flask",
        label: "Validation plan",
        body: [
          "I will test understanding and trust separately, since a customer can correctly explain the estimate and still say they wouldn't use it to set a goal.",
        ],
        quote:
          "You have 2,500 contacts across three segments. You need to decide whether this audience can support a goal of 30 meetings.",
        steps: [
          "What do you think this estimate means?",
          "What information is driving it?",
          "How confident are you in using this estimate to plan your outreach, and what makes you confident or skeptical?",
          "Does the range change how you would set your goal?",
          "Would you prefer a conservative estimate, a likely estimate, or a best-case estimate?",
        ],
        codeBlocks: [
          {
            heading: "Success criteria",
            content:
              "Understanding: participants identify audience size and the rate as inputs.\nTrust: participants describe the estimate as a useful planning signal rather than a guaranteed outcome.\nDecision support: participants can use the panel to decide whether to add audience, change their goal, or adjust outreach effort.",
          },
        ],
        footer:
          "I will compare answers against the previous single-number version to see whether customers understand the calculation and whether the range feels useful.",
      },
      {
        icon: "bulb",
        label: "What I would write before prototyping",
        body: [
          "The estimate helps customers plan, so it must support decisions without presenting a guarantee.",
          "Customers need to understand the selected audience, the rate definition, and the source of uncertainty.",
          "The interface must reveal when there is insufficient data rather than force a prediction.",
          "Changing a segment should update the forecast and explain which input changed.",
        ],
      },
      {
        icon: "route",
        label: "Design reviews across the Meetings App",
        body: [
          "This work sat inside a broader Meetings App effort, so I ran structured reviews with Customer Success and cross-functional stakeholders on the surrounding flows: the campaign builder, the segment builder, and campaign summary and launch validation.",
        ],
        thumbnailImages: [
          "/images/vendelux/meeting-planner-design-review-cs.png",
          "/images/vendelux/meeting-planner-design-review-notes.png",
        ],
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
      beforeAfterSet: [
        {
          label: "Main page",
          description:
            "The old view was a flat data table with no way to see what needed attention. The redesign adds a \"Needs attention\" panel that surfaces missing booking links, missing on-site contacts, and pending approvals up front, then lists campaigns as cards with status and connection counts.",
          before: "/images/vendelux/mp-before-mainpage.png",
          after: "/images/vendelux/mp-after-mainpage.png",
        },
        {
          label: "Create campaign flow",
          description:
            "The old flow was one long single-page form covering event details, audience targeting, and goals all at once. The redesign breaks it into a guided four-step wizard (Goal & Audience, Persona & Sequences, Booking & Integrations, Review & Launch) with a live forecast panel alongside it.",
          before: "/images/vendelux/mp-before-creationflow.png",
          after: "/images/vendelux/mp-after-creationflow.png",
        },
        {
          label: "Email sequences",
          description:
            "The old view showed all four email steps fully expanded with their full copy visible at once. The redesign collapses them into a labeled, expandable list and adds cold-call and LinkedIn or networking-app scripts alongside it.",
          before: "/images/vendelux/mp-before-emailsequence.png",
          after: "/images/vendelux/mp-after-emailsequence.png",
        },
        {
          label: "Event detail",
          description:
            "The old page listed every field as flat text, including a hardcoded \"Expected Meetings: 27, 2.5% conversion rate\" with no explanation. The redesign organizes the same information into clear sections and adds a \"Fix to launch\" checklist that flags what's missing before a campaign can go live.",
          before: "/images/vendelux/mp-before-eventdetail.png",
          after: "/images/vendelux/mp-after-eventdetail.png",
        },
      ],
    },
  },
]
