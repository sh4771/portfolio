"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Lock, Circle } from "lucide-react"
import { useState, useEffect } from "react"

const themeImages = Array.from({ length: 24 }, (_, i) => `/images/schedulink-themes/theme-${i + 1}.png`)

export default function Page() {
  const [currentTheme, setCurrentTheme] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themeImages.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <main className="min-h-screen bg-background py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-24">

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
                Real-Time Availability for Social Planning
              </h1>
              <p className="text-sm text-foreground/50">
                UX Director / Product Designer @ ScheduLink
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm pt-4">
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Role</span>
                <span className="text-foreground/70">UX Director / Product Designer</span>
              </div>
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Status</span>
                <span className="text-foreground/70">Stealth startup | iOS beta (pre-launch)</span>
              </div>
              <div>
                <span className="block text-xs text-foreground/40 mb-1">Scope</span>
                <span className="text-foreground/70">Onboarding | Friends | Schedule | Profile | Calendar Design</span>
              </div>
            </div>

            <p className="text-sm text-foreground/60 max-w-2xl text-pretty leading-relaxed">
              ScheduLink is a social scheduling app for college students. My focus was on defining 
              the core interaction system and building a flexible calendar structure that powers 
              spontaneous connections.
            </p>

            {/* Hero Mockup Image */}
            <div className="relative w-full mt-8 h-[280px] md:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden">
              <Image
                src="/images/schedulink.jpg"
                alt="ScheduLink app mockup showing calendar interface"
                width={1200}
                height={800}
                className="w-full h-full object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* The Problem */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-foreground/40 uppercase tracking-wide">01 — THE PROBLEM</p>
              <h2 className="text-lg md:text-xl font-medium tracking-tight">
                Texting Back and Forth but Schedules Never Align
              </h2>
            </div>

            <div 
              className="rounded-[24px] md:rounded-[32px] p-8 md:p-12 lg:p-16"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              {/* Floating Cards Layout */}
              <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[500px]">
                
                {/* Left floating cards */}
                <div 
                  className="absolute left-0 top-[10%] max-w-[160px] md:max-w-[200px] rounded-xl p-3 md:p-4 z-10"
                  style={{ 
                    background: "var(--background)", 
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    transform: "rotate(-3deg)"
                  }}
                >
                  <p className="text-xs md:text-sm text-foreground/70 leading-relaxed font-medium">
                    Students need to see overlap, but won't share their entire calendar
                  </p>
                </div>

                <div 
                  className="absolute left-[5%] bottom-[15%] max-w-[150px] md:max-w-[180px] rounded-xl p-3 md:p-4 z-10"
                  style={{ 
                    background: "var(--background)", 
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    transform: "rotate(2deg)"
                  }}
                >
                  <p className="text-xs md:text-sm text-foreground/70 leading-relaxed font-medium">
                    Privacy settings need to be present but not intrusive
                  </p>
                </div>

                {/* Center Video */}
                <div 
                  className="relative z-20 w-[55%] md:w-[45%] rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto"
                  >
                    <source src="/videos/schedulink-problem.mov" type="video/quicktime" />
                    <source src="/videos/schedulink-problem.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Right floating cards */}
                <div 
                  className="absolute right-0 top-[8%] max-w-[160px] md:max-w-[200px] rounded-xl p-3 md:p-4 z-10"
                  style={{ 
                    background: "var(--background)", 
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    transform: "rotate(4deg)"
                  }}
                >
                  <p className="text-xs md:text-sm text-foreground/70 leading-relaxed font-medium">
                    Schedules vary wildly (8am classes vs 9pm shifts), displaying them cleanly is hard
                  </p>
                </div>

                <div 
                  className="absolute right-[3%] bottom-[12%] max-w-[150px] md:max-w-[180px] rounded-xl p-3 md:p-4 z-10"
                  style={{ 
                    background: "var(--background)", 
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    transform: "rotate(-2deg)"
                  }}
                >
                  <p className="text-xs md:text-sm text-foreground/70 leading-relaxed font-medium">
                    Students today juggle multiple scheduling tools
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-foreground/60 leading-relaxed">
              Students are forced to switch between apps, manually compare information, and re-enter the same details.
            </p>
          </div>
        </header>

        {/* Solutions */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">02 — FRAMING</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              How might we share availability without increasing social pressure or complexity?
            </h2>
          </div>
        </section>

        {/* Wireframe Exploration */}
        <section className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">03 — IDEATION</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Wireframe Exploration
            </h2>
            <p className="text-sm text-foreground/60 max-w-2xl">
              Testing how schedule input, privacy controls, and availability states connect in a low-friction onboarding flow.
            </p>
          </div>

          {/* Main Wireframe Video - Centered & Smaller */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-8 md:p-12 flex justify-center"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div 
              className="w-[40%] md:w-[30%] rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto"
              >
                <source src="/videos/schedulink-lofi.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Onboarding Wireframes */}
          <div className="space-y-4">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">Onboarding Flow</p>
            <div 
              className="rounded-[24px] md:rounded-[32px] p-6 md:p-8"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              >
                <Image
                  src="/images/schedulink-onboarding.png"
                  alt="ScheduLink onboarding wireframes showing sign up, name, birthday, gender, and school selection screens"
                  width={1600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Progressive onboarding flow collecting essential user information with minimal friction.
            </p>
          </div>

          {/* Three Visual Groups */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Group 1 — Schedule Input */}
            <div 
              className="rounded-2xl p-5 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--background)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  <Calendar className="w-5 h-5 text-foreground/50" />
                </div>
                <span className="text-sm font-medium">Schedule Input</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Exploring ways for students to quickly input class schedules with minimal friction.
              </p>
            </div>

            {/* Group 2 — Privacy Settings */}
            <div 
              className="rounded-2xl p-5 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--background)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  <Lock className="w-5 h-5 text-foreground/50" />
                </div>
                <span className="text-sm font-medium">Privacy Settings</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Testing visibility options so users can control what parts of their schedule others can see.
              </p>
            </div>

            {/* Group 3 — Availability States */}
            <div 
              className="rounded-2xl p-5 space-y-4"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--background)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  <Circle className="w-5 h-5 text-foreground/50 fill-foreground/20" />
                </div>
                <span className="text-sm font-medium">Availability States</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Designing lightweight status states to help friends quickly see when someone is free.
              </p>
            </div>
          </div>
        </section>

        {/* Calendar as Personal Expression */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">04 — DESIGN SYSTEM</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Calendar as Personal Expression
            </h2>
          </div>

          {/* Theme Variations - Animated Gallery */}
          <div 
            className="rounded-[24px] md:rounded-[32px] p-8 md:p-12"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex justify-center">
              <div 
                className="relative w-[200px] md:w-[280px] rounded-[2rem] overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
              >
                {themeImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`ScheduLink theme ${index + 1}`}
                    width={280}
                    height={600}
                    className={`w-full h-auto transition-opacity duration-150 ${
                      index === currentTheme ? "opacity-100" : "opacity-0 absolute inset-0"
                    }`}
                    priority={index < 3}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-foreground/50 text-center mt-6">
              24 customizable color themes
            </p>
          </div>

          <p className="text-xs text-foreground/60 leading-relaxed">
            Customizable calendar themes allow users to personalize their schedules through color and layout variations. All themes operate on the same structural framework and design system.
          </p>
        </section>

        {/* High-Fidelity Screens */}
        <section className="space-y-12">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">05 — FINAL DESIGNS</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              High-Fidelity Screens
            </h2>
          </div>

          {/* Home */}
          <div className="space-y-4">
            <div 
              className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-xs text-foreground/40 uppercase tracking-wide mb-4">Home</p>
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
              >
                <Image
                  src="/images/schedulink-home.png"
                  alt="ScheduLink home page showing friends list and availability status"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-xs text-foreground/60 leading-relaxed">
              The Home tab surfaces real-time availability across your close network.
            </p>
          </div>

          {/* Profile */}
          <div className="space-y-4">
            <div 
              className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <p className="text-xs text-foreground/40 uppercase tracking-wide mb-4">Profile</p>
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              >
                <Image
                  src="/images/schedulink-profile.png"
                  alt="ScheduLink profile page showing user stats and academic rhythm"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-xs text-foreground/60 leading-relaxed">
              The Profile tab focuses on personal progress and context. It provides users a quick overview of their academic rhythm.
            </p>
          </div>
        </section>

        {/* Reflection */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-foreground/40 uppercase tracking-wide">06 — TAKEAWAY</p>
            <h2 className="text-lg md:text-xl font-medium tracking-tight">
              Key Reflection
            </h2>
          </div>

          <div 
            className="rounded-[24px] md:rounded-[32px] p-8 md:p-10"
            style={{
              background: "linear-gradient(145deg, var(--muted) 0%, var(--card) 100%)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm text-foreground/70 leading-relaxed">
                Designing ScheduLink pushed me to define how schedule data, privacy rules, and social 
                visibility interact. The most challenging part was <span className="scribble-underline">balancing flexibility with clarity</span>, 
                especially when introducing multiple calendar themes without breaking structural consistency.
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                This project strengthened my ability to <span className="scribble-circle">design interaction models</span> that remain stable 
                even as visual expression evolves.
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
