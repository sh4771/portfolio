export interface InfoBox {
  icon: "route" | "git-branch" | "bulb" | "alert-triangle" | "flask" | "chart-line" | "map" | "code"
  label: string
  body: string[]
  variant?: "accent" | "danger" | "default"
  code?: string
  codeBlocks?: { heading?: string; content?: string; placeholder?: string; image?: string }[]
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
            placeholder: "/images/vendelux/segments-before-after-flow.png",
          },
        ],
        footer:
          "Organizers often maintained several event audiences. Counts were intended to help them compare saved audience sizes, for example whether \"Spring Summit attendees, not exported\" at 184 people was large enough for follow-up, before they opened or applied a segment.",
      },
      {
        icon: "code",
        label: "How I built this with Claude MCP",
        body: [
          "Once the hierarchy was set, I used the Figma MCP plugin API to script the tooltip system and the component library directly from written specs, instead of building every variant by hand.",
          "The tooltip is one reusable component that fires on hover of the info icon, positions itself relative to that icon, and only swaps its text content per filter category. Scripting it once through MCP covered every tooltip in the panel instead of me placing dozens of them manually.",
        ],
        codeBlocks: [
          {
            image: "/images/vendelux/segments-tooltip-mcp-spec.png",
          },
          {
            heading: "I specced and scripted the rest of the component set the same way: filter toggles, section headers, the selected-count button, save and reset controls, and toast confirmations, each with its own documented states and interaction rules.",
            image: "/images/vendelux/segments-component-library-mcp-spec.png",
          },
        ],
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
          "A campaign operator needs to launch several related sub-campaigns that share operational settings, such as status, sender, sending window, and cadence, while each sub-campaign targets a different audience segment.",
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
            placeholder: "/images/vendelux/campaign-admin-structure.png",
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
        ],
        codeBlocks: [
          {
            heading: "An operator applies shared settings once instead of repeating that setup for every row. An operator can still open an individual sub-campaign to override a shared value, which takes that row out of the bulk action going forward.",
            content:
              "Status: Draft\nSender: Violet Hyun\nSending window: Weekdays, 9 AM–5 PM\nCadence: 3-step outreach sequence\n[Apply to all sub-campaigns]",
            placeholder: "/images/vendelux/campaign-admin-apply-to-all.png",
          },
          {
            heading: "Riskier actions, like activating or pausing live sub-campaigns, show a confirmation before they apply.",
            content:
              "Apply status to all sub-campaigns\nSelected status: Active\nThis will activate 3 sub-campaigns:\n• Enterprise attendees, 148 contacts\n• Mid-market attendees, 276 contacts\n• SMB attendees, 392 contacts\n[Cancel]  [Activate 3 sub-campaigns]",
            placeholder: "/images/vendelux/campaign-admin-activate-confirm.png",
          },
          {
            heading: "Audience segment stays a sub-campaign-level field, since each row targets a different audience. The table lets an operator compare sizes across sub-campaigns, but it doesn't apply one segment to all of them.",
            content:
              "                     Enterprise      Mid-market      SMB\nAudience segment    148 contacts    276 contacts    392 contacts\nStatus              Draft           Draft           Draft",
            placeholder: "/images/vendelux/campaign-admin-segment-table.png",
          },
        ],
        footer:
          "This kept the bulk action limited to fields that are genuinely shared, and it kept audience assignment where each sub-campaign actually differs.",
      },
      {
        icon: "git-branch",
        label: "Custom presets: three ways for FDEs to save settings",
        body: [
          "Beyond the fixed system preset batch (Early Confirmed, Late Confirmed, Predicted), FDEs needed a way to save their own settings as a reusable config. The real question was where saving should actually happen, so I built three clickable prototype directions to compare instead of debating it in the abstract.",
        ],
        codeBlocks: [
          {
            heading: "A: save while creating, a toggle at the bottom of the sub-campaign creation drawer. B: dedicated library, selected, a separate presets manager applied at creation. C: save from existing, capture a preset from a sub-campaign you already built.",
            image: "/images/vendelux/campaign-admin-custom-presets-compare.gif",
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
          "I'd use AI to generate the functional prototype and edge states, like empty segments, mismatched settings, paused rows, and confirmation dialogs, but I'd define the hierarchy, task sequence, and product rules myself. I would also prompt the prototype review from an opposing perspective, asking it to identify cases where campaign-level bulk controls could create mistakes, hide meaningful differences, or reduce operator control. I would treat those outputs as edge cases to test rather than as product decisions.",
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
            placeholder: "/images/vendelux/meeting-planner-old-panel.png",
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
            placeholder: "/images/vendelux/meeting-planner-formula-spec.png",
          },
          {
            heading: "Since the formula returns one exact number, I chose to present it as a range instead of a false-precision point estimate.",
            content:
              "Expected meetings: 28 to 44\nBased on:\n2,500 matched prospects\n1.4% (your own historical rate, above the 0.6% baseline)",
            placeholder: "/images/vendelux/meeting-planner-range.png",
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
            placeholder: "/images/vendelux/meeting-planner-why-estimate.png",
          },
          {
            heading: "Recalculate live as segments change, and label it as a forecast rather than a guarantee.",
            content:
              "Total audience: 2,500 → Expected meetings: 28 to 44\nRemove a 500-contact segment:\nTotal audience: 2,000 → Expected meetings: 22 to 35\n\nDirectional forecast. Actual results depend on outreach content, timing, audience fit, and campaign execution.",
            placeholder: "/images/vendelux/meeting-planner-recalculate.gif",
          },
        ],
        footer:
          "The baseline rate has moved more than once as the team recalibrated it against real campaign performance. That told me this was a monitored simplification the team actively revisits rather than a forgotten default, which shaped how much confidence I gave the estimate in the copy.",
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
            placeholder: "/images/vendelux/meeting-planner-option-1.png",
          },
          {
            heading: "Option 2: rate only. Benefit: makes the assumption visible. Risk: pushes the planning math back onto the customer.",
            content: "Historical conversion rate: 1.4%",
            placeholder: "/images/vendelux/meeting-planner-option-2.png",
          },
          {
            heading: "Option 3, selected: outcome plus visible inputs. Benefit: supports planning while keeping the main assumption inspectable. Risk: still depends on whether customers trust the underlying data for their case.",
            content:
              "Expected meetings: 28 to 44\n2,500 contacts × 1.4% historical rate\n[Why this estimate?]",
            placeholder: "/images/vendelux/meeting-planner-option-3.png",
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
        icon: "flask",
        label: "Prototyping this with AI",
        body: [
          "I would turn the writing above into a functional HTML prototype before I invest in visual detail, with segment checkboxes, a live Expected Meetings range, a visible rate assumption, an expandable \"Why this estimate?\" section, and a scenario where the rate changes.",
        ],
        codeBlocks: [
          {
            heading: "Edge states I'd design for:",
            content:
              "No segments selected\nExpected meetings: Select an audience to see an estimate\n\nSmall audience (42 contacts)\nExpected meetings: 0 to 1\n\nNo reliable historical data\nExpected meetings: Unavailable\nThere is not enough historical data to create a reliable estimate.\n\nOutdated assumption\nHistorical rate last updated: August 2026\n[Learn how this rate is calculated]",
          },
        ],
        footer:
          "I would use AI to generate a functional prototype and state variations, and I would define the calculation, information hierarchy, wording, and trust model myself. I would also ask AI to argue against the proposed panel and identify ways the interface could mislead customers, create false confidence, or hide weak data. I would treat its response as a list of test cases rather than as product direction.",
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
