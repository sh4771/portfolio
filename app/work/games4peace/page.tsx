import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import SwotAnalysis from "@/components/infographics/swot-analysis"

export default function Page() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-[900px] mx-auto space-y-24">

        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Hero Section */}
        <header className="space-y-12">
          {/* Project Title & Meta */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-normal tracking-tight">
                Turning Casual Play into Measurable Social Impact
              </h1>
              <p className="text-sm text-foreground/50">
                UI/UX Design @ Games4Peace
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm pt-4">
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Role</span>
                <span className="text-foreground/70">UI/UX Designer</span>
              </div>
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Timeline</span>
                <span className="text-foreground/70">May 2024 – January 2025</span>
              </div>
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Platform</span>
                <span className="text-foreground/70">Web (Concept → High-Fidelity Prototype)</span>
              </div>
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Tools</span>
                <span className="text-foreground/70">Figma, FigJam</span>
              </div>
            </div>

            {/* Hero Mockup Video */}
            <div 
              className="relative w-full mt-8 rounded-[24px] md:rounded-[32px] overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto"
              >
                <source src="/videos/games4peace-hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Overview */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-4"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Overview
            </h2>
            <p className="text-sm text-foreground/60 text-pretty max-w-3xl leading-relaxed">
              Games4Peace is a casual gaming platform designed to make philanthropy more accessible 
              by transforming everyday play into real-world impact.
            </p>
            <p className="text-sm text-foreground/60 text-pretty max-w-3xl leading-relaxed">
              As the UI/UX Designer, I worked across research, interaction design, and visual design 
              to shape the core experience—from onboarding and game discovery to impact tracking and profile systems.
            </p>
          </div>

          {/* The Problem */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">01 — THE PROBLEM</p>
              <h2 className="text-lg md:text-xl font-medium tracking-tight">
                Why existing platforms fall short
              </h2>
            </div>
            
            <p className="text-sm text-foreground/60 text-pretty max-w-3xl leading-relaxed">
              While many donation platforms aim to support global relief efforts, they often struggle with:
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div 
                className="rounded-xl p-5 space-y-3"
                style={{
                  background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 text-sm font-mono">
                  01
                </div>
                <h3 className="text-sm font-medium">High friction</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  Complex sign-up and donation flows discourage participation
                </p>
              </div>
              <div 
                className="rounded-xl p-5 space-y-3"
                style={{
                  background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 text-sm font-mono">
                  02
                </div>
                <h3 className="text-sm font-medium">Abstract feedback</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  Delayed or unclear impact reporting weakens emotional connection
                </p>
              </div>
              <div 
                className="rounded-xl p-5 space-y-3"
                style={{
                  background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 text-sm font-mono">
                  03
                </div>
                <h3 className="text-sm font-medium">Limited engagement</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  Users rarely return after one-time actions
                </p>
              </div>
            </div>

            <div 
              className="rounded-[20px] p-6 mt-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-sm text-foreground/70 text-pretty leading-relaxed">
                At the same time, casual games are highly engaging but typically disconnected from 
                meaningful outcomes. <strong className="text-foreground/90 font-medium">Games4Peace explores how play, motivation, and social good 
                can coexist within a single product experience.</strong>
              </p>
            </div>
          </div>
        </header>

        {/* Competitive Analysis */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">02 — COMPETITIVE ANALYSIS</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Analyzing the landscape
            </h2>
          </div>

          <div 
            className="rounded-[24px] md:rounded-[32px] p-4 md:p-6 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
              <Image
                src="/images/games4peace-competitor-analysis.png"
                alt="Competitive analysis of casual gaming apps, donation platforms, and gamified social impact products"
                width={1600}
                height={900}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Key Insights */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-8 md:p-10"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <h3 className="text-sm font-medium mb-6">Key Insights Extracted</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                className="p-4 rounded-xl space-y-2"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                  01
                </div>
                <h4 className="text-sm font-medium text-foreground/90">Low-friction onboarding</h4>
                <p className="text-xs text-foreground/50">significantly increases participation</p>
              </div>
              <div 
                className="p-4 rounded-xl space-y-2"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                  02
                </div>
                <h4 className="text-sm font-medium text-foreground/90">Clear game descriptions</h4>
                <p className="text-xs text-foreground/50">build trust and reduce drop-off</p>
              </div>
              <div 
                className="p-4 rounded-xl space-y-2"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                  03
                </div>
                <h4 className="text-sm font-medium text-foreground/90">Visible impact tracking</h4>
                <p className="text-xs text-foreground/50">strengthens emotional connection</p>
              </div>
              <div 
                className="p-4 rounded-xl space-y-2"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                  04
                </div>
                <h4 className="text-sm font-medium text-foreground/90">Cumulative rewards</h4>
                <p className="text-xs text-foreground/50">encourage long-term engagement</p>
              </div>
            </div>
          </div>
        </section>

        {/* SWOT Analysis */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">03 — SWOT ANALYSIS</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Strategic positioning
            </h2>
          </div>
          <SwotAnalysis />
          <p className="text-xs text-foreground/60 leading-relaxed">
            Analyzing internal and external factors to identify strategic opportunities for Games4Peace.
          </p>
        </section>

        {/* Information Architecture & Early Wireframes - Side by Side */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">04 — STRUCTURE</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Information Architecture & Wireframes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Information Architecture */}
            <div 
              className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-xs text-foreground/40 uppercase tracking-wide">User Flow</p>
              <div 
                className="rounded-xl overflow-hidden h-[350px] md:h-[420px]"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
              >
                <Image
                  src="/images/games4peace-userflow.png"
                  alt="Games4Peace information architecture and user flow diagram"
                  width={600}
                  height={500}
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>

            {/* Early Wireframes */}
            <div 
              className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Early Wireframes</p>
              <div 
                className="rounded-xl overflow-hidden h-[350px] md:h-[420px]"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
              >
                <Image
                  src="/images/games4peace-wireframes.png"
                  alt="Hand-drawn wireframes for Games4Peace screens"
                  width={600}
                  height={500}
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground/60 leading-relaxed">
            Mapping the core navigation structure and initial sketches exploring screen layouts.
          </p>
        </section>

        {/* Design Process */}
        <section className="space-y-12">
          {/* Section Header */}
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">05 — LOW-FIDELITY</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Wireframe Iterations
            </h2>
          </div>

          {/* Onboarding */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                01
              </div>
              <h3 className="text-base font-medium">Increasing Transparency Through Onboarding</h3>
            </div>
            <p className="text-sm text-foreground/60 mb-6">
              Low-fidelity onboarding screen built with key insights from competitive analysis
            </p>
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
              <Image
                src="/images/games4peace-onboarding-wireframe.png"
                alt="Low-fidelity onboarding wireframe showing community, how it works, and real change screens"
                width={1200}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Home Screen */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                02
              </div>
              <h3 className="text-base font-medium">Strengthening Engagement and Visualizing Measurable Impact</h3>
            </div>
            <p className="text-sm text-foreground/60 mb-6">
              Low-fidelity home screen built with key insights from competitive analysis
            </p>
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
              <Image
                src="/images/games4peace-home-wireframe.png"
                alt="Low-fidelity home screen wireframe showing personalized game selection and impact visualization"
                width={1200}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Supporting Screens */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 text-xs font-mono">
                03
              </div>
              <h3 className="text-base font-medium">Leaderboard, Daily Progress, Impact, and Profile</h3>
            </div>
            <p className="text-sm text-foreground/60 mb-6">
              Low-fidelity Leaderboard, Daily Progress, Impact, and Profile screens built with key insights from competitive analysis
            </p>
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
              <Image
                src="/images/games4peace-supporting-wireframes.png"
                alt="Low-fidelity wireframes for Leaderboard, Daily Progress, Impact, and Profile screens"
                width={1200}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* High-Fidelity Designs */}
        <section className="space-y-16 md:space-y-20">
          {/* Section Header */}
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">06 — FINAL DESIGNS</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              High-Fidelity Screens
            </h2>
          </div>

          {/* Final Screens Showcase — dark frame + white inner (matches low-fi showcase format) */}
          <div
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
            style={{
              background: "#1a1a1a",
              boxShadow: "0 4px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono text-white/90"
                style={{ background: "#2d2d2d" }}
              >
                01
              </div>
              <h3 className="text-base font-medium text-white tracking-tight">
                Complete Screen Collection
              </h3>
            </div>
            <p className="text-sm text-white/55 mb-6 leading-relaxed">
              Home, Leaderboard, Daily Goals, Impact Tracking, and Profile screens
            </p>
            <div
              className="rounded-xl overflow-hidden bg-white"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
            >
              <Image
                src="/images/games4peace-final-screens.png"
                alt="All Games4Peace high-fidelity screens including Home, Leaderboard, Daily Goals, Impact, and Profile"
                width={1600}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Interactive Demos */}
          <div className="space-y-6">
            <h3 className="text-base font-medium tracking-tight text-center">Interactive Demos</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Onboarding Demo */}
              <div 
                className="rounded-2xl p-4 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                }}
              >
                <div className="rounded-xl overflow-hidden mb-3 h-[280px] md:h-[320px] bg-white border-[3px] border-foreground/10"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
                >
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/videos/games4peace-onboarding.mov" type="video/quicktime" />
                    <source src="/videos/games4peace-onboarding.mov" type="video/mp4" />
                  </video>
                </div>
                <p className="text-xs text-foreground/50 text-center">Onboarding Flow</p>
              </div>

              {/* Home Demo */}
              <div 
                className="rounded-2xl p-4 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                }}
              >
                <div className="rounded-xl overflow-hidden mb-3 h-[280px] md:h-[320px] bg-white border-[3px] border-foreground/10"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
                >
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/videos/games4peace-home.mov" type="video/quicktime" />
                    <source src="/videos/games4peace-home.mov" type="video/mp4" />
                  </video>
                </div>
                <p className="text-xs text-foreground/50 text-center">Game Selection</p>
              </div>

              {/* Games Demo */}
              <div 
                className="rounded-2xl p-4 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                }}
              >
                <div className="rounded-xl overflow-hidden mb-3 h-[280px] md:h-[320px] bg-white border-[3px] border-foreground/10"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
                >
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/videos/games4peace-games.mov" type="video/quicktime" />
                    <source src="/videos/games4peace-games.mov" type="video/mp4" />
                  </video>
                </div>
                <p className="text-xs text-foreground/50 text-center">Available Games</p>
              </div>
            </div>

            <div
              className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
              style={{
                background: "#1a1a1a",
                boxShadow: "0 4px 40px rgba(0,0,0,0.35)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono text-white/90"
                  style={{ background: "#2d2d2d" }}
                >
                  02
                </div>
                <h3 className="text-base font-medium text-white tracking-tight">
                  Gameplay demo
                </h3>
              </div>
              <p className="text-sm text-white/55 mb-6 leading-relaxed">
                Screen recording of gameplay and core flows in the high-fidelity prototype, made with
                Figma Make.
              </p>
              <div
                className="mx-auto w-full md:max-w-[280px] rounded-xl overflow-hidden h-[280px] md:h-[320px] bg-white border-[3px] border-foreground/10"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/games4peace-gamedemo.mov" type="video/quicktime" />
                  <source src="/videos/games4peace-gamedemo.mov" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="space-y-8">
          <div 
            className="rounded-[24px] md:rounded-[32px] p-8 md:p-10 space-y-6"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="space-y-2">
              <p className="text-xs text-foreground/40">Takeaway</p>
              <h2 className="text-lg md:text-xl font-medium tracking-tight">
                Key Takeaway
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm text-foreground/70 leading-relaxed">
                This project demonstrated that meaningful social impact doesn't require sacrificing 
                user engagement. By carefully integrating impact visibility into every touchpoint of 
                the gaming experience, we created a platform where play and purpose reinforce each other.
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                The key insight was that users don't need to choose between entertainment and contribution—
                when designed thoughtfully, these can be the same action.
              </p>
            </div>
          </div>
        </section>

        {/* Back to Portfolio */}
        <div className="border-t border-border/30 pt-12 text-center">
          <p className="text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
            Continue
          </p>
          <Link
            href="/#work"
            className="mt-2 inline-block text-base tracking-tight text-foreground transition-colors hover:text-foreground/60"
          >
            View All Projects
          </Link>
        </div>

      </div>
    </main>
  )
}
