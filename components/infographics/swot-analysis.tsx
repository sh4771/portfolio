"use client"

import { TrendingUp, AlertTriangle, Lightbulb, Shield } from "lucide-react"

const swotData = {
  strengths: {
    icon: TrendingUp,
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-600",
    items: [
      { title: "Unique fundraising model", desc: "making philanthropy accessible and fun" },
      { title: "Low barrier to participation", desc: "Users can contribute just by playing games, watching ads, or sharing" },
      { title: "Strong emotional mission", desc: "Directly tied to global relief efforts (UNRWA, Save the Children, etc.)" },
      { title: "Scalability through virality", desc: "Social media integration naturally encourages viral growth" },
      { title: "Transparency potential", desc: "Clear, traceable donation flow builds trust with users and sponsors" },
    ],
  },
  weaknesses: {
    icon: AlertTriangle,
    color: "from-amber-500/20 to-amber-600/10",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-600",
    items: [
      { title: "Limited game variety", desc: "Casual mini-games may feel basic or repetitive" },
      { title: "Dependency on ad revenue", desc: "Reliance on fluctuating ad markets and sponsorships can make income unstable" },
      { title: "Low immediate user gratification", desc: "The social impact is indirect" },
      { title: "Early-stage awareness gap", desc: "As a new nonprofit brand, it needs consistent storytelling and PR to gain legitimacy" },
    ],
  },
  opportunities: {
    icon: Lightbulb,
    color: "from-sky-500/20 to-sky-600/10",
    borderColor: "border-sky-500/30",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-600",
    items: [
      { title: "Expanding partnerships", desc: "Collaborate with game studios, YouTubers, Twitch streamers, or educational institutions" },
      { title: "Gamified impact tracking", desc: "Add user avatars or 'impact badges' to visualize collective change" },
      { title: "Mobile app or browser extension", desc: "Allow casual giving on-the-go or through background play" },
      { title: "Corporate social responsibility", desc: "Partner with brands seeking ethical ad placements or philanthropic visibility" },
      { title: "AI/analytics integration", desc: "Personalize challenges or donation causes based on user behavior" },
    ],
  },
  threats: {
    icon: Shield,
    color: "from-rose-500/20 to-rose-600/10",
    borderColor: "border-rose-500/30",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-600",
    items: [
      { title: "User fatigue", desc: "Without fresh games or regular impact updates, engagement could decline" },
      { title: "Trust and transparency scrutiny", desc: "Any delays in fund distribution or unclear metrics can harm reputation" },
      { title: "Ad-blockers and privacy concerns", desc: "Reduced ad impressions can directly affect donation income" },
      { title: "Platform saturation", desc: "The casual gaming space is crowded, standing out requires distinct storytelling" },
    ],
  },
}

export default function SwotAnalysis() {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <p className="text-xs text-foreground/40">Strategic Analysis</p>
        <h2 className="text-lg md:text-xl font-medium tracking-tight">
          SWOT Analysis
        </h2>
        <p className="text-sm text-foreground/60 max-w-2xl">
          Identifying strengths, weaknesses, opportunities, and threats to inform design decisions
        </p>
      </div>

      {/* SWOT Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div 
          className={`rounded-2xl p-6 border ${swotData.strengths.borderColor} bg-gradient-to-br ${swotData.strengths.color}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl ${swotData.strengths.iconBg} flex items-center justify-center`}>
              <TrendingUp className={`w-5 h-5 ${swotData.strengths.iconColor}`} />
            </div>
            <h3 className="text-base font-medium">Strengths</h3>
          </div>
          <ul className="space-y-3">
            {swotData.strengths.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-1.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground/80">{item.title}:</span>{" "}
                  <span className="text-sm text-foreground/60">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div 
          className={`rounded-2xl p-6 border ${swotData.weaknesses.borderColor} bg-gradient-to-br ${swotData.weaknesses.color}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl ${swotData.weaknesses.iconBg} flex items-center justify-center`}>
              <AlertTriangle className={`w-5 h-5 ${swotData.weaknesses.iconColor}`} />
            </div>
            <h3 className="text-base font-medium">Weaknesses</h3>
          </div>
          <ul className="space-y-3">
            {swotData.weaknesses.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-1.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground/80">{item.title}:</span>{" "}
                  <span className="text-sm text-foreground/60">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div 
          className={`rounded-2xl p-6 border ${swotData.opportunities.borderColor} bg-gradient-to-br ${swotData.opportunities.color}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl ${swotData.opportunities.iconBg} flex items-center justify-center`}>
              <Lightbulb className={`w-5 h-5 ${swotData.opportunities.iconColor}`} />
            </div>
            <h3 className="text-base font-medium">Opportunities</h3>
          </div>
          <ul className="space-y-3">
            {swotData.opportunities.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500/60 mt-1.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground/80">{item.title}:</span>{" "}
                  <span className="text-sm text-foreground/60">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div 
          className={`rounded-2xl p-6 border ${swotData.threats.borderColor} bg-gradient-to-br ${swotData.threats.color}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl ${swotData.threats.iconBg} flex items-center justify-center`}>
              <Shield className={`w-5 h-5 ${swotData.threats.iconColor}`} />
            </div>
            <h3 className="text-base font-medium">Threats</h3>
          </div>
          <ul className="space-y-3">
            {swotData.threats.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/60 mt-1.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground/80">{item.title}:</span>{" "}
                  <span className="text-sm text-foreground/60">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
