import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

const experiences = [


  {
    period: "2026, June — Present",
    title: "Full Stack Developer",
    company: "Zaman IT Network",
    location: "Remote",
    description:
      "Working as a Full Stack Developer building scalable business applications, enterprise management systems, REST APIs, inventory platforms, POS solutions, and custom web applications for international and local clients.",
  
    achievements: [
      "Developed enterprise warehouse and inventory management systems",
      "Built scalable REST APIs and backend architectures",
      "Worked on POS systems and business automation platforms",
      "Implemented authentication and role-based access control systems",
      "Designed optimized MySQL database structures",
      "Developed responsive frontend interfaces using Next.js and React",
    ],
  
    skills: [
      "Laravel",
      "Next.js",
      "React",
      "MySQL",
      "REST APIs",
      "Authentication",
      "Tailwind CSS",
    ],
  
    link: "#",
  },

  {
    period: "2024 — 2026",
    title: "Full Stack Developer",
    company: "KanooPay",
    location: "Remote",
    description:
      "Developing and maintaining production-level business applications including warehouse management systems, POS platforms, e-commerce solutions, ticketing systems, media platforms, REST APIs, and payment-integrated web applications.",
    achievements: [
      "Developed MAK Imports Warehouse & POS Management System for a Scotland-based business",
      "Built inventory, stock, supplier, customer, sales, purchase, and financial reporting modules",
      "Built and maintained KanooPOS digital Point of Sale system",
      "Developed Digital Canopi online book sale platform with payment integration",
      "Worked on Tikkets live event ticketing and streaming platform",
      "Designed scalable REST APIs for frontend and mobile applications",
      "Implemented authentication, authorization, and role-based access control",
      "Designed and optimized MySQL database structures for business operations",
    ],
    skills: ["Laravel", "Next.js", "MySQL", "REST APIs", "POS", "Inventory", "Payment Integration"],
    link: "https://hub.bwwarehouse.co.uk/",
  },
  {
    period: "2021 — 2024",
    title: "Laravel Developer",
    company: "Bluegruzz",
    location: "Remote",
    description:
      "Worked as a Laravel Developer building backend systems, REST APIs, database-driven applications, and third-party integrations for production web platforms. Focused on performance, security, and maintainable backend code.",
    achievements: [
      "Developed backend applications using Laravel and Core PHP",
      "Built secure REST APIs for frontend integration",
      "Optimized MySQL queries and improved application performance",
      "Integrated third-party APIs and payment systems",
      "Maintained and debugged live production applications",
    ],
    skills: ["Laravel", "Core PHP", "MySQL", "REST APIs", "Git"],
    link: "#",
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
            <h2 className="text-sm font-medium text-primary uppercase tracking-widest">
              Work Experience
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              5+ years building scalable business web applications
            </p>
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

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
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