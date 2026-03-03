import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Muhammad Danish Ashraf
            </h1>
            <h2 className="text-xl md:text-2xl text-primary font-medium mb-6">
              Full Stack Developer
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
              I build accessible, pixel-perfect digital experiences for the web. 
              Passionate about creating scalable and secure web applications with over 5 years of experience.
            </p>

            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Faisalabad, Pakistan</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-3 mb-8">
              <Link href="#about" className="flex items-center gap-3 group">
                <span className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-primary transition-all" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest">
                  About
                </span>
              </Link>
              <Link href="#experience" className="flex items-center gap-3 group">
                <span className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-primary transition-all" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest">
                  Experience
                </span>
              </Link>
              <Link href="#projects" className="flex items-center gap-3 group">
                <span className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-primary transition-all" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest">
                  Projects
                </span>
              </Link>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/danish-ashraf-6a12142b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:dnishashrif@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="https://wa.me/923007215992"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-primary/10 border-2 border-primary/30 p-2">
                <Image
                  src="/images/profile.png"
                  alt="Muhammad Danish Ashraf"
                  width={320}
                  height={320}
                  className="w-full h-full rounded-full object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
