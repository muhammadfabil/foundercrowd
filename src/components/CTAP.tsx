"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CTAButton from "./CTAButton";

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
    <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center isolate">
      {/* BG image dengan positioning yang lebih kuat */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/paralax.jpg"
          alt="City"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Overlay kontras dengan z-index yang jelas */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* Content dengan z-index tertinggi */}
      <div className="relative z-20 text-center space-y-8">
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
          
        >
          <CTAButton size="lg">Book a Call</CTAButton>
        </div>
      </div>
    </section>
  );
}
