"use client";

import React, { memo, useMemo } from "react";
import { REVIEW_TESTIMONIAL_MARQUEE_DURATION_SECONDS } from "@/lib/testimonialMarquee";

const testimonials = [
  { id: 1, name: "Sarah Johnson", username: "@sarahj_founder", avatar: "SJ", text: "Space Funding made raising capital so much easier. The process was streamlined and professional.", platform: "twitter", link: "https://twitter.com/sarahj_founder/status/1234567890" },
  { id: 2, name: "Michael Chen", username: "@mikec_startup", avatar: "MC", text: "Finally, a platform that understands what founders need. Highly recommended!", platform: "linkedin", link: "https://linkedin.com/in/mikec-startup" },
  { id: 3, name: "Emily Rodriguez", username: "@emily_ventures", avatar: "ER", text: "The investor matching feature is incredible. Connected with perfect investors in days, not months.", platform: "twitter", link: "https://twitter.com/emily_ventures/status/1234567891" },
  { id: 4, name: "David Park", username: "@davidpark_ceo", avatar: "DP", text: "Space Funding has blown my mind \u{1F92F}. No iterations, no changes needed.", platform: "twitter", link: "https://twitter.com/davidpark_ceo/status/1234567892" },
  { id: 5, name: "Lisa Thompson", username: "@lisa_tech", avatar: "LT", text: "Just raised $2M using Space Funding. The due diligence process was seamless.", platform: "linkedin", link: "https://linkedin.com/in/lisa-tech" },
  { id: 6, name: "James Wilson", username: "@jameswilson", avatar: "JW", text: "What makes Space Funding special is the interaction quality and speed.", platform: "twitter", link: "https://twitter.com/jameswilson/status/1234567893" },
  { id: 7, name: "Maria Garcia", username: "@maria_startup", avatar: "MG", text: "Amazing understanding of founder needs and thorough handling of investor relations.", platform: "producthunt", link: "https://producthunt.com/@maria_startup" },
  { id: 8, name: "Robert Kim", username: "@robert_founder", avatar: "RK", text: "Space Funding revolutionizes fundraising by enabling founders to focus on building.", platform: "linkedin", link: "https://linkedin.com/in/robert-founder" },
  { id: 9, name: "Jessica Lee", username: "@jess_ventures", avatar: "JL", text: "The compliance features saved us months of legal work. Absolutely brilliant!", platform: "twitter", link: "https://twitter.com/jess_ventures/status/1234567894" },
  { id: 10, name: "Alex Turner", username: "@alexturner_cto", avatar: "AT", text: "I gave Space Funding a try and I must be truthful, it exceeded all expectations.", platform: "twitter", link: "https://twitter.com/alexturner_cto/status/1234567895" },
  { id: 11, name: "Rachel Davis", username: "@rachel_angel", avatar: "RD", text: "As an investor, this platform makes due diligence so much more efficient.", platform: "linkedin", link: "https://linkedin.com/in/rachel-angel" },
  { id: 12, name: "Tom Anderson", username: "@tom_startup", avatar: "TA", text: "Started my fundraising journey here and couldn't be happier with the results.", platform: "producthunt", link: "https://producthunt.com/@tom_startup" },
  { id: 13, name: "Sophie Brown", username: "@sophie_tech", avatar: "SB", text: "The investor network quality is unmatched. Connected with tier-1 VCs easily.", platform: "twitter", link: "https://twitter.com/sophie_tech/status/1234567896" },
  { id: 14, name: "Kevin Martinez", username: "@kevin_founder", avatar: "KM", text: "Space Funding has completely changed how I think about raising capital.", platform: "linkedin", link: "https://linkedin.com/in/kevin-founder" },
  { id: 15, name: "Amanda White", username: "@amanda_ceo", avatar: "AW", text: "The platform's automation features are incredible. Everything just works!", platform: "twitter", link: "https://twitter.com/amanda_ceo/status/1234567897" },
  { id: 16, name: "Daniel Taylor", username: "@dan_ventures", avatar: "DT", text: "Raised our Series A in record time thanks to Space Funding's streamlined process.", platform: "linkedin", link: "https://linkedin.com/in/dan-ventures" },
  { id: 17, name: "Grace Liu", username: "@grace_startup", avatar: "GL", text: "The regulatory compliance tools are a game-changer for any fundraising campaign.", platform: "producthunt", link: "https://producthunt.com/@grace_startup" },
  { id: 18, name: "Chris Johnson", username: "@chris_tech", avatar: "CJ", text: "Never thought fundraising could be this straightforward and professional.", platform: "twitter", link: "https://twitter.com/chris_tech/status/1234567898" },
  { id: 19, name: "Olivia Chen", username: "@olivia_founder", avatar: "OC", text: "The investor matching algorithm is spot-on. Found perfect fit investors immediately.", platform: "linkedin", link: "https://linkedin.com/in/olivia-founder" },
  { id: 20, name: "Mark Robinson", username: "@mark_ceo", avatar: "MR", text: "Space Funding's approach to capital raising is revolutionary. Highly recommend!", platform: "twitter", link: "https://twitter.com/mark_ceo/status/1234567899" },
  { id: 21, name: "Victoria Singh", username: "@victoria_vc", avatar: "VS", text: "As an investor, I love how easy it is to discover and evaluate opportunities.", platform: "linkedin", link: "https://linkedin.com/in/victoria-vc" },
  { id: 22, name: "Jason Wong", username: "@jason_startup", avatar: "JW", text: "The documentation and legal support made our fundraising process seamless.", platform: "producthunt", link: "https://producthunt.com/@jason_startup" },
  { id: 23, name: "Lauren Adams", username: "@lauren_tech", avatar: "LA", text: "Finally, a fundraising platform built by founders, for founders.", platform: "twitter", link: "https://twitter.com/lauren_tech/status/1234567900" },
  { id: 24, name: "Ryan Miller", username: "@ryan_ventures", avatar: "RM", text: "The speed and efficiency of the platform is unmatched in the industry.", platform: "linkedin", link: "https://linkedin.com/in/ryan-ventures" },
];

const PlatformIcon = memo(({ platform }: { platform: string }) => {
  const iconClass = "w-4 h-4 text-gray-400";

  switch (platform) {
    case "linkedin":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "producthunt":
      return (
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5271ff]">
          <span className="text-xs font-bold text-[#2B2B2B]">P</span>
        </div>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
});

const TestimonialCard = memo(({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
  <a
    href={testimonial.link}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-3 block w-80 flex-shrink-0 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
  >
    <p className="mb-4 text-sm leading-relaxed text-gray-600">{testimonial.text}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <span className="text-sm font-semibold text-[#2B2B2B]">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2B2B2B]">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.username}</p>
        </div>
      </div>
      <PlatformIcon platform={testimonial.platform} />
    </div>
  </a>
));

const ReviewTestimonials = memo(function ReviewTestimonials() {
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-12 font-figtree">
      <div className="relative mb-8">
        <div className="flex review-scroll-right review-hover-pause">
          {duplicatedTestimonials.slice(0, 20).map((testimonial, index) => (
            <TestimonialCard key={`review-row-1-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex review-scroll-left review-hover-pause">
          {duplicatedTestimonials.slice(10, 30).map((testimonial, index) => (
            <TestimonialCard key={`review-row-2-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-32 bg-gradient-to-r from-white to-transparent md:block" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-32 bg-gradient-to-l from-white to-transparent md:block" />

      <style jsx global>{`
        @keyframes review-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes review-scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .review-scroll-right {
          animation: review-scroll-right ${REVIEW_TESTIMONIAL_MARQUEE_DURATION_SECONDS}s linear infinite;
        }
        .review-scroll-left {
          animation: review-scroll-left ${REVIEW_TESTIMONIAL_MARQUEE_DURATION_SECONDS}s linear infinite;
        }
        .review-hover-pause:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .review-scroll-right,
          .review-scroll-left {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </section>
  );
});

export default ReviewTestimonials;
