import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import WardrobeComposition from "@/components/infographics/wardrobe-composition"
import DiscardReasons from "@/components/infographics/discard-reasons"
import DisposalBehavior from "@/components/infographics/disposal-behavior"
import BuyingMotivations from "@/components/infographics/buying-motivations"
import StoriesAndMemories from "@/components/infographics/stories-and-memories"
import CircularPricingModel from "@/components/infographics/circular-pricing-model"
import ClothingLifecycle from "@/components/infographics/clothing-lifecycle"

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
                  Designing Traceable Garment Lifecycles
                </h1>
                <p className="text-sm text-foreground/50">
                  UI/UX Design @ Personal Project
                </p>
              </div>
              
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm pt-4">
                <div>
                  <span className="block text-xs text-foreground/40 mb-1">Team</span>
                  <span className="text-foreground/70">Personal Project</span>
                </div>
                <div>
                  <span className="block text-xs text-foreground/40 mb-1">Timeline</span>
                  <span className="text-foreground/70">May 2024 – Present</span>
                </div>
                <div>
                  <span className="block text-xs text-foreground/40 mb-1">What I did</span>
                  <span className="text-foreground/70">Research, UX/UI Design, Prototyping</span>
                </div>
              </div>

              <p className="text-sm text-foreground/60 max-w-2xl text-pretty leading-relaxed">
                Led research and end-to-end design of a blockchain-enabled fashion reuse app 
                focused on extending garment lifecycle through traceability.
              </p>

              {/* Hero Mockup Image */}
              <div className="relative w-full mt-8 h-[280px] md:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/passiton-mockup.png"
                  alt="PASSIT ON app mockup showing garment tracking interface"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* The Problem Statement */}
            <div className="border border-border/50 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-lg md:text-xl font-medium tracking-tight">
                  Why clothes leave rotation while they&apos;re still wearable
                </h2>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Someone stands at their closet and notices a top they only wore a few times.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  It still fits. Nothing is wrong with it.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  It already feels <strong className="text-foreground/90 font-medium">done</strong>.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  There is no{" "}
                  <strong className="text-foreground/90 font-medium">visible history</strong>.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  No chain of owners, no footprint of where it came from or what it took to make.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Without that, there is no <strong className="text-foreground/90 font-medium">signal of value</strong>{" "}
                  worth holding onto.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  So they <strong className="text-foreground/90 font-medium">reach for something new</strong>.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  <strong className="text-foreground/90 font-medium">
                    Most closets and apps never surface that story.
                  </strong>
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Passing it on is hard to justify next to checkout.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  When those pieces leave home, the scale shows up downstream.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  <strong className="text-foreground/90 font-medium">
                    Ghana receives millions of unwanted clothes every week.
                  </strong>
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Many are unsellable and non-biodegradable, and end up in dumpsites or burned.
                </p>
              </div>

              {/* Animated Lifecycle Cycle */}
              <ClothingLifecycle />
            </div>

            {/* Approach */}
            <div className="space-y-4 max-w-3xl">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">Approach</p>
              <h2 className="text-lg md:text-xl font-medium tracking-tight">
                How I approached the problem
              </h2>
              <p className="text-sm text-foreground/60 text-pretty leading-relaxed">
                I ran research with 50 Gen Z users (ages 19–26) to understand how and why they
                let clothes go, especially when the item was still wearable.
              </p>
              <p className="text-sm text-foreground/60 text-pretty leading-relaxed">
                Most people were replacing pieces to keep up with trends, not because the clothing
                had failed physically. That suggested the friction wasn&apos;t mainly wear and
                tear; it was weak emotional attachment and little perceived long-term value.
              </p>
            </div>

          {/* Survey Introduction */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-normal">50</span>
                <div>
                  <p className="text-base font-medium">respondents surveyed</p>
                  <p className="text-xs text-foreground/50">ages 19–26 (Gen Z)</p>
                </div>
              </div>
              
              <p className="text-sm text-foreground/60 text-pretty leading-relaxed">
                The setup, raw responses, and charts from that survey are below.
              </p>

              <p className="text-xs text-foreground/40 pt-3 border-t border-border/50">
                Understanding Behavior Survey
              </p>
            </div>

            <div className="bg-muted/40 rounded-3xl p-5 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 md:gap-5">
                <div className="md:row-span-2">
                  <Image
                    src="/images/survey-form.png"
                    alt="Google Forms survey interface"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div>
                  <Image
                    src="/images/survey-responses.png"
                    alt="Survey response spreadsheet"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div>
                  <Image
                    src="/images/survey-charts.png"
                    alt="Survey data visualization charts"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
              <p className="text-xs text-foreground/40 text-center mt-3">
                Survey responses from 50 Gen Z participants on clothing consumption and disposal habits
              </p>
            </div>
          </div>
        </header>

        <section>
          <WardrobeComposition />
        </section>

        <section>
          <DiscardReasons />
        </section>

        <section>
          <DisposalBehavior />
        </section>

        <section>
          <BuyingMotivations />
        </section>

        <section>
          <StoriesAndMemories />
        </section>

        {/* Design intent */}
        <section className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-foreground/40">Design intent</p>
          <h2 className="text-lg font-medium tracking-tight md:text-xl">What I set out to build</h2>
          <p className="text-sm text-foreground/60 text-pretty leading-relaxed">
            From there, I focused on a system that could raise the perceived value of garments
            over time by making their history visible and shareable, so keeping or passing an
            item on could compete more fairly with buying new.
          </p>
        </section>

        {/* Solutions */}
        <section className="space-y-16 md:space-y-20">
          {/* Section Header */}
          <div className="space-y-2">
            <p className="text-xs text-foreground/40">01</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Solutions
            </h2>
            <p className="text-sm text-foreground/60 max-w-2xl text-pretty">
              High-fidelity designs for extending garment lifecycles through transparency and engagement
            </p>
          </div>

          {/* Feature 1: Garment Journey & User Engagement */}
          <div 
            className="relative mx-auto rounded-[32px] md:rounded-[40px] p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div 
              className="absolute inset-0 rounded-[32px] md:rounded-[40px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10 space-y-8">
              {/* Section Title */}
              <div className="text-center space-y-2">
                <h3 className="text-base md:text-lg font-medium tracking-tight">
                  Garment Journey & User Engagement
                </h3>
                <p className="text-sm text-foreground/60 max-w-2xl mx-auto">
                  Track ownership history, earn rewards, and build your sustainable fashion profile
                </p>
              </div>

              {/* Three-Image Layout */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-14">
                {/* ReLeaf Chain */}
                <div className="flex flex-col items-center text-center group">
                  <div 
                    className="rounded-[2rem] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      boxShadow: "0 30px 70px rgba(0,0,0,0.35), 0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.2)",
                      border: "3px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <Image
                      src="/images/passiton-releaf.png"
                      alt="ReLeaf chain tracking garment journey"
                      width={220}
                      height={475}
                      className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                    />
                  </div>
                  <div className="mt-4 space-y-1 max-w-[200px]">
                    <h4 className="text-sm font-medium tracking-tight">ReLeaf Chain</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed">
                      Tracks item transfers and visualizes carbon footprint savings
                    </p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="flex flex-col items-center text-center group">
                  <div 
                    className="rounded-[2rem] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      boxShadow: "0 30px 70px rgba(0,0,0,0.35), 0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.2)",
                      border: "3px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <Image
                      src="/images/passiton-nextsteps.png"
                      alt="Next steps with ReLeaf points and tips"
                      width={220}
                      height={475}
                      className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                    />
                  </div>
                  <div className="mt-4 space-y-1 max-w-[200px]">
                    <h4 className="text-sm font-medium tracking-tight">Next Steps</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed">
                      Awards ReLeaf points and suggests eco-friendly care tips
                    </p>
                  </div>
                </div>

                {/* User Profile */}
                <div className="flex flex-col items-center text-center group">
                  <div 
                    className="rounded-[2rem] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      boxShadow: "0 30px 70px rgba(0,0,0,0.35), 0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.2)",
                      border: "3px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <Image
                      src="/images/passiton-profile.png"
                      alt="User profile with achievements and moodboard"
                      width={220}
                      height={475}
                      className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                    />
                  </div>
                  <div className="mt-4 space-y-1 max-w-[200px]">
                    <h4 className="text-sm font-medium tracking-tight">User Profile</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed">
                      Displays ReLeaf points, rankings, and sustainability achievements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Item Tag Scanner & Material Information */}
          <div 
            className="relative mx-auto rounded-[32px] md:rounded-[40px] p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div 
              className="absolute inset-0 rounded-[32px] md:rounded-[40px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10">
              {/* Images Left + Text Right Layout */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
                
                {/* Two Images */}
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 shrink-0">
                  {/* Scanner Screen */}
                  <div className="flex flex-col items-center group">
                    <div 
                      className="rounded-[2rem] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                      style={{
                        boxShadow: "0 30px 70px rgba(0,0,0,0.35), 0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.2)",
                        border: "3px solid rgba(0,0,0,0.12)",
                      }}
                    >
                      <Image
                        src="/images/passiton-scanner.png"
                        alt="Item tag scanner interface"
                        width={240}
                        height={520}
                        className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                      />
                    </div>
                    <p className="mt-3 text-xs text-foreground/40">Scanner Interface</p>
                  </div>

                  {/* Detail View (Zoomed) */}
                  <div className="flex flex-col items-center group">
                    <div 
                      className="rounded-[2rem] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                      style={{
                        boxShadow: "0 30px 70px rgba(0,0,0,0.35), 0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.2)",
                        border: "3px solid rgba(0,0,0,0.12)",
                      }}
                    >
                      <Image
                        src="/images/passiton-scanner-detail.png"
                        alt="Material information detail view showing chemical impacts"
                        width={240}
                        height={520}
                        className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                      />
                    </div>
                    <p className="mt-3 text-xs text-foreground/40">Material Detail View</p>
                  </div>
                </div>

                {/* Feature Description - With Border */}
                <div className="border border-foreground/10 rounded-2xl p-6 md:p-8 lg:self-center">
                  {/* Level 1: Title */}
                  <h3 className="text-base md:text-lg font-medium tracking-tight">
                    Item Tag Scanner & Material Information
                  </h3>
                  
                  {/* Level 2: Summary */}
                  <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                    Scans clothing tags to reveal <strong className="text-foreground/90 font-medium">hidden health and environmental impacts</strong> of garment materials.
                  </p>
                  
                  {/* Level 3: Bullet Points */}
                  <ul className="mt-4 space-y-2 text-sm text-foreground/60">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 shrink-0" />
                      <span>Identifies harmful chemicals such as <strong className="text-foreground/90 font-medium">formaldehyde</strong> and synthetic treatments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 shrink-0" />
                      <span>Explains how materials affect <strong className="text-foreground/90 font-medium">human health</strong> and <strong className="text-foreground/90 font-medium">ecosystems</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 shrink-0" />
                      <span>Makes the <strong className="text-foreground/90 font-medium">hidden costs of fashion</strong> visible to the wearer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <CircularPricingModel />
        </section>

        </div>
      </main>
  )
}
