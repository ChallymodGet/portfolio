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
    <main className="page-canvas relative overflow-x-hidden">
      <Hero />

      <div className="relative isolate">
        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      <IDESection />

      <footer className="min-h-[40vh] w-full flex flex-col items-center justify-center bg-section-alt text-center px-4 sm:px-6 py-16 sm:py-20 relative pb-[max(2rem,env(safe-area-inset-bottom))] border-t border-surface">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 tracking-tighter max-w-xl leading-tight">
          Ready to build the next big thing?
        </h2>
        <a
          href="https://calendly.com/modgetdesigns/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="green-pill px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-full hover:scale-105 sm:hover:scale-110 transition-transform duration-300 relative z-10"
        >
          Let&apos;s Collaborate
        </a>

        <button
          type="button"
          onClick={() => setShowHiddenLog(!showHiddenLog)}
          className="absolute bottom-4 right-4 w-3 h-3 sm:w-2 sm:h-2 bg-[var(--surface-strong)] rounded-full cursor-help hover:bg-accent-green transition-colors border border-[var(--surface-border)]"
          title="System Log"
          aria-label="Toggle system log"
        />

        <AnimatePresence>
          {showHiddenLog && (
            <div className="absolute bottom-16 left-4 right-4 sm:left-auto sm:right-10 sm:w-64 p-4 bg-black border border-accent-green/30 rounded-lg font-mono text-[10px] text-accent-green text-left shadow-2xl z-20">
              <p className="opacity-50 mb-2">&gt;&gt; system_logs.txt</p>
              <p>v1.0: Stable build</p>
              <p>Animations: GSAP/Lenis</p>
              <p>Mood: High-Performance</p>
              <p>Status: Awaiting Collaboration...</p>
            </div>
          )}
        </AnimatePresence>

        <p className="mt-10 sm:mt-12 text-muted font-mono text-[10px] sm:text-xs uppercase tracking-widest px-2">
          © 2026 Onofuevure Charles // All Rights Reserved
        </p>
      </footer>
    </main>
  );
}
