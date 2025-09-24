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

// Newsletter Subscription Component
function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 text-center border border-green-200">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanks for subscribing!</h3>
        <p className="text-gray-600">You'll receive our latest insights straight to your inbox.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Get the latest updates</h3>
        <p className="text-gray-600 text-lg">Sign up for our monthly newsletter so you don't miss a thing.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#2B2B2B] hover:bg-gray-800 text-white font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function BlogCTA({ calendlyUrl = DEFAULT_CALENDLY_URL }: { calendlyUrl?: string }) {
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <>
      {/* CTA Section with Hero colors */}
      <div className="bg-[#2B2B2B] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - CTA Content */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Ready to raise your next round?
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  From matching to due diligence, our platform streamlines the investment process, 
                  making everything happen in minutes, not months.
                </p>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  <Image 
                    src="/testi1.jpg" 
                    alt="Investor avatar 1" 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                  />
                  <Image 
                    src="/testi2.jpg" 
                    alt="Investor avatar 2" 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                  />
                  <Image 
                    src="/testi3.jpg" 
                    alt="Investor avatar 3" 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                  />
                </div>
                <span className="text-white/90 font-medium">Trusted by 41,000+ Investors</span>
              </div>

              <button
                onClick={() => setOpenCalendly(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book a Call
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Right side - Newsletter */}
            <div>
              <NewsletterSubscription />
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
    </>
  );
}