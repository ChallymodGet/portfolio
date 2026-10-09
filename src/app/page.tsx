"use client";

import Hero from "@/components/canvas/Hero";
import CaseStudy from "@/components/canvas/CaseStudy";
import IDESection from "@/components/ide/IDESection";
import { projects } from "@/lib/projects";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showHiddenLog, setShowHiddenLog] = useState(false);

  return (
    <main className="bg-[var(--background)] relative">
      <Hero />
      
      <div className="relative">
        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      <IDESection />
      
      <footer className="h-[40vh] w-full flex flex-col items-center justify-center bg-[var(--background)] text-center px-4 relative group">
        <h2 className="text-4xl font-bold text-[var(--foreground)] mb-8 tracking-tighter">Ready to build the next big thing?</h2>
        <a 
          href="mailto:your-email@example.com" 
          className="px-8 py-4 bg-accent-green text-black font-bold rounded-full hover:scale-110 transition-transform duration-300 relative z-10"
        >
          Let's Collaborate
        </a>
        
        {/* Hidden Easter Egg Trigger */}
        <div 
          onClick={() => setShowHiddenLog(!showHiddenLog)}
          className="absolute bottom-4 right-4 w-2 h-2 bg-white/10 rounded-full cursor-help hover:bg-accent-green transition-colors" 
          title="System Log"
        />

        <AnimatePresence>
          {showHiddenLog && (
            <div className="absolute bottom-20 right-10 w-64 p-4 bg-black border border-accent-green/30 rounded-lg font-mono text-[10px] text-accent-green text-left shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <p className="opacity-50 mb-2">&gt;&gt; system_logs.txt</p>
              <p>v1.0: Stable build</p>
              <p>Animations: GSAP/Lenis</p>
              <p>Mood: High-Performance</p>
              <p>Status: Awaiting Collaboration...</p>
            </div>
          )}
        </AnimatePresence>

        <p className="mt-12 text-gray-600 font-mono text-xs uppercase tracking-widest">
          © 2026 Onofuevure Charles // All Rights Reserved
        </p>
      </footer>
    </main>
  );
}
