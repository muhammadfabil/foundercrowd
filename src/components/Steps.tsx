"use client";

import React, { useState, useEffect } from 'react';

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const stepsData = [
  {
    id: 1,
    title: "Create Account",
    description: "Investor sign-up or login with Magic Link authentication"
  },
  {
    id: 2,
    title: "Investment Details",
    description: "Select investor type, enter investment amount"
  },
  {
    id: 3,
    title: "Investor Payment",
    description: "Choose payment method, provide details"
  },
  {
    id: 4,
    title: "Sign Agreements",
    description: "Review agreement with pre-filled investment details, complete e-signature"
  },
  {
    id: 5,
    title: "Document Verification",
    description: "Upload required identification and financial documents"
  },
  {
    id: 6,
    title: "Background Check",
    description: "Complete automated background verification process"
  },
  {
    id: 7,
    title: "Fund Transfer",
    description: "Transfer investment funds through secure banking channels"
  },
  {
    id: 8,
    title: "Investment Confirmation",
    description: "Receive investment confirmation and portfolio allocation details"
  },
  {
    id: 9,
    title: "Portfolio Setup",
    description: "Configure investment dashboard and notification preferences"
  },
  {
    id: 10,
    title: "Welcome Package",
    description: "Access investor resources and quarterly reporting schedule"
  }
];

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

const Steps = ({ calendlyUrl = DEFAULT_CALENDLY_URL }) => {
  const [openCalendly, setOpenCalendly] = useState(false);
  
  return (
    <section className="py-16 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Side - Fixed Content */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">Investor Checkout</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple, e-commerce style investor checkout experience.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Investors are guided through a linear investment creation process – no side quests, no ambiguity.
            </p>
            <button 
              onClick={() => setOpenCalendly(true)}
              className="bg-[#AC5B0F] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8B4A0C] transition-colors"
            >
              Raise the Fund Now!
            </button>
          </div>

          {/* Right Side - Scrollable Timeline */}
          <div className="w-full lg:w-3/5">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#AC5B0F]"></div>
              
              {stepsData.map((step) => (
                <div key={step.id} className="relative flex items-start mb-8 last:mb-0">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#AC5B0F] bg-white">
                    <div className="w-3 h-3 rounded-full bg-[#AC5B0F]"></div>
                  </div>

                  {/* Step Content */}
                  <div className="ml-6 flex-1">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Step {step.id}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Final "Done!" step */}
              <div className="relative flex items-start">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#AC5B0F] bg-white">
                  <div className="w-3 h-3 rounded-full bg-[#AC5B0F]"></div>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Done!
                  </h3>
                </div>
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
    </section>
  );
};

export default Steps;