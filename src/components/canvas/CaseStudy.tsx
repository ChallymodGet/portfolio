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
      const items = section.querySelectorAll(".case-item");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );
      });

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, scale: 0.96, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
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
      className="relative isolate w-full overflow-hidden border-b border-surface bg-background scroll-mt-24"
      style={{ zIndex: index + 1 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[min(600px,80vw)] w-[min(600px,80vw)] -translate-y-1/2 rounded-full bg-accent-blue/5 blur-[120px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:py-24 xl:gap-12 xl:py-28">
        <div className="mb-10 flex justify-center lg:mb-0 lg:sticky lg:top-24 lg:self-start">
          <div className="group relative aspect-[4/3] w-full max-w-[500px]">
            <div className="absolute inset-0 rotate-3 scale-95 rounded-2xl border border-surface bg-surface-strong opacity-50 backdrop-blur-md transition-transform group-hover:rotate-0" />

            <img
              ref={imgRef}
              src={project.heroImage}
              alt={project.title}
              className="relative z-10 h-full w-full rounded-2xl border border-surface object-cover shadow-2xl"
            />

            <div className="green-pill absolute -bottom-3 -right-2 z-20 max-w-[70%] truncate rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase sm:-bottom-4 sm:-right-4 sm:px-3 sm:text-[10px]">
              {project.category}
            </div>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent-green sm:text-xs">
              Case Study {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mb-3 break-words text-3xl font-bold tracking-tighter text-foreground sm:mb-4 sm:text-4xl lg:text-5xl">
              {project.title}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="case-item rounded-xl border border-surface bg-surface p-3 backdrop-blur-sm sm:p-4"
              >
                <span className="mb-1 block font-mono text-[10px] uppercase leading-tight text-accent-blue sm:text-xs">
                  {m.label}
                </span>
                <span className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="case-item rounded-r-xl border-l-2 border-accent-green bg-surface p-4 backdrop-blur-sm sm:p-6"
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-green sm:text-sm">
                  The Challenge
                </p>
                <p className="mb-3 text-sm italic text-muted sm:mb-4 sm:text-base">
                  &ldquo;{c.problem}&rdquo;
                </p>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-blue sm:text-sm">
                  The Solution
                </p>
                <p className="text-sm font-medium text-foreground sm:text-base">
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
