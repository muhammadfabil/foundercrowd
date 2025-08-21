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

const Steps = ({ calendlyUrl = DEFAULT_CALENDLY_URL }) => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers = new Map();

    stepsData.forEach((step) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps(prev => new Set([...prev, step.id]));
            } else {
              // Remove from visible steps when scrolling back up
              setVisibleSteps(prev => {
                const newSet = new Set(prev);
                newSet.delete(step.id);
                return newSet;
              });
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the element is visible
          rootMargin: '-50px 0px -50px 0px' // Add some margin for better UX
        }
      );

      observers.set(step.id, observer);
    });

    // Observe all step elements after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      stepsData.forEach((step) => {
        const element = document.getElementById(`step-${step.id}`);
        if (element) {
          observers.get(step.id)?.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  return (
    <section className="py-20 bg-white font-figtree">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Side - Fixed Content */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-6">
              <span className="text-sm text-gray-500 font-medium">Investor Checkout</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
              Simple, e-commerce style investor checkout experience.
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Investors are guided through a linear investment creation process – no side quests, no ambiguity.
            </p>
            <button 
              onClick={() => setOpenCalendly(true)}
              className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Try it yourself
            </button>
          </div>

          {/* Right Side - Scrollable Timeline */}
          <div className="w-full lg:w-3/5">
            <div className="space-y-12">
              {stepsData.slice(0, 10).map((step, index) => {
                const isCompleted = visibleSteps.has(step.id);
                
                return (
                  <div key={step.id} id={`step-${step.id}`} className="relative">
                    {/* Timeline Line - only show if not last item */}
                    {index < 9 && (
                      <div 
                        className={`absolute left-4 top-9 w-px h-full transition-colors duration-500 ${
                          isCompleted ? 'bg-gray-900' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                    
                    <div className="flex items-start gap-6">
                      {/* Timeline Dot */}
                      <div 
                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 mt-1 transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-gray-900 scale-110' 
                            : 'bg-gray-300'
                        }`}
                      >
                        {isCompleted ? (
                          <svg 
                            width="14" 
                            height="10" 
                            viewBox="0 0 14 10" 
                            fill="none" 
                            className="text-orange-500"
                          >
                            <path 
                              d="M1 5L5 9L13 1" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pb-2">
                        <div className="mb-2">
                          <span 
                            className={`text-sm font-medium transition-colors duration-300 ${
                              isCompleted ? 'text-gray-900' : 'text-gray-500'
                            }`}
                          >
                            Step {step.id}
                          </span>
                        </div>
                        <h3 
                          className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                            isCompleted ? 'text-gray-900' : 'text-gray-600'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
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