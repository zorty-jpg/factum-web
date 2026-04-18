import { cn } from "@/lib/utils";

type ImageSource = {
  src: string;
  alt: string;
};

type RevealImagesProps = {
  images: [ImageSource, ImageSource];
  className?: string;
};

export default function RevealImages({ images, className }: RevealImagesProps) {
  const frame =
    "absolute right-4 -top-1 z-40 h-24 w-20 md:h-32 md:w-24";
  const effect =
    "relative w-16 h-16 md:w-20 md:h-20 overflow-hidden border border-white/15 " +
    "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 " +
    "group-hover:w-full group-hover:h-full " +
    "transition-all duration-500 delay-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div className={frame}>
        <div className={effect}>
          <img
            alt={images[1].alt}
            src={images[1].src}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        className={cn(
          frame,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500",
          "group-hover:translate-x-8 group-hover:translate-y-6 group-hover:rotate-6",
        )}
      >
        <div className={cn(effect, "duration-200")}>
          <img
            alt={images[0].alt}
            src={images[0].src}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
