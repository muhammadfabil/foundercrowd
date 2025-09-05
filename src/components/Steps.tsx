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
    title: "Done",
    
  }

];

// Ganti komponen CalendlyModal dengan versi sederhana
function CalendlyModal({
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
      onClick={onClose}
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
        onClick={e => e.stopPropagation()}
      ></div>
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
              Simple, e-commerce style investor  experience.
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
                const isLast = index === stepsData.length - 1;

                return (
                  <div key={step.id} id={`step-${step.id}`} className="relative">
                    {/* Timeline Line - only show if not last item */}
                    {index < stepsData.length - 1 && (
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
                        {!isLast && (
                          <div className="mb-2">
                            <span 
                              className={`text-sm font-medium transition-colors duration-300 ${
                                isCompleted ? 'text-gray-900' : 'text-gray-500'
                              }`}
                            >
                              Step {step.id}
                            </span>
                          </div>
                        )}
                        <h3 
                          className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                            isCompleted ? 'text-gray-900' : 'text-gray-600'
                          }`}
                        >
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        )}
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