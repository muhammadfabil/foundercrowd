"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CTAButton from './CTAButton'; // Replace CalendlyModal import
import {
  VIMEO_TESTIMONIALS,
  type VimeoTestimonial,
} from "@/data/vimeoTestimonials";

const VimeoEmbed = memo(function VimeoEmbed({
  testimonial,
  onPlaybackChange,
  pauseToken = 0,
}: {
  testimonial: VimeoTestimonial;
  onPlaybackChange?: (isPlaying: boolean) => void;
  pauseToken?: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = `https://player.vimeo.com/video/${testimonial.videoId}?badge=0&autopause=0&api=1&player_id=${testimonial.id}`;

  useEffect(() => {
    if (!pauseToken) return;

    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "pause" }),
      "https://player.vimeo.com"
    );
  }, [pauseToken]);

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
  onPlaybackChange,
  onCalendlyOpenChange,
  pauseToken,
}: {
  testimonial: VimeoTestimonial;
  onPlaybackChange?: (isPlaying: boolean) => void;
  onCalendlyOpenChange?: (open: boolean) => void;
  pauseToken?: number;
}) {
  const [name, company] = testimonial.title.split("|").map((part) => part.trim());

  return (
    <article
      className="mx-3 flex min-h-[352px] w-[252px] flex-shrink-0 flex-col overflow-hidden rounded-[22px] border border-[#5271ff]/30 bg-white text-center shadow-lg md:w-[276px]"
    >
      <div className="p-3 pb-0">
        <VimeoEmbed
          testimonial={testimonial}
          onPlaybackChange={onPlaybackChange}
          pauseToken={pauseToken}
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-0 pt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5271ff]">
          Video Testimonial
        </p>
        <h3 className="text-[22px] font-bold leading-tight text-[#2B2B2B]">
          {name || testimonial.title}
        </h3>
        <p
          className={`mt-2 min-h-6 text-base font-medium leading-snug text-gray-500 ${
            company ? "" : "invisible"
          }`}
          aria-hidden={!company}
        >
          {company || "Company"}
        </p>
        <div className="-mx-5 mt-auto bg-gray-100 px-4 py-3">
          <CTAButton
            size="sm"
            className="w-full bg-[#5271ff] text-white shadow-none hover:scale-100"
            onOpenChange={onCalendlyOpenChange}
          >
            Start Raising
          </CTAButton>
        </div>
      </div>
    </article>
  );
});

const VimeoMovingStrip = memo(function VimeoMovingStrip({
  videos,
}: {
  videos: VimeoTestimonial[];
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [pauseToken, setPauseToken] = useState(0);

  const handlePlaybackChange = useCallback((playing: boolean) => {
    setIsVideoPlaying(playing);
  }, []);

  const handleCalendlyOpenChange = useCallback((open: boolean) => {
    setIsCalendlyOpen(open);

    if (open) {
      setIsVideoPlaying(false);
      setPauseToken((token) => token + 1);
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className={`video-strip-motion flex w-max ${isVideoPlaying || isCalendlyOpen ? "is-paused" : ""}`}>
        {videos.map((video) => (
          <VimeoVideoCard
            key={`video-vertical-${video.id}`}
            testimonial={video}
            onPlaybackChange={handlePlaybackChange}
            onCalendlyOpenChange={handleCalendlyOpenChange}
            pauseToken={pauseToken}
          />
        ))}
      </div>
    </div>
  );
});

type TestimonyProps = {
  vimeoTestimonials?: VimeoTestimonial[];
};

const Testimony = memo(({ vimeoTestimonials }: TestimonyProps) => {
  const videos = vimeoTestimonials?.length ? vimeoTestimonials : VIMEO_TESTIMONIALS;

  return (
    <section className="bg-white pt-24 pb-4 font-figtree overflow-hidden relative">
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
      </div>

      <VimeoMovingStrip videos={videos} />

      <style jsx global>{`
        @keyframes video-strip-left {
          0% { transform: translateX(24px); }
          100% { transform: translateX(calc(100vw - 100% - 24px)); }
        }
        .video-strip-motion {
          animation: video-strip-left 34s linear infinite alternate;
          will-change: transform;
        }
        .video-strip-motion:hover,
        .video-strip-motion.is-paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .video-strip-motion {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </section>
  );
});

export default Testimony;
