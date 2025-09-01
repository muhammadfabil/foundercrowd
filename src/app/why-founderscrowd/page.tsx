"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendlyModal } from '@/components/Hero';

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const WhyFoundersCrowdPage = () => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll for parallax and animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#F3EFE7] text-[#2B2B2B] font-figtree">
        {/* Header Section - Centered Text Only */}
        <section className="relative py-16 md:py-20 lg:py-24 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                Why <span className="text-amber-500">FoundersCrowd</span>
              </h1>
              <p className="text-lg md:text-2xl font-medium text-white/80 mb-8">
                Built by Founders, for Founders
              </p>
              <p className="text-base md:text-lg text-white/80 mb-6 max-w-3xl mx-auto">
                FoundersCrowd was created to solve one of the biggest problems in the startup world: raising capital is still outdated, expensive, and stacked against the founder.
              </p>
              <p className="text-base md:text-lg text-white/80 mb-6 max-w-3xl mx-auto">
                Our founder, José Ruiz, knows this challenge first-hand.
              </p>
              <p className="text-base md:text-lg text-white/80 mb-6 max-w-3xl mx-auto">
                He started in ecommerce, where he built and scaled his own online business, eventually selling it successfully. From there, he brought the same innovation and growth mindset into the world of capital markets. What he discovered was eye-opening: while technology transformed industries like ecommerce, capital raising was stuck in the past.
              </p>
              <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Vision in Action</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                A platform designed to transform how founders connect with capital.
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
                  title="FoundersCrowd vision video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-12 md:py-16 bg-[#2B2B2B]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-lg font-bold text-white">Trusted by</p>
            </div>

            <div className="relative overflow-hidden">
              {/* Gradient fade effects */}
              <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#2B2B2B] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#2B2B2B] to-transparent z-10"></div>

              {/* Scrolling logos */}
              <div className="flex animate-scroll-horizontal items-center space-x-12">
                {/* First set of logos - duplicated for continuity */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`logo-set1-${index}`}
                    className="flex-shrink-0 w-32 h-16 flex items-center justify-center"
                  >
                    <img
                      src="/logo1.png"
                      alt="Partner Logo"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/200x80/ddd/999?text=LOGO"
                      }}
                    />
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`logo-set2-${index}`}
                    className="flex-shrink-0 w-32 h-16 flex items-center justify-center"
                  >
                    <img
                      src="/logo1.png"
                      alt="Partner Logo"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/200x80/ddd/999?text=LOGO"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Zig-Zag Content Sections */}
        
        {/* Section 1: The First Breakthrough (Image Left, Content Right) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/why.jpg"
                    alt="The First Breakthrough - Problem illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">
                    THE PROBLEM
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-4">
                    The First Breakthrough
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#2B2B2B]/80">
                  <p className="text-base md:text-lg leading-relaxed">
                    To fix this, José launched Space Funding, a leading capital raising firm. Through Space Funding, he partnered with top platforms and helped startups raise millions of dollars from thousands of investors worldwide.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    But there was a problem: every platform he worked with suffered from the same flaws:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-[#2B2B2B] font-medium">Too costly - passing mistakes back to startups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-[#2B2B2B] font-medium">Outdated models - large upfront fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-[#2B2B2B] font-medium">No true win-win alignment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why FoundersCrowd (Content Left, Image Right) */}
        <section className="py-16 md:py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
                    THE SOLUTION
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-4">
                    Why FoundersCrowd
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#2B2B2B]/80">
                  <p className="text-base md:text-lg leading-relaxed">
                    José founded FoundersCrowd to change that.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    A platform where innovation meets fairness, where startups only pay when they raise, and where the tools are built for founders — not gatekeepers.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-green-200">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#2B2B2B] font-medium">AI-powered investor funnels to match founders with the right backers</span>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-green-200">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#2B2B2B] font-medium">Global marketing tools to take your raise anywhere</span>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-green-200">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#2B2B2B] font-medium">Transparent, founder-first pricing aligned with your success</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative order-1 lg:order-2">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/why.jpg"
                    alt="Why FoundersCrowd - Solution illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Best Price Guaranteed (Image Left, Content Right) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/why.jpg"
                    alt="Best Price Guaranteed - Pricing illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                    PRICING
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-4">
                    Best Price. Guaranteed.
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#2B2B2B]/80">
                  <p className="text-base md:text-lg leading-relaxed">
                    Raising capital is already hard enough — paying high upfront fees shouldn't make it harder. That's why FoundersCrowd is built on a founder-first pricing model:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">$</span>
                    </div>
                    <span className="text-[#2B2B2B] font-medium">Lowest fees in the market — more capital goes to your business</span>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="text-[#2B2B2B] font-medium">Pay only when you raise — we win when you win</span>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">🏆</span>
                    </div>
                    <span className="text-[#2B2B2B] font-medium">Best price guarantee — we'll match or beat any competitor</span>
                  </div>
                </div>

                <p className="text-[#2B2B2B]/70 italic">
                  Because no founder should be held back by costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: What We've Achieved (Content Left, Image Right) */}
        <section className="py-16 md:py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
                    OUR IMPACT
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-4">
                    What We've Achieved
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#2B2B2B]/80">
                  <p className="text-base md:text-lg leading-relaxed">
                    Since then, we've helped companies at every stage raise over $210 million. And we're just getting started.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Our mission is bold but simple:
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-2xl text-white shadow-lg">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                    Help founders raise $1 billion by 2030
                  </h3>
                  <p className="text-lg text-center opacity-90">
                    Because when founders win, the world wins.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="text-2xl font-bold text-amber-600">$210M+</h4>
                    <p className="text-sm text-[#2B2B2B]/70">Capital Raised</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="text-2xl font-bold text-amber-600">1000+</h4>
                    <p className="text-sm text-[#2B2B2B]/70">Founders Helped</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative order-1 lg:order-2">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/why.jpg"
                    alt="What We've Achieved - Impact illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of founders who are transforming how they raise capital.
              </p>

              <button
                onClick={() => setOpenCalendly(true)}
                className="rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-amber-700 hover:shadow-xl"
              >
                Start Raising
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

          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll-horizontal {
            animation: scroll-horizontal 25s linear infinite;
            width: calc(200%);
          }

          .animate-scroll-horizontal:hover {
            animation-play-state: paused;
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
};

export default WhyFoundersCrowdPage;