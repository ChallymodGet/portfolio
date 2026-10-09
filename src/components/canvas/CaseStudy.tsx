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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.5, section.offsetHeight)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        gsap.to(imgRef.current, {
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          scale: 1.1,
          y: -50,
        });

        const items = section.querySelectorAll(".case-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const items = section.querySelectorAll(".case-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-0 lg:min-h-screen lg:h-screen overflow-visible lg:overflow-hidden bg-background flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 lg:py-0"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(600px,90vw)] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative z-10 flex justify-center order-1 lg:order-none">
          <div className="relative w-full max-w-[500px] aspect-[4/3] group">
            <div className="absolute inset-0 bg-[var(--surface-strong)] backdrop-blur-md border border-surface rounded-2xl rotate-3 scale-95 opacity-50 transition-transform group-hover:rotate-0" />

            <img
              ref={imgRef}
              src={project.heroImage}
              alt={project.title}
              className="relative z-10 w-full h-full object-cover rounded-2xl border border-surface shadow-2xl transition-transform duration-700"
            />

            <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 bg-accent-green text-black font-mono text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full z-20 uppercase max-w-[70%] truncate">
              {project.category}
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8 sm:space-y-10 lg:space-y-12 order-2 lg:order-none">
          <div>
            <p className="font-mono text-accent-green text-[10px] sm:text-xs uppercase tracking-widest mb-2">
              Case Study {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 tracking-tighter break-words">
              {project.title}
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="case-item p-3 sm:p-4 bg-surface border border-surface rounded-xl backdrop-blur-sm"
              >
                <span className="block text-accent-blue font-mono text-[10px] sm:text-xs uppercase mb-1 leading-tight">
                  {m.label}
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="case-item p-4 sm:p-6 bg-surface border-l-2 border-accent-green rounded-r-xl backdrop-blur-sm"
              >
                <p className="text-xs sm:text-sm font-mono text-accent-green mb-2 uppercase tracking-widest">
                  The Challenge
                </p>
                <p className="text-muted mb-3 sm:mb-4 italic text-sm sm:text-base">
                  &ldquo;{c.problem}&rdquo;
                </p>
                <p className="text-xs sm:text-sm font-mono text-accent-blue mb-2 uppercase tracking-widest">
                  The Solution
                </p>
                <p className="text-foreground font-medium text-sm sm:text-base">
                  {c.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
