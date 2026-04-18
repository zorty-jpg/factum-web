import {
  Dumbbell,
  Flame,
  Shield,
  Swords,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Discipline } from "@/lib/content";

const ICON_MAP: Record<Discipline["icon"], LucideIcon> = {
  Target,
  Zap,
  Flame,
  Shield,
  Swords,
  Dumbbell,
};

export default function DisciplineIcon({
  name,
  size = 20,
  className,
}: {
  name: Discipline["icon"];
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  return <Icon size={size} strokeWidth={1.5} className={className} aria-hidden />;
}
