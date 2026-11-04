"use client";

import Hero from "@/components/canvas/Hero";
import CaseStudy from "@/components/canvas/CaseStudy";
import CaseStudyFilters from "@/components/CaseStudyFilters";
import IDESection from "@/components/ide/IDESection";
import type { IdeTabContent } from "@/types/ide";
import type { Project } from "@/types/project";
import { useEffect, useMemo, useState } from "react";
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

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))].sort(),
    [projects],
  );

  // Only offer tags used by case studies in the selected categories
  const availableTags = useMemo(() => {
    const scoped = selectedCategories.length
      ? projects.filter((p) => selectedCategories.includes(p.category))
      : projects;
    return [...new Set(scoped.flatMap((p) => p.techStack))].sort();
  }, [projects, selectedCategories]);

  // Category and tag groups combine with AND; pills within a group match any
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!selectedCategories.length || selectedCategories.includes(p.category)) &&
          (!selectedTags.length || selectedTags.some((t) => p.techStack.includes(t))),
      ),
    [projects, selectedCategories, selectedTags],
  );

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [filteredProjects]);

  const toggleCategory = (category: string) => {
    setVisibleCaseStudyCount(CASE_STUDIES_INITIAL);
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    const nextTagPool = new Set(
      projects
        .filter((p) => !next.length || next.includes(p.category))
        .flatMap((p) => p.techStack),
    );
    setSelectedCategories(next);
    setSelectedTags((tags) => tags.filter((t) => nextTagPool.has(t)));
  };

  const toggleTag = (tag: string) => {
    setVisibleCaseStudyCount(CASE_STUDIES_INITIAL);
    setSelectedTags((tags) =>
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
    );
  };

  const visibleProjects = filteredProjects.slice(0, visibleCaseStudyCount);
  const hiddenCaseStudyCount = filteredProjects.length - visibleProjects.length;
  const nextRevealCount = Math.min(CASE_STUDIES_STEP, hiddenCaseStudyCount);

  return (
    <main className="page-canvas relative">
      <Hero />

      <CaseStudyFilters
        categories={categories}
        tags={availableTags}
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        resultCount={filteredProjects.length}
        onToggleCategory={toggleCategory}
        onToggleTag={toggleTag}
        onClear={() => {
          setVisibleCaseStudyCount(CASE_STUDIES_INITIAL);
          setSelectedCategories([]);
          setSelectedTags([]);
        }}
      />

      <div className="relative isolate">
        {visibleProjects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
        {!filteredProjects.length && (
          <p className="border-b border-surface px-4 py-16 text-center font-mono text-xs uppercase tracking-widest text-muted">
            No case studies match these filters
          </p>
        )}
      </div>

      {/* Always mounted: the pinned IDE section below is wrapped in a GSAP pin-spacer,
          so React can't insert a new sibling before it */}
      <div>
        {hiddenCaseStudyCount > 0 && (
          <div className="relative z-10 flex justify-center border-b border-surface bg-section-alt px-3 py-10 sm:px-4 md:px-12 sm:py-12">
            <button
              type="button"
              onClick={() => {
                setVisibleCaseStudyCount((count) =>
                  Math.min(count + CASE_STUDIES_STEP, filteredProjects.length),
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
      </div>

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
