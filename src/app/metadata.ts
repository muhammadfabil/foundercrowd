import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Funding - Guiding Founders, Inspiring Investors",
  description: "On a mission to transform how startups raise capital by making the process as easy as buying your favorite product online. From matching to due diligence, our platform streamlines the investment process.",
  keywords: [
    "startup funding",
    "venture capital",
    "investors",
    "fundraising",
    "startup platform",
    "due diligence",
    "investment matching",
    "Space Funding"
  ],
  authors: [{ name: "Space Funding" }],
  creator: "Space Funding",
  publisher: "Space Funding",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Space Funding.com",
    title: "Space Funding - Guiding Founders, Inspiring Investors",
    description: "Transform how startups raise capital. From matching to due diligence, our platform streamlines the investment process in minutes, not months.",
    siteName: "Space Funding",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Space Funding - Startup Funding Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Funding - Guiding Founders, Inspiring Investors",
    description: "Transform how startups raise capital. From matching to due diligence, our platform streamlines the investment process in minutes, not months.",
    images: ["/og-image.png"],
    creator: "@Space Funding",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#f2f5ff",
    "color-scheme": "light",
  },
};
