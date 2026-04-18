import type { Metadata, Viewport } from "next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Factum — Boxing, Kickboxing, MMA",
  description:
    "Factum Fitness MMA — Sandy, Utah. Boxing, kickboxing, Muay Thai, BJJ, and functional fitness.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <MotionProvider>
          <Nav />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
