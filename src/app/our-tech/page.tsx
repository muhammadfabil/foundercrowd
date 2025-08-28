"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Plan from "@/components/Plan";
import Integration from "@/components/Integration";
import Testimony from "@/components/Testimony";
import Footer from "@/components/Footer";
import TestiMap from "@/components/TestiMap";
import Statement from "@/components/Statement";
import { CalendlyModal } from "@/components/Hero"; // Reusing the CalendlyModal component

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const OurTechPage = () => {
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <>
      <Navbar />
      <main className="bg-[#F3EFE7] text-[#2B2B2B] font-figtree">
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

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <Features />
        </section>

        {/* TestiMap Section */}
        <section className="py-16 md:py-24 bg-white">
          <TestiMap />
        </section>

        {/* Statement Section */}
        <section className="py-16 md:py-24">
          <Statement />
        </section>

        {/* Plan Section */}
        <section className="py-16 md:py-24 bg-white">
          <Plan />
        </section>

        {/* Integration Section */}
        <section className="py-16 md:py-24">
          <Integration />
        </section>

        {/* Testimony Section */}
        <section className="py-16 md:py-24 bg-white">
          <Testimony />
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