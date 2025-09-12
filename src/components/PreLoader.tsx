import React, { useEffect, useState, memo, useCallback } from "react";

interface PreLoaderProps {
  onComplete: () => void;
  /** Opsional: pakai GIF berbeda untuk mobile portrait */
  mobileSrc?: string;
  /** GIF default/desktop */
  src?: string;
  /** Warna latar belakang saat letterbox */
  backgroundClassName?: string; // e.g. "bg-black"
}

const FADE_MS = 500;           // durasi fade-out
const FALLBACK_TIMEOUT = 5000; // timeout fallback

const PreLoader: React.FC<PreLoaderProps> = memo(
  ({ onComplete, mobileSrc, src = "/gif.gif", backgroundClassName = "bg-white" }) => {
    const [isGone, setIsGone] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const startFade = useCallback(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setIsGone(true);
        onComplete();
      }, FADE_MS);
    }, [onComplete]);

    useEffect(() => {
      const id = window.setTimeout(startFade, FALLBACK_TIMEOUT);
      return () => window.clearTimeout(id);
    }, [startFade]);

    if (isGone) return null;

    return (
      <div
        className={[
          // full-screen yang tahan address bar iOS/Android
          "fixed inset-0 z-50",                 // cover screen
          "w-[100vw] h-[100dvh] sm:h-[100svh]", // dynamic/small viewport unit fallbacks
          "relative",
          backgroundClassName,
          "transition-opacity duration-500 ease-out [will-change:opacity]",
          isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto",
        ].join(" ")}
      >
        {/* Gunakan <picture> agar bisa beda aset untuk mobile portrait */}
        <picture>
          {mobileSrc && (
            <source media="(max-width: 767px)" srcSet={mobileSrc} />
          )}
          <img
            src={src}
            alt="Loading"
            // Mobile: object-contain (portrait friendly, tidak terpotong)
            // ≥ md: object-cover (penuhi layar, sinematik)
            className={[
              "absolute inset-0 w-full h-full",
              "object-contain md:object-cover",
              // Sedikit scaling saat fade untuk rasa halus
              "transition-transform duration-500",
              isFading ? "scale-100" : "scale-100",
            ].join(" ")}
          />
        </picture>

        <span className="sr-only">Loading…</span>
      </div>
    );
  }
);

export default PreLoader;
