import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

const experiences = [
  {
    period: "2024 — Present",
    title: "Full Stack Developer",
    company: "KanooPay",
    location: "Remote",
    description: "Developing and maintaining digital POS systems, e-commerce platforms, and live event streaming solutions. Building scalable RESTful APIs and implementing secure authentication with role-based access control.",
    achievements: [
      "Developed KanooPOS digital POS system",
      "Built Canopi online book sale platform with payment integration",
      "Developed Tikkets live event streaming system",
      "Worked on 54Connects (Africa media & news platform)",
      "Built AKH Project with Next.js and modern web technologies",
    ],
    skills: ["Laravel", "Next.js", "MySQL", "REST APIs", "JWT"],
    link: "https://kanoopos.com/"
  },
  {
    period: "2021 — 2024",
    title: "Laravel Developer",
    company: "Bluegruzz",
    location: "Remote",
    description: "Developed backend systems and secure REST APIs for frontend integration. Optimized database queries and integrated third-party APIs and payment systems.",
    achievements: [
      "Built secure REST APIs for frontend integration",
      "Optimized database queries and improved performance",
      "Integrated third-party APIs and payment systems",
      "Maintained production-level applications",
    ],
    skills: ["Laravel", "PHP", "MySQL", "REST APIs", "Git"],
    link: "#"
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
            <Image
              src="/images/profile.png"
              alt="Muhammad Danish Ashraf"
              width={64}
              height={64}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-sm font-medium text-primary uppercase tracking-widest">Work Experience</h2>
            <p className="text-muted-foreground text-sm mt-1">5+ years of professional development</p>
          </div>
        </div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <Link
              key={index}
              href={exp.link}
              target={exp.link !== "#" ? "_blank" : undefined}
              rel={exp.link !== "#" ? "noopener noreferrer" : undefined}
              className="group block"
            >
              <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 p-6 rounded-lg hover:bg-card/50 transition-colors border border-transparent hover:border-primary/20">
                <div className="text-sm text-muted-foreground font-medium">
                  {exp.period}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                    {exp.title} · {exp.company}
                    {exp.link !== "#" && (
                      <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                  <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 border-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
