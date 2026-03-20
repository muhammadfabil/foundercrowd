"use client";
import { useState, useEffect, memo } from "react";
import Image from 'next/image';
import CTAButton from './CTAButton'; // Replace CalendlyModal import

// Rotating texts extracted as constant for better performance
const rotatingTexts = [
  "Start up to Watch",
  "Category Creator",
  "Unicorn Startup",
  "Game Changer in Sports",
  "Household Name",
  "Success IPO"
];

export function Hero({ calendlyUrl }: { calendlyUrl?: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  // Add text rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-noise relative pb-8 md:pb-8 lg:pb-8 pt-24 md:pt-40 flex flex-col items-center min-h-[100dvh] md:min-h-[90svh] overflow-hidden bg-black font-figtree">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src="/EarthVideo.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" aria-hidden="true" />
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust indicators */}
        <div className="flex justify-center mb-6 md:mb-4 lg:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex -space-x-1 md:-space-x-2">
              <Image
                src="/testi1.jpg"
                alt="Testimonial avatar 1"
                width={32}
                height={32}
                className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white"
                priority={true}
              />
              <Image
                src="/testi2.jpg"
                alt="Testimonial avatar 2"
                width={32}
                height={32}
                className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white"
                priority={true}
              />
              <Image
                src="/testi3.jpg"
                alt="Testimonial avatar 3"
                width={32}
                height={32}
                className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white"
                priority={true}
              />
            </div>
            <span className="text-sm md:text-xs lg:text-sm text-white font-medium">Trusted by 41,000+ Investors</span>
          </div>
        </div>

        {/* Main headline with rotating text */}
        <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] md:leading-tight text-white mx-auto mb-4 md:mb-0">
          Be the next,<br />
          <span className="block relative h-[1.2em] overflow-hidden">
            {rotatingTexts.map((text, index) => (
              <span
                key={text}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentText
                    ? 'transform translate-y-0 opacity-100'
                    : index === (currentText - 1 + rotatingTexts.length) % rotatingTexts.length
                      ? 'transform -translate-y-full opacity-0'
                      : 'transform translate-y-full opacity-0'
                  }`}
                style={{
                  color: '#5271ff' // amber-500 color for highlighted text
                }}
              >
                {text}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle - improved mobile spacing */}
        <p className="mt-4 md:mt-4 lg:mt-6 mx-auto text-base md:text-base lg:text-lg text-white/90 max-w-sm md:max-w-lg lg:max-w-2xl leading-relaxed px-2 md:px-0">
          From matching to due diligence, our platform streamlines the investment process,
          making everything happen in minutes, not months.
        </p>

        {/* CTA Button - Updated to use CTAButton */}
        <div className="mt-6 md:mt-6 lg:mt-10 flex flex-col sm:flex-row items-center justify-center">
          <CTAButton

            size="md"
            className="w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Start Raising
          </CTAButton>
        </div>

        {/* Hero video - improved mobile spacing and sizing */}
        <div className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 relative mx-auto max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-lg border border-gray-100">
            <iframe
              src="https://player.vimeo.com/video/1032029906?h=0&autoplay=1&loop=1&muted=1"
              className="h-full w-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Platform demo video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
