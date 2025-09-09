"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CTAP() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
    });
  }, []);

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
          <div
            className="bg-white rounded-full p-3 shadow-lg relative"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1200"
            data-aos-easing="ease-in-out"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255, 165, 0, 0.5))",
              }}
            />
            {/* Sunrise glow effect */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[140%] h-20 bg-gradient-to-t from-orange-300 to-transparent opacity-70 rounded-full blur-xl -z-10"
              data-aos="fade-in"
              data-aos-delay="300"
              data-aos-duration="1500"
            ></div>
          </div>
          <h2
            className="text-white text-2xl md:text-3xl font-bold tracking-wider"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            FOUNDERSCROWD
          </h2>
        </div>

        {/* Main Heading */}
        <h1
          className="text-white font-extrabold leading-[0.9] tracking-tight"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          <span className="block text-[12vw] md:text-[6vw] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            START RAISING
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/95 text-lg md:text-2xl"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Your Vision. Your Terms.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex gap-4 justify-center pt-4"
          data-aos="fade-up"
          data-aos-delay="750"
        >
          <button className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition text-lg">
            Book a Call
          </button>
          
        </div>
      </div>
    </section>
  );
}
