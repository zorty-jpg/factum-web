"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Dumbbell,
  Home,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Classes", url: "/classes", icon: Dumbbell },
  { name: "Schedule", url: "/schedule", icon: CalendarDays },
  { name: "Pricing", url: "/pricing", icon: Tag },
  { name: "Coaches", url: "/coaches", icon: Users },
];

function TubePill({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const layoutId = mobile ? "lamp-mobile" : "lamp";

  return (
    <div
      className={cn(
        "flex items-center bg-white/[0.04] border border-white/10 backdrop-blur-lg rounded-full shadow-lg",
        mobile ? "gap-1.5 py-1.5 px-1.5" : "gap-1 py-1 px-1",
      )}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.url === "/"
            ? pathname === "/"
            : pathname === item.url || pathname.startsWith(`${item.url}/`);

        return (
          <Link
            key={item.name}
            href={item.url}
            className={cn(
              "relative cursor-pointer text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors",
              mobile ? "px-5 py-3.5" : "px-5 py-2",
              "text-white/60 hover:text-white",
              isActive && "text-white",
            )}
          >
            {mobile ? (
              <Icon size={24} strokeWidth={1.75} aria-label={item.name} />
            ) : (
              <span>{item.name}</span>
            )}

            {isActive && (
              <m.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-white/[0.06] -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 rounded-full",
                    mobile
                      ? "-bottom-2 w-12 h-[2px]"
                      : "-top-1.5 w-10 h-[2px]",
                  )}
                  style={{
                    background: "var(--red)",
                    boxShadow:
                      "0 0 18px 4px rgba(191,4,4,0.55), 0 0 4px rgba(191,4,4,0.9)",
                  }}
                />
              </m.span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function Nav() {
  return (
    <>
      {/* Desktop — top bar. Pill is absolutely centered so brand/CTA widths
          don't shift it off-axis. */}
      <header className="hidden md:block fixed top-6 left-0 right-0 px-10 z-[100] pointer-events-none">
        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            className="pointer-events-auto text-[12px] lowercase tracking-[0.04em] text-white/80 hover:text-white transition-colors"
          >
            factum
          </Link>

          <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <TubePill />
          </div>

          <Link
            href="/contact"
            className="pointer-events-auto group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-white text-[11px] uppercase tracking-[0.14em] font-medium transition-transform hover:scale-[1.03] shadow-[0_0_24px_-4px_rgba(191,4,4,0.55)]"
            style={{ backgroundColor: "var(--red)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" aria-hidden />
            First class is on us
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile — minimal top (brand + red pill CTA) */}
      <header className="md:hidden fixed top-4 left-0 right-0 px-5 z-[100] flex items-center justify-between pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto text-[12px] lowercase tracking-[0.04em] text-white/80"
        >
          factum
        </Link>
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-[10px] uppercase tracking-[0.14em] font-medium shadow-[0_0_20px_-4px_rgba(191,4,4,0.55)]"
          style={{ backgroundColor: "var(--red)" }}
        >
          <span className="w-1 h-1 rounded-full bg-white/90" aria-hidden />
          Free first class
        </Link>
      </header>

      {/* Mobile — bottom tube-light pill */}
      <div
        className="md:hidden fixed left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        style={{
          bottom: "max(env(safe-area-inset-bottom), 1rem)",
        }}
      >
        <div className="pointer-events-auto">
          <TubePill mobile />
        </div>
      </div>
    </>
  );
}
