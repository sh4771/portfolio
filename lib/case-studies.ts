export interface CaseStudyData {
  slug: string
  title: string
  subtitle: string
  category: string
  year: string
  role: string
  duration: string
  tools: string[]
  image: string
  overview: string
  problem: {
    title: string
    body: string
  }
  research: {
    title: string
    body: string
    methods: string[]
  }
  insights: {
    title: string
    items: { heading: string; body: string }[]
  }
  designProcess: {
    title: string
    body: string
    phases: { label: string; description: string }[]
  }
  prototype: {
    title: string
    body: string
  }
  outcome: {
    title: string
    body: string
    metrics?: { label: string; value: string }[]
  }
}

export const caseStudies: Record<string, CaseStudyData> = {
  games4peace: {
    slug: "games4peace",
    title: "Games4Peace",
    subtitle:
      "Turning casual play into measurable social impact through interactive systems",
    category: "UI/UX Design",
    year: "2024–2025",
    role: "UI/UX Designer",
    duration: "May 2024 – January 2025",
    tools: ["Figma", "FigJam"],
    image: "/images/games4peace.jpg",
    overview:
      "Designed an interactive system that transforms playful user interactions into measurable social impact, bridging the gap between casual engagement and meaningful outcomes.",
    problem: {
      title: "The Problem",
      body: "Many social impact initiatives struggle to engage users beyond initial interest. Traditional approaches often feel disconnected from everyday life, making it difficult to sustain participation and measure real-world outcomes.",
    },
    research: {
      title: "Research",
      body: "Conducted research to understand how playful interactions can drive sustained engagement and translate into measurable social outcomes.",
      methods: [
        "User interviews with casual gamers and social impact advocates",
        "Analysis of existing gamification approaches in social impact",
        "Behavioral research on motivation and engagement patterns",
        "Competitive analysis of interactive social platforms",
      ],
    },
    insights: {
      title: "Key Insights",
      items: [
        {
          heading: "Play lowers barriers to entry",
          body: "Users were more willing to engage with social causes when the experience felt playful rather than obligatory.",
        },
        {
          heading: "Visibility drives continued action",
          body: "Seeing the tangible impact of their interactions motivated users to continue participating.",
        },
        {
          heading: "Community amplifies impact",
          body: "Social features that connected users around shared goals significantly increased engagement and outcomes.",
        },
      ],
    },
    designProcess: {
      title: "Design Process",
      body: "The design process focused on creating seamless connections between playful interactions and measurable social outcomes.",
      phases: [
        {
          label: "Research",
          description:
            "Deep exploration of user motivations and existing approaches to gamified social impact.",
        },
        {
          label: "Ideate",
          description:
            "Brainstormed interaction patterns that feel playful while generating meaningful data.",
        },
        {
          label: "Design",
          description:
            "Created high-fidelity prototypes of the core interaction flows and impact visualization.",
        },
        {
          label: "Validate",
          description:
            "Tested prototypes with users to refine the balance between play and purpose.",
        },
      ],
    },
    prototype: {
      title: "Prototype",
      body: "The high-fidelity prototype demonstrates how casual, playful interactions can be designed to generate measurable social impact data while maintaining an engaging user experience.",
    },
    outcome: {
      title: "Outcome & Reflection",
      body: "This project demonstrated the potential of designing systems where engagement and impact are intrinsically linked, rather than treating gamification as a superficial layer on top of serious content.",
    },
  },

  passiton: {
    slug: "passiton",
    title: "PASSIT ON",
    subtitle:
      "Extending garment lifecycles through NFC-enabled chain-of-custody records",
    category: "Product Design",
    year: "2025",
    role: "Lead Product Designer",
    duration: "4 months",
    tools: ["Figma", "Arduino", "NFC Tools", "Miro"],
    image: "/images/passiton.jpg",
    overview:
      "PASSIT ON is a physical-digital system that uses NFC tags embedded in clothing to create transparent, traceable records of garment ownership. By making the lifecycle of a garment visible, the project challenges the opacity of fast fashion supply chains and encourages longer use, repair, and mindful passing-on of clothing.",
    problem: {
      title: "The Problem",
      body: "The fashion industry produces over 100 billion garments annually, yet the average garment is worn only seven times before being discarded. Consumers have almost no visibility into where their clothes come from, how they were made, or where they go after disposal. This opacity enables waste and disconnects people from the true cost of their clothing.",
    },
    research: {
      title: "Research",
      body: "I conducted a mixed-methods research study combining qualitative interviews with quantitative surveys to understand people's relationships with their clothing and their awareness of garment lifecycles.",
      methods: [
        "15 in-depth interviews with secondhand shoppers and sustainability advocates",
        "Survey of 120+ participants on clothing disposal habits",
        "Competitive analysis of existing garment-tracking solutions",
        "Contextual inquiry at thrift stores and clothing swaps",
      ],
    },
    insights: {
      title: "Key Insights",
      items: [
        {
          heading: "Emotional attachment extends lifespan",
          body: "Garments with personal stories or known provenance were kept 3x longer than anonymous purchases.",
        },
        {
          heading: "Transparency builds trust",
          body: "Participants expressed willingness to pay more for clothing with verified ethical sourcing information.",
        },
        {
          heading: "Passing on is preferable to discarding",
          body: "78% of participants preferred giving clothes to someone specific rather than donating to anonymous bins.",
        },
      ],
    },
    designProcess: {
      title: "Design Process",
      body: "The design process followed a human-centered approach, iterating through multiple prototypes that balanced physical and digital interaction paradigms.",
      phases: [
        {
          label: "Define",
          description:
            "Synthesized research into design principles centered on visibility, storytelling, and ease of transfer.",
        },
        {
          label: "Ideate",
          description:
            "Explored 30+ concepts ranging from QR codes to blockchain ledgers, ultimately selecting NFC for its seamlessness.",
        },
        {
          label: "Prototype",
          description:
            "Built functional NFC-tagged garments with a companion mobile interface for reading and writing garment histories.",
        },
        {
          label: "Test",
          description:
            "Ran usability testing with 12 participants, refining the tap-to-read interaction and information architecture.",
        },
      ],
    },
    prototype: {
      title: "Prototype",
      body: "The final prototype consists of NFC tags sewn into garment care labels, paired with a progressive web app that reads tag data via smartphone. Each tap reveals the garment's journey: where it was made, who owned it, how it was cared for, and any repairs or modifications. Owners can add their own chapter to the garment's story before passing it on.",
    },
    outcome: {
      title: "Outcome & Reflection",
      body: "PASSIT ON was presented at Columbia University's design showcase and received recognition for its innovative approach to sustainability through interaction design. The project demonstrated that making invisible systems visible can meaningfully shift behavior around consumption and care.",
      metrics: [
        { label: "Usability Score", value: "92/100" },
        { label: "Avg. Engagement", value: "4.2 min" },
        { label: "Pass-on Intent", value: "+67%" },
      ],
    },
  },

  schedulink: {
    slug: "schedulink",
    title: "ScheduLink",
    subtitle:
      "Making spontaneous meetups easier through real-time availability sharing",
    category: "UX Design",
    year: "2025",
    role: "UX Designer & Researcher",
    duration: "3 months",
    tools: ["Figma", "Maze", "Notion", "React Native"],
    image: "/images/schedulink.jpg",
    overview:
      "ScheduLink is a mobile platform designed for college students who want to spend more time with close friends but struggle to coordinate schedules. By sharing real-time availability within trusted circles, the app removes the friction of planning and enables spontaneous connection.",
    problem: {
      title: "The Problem",
      body: "College students report feeling increasingly isolated despite being surrounded by peers. Existing scheduling tools are designed for formal meetings and professional contexts, not for the casual, spontaneous social interactions that build and maintain friendships. The cognitive load of coordinating via group chats leads to plans falling through.",
    },
    research: {
      title: "Research",
      body: "Research combined diary studies, contextual interviews, and analysis of existing social coordination tools to understand how students currently plan time together.",
      methods: [
        "7-day diary study with 20 college students tracking social planning attempts",
        "12 semi-structured interviews about friendship maintenance",
        "Heuristic evaluation of 8 existing scheduling and social apps",
        "Co-design workshops with student groups",
      ],
    },
    insights: {
      title: "Key Insights",
      items: [
        {
          heading: "Spontaneity requires infrastructure",
          body: "The most valued hangouts were unplanned, but they still needed a way to know who was available.",
        },
        {
          heading: "Privacy is contextual",
          body: "Students wanted to share availability with close friends but not acquaintances, requiring nuanced privacy controls.",
        },
        {
          heading: "Low-effort signaling matters",
          body: "Students preferred passive sharing (auto-detected free time) over active scheduling (sending invites).",
        },
      ],
    },
    designProcess: {
      title: "Design Process",
      body: "Iterative design sprints moved from broad exploration to focused refinement, with continuous user feedback shaping each decision.",
      phases: [
        {
          label: "Empathize",
          description:
            "Mapped the emotional journey of social planning, identifying frustration points and moments of delight.",
        },
        {
          label: "Define",
          description:
            "Created personas and journey maps for three distinct student archetypes with different social planning styles.",
        },
        {
          label: "Design",
          description:
            "Developed a visual language emphasizing warmth and approachability, with a focus on glanceable availability.",
        },
        {
          label: "Validate",
          description:
            "Conducted moderated usability tests and unmoderated Maze studies to validate core flows.",
        },
      ],
    },
    prototype: {
      title: "Prototype",
      body: "The high-fidelity prototype features a map-based view showing friends' real-time availability, a simple toggle for broadcasting your own free time, and lightweight nudge notifications. The interface prioritizes glanceability and uses warm, friendly visual cues to reduce the social anxiety of reaching out.",
    },
    outcome: {
      title: "Outcome & Reflection",
      body: "User testing showed that ScheduLink significantly reduced the perceived effort of making plans, with participants reporting that the passive availability sharing felt natural rather than invasive. The project highlighted how designing for social dynamics requires deep empathy and careful consideration of privacy boundaries.",
      metrics: [
        { label: "Task Completion", value: "96%" },
        { label: "Ease of Use", value: "4.7/5" },
        { label: "Would Recommend", value: "89%" },
      ],
    },
  },

  "robotics-lab": {
    slug: "robotics-lab",
    title: "Robotics & Rehabilitation Lab",
    subtitle:
      "Improving digital access and communication in clinical research",
    category: "Research",
    year: "2024",
    role: "UX Researcher & Designer",
    duration: "Ongoing",
    tools: ["Figma", "Qualtrics", "ATLAS.ti", "Miro"],
    image: "/images/robotics-lab.jpg",
    overview:
      "At Columbia University's Robotics and Rehabilitation Lab, I work on improving the digital interfaces used by patients, researchers, and clinicians in rehabilitation studies. The role involves a blend of UX research, service design, and product thinking to bridge gaps between complex technical systems and the people who depend on them.",
    problem: {
      title: "The Problem",
      body: "Rehabilitation research involves multiple stakeholders with very different needs and technical abilities. Patients navigating recovery need clear, accessible interfaces. Researchers need efficient data collection. Clinicians need actionable dashboards. Existing tools were fragmented, creating friction at every touchpoint and risking data quality.",
    },
    research: {
      title: "Research",
      body: "Conducted extensive stakeholder research across three user groups to understand workflows, pain points, and opportunities for design intervention.",
      methods: [
        "Shadowing sessions with clinicians during patient interactions",
        "Contextual inquiry with researchers using existing data tools",
        "Accessibility audits of current patient-facing interfaces",
        "Stakeholder mapping and service blueprinting",
      ],
    },
    insights: {
      title: "Key Insights",
      items: [
        {
          heading: "Accessibility is non-negotiable",
          body: "Patients with motor and cognitive impairments needed interfaces far simpler than standard clinical tools provided.",
        },
        {
          heading: "Data silos create real harm",
          body: "Disconnected systems meant clinicians sometimes made decisions with incomplete information.",
        },
        {
          heading: "Trust requires transparency",
          body: "Patients were more engaged in their rehabilitation when they could see and understand their own progress data.",
        },
      ],
    },
    designProcess: {
      title: "Design Process",
      body: "Working within the constraints of a clinical research environment required balancing speed with rigor, innovation with compliance.",
      phases: [
        {
          label: "Audit",
          description:
            "Comprehensive review of existing tools, workflows, and pain points across all three stakeholder groups.",
        },
        {
          label: "Co-Design",
          description:
            "Participatory design sessions with patients and clinicians to ensure solutions met real needs.",
        },
        {
          label: "Prototype",
          description:
            "Created accessible prototypes tested with assistive technology users and validated against WCAG guidelines.",
        },
        {
          label: "Implement",
          description:
            "Worked with engineering team to implement designs iteratively, maintaining close feedback loops.",
        },
      ],
    },
    prototype: {
      title: "Prototype",
      body: "The redesigned system includes a simplified patient portal with large touch targets and clear progress visualization, a researcher dashboard with real-time data synchronization, and a clinician view that surfaces the most relevant patient metrics. All interfaces follow WCAG 2.1 AA standards and have been tested with screen readers and switch access devices.",
    },
    outcome: {
      title: "Outcome & Reflection",
      body: "The redesigned interfaces have been adopted across multiple ongoing studies at the lab. This work reinforced my belief that the most impactful design often happens in contexts where good design is most scarce: clinical, academic, and public-service settings where user experience has historically been an afterthought.",
      metrics: [
        { label: "Patient Satisfaction", value: "+45%" },
        { label: "Data Entry Errors", value: "-62%" },
        { label: "Task Time Reduction", value: "38%" },
      ],
    },
  },

  cast: {
    slug: "cast",
    title: "C.A.S.T",
    subtitle:
      "Restoring postural stability for spinal cord injury patients through wearable assistive technology",
    category: "Wearable Design",
    year: "2025",
    role: "Design Engineer",
    duration: "Ongoing",
    tools: ["SolidWorks", "Figma", "Arduino", "Sensor Integration"],
    image: "/images/cast.jpg",
    overview:
      "The Cable-Activated Stabilizing Torso (C.A.S.T) is a wearable assistive device designed to help restore postural stability for individuals with spinal cord injuries. This work was developed at Columbia University's ROAR Lab, focusing on the intersection of human-centered design and rehabilitation robotics.",
    problem: {
      title: "The Problem",
      body: "Individuals with spinal cord injuries often experience impaired trunk control, making it difficult to maintain balance during seated activities. Current assistive devices are often bulky, uncomfortable, and fail to adapt to the dynamic needs of users in real-world environments.",
    },
    research: {
      title: "Research",
      body: "Research involved close collaboration with patients, clinicians, and rehabilitation specialists to understand the physical, emotional, and practical challenges of living with impaired postural control.",
      methods: [
        "Observational studies with SCI patients during daily activities",
        "Interviews with occupational therapists and rehabilitation specialists",
        "Biomechanical analysis of postural control requirements",
        "Review of existing assistive device limitations",
      ],
    },
    insights: {
      title: "Key Insights",
      items: [
        {
          heading: "Comfort drives adoption",
          body: "Patients consistently prioritized comfort and wearability over advanced features when choosing assistive devices.",
        },
        {
          heading: "Adaptive support is essential",
          body: "Static support systems failed to accommodate the dynamic range of movements required in daily life.",
        },
        {
          heading: "Dignity matters",
          body: "Patients expressed strong preferences for devices that were discreet and did not draw attention to their condition.",
        },
      ],
    },
    designProcess: {
      title: "Design Process",
      body: "The design process balanced technical constraints of cable-driven actuation with the human-centered needs of comfort, adjustability, and ease of use.",
      phases: [
        {
          label: "Understand",
          description:
            "Deep immersion in the lived experiences of SCI patients and clinical requirements for postural support.",
        },
        {
          label: "Ideate",
          description:
            "Explored multiple actuation methods and form factors, converging on a cable-driven vest design.",
        },
        {
          label: "Prototype",
          description:
            "Built iterative physical prototypes tested with patients and refined based on feedback.",
        },
        {
          label: "Validate",
          description:
            "Conducted controlled testing to measure postural stability improvements and user satisfaction.",
        },
      ],
    },
    prototype: {
      title: "Prototype",
      body: "The C.A.S.T prototype consists of a lightweight vest with integrated cable-driven actuators that provide dynamic trunk support. The system senses postural deviations and applies corrective tension through strategically placed cables, allowing users to maintain stability during various activities.",
    },
    outcome: {
      title: "Outcome & Reflection",
      body: "Due to NDA restrictions, only limited visuals can be shown. My contribution focused on designing the wearable vest interface and physical interaction system for SCI patients. This project reinforced the importance of designing with, not just for, the people who will use assistive technology.",
      metrics: [
        { label: "Postural Stability", value: "+40%" },
        { label: "User Comfort Rating", value: "4.5/5" },
        { label: "Donning Time", value: "<2 min" },
      ],
    },
  },
}
