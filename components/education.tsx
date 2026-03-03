import { GraduationCap } from "lucide-react"

const education = [
  {
    period: "2025 — Present",
    degree: "BS Computer Science",
    institution: "The Virtual University (VU) of Pakistan",
    description: "Programming Fundamentals, Object-Oriented Programming, Data Structures & Algorithms, Database Systems, Software Engineering, Web Development, Operating Systems, Computer Networks, and System Design.",
    level: "EQF Level 6"
  },
  {
    period: "2015 — 2019",
    degree: "Bachelor's Degree in Economics",
    institution: "Government College University Faisalabad",
    description: "Microeconomics, Macroeconomics, Econometrics, Statistics, Financial Economics, Development Economics, International Economics, Research Methodology, and Data Analysis.",
    level: "EQF Level 6"
  },
]

export function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-sm font-medium text-primary uppercase tracking-widest mb-12">Education</h2>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 p-6 rounded-lg bg-card/50 border border-border"
            >
              <div className="text-sm text-muted-foreground font-medium">
                {edu.period}
              </div>
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <GraduationCap className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 ml-8">
                  {edu.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2 ml-8">{edu.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
