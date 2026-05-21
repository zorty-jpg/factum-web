import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageSource = {
  src: string;
  alt: string;
};

type RevealImagesProps = {
  images: [ImageSource, ImageSource];
  className?: string;
  /** When true, force the reveal-state visible regardless of hover. */
  active?: boolean;
};

export default function RevealImages({
  images,
  className,
  active,
}: RevealImagesProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Back image */}
      <div
        className={cn(
          "absolute right-8 top-8 w-[55%] aspect-[4/5] overflow-hidden border border-white/15",
          "opacity-0 scale-95 translate-x-4 translate-y-0 rotate-0",
          "transition-all duration-[700ms] delay-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-10 group-hover:-rotate-3",
          active &&
            "opacity-100 scale-100 translate-x-0 translate-y-10 -rotate-3",
        )}
      >
        <Image
          alt={images[1].alt}
          src={images[1].src}
          fill
          sizes="(max-width: 768px) 0px, 35vw"
          className="object-cover"
        />
      </div>

      {/* Front image */}
      <div
        className={cn(
          "absolute left-4 top-0 w-[70%] aspect-[4/5] overflow-hidden border border-white/15",
          "opacity-0 scale-95 -translate-x-6",
          "transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0",
          active && "opacity-100 scale-100 translate-x-0",
        )}
      >
        <Image
          alt={images[0].alt}
          src={images[0].src}
          fill
          sizes="(max-width: 768px) 0px, 45vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
