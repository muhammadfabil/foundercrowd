"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // ukur tinggi viewport agar start dari bawah beneran (px)
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  // progress scroll 0 -> 1 selama melewati section ini
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax background
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // POSISI FINAL TEKS: 1/4 tinggi dari atas
  // Container teks diposisikan absolute di top: 25% (final), lalu kita beri translateY dari bawah
  const START_FROM = vh * 0.9; // mulai ~90% vh di bawah posisi final (practically off-screen bawah)
  const textY = useTransform(scrollYProgress, [0, 1], [START_FROM, 0]);

  // Layer atas (di atas overlay) -> fade-in menjelang akhir agar hasil akhir full & tajam
  const topTextOpacity = useTransform(scrollYProgress, [0.7, 0.9, 1], [0, 0.6, 1]);
  // Layer bawah (di bawah overlay) -> muncul lebih awal
  const underTextOpacity = useTransform(scrollYProgress, [0.02, 0.15], [0, 1]);

  // Subheading & CTA (di atas overlay)
  const subY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  // Overlay gedung turun sedikit di akhir agar makin membuka area teks
  const maskShift = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={ref} className="relative h-[125vh] overflow-hidden">
      {/* BG image (parallax) */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }}>
        <Image
          src="/paralax.jpg"
          alt="City"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay kontras */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/25 to-black/60" />

      {/* ====== TEKS LAYER BAWAH (di bawah overlay gedung) ====== */}
      <motion.div
        // final pos: top 25% (sekitar 1/4 gambar)
        className="absolute left-1/2 z-31 -translate-x-1/2 pointer-events-none"
        style={{ top: "25%", y: textY, opacity: underTextOpacity }}
      >
        <h1 className="text-white font-extrabold leading-[0.9] tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] text-center">
          <span className="block text-[14vw] md:text-[9vw]">START RAISING</span>
        </h1>
      </motion.div>

      {/* ====== OVERLAY GEDUNG (menutupi teks bawah) ====== */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ y: maskShift }}
      >
        <Image
          src="/paralax.jpg"
          alt="Skyline overlay"
          fill
          priority
          className="object-cover"
          style={{
            // lebih rendah agar teks tidak hilang: sesuaikan persentase jika perlu
            maskImage: "linear-gradient(to top, black 50%, rgba(0,0,0,0) 78%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 50%, rgba(0,0,0,0) 78%)",
            maskSize: "cover",
            WebkitMaskSize: "cover",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* ====== TEKS LAYER ATAS (di atas overlay) -> FULL di akhir ====== */}
      <motion.div
        className="absolute left-1/2 z-30 -translate-x-1/2 pointer-events-none"
        style={{ top: "25%", y: textY, opacity: topTextOpacity }}
      >
        <h1 className="text-white font-extrabold leading-[0.9] tracking-tight text-center drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
          <span className="block text-[14vw] md:text-[9vw]">START RAISING</span>
        </h1>
      </motion.div>

      {/* ====== SUBTITLE + CTA (di atas overlay) ====== */}
      <motion.div
        className="absolute left-1/2 z-30 -translate-x-1/2 mt-8 text-center"
        style={{ top: "38%", y: subY, opacity: ctaOpacity }}
      >
        <p className="text-white/95 text-lg md:text-2xl">Your Vision. Your Terms.</p>

        <motion.div
          style={{ y: ctaY }}
          className="mt-6 flex gap-4 justify-center"
        >
          <button className="px-6 py-3 bg-teal-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition">
            Book a Call
          </button>
          <button className="px-6 py-3 border border-white/80 text-white font-semibold rounded-full backdrop-blur-md hover:bg-white hover:text-black transition">
            View Case Studies
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
