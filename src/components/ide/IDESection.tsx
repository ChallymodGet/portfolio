"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Database, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IDE_FILES = [
  {
    name: "profile.ts",
    icon: <Code2 size={14} />,
    code: `export const Designer = {\n  name: "Onofuevure Charles",\n  role: "Senior Product Designer",\n  email: "modgetdesigns@gmail.com",\n  location: "Lagos, Nigeria (Remote)",\n  education: "B.Tech Physics Electronics",\n  experience: "5+ Years",\n  specialization: [\n    "End-to-End Product Design",\n    "UX Strategy",\n    "Design Systems",\n    "Business Logic Transformation"\n  ],\n  mindset: "Analytical, Data-Driven, User-Centric",\n};`,
    result:
      "ONOFUEVURE CHARLES\nSenior Product Designer\nmodgetdesigns@gmail.com\nLagos, Nigeria | Remote\nB.Tech Physics Electronics\n5+ Years Experience\n\nExpertise: End-to-End Design, UX Strategy, Design Systems",
  },
  {
    name: "stack.json",
    icon: <Database size={14} />,
    code: `{\n  "design": ["Figma", "Adobe CC"],\n  "dev": ["Next.js", "TS"],\n  "motion": ["GSAP", "Framer"],\n  "os": ["MacOS", "Linux"]\n}`,
    result: "Design: Figma, Adobe CC\nDev: Next.js, TS\nMotion: GSAP, Framer\nOS: MacOS, Linux",
  },
  {
    name: "metrics.md",
    icon: <Layers size={14} />,
    code: `# Impact Metrics\n\n- Engagement: +40%\n- Adoption: +25%\n- Efficiency: +30%\n- UX: End-to-End`,
    result:
      "CORE IMPACT:\n\nEngagement: 40% Increase ↑\nAdoption: 25% Growth ↑\nEfficiency: 30% Increase ↑\nUX: Optimized",
  },
] as const;

export default function IDESection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>(IDE_FILES[0].name);
  const [codeIndex, setCodeIndex] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  const [scrollTabsEnabled, setScrollTabsEnabled] = useState(false);

  const activeFile = IDE_FILES.find((f) => f.name === activeTab) || IDE_FILES[0];

  useEffect(() => {
    setCodeIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % activeFile.code.length);
    }, 40);
    return () => clearInterval(interval);
  }, [activeFile]);

  useEffect(() => {
    const fullTerminalText =
      "npm run analyze-cv...\nFound: 5+ Years Experience...\nDetected: Senior-level Product Ownership...\nAnalyzing Domains: FinTech, HealthTech, EdTech...\nOptimization: COMPLETE. Result rendered in Preview Window.";
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullTerminalText.slice(0, index));
      index++;
      if (index > fullTerminalText.length) {
        setTimeout(() => {
          setTerminalText("");
          index = 0;
        }, 4000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    let scrollTrigger: ScrollTrigger | null = null;
    let ctx: gsap.Context | null = null;

    const enableScrollTabs = () =>
      desktop.matches && !reducedMotion.matches && !coarsePointer.matches;

    const setup = () => {
      ctx?.revert();
      scrollTrigger?.kill();
      scrollTrigger = null;

      const enabled = enableScrollTabs();
      setScrollTabsEnabled(enabled);
      if (!enabled) return;

      const steps = IDE_FILES.length - 1;
      if (steps <= 0) return;

      ctx = gsap.context(() => {
        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: () =>
            section.offsetHeight <= window.innerHeight ? "bottom bottom" : "top top",
          end: () => `+=${window.innerHeight * steps}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.45,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress) => Math.round(progress * steps) / steps,
            duration: { min: 0.15, max: 0.35 },
            delay: 0.05,
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * steps);
            const name = IDE_FILES[idx]?.name ?? IDE_FILES[0].name;
            setActiveTab((prev) => (prev === name ? prev : name));
          },
        });
      }, section);

      ScrollTrigger.refresh();
    };

    setup();

    const onMediaChange = () => setup();
    desktop.addEventListener("change", onMediaChange);
    reducedMotion.addEventListener("change", onMediaChange);
    coarsePointer.addEventListener("change", onMediaChange);
    window.addEventListener("resize", onMediaChange);

    return () => {
      desktop.removeEventListener("change", onMediaChange);
      reducedMotion.removeEventListener("change", onMediaChange);
      coarsePointer.removeEventListener("change", onMediaChange);
      window.removeEventListener("resize", onMediaChange);
      scrollTrigger?.kill();
      ctx?.revert();
    };
  }, []);

  const selectTab = (name: string) => {
    setActiveTab(name);
    if (!scrollTabsEnabled || !sectionRef.current) return;

    const steps = IDE_FILES.length - 1;
    const idx = IDE_FILES.findIndex((f) => f.name === name);
    if (idx < 0 || steps <= 0) return;

    const st = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current);
    if (!st) return;

    const progress = idx / steps;
    const scrollPos = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: scrollPos, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full bg-[var(--background)] flex items-center justify-center px-3 sm:px-4 md:px-12 py-12 sm:py-16 md:py-20 overflow-hidden min-h-[100dvh] lg:min-h-0"
    >
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent-purple/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-7xl min-h-0 lg:h-[min(800px,calc(100dvh-4rem))] bg-[var(--ide-bg)] rounded-xl sm:rounded-2xl border border-[var(--ide-border)] shadow-2xl flex flex-col overflow-hidden">
        <div className="h-10 sm:h-12 shrink-0 bg-[var(--ide-sidebar)] border-b border-[var(--ide-border)] flex items-center justify-between px-3 sm:px-4 gap-2">
          <div className="flex gap-1.5 sm:gap-2 shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[var(--text-muted)] font-mono text-[10px] sm:text-xs flex items-center gap-1.5 min-w-0 truncate">
            <Code2 size={12} className="shrink-0" />
            <span className="truncate hidden sm:inline">portfolio_os / src / about_me</span>
            <span className="truncate sm:hidden">about_me</span>
          </div>
          <div className="w-8 sm:w-12 shrink-0" />
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
          <div className="shrink-0 md:shrink md:w-64 bg-[var(--ide-sidebar)] border-b md:border-b-0 md:border-r border-[var(--ide-border)] p-3 sm:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            <p className="hidden md:block text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-widest mb-2 md:mb-4">
              Explorer
            </p>
            {IDE_FILES.map((file) => (
              <button
                key={file.name}
                type="button"
                onClick={() => selectTab(file.name)}
                className={`flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 rounded text-xs sm:text-sm font-mono whitespace-nowrap transition-all shrink-0 ${
                  activeTab === file.name
                    ? "bg-blue-500/20 text-[var(--accent-blue)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--ide-tab-hover)]"
                }`}
              >
                {file.icon} {file.name}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
            <div className="flex-1 min-h-[220px] max-h-[45vh] lg:max-h-none bg-[var(--ide-bg)] p-3 sm:p-4 md:p-6 font-mono text-[11px] sm:text-xs md:text-sm relative overflow-auto">
              <div className="flex gap-3 sm:gap-4 min-w-0">
                <div className="text-[var(--text-muted)] text-right select-none hidden sm:block opacity-70 shrink-0">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="text-[var(--foreground)] whitespace-pre-wrap break-words min-w-0">
                  {activeFile.code.slice(0, codeIndex)}
                  <span className="animate-pulse text-accent-green">|</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[min(100%,380px)] lg:shrink-0 bg-[var(--ide-preview-panel)] border-t lg:border-t-0 lg:border-l border-[var(--ide-border)] p-3 sm:p-4 md:p-6 flex flex-col min-h-[180px] lg:min-h-0">
              <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-[10px] uppercase mb-3 sm:mb-4">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Live Preview
              </div>
              <div className="flex-1 flex items-center justify-center min-h-0">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full p-3 sm:p-4 md:p-6 bg-[var(--surface)] border border-[var(--ide-border)] rounded-xl backdrop-blur-md max-h-full overflow-auto"
                >
                  <pre className="text-[var(--foreground)] font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {activeFile.result}
                  </pre>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 min-h-[5.5rem] sm:min-h-[6rem] lg:h-32 bg-black border-t border-[var(--ide-border)] p-3 sm:p-4 font-mono text-[10px] sm:text-xs overflow-auto">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Terminal size={12} /> <span className="hidden sm:inline">Terminal - zsh</span>
          </div>
          <div className="text-accent-green leading-relaxed break-words">
            <span className="text-zinc-100">guest@portfolio:~$</span> {terminalText}
            <span className="animate-pulse ml-1">_</span>
          </div>
        </div>
      </div>
    </section>
  );
}
