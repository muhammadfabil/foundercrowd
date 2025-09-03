"use client";

import Image from "next/image";

export default function ParallaxHero() {
  return (
    <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* BG image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/paralax.jpg"
          alt="City"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay kontras */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* Content */}
      <div className="text-center space-y-8 z-10">
        {/* Logo + Brand */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wider">
            FOUNDERSCROWD
          </h2>
        </div>

        {/* Main Heading */}
        <h1 className="text-white font-extrabold leading-[0.9] tracking-tight">
          <span className="block text-[12vw] md:text-[6vw] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            START RAISING
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/95 text-lg md:text-2xl">Your Vision. Your Terms.</p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <button className="px-8 py-4 bg-teal-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition text-lg">
            Book a Call
          </button>
          <button className="px-8 py-4 border border-white/80 text-white font-semibold rounded-full backdrop-blur-md hover:bg-white hover:text-black transition text-lg">
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
