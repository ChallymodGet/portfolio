"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code2, Database, Layers } from "lucide-react";

export default function IDESection() {
  const [activeTab, setActiveTab] = useState<string>("profile.ts");
  const [codeIndex, setCodeIndex] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  
  const files = [
    { 
      name: "profile.ts", 
      icon: <Code2 size={14} />, 
      code: `export const Designer = {\n  name: "Onofuevure Charles",\n  role: "Senior Product Designer",\n  mindset: "Data-Driven",\n  philosophy: "Complexity simplified",\n  location: "Remote / Global",\n};`,
      result: "Onofuevure Charles\nSenior Product Designer\nData-Driven\nComplexity simplified\nRemote / Global"
    },
    { 
      name: "stack.json", 
      icon: <Database size={14} />, 
      code: `{\n  "design": ["Figma", "Adobe CC"],\n  "dev": ["Next.js", "TS"],\n  "motion": ["GSAP", "Framer"],\n  "os": ["MacOS", "Linux"]\n}`,
      result: "Design: Figma, Adobe CC\nDev: Next.js, TS\nMotion: GSAP, Framer\nOS: MacOS, Linux"
    },
    { 
      name: "metrics.md", 
      icon: <Layers size={14} />, 
      code: `# Impact Metrics\n\n- Engagement: +40%\n- Adoption: +25%\n- Efficiency: +30%\n- UX: End-to-End`,
      result: "ENGAGEMENT: 40% ↑\nADOPTION: 25% ↑\nEFFICIENCY: 30% ↑\nUX: OPTIMIZED"
    },
  ];

  const activeFile = files.find(f => f.name === activeTab) || files[0];

  // Typing loop for the code editor
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % activeFile.code.length);
    }, 40);
    return () => clearInterval(interval);
  }, [activeFile]);

  // Terminal typing effect
  useEffect(() => {
    const fullTerminalText = "npm run compile...\\nAnalyzing architecture...\\nOptimizing layouts...\\nBuild Successful: Result rendered in Preview Window.";
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullTerminalText.slice(0, index));
      index++;
      if (index > fullTerminalText.length) {
        setTimeout(() => { setTerminalText(""); index = 0; }, 3000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="relative min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center p-4 md:p-12 overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
      
      <div className="relative w-full max-w-7xl h-[800px] bg-[#1e1e1e] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
        {/* MacOS Window Header */}
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
          {/* Sidebar */}
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

          {/* Main Content Split */}
          <div className="flex-1 flex">
            {/* CODE EDITOR */}
            <div className="flex-1 bg-[#1e1e1e] p-6 font-mono text-sm relative overflow-hidden">
              <div className="flex gap-4">
                <div className="text-gray-600 text-right select-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {activeFile.code.slice(0, codeIndex)}
                  <span className="animate-pulse text-accent-green">|</span>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW WINDOW */}
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

        {/* Terminal */}
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
