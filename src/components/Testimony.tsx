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
import { REVIEW_TESTIMONIAL_MARQUEE_DURATION_SECONDS } from "@/lib/testimonialMarquee";

const VimeoEmbed = memo(function VimeoEmbed({
  testimonial,
  onPlaybackChange,
  pauseToken = 0,
  autoplay = false,
}: {
  testimonial: VimeoTestimonial;
  onPlaybackChange?: (isPlaying: boolean) => void;
  pauseToken?: number;
  autoplay?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = `https://player.vimeo.com/video/${testimonial.videoId}?badge=0&autopause=0&api=1&player_id=${testimonial.id}${
    autoplay ? "&autoplay=1" : ""
  }`;

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

const VimeoThumbnail = memo(function VimeoThumbnail({
  testimonial,
  onClick,
}: {
  testimonial: VimeoTestimonial;
  onClick?: () => void;
}) {
  const content = (
    <>
      {testimonial.thumbnailUrl ? (
        <img
          src={testimonial.thumbnailUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          Video Testimonial
        </div>
      )}
      <span className="absolute inset-0 bg-black/20" />
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#5271ff] shadow-sm">
        <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-current" />
      </span>
    </>
  );

  if (!onClick) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-black shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-video w-full overflow-hidden rounded-md bg-black shadow-sm"
      aria-label={`Play ${testimonial.title}`}
    >
      {content}
    </button>
  );
});

const VimeoVideoCard = memo(function VimeoVideoCard({
  testimonial,
  onPlaybackChange,
  onCalendlyOpenChange,
  pauseToken,
  isDuplicate = false,
}: {
  testimonial: VimeoTestimonial;
  onPlaybackChange?: (isPlaying: boolean) => void;
  onCalendlyOpenChange?: (open: boolean) => void;
  pauseToken?: number;
  isDuplicate?: boolean;
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [name, company] = testimonial.title.split("|").map((part) => part.trim());
  const handleLoadVideo = useCallback(() => {
    setIsVideoLoaded(true);
    onPlaybackChange?.(true);
  }, [onPlaybackChange]);

  return (
    <article
      aria-hidden={isDuplicate || undefined}
      className="video-strip-card mx-3 flex min-h-[352px] w-[252px] flex-shrink-0 flex-col overflow-hidden rounded-[22px] border border-[#5271ff]/30 bg-white text-center shadow-lg md:w-[276px]"
    >
      <div className="p-3 pb-0">
        {isDuplicate ? (
          <VimeoThumbnail testimonial={testimonial} />
        ) : isVideoLoaded ? (
          <VimeoEmbed
            testimonial={testimonial}
            onPlaybackChange={onPlaybackChange}
            pauseToken={pauseToken}
            autoplay
          />
        ) : (
          <VimeoThumbnail
            testimonial={testimonial}
            onClick={handleLoadVideo}
          />
        )}
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
          {isDuplicate ? (
            <div className="w-full rounded-full bg-[#5271ff] px-4 py-2 text-sm font-semibold text-white">
              Start Raising
            </div>
          ) : (
            <CTAButton
              size="sm"
              className="w-full bg-[#5271ff] text-white shadow-none hover:scale-100"
              onOpenChange={onCalendlyOpenChange}
            >
              Start Raising
            </CTAButton>
          )}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [pauseToken, setPauseToken] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(
    REVIEW_TESTIMONIAL_MARQUEE_DURATION_SECONDS * 4
  );

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateDuration = () => {
      const containerWidth = container.offsetWidth;
      const trackWidth = track.scrollWidth;

      if (!containerWidth || !trackWidth) return;

      const nextDuration =
        REVIEW_TESTIMONIAL_MARQUEE_DURATION_SECONDS *
        (trackWidth / containerWidth);

      setAnimationDuration((currentDuration) =>
        Math.abs(currentDuration - nextDuration) < 0.5
          ? currentDuration
          : Number(nextDuration.toFixed(2))
      );
    };

    updateDuration();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateDuration);
      return () => window.removeEventListener("resize", updateDuration);
    }

    const resizeObserver = new ResizeObserver(updateDuration);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [videos.length]);

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
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className={`video-strip-motion flex w-max ${isVideoPlaying || isCalendlyOpen ? "is-paused" : ""}`}
        style={
          {
            "--video-strip-duration": `${animationDuration}s`,
          } as React.CSSProperties
        }
      >
        {videos.map((video) => (
          <VimeoVideoCard
            key={`video-vertical-${video.id}`}
            testimonial={video}
            onPlaybackChange={handlePlaybackChange}
            onCalendlyOpenChange={handleCalendlyOpenChange}
            pauseToken={pauseToken}
          />
        ))}
        {videos.map((video) => (
          <VimeoVideoCard
            key={`video-vertical-duplicate-${video.id}`}
            testimonial={video}
            isDuplicate
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
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .video-strip-motion {
          animation: video-strip-left var(--video-strip-duration) linear infinite;
          will-change: transform;
        }
        .video-strip-card {
          contain: layout paint style;
          content-visibility: auto;
          contain-intrinsic-size: 300px 352px;
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
