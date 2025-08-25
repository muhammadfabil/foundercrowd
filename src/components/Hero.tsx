"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

// Add the CalendlyModal component from HorizontalHook
function CalendlyModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    
    // Add the Calendly script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    // Handle loading state
    script.onload = () => {
      // Short timeout to ensure widget initialization
      setTimeout(() => setIsLoading(false), 1000);
    };
    
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
      className="fixed inset-0 z-[9999] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#F3EFE7]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#8A490C]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-medium text-white">Book a call</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-xs bg-white/10 hover:bg-white/15 text-white"
          >
            Close
          </button>
        </div>
        <div className="h-[70vh] min-h-[400px] md:min-h-[600px] relative">
          {/* Loading animation */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#8A490C] z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                <p className="mt-4 text-white/80 text-sm">Loading calendar...</p>
              </div>
            </div>
          )}
          
          {/* Use the Calendly inline widget div structure */}
          <div 
            className="calendly-inline-widget h-full w-full" 
            data-url={url}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function Hero({ calendlyUrl = DEFAULT_CALENDLY_URL }) {
  const [openCalendly, setOpenCalendly] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  const rotatingTexts = [
    "Start up to Watch",
    "Category Creator", 
    "Unicorn Startup",
    "Household Name",
    "Success IPO"
  ];

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
              <img src="/testi1.jpg" alt="" className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-[#F3EFE7]" />
              <img src="/testi2.jpg" alt="" className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-[#F3EFE7]" />
              <img src="/testi3.jpg" alt="" className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border-2 border-[#F3EFE7]" />
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
                    <img 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`logo-set2-${index}`}
                    className="flex-shrink-0 w-20 h-12 lg:w-24 lg:h-12 xl:w-32 xl:h-16 flex items-center justify-center"
                  >
                    <img 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      className="max-w-full max-h-full object-contain"
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
                    <img 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`mobile-logo-set2-${index}`}
                    className="flex-shrink-0 w-16 h-10 flex items-center justify-center"
                  >
                    <img 
                      src="/logo1.png" 
                      alt="Partner Logo" 
                      className="max-w-full max-h-full object-contain"
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