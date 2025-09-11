"use client";
import React, { useState, useEffect, memo, useCallback, useMemo } from "react";

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const testimonials = [
  { id: 1, name: "Sarah Johnson", username: "@sarahj_founder", avatar: "SJ", text: "FounderCrowd made raising capital so much easier. The process was streamlined and professional.", platform: "twitter", link: "https://twitter.com/sarahj_founder/status/1234567890" },
  { id: 2, name: "Michael Chen", username: "@mikec_startup", avatar: "MC", text: "Finally, a platform that understands what founders need. Highly recommended!", platform: "linkedin", link: "https://linkedin.com/in/mikec-startup" },
  { id: 3, name: "Emily Rodriguez", username: "@emily_ventures", avatar: "ER", text: "The investor matching feature is incredible. Connected with perfect investors in days, not months.", platform: "twitter", link: "https://twitter.com/emily_ventures/status/1234567891" },
  { id: 4, name: "David Park", username: "@davidpark_ceo", avatar: "DP", text: "FounderCrowd has blown my mind 🤯. No iterations, no changes needed.", platform: "twitter", link: "https://twitter.com/davidpark_ceo/status/1234567892" },
  { id: 5, name: "Lisa Thompson", username: "@lisa_tech", avatar: "LT", text: "Just raised $2M using FounderCrowd. The due diligence process was seamless.", platform: "linkedin", link: "https://linkedin.com/in/lisa-tech" },
  { id: 6, name: "James Wilson", username: "@jameswilson", avatar: "JW", text: "What makes FounderCrowd special is the interaction quality and speed.", platform: "twitter", link: "https://twitter.com/jameswilson/status/1234567893" },
  { id: 7, name: "Maria Garcia", username: "@maria_startup", avatar: "MG", text: "Amazing understanding of founder needs and thorough handling of investor relations.", platform: "producthunt", link: "https://producthunt.com/@maria_startup" },
  { id: 8, name: "Robert Kim", username: "@robert_founder", avatar: "RK", text: "FounderCrowd revolutionizes fundraising by enabling founders to focus on building.", platform: "linkedin", link: "https://linkedin.com/in/robert-founder" },
  { id: 9, name: "Jessica Lee", username: "@jess_ventures", avatar: "JL", text: "The compliance features saved us months of legal work. Absolutely brilliant!", platform: "twitter", link: "https://twitter.com/jess_ventures/status/1234567894" },
  { id: 10, name: "Alex Turner", username: "@alexturner_cto", avatar: "AT", text: "I gave FounderCrowd a try and I must be truthful, it exceeded all expectations.", platform: "twitter", link: "https://twitter.com/alexturner_cto/status/1234567895" },
  { id: 11, name: "Rachel Davis", username: "@rachel_angel", avatar: "RD", text: "As an investor, this platform makes due diligence so much more efficient.", platform: "linkedin", link: "https://linkedin.com/in/rachel-angel" },
  { id: 12, name: "Tom Anderson", username: "@tom_startup", avatar: "TA", text: "Started my fundraising journey here and couldn't be happier with the results.", platform: "producthunt", link: "https://producthunt.com/@tom_startup" },
  { id: 13, name: "Sophie Brown", username: "@sophie_tech", avatar: "SB", text: "The investor network quality is unmatched. Connected with tier-1 VCs easily.", platform: "twitter", link: "https://twitter.com/sophie_tech/status/1234567896" },
  { id: 14, name: "Kevin Martinez", username: "@kevin_founder", avatar: "KM", text: "FounderCrowd has completely changed how I think about raising capital.", platform: "linkedin", link: "https://linkedin.com/in/kevin-founder" },
  { id: 15, name: "Amanda White", username: "@amanda_ceo", avatar: "AW", text: "The platform's automation features are incredible. Everything just works!", platform: "twitter", link: "https://twitter.com/amanda_ceo/status/1234567897" },
  { id: 16, name: "Daniel Taylor", username: "@dan_ventures", avatar: "DT", text: "Raised our Series A in record time thanks to FounderCrowd's streamlined process.", platform: "linkedin", link: "https://linkedin.com/in/dan-ventures" },
  { id: 17, name: "Grace Liu", username: "@grace_startup", avatar: "GL", text: "The regulatory compliance tools are a game-changer for any fundraising campaign.", platform: "producthunt", link: "https://producthunt.com/@grace_startup" },
  { id: 18, name: "Chris Johnson", username: "@chris_tech", avatar: "CJ", text: "Never thought fundraising could be this straightforward and professional.", platform: "twitter", link: "https://twitter.com/chris_tech/status/1234567898" },
  { id: 19, name: "Olivia Chen", username: "@olivia_founder", avatar: "OC", text: "The investor matching algorithm is spot-on. Found perfect fit investors immediately.", platform: "linkedin", link: "https://linkedin.com/in/olivia-founder" },
  { id: 20, name: "Mark Robinson", username: "@mark_ceo", avatar: "MR", text: "FounderCrowd's approach to capital raising is revolutionary. Highly recommend!", platform: "twitter", link: "https://twitter.com/mark_ceo/status/1234567899" },
  { id: 21, name: "Victoria Singh", username: "@victoria_vc", avatar: "VS", text: "As an investor, I love how easy it is to discover and evaluate opportunities.", platform: "linkedin", link: "https://linkedin.com/in/victoria-vc" },
  { id: 22, name: "Jason Wong", username: "@jason_startup", avatar: "JW", text: "The documentation and legal support made our fundraising process seamless.", platform: "producthunt", link: "https://producthunt.com/@jason_startup" },
  { id: 23, name: "Lauren Adams", username: "@lauren_tech", avatar: "LA", text: "Finally, a fundraising platform built by founders, for founders.", platform: "twitter", link: "https://twitter.com/lauren_tech/status/1234567900" },
  { id: 24, name: "Ryan Miller", username: "@ryan_ventures", avatar: "RM", text: "The speed and efficiency of the platform is unmatched in the industry.", platform: "linkedin", link: "https://linkedin.com/in/ryan-ventures" },
];

// Update the CalendlyModal component to match Navbar
const CalendlyModal = memo(function CalendlyModal({
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

const PlatformIcon = memo(({ platform }: { platform: string }) => {
  const iconClass = "w-4 h-4 text-gray-400";
  switch (platform) {
    case "twitter":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case "producthunt":
      return (
        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">P</span>
        </div>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
  }
});

const TestimonialCard = memo(({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
  <a
    href={testimonial.link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-80 flex-shrink-0 mx-3 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer block group"
  >
    <p className="text-gray-700 mb-4 leading-relaxed text-sm">{testimonial.text}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.username}</p>
        </div>
      </div>
      <div className="opacity-50 group-hover:opacity-100 transition-opacity">
        <PlatformIcon platform={testimonial.platform} />
      </div>
    </div>
  </a>
));

type TestimonyProps = {
  calendlyUrl?: string;
};

const Testimony = memo(({ calendlyUrl = DEFAULT_CALENDLY_URL }: TestimonyProps) => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  const handleOpenCalendly = useCallback(() => setOpenCalendly(true), []);
  const handleCloseCalendly = useCallback(() => setOpenCalendly(false), []);

  return (
    <section className="py-24 bg-gradient-to-b from-[#F4F4F3] to-[#EBFEB3] font-figtree overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
          "Okay, <span className="text-orange-500">FounderCrowd</span>{" "}
          <span className="text-orange-500">blown my mind.</span>"
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          And other great things our users say about us.
        </p>
        <button 
          onClick={handleOpenCalendly}
          className="bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Start Raising
        </button>
      </div>

      {/* Row 1: Left → Right */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-right hover-parent">
          {duplicatedTestimonials.slice(0, 20).map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2: Right → Left */}
      <div className="relative">
        <div className="flex animate-scroll-left hover-parent">
          {duplicatedTestimonials.slice(10, 30).map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Gradient overlays for infinite scroll effect - Hidden on mobile */}
      <div className="hidden md:block absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#F4F4F3] to-transparent pointer-events-none z-10"></div>
      <div className="hidden md:block absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#EBFEB3] to-transparent pointer-events-none z-10"></div>

      {/* Calendly Modal */}
      {openCalendly && (
        <CalendlyModal 
          url={calendlyUrl} 
          onClose={handleCloseCalendly} 
        />
      )}

      <style jsx>{`
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .hover-parent:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-right,
          .animate-scroll-left {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </section>
  );
});

export default Testimony;
