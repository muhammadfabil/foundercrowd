"use client";

import Image from "next/image";
import { useEffect, useState, memo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/founderscrowds/30min";

// Memoize CalendlyModal to prevent unnecessary re-renders
const CalendlyModal = memo(function CalendlyModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    // Add the Calendly script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", onEsc);
      // Clean up script if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // Close when clicking backdrop
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Calendly widget container */}
      <div
        className="calendly-inline-widget h-full w-full"
        data-url={url}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on Calendly widget
      ></div>
    </div>
  );
});

export default function CTAP() {
  const [openCalendly, setOpenCalendly] = useState(false);

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
          <button
            onClick={() => setOpenCalendly(true)}
            className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition text-lg"
          >
            Book a Call
          </button>
        </div>
      </div>

      {/* Calendly Modal */}
      {openCalendly && (
        <CalendlyModal
          url={DEFAULT_CALENDLY_URL}
          onClose={() => setOpenCalendly(false)}
        />
      )}
    </section>
  );
}
