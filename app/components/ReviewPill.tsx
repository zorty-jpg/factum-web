import { Star } from "lucide-react";
import { reviews, reviewSummary } from "@/lib/content";

export default function ReviewPill() {
  const avatars = reviews.slice(0, 3);

  return (
    <a
      href={reviewSummary.url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 border border-white/15 bg-white/[0.04] backdrop-blur-sm rounded-full pl-2 pr-5 py-2 hover:border-white/30 transition-colors"
    >
      <div className="flex -space-x-1.5">
        {avatars.map((r) => (
          <span
            key={r.id}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-black/40 text-[9px] tracking-[0.06em] font-medium text-white/90"
          >
            {r.initials}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <Star
          size={14}
          strokeWidth={0}
          className="fill-white"
          aria-hidden
        />
        <span className="text-[13px] font-semibold text-white">
          {reviewSummary.average.toFixed(1)}
        </span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/55">
          · {reviewSummary.count} reviews
        </span>
      </div>
      <span className="text-[11px] text-white/40 group-hover:text-white/80 transition-colors">
        →
      </span>
    </a>
  );
}
