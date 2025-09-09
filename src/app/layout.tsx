'use client';
import { useState } from "react";
import type { Metadata } from "next";
import { Figtree, Roboto, Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import PreLoader from "@/components/PreLoader";
import Script from "next/script";

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
  // Preloader diaktifkan dengan mengatur nilai default state menjadi true
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <html lang="en" className={`${figtree.variable} ${roboto.variable} ${wixMadeforText.variable}`}>
      <head>
        <title>Founderscrowd</title>
        <meta name="description" content="On a mission to transform how startups raise capital by making the process as easy as buying your favorite product online." />
        <meta name="google-site-verification" content="OJg5TBwEzS6H1CaNpmpE_8rSFuKMcLJNsPr7CAJgce8" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="128x128" />
      </head>
      <body className={`antialiased ${figtree.className}`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8VZMEWPY7D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8VZMEWPY7D');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "t7xly4chok");
          `}
        </Script>

        {showPreloader && (
          <PreLoader onComplete={() => setShowPreloader(false)} />
        )}
        {!showPreloader && children}
        <Analytics />
      </body>
    </html>
  );
}
