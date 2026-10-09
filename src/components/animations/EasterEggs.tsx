"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEggs() {
  const [glitchMode, setGlitchMode] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const SECRET_CODE = "code"; // Typing 'code' triggers the mode

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSeq = [...prev, e.key].slice(-SECRET_CODE.length);
        if (newSeq.join("").toLowerCase() === SECRET_CODE) {
          setGlitchMode(prev => !prev);
        }
        return newSeq;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {glitchMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
        >
          {/* Matrix-style rain effect simulation via CSS animation */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overflow-hidden">
             <div className="absolute inset-0 opacity-20 font-mono text-accent-green text-[10px] leading-none pointer-events-none break-all">
               {Array(100).fill("01011010101011010010101011010101").join(" ")}
             </div>
          </div>
          <div className="green-pill relative z-10 font-bold px-6 py-2 rounded-full animate-bounce">
            DEV_MODE_ACTIVATED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
