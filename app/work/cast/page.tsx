import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Hand, Lock, Move, Shield } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-20">

        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <header className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 tracking-wide">Columbia University ROAR Lab • 2025</p>
            <h1 className="text-2xl md:text-3xl font-normal tracking-tight">
              C.A.S.T — Cable-Activated Stabilizing Torso
            </h1>
          </div>
          
          {/* Project Overview - 2-3 lines max */}
          <p className="text-sm text-foreground/60 max-w-2xl leading-relaxed">
            A wearable assistive device that restores postural stability for spinal cord injury patients 
            using cable-driven trunk support.
          </p>

          {/* Hero Image */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/cast.jpg"
              alt="C.A.S.T wearable vest CAD render"
              width={1200}
              height={800}
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>

          {/* NDA Notice */}
          <p className="text-xs text-foreground/40 text-center">
            Due to NDA restrictions, only limited visuals can be shown.
          </p>
        </header>

        {/* My Role */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">01 — MY ROLE</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">What I contributed</h2>
          </div>
          
          <div 
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div 
                className="rounded-xl p-5 space-y-2"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">02 — VEST DESIGN</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">Problem → Solution</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem */}
            <div 
              className="rounded-[24px] md:rounded-[32px] p-6 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <span className="text-xs text-foreground/40 uppercase tracking-wide">Problem</span>
              <div 
                className="rounded-xl overflow-hidden bg-background/50 h-[280px] flex items-center justify-center"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
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
              className="rounded-[24px] md:rounded-[32px] p-6 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <span className="text-xs text-foreground/40 uppercase tracking-wide">Solution</span>
              <div 
                className="rounded-xl overflow-hidden bg-background/50 h-[280px] flex items-center justify-center"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
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
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">03 — INTERACTION DESIGN</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">Three Control Modes</h2>
          </div>
          
          <div 
            className="rounded-[24px] md:rounded-[32px] p-8 md:p-10"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Neutral Lock */}
              <div className="text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-background flex items-center justify-center"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
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
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
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
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
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
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">04 — DESIGN PRINCIPLES</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">Key Design Priorities</h2>
          </div>
          
          <div 
            className="rounded-[24px] md:rounded-[32px] p-6 md:p-8"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-wrap gap-3">
              <div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <Shield className="w-4 h-4 text-foreground/50" />
                <span className="text-sm text-foreground/70">Safety for SCI users</span>
              </div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <Lock className="w-4 h-4 text-foreground/50" />
                <span className="text-sm text-foreground/70">Prevent accidental activation</span>
              </div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "var(--background)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
