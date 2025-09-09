"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Steps from "@/components/Steps";
import TestiMap from "@/components/TestiMap";
import Statement from "@/components/Statement";
import Plan from "@/components/Plan";
import Integration from "@/components/Integration";
import { CalendlyModal } from "@/components/Hero";

const DEFAULT_CALENDLY_URL = "https://calendly.com/founderscrowds/30min";

const OurTechPage = () => {
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 lg:pt-40 bg-[#2B2B2B] text-white overflow-hidden pb-24">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                Our <span className="text-amber-500">Tech</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Discover the cutting-edge platform that powers successful capital raises for businesses worldwide.
              </p>
              {/* Hero video - improved mobile spacing and sizing */}
              <div className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 mb-6 md:mb-8 relative mx-auto max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-lg border border-gray-100">
                  <iframe 
                    src="https://player.vimeo.com/video/1115691817?h=0&autoplay=1&loop=1&muted=1"
                    className="h-full w-full"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                    title="Platform demo video"
                  />
                </div>
              </div>
              <button
                onClick={() => setOpenCalendly(true)}
                className="rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-white hover:text-black hover:shadow-xl"
              >
                Book a Call
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Features */}
        <Features />

        {/* Section 3: Steps */}
        <Steps />

        {/* Section 4: TestiMap */}
        <TestiMap />

        {/* Section 5: Statement */}
        <Statement />

        {/* Section 6: Plan */}
        <Plan />

        {/* Section 7: Integration */}
        <Integration />

        {/* CTA Section */}
        <section className="py-20 bg-white text-amber-600">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-6xl font-bold mb-6">Ready to leverage our technology?</h2>
              <p className="text-lg text-amber-600 mb-8">
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