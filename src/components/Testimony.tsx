"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CTAButton from './CTAButton'; // Replace CalendlyModal import
import {
  VIMEO_TESTIMONIALS,
  type VimeoTestimonial,
} from "@/data/vimeoTestimonials";

const testimonials = [
  { id: 1, name: "Sarah Johnson", username: "@sarahj_founder", avatar: "SJ", text: "Space Funding made raising capital so much easier. The process was streamlined and professional.", platform: "twitter", link: "https://twitter.com/sarahj_founder/status/1234567890" },
  { id: 2, name: "Michael Chen", username: "@mikec_startup", avatar: "MC", text: "Finally, a platform that understands what founders need. Highly recommended!", platform: "linkedin", link: "https://linkedin.com/in/mikec-startup" },
  { id: 3, name: "Emily Rodriguez", username: "@emily_ventures", avatar: "ER", text: "The investor matching feature is incredible. Connected with perfect investors in days, not months.", platform: "twitter", link: "https://twitter.com/emily_ventures/status/1234567891" },
  { id: 4, name: "David Park", username: "@davidpark_ceo", avatar: "DP", text: "Space Funding has blown my mind 🤯. No iterations, no changes needed.", platform: "twitter", link: "https://twitter.com/davidpark_ceo/status/1234567892" },
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
        <div className="w-4 h-4 bg-[#5271ff] rounded-full flex items-center justify-center">
          <span className="text-[#2B2B2B] text-xs font-bold">P</span>
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
    className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 w-80 flex-shrink-0 mx-3 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer block group"
  >
    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{testimonial.text}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-[#2B2B2B] font-semibold text-sm">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="font-semibold text-[#2B2B2B] text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.username}</p>
        </div>
      </div>
      <div className="opacity-50 group-hover:opacity-100 transition-opacity">
        <PlatformIcon platform={testimonial.platform} />
      </div>
    </div>
  </a>
));

type VideoLayoutMode = "vertical" | "horizontal";

const videoLayoutOptions: VideoLayoutMode[] = ["vertical", "horizontal"];

function splitVideosIntoRows(items: VimeoTestimonial[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)].filter((row) => row.length);
}

const VimeoEmbed = memo(function VimeoEmbed({
  testimonial,
  onPlaybackChange,
}: {
  testimonial: VimeoTestimonial;
  onPlaybackChange?: (isPlaying: boolean) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = `https://player.vimeo.com/video/${testimonial.videoId}?badge=0&autopause=0&api=1&player_id=${testimonial.id}`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const registerVimeoEvent = (eventName: string) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ method: "addEventListener", value: eventName }),
        "https://player.vimeo.com"
      );
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com" || event.source !== iframe.contentWindow) {
        return;
      }

      const payload =
        typeof event.data === "string"
          ? (() => {
              try {
                return JSON.parse(event.data) as { event?: string };
              } catch {
                return null;
              }
            })()
          : (event.data as { event?: string } | null);

      if (payload?.event === "play") {
        onPlaybackChange?.(true);
      }

      if (payload?.event === "pause" || payload?.event === "ended") {
        onPlaybackChange?.(false);
      }
    };

    const registerEvents = () => {
      registerVimeoEvent("play");
      registerVimeoEvent("pause");
      registerVimeoEvent("ended");
    };

    window.addEventListener("message", handleMessage);
    iframe.addEventListener("load", registerEvents);
    registerEvents();

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", registerEvents);
    };
  }, [onPlaybackChange]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-black shadow-sm">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={testimonial.title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
});

const VimeoVideoCard = memo(function VimeoVideoCard({
  testimonial,
  orientation = "horizontal",
  onPlaybackChange,
}: {
  testimonial: VimeoTestimonial;
  orientation?: "vertical" | "horizontal";
  onPlaybackChange?: (isPlaying: boolean) => void;
}) {
  const [name, company] = testimonial.title.split("|").map((part) => part.trim());
  const isVertical = orientation === "vertical";

  return (
    <article
      className={`overflow-hidden bg-white text-center ${
        isVertical
          ? "mx-3 w-[252px] flex-shrink-0 rounded-[22px] border border-[#5271ff]/30 shadow-lg md:w-[276px]"
          : "video-card-horizontal flex-none"
      }`}
    >
      <div className={isVertical ? "p-3 pb-0" : ""}>
        <VimeoEmbed testimonial={testimonial} onPlaybackChange={onPlaybackChange} />
      </div>
      <div className={isVertical ? "px-5 pb-0 pt-5" : "pt-3"}>
        <p className={isVertical ? "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5271ff]" : "sr-only"}>
          Video Testimonial
        </p>
        <h3 className={isVertical ? "text-[22px] font-bold leading-tight text-[#2B2B2B]" : "text-lg font-semibold leading-tight text-[#2B2B2B]"}>
          {name || testimonial.title}
        </h3>
        {company && (
          <p className={isVertical ? "mt-2 text-base font-medium leading-snug text-gray-500" : "mt-1 text-base font-semibold leading-tight text-gray-500"}>
            {company}
          </p>
        )}
        {isVertical && (
          <a
            href={testimonial.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 -mx-5 block bg-gray-100 px-5 py-4 text-sm font-bold text-[#2B2B2B] transition-colors hover:bg-[#5271ff] hover:text-white"
          >
            Watch on Vimeo
          </a>
        )}
      </div>
    </article>
  );
});

const VimeoMovingStrip = memo(function VimeoMovingStrip({
  videos,
}: {
  videos: VimeoTestimonial[];
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlaybackChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  return (
    <div className="relative mb-16 overflow-hidden">
      <div className={`video-strip-motion flex w-max ${isPlaying ? "is-paused" : ""}`}>
        {videos.map((video) => (
          <VimeoVideoCard
            key={`video-vertical-${video.id}`}
            testimonial={video}
            orientation="vertical"
            onPlaybackChange={handlePlaybackChange}
          />
        ))}
      </div>
    </div>
  );
});

const VimeoGridRow = memo(function VimeoGridRow({
  videos,
  direction,
}: {
  videos: VimeoTestimonial[];
  direction: "left" | "right";
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlaybackChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  return (
    <div className="video-horizontal-viewport">
      <div
        className={`video-row-motion video-row-motion-${direction} video-horizontal-track flex w-max ${
          isPlaying ? "is-paused" : ""
        }`}
      >
        {videos.map((video) => (
          <VimeoVideoCard
            key={`video-horizontal-${video.id}`}
            testimonial={video}
            onPlaybackChange={handlePlaybackChange}
          />
        ))}
      </div>
    </div>
  );
});

type TestimonyProps = {
  calendlyUrl?: string;
  vimeoTestimonials?: VimeoTestimonial[];
};

const Testimony = memo(({ calendlyUrl, vimeoTestimonials }: TestimonyProps) => {
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);
  const videos = vimeoTestimonials?.length ? vimeoTestimonials : VIMEO_TESTIMONIALS;
  const horizontalVideoRows = useMemo(() => splitVideosIntoRows(videos), [videos]);
  const [videoLayout, setVideoLayout] = useState<VideoLayoutMode>("vertical");

  return (
    <section className="py-24 bg-white font-figtree overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-medium text-[#2B2B2B] mb-6 leading-tight">
          "Okay, <span className="text-[#5271ff]">Space Funding</span>{" "}
          <span className="text-[#5271ff]">blown my mind.</span>"
        </h2>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          And other great things our users say about us.
        </p>
        
        {/* Updated CTA Button - Keep black styling to match section */}
        <CTAButton 
         
          className="bg-[#5271ff] text-[#2B2B2B] hover:bg-[#5271ff]/90 hover:scale-100"
          size="md"
        >
          Start Raising
        </CTAButton>

        <div
          className="mt-8 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 shadow-sm"
          aria-label="Video testimonial layout"
        >
          {videoLayoutOptions.map((option) => {
            const active = videoLayout === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setVideoLayout(option)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                  active
                    ? "bg-[#5271ff] text-white shadow-sm"
                    : "text-gray-500 hover:text-[#2B2B2B]"
                }`}
                aria-pressed={active}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {videoLayout === "vertical" ? (
        <VimeoMovingStrip videos={videos} />
      ) : (
        <div className="relative mb-14 overflow-hidden px-4">
          <div className="mx-auto space-y-12">
            {horizontalVideoRows.map((row, index) => (
              <VimeoGridRow
                key={`video-horizontal-row-${index}`}
                videos={row}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      )}

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
      <div className="hidden md:block absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      <div className="hidden md:block absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

      <style jsx global>{`
        @keyframes video-strip-left {
          0% { transform: translateX(24px); }
          100% { transform: translateX(calc(100vw - 100% - 24px)); }
        }
        @keyframes video-row-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--video-row-shift))); }
        }
        @keyframes video-row-right {
          0% { transform: translateX(calc(-1 * var(--video-row-shift))); }
          100% { transform: translateX(0); }
        }
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
        .video-strip-motion {
          animation: video-strip-left 34s linear infinite alternate;
          will-change: transform;
        }
        .video-horizontal-viewport {
          --video-card-width: 350px;
          --video-row-gap: 36px;
          --video-row-shift: 386px;
          --video-window-width: 1122px;
          margin-inline: auto;
          max-width: min(100%, var(--video-window-width));
          overflow: hidden;
        }
        .video-horizontal-track {
          gap: var(--video-row-gap);
        }
        .video-card-horizontal {
          width: var(--video-card-width);
          flex-basis: var(--video-card-width);
        }
        .video-row-motion {
          animation-duration: 18s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform;
        }
        .video-row-motion-left {
          animation-name: video-row-left;
        }
        .video-row-motion-right {
          animation-name: video-row-right;
        }
        .hover-parent:hover {
          animation-play-state: paused;
        }
        .video-strip-motion:hover,
        .video-row-motion:hover,
        .video-strip-motion.is-paused,
        .video-row-motion.is-paused {
          animation-play-state: paused;
        }

        @media (max-width: 1180px) {
          .video-horizontal-viewport {
            --video-card-width: 330px;
            --video-row-gap: 28px;
            --video-row-shift: 358px;
            --video-window-width: 1046px;
          }
        }

        @media (max-width: 767px) {
          .video-horizontal-viewport {
            --video-card-width: min(86vw, 340px);
            --video-row-gap: 20px;
            --video-row-shift: calc(var(--video-card-width) + var(--video-row-gap));
            --video-window-width: var(--video-card-width);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-right,
          .animate-scroll-left,
          .video-strip-motion,
          .video-row-motion {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </section>
  );
});

export default Testimony;
