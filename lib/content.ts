export type Discipline = {
  slug: string;
  name: string;
  blurb: string;
  tags: string[];
  image: string;
  images: [string, string];
  icon: "Target" | "Zap" | "Flame" | "Shield" | "Swords" | "Dumbbell";
};

export const disciplines: Discipline[] = [
  {
    slug: "boxing",
    name: "Boxing",
    blurb:
      "Footwork, head movement, combinations. Sessions cover technique, conditioning, and live sparring for every level.",
    tags: ["Technique", "Sparring", "Conditioning"],
    image: "/images/gym/boxing-1.jpg",
    images: ["/images/gym/boxing-1.jpg", "/images/gym/boxing-3.jpg"],
    icon: "Target",
  },
  {
    slug: "kickboxing",
    name: "Kickboxing",
    blurb:
      "Stand-up striking with hands, kicks and knees. Taught in a calm, no-ego environment for beginners through competitors.",
    tags: ["Striking", "Pad work", "Drills"],
    image: "/images/gym/kickboxing-1.jpg",
    images: ["/images/gym/kickboxing-1.jpg", "/images/gym/kickboxing-2.jpg"],
    icon: "Zap",
  },
  {
    slug: "muay-thai",
    name: "Muay Thai",
    blurb:
      "The art of eight limbs. Clinch, elbows, knees, and kicks — Thailand-style pad work with experienced coaches. Saturday sparring sessions at 10am and 11am.",
    tags: ["Clinch", "Pads", "Sparring"],
    image: "/images/gym/muay-thai-1.jpg",
    images: ["/images/gym/muay-thai-1.jpg", "/images/gym/muay-thai-3.jpg"],
    icon: "Flame",
  },
  {
    slug: "jiu-jitsu",
    name: "Jiu Jitsu",
    blurb:
      "Brazilian Jiu Jitsu fundamentals and advanced positions. Two-hour classes Tuesday and Thursday evenings for deep work.",
    tags: ["Gi", "No-Gi", "Rolling"],
    image: "/images/gym/jiu-jitsu-1.jpg",
    images: ["/images/gym/jiu-jitsu-2.jpg", "/images/gym/jiu-jitsu-3.jpg"],
    icon: "Shield",
  },
  {
    slug: "mma",
    name: "Mixed Martial Arts",
    blurb:
      "Integrated striking, wrestling, and submissions. For fighters and enthusiasts ready to combine every discipline.",
    tags: ["Striking", "Grappling", "Cage"],
    image: "/images/gym/mma-1.jpg",
    images: ["/images/gym/mma-1.jpg", "/images/gym/mma-4.jpg"],
    icon: "Swords",
  },
  {
    slug: "functional-fitness",
    name: "Functional Fitness",
    blurb:
      "Conditioning, strength, and mobility. Daily sessions from 5:15am — built to support fighters and anyone chasing general fitness. Tracked in SugarWod.",
    tags: ["Strength", "Conditioning", "Mobility"],
    image: "/images/gym/functional-1.jpg",
    images: ["/images/gym/functional-1.jpg", "/images/gym/gym-1.jpeg"],
    icon: "Dumbbell",
  },
];

const DISCIPLINE_SCHEDULE_MATCHERS: Record<Discipline["slug"], (entry: ScheduleEntry) => boolean> = {
  boxing: (e) =>
    (/(?<!kick)boxing/i.test(e.type) || /(?<!kick)boxing/i.test(e.title)) &&
    !/muay thai/i.test(e.title),
  kickboxing: (e) => /kickboxing/i.test(`${e.type} ${e.title}`),
  "muay-thai": (e) => /muay thai/i.test(`${e.type} ${e.title}`),
  "jiu-jitsu": (e) => e.type === "Jiu Jitsu",
  mma: (e) => e.type === "MMA",
  "functional-fitness": (e) => e.type === "Functional" || e.type === "Olympic",
};

export function scheduleForDiscipline(slug: Discipline["slug"]): ScheduleEntry[] {
  const matcher = DISCIPLINE_SCHEDULE_MATCHERS[slug];
  return matcher ? weeklySchedule.filter(matcher) : [];
}

export type Coach = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export const coaches: Coach[] = [
  {
    slug: "head-coach",
    name: "Head Coach",
    role: "Boxing · MMA",
    bio: "Placeholder bio. Decades of competitive experience, specializing in boxing fundamentals and MMA strategy.",
  },
  {
    slug: "muay-thai-coach",
    name: "Muay Thai Coach",
    role: "Muay Thai · Kickboxing",
    bio: "Placeholder bio. Trained in Thailand, brings authentic pad work and clinch to every session.",
  },
  {
    slug: "bjj-coach",
    name: "BJJ Coach",
    role: "Jiu Jitsu",
    bio: "Placeholder bio. Black belt, focused on positional understanding and safe rolling for every level.",
  },
  {
    slug: "conditioning-coach",
    name: "Conditioning Coach",
    role: "Functional Fitness · Olympic Lifting",
    bio: "Placeholder bio. Programming for combat athletes and general members, strength and mobility forward.",
  },
];

export type ScheduleEntry = {
  day: string;
  time: string;
  endTime?: string;
  title: string;
  type:
    | "Boxing"
    | "Kickboxing"
    | "Muay Thai"
    | "Jiu Jitsu"
    | "MMA"
    | "Functional"
    | "Olympic";
};

const weekday = (day: string): ScheduleEntry[] => [
  { day, time: "05:15", title: "Functional Fitness", type: "Functional" },
  { day, time: "06:15", title: "FF + Boxing", type: "Boxing" },
  { day, time: "12:00", title: "Functional Fitness", type: "Functional" },
  { day, time: "15:15", title: "Boxing", type: "Boxing" },
  { day, time: "16:15", title: "FF + Boxing", type: "Boxing" },
  { day, time: "17:15", title: "FF + Boxing", type: "Boxing" },
  { day, time: "18:15", title: "Muay Thai · MMA · Boxing Sparring", type: "MMA" },
  { day, time: "19:15", title: "Muay Thai · Kickboxing", type: "Muay Thai" },
  { day, time: "20:15", title: "MMA", type: "MMA" },
];

export const weeklySchedule: ScheduleEntry[] = [
  ...weekday("Mon"),
  ...weekday("Tue").map((e) =>
    e.time === "18:15"
      ? { ...e, title: "Jiu Jitsu", type: "Jiu Jitsu" as const, endTime: "20:15" }
      : e,
  ),
  ...weekday("Wed"),
  ...weekday("Thu").map((e) =>
    e.time === "18:15"
      ? { ...e, title: "Jiu Jitsu", type: "Jiu Jitsu" as const, endTime: "20:15" }
      : e,
  ),
  { day: "Fri", time: "05:15", title: "Functional Fitness", type: "Functional" },
  { day: "Fri", time: "06:15", title: "FF + Boxing", type: "Boxing" },
  { day: "Fri", time: "12:00", title: "Functional Fitness", type: "Functional" },
  { day: "Fri", time: "16:15", title: "Beginner Boxing", type: "Boxing" },
  { day: "Fri", time: "17:15", title: "Beginner Boxing", type: "Boxing" },
  { day: "Fri", time: "18:00", title: "Olympic Lifting", type: "Olympic" },
  { day: "Fri", time: "18:15", title: "Boxing Sparring", type: "Boxing" },
  { day: "Sat", time: "09:00", title: "Functional Fitness", type: "Functional" },
  { day: "Sat", time: "10:00", title: "Muay Thai Practice", type: "Muay Thai" },
  { day: "Sat", time: "11:00", title: "Muay Thai Sparring", type: "Muay Thai" },
];

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  perks: string[];
};

export const pricing: PricingTier[] = [
  {
    name: "Membership",
    price: "$99.99",
    period: "per month",
    perks: [
      "Unlimited classes across every discipline",
      "Open gym access during staffed hours",
      "Month-to-month — cancel any time, no hidden fees",
      "First day free, walk-in welcome",
    ],
  },
];

export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  discipline: string;
  date: string;
  image: string;
};

// Placeholder testimonials — tone + structure match Factum's real Google reviews.
// Swap `text`, `name`, and `date` with verbatim Google/Facebook reviews once collected.
export const reviews: Review[] = [
  {
    id: "r-1",
    name: "Marcus T.",
    initials: "MT",
    rating: 5,
    text: "Walked in nervous, left already knowing my coach's name. No ego, no fluff — just real technique. Been training six months.",
    discipline: "Boxing",
    date: "2026-02-14",
    image: "/images/gym/boxing-2.jpg",
  },
  {
    id: "r-2",
    name: "Sarah K.",
    initials: "SK",
    rating: 5,
    text: "The Muay Thai class changed how I move. Pad work is legit Thailand-style. Saturday sparring is the highlight of my week.",
    discipline: "Muay Thai",
    date: "2026-01-22",
    image: "/images/gym/muay-thai-3.jpg",
  },
  {
    id: "r-3",
    name: "Devon R.",
    initials: "DR",
    rating: 5,
    text: "Two-hour BJJ blocks are rare. Coaches explain the why behind every position. Rolled my first tournament after four months here.",
    discipline: "Jiu Jitsu",
    date: "2025-12-08",
    image: "/images/gym/jiu-jitsu-3.jpg",
  },
  {
    id: "r-4",
    name: "Alex P.",
    initials: "AP",
    rating: 5,
    text: "Came for cardio, stayed because the functional fitness programming actually makes sense. SugarWod tracking keeps me honest.",
    discipline: "Functional Fitness",
    date: "2025-11-30",
    image: "/images/gym/functional-1.jpg",
  },
];

export const reviewSummary = {
  average: 4.9,
  count: 127,
  source: "Google Reviews",
  // Swap this when the gym provides the live Google Business profile link.
  url: "https://www.google.com/search?q=factum+mma+sandy+utah",
} as const;

export type Announcement = {
  id: string;
  kind: "event" | "notice" | "promo";
  title: string;
  date?: string;
  location?: string;
  body: string;
  cta?: { label: string; href: string };
  active: boolean;
};

export const announcements: Announcement[] = [
  {
    id: "fight-night-ix-2026",
    kind: "event",
    title: "Fight Night IX",
    date: "2026-04-25",
    location: "Factum Fitness MMA · Sandy, UT",
    body: "USA Boxing sanctioned amateur card at the gym. Saturday, April 25.",
    cta: { label: "Details", href: "/contact" },
    active: true,
  },
];
