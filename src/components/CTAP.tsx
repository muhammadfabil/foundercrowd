import Image from "next/image";
import CTAButton from "./CTAButton";

export default function CTAP() {
  return (
    <section className="relative h-[100dvh] overflow-hidden flex flex-col items-center justify-center isolate bg-black">
      {/* BG video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="earth-video-bg absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/EarthVideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* Content dengan z-index tertinggi */}
      <div className="relative z-20 text-center space-y-8">
        {/* Logo + Brand */}
        <div className="flex flex-col items-center space-y-4">
          <div
            className="relative"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain rounded-2xl"
            />
          </div>
          <h2
            className="text-white text-2xl md:text-3xl font-bold tracking-wider"
          >
            Space Funding
          </h2>
        </div>

        {/* Main Heading */}
        <h1
          className="text-white font-extrabold leading-[0.9] tracking-tight"
        >
          <span className="block text-[12vw] md:text-[6vw] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            START RAISING
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/95 text-lg md:text-2xl"
        >
          Your Vision. Your Terms.
        </p>

        {/* CTA Buttons */}
        <div
          
        >
          <CTAButton size="lg">Book a Call</CTAButton>
        </div>
      </div>
    </section>
  );
}
