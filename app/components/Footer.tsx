import { Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site } from "@/lib/site";

type IconProps = { size?: number; className?: string };

function IgIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FbIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YtIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function VimeoIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M22.99 6.51c-.09 1.98-1.47 4.68-4.14 8.11-2.76 3.59-5.09 5.38-7.01 5.38-1.19 0-2.19-1.1-3.02-3.29-.55-2.03-1.1-4.06-1.65-6.09-.61-2.19-1.27-3.29-1.98-3.29-.15 0-.68.32-1.58.95L1.6 6.85c1-.88 1.99-1.76 2.97-2.64 1.35-1.16 2.36-1.78 3.03-1.84 1.59-.15 2.57.94 2.94 3.28.4 2.52.67 4.09.83 4.7.46 2.11.97 3.16 1.52 3.16.43 0 1.08-.68 1.94-2.03.86-1.35 1.32-2.38 1.38-3.09.12-1.19-.35-1.78-1.38-1.78-.49 0-.99.11-1.51.34C13.34 4.62 15.32 3.19 17.2 3.26c1.4.04 2.06.95 1.99 2.72z" />
    </svg>
  );
}

const BRAND_ICONS: Record<string, React.FC<IconProps>> = {
  Instagram: IgIcon,
  Facebook: FbIcon,
  YouTube: YtIcon,
  Vimeo: VimeoIcon,
};

export default function Footer() {
  return (
    <footer className="mt-24 px-12 pb-28 md:pb-10">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-[880px] text-[12px] tracking-[0.04em]">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/80 shrink-0">
            <MapPin size={15} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
              Visit
            </span>
            <span className="text-white/90">{fullAddress}</span>
          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/80 shrink-0">
            <Mail size={15} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="flex flex-col gap-1 min-w-0">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
              Email
            </span>
            <a
              href={`mailto:${site.email}`}
              className="text-white/90 hover:text-white transition-colors truncate"
            >
              {site.email}
            </a>
          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/80 shrink-0">
            <Phone size={15} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
              Phone
            </span>
            <a
              href={`tel:${site.phone.tel}`}
              className="text-white/90 hover:text-white transition-colors"
            >
              {site.phone.display}
            </a>
          </span>
        </li>
      </ul>

      <ul className="mt-12 flex flex-wrap items-center gap-3">
        {site.socials.map((s) => {
          const Icon = BRAND_ICONS[s.name];
          const pill =
            "group inline-flex items-center gap-2.5 border border-white/15 rounded-full pl-2 pr-4 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors";
          const iconWrap =
            "flex items-center justify-center w-7 h-7 rounded-full bg-white/5 shrink-0";

          return (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className={`${pill} text-white/80 hover:text-white hover:border-white/35`}
              >
                <span className={iconWrap}>
                  <Icon size={13} />
                </span>
                <span>{s.name}</span>
                {s.handle && (
                  <span className="text-white/40 group-hover:text-white/70 transition-colors normal-case tracking-normal">
                    {s.handle}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-16 flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between text-[10px] uppercase tracking-[0.14em] text-white/50">
        <p className="max-w-[520px] leading-[1.5]">
          We do not collect data and do not use cookies. First day is free —
          walk in, train, see if it fits.
        </p>
        <span>( C ) Factum 2026</span>
      </div>
    </footer>
  );
}
