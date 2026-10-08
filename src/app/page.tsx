import Hero from "@/components/canvas/Hero";
import CaseStudy from "@/components/canvas/CaseStudy";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="bg-charcoal-900">
      <Hero />
      
      {/* The Scrollytelling Project Section */}
      <div className="relative">
        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Placeholder for the next section: The IDE / About Me */}
      <section className="h-screen w-full flex flex-col items-center justify-center bg-charcoal-800 relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        <h2 className="text-4xl font-mono text-gray-500 mb-4">Descending into Execution Mode...</h2>
        <div className="w-1 h-20 bg-gradient-to-b from-accent-green to-transparent animate-bounce" />
      </section>
    </main>
  );
}
