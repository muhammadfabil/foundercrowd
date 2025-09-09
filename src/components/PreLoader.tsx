import React, { useEffect, useRef, useState } from "react";

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const [isGone, setIsGone] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const fadeMs = 500; // durasi cross-fade cepat
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedFadeRef = useRef(false);

  useEffect(() => {
    // Fallback jika video tak pernah main/selesai
    timerRef.current = window.setTimeout(() => startFade(), 10000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const cleanup = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

  const startFade = () => {
    if (startedFadeRef.current) return;
    startedFadeRef.current = true;
    cleanup();
    setIsFading(true);
    // Setelah fade: lepas overlay + notify parent
    window.setTimeout(() => {
      setIsGone(true);
      onComplete();
    }, fadeMs);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || startedFadeRef.current) return;
    // Mulai cross-fade 3% terakhir durasi (overlap ke hero)
    if (isFinite(v.duration) && v.duration > 0 && v.currentTime / v.duration >= 0.97) {
      startFade();
    }
  };

  if (isGone) return null;

  return (
    // overlay di atas hero: hero sudah render di bawah untuk cross-fade
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center",
        // cross-fade cepat, hint performa
        "transition-opacity duration-500 ease-out [will-change:opacity]",
        isFading ? "opacity-0" : "opacity-100",
        // saat fade berlangsung, biarkan event tembus ke bawah lebih cepat
        isFading ? "pointer-events-none" : "pointer-events-auto",
      ].join(" ")}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={startFade}
        onTimeUpdate={handleTimeUpdate}
        // Full Tailwind, orientasi-aware:
        className={[
          "w-screen h-screen",
          // default (desktop/landscape): isi penuh → cover, latar hitam
          "object-cover bg-black",
          // portrait phones: jangan crop → contain, latar putih (match end frame)
          "[@media(orientation:portrait)]:object-contain",
          "[@media(orientation:portrait)]:bg-white",
          // sedikit smoothing bila fade (opsional micro-scale untuk kesan premium)
          "transition-transform duration-500",
          isFading ? "scale-[1.01]" : "scale-100",
        ].join(" ")}
      >
        <source src="/webpre.mp4" type="video/mp4" />
        <p className="text-white">Browser Anda tidak mendukung video.</p>
      </video>

      {/* Respect reduced motion */}
      <span className="sr-only motion-reduce:inline">
        Loading…
      </span>
    </div>
  );
};

export default PreLoader;
