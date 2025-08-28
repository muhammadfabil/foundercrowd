"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendlyModal } from '@/components/Hero'; // Reusing the CalendlyModal component

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const MergerAcquisitionPage = () => {
  const [openCalendly, setOpenCalendly] = useState(false);

  return (
    <>
      <Navbar />
      <main className="bg-[#F3EFE7] text-[#2B2B2B] font-figtree">
        {/* Header Section */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                FoundersCrowd <span className="text-amber-500">Mergers & Acquisitions</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/80 mb-8">
                Built by Founders, for Founders
              </p>
              <p className="text-lg leading-relaxed mb-8 text-white/70">
                Exiting your company should be a milestone, not a maze of middlemen and inflated costs. 
                At FoundersCrowd, we bring our expertise, experience, and technology to help founders 
                navigate the full M&A journey — from identifying the right acquirer to closing the deal on founder-first terms.
              </p>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See How We Work</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                Our approach to mergers and acquisitions is designed to maximize value for founders.
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl relative">
              <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-xl border border-[#2B2B2B]/10">
                <iframe 
                  src="https://player.vimeo.com/video/1032029906?h=0&autoplay=1&loop=1&muted=1"
                  className="h-full w-full"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                  title="FoundersCrowd M&A demo video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why FoundersCrowd M&A Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FoundersCrowd M&A</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                Our founder-first approach delivers the best exit outcomes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#F3EFE7] p-6 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Acquirer Profiling</h3>
                <p className="text-[#2B2B2B]/70">
                  We help you define and connect with your ideal buyer profile — whether it's a strategic acquirer, private equity group, or growth-stage company.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-[#F3EFE7] p-6 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">End-to-End Guidance</h3>
                <p className="text-[#2B2B2B]/70">
                  From first conversations to final closing, we guide you through every step of the process.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-[#F3EFE7] p-6 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Technology-Driven</h3>
                <p className="text-[#2B2B2B]/70">
                  Our proprietary tools streamline outreach, negotiation prep, and due diligence — cutting out wasted time and costly inefficiencies.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-[#F3EFE7] p-6 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Best Rates in the Market</h3>
                <p className="text-[#2B2B2B]/70">
                  No inflated investment banking fees. No unnecessary processes. Just transparent, founder-first pricing that saves you money.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-[#F3EFE7] p-6 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.03l5.25 4.5a.75.75 0 0 1-.97 1.133L12.75 9.903v5.347a.75.75 0 0 1-1.5 0V9.236l-4.158 3.251a.75.75 0 0 1-.928-1.177l4.5-3.375a.75.75 0 0 1 .858-.111Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">No Middlemen</h3>
                <p className="text-[#2B2B2B]/70">
                  We eliminate expensive intermediaries and outdated structures that do more harm than good.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="py-16 md:py-24 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Our unique approach to M&A is built on founders' experiences.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex items-start gap-6 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                </div>
                <div>
                  <p className="text-xl font-medium">
                    We are the only M&A platform built entirely by founders, for founders.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                </div>
                <div>
                  <p className="text-xl font-medium">
                    We've been on both sides of the table — scaling, exiting, and acquiring companies ourselves.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                </div>
                <div>
                  <p className="text-xl font-medium">
                    We know the founder's perspective and design every step of the journey with your best outcome in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 md:py-24 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <p className="text-2xl font-bold mb-4">To make exits as empowering as raises.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <p className="text-2xl font-bold mb-4">
                  To help founders unlock maximum value, without sacrificing time, equity, or money to intermediaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to explore an exit?</h2>
              <p className="text-lg text-white/80 mb-8">
                Let's find the right acquirer, cut out the noise, and help you close your deal — on your terms.
              </p>
              
              <button
                onClick={() => setOpenCalendly(true)}
                className="rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-white hover:text-black hover:shadow-xl"
              >
                Start Your M&A Journey
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

export default MergerAcquisitionPage;