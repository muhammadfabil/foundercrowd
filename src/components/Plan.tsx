"use client"
import React, { useState, useEffect } from 'react';
import { FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const planData = [
  {
    id: 1,
    type: "Via Reg CF",
    subtitle: "Raise up to",
    amount: "$5M",
    description: "Anyone can invest",
    icon: FiUsers
  },
  {
    id: 2,
    type: "Via Reg A",
    subtitle: "Raise up to", 
    amount: "$75M",
    description: "Anyone can invest",
    icon: FiTrendingUp
  },
  {
    id: 3,
    type: "Via Reg D",
    subtitle: "Raise up to",
    amount: "∞",
    description: "Accredited investors only",
    icon: FiShield
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

const Plan = ({ calendlyUrl = DEFAULT_CALENDLY_URL }) => {
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <section className="py-20 bg-gray-50 font-montserrat">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Capital Raising, Revolutionized
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Craft the perfect offering with control over raise amount, valuation, voting 
            rights, and beyond. With us, your strategy takes center stage.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planData.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.id} className="relative group">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#AC5B0F]/5 to-[#1e3a8a]/5 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Main Circle */}
                <div className="relative bg-white rounded-full aspect-square flex flex-col items-center justify-center p-12 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#AC5B0F]">

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#AC5B0F]/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#AC5B0F]" />
                    </div>
                  </div>

                  {/* Plan Type */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {plan.type}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.subtitle}
                  </p>

                  {/* Amount */}
                  <div className="text-4xl font-bold text-[#AC5B0F] mb-6">
                    {plan.amount}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-black text-center mb-6">
                    {plan.description}
                  </p>

                  {/* Arrow Button */}
                  <button 
                    onClick={() => setOpenCalendly(true)}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#AC5B0F] hover:bg-[#AC5B0F] group/btn transition-all duration-300"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors duration-300"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => setOpenCalendly(true)}
            className="bg-[#AC5B0F] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8B4A0C] transition-colors duration-300"
          >
            Start Raising Today
          </button>
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

export default Plan;