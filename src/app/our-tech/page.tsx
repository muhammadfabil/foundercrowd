"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendlyModal } from "@/components/Hero";
import { WavyBackground } from "@/components/ui/wavy-background";

// Dynamically import components that might use browser APIs
const Features = dynamic(() => import("@/components/Features"), {
  ssr: false,
  loading: () => <div className="py-16 md:py-24 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
});

const Plan = dynamic(() => import("@/components/Plan"), {
  ssr: false,
  loading: () => <div className="py-16 md:py-24 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
});

const Integration = dynamic(() => import("@/components/Integration"), {
  ssr: false,
  loading: () => <div className="py-16 md:py-24 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
});

const Testimony = dynamic(() => import("@/components/Testimony"), {
  ssr: false,
  loading: () => <div className="py-16 md:py-24 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
});

const TestiMap = dynamic(() => import("@/components/TestiMap"), {
  ssr: false,
  loading: () => <div className="py-16 md:py-24 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
});

const Statement = dynamic(() => import("@/components/Statement"), {
  ssr: false,
  loading: () => <div className="py-16 md:py-24 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
});

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const OurTechPage = () => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#2B2B2B] text-[#F3EFE7] font-figtree">
        {/* Header Section */}
        <section className="relative py-24 md:py-32 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
                Our <span className="text-amber-500">Technology</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/80 mb-8">
                Innovation that powers capital raising
              </p>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Wavy Background Section */}
        {isClient && (
          <WavyBackground 
            containerClassName="py-8 md:py-12 h-auto min-h-[200px]" 
            colors={["#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A", "#FEF3C7"]} 
            waveWidth={20}
            blur={2}
            backgroundFill="#2B2B2B"
            speed="fast"
            waveOpacity={0.3}
          >
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#F3EFE7]">
                Advanced Solutions for Modern Fundraising
              </h2>
              <p className="text-base text-[#F3EFE7]/80">
                Our proprietary technology streamlines the capital raising process, connecting founders with investors more efficiently than ever before.
              </p>
            </div>
          </WavyBackground>
        )}

        {/* Features Section */}
        <section className="py-16 md:py-24">
          {isClient && <Features />}
        </section>

        {/* TestiMap Section */}
        <section className="py-16 md:py-24 bg-white">
          {isClient && <TestiMap />}
        </section>

        {/* Statement Section */}
        <section className="py-16 md:py-24">
          {isClient && <Statement />}
        </section>

        {/* Plan Section */}
        <section className="py-16 md:py-24 bg-white">
          {isClient && <Plan />}
        </section>

        {/* Integration Section */}
        <section className="py-16 md:py-24">
          {isClient && <Integration />}
        </section>

        {/* Testimony Section */}
        <section className="py-16 md:py-24 bg-white">
          {isClient && <Testimony />}
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to leverage our technology?</h2>
              <p className="text-lg text-white/80 mb-8">
                Let us show you how our platform can transform your capital raising experience.
              </p>

              <button
                onClick={() => setOpenCalendly(true)}
                className="rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-white hover:text-black hover:shadow-xl"
              >
                Book a Call
              </button>
            </div>
          </div>
        </section>

        {/* Calendly Modal */}
        {openCalendly && (
          <CalendlyModal
            url={DEFAULT_CALENDLY_URL}
            onClose={() => setOpenCalendly(false)}
          />
        )}

        {/* Animation styles */}
        <style jsx>{`
          .hero-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
};

export default OurTechPage;