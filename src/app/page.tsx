import Hero from "@/components/canvas/Hero";
import CaseStudy from "@/components/canvas/CaseStudy";
import IDESection from "@/components/ide/IDESection";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="bg-charcoal-900">
      <Hero />
      
      <div className="relative">
        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      <IDESection />
      
      {/* Final Footer placeholder */}
      <footer className="h-[40vh] w-full flex flex-col items-center justify-center bg-charcoal-900 text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter">Ready to build the next big thing?</h2>
        <a 
          href="mailto:your-email@example.com" 
          className="px-8 py-4 bg-accent-green text-black font-bold rounded-full hover:scale-110 transition-transform duration-300"
        >
          Let's Collaborate
        </a>
        <p className="mt-12 text-gray-600 font-mono text-xs uppercase tracking-widest">
          © 2026 Onofuevure Charles // All Rights Reserved
        </p>
      </footer>
    </main>
  );
}
