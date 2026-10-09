"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = textRef.current?.querySelectorAll(".char");
      if (letters) {
        gsap.fromTo(
          letters,
          { opacity: 0, y: 20, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
            delay: 0.5,
          }
        );
      }

      gsap.to(glassRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        opacity: 0,
        scale: 0.9,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00a0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-28 sm:pb-32"
    >
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full" />

      <div className="hero-content z-10 text-center w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-accent-green text-[10px] sm:text-sm mb-4 sm:mb-6 tracking-widest uppercase leading-snug px-1"
        >
          System Status: Online // Product Architect
        </motion.div>

        <h1
          ref={textRef}
          className="text-[clamp(1.75rem,8vw,6rem)] font-bold tracking-tighter text-foreground mb-6 sm:mb-8 leading-[1.05] break-words hyphens-auto"
          style={{ perspective: "1000px" }}
        >
          {splitText("Onofuevure Charles")}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="max-w-2xl mx-auto text-muted text-sm sm:text-base md:text-xl font-light leading-relaxed px-1"
        >
          Bridging the gap between{" "}
          <span className="text-foreground font-medium">complex business logic</span> and
          <span className="text-foreground font-medium"> intuitive user experiences</span>{" "}
          through scalable digital products.
        </motion.p>

        <div
          ref={glassRef}
          className="mt-8 sm:mt-12 md:mt-16 relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto"
        >
          <div className="absolute inset-0 bg-surface backdrop-blur-xl border border-surface rounded-3xl rotate-12 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-strong)] to-transparent backdrop-blur-md border border-surface rounded-3xl -rotate-6 shadow-2xl" />
          <div className="absolute inset-0 flex items-center justify-center text-accent-blue font-mono text-[9px] sm:text-[10px] opacity-80 px-2 text-center">
            [ PROCESS_CORE ]
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-accent-green to-transparent" />
      </div>
    </section>
  );
}
