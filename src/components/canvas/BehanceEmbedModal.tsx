"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type BehanceEmbedModalProps = {
  open: boolean;
  title: string;
  embedUrl: string;
  onClose: () => void;
};

export default function BehanceEmbedModal({
  open,
  title,
  embedUrl,
  onClose,
}: BehanceEmbedModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="behance-modal-title"
          className="fixed inset-0 z-[10001] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close case study preview"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-surface bg-background shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-surface px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent-green">
                  Behance Case Study
                </p>
                <h3
                  id="behance-modal-title"
                  className="truncate text-base font-bold text-foreground sm:text-lg"
                >
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-surface bg-surface p-2 text-foreground transition-colors hover:bg-surface-strong"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-[var(--ide-bg)] p-2 sm:p-3">
              <iframe
                src={embedUrl}
                title={`${title} on Behance`}
                className="h-[min(78dvh,720px)] w-full rounded-lg border-0 bg-white"
                loading="lazy"
                allowFullScreen
                allow="clipboard-write; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
