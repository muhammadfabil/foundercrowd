"use client";
import { useState, useEffect } from "react";

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
      className="fixed inset-0 z-[9999] grid place-items-center p-4" // Increased z-index to be above navbar
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#AC5B0F]/80 backdrop-blur-sm"
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
        <div className="h-[70vh] min-h-[600px] relative">
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
  
  return (
    <section className="hero-noise relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#AC5B0F] font-montserrat">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h1 className="text-balance text-6xl font-extrabold leading-[0.95] sm:text-7xl md:text-8xl text-[#dbff00] mx-auto" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Invest as <br /> you imagine
        </h1>
        <p className="mt-6 mx-auto text-xl/7 text-white/90" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Experts in{" "}
          <span className="font-semibold underline decoration-[#dbff00] underline-offset-4 text-white">
            Private Equity
          </span>
          {" "}fund investing. From matching to due diligence,
          <br className="hidden sm:block" />
          everything happens in minutes, not months.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setOpenCalendly(true)}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:translate-y-0.5 hover:shadow"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Start Raising
          </button>
          <a
            href="#learn"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Learn more
          </a>
        </div>
      </div>
      
      {/* Calendly Modal */}
      {openCalendly && (
        <CalendlyModal 
          url={calendlyUrl} 
          onClose={() => setOpenCalendly(false)} 
        />
      )}
    </section>
  );
}