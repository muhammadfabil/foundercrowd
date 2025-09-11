import React, { useEffect, useRef, useState, memo, useCallback } from "react";

interface PreLoaderProps {
  onComplete: () => void;
}

const FADE_MS = 500;
const FALLBACK_TIMEOUT = 10000;
const FADE_THRESHOLD = 0.97;

const PreLoader: React.FC<PreLoaderProps> = memo(({ onComplete }) => {
  const [isGone, setIsGone] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedFadeRef = useRef(false);

  useEffect(() => {
    // --- iOS autoplay nudges ---
    const v = videoRef.current;
    if (v) {
      // pastikan benar-benar inline & senyap SEBELUM play()
      v.muted = true;
      // @ts-ignore – tambahkan atribut vendor lama untuk Safari lama
      v.setAttribute("webkit-playsinline", "true");
      v.setAttribute("playsinline", "true");
      v.setAttribute("preload", "auto");
      v.removeAttribute("controls"); // jangan tampilkan tombol play native

      // coba play segera; iOS baru biasanya mengizinkan
      v.play().catch(() => {
        // kalau ditolak (mis. Low Power Mode), coba lagi saat bisa diputar
        const tryOnce = () => {
          v.play().catch(() => {});
          v.removeEventListener("canplaythrough", tryOnce);
        };
        v.addEventListener("canplaythrough", tryOnce);
      });
    }

    // Fallback timeout jika video tak selesai
    timerRef.current = window.setTimeout(() => startFade(), FALLBACK_TIMEOUT);

    // Fallback sekali sentuh (mode hemat daya kadang blokir autoplay)
    const kick = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
      window.removeEventListener("touchstart", kick, { capture: true } as any);
    };
    window.addEventListener("touchstart", kick, { capture: true, once: true } as any);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      window.removeEventListener("touchstart", kick, { capture: true } as any);
    };
  }, []);

  const cleanup = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const startFade = useCallback(() => {
    if (startedFadeRef.current) return;
    startedFadeRef.current = true;
    cleanup();
    setIsFading(true);
    window.setTimeout(() => {
      setIsGone(true);
      onComplete();
    }, FADE_MS);
  }, [cleanup, onComplete]);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || startedFadeRef.current) return;
    if (isFinite(v.duration) && v.duration > 0 && v.currentTime / v.duration >= FADE_THRESHOLD) {
      startFade();
    }
  }, [startFade]);

  if (isGone) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center",
        "transition-opacity duration-500 ease-out [will-change:opacity]",
        isFading ? "opacity-0" : "opacity-100",
        isFading ? "pointer-events-none" : "pointer-events-auto",
      ].join(" ")}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        // @ts-ignore — atribut lama Safari
        webkit-playsinline="true"
        loop={false}
        controls={false}
        disablePictureInPicture
        onEnded={startFade}
        onTimeUpdate={handleTimeUpdate}
        className={[
          "w-screen h-screen",
          "object-cover bg-black",
          "[@media(orientation:portrait)]:object-contain",
          "[@media(orientation:portrait)]:bg-white",
          "transition-transform duration-500",
          isFading ? "scale-[1.01]" : "scale-100",
        ].join(" ")}
      >
        <source src="/webpre.mp4" type="video/mp4" />
        <p className="text-white">Browser Anda tidak mendukung video.</p>
      </video>

      <span className="sr-only motion-reduce:inline">Loading…</span>
    </div>
  );
});

export default PreLoader;
