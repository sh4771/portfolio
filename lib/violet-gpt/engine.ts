import {
  ANSWERS,
  PROJECTS,
  PROMPTS,
  SKILL_LABELS,
  SKILL_PROMPTS,
  type Intent,
  type Project,
  type Skill,
} from "./knowledge"

export const MAX_INPUT = 300

export interface Reply {
  intent: Intent
  body: string[]
  projects: Project[]
  next: string[]
  showContact?: boolean
}

const PRIVATE = /\b(salary|pay|compensation|visa|sponsor|immigration|citizen|age|old|married|boyfriend|girlfriend|address|phone|health|religion|politic|password|secret|confidential|customer names?)\b/
const RULES: [Intent, RegExp][] = [
  ["intro", /\b(who (is|'s) (she|her|violet)|who are you talking about|tell me about (her|violet)|about (her|violet)|introduce|summary of (her|violet)|her bio)\b/],
  ["best-work", /\b(best (work|project|projects)|strongest|top (work|projects)|favorite project|her work)\b/],
  ["fun-fact", /\b(not on (her )?(resume|cv)|fun fact|personality|hobb(y|ies)|outside (of )?work|for fun|fun side|personal side)\b/],
  ["team-fit", /\b(team|bring|strength|good at|hire|hiring|value add|contribute|why (should|her)|fit|stand out|unique)\b/],
  ["contact", /\b(contact|reach|email|linkedin|resume|cv|get in touch)\b/],
  ["vendelux", /\b(vendelux|current (job|role)|where does she work|day job)\b/],
  ["ai-workflow", /\b(ai|a\.i|claude|cursor|figma mcp|automation|llm|gpt|vibe ?cod)/],
  ["collaboration", /\b(engineer|developer|dev|collaborat|work with|team ?mates?|handoff|pm|product manager|stakeholder)/],
  ["process", /\b(process|approach|method|how does she (design|work|think|solve)|solve|problem.solving|complex problems?|workflow|framework)\b/],
  ["background", /\b(background|education|school|study|studied|columbia|nyu|tisch|experience|career|previous|before)\b/],
  ["philosophy", /\b(care|value|believe|philosophy|motivat|why design|passion)/],
  
  ["project-match", /\b(project|portfolio|case stud|work sample|show me|example)/],
]
const SKILL_RULES: [Skill, RegExp][] = [
  ["accessibility", /\b(accessib|a11y|inclusive|assistive|disabilit)/],
  ["research", /\b(research|interview|survey|usability|user test)/],
  ["data", /\b(data|b2b|dashboard|saas|complex|enterprise|filter)/],
  ["ownership", /\b(ownership|own|ship|launch|end.to.end|0.to.1|zero to one|lead)/],
  ["systems", /\b(system|design system|spatial|computational|map)/],
  ["interaction", /\b(interaction|prototype|motion|mobile|app)/],
]

export function normalize(text: string) {
  return text.slice(0, MAX_INPUT).trim().toLowerCase().replace(/[^\p{L}\p{N}\s.'-]/gu, " ")
}

/** Deterministic routing: privacy first, then explicit rules, then a skill keyword. */
export function resolveIntent(text: string): { intent: Intent; skill?: Skill } {
  const t = normalize(text)
  if (!t) return { intent: "unknown" }
  if (PRIVATE.test(t)) return { intent: "private" }
  for (const [intent, re] of RULES) {
    if (re.test(t)) {
      if (intent === "project-match") {
        const skill = SKILL_RULES.find(([, r]) => r.test(t))?.[0]
        if (skill) return { intent: "skill", skill }
      }
      return { intent }
    }
  }
  const skill = SKILL_RULES.find(([, r]) => r.test(t))?.[0]
  if (skill) return { intent: "skill", skill }
  return { intent: "unknown" }
}

/** +3 for the primary skill, ties broken by editorial priority; at most two results. */
export function matchProjects(skill: Skill, limit = 2): Project[] {
  return PROJECTS.map((p) => ({ p, score: p.skills.includes(skill) ? 3 + (p.skills[0] === skill ? 1 : 0) : 0 }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.priority - b.p.priority)
    .slice(0, limit)
    .map((x) => x.p)
}

const byId = (ids: string[]) => ids.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean) as Project[]

export function reply(intent: Intent, skill?: Skill): Reply {
  if (intent === "project-match") {
    return {
      intent,
      body: ["What matters most to your team? Pick a strength and I'll show you where Violet proves it."],
      projects: [],
      next: SKILL_PROMPTS,
    }
  }
  if (intent === "skill" && skill) {
    const projects = matchProjects(skill)
    return {
      intent,
      body: [`For ${SKILL_LABELS[skill].toLowerCase()}, I'd start here:`],
      projects,
      next: ["process", "team", "match"],
    }
  }
  const a = ANSWERS[intent as keyof typeof ANSWERS] ?? ANSWERS.unknown
  return {
    intent,
    body: a.body,
    projects: byId(a.projectIds).map((p) =>
      a.projectNotes?.[p.id] ? { ...p, summary: a.projectNotes[p.id], evidence: "" } : p,
    ),
    next: a.next,
    showContact: intent === "contact" || intent === "private",
  }
}

export function replyForPrompt(promptId: string): Reply {
  const p = PROMPTS[promptId]
  if (!p) return reply("unknown")
  return reply(p.intent, p.skill)
}
