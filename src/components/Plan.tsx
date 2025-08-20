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
      className="fixed inset-0 z-[9999] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Book a call</h3>
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
        <div className="h-[70vh] min-h-[600px] relative">
          {/* Loading animation */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 text-sm">Loading calendar...</p>
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
    <section className="py-24 bg-white font-figtree">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-medium text-gray-900 mb-6 leading-tight">
            Capital Raising,<br />
            <span className="text-orange-500">Revolutionized</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Craft the perfect offering with control over raise amount, valuation, voting 
            rights, and beyond.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {planData.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.id} className="group">
                <div className="bg-white border  rounded-3xl p-8 hover:border-amber-500 hover:shadow-lg transition-all duration-300 h-full border-black hover:cursor-pointer">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Plan Type */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {plan.type}
                  </h3>
                  
                  {/* Subtitle & Amount */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">
                      {plan.subtitle}
                    </p>
                    <div className="text-4xl font-bold text-black">
                      {plan.amount}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-8">
                    {plan.description}
                  </p>

                  {/* CTA Button */}
                  <button 
                    onClick={() => setOpenCalendly(true)}
                    className="hover:cursor-pointer w-full py-3 px-6 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Get Started
                    <svg 
                      className="w-4 h-4"
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
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to revolutionize your fundraising?
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Join thousands of companies who have successfully raised capital with our platform.
            </p>
          </div>
          <button 
            onClick={() => setOpenCalendly(true)}
            className="bg-orange-500 text-white px-10 py-4 rounded-full font-medium hover:bg-orange-600 transition-colors duration-300 text-lg"
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