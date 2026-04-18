"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

type VideoLightboxProps = {
  /** YouTube video ID (11-char) or full youtu.be/youtube.com URL. */
  videoId: string;
  /** Poster image path, e.g. "/images/gym/boxing-1.jpg". */
  poster: string;
  /** Caption shown under the thumbnail. */
  label: string;
  aspectRatio?: string;
};

function extractYoutubeId(input: string): string {
  if (input.length === 11 && !input.includes("/")) return input;
  const match = input.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? input;
}

export default function VideoLightbox({
  videoId,
  poster,
  label,
  aspectRatio = "16/9",
}: VideoLightboxProps) {
  const [open, setOpen] = useState(false);
  const id = extractYoutubeId(videoId);

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
        className="group relative block w-full overflow-hidden border border-white/10 text-left"
        style={{ aspectRatio }}
      >
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/95 text-black transition-transform group-hover:scale-110">
            <Play size={22} strokeWidth={2} className="translate-x-0.5" aria-hidden />
          </span>
        </span>
        <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.14em] text-white/95">
            {label}
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/70">
            Watch
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
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
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
