"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text">("default");
  
  // Motion values for buttery smooth movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics to prevent the cursor from feeling "stiff"
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        setCursorState("hover");
      } else if (window.getComputedStyle(target).cursor === "text") {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      {/* The main cursor dot */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed w-2 h-2 bg-accent-green rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* The dynamic outer ring / effect */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState === "hover" ? 60 : cursorState === "text" ? 20 : 30,
          height: cursorState === "hover" ? 60 : cursorState === "text" ? 20 : 30,
          borderColor: cursorState === "hover" ? "var(--accent-green)" : "var(--cursor-ring)",
          borderRadius: cursorState === "text" ? "2px" : "50%",
          opacity: cursorState === "text" ? 0.5 : 1,
        }}
        className="fixed border border-[var(--cursor-ring)] pointer-events-none z-[9998] transition-colors duration-300 ease-out"
      />
    </>
  );
}
