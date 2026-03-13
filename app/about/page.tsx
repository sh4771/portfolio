import type { Metadata } from "next"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About - Violet",
  description:
    "Product Designer working at the intersection of research, storytelling, and systems thinking.",
}

const experiences = [
  {
    image: "/images/experience-roar.jpg",
    role: "Lead Design Engineer, Web Designer",
    organization: "ROAR Lab Columbia University",
    link: "https://roar.me.columbia.edu/",
  },
  {
    image: "/images/experience-design-engineering.jpg",
    role: "Founder, President",
    organization: "Design & Engineering @ NYU",
    link: "https://www.instagram.com/nyu.de/",
  },
  {
    image: "/images/experience-louvre.jpg",
    role: "Team Lead, Visiting Artist",
    organization: "Louvre Abu Dhabi",
    link: "https://www.louvreabudhabi.ae/",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="mx-auto w-full max-w-[800px] px-6">
          
          {/* Profile Photo - Centered */}
          <div className="flex justify-center mb-16">
            <div className="w-[200px] h-[260px] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-photo.png"
                alt="Portrait of Violet"
                width={200}
                height={260}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio Section - Below Photo */}
          <div className="max-w-[600px] mx-auto space-y-8 mb-24">
            <p className="text-xs tracking-[0.08em] text-foreground/85 leading-[1.8]">
              <em className="not-italic">Design is my language.</em> I{" "}
              <span className="scribble-underline">connect people</span> and{" "}
              <span className="scribble-underline">share stories</span> through my work.
            </p>

            <p className="text-xs tracking-[0.08em] text-foreground/60 leading-[1.8]">
              I currently design and research at{" "}
              <a
                href="https://roar.me.columbia.edu/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-foreground/40 underline-offset-2 hover:text-foreground transition-colors"
              >
                Robotics and Rehabilitation Lab
              </a>{" "}
              at Columbia University, actively interacting with patients, researchers, and students through the website I am rebuilding.
            </p>

            <p className="text-xs tracking-[0.08em] text-foreground/60 leading-[1.8]">
              In previous internships, I designed at{" "}
              <a
                href="https://www.violethyun.com/portfolio/games4peace"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-foreground/40 underline-offset-2 hover:text-foreground transition-colors"
              >
                Games4Peace
              </a>
              ,{" "}
              <a
                href="https://misskcosmetics.com/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-foreground/40 underline-offset-2 hover:text-foreground transition-colors"
              >
                Miss K Cosmetics
              </a>
              , and{" "}
              <a
                href="https://www.kmcaseoul.org/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-foreground/40 underline-offset-2 hover:text-foreground transition-colors"
              >
                K Museum of Contemporary Art
              </a>{" "}
              and merchandised at{" "}
              <a
                href="https://www.chloe.com/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-foreground/40 underline-offset-2 hover:text-foreground transition-colors"
              >
                Chloé
              </a>
              .
            </p>
          </div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-32">
            {experiences.map((exp, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Image */}
                <div className="w-full aspect-square bg-muted/50 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={exp.image}
                    alt={exp.organization}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Role */}
                <p className="text-xs tracking-[0.06em] font-medium text-foreground/70 mb-1">
                  {exp.role}
                </p>
                
                {/* Organization Link */}
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-[0.06em] text-foreground/50 underline decoration-foreground/30 underline-offset-2 hover:text-foreground/70 transition-colors"
                >
                  {exp.organization}
                </a>
              </div>
            ))}
          </div>

          {/* Community Section */}
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.08em] text-foreground/50 leading-[1.8] max-w-[600px] mx-auto">
              Whether I'm at home or in my home away from home, I build a community with people around shared interests.
            </p>
          </div>

          {/* When I'm Not Designing Section */}
          <div>
            <h2 className="text-center text-xs tracking-[0.2em] text-foreground/70 uppercase mb-16">
              When I'm Not Designing ...
            </h2>

            <div className="space-y-20">
              
              {/* Food Section - Stacked */}
              <div className="space-y-6">
                {/* Food Image Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-food-1.jpg"
                      alt="Beli food tracker"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-food-2.jpg"
                      alt="Homemade dishes"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-food-3.jpg"
                      alt="Kitchen party"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Food Caption - Below Images, Centered */}
                <div className="space-y-2 text-center">
                  <p className="text-xs tracking-[0.08em] font-medium text-foreground/70">
                    Food is my biggest love language.
                  </p>
                  <p className="text-xs tracking-[0.08em] text-foreground/50 leading-[1.8]">
                    I even made a little{" "}
                    <a
                      href="https://editor.p5js.org/sh6363/full/mnrKWZok0"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-foreground/40 underline-offset-2 hover:text-foreground transition-colors"
                    >
                      NYC restaurant bot
                    </a>{" "}
                    for fun. Ask me what to eat anytime, I got you!
                  </p>
                </div>
              </div>

              {/* Sports Section - Stacked */}
              <div className="space-y-6">
                {/* Sports Image Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-sports-1.jpg"
                      alt="Gym workout"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-sports-2.jpg"
                      alt="Golfing"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-sports-3.jpg"
                      alt="Skiing with friends"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Sports Caption - Below Images, Centered */}
                <div className="space-y-2 text-center">
                  <p className="text-xs tracking-[0.08em] font-medium text-foreground/70">
                    I enjoy all kinds of sports.
                  </p>
                  <p className="text-xs tracking-[0.08em] text-foreground/50 leading-[1.8]">
                    I spend time with my friends golfing, playing volleyball, going to the gym, and running.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
