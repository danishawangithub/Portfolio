import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ShoppingCart, Ticket, Newspaper, BookOpen, Monitor, Warehouse } from "lucide-react"

const projects = [
  {
    title: "MAK Imports Warehouse & POS Management System",
    description:
      "Enterprise warehouse and inventory management system developed for a Scotland-based company. The platform manages products, stock levels, suppliers, customers, sales, purchases, payment tracking, financial reports, invoices, and daily warehouse operations through a centralized admin dashboard.",
    icon: Warehouse,
    tech: ["Laravel", "MySQL", "REST APIs", "Authentication", "Inventory System", "POS", "Financial Reports"],
    link: "https://hub.bwwarehouse.co.uk/",
  },
  {
    title: "KanooPOS",
    description:
      "A digital Point of Sale system for modern retail businesses. The system supports product management, sales tracking, user roles, secure authentication, reporting workflows, and business operations management.",
    icon: Monitor,
    tech: ["Laravel", "MySQL", "REST API", "JWT Auth", "POS"],
    link: "https://kanoopos.com/",
  },
  {
    title: "Digital Canopi",
    description:
      "An online book sale platform with product management, order handling, integrated payment processing, and a smooth customer purchasing experience.",
    icon: BookOpen,
    tech: ["Laravel", "Payment Gateway", "MySQL", "Next.js"],
    link: "https://digitalcanopi.com/",
  },
  {
    title: "Tikkets",
    description:
      "A live event ticketing and streaming platform built with Laravel. Includes event management, ticket booking, payment integration, live streaming support, and admin management features.",
    icon: Ticket,
    tech: ["Laravel", "Streaming API", "Payment Integration", "Ticketing"],
    link: "https://whitelabel.tikkets.com/",
  },
  {
    title: "54Connects",
    description:
      "An Africa-focused media and news platform for publishing, managing, and displaying content across multiple categories with a scalable backend system.",
    icon: Newspaper,
    tech: ["Laravel", "REST API", "Content Management"],
    link: "https://54connects.com/",
  },
  {
    title: "AKH Project",
    description:
      "A modern frontend web application built with Next.js and Tailwind CSS, focused on responsive design, clean UI, performance, and maintainable frontend structure.",
    icon: ShoppingCart,
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://akh-project-phase-self.vercel.app/",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-sm font-medium text-primary uppercase tracking-widest mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon

            return (
              <Link key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="block">
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
                        <Badge key={tech} variant="outline" className="border-border text-muted-foreground text-xs">
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