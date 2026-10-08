"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, Globe, Database, Layers } from "lucide-react";

export default function IDESection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("profile.ts");
  const [terminalText, setTerminalText] = useState("");
  const fullTerminalText = "npm install senior-product-designer...\\nFetching skills...\\nIntegrating Next.js...\\nApplying GSAP animations...\\nBuild Successful: Portfolio OS v1.0 is now active.";

  useEffect(() => {
    // Terminal typing effect
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullTerminalText.slice(0, index));
      index++;
      if (index > fullTerminalText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const files = [
    { name: "profile.ts", icon: <Code2 size={14} />, content: `export const Designer = {
  name: "Onofuevure Charles",
  role: "Senior Product Designer",
  mindset: "Data-Driven & User-Centric",
  philosophy: "Complexity simplified through structured architecture.",
  location: "Remote / Global",
  experience: "5+ Years of shipping scalable products",
};` },
    { name: "stack.json", icon: <Database size={14} />, content: `{
  "design": ["Figma", "Adobe CC", "Principle"],
  "development": ["Next.js", "TypeScript", "Tailwind CSS"],
  "animation": ["GSAP", "Framer Motion", "Three.js"],
  "os": ["MacOS", "Linux", "Windows"]
}` },
    { name: "metrics.md", icon: <Layers size={14} />, content: "# Key Impact\\n\\n- 40% Engagement Lift (Shkula)\\n- 25% Adoption Growth (Ransact)\\n- 30% Admin Efficiency (NBIOTEK)\\n- End-to-end UX for Mobility (Grabem)" },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      {/* Background technical accents */}
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 blur-[120px] rounded-full" />
      
      {/* The IDE Window */}
      <div className="relative w-full max-w-6xl h-[700px] bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Window Header (MacOS Style) */}
        <div className="h-12 bg-[#252526] border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-gray-500 font-mono text-xs flex items-center gap-2">
            <Code2 size={12} /> portfolio_os / src / about_me
          </div>
          <div className="w-12" /> {/* Spacer for symmetry */}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-64 bg-[#252526] border-r border-white/5 p-4 flex flex-col gap-2">
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-4">Explorer</p>
            {files.map((file) => (
              <button 
                key={file.name}
                onClick={() => setActiveTab(file.name)}
                className={`flex items-center gap-3 px-2 py-1.5 rounded text-sm font-mono transition-all ${
                  activeTab === file.name ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                {file.icon} {file.name}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="flex-1 bg-[#1e1e1e] p-6 font-mono text-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-green/20" />
            
            <div className="flex gap-4">
              {/* Line Numbers */}
              <div className="text-gray-600 text-right select-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Code Content */}
              <pre className="text-gray-300 whitespace-pre-wrap overflow-auto">
                {files.find(f => f.name === activeTab)?.content}
              </pre>
            </div>
          </div>
        </div>

        {/* Terminal Area */}
        <div className="h-48 bg-[#0a0a0a] border-t border-white/10 p-4 font-mono text-xs relative">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Terminal size={12} /> <span>Terminal - zsh</span>
          </div>
          <div className="text-accent-green leading-relaxed">
            <span className="text-white">guest@portfolio:~$</span> {terminalText}
            <span className="animate-pulse ml-1">_</span>
          </div>
        </div>
      </div>

      {/* Side Labels */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-8 items-end text-right">
          <div className="group">
            <p className="text-gray-600 font-mono text-xs uppercase">Current State</p>
            <p className="text-white font-bold group-hover:text-accent-blue transition-colors">Execution Mode</p>
          </div>
          <div className="group">
            <p className="text-gray-600 font-mono text-xs uppercase">Architecture</p>
            <p className="text-white font-bold group-hover:text-accent-blue transition-colors">Modular / Scalable</p>
          </div>
        </div>
      </div>
    </section>
  );
}
