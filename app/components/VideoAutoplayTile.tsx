"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

type VideoAutoplayTileProps = {
  videoId: string;
  label: string;
  aspectRatio?: string;
};

function extractYoutubeId(input: string): string {
  if (input.length === 11 && !input.includes("/")) return input;
  const match = input.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match?.[1] ?? input;
}

export default function VideoAutoplayTile({
  videoId,
  label,
  aspectRatio = "4/3",
}: VideoAutoplayTileProps) {
  const [open, setOpen] = useState(false);
  const id = extractYoutubeId(videoId);

  const inlineSrc = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&fs=0`;
  const fullSrc = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${label} with sound`}
        className="group relative block w-full overflow-hidden text-left bg-black"
        style={{ aspectRatio }}
      >
        {/* Inline silent loop — scaled up to mask YouTube chrome */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src={inlineSrc}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-0"
          />
        </div>
        <span className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
        <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="text-[11px] uppercase tracking-[0.14em] text-white/95">
            {label}
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/70">
            Play ↗
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 md:top-8 md:right-8 flex items-center justify-center w-10 h-10 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors"
            >
              <X size={18} aria-hidden />
            </button>
            <m.div
              key="frame"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-[1280px]"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={fullSrc}
                title={label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
