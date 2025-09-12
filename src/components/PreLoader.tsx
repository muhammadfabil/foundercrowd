import React, { useEffect, useRef, useState, memo, useCallback } from "react";

interface PreLoaderProps {
  onComplete: () => void;
  /** Opsional: pakai GIF berbeda untuk mobile portrait */
  mobileSrc?: string;
  /** GIF default/desktop */
  src?: string;
  /** Warna latar belakang saat letterbox */
  backgroundClassName?: string; // e.g. "bg-black"
  /** Durasi 1x putaran GIF (ms). Default: 3060 ms */
  durationMs?: number;
}

const FADE_MS = 200; // durasi fade-out

const PreLoader: React.FC<PreLoaderProps> = memo(
  ({
    onComplete,
    mobileSrc,
    src = "/gif.gif",
    backgroundClassName = "bg-white",
    durationMs = 2400, // 3.06s
  }) => {
    const [isGone, setIsGone] = useState(false);
    const [isFading, setIsFading] = useState(false);

    // Cegah timer dijalankan dua kali saat React StrictMode di DEV
    const startedRef = useRef(false);
    const timeoutRef = useRef<number | null>(null);

    const startFade = useCallback(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setIsGone(true);
        onComplete();
      }, FADE_MS);
    }, [onComplete]);

    useEffect(() => {
      if (startedRef.current) return;
      startedRef.current = true;

      timeoutRef.current = window.setTimeout(startFade, durationMs);

      return () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      };
    }, [durationMs, startFade]);

    if (isGone) return null;

    return (
      <div
        className={[
          // full-screen yang tahan address bar iOS/Android
          "fixed inset-0 z-50",
          "w-[100vw] h-[100dvh] sm:h-[100svh]",
          "relative",
          backgroundClassName,
          "transition-opacity duration-500 ease-out [will-change:opacity]",
          isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto",
        ].join(" ")}
      >
        {/* Gunakan <picture> agar bisa beda aset untuk mobile portrait */}
        <picture>
          {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
          <img
            src={src}
            alt="Loading"
            className={[
              "absolute inset-0 w-full h-full",
              // Mobile: object-contain (portrait friendly), ≥ md: object-cover (penuhi layar)
              "object-contain md:object-cover",
              "transition-transform duration-500",
              "select-none pointer-events-none",
            ].join(" ")}
            draggable={false}
          />
        </picture>

        <span className="sr-only">Loading…</span>
      </div>
    );
  }
);

export default PreLoader;
