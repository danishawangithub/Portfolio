import { Badge } from "@/components/ui/badge"
import { Server, Layout, Database, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Backend",
    icon: Server,
    skills: ["Laravel", "Core PHP", "Node.js", "REST APIs", "Authentication (JWT)"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["Next.js", "JavaScript", "React", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "Database Design", "Query Optimization", "Data Modeling"],
  },
  {
    title: "Tools & Other",
    icon: Settings,
    skills: ["Git", "Postman", "Payment Gateway Integration", "POS Systems", "E-commerce Systems"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-sm font-medium text-primary uppercase tracking-widest mb-12">Skills & Technologies</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div key={index} className="p-6 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
