import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ShoppingCart, Ticket, Newspaper, BookOpen, Monitor } from "lucide-react"

const projects = [
  {
    title: "KanooPOS",
    description: "A comprehensive digital Point of Sale system designed for modern retail businesses. Features inventory management, sales tracking, and real-time reporting.",
    icon: Monitor,
    tech: ["Laravel", "MySQL", "REST API", "JWT Auth"],
    link: "https://kanoopos.com/"
  },
  {
    title: "Canopi",
    description: "Online book sale platform with integrated payment processing. Includes user authentication, shopping cart, and order management systems.",
    icon: BookOpen,
    tech: ["Laravel", "Payment Gateway", "MySQL", "Next.js"],
    link: "https://digitalcanopi.com/"
  },
  {
    title: "Tikkets",
    description: "Live event streaming and ticket booking platform. Enables event organizers to sell tickets and stream events to audiences worldwide.",
    icon: Ticket,
    tech: ["Laravel", "Streaming API", "Payment Integration"],
    link: "https://whitelabel.tikkets.com/"
  },
  {
    title: "54Connects",
    description: "Africa-focused media and news platform aggregating content from across the continent. Features real-time news updates and media streaming.",
    icon: Newspaper,
    tech: ["Laravel", "REST API", "Content Management"],
    link: "https://54connects.com/"
  },
  {
    title: "AKH Project",
    description: "Modern web application built with Next.js. Features responsive design, optimized performance, and seamless user experience.",
    icon: ShoppingCart,
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://akh-project-phase-self.vercel.app/"
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-sm font-medium text-primary uppercase tracking-widest mb-12">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <Link
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group h-full bg-card/50 border-border hover:border-primary/50 transition-all hover:bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-border text-muted-foreground text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
