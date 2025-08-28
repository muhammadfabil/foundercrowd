'use client';
import { useState } from "react";
import type { Metadata } from "next";
import { Figtree, Roboto, Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import PreLoader from "@/components/PreLoader";

// Update the font configuration to ensure it loads correctly
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-figtree",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const wixMadeforText = Wix_Madefor_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-wix-madefor",
});

// Note: metadata needs to be exported from a separate file when using 'use client'
// Create src/app/metadata.ts for metadata export

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Preloader dinonaktifkan dengan mengatur nilai default state menjadi false
  const [showPreloader, setShowPreloader] = useState(false);

  return (
    <html lang="en" className={`${figtree.variable} ${roboto.variable} ${wixMadeforText.variable}`}>
      <head>
        <title>Founderscrowd</title>
        <meta name="description" content="On a mission to transform how startups raise capital by making the process as easy as buying your favorite product online." />
        <link rel="icon" href="/logo.png" type="image/png" sizes="128x128" />
      </head>
      <body className={`antialiased ${figtree.className}`}>
        {showPreloader && (
          <PreLoader onComplete={() => setShowPreloader(false)} />
        )}
        {!showPreloader && children}
        <Analytics />
      </body>
    </html>
  );
}
