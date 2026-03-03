import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Contact</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
          {"If you would like to discuss a project or just say hi, I'm always down to chat."}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <Link
                  href="mailto:dnishashrif@gmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  dnishashrif@gmail.com
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <Link
                  href="tel:+923007215992"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  +92 300 721 5992
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">Faisalabad, Punjab, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">
              {"I'm open to international opportunities and relocation. Feel free to reach out for collaborations or just a friendly chat."}
            </p>
            
            <div className="flex flex-col gap-4">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="mailto:dnishashrif@gmail.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Send an Email
                </Link>
              </Button>
              
              <div className="flex gap-4">
                <Button asChild variant="outline" className="flex-1 border-border hover:border-primary hover:text-primary">
                  <Link href="https://www.linkedin.com/in/danish-ashraf-6a12142b7/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-border hover:border-primary hover:text-primary">
                  <Link href="https://wa.me/923007215992" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
