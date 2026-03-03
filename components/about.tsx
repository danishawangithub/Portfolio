export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-sm font-medium text-primary uppercase tracking-widest mb-4">About Me</h2>
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Currently, I work as a <span className="text-foreground font-medium">Full Stack Developer at KanooPay</span>, where I develop and maintain digital POS systems, e-commerce platforms, and live event streaming solutions. I specialize in building scalable RESTful APIs and implementing secure authentication systems.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"In the past, I've had the opportunity to develop software across a variety of settings — from "}
            <span className="text-foreground font-medium">backend systems</span> and{" "}
            <span className="text-foreground font-medium">payment integrations</span> to{" "}
            <span className="text-foreground font-medium">media platforms</span> and{" "}
            <span className="text-foreground font-medium">e-commerce solutions</span>.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"I'm continuously improving my technical and communication skills, and I'm open to international opportunities and relocation. When I'm not coding, you can find me exploring new technologies and contributing to open-source projects."}
          </p>
        </div>
      </div>
    </section>
  )
}
