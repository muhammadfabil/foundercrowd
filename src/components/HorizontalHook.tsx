// app/components/HorizontalHook.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

// Update the Section type to include media property
type Section = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  stats?: string[];
  video?: boolean;
  media?: string; // New property for media (image or video)
};

const PRIMARY = "#AC5B0F";

// Update the sections array with default media
const sections: Section[] = [
  {
    id: 1,
    title: "Start your fundraising journey today",
    subtitle: "Create Your Profile",
    description:
      "Build a compelling startup profile that showcases your vision, team, and traction to potential investors through our comprehensive platform.",
    buttonText: "Get Started",
    stats: [
      "Professional pitch deck builder",
      "Team showcase templates",
      "Real-time traction metrics",
      "Investor-ready documents",
    ],
    media: "/hook1.jpg", // Default media
  },
  {
    id: 2,
    title: "Ushering in the new age of Investment Banking",
    subtitle: "Connect with Investors",
    description:
      "Access our curated network of angel investors, VCs, and institutional investors actively looking for opportunities in your sector.",
    stats: [
      "Access to over $5 Trillion in Capital",
      "Existing Relationships to Family Offices, Venture Capital, Private Equity, Hedge Funds worldwide.",
      "Debt and Equity",
      "M&A",
      "Privately held Outreach Systems",
    ],
    buttonText: "Explore Network",
    media: "/hook1.jpg", // Default media
  },
  {
    id: 3,
    title:
      "A Global Independent Digital Investment Bank Empowering Middle Market Transactions.",
    subtitle: "Secure Funding",
    description:
      "Navigate the fundraising process with our compliance tools and legal framework support designed for modern startups.",
    video: true,
    media: "/hook3.mp4", // Video media
    stats: [
      "Regulatory compliance automation",
      "Smart contract integration",
      "Due diligence management",
      "Legal document templates",
    ],
    buttonText: "See how it works",
  },
  {
    id: 4,
    title: "Scale Your Business with Advanced Analytics",
    subtitle: "Growth Analytics",
    description:
      "Leverage our platform's advanced analytics and community resources to accelerate your startup's growth trajectory.",
    stats: [
      "Advanced growth analytics",
      "Mentor network access",
      "Follow-on funding opportunities",
      "Performance tracking tools",
    ],
    buttonText: "Analyze Growth",
    media: "/hook1.jpg", // Default media
  },
  {
    id: 5,
    title: "Build Community",
    subtitle: "Join the Ecosystem",
    description:
      "Connect with a thriving ecosystem of founders, investors, and industry experts sharing knowledge and creating opportunities together.",
    stats: [
      "Global founder community",
      "Expert mentorship programs",
      "Industry insights & reports",
      "Networking events & webinars",
    ],
    buttonText: "Start Raising",
    media: "/hook1.jpg", // Default media
  },
];

type Props = {
  calendlyUrl?: string; // e.g. "https://calendly.com/spacefunding/raise-capital-online"
  className?: string;
};

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

// Add this new function to determine if we're inside the component viewport
function useIsInViewport() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update if component is at least partially visible
        setIsIntersecting(entry.isIntersecting);
        // Update if component is fully visible (or very close to it)
        setIsFullyVisible(entry.intersectionRatio > 0.95);
      },
      { threshold: [0, 0.5, 0.95, 1.0] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return { sectionRef, isIntersecting, isFullyVisible };
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "absolute top-1/2 z-30 -translate-y-1/2",
        direction === "left" ? "left-4 md:left-6" : "right-4 md:right-6",
        "w-10 h-10 flex items-center justify-center rounded-full",
        "bg-[#8A490C] backdrop-blur border border-white/20", // Darker shade of primary
        "text-white/90 hover:text-white hover:bg-[#7A3F08] hover:border-white/40",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#AC5B0F] focus:ring-white",
        "transition-all duration-200",
        disabled && "opacity-30 cursor-not-allowed hover:bg-[#8A490C] hover:text-white/90"
      )}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </button>
  );
}

export default function HorizontalHook({
  calendlyUrl = DEFAULT_CALENDLY_URL, // Use the default URL if none provided
  className,
}: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(0);
  const [openCalendly, setOpenCalendly] = useState(false);
  const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(false);
  const [isLastSectionVisible, setIsLastSectionVisible] = useState(false);
  const { sectionRef, isIntersecting, isFullyVisible } = useIsInViewport();

  const snapTo = useCallback((index: number) => {
    const el = railRef.current;
    if (!el) return;
    
    // Ensure index is within bounds
    const boundedIndex = Math.min(Math.max(0, index), sections.length - 1);
    const target = boundedIndex * el.clientWidth;
    
    // Scroll with smooth behavior
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [sections.length]);

  // Build refs array once
  const setSlideRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    if (el) slidesRef.current[i] = el;
  }, []);

  // Observe active slide
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-index") || 0);
          // Only set active when slide is almost fully visible (90%)
          if (e.isIntersecting && e.intersectionRatio >= 0.9) {
            setActive(idx);
            const id = sections[idx].id;
            // update hash without scrolling
            history.replaceState(null, "", `#cta-${id}`);
            
            // Track first and last section visibility
            if (idx === 0) {
              setIsFirstSectionVisible(true);
            } else {
              setIsFirstSectionVisible(false);
            }
            
            if (idx === sections.length - 1) {
              setIsLastSectionVisible(true);
            } else {
              setIsLastSectionVisible(false);
            }
          }
        });
      },
      {
        root: rail,
        threshold: [0.9],
      }
    );

    slidesRef.current.forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, []);

  // On load: if hash exists (e.g., #cta-3) jump to that slide
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const hash = window.location.hash;
    const match = hash.match(/#cta-(\d+)/);
    const id = match ? Number(match[1]) : null;
    const idx = id ? sections.findIndex((s) => s.id === id) : -1;
    if (idx >= 0) {
      // immediate jump (no smooth) to avoid initial animation
      rail.scrollTo({ left: idx * rail.clientWidth });
      setActive(idx);
    }
  }, []);   

  // Vertical wheel → horizontal paging
  // FIX: Allow scrolling up at first section and down at last section
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let ticking = false;
    const onWheel = (e: WheelEvent) => {
      // Only take control when the component is fully visible in the viewport
      // This prevents partial section scrolling when coming from above
      if (!isFullyVisible) {
        return; // Let normal page scrolling continue
      }
      
      // Get the current scroll position
      const scrollLeft = rail.scrollLeft;
      const slideWidth = rail.clientWidth;
      const currentSlideIndex = Math.round(scrollLeft / slideWidth);
      
      // Allow vertical scrolling when:
      // 1. On first section and trying to scroll up
      // 2. On last section and trying to scroll down
      if ((isFirstSectionVisible && currentSlideIndex === 0 && e.deltaY < 0) || 
          (isLastSectionVisible && currentSlideIndex === sections.length - 1 && e.deltaY > 0)) {
        return; // Allow normal scroll behavior
      }
      
      // Only handle vertical scrolling, not horizontal
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      
      e.preventDefault();
      if (ticking) return;
      ticking = true;
      
      // Existing snap logic...
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.min(
        Math.max(currentSlideIndex + dir, 0),
        sections.length - 1
      );
      
      snapTo(next);
      setActive(next);

      setTimeout(() => {
        ticking = false;
      }, 420);
    };

    rail.addEventListener("wheel", onWheel, { passive: false });
    return () => rail.removeEventListener("wheel", onWheel as any);
  }, [active, snapTo, isFirstSectionVisible, isLastSectionVisible, sections.length, isFullyVisible]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowRight", "ArrowLeft", "PageDown", "PageUp"].includes(e.key))
        return;
      e.preventDefault();
      const dir =
        e.key === "ArrowRight" || e.key === "PageDown" ? 1 : -1;
      const next = Math.min(
        Math.max(active + dir, 0),
        sections.length - 1
      );
      snapTo(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, snapTo]);

  // Derived percent for progress bar
  const progress = useMemo(
    () => (active / (sections.length - 1)) * 100,
    [active]
  );

  // Add navigation functions
  const goToPrevious = useCallback(() => {
    if (active > 0) {
      snapTo(active - 1);
    }
  }, [active, snapTo]);

  const goToNext = useCallback(() => {
    if (active < sections.length - 1) {
      snapTo(active + 1);
    }
  }, [active, snapTo, sections.length]);

  return (
    <section
      ref={sectionRef}
      className={clsx(
        "relative w-full h-screen bg-[#AC5B0F] text-white", // Changed from bg-slate-600
        className
      )}
      aria-label="Primary CTA horizontal section"
    >
      {/* Navigation Arrows */}
      <ArrowButton
        direction="left"
        onClick={goToPrevious}
        disabled={active === 0}
      />
      <ArrowButton
        direction="right"
        onClick={goToNext}
        disabled={active === sections.length - 1}
      />

     

      {/* Horizontal rail */}
      <div
        ref={railRef}
        className="h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ 
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory"
        }}
      >
        {/* Style for snap-points */}
        <style>{`
          div::-webkit-scrollbar{ display:none; }
          
          /* Ensure each slide is a strict snap point */
          [data-index] {
            scroll-snap-align: center;
            scroll-snap-stop: always;
          }
        `}</style>

        {sections.map((s, i) => (
          <div
            key={s.id}
            data-index={i}
            id={`cta-${s.id}`}
            ref={setSlideRef(i)}
            className="relative inline-flex h-full w-screen snap-start items-center justify-center align-middle"
          >
            {/* Background image/video overlay area (placeholder gradient) */}
            <div className="absolute inset-0">
              <div className="h-full w-full bg-[radial-gradient(80%_120%_at_50%_0%,#C46A16_0%,#AC5B0F_60%,#8A490C_100%)]" />
              <div className="absolute inset-0 bg-[#AC5B0F]/40" />
            </div>

            {/* Content card - Fixed to consistent two-column layout */}
            <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left column - Text content */}
                <div className="w-full text-wrap">
                  <p
                    className="text-sm tracking-widest uppercase mb-3"
                    style={{ color: PRIMARY }}
                  >
                    {s.subtitle}
                  </p>
                  {/* Improved text formatting */}
                  <h2 className="text-3xl md:text-4xl font-semibold leading-tight md:leading-tight mb-4">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-base md:text-lg text-white/80 max-w-xl">
                    {s.description}
                  </p>

                  {s.stats && (
                    <ul className="mt-6 grid gap-3">
                      {s.stats.map((stat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm md:text-base text-white/90"
                        >
                          <span
                            className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: PRIMARY }}
                            aria-hidden
                          />
                          <span className="leading-normal">{stat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {s.buttonText && (
                      <button
                        onClick={() => setOpenCalendly(true)} // Always open Calendly modal when button is clicked
                        className="text-[#AC5B0F] rounded-full px-6 py-3 text-sm font-medium shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                          background: "#ffffff",
                          color: "#AC5B0F", // Fix: was using string "PRIMARY" instead of the value
                          boxShadow:
                            "0 8px 24px rgba(172,91,15,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                        }}
                      >
                        {s.buttonText}
                      </button>
                    )}

                    <div className="text-sm text-white/60">
                      Slide {i + 1} of {sections.length}
                    </div>
                  </div>
                </div>

                {/* Right column - Media */}
                <div className="w-full">
                  {s.video ? (
                    <VideoMock active={active === i} src={s.media || ""} />
                  ) : (
                    <div className="h-[280px] md:h-[360px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      {s.media ? (
                        <img
                          src={s.media}
                          alt={s.title}
                          className="h-full w-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="h-full w-full bg-white/5 backdrop-blur-sm p-5 flex items-center justify-center">
                          <div className="text-center">
                            <div
                              className="mx-auto mb-4 h-12 w-12 rounded-full"
                              style={{ backgroundColor: PRIMARY }}
                            />
                            <p className="text-white/70 text-sm">
                              Visual placeholder
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom gradient edge */}
            
          </div>
        ))}
      </div>

      {/* Progress rail */}
      <div className="absolute inset-x-6 md:inset-x-12 bottom-8 z-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: PRIMARY,
                transition: "width 380ms cubic-bezier(.2,.8,.2,1)",
              }}
              aria-hidden
            />
          </div>

          {/* Dots clickable */}
          <div className="mt-3 flex gap-2">
            {sections.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => snapTo(i)}
                className={clsx(
                  "h-2.5 w-2.5 rounded-full transition",
                  i === active
                    ? "scale-100"
                    : "opacity-60 hover:opacity-100 hover:scale-110"
                )}
                style={{
                  background: i === active ? PRIMARY : "rgba(255,255,255,.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      {openCalendly && calendlyUrl && (
        <CalendlyModal url={calendlyUrl} onClose={() => setOpenCalendly(false)} />
      )}
    </section>
  );
}

/** Video component that pauses when not active */
function VideoMock({ active, src }: { active: boolean; src: string }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <div className="h-[280px] md:h-[360px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      {/* Video with source from props */}
      <video
        ref={vidRef}
        muted
        playsInline
        loop
        preload="metadata"
        className="h-full w-full object-cover"
        poster="data:image/gif;base64,R0lGODlhAQABAAAAACw="
      >
        <source src={src} type="video/mp4" />
      </video>
      {!active && (
        <div className="absolute inset-0 grid place-items-center bg-[#AC5B0F]/50 text-white/80 text-sm">
          <div className="bg-[#8A490C]/90 px-4 py-2 rounded-full border border-white/10">
            Click to play video
          </div>
        </div>
      )}
    </div>
  );
}

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
          <h3 className="text-sm font-medium">Book a call</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-xs bg-white/10 hover:bg-white/15"
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
