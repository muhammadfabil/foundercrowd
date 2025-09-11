"use client";
import { useState, useEffect, memo } from "react";
import Image from 'next/image';

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/founderscrowds/30min";

// Rotating texts extracted as constant for better performance
const rotatingTexts = [
  "Start up to Watch",
  "Category Creator", 
  "Unicorn Startup",
  "Game Changer in Sports",
  "Household Name",
  "Success IPO"
];

// Update the CalendlyModal component to match Navbar
export const CalendlyModal = memo(function CalendlyModal({
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
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

export function Hero({ calendlyUrl = DEFAULT_CALENDLY_URL }) {
  const [openCalendly, setOpenCalendly] = useState(false);
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
    <section className="hero-noise relative pb-8 md:pb-8 lg:pb-8 pt-24 md:pt-40 flex flex-col items-center min-h-[100svh] md:min-h-[90svh] overflow-hidden bg-[#2B2B2B] font-figtree">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust indicators */}
        <div className="flex justify-center mb-6 md:mb-4 lg:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex -space-x-1 md:-space-x-2">
              <Image 
                src="/testi1.jpg" 
                alt="Testimonial avatar 1" 
                width={32} 
                height={32} 
                className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-[#F3EFE7]" 
                priority={true}
              />
              <Image 
                src="/testi2.jpg" 
                alt="Testimonial avatar 2" 
                width={32} 
                height={32} 
                className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-[#F3EFE7]" 
                priority={true}
              />
              <Image 
                src="/testi3.jpg" 
                alt="Testimonial avatar 3" 
                width={32} 
                height={32} 
                className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-[#F3EFE7]" 
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
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  index === currentText
                    ? 'transform translate-y-0 opacity-100'
                    : index === (currentText - 1 + rotatingTexts.length) % rotatingTexts.length
                    ? 'transform -translate-y-full opacity-0'
                    : 'transform translate-y-full opacity-0'
                }`}
                style={{
                  color: '#f59e0b' // amber-500 color for highlighted text
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

        {/* CTA Button - improved mobile layout */}
        <div className="mt-6 md:mt-6 lg:mt-10 flex flex-col sm:flex-row items-center justify-center">
          <button
            onClick={() => setOpenCalendly(true)}
            className="rounded-full w-full sm:w-auto bg-amber-600 px-8 py-4 md:px-6 md:py-3 text-base md:text-sm font-semibold text-white shadow-lg transition hover:bg-white hover:text-black hover:shadow-xl max-w-xs sm:max-w-none"
          >
            Start Raising
          </button>
        </div>
        
        {/* Hero video - improved mobile spacing and sizing */}
        <div className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 relative mx-auto max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-lg border border-gray-100">
            <iframe 
              src="https://player.vimeo.com/video/1115691817?h=0&autoplay=1&loop=1&muted=1"
              className="h-full w-full"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
              title="Platform demo video"
            />
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Logo Section - improved mobile */}
      <div className="w-full mt-8 md:mt-16 lg:mt-20 xl:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop version - horizontal */}
          <div className="hidden md:flex items-center">
            {/* "As Seen On" text - fixed position */}
            <div className="flex-shrink-0 mr-2 lg:mr-16 z-20">
              <p className="text-sm lg:text-base text-white whitespace-nowrap font-bold">As Seen On</p>
            </div>
            
            {/* Logo scrolling container */}
            <div className="flex-1 relative overflow-hidden">
              {/* Gradient fade effects */}
              <div className="absolute left-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-r from-[#2B2B2B] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-l from-[#2B2B2B] to-transparent z-10"></div>
              
              {/* Scrolling logos horizontal */}
              <div className="flex animate-scroll-horizontal items-center space-x-6 lg:space-x-12">
                {/* First set of logos */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`logo-set1-${index}`}
                    className="flex-shrink-0 w-20 h-12 lg:w-24 lg:h-12 xl:w-32 xl:h-16 flex items-center justify-center"
                  >
                    <Image 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      width={128} 
                      height={64} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`logo-set2-${index}`}
                    className="flex-shrink-0 w-20 h-12 lg:w-24 lg:h-12 xl:w-32 xl:h-16 flex items-center justify-center"
                  >
                    <Image 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      width={128} 
                      height={64} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile version - improved layout */}
          <div className="md:hidden">
            <div className="text-center mb-4">
              <p className="text-sm text-white font-bold">As Seen On</p>
            </div>
            
            <div className="relative overflow-hidden">
              {/* Gradient fade effects for horizontal */}
              <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-r from-[#2B2B2B] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-6 h-full bg-gradient-to-l from-[#2B2B2B] to-transparent z-10"></div>
              
              {/* Horizontal scrolling logos */}
              <div className="flex animate-scroll-horizontal items-center space-x-4">
                {/* First set of logos */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`mobile-logo-set1-${index}`}
                    className="flex-shrink-0 w-16 h-10 flex items-center justify-center"
                  >
                    <Image 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      width={64} 
                      height={40} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`mobile-logo-set2-${index}`}
                    className="flex-shrink-0 w-16 h-10 flex items-center justify-center"
                  >
                    <Image 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      width={64} 
                      height={40} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendly Modal */}
      {openCalendly && (
        <CalendlyModal 
          url={calendlyUrl} 
          onClose={() => setOpenCalendly(false)} 
        />
      )}

      {/* Update the CSS as well */}
      <style jsx>{`
        /* Horizontal animation for both desktop and mobile */
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-horizontal {
          animation: scroll-horizontal 25s linear infinite;
          width: calc(200%);
        }
        
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
        
        /* Slower animation for mobile */
        @media (max-width: 768px) {
          .animate-scroll-horizontal {
            animation: scroll-horizontal 30s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}