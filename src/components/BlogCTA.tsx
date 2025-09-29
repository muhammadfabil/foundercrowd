"use client";

import { useState } from "react";
import Image from "next/image";

// Default Calendly URL
const DEFAULT_CALENDLY_URL = "https://calendly.com/founderscrowds/30min";

// Calendly Modal
function CalendlyModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        className="calendly-inline-widget h-full w-full" 
        data-url={url}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default function BlogCTA({ calendlyUrl = DEFAULT_CALENDLY_URL }: { calendlyUrl?: string }) {
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <>
      {/* CTA Section - Simplified */}
      <section className="py-16 px-4 md:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          {/* Card Container */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 shadow-xl">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left Content */}
              <div className="px-8 md:px-12 py-12 md:py-16">
                {/* Logo */}
                <div className="mb-6">
                  <div className="bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-md">
                    <Image
                      src="/logo.png"
                      alt="FoundersCrowd"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                  The ultimate platform for{" "}
                  <span className="block">raising capital online</span>
                </h2>

                {/* CTA Button */}
                <button
                  onClick={() => setOpenCalendly(true)}
                  className="bg-gray-900 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                >
                  Talk to the experts
                </button>
              </div>

              {/* Right Image */}
              <div className="relative h-80 md:h-96">
                <div className="absolute inset-16 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/paralax.jpg"
                    alt="Platform"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 30vw, 15vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Modal */}
      {openCalendly && (
        <CalendlyModal 
          url={calendlyUrl} 
          onClose={() => setOpenCalendly(false)} 
        />
      )}
    </>
  );
}