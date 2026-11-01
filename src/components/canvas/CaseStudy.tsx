"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import BehanceEmbedModal from "@/components/canvas/BehanceEmbedModal";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyProps {
  project: Project;
  index: number;
}

export default function CaseStudy({ project, index }: CaseStudyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [behanceOpen, setBehanceOpen] = useState(false);

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

        // Micro-interaction: Hover lift
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { y: -4, scale: 1.02, duration: 0.3, ease: "power2.out", borderColor: "var(--accent-blue)" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      if (imgRef.current) {
        // Entrance animation
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

        const desktopLayout = window.matchMedia("(min-width: 1024px)");
        if (!desktopLayout.matches) {
          gsap.to(imgRef.current, {
            y: -30,
            scale: 1.05,
            filter: "contrast(1.1) brightness(1.05)",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Micro-interaction: Mouse-follow Tilt Effect
        const handleMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = imgRef.current!.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;

          gsap.to(imgRef.current, {
            rotateY: x * 10,
            rotateX: -y * 10,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(imgRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        imgRef.current.addEventListener("mousemove", handleMouseMove);
        imgRef.current.addEventListener("mouseleave", handleMouseLeave);

        // Store listeners for cleanup
        (imgRef.current as any)._listeners = { handleMouseMove, handleMouseLeave };
      }
    }, sectionRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      if (imgRef.current && (imgRef.current as any)._listeners) {
        const { handleMouseMove, handleMouseLeave } = (imgRef.current as any)._listeners;
        imgRef.current.removeEventListener("mousemove", handleMouseMove);
        imgRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      ctx.revert();
    };
  }, [project.id]);

  return (
    <section
      ref={sectionRef}
      className={`relative isolate w-full overflow-x-clip border-b border-surface scroll-mt-24 ${
        index % 2 === 0 ? "bg-background" : "bg-section-alt"
      }`}
      style={{ zIndex: index + 1 }}
    >
      <div
        className="case-glow pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[min(600px,80vw)] w-[min(600px,80vw)] -translate-y-1/2 rounded-full blur-[120px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-3 py-14 sm:px-4 sm:py-16 md:px-12 md:py-20 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] lg:items-start lg:gap-10 lg:py-20 xl:gap-12 xl:py-24">
        <div className="mb-8 flex justify-center lg:mb-0 lg:sticky lg:top-[5.5rem] lg:max-h-[calc(100dvh-6.5rem)] lg:self-start">
          <div className="group relative aspect-[4/3] w-full max-w-[500px] lg:max-w-none">
            <div className="absolute inset-0 rotate-3 scale-95 rounded-2xl border border-surface bg-surface-strong opacity-50 backdrop-blur-md transition-transform group-hover:rotate-0" />

            <img
              ref={imgRef}
              src={project.heroImage}
              alt={project.title}
              className="relative z-10 h-full w-full rounded-2xl border border-surface object-cover shadow-2xl"
            />

            <div className="green-pill absolute -top-3 -right-2 z-20 max-w-[70%] truncate rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase sm:-top-4 sm:-right-4 sm:px-3 sm:text-[10px]">
              {project.category}
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-6 sm:space-y-8" data-case-content>
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent-green sm:text-xs">
              Case Study {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mb-3 break-words text-3xl font-bold tracking-tighter text-foreground sm:mb-4 sm:text-4xl lg:text-4xl xl:text-5xl">
              {project.title}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
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

          {project.behanceEmbedUrl && (
            <button
              type="button"
              onClick={() => setBehanceOpen(true)}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-surface bg-surface-strong px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02] hover:border-[var(--accent-blue)]"
            >
              View full case study
              <ExternalLink size={16} className="text-accent-blue" aria-hidden />
            </button>
          )}

          {project.challenges.length > 0 && (
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted sm:text-xs">
                Challenge → Solution
              </p>
              <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {project.challenges.map((c, i) => (
                  <li
                    key={i}
                    className="case-item flex h-full flex-col rounded-xl border border-surface border-l-2 border-l-accent-green bg-surface p-3 backdrop-blur-sm sm:p-4"
                  >
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-accent-green sm:text-[10px]">
                      Challenge
                    </p>
                    <p className="mb-3 flex-1 text-xs leading-snug text-muted sm:text-sm">
                      {c.problem}
                    </p>
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-accent-blue sm:text-[10px]">
                      Solution
                    </p>
                    <p className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                      {c.solution}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {project.behanceEmbedUrl && (
        <BehanceEmbedModal
          open={behanceOpen}
          title={project.title}
          embedUrl={project.behanceEmbedUrl}
          onClose={() => setBehanceOpen(false)}
        />
      )}
    </section>
  );
}
