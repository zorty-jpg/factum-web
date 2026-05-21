import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { site } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://factumfitness.com";
const DEFAULT_TITLE = "Factum — Boxing, Kickboxing, MMA";
const DEFAULT_DESCRIPTION =
  "Factum Fitness MMA — Sandy, Utah. Boxing, kickboxing, Muay Thai, Jiu Jitsu, and functional fitness.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Factum",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: site.name,
  keywords: [
    "Factum Fitness",
    "boxing gym Sandy Utah",
    "MMA gym Utah",
    "kickboxing Utah",
    "Muay Thai Sandy",
    "Jiu Jitsu Utah",
    "functional fitness",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full pb-[calc(env(safe-area-inset-bottom)+7rem)] md:pb-0">
        <MotionProvider>
          <Nav />
          {children}
          <Footer />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
