export interface InfoBox {
  icon: "route" | "git-branch" | "bulb" | "alert-triangle" | "flask" | "chart-line" | "map" | "code"
  label: string
  badge?: string
  body: string[]
  variant?: "accent" | "danger" | "default"
  code?: string
  codeBlocks?: { heading?: string; content?: string; image?: string; imageWidth?: number; imageHeight?: number }[]
  thumbnailImages?: string[]
  steps?: string[]
  flow?: { steps: string[]; note?: string }[]
  inlineBeforeAfter?: { before: string; after: string }
  beforeAfterPairs?: { label: string; description: string; before: string; after: string }[]
  stepCompare?: {
    beforeLabel: string
    beforeSteps: string[]
    afterLabel: string
    afterSteps: string[]
    highlightAfterIndexes?: number[]
  }
  journey?: { actor: "customer" | "system"; text: string; isQuote?: boolean }[]
  questionCards?: string[]
  optionCards?: { label: string; description: string; example?: string; selected?: boolean }[]
  quote?: string
  footer?: string
  stat?: { value: string; caption: string }
  barChart?: { bars: { label: string; value: number }[]; summary?: string }
  numberedCards?: { number: string; title: string; description?: string }[]
  /** Dated milestones drawn as a connected timeline. */
  timeline?: { when: string; what: string }[]
  /** Stages left to right; `added` marks a stage the redesign introduced. */
  funnel?: { label: string; value: string; note?: string; added?: boolean }[]
  /** Horizontal bars to scale, for a before/after number or two competing figures. */
  compare?: { bars: { label: string; value: number; display: string; accent?: boolean }[]; caption?: string }
  /** Side-by-side columns of short chips, e.g. what I decided vs. what a tool did. */
  split?: { title: string; items: string[]; accent?: boolean }[]
  /** One parent with children: what's set once vs. what each child owns. */
  tree?: { root: string; rootItems: string[]; children: { title: string; items: string[] }[] }
}

export interface VendeluxProject {
  slug: string
  navLabel: string
  title: string
  /** The design challenge, shown as the case study's main heading. */
  challenge?: string
  oneLiner: string
  duration: string
  whatIDid: string
  tools: string[]
  intro: { text: string; image: string; alt: string }
  quickFacts?: { label: string; value: string }[]
  beforeShot?: { image: string; alt: string; label?: string }
  transition?: string
  credit?: { text: string; linkText?: string; url?: string }
  role: string[]
  boxes: InfoBox[]
  media: {
    beforeAfterSet?: { label: string; description: string; before: string; after: string }[]
  }
  /** In progress: the tab shows a short "coming soon" note instead of a case study. */
  comingSoon?: boolean
}

export const vendeluxProjects: VendeluxProject[] = [
  {
    slug: "segments",
    navLabel: "Segments",
    title: "Segments",
    challenge: "Guiding marketers to the right audience",
    oneLiner: "Organizers dug through an alphabetical list to do the one thing they always did first. I reordered the filters around that task.",
    duration: "Mar – May 2026 · Shipped",
    whatIDid: "UI/UX design and engineering handoff",
    tools: ["Figma", "Figma MCP Plugin API"],
    intro: {
      text: "Organizers need to find the right people to contact out of tens of thousands of attendees. I redesigned Segments, the filtering tool they use to build those audiences.",
      image: "/images/vendelux/segments-include-exclude-after.png",
      alt: "Vendelux segment builder showing job title and seniority filters with include/exclude toggles",
    },
    quickFacts: [
      { label: "My Role", value: "Product Intern" },
      { label: "Timeline", value: "Mar – May 2026" },
      { label: "Team", value: "5-person team · 1 team lead, 1 PM, 2 engineers" },
      { label: "Users", value: "Event marketers and campaign coordinators" },
      { label: "User Goal", value: "Identify relevant people to invite or contact for future events" },
      { label: "Outcome", value: "26 segments created in week one; 220 by the end of the first month" },
    ],
    beforeShot: {
      image: "/images/vendelux/segments-raw-attendee-table.png",
      alt: "Raw table of confirmed attendees with job title, job function, seniority, and organization columns",
      label: "Before: a raw table of 40,000 attendees",
    },
    credit: {
      text: "Product Internship, Vendelux",
      linkText: "view the case study deck",
      url: "https://www.google.com/goto?url=CAESVQHrOzAVS88RVlmY9mMD39AUyefsVkijSEV8TB3EvZcnlB3w67wF-TEZteaFv_zxDj4qFYkO0DfYkfuM6jEyINF1Mm46PeqxTFl8SYUVhVIbrRZFzRM",
    },
    role: ["Shaped the hierarchy with my PM over several feedback rounds."],
    boxes: [
      {
        icon: "route",
        label: "Problem",
        body: ["Organizers rebuilt the same filters from scratch every time, across a 40,000-row table."],
        quote: "How might we increase filter adoption to drive more precise audience targeting?",
      },
      {
        icon: "git-branch",
        label: "Three ways to order the filters",
        body: [],
        optionCards: [
          { label: "Alphabetical", description: "Easy to search. Ignores task order." },
          { label: "Audience first", description: "Good for broad prospecting. Slow for event follow-up." },
          { label: "Event first", description: "Matches the task organizers always do first.", selected: true },
        ],
        footer: "I reviewed these with stakeholders and customer-facing teammates. That's proxy feedback, not organizer testing.",
      },
      {
        icon: "bulb",
        label: "The decision: put Event at the top",
        variant: "accent",
        body: [],
        stepCompare: {
          beforeLabel: "Before: A to Z",
          beforeSteps: ["One alphabetical list", "Event buried mid-list", "Attendance, export and speaker scattered"],
          afterLabel: "After: decision order",
          afterSteps: ["Event", "Attendance status", "Already exported", "Speaker", "People: job title, seniority"],
          highlightAfterIndexes: [0, 1],
        },
        codeBlocks: [
          {
            heading: "Event first, attendance right under it, with live counts against 40,153 attendees.",
            image: "/images/vendelux/segments-after-event-filter.gif",
            imageWidth: 1600,
            imageHeight: 967,
          },
        ],
      },
      {
        icon: "git-branch",
        label: "A second fix: include vs. exclude",
        body: ["Included and excluded values shared one list, told apart only by color. I split them into two labeled sections."],
        inlineBeforeAfter: {
          before: "/images/vendelux/segments-include-exclude-before.png",
          after: "/images/vendelux/segments-include-exclude-after.png",
        },
      },
      {
        icon: "code",
        label: "How I built it",
        body: ["I scripted the component library from written specs with the Figma MCP plugin API."],
        split: [
          { title: "My calls", accent: true, items: ["Event-first hierarchy", "Filter grouping", "Which counts to show", "Labels and spacing"] },
          { title: "The tool's work", items: ["Repeating filter patterns", "Generating states", "Layout variants"] },
        ],
        codeBlocks: [
          { image: "/images/vendelux/segments-tooltip-mcp-spec.png", imageWidth: 8000, imageHeight: 5101 },
          { image: "/images/vendelux/segments-component-library-mcp-spec.png", imageWidth: 6775, imageHeight: 8000 },
        ],
      },
      {
        icon: "alert-triangle",
        label: "Where I got it wrong",
        variant: "danger",
        body: ["I used sub-12px text to fit more in. An engineer flagged it as off the type scale and hard to read."],
        footer: "I kept the minimum size and found density through labels and spacing. Now I check tokens before any high-fidelity review.",
      },
      {
        icon: "chart-line",
        label: "Impact",
        body: ["Saved segments grew every week after launch, and sales and customer success started using them too."],
        barChart: {
          bars: [
            { label: "Jul 27", value: 26 },
            { label: "Aug 3", value: 52 },
            { label: "Aug 10", value: 95 },
            { label: "Aug 17", value: 133 },
            { label: "Aug 30", value: 220 },
          ],
          summary: "26 → 220 saved segments in a month (+746%)",
        },
        funnel: [
          { label: "Dreamforce", value: "40,000", note: "attendees" },
          { label: "One saved segment", value: "400", note: "relevant people" },
        ],
        footer: "One customer called it \"lifechanging.\"",
      },
      {
        icon: "bulb",
        label: "What I learned",
        body: ["At a fast-moving company, I learned to own the problem, test early and start conversations instead of waiting for direction."],
      },
    ],
    media: {},
  },
  {
    slug: "campaign-admin",
    navLabel: "Campaign Admin",
    title: "Campaign Admin",
    challenge: "Turning a cut feature into a faster setup flow",
    oneLiner: "When backend limits cut bulk editing from the MVP, I found another path to the same outcome.",
    duration: "July 10 – Aug 28, 2026 · In progress",
    whatIDid: "UI/UX design across engineering, FDEs and product",
    tools: ["Granola", "Claude Code", "v0"],
    intro: {
      text: "Forward-deployed engineers (FDEs) set up a campaign per event, often with several related sub-campaigns. Setup was spread across pages and full of repeated entry. I owned research, flows and prioritization as the only designer.",
      image: "/images/vendelux/campaign-admin-after-creation.png",
      alt: "Vendelux campaign creation view showing sub-campaign setup",
    },
    quickFacts: [
      { label: "My Role", value: "Product Intern" },
      { label: "Timeline", value: "Jul – Aug 2026" },
      { label: "Team", value: "5-person team · 1 lead, 1 PM, 2 engineers" },
      { label: "Users", value: "Forward-deployed engineers" },
      { label: "User Goal", value: "Set up campaigns and related sub-campaigns for event teams" },
      { label: "Outcome", value: "MVP in development; duplicate action reduced the tested repeated-setup flow from 9 to 3 steps" },
    ],
    credit: { text: "Product Internship, Vendelux" },
    role: [],
    boxes: [
      {
        icon: "route",
        label: "The task: three sub-campaigns, same settings",
        body: ["Each sub-campaign targets a different audience but shares the same setup. The old tool treated them as unrelated."],
        flow: [
          { steps: ["Open sub-campaign", "Set to Draft", "Enter shared settings"], note: "× 3" },
          { steps: ["Assign segment"], note: "per sub-campaign" },
          { steps: ["Go back and verify"] },
        ],
      },
      {
        icon: "map",
        label: "The model they actually think in",
        body: [],
        tree: {
          root: "Campaign: one event",
          rootItems: ["Status", "Sender", "Sending window", "Cadence"],
          children: [
            { title: "Enterprise", items: ["Own segment"] },
            { title: "Mid-market", items: ["Own segment"] },
            { title: "SMB", items: ["Own segment"] },
          ],
        },
        footer: "An FDE confirmed this nesting matched how she organized campaigns before I moved into UI.",
      },
      {
        icon: "route",
        label: "What I heard from FDEs",
        body: [],
        numberedCards: [
          { number: "01", title: "Fragmented setup", description: "Split across creation and editing." },
          { number: "02", title: "Repeated work", description: "Same settings entered again and again." },
          { number: "03", title: "Hard to scan", description: "Unclear what was active or pending." },
        ],
      },
      {
        icon: "git-branch",
        label: "First idea: bulk editing",
        body: ["Select sub-campaigns, apply shared settings once. Segments stayed per row."],
        codeBlocks: [{ image: "/images/vendelux/campaign-admin-bulk-edit.gif", imageWidth: 1280, imageHeight: 1169 }],
      },
      {
        icon: "alert-triangle",
        variant: "danger",
        label: "Backend couldn't support it in time",
        body: ["I raised the feasibility gap too late, and bulk editing was cut from the MVP. I proposed Duplicate instead: copy a sub-campaign, change only what differs."],
        codeBlocks: [{ image: "/images/vendelux/campaign-admin-duplicate-action.gif", imageWidth: 1280, imageHeight: 850 }],
      },
      {
        icon: "chart-line",
        label: "Duplicate cut the steps by 67%",
        body: [],
        compare: {
          bars: [
            { label: "Before", value: 9, display: "9 steps" },
            { label: "With Duplicate", value: 3, display: "3 steps", accent: true },
          ],
          caption: "Steps to configure one related sub-campaign",
        },
      },
      {
        icon: "git-branch",
        label: "Where should custom presets live?",
        body: [],
        optionCards: [
          { label: "A. Toggle in the drawer", description: "Tied to one sub-campaign." },
          { label: "B. Presets library", description: "Reusable across every campaign.", selected: true },
          { label: "C. Save from existing", description: "Tied to one sub-campaign." },
        ],
        codeBlocks: [
          { image: "/images/vendelux/campaign-admin-custom-presets-compare.gif", imageWidth: 1208, imageHeight: 1286 },
          { heading: "Shipped: Custom Preset next to Saved presets.", image: "/images/vendelux/campaign-admin-custom-presets-shipped.gif", imageWidth: 1280, imageHeight: 884 },
        ],
      },
      {
        icon: "map",
        label: "Status you can scan",
        body: ["Tabs for recent, drafts and cancelled, plus status tags on the list. A top bar instead of a second sidebar kept the list wide."],
        inlineBeforeAfter: {
          before: "/images/vendelux/campaign-admin-before-summary.png",
          after: "/images/vendelux/campaign-admin-after-summary.png",
        },
      },
      {
        icon: "map",
        label: "Before / after",
        body: [],
        beforeAfterPairs: [
          {
            label: "Create campaign",
            description: "An unstyled internal form became a structured modal with labeled sections.",
            before: "/images/vendelux/campaign-admin-before-creation.png",
            after: "/images/vendelux/campaign-admin-after-creation.png",
          },
        ],
      },
      {
        icon: "git-branch",
        label: "Open question: which date logic applies?",
        badge: "Open question",
        body: ["Two specs disagreed on a paused sub-campaign's start date. I documented the conflict and handed the call to the PM before designing the resume flow."],
      },
      {
        icon: "bulb",
        label: "What changed in my process",
        body: [],
        split: [
          { title: "Before", items: ["Design the ideal flow", "Check feasibility at handoff"] },
          { title: "Now", accent: true, items: ["Bring engineers into scoping", "Check feasibility first", "Try narration or a decision log"] },
        ],
        footer: "Duplicate is what's shipping in the MVP.",
      },
    ],
    media: {},
  },
  {
    slug: "roi-calculator",
    navLabel: "ROI Calculator",
    title: "ROI Calculator",
    challenge: "Turning a guessed budget into a return people can defend",
    oneLiner: "Planner's budget was a free-text guess. I moved the ROI math into the event panel and found the old calculator overstated return by about 2x.",
    duration: "Sep – Nov 2026 · Live in dev",
    whatIDid: "Product design, reviewed with our PM and CEO",
    tools: ["v0", "Claude", "PostHog", "Granola"],
    intro: {
      text: "Planner is where event marketers decide which events are worth the money. I redesigned how they plan budget and project return, right on the event card.",
      image: "/images/vendelux/roi-saved-card.jpg",
      alt: "Budget and performance panel with Conversion and Close steps, and a Planner board card showing budget $59k, closed-won $455k and projected ROI 7.7x",
    },
    quickFacts: [
      { label: "My Role", value: "Product Designer (sole designer)" },
      { label: "Timeline", value: "Sep – Nov 2026" },
      { label: "Team", value: "PM, CEO and engineering" },
      { label: "Users", value: "Event marketers and budget owners" },
      { label: "User Goal", value: "Decide which events are worth the spend, and defend that call to leadership" },
      { label: "Outcome", value: "Planner redesign live in dev on real data; full ROI reconciliation scoped for a later phase" },
    ],
    credit: { text: "Product Design, Vendelux" },
    role: [],
    boxes: [
      {
        icon: "route",
        label: "Problem",
        body: [],
        split: [
          { title: "Budget", items: ["Free-text cell", "Typed from memory", "Nothing calculated"] },
          { title: "ROI calculator", items: ["Separate page", "Leads straight to sales", "Valued at lifetime value"] },
        ],
        quote: "How might we help event marketers project a return they can defend, right where they plan?",
      },
      {
        icon: "map",
        label: "Each review changed the design",
        body: [],
        timeline: [
          { when: "Sep 25", what: "Early explorations" },
          { when: "Oct 1", what: "PM review: calculate in the panel" },
          { when: "Oct 6", what: "Clickable prototype" },
          { when: "Oct 7", what: "No prefill, wider, no blur" },
          { when: "Oct 19", what: "CEO: simplify the card" },
          { when: "Nov 10", what: "Handoff to engineering" },
        ],
      },
      {
        icon: "git-branch",
        label: "Three ways in",
        body: [],
        optionCards: [
          { label: "Link out", description: "Cheap, but leaves the panel." },
          { label: "Per-field calculators", description: "Splits the funnel across fields." },
          { label: "One calculator in the panel", description: "Fills every card field in place.", selected: true },
        ],
      },
      {
        icon: "alert-triangle",
        label: "The old math overstated return by 2x",
        variant: "danger",
        body: [],
        compare: {
          bars: [
            { label: "Lifetime value (old)", value: 15.4, display: "15.4x" },
            { label: "Closed-won (new)", value: 7.7, display: "7.7x", accent: true },
          ],
          caption: "Same event, same inputs: Microsoft Ignite 2026, $59k budget",
        },
        funnel: [
          { label: "Budget", value: "$59k" },
          { label: "Leads", value: "152", note: "15% capture" },
          { label: "Opportunities", value: "61", note: "40% lead→opp", added: true },
          { label: "Pipeline", value: "$1.82M", note: "$30k deal", added: true },
          { label: "Closed-won", value: "$455k", note: "25% win" },
        ],
        footer: "B2B teams report pipeline first, so I added the missing opportunity stage. Demo inputs, not customer data.",
      },
      {
        icon: "bulb",
        label: "The decision: the panel is the calculator",
        variant: "accent",
        body: ["Investment → Reach → Conversion → Close, with the card updating live."],
        codeBlocks: [
          { heading: "Closed-won by default, labelled gross.", image: "/images/vendelux/roi-closed-won.jpg", imageWidth: 1100, imageHeight: 420 },
          { heading: "Lifetime value moves to an advanced option.", image: "/images/vendelux/roi-ltv.jpg", imageWidth: 1100, imageHeight: 420 },
          { heading: "The card gets only the decision values.", image: "/images/vendelux/roi-saved-card.jpg", imageWidth: 1100, imageHeight: 900 },
        ],
      },
      {
        icon: "flask",
        label: "Nine hypotheses",
        body: ["Checked against product data, the math or leadership review, not moderated user tests."],
        split: [
          { title: "Held up", accent: true, items: ["Budget needs a source", "Calculate in the panel", "Add an opportunity stage", "Lifetime value overstates", "Live updates build trust"] },
          { title: "Overturned in review", items: ["Prefilled numbers", "Blurred modal", "Every field on the card", "Card aggregates (deferred)"] },
        ],
      },
      {
        icon: "map",
        label: "Where each value lives",
        body: [],
        stepCompare: {
          beforeLabel: "Before",
          beforeSteps: ["Budget: free text", "ROI: separate page", "Pipeline: no source", "Rates: re-entered each time"],
          afterLabel: "After",
          afterSteps: ["Budget: summed from spend lines", "ROI: on the card, closed-won", "Rates: in the panel", "LTV and close rate: remembered"],
          highlightAfterIndexes: [0, 1],
        },
      },
      {
        icon: "chart-line",
        label: "Where this stands",
        body: ["The Planner redesign is live in dev on real data. Full calculator reconciliation is scoped for a later phase."],
      },
      {
        icon: "bulb",
        label: "Next",
        body: ["Test the funnel with event marketers using their real numbers, then connect forecasts to post-event actuals."],
      },
    ],
    media: {},
  },
  {
    slug: "meeting-planner",
    navLabel: "Meeting Planner",
    title: "Meeting Planner",
    challenge: "Making a forecast people can trust",
    oneLiner: "The product showed \"Expected Meetings: 36\" like a fact. I redesigned the panel to show its work.",
    duration: "July 21 – Aug 26, 2026 · Ongoing",
    whatIDid: "UI/UX design and customer interviews",
    tools: ["Granola", "Claude Code", "v0"],
    intro: {
      text: "Before committing to a campaign, customers want to know how many sales meetings to expect. The estimate looked exact but hid its assumptions, and customers kept pushing back.",
      image: "/images/vendelux/mp-after-mainpage.png",
      alt: "Vendelux Meetings dashboard showing campaigns and their status",
    },
    quickFacts: [
      { label: "My Role", value: "Product Intern" },
      { label: "Timeline", value: "Jul – Aug 2026" },
      { label: "Team", value: "5-person team · 1 team lead, 1 PM, 2 engineers" },
      { label: "Users", value: "Customers hosting events, setting outreach goals" },
      { label: "User Goal", value: "Find the right outreach audience and see predicted attendees for upcoming events" },
      { label: "Outcome", value: "In design review; not yet shipped to engineering or tested with customers" },
    ],
    credit: { text: "Product Internship, Vendelux" },
    role: [],
    boxes: [
      {
        icon: "route",
        label: "The question customers were asking",
        body: [],
        quote: "If I invite 2,500 people from these segments, how many meetings should I expect?",
        codeBlocks: [{ heading: "What they got:", content: "Expected Meetings: 36" }],
        footer: "The underlying rate changed five times in 13 months, so even teammates struggled to explain it.",
      },
      {
        icon: "map",
        label: "Where the old flow broke down",
        body: [],
        journey: [
          { actor: "customer", text: "Selects audience segments." },
          { actor: "system", text: "Shows Expected Meetings: 36." },
          { actor: "customer", text: "Where did 36 come from?", isQuote: true },
          { actor: "system", text: "A teammate explains it by hand, if they know the current rate." },
          { actor: "customer", text: "Changes segments, can't tell what moved the number." },
        ],
      },
      {
        icon: "bulb",
        label: "The decision: make the math inspectable",
        variant: "accent",
        body: [],
        funnel: [
          { label: "Matched prospects", value: "2,500" },
          { label: "Rate", value: "1.4%", note: "yours, or 0.6% baseline" },
          { label: "Expected meetings", value: "28 to 44", note: "a range, not a point", added: true },
        ],
        codeBlocks: [
          {
            heading: "The forecast updates live as you set the event, timing and audience, with a \"Why this estimate?\" link.",
            image: "/images/vendelux/meeting-planner-create-campaign-flow.gif",
            imageWidth: 1280,
            imageHeight: 1488,
          },
        ],
      },
      {
        icon: "git-branch",
        label: "Three ways to show it",
        body: [],
        optionCards: [
          { label: "Number + tooltip", description: "Compact, but still looks exact.", example: "Expected Meetings: 36 (i)" },
          { label: "Rate only", description: "Pushes the math onto the customer.", example: "Historical rate: 1.4%" },
          { label: "Outcome + inputs", description: "Supports planning, keeps the assumption visible.", example: "28 to 44\n2,500 × 1.4%", selected: true },
        ],
      },
      {
        icon: "code",
        label: "My calls vs. v0's",
        body: [],
        split: [
          { title: "My calls", accent: true, items: ["Range instead of a number", "Which inputs to show", "\"Why this estimate?\" copy", "How segment changes update it"] },
          { title: "v0's work", items: ["Panel layout", "Display states", "Live recalculation"] },
        ],
      },
      {
        icon: "flask",
        label: "How I'll test it",
        body: ["Understanding and trust separately: someone can explain the estimate and still not plan with it."],
        questionCards: ["What does this estimate mean?", "What's driving it?", "Would you set a goal with it?", "Does the range change your goal?"],
      },
      {
        icon: "route",
        label: "Design reviews across the Meetings app",
        body: ["Structured reviews with Customer Success on the campaign builder, segment builder and launch checks."],
        thumbnailImages: ["/images/vendelux/meeting-planner-design-review-cs.png", "/images/vendelux/meeting-planner-design-review-notes.png"],
      },
      {
        icon: "chart-line",
        label: "Where this stands",
        body: ["In design review through Aug 26, 2026. Next: validate with customers."],
      },
      {
        icon: "bulb",
        label: "What I learned",
        body: ["Writing the validation plan before Figma kept me honest. Next time I'd put a rough prototype in front of customers sooner."],
      },
    ],
    media: {
      beforeAfterSet: [
        { label: "Main page", description: "A flat table became a \"Needs attention\" panel plus campaign cards.", before: "/images/vendelux/mp-before-mainpage.png", after: "/images/vendelux/mp-after-mainpage.png" },
        { label: "Create campaign", description: "One long form became a four-step wizard with a live forecast.", before: "/images/vendelux/mp-before-creationflow.png", after: "/images/vendelux/mp-after-creationflow.png" },
        { label: "Email sequences", description: "Fully expanded emails became a collapsible list with call and LinkedIn scripts.", before: "/images/vendelux/mp-before-emailsequence.png", after: "/images/vendelux/mp-after-emailsequence.png" },
        { label: "Event detail", description: "Flat text became sections plus a \"Fix to launch\" checklist.", before: "/images/vendelux/mp-before-eventdetail.png", after: "/images/vendelux/mp-after-eventdetail.png" },
      ],
    },
  },
]
