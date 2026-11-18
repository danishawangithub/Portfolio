import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ShoppingCart, Ticket, Newspaper, BookOpen, Monitor, Warehouse, Bot, Vote, Lock, type LucideIcon } from "lucide-react"

type Project = {
  title: string
  description: string
  icon: LucideIcon
  tech: string[]
  link?: string
  role?: string
}

const projects: Project[] = [
  {
    title: "FIRE242 — National Voter Management & Election Operations Platform",
    description:
      "Nationwide election operations platform developed for the Free National Movement (FNM) in The Bahamas. It centralizes voter records, door-to-door surveys, constituency management, role-based access, real-time dashboards, election reporting, and multi-election data while supporting campaign teams from field collection through election day.",
    icon: Vote,
    tech: ["Next.js", "React", "Laravel", "PHP", "REST APIs", "RBAC", "Linux VPS"],
    role: "Full-Stack Developer",
  },
  {
    title: "MAK Imports Warehouse & POS Management System",
    description:
      "Enterprise warehouse and inventory management system developed for a Scotland-based company. The platform manages products, stock levels, suppliers, customers, sales, purchases, payment tracking, financial reports, invoices, and daily warehouse operations through a centralized admin dashboard.",
    icon: Warehouse,
    tech: ["Laravel", "MySQL", "REST APIs", "Authentication", "Inventory System", "POS", "Financial Reports"],
    link: "https://hub.bwwarehouse.co.uk/",
  },
  {
    title: "Elegance Pakistan — AI E-Commerce Assistant System",
    description:
      "Full-stack AI-powered e-commerce platform for a Pakistani fashion brand. Features a dual chatbot system — an Admin AI Agent for business intelligence and product management, and a Customer AI Assistant for natural language shopping support. Built with Laravel 11 backend and Next.js 14 frontend, integrated with Groq LLM and a custom NLP intent router. Implements Retrieval-Augmented Generation (RAG) for semantic product search and keyword-based customer support. Includes real-time customer analytics dashboard, product intelligence reporting, static policy pages, and auth-gated write-action APIs. Overall system completion: 90%+.",
    icon: Bot,
    tech: ["Laravel", "Next.js", "Groq LLM", "OpenAI API", "RAG", "NLP", "Vector Embeddings", "JWT Auth", "MySQL", "REST APIs"],
    link: "https://github.com/danishawangithub/frontend-laravel-ai-shopbot",
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
            const card = (
                <Card className="group h-full bg-card/50 border-border hover:border-primary/50 transition-all hover:bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {project.link ? (
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                          <Lock className="h-3.5 w-3.5" />
                          Confidential
                        </span>
                      )}
                    </div>

                    <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>

                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                    {project.role && (
                      <p className="pt-2 text-sm font-medium text-foreground">
                        Role: <span className="text-primary">{project.role}</span>
                      </p>
                    )}
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
            )

            return project.link ? (
              <Link key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </Link>
            ) : (
              <div key={index} className="block">
                {card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
