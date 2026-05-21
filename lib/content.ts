export const pricing = {
  monthly: 99.99,
  weeksPerMonth: 4.33,
  dropInRate: 25,
} as const;

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
    name: "Jiu Jitsu Coach",
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
  { day, time: "06:15", title: "Functional Fitness + Boxing", type: "Boxing" },
  { day, time: "12:00", title: "Functional Fitness", type: "Functional" },
  { day, time: "15:15", title: "Boxing", type: "Boxing" },
  { day, time: "16:15", title: "Functional Fitness + Boxing", type: "Boxing" },
  { day, time: "17:15", title: "Functional Fitness + Boxing", type: "Boxing" },
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
  { day: "Fri", time: "06:15", title: "Functional Fitness + Boxing", type: "Boxing" },
  { day: "Fri", time: "12:00", title: "Functional Fitness", type: "Functional" },
  { day: "Fri", time: "16:15", title: "Beginner Boxing", type: "Boxing" },
  { day: "Fri", time: "17:15", title: "Beginner Boxing", type: "Boxing" },
  { day: "Fri", time: "18:00", title: "Olympic Lifting", type: "Olympic" },
  { day: "Fri", time: "18:15", title: "Boxing Sparring", type: "Boxing" },
  { day: "Sat", time: "09:00", title: "Functional Fitness", type: "Functional" },
  { day: "Sat", time: "10:00", title: "Muay Thai Practice", type: "Muay Thai" },
  { day: "Sat", time: "11:00", title: "Muay Thai Sparring", type: "Muay Thai" },
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

// Verbatim reviews pulled from Factum's public Google + Groupon listings.
export const reviews: Review[] = [
  {
    id: "r-1",
    name: "Grayson",
    initials: "G",
    rating: 5,
    text: "Amazing gym, all the coaches are very supportive, and friendly. They offer a variety of classes and the coaches do an incredible job of making the classes educational, fun, and rewarding. I would 100% recommend this gym to anyone wanting to try Boxing, Jiu Jitsu, or MMA.",
    discipline: "MMA",
    date: "2025-09-15",
    image: "/images/gym/mma-1.jpg",
  },
  {
    id: "r-2",
    name: "Alex Lucero",
    initials: "AL",
    rating: 5,
    text: "I have been coming to Factum (specifically for CrossFit) for just over one year. This gym is amazing. The coaches are all excellent and I have learned so much from them. I have made so many friends and find it to be an extremely welcoming community.",
    discipline: "Functional Fitness",
    date: "2022-04-10",
    image: "/images/gym/functional-1.jpg",
  },
  {
    id: "r-3",
    name: "China",
    initials: "CH",
    rating: 5,
    text: "I can't say enough about how awesome this gym is. The staff and participants are all so friendly and willing to help. My teen daughter absolutely loves going — it's her first experience with boxing and she loved it the first day.",
    discipline: "Boxing",
    date: "2024-07-18",
    image: "/images/gym/boxing-1.jpg",
  },
  {
    id: "r-4",
    name: "Mike",
    initials: "M",
    rating: 5,
    text: "Excellent gym and staff. I hesitate to give an honest review because I don't want it to get too busy — but Factum is the best value and the best instructors I've found in Salt Lake or Davis County.",
    discipline: "Boxing",
    date: "2024-05-02",
    image: "/images/gym/boxing-2.jpg",
  },
];

export const reviewSummary = {
  average: 4.7,
  count: 119,
  source: "Google Reviews",
  url: "https://www.google.com/search?q=Factum+Functional+Fitness+Boxing+Jiu+Jitsu+Kickboxing+Midvale",
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
