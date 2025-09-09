"use client";

import React from "react";
import Image from "next/image";
import { World, GlobeConfig } from "../components/ui/globe";

const Statement = () => {
  // ❌ HAPUS SEMUA INI - biarkan Globe.tsx yang menentukan styling
  // const globeConfig: GlobeConfig = {
  //   pointSize: 4,
  //   globeColor: "rgba(0, 0, 0, 0)",
  //   showAtmosphere: false,
  //   ...dll
  // };

  // ✅ HANYA set behavior/animation config yang diperlukan
  const globeConfig: GlobeConfig = {
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 1.5,
  };

  // ❌ HAPUS line ini juga, tidak perlu
  // const colors = ["#F59E0B", "#F59E0B", "#F59E0B"];
  
  const data = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: "#F59E0B", // Biarkan ini, tapi Globe.tsx akan override
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: "#F59E0B",
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: "#F59E0B",
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: "#F59E0B",
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: "#F59E0B",
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: "#F59E0B",
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: "#F59E0B",
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: "#F59E0B",
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: "#F59E0B",
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: "#F59E0B",
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: "#F59E0B",
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: "#F59E0B",
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: "#F59E0B",
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: "#F59E0B",
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: "#F59E0B",
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: "#F59E0B",
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: "#F59E0B",
    },
  ];

  return (
    <section className="bg-[#2B2B2B]  text-white overflow-hidden relative py-12 md:py-24">
      {/* Enhanced star particles with amber glow */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary amber stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F59E0B] rounded-full opacity-80 animate-pulse shadow-lg shadow-[#F59E0B]/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Larger amber stars */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-[#F59E0B] rounded-full opacity-60 animate-pulse shadow-lg shadow-[#F59E0B]/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Softer ambient light points */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`soft-${i}`}
            className="absolute w-0.5 h-0.5 bg-[#F59E0B] rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Static decorative particles */}
        <div className="absolute top-[5%] right-[10%] w-2 h-2 rounded-full bg-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/30"></div>
        <div className="absolute top-[15%] right-[20%] w-2 h-2 rounded-full bg-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/30"></div>
        <div className="absolute top-[25%] right-[15%] w-1 h-1 rounded-full bg-[#F59E0B]/50"></div>
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/30"></div>
        <div className="absolute bottom-[15%] right-[30%] w-1 h-1 rounded-full bg-[#F59E0B]/50"></div>
        <div className="absolute bottom-[25%] right-[40%] w-2 h-2 rounded-full bg-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/30"></div>
        <div className="absolute bottom-[45%] left-[5%] w-1 h-1 rounded-full bg-[#F59E0B]/50"></div>
        <div className="absolute bottom-[35%] left-[15%] w-2 h-2 rounded-full bg-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4 text-white">
            There's no better place
            <br />
            for you to <span className="text-[#F59E0B]">raise</span>
          </h2>
        </div>

        {/* First row: Text | Checkout Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-32">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-4 md:mb-6 text-white">
                Convert capital raising into 
                <span className="text-[#F59E0B]"> simple ecommerce</span>
              </h3>
            </div>

            <div className="border-l-4 border-[#F59E0B] pl-4 py-1 text-lg max-w-md text-white/90">
              <p>
                FoundersCrowd converts <span className="text-[#F59E0B] font-semibold">20% higher</span> on average than other fundraising platforms, with the <span className="text-[#F59E0B] font-semibold">lowest fees</span> in the industry — giving your brand exposure to anyone in the world with an internet connection.
              </p>
            </div>
          </div>

          <div className="relative flex justify-center items-center mt-8 md:mt-0">
            <div className="relative">
              <Image
                src="/shopify2.png"
                alt="Checkout Interface"
                width={400}
                height={300}
                className="object-contain w-full max-w-sm md:max-w-md filter drop-shadow-lg"
                priority
              />
              <Image
                src="/shopify1.png"
                alt="Checkout Overlay"
                width={300}
                height={200}
                className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-3/4 md:w-full max-w-xs md:max-w-sm filter drop-shadow-lg"
                priority
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-[#F59E0B]/5 rounded-lg blur-xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Second row: Globe | Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Globe dengan z-index tinggi */}
          <div className="relative h-[300px] md:h-[500px] order-2 md:order-1 z-10">
            <World globeConfig={globeConfig} data={data} />
          </div>

          <div className="order-1 md:order-2 space-y-4 md:space-y-6">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-white">
              Raise capital while building a 
              <span className="text-[#F59E0B]"> global community</span> of supporters
            </h3>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md">
              FoundersCrowd puts your raise within <span className="text-[#F59E0B] font-semibold">60 milliseconds</span> of every potential investor worldwide, with the capacity to handle even the biggest funding launches.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Statement;