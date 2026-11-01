"use client";

import Hero from "@/components/canvas/Hero";
import CaseStudy from "@/components/canvas/CaseStudy";
import IDESection from "@/components/ide/IDESection";
import type { IdeTabContent } from "@/types/ide";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES_INITIAL = 4;
const CASE_STUDIES_STEP = 2;

interface HomePageProps {
  projects: Project[];
  ideTabs: IdeTabContent[];
}

export default function HomePage({ projects, ideTabs }: HomePageProps) {
  const [showHiddenLog, setShowHiddenLog] = useState(false);
  const [visibleCaseStudyCount, setVisibleCaseStudyCount] = useState(CASE_STUDIES_INITIAL);

  useEffect(() => {
    setVisibleCaseStudyCount(CASE_STUDIES_INITIAL);
  }, [projects]);

  const visibleProjects = projects.slice(0, visibleCaseStudyCount);
  const hiddenCaseStudyCount = projects.length - visibleProjects.length;
  const nextRevealCount = Math.min(CASE_STUDIES_STEP, hiddenCaseStudyCount);

  return (
    <main className="page-canvas relative">
      <Hero />

      <div className="relative isolate">
        {visibleProjects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      {hiddenCaseStudyCount > 0 && (
        <div className="relative z-10 flex justify-center border-b border-surface bg-section-alt px-3 py-10 sm:px-4 md:px-12 sm:py-12">
          <button
            type="button"
            onClick={() => {
              setVisibleCaseStudyCount((count) =>
                Math.min(count + CASE_STUDIES_STEP, projects.length),
              );
              requestAnimationFrame(() => ScrollTrigger.refresh());
            }}
            className="green-pill inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold sm:text-base"
          >
            View more case studies
            <span className="ml-2 font-mono text-xs font-normal opacity-80">
              (+{nextRevealCount})
            </span>
          </button>
        </div>
      )}

      <IDESection ideTabs={ideTabs} />

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
