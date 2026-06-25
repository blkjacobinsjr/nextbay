// root layout — wraps every page.
// sets fonts, global background, hydration fix.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// two font variables — sans for body, mono for code/metrics
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextBay",
  description: "Underground marketplace — Recap Project 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // font variables go on <html> so all descendants can use them via tailwind
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (like cookie-editors) inject
          attributes onto <body> that the server didn't render. react would throw a
          hydration mismatch. this tells react: ignore attribute diffs on this element. */}
      {/* bg-neutral-950 on <body> — not just <main>. prevents white borders on overflow. */}
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
