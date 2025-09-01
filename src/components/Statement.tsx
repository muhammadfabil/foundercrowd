"use client";

import React from "react";
import Image from "next/image";
import { World, GlobeConfig } from "../components/ui/globe";

const Statement = () => {
  const globeConfig: GlobeConfig = {
    pointSize: 4,
    globeColor: "#0a1a2a", // Dark blue-black base
    showAtmosphere: true, // Enable for neon glow
    atmosphereColor: "#00ccff", // Bright cyan atmosphere
    atmosphereAltitude: 0.2, // Strong glow effect
    emissive: "#001155", // Dark blue emissive
    emissiveIntensity: 0.4, // Higher for glow
    shininess: 0.9, // High shine for neon effect
    polygonColor: "rgba(255, 255, 255, 0.8)", // Bright white countries for continent visibility
    ambientLight: "#001144",
    directionalLeftLight: "#00aaff",
    directionalTopLight: "#0088cc",
    pointLight: "#00ccff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 1.5, // Increased from 0.5 to 1.5 for faster rotation
  };

  // Change all colors to neon cyan
  const colors = ["#00ffff", "#00ffff", "#00ffff"];
  const data = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: "#00ffff", // Neon cyan
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: "#00ffff",
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: "#00ffff",
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: "#00ffff",
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: "#00ffff",
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: "#00ffff",
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: "#00ffff",
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: "#00ffff",
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: "#00ffff",
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: "#00ffff",
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: "#00ffff",
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: "#00ffff",
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: "#00ffff",
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: "#00ffff",
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: "#00ffff",
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: "#00ffff",
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: "#00ffff",
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: "#00ffff",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#041E18] to-black text-white overflow-hidden relative py-12 md:py-24">
      {/* Enhanced star particles with cyan glow */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70 animate-pulse shadow-lg shadow-cyan-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-50 animate-pulse shadow-lg shadow-cyan-300/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Existing dotted particles with cyan theme */}
        <div className="absolute top-[5%] right-[10%] w-2 h-2 rounded-full bg-cyan-400/30 shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute top-[15%] right-[20%] w-2 h-2 rounded-full bg-cyan-400/30 shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute top-[25%] right-[15%] w-1 h-1 rounded-full bg-cyan-400/30"></div>
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-cyan-400/30 shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute bottom-[15%] right-[30%] w-1 h-1 rounded-full bg-cyan-400/30"></div>
        <div className="absolute bottom-[25%] right-[40%] w-2 h-2 rounded-full bg-cyan-400/30 shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute bottom-[45%] left-[5%] w-1 h-1 rounded-full bg-cyan-400/30"></div>
        <div className="absolute bottom-[35%] left-[15%] w-2 h-2 rounded-full bg-cyan-400/30 shadow-lg shadow-cyan-400/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4">
            There's no better place
            <br />
            for you to raise
          </h2>
        </div>

        {/* First row: Text | Checkout Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-32">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-4 md:mb-6">
                The world's best-
                <br />converting checkout
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 md:space-x-24">
              <div className="space-y-1">
                <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  Higher Conversions
                </p>
                <p className="text-5xl md:text-6xl font-medium">
                  15
                  <span className="text-2xl md:text-3xl align-top">%</span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  High-Intent Shoppers
                </p>
                <p className="text-5xl md:text-6xl font-medium">
                  150M
                  <span className="text-2xl md:text-3xl align-top">+</span>
                </p>
              </div>
            </div>

            <div className="border-l-4 border-emerald-400 pl-4 py-1 text-sm max-w-md text-white/80">
              <p>
                FounderCrowd converts 15% higher on average than other commerce
                platforms and exposes your brand to 150 million buy-ready
                investors.
              </p>
              <p className="text-white/60 text-xs mt-3">
                Based on external study with a Big Three global consulting firm
                in April, 2023.
              </p>
            </div>
          </div>

          <div className="relative flex justify-center items-center mt-8 md:mt-0">
            <Image
              src="/shopify2.png"
              alt="Checkout Interface"
              width={400}
              height={300}
              className="object-contain w-full max-w-sm md:max-w-md"
              priority
            />
            <Image
              src="/shopify1.png"
              alt="Checkout Overlay"
              width={300}
              height={200}
              className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-3/4 md:w-full max-w-xs md:max-w-sm"
              priority
            />
          </div>
        </div>

        {/* Second row: Globe | Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Removed border and background, globe seamlessly blends */}
          <div className="relative h-[300px] md:h-[500px] order-2 md:order-1 overflow-hidden">
            <World globeConfig={globeConfig} data={data} />
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6">
              Rock steady
              <br />
              and blazing fast
            </h3>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-md">
              FounderCrowd puts your raise within 60 milliseconds of every
              investor on the planet, with the capacity to handle even the most
              epic product drops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statement;