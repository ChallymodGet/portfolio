"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyProps {
  project: Project;
  index: number;
}

export default function CaseStudy({ project, index }: CaseStudyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the project section and animate internal elements
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // Stay pinned for 2 screen heights
        pin: true,
        scrub: true,
      });

      // Animate image scaling and floating
      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.1,
        y: -50,
      });

      // Stagger in the metrics and challenges
      const items = sectionRef.current?.querySelectorAll(".case-item");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item, 
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-[var(--background)] flex items-center justify-center px-4"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Project Visuals */}
        <div ref={stickyRef} className="relative z-10 flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-[4/3] group">
            {/* The "Glass" frame for the image */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rotate-3 scale-95 opacity-50 transition-transform group-hover:rotate-0" />
            
            <img 
              ref={imgRef}
              src={project.heroImage} 
              alt={project.title}
              className="relative z-10 w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700"
            />
            
            {/* Technical Badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent-green text-black font-mono text-[10px] font-bold px-3 py-1 rounded-full z-20 uppercase">
              {project.category}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Narrative and Metrics */}
        <div className="relative z-10 space-y-12">
          <div>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">{project.title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="case-item p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <span className="block text-accent-blue font-mono text-xs uppercase mb-1">{m.label}</span>
                <span className="text-3xl font-bold text-white">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Challenges Section */}
          <div className="space-y-6">
            {project.challenges.map((c, i) => (
              <div key={i} className="case-item p-6 bg-white/5 border-l-2 border-accent-green rounded-r-xl backdrop-blur-sm">
                <p className="text-sm font-mono text-accent-green mb-2 uppercase tracking-widest">The Challenge</p>
                <p className="text-gray-300 mb-4 italic">"{c.problem}"</p>
                <p className="text-sm font-mono text-accent-blue mb-2 uppercase tracking-widest">The Solution</p>
                <p className="text-white font-medium">{c.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
