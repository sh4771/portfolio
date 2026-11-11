import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Hand, Lock, Move, Shield } from "lucide-react"
import { CaseHero } from "@/components/case-hero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContinueLink } from "@/components/continue-link"


export default function Page() {
  return (
    <>
    <Navigation />
      <main className="pt-32 pb-24">
      <div className="site-col  space-y-24">

        {/* Back Button */}
        <Link 
          href="/#work" 
          className="!mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <CaseHero
          slug="cast"
          title="C.A.S.T"
          roles={["Interaction design", "Wearable design"]}
          tagline="A cable-activated stabilizing torso that restores postural stability for spinal cord injury patients."
          when="May 2025 – March 2026"
          forWhom="Columbia Robotics and Rehabilitation (ROAR) Lab"
          summary="A wearable assistive device that uses cable-driven trunk support to help people with spinal cord injuries stay upright."
          note="Due to NDA restrictions, only limited visuals can be shown."
        />

        {/* My Role */}
        <section id="role" className="space-y-8 scroll-mt-32">
          <div className="space-y-2">
            <p className="cs-eyebrow">01 · My role</p>
            <h2 className="cs-h2">What I contributed</h2>
          </div>
          
          <div 
            className="rounded-3xl p-6 md:p-8"
            style={{
              background: "var(--card)",
              boxShadow: "inset 0 0 0 1px var(--border)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div 
                className="rounded-xl p-5 space-y-2"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <span className="text-xs text-foreground/40 font-mono">01</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Redesigned posture-support vest for better force transfer
                </p>
              </div>
              <div 
                className="rounded-xl p-5 space-y-2"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <span className="text-xs text-foreground/40 font-mono">02</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Improved vest stability and fit through material and strap design
                </p>
              </div>
              <div 
                className="rounded-xl p-5 space-y-2"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <span className="text-xs text-foreground/40 font-mono">03</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Designed interaction logic for a single-button control system
                </p>
              </div>
              <div 
                className="rounded-xl p-5 space-y-2"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <span className="text-xs text-foreground/40 font-mono">04</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Defined three user modes for safety and posture support
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-foreground/60 leading-relaxed">
            My contributions focused on the physical interface design and interaction system for SCI patients.
          </p>
        </section>

        {/* Vest Design Improvements */}
        <section id="problem" className="space-y-8 scroll-mt-32">
          <div className="space-y-2">
            <p className="cs-eyebrow">02 · Vest design</p>
            <h2 className="cs-h2">Problem → Solution</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem */}
            <div 
              className="rounded-3xl p-6 space-y-4"
              style={{
                background: "var(--card)",
                boxShadow: "inset 0 0 0 1px var(--border)",
              }}
            >
              <span className="cs-eyebrow">Problem</span>
              <div 
                className="rounded-xl overflow-hidden bg-background/50 h-[280px] flex items-center justify-center"
                style={{ boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <Image
                  src="/images/cast-problem.png"
                  alt="Risk of falling and balance issues for wheelchair users"
                  width={600}
                  height={450}
                  className="h-full w-auto object-contain"
                />
              </div>
              <p className="text-sm text-foreground/60">
                Preventing risk of fall maintaining balance
              </p>
            </div>

            {/* Solution */}
            <div 
              className="rounded-3xl p-6 space-y-4"
              style={{
                background: "var(--card)",
                boxShadow: "inset 0 0 0 1px var(--border)",
              }}
            >
              <span className="cs-eyebrow">Solution</span>
              <div 
                className="rounded-xl overflow-hidden bg-background/50 h-[280px] flex items-center justify-center"
                style={{ boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <Image
                  src="/images/cast-solution.png"
                  alt="Increased functional reach and bimanual task capability"
                  width={600}
                  height={450}
                  className="h-full w-auto object-contain"
                />
              </div>
              <p className="text-sm text-foreground/60">
                Increase Functional Reach/Bimanual Task
              </p>
            </div>
          </div>
          
          <p className="text-xs text-foreground/60 leading-relaxed">
            The redesigned vest uses non-stretch nylon and adjustable straps to improve force transfer and fit.
          </p>
        </section>

        {/* Interaction Design */}
        <section id="modes" className="space-y-8 scroll-mt-32">
          <div className="space-y-2">
            <p className="cs-eyebrow">03 · Interaction design</p>
            <h2 className="cs-h2">Three Control Modes</h2>
          </div>
          
          <div 
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "var(--card)",
              boxShadow: "inset 0 0 0 1px var(--border)",
            }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Neutral Lock */}
              <div className="text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-background flex items-center justify-center"
                  style={{ boxShadow: "inset 0 0 0 1px var(--border)" }}
                >
                  <Lock className="w-6 h-6 text-foreground/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Neutral Lock</h3>
                  <p className="text-xs text-foreground/40">Single press</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Gently re-centers posture
                </p>
              </div>

              {/* Free Mode */}
              <div className="text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-background flex items-center justify-center"
                  style={{ boxShadow: "inset 0 0 0 1px var(--border)" }}
                >
                  <Move className="w-6 h-6 text-foreground/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Free Mode</h3>
                  <p className="text-xs text-foreground/40">Hold button</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Allows controlled movement with constant support
                </p>
              </div>

              {/* Stabilize Mode */}
              <div className="text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-background flex items-center justify-center"
                  style={{ boxShadow: "inset 0 0 0 1px var(--border)" }}
                >
                  <Hand className="w-6 h-6 text-foreground/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Stabilize Mode</h3>
                  <p className="text-xs text-foreground/40">Double press</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Locks current posture for focused tasks
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-foreground/60 leading-relaxed">
            A single-button control system designed to minimize cognitive load while providing full control over posture support.
          </p>
        </section>

        {/* Design Focus */}
        <section id="priorities" className="space-y-8 scroll-mt-32">
          <div className="space-y-2">
            <p className="cs-eyebrow">04 · Design principles</p>
            <h2 className="cs-h2">Key Design Priorities</h2>
          </div>
          
          <div 
            className="rounded-3xl p-6 md:p-8"
            style={{
              background: "var(--card)",
              boxShadow: "inset 0 0 0 1px var(--border)",
            }}
          >
            <div className="flex flex-wrap gap-3">
              <div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <Shield className="w-4 h-4 text-foreground/50" />
                <span className="text-sm text-foreground/70">Safety for SCI users</span>
              </div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <Lock className="w-4 h-4 text-foreground/50" />
                <span className="text-sm text-foreground/70">Prevent accidental activation</span>
              </div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px var(--border)" }}
              >
                <Move className="w-4 h-4 text-foreground/50" />
                <span className="text-sm text-foreground/70">Balance stability and flexibility</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-foreground/60 leading-relaxed">
            Every design decision prioritized user safety and ease of use for spinal cord injury patients.
          </p>
        </section>

        {/* Team Credit */}
        <section className="border-t border-border/30 pt-8">
          <p className="text-xs text-foreground/60 leading-relaxed max-w-xl">
            Developed at Columbia University ROAR Lab under supervision of postdoctoral researcher 
            Chawin Ophasongwe. Team: Eileen Lin, Tobias Carmel, Byung Wook Kim, Eddie Choi.
          </p>
        </section>

        <ContinueLink />

      </div>
    </main>
      <Footer />
    </>
  )
}
