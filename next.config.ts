import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.files.wordpress.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i1.wp.com" },
      { protocol: "https", hostname: "i2.wp.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "beehiiv-images-production.s3.amazonaws.com" },
      { protocol: "https", hostname: "media.beehiiv.com" },
      { protocol: "https", hostname: "cdn.beehiiv.com" },
    ],
  },
  /* config options here */
};

export default nextConfig;
