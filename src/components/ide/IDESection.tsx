"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Database, Layers } from "lucide-react";

export default function IDESection() {
  const [activeTab, setActiveTab] = useState<string>("profile.ts");
  const [codeIndex, setCodeIndex] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  
  const files = [
    { 
      name: "profile.ts", 
      icon: <Code2 size={14} />, 
      code: `export const Designer = {\n  name: "Onofuevure Charles",\n  role: "Senior Product Designer",\n  location: "Lagos, Nigeria (Remote)",\n  education: "B.Tech Physics Electronics",\n  experience: "5+ Years",\n  specialization: [\n    "End-to-End Product Design",\n    "UX Strategy",\n    "Design Systems",\n    "Business Logic Transformation"\n  ],\n  mindset: "Analytical, Data-Driven, User-Centric",\n};`,
      result: "ONOFUEVURE CHARLES\nSenior Product Designer\nLagos, Nigeria | Remote\nB.Tech Physics Electronics\n5+ Years Experience\n\nExpertise: End-to-End Design, UX Strategy, Design Systems"
    },
    { 
      name: "impact.json", 
      icon: <Database size={14} />, 
      code: `{\n  "metrics": {\n    "engagement": "+40% (Shkula)",\n    "bounce_rate": "-20% (Shkula)",\n    "adoption": "+25% (Enterprise)",\n    "prototypes": "50+ Production-Ready",\n    "experience": "FinTech, HealthTech, EdTech"\n  },\n  "status": "High-Impact Delivery"\n}`,
      result: "KEY IMPACT:\n\nEngagement: 40% Increase ↑\nBounce Rate: 20% Decrease ↓\nAdoption: 25% Growth ↑\nPrototypes: 50+ Shipped\nDomains: FinTech, HealthTech, EdTech"
    },
    { 
      name: "core_stack.md", 
      icon: <Layers size={14} />, 
      code: `# Tech Stack\n\n## Design\n- Figma (Advanced), FigJam, Framer, ProtoPie\n\n## Process\n- Agile, Sprint Planning, User Research\n\n## Technical\n- Next.js, TypeScript, Tailwind CSS, GSAP\n\n## AI-Augmented\n- Claude, ChatGPT, Gemini, Relume`,
      result: "CORE COMPETENCIES:\n\nDesign: Figma, Framer, ProtoPie\nProcess: Agile, UX Research, A/B Testing\nTech: Next.js, TypeScript, GSAP\nAI: Prompt Engineering, Rapid Ideation"
    },
  ];

  const activeFile = files.find(f => f.name === activeTab) || files[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % activeFile.code.length);
    }, 40);
    return () => clearInterval(interval);
  }, [activeFile]);

  useEffect(() => {
    const fullTerminalText = "npm run analyze-cv...\\nFound: 5+ Years Experience...\\nDetected: Senior-level Product Ownership...\\nAnalyzing Domains: FinTech, HealthTech, EdTech...\\nOptimization: COMPLETE. Result rendered in Preview Window.";
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullTerminalText.slice(0, index));
      index++;
      if (index > fullTerminalText.length) {
        setTimeout(() => { setTerminalText(""); index = 0; }, 4000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="relative min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center p-4 md:p-12 overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 blur-[120px] rounded-full" />
      
      <div className="relative w-full max-w-7xl h-[800px] bg-[#1e1e1e] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        <div className="h-12 bg-[#252526] border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-gray-500 font-mono text-xs flex items-center gap-2">
            <Code2 size={12} /> portfolio_os / src / about_me
          </div>
          <div className="w-12" />
        </div>

        <div className="flex flex-1 overflow-hidden">
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

          <div className="flex-1 flex">
            <div className="flex-1 bg-[#1e1e1e] p-6 font-mono text-sm relative overflow-hidden">
              <div className="flex gap-4">
                <div className="text-gray-600 text-right select-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {activeFile.code.slice(0, codeIndex)}
                  <span className="animate-pulse text-accent-green">|</span>
                </div>
              </div>
            </div>

            <div className="w-1/3 bg-black/40 border-l border-white/10 p-6 flex flex-col">
              <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] uppercase mb-6">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Live Preview
              </div>
              <div className="flex-1 flex items-center justify-center">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
                >
                  <pre className="text-white font-sans text-sm leading-relaxed whitespace-pre-wrap">
                    {activeFile.result}
                  </pre>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-32 bg-[#0a0a0a] border-t border-white/10 p-4 font-mono text-xs relative">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Terminal size={12} /> <span>Terminal - zsh</span>
          </div>
          <div className="text-accent-green leading-relaxed">
            <span className="text-white">guest@portfolio:~$</span> {terminalText}
            <span className="animate-pulse ml-1">_</span>
          </div>
        </div>
      </div>
    </section>
  );
}
