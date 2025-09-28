"use client";
import React, { useState, useEffect, memo, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton'; // Import CTAButton instead of CalendlyModal

// Extract constants for better performance
const rotatingTexts = [
  "Start up to Watch",
  "Category Creator", 
  "Unicorn Startup",
  "Game Changer in Sports",
  "Household Name",
  "Success IPO"
];

const WhyFoundersCrowdPage = memo(() => {
  const [scrollY, setScrollY] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  // ✅ FIXED: Move useCallback outside useEffect (Rules of Hooks)
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Track scroll for parallax and animation effects
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // ✅ FIXED: Add dependency

  // Add text rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#F3EFE7] text-[#2B2B2B] font-figtree">
        {/* Header Section - Centered Text with Video */}
        <section className="relative py-16 md:py-20 lg:py-24 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mt-5">
              <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Be the next,<br />
                <span className="block relative h-[1.2em] overflow-hidden">
                  {rotatingTexts.map((text, index) => (
                    <span
                      key={text}
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                        index === currentText
                          ? 'transform translate-y-0 opacity-100'
                          : index === (currentText - 1 + rotatingTexts.length) % rotatingTexts.length
                          ? 'transform -translate-y-full opacity-0'
                          : 'transform translate-y-full opacity-0'
                      }`}
                      style={{
                        color: '#f59e0b' // amber-500 color for highlighted text
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="text-lg md:text-2xl font-medium text-white/80 mb-8">
                Built by Founders, for Founders
              </p>
              <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mb-12"></div>
            </div>

            {/* Video in Header Section */}
            <div className="mx-auto max-w-4xl relative">
              <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-xl border border-white/10">
                <iframe
                  src="https://player.vimeo.com/video/1120665006?h=0&autoplay=1&loop=1&muted=1"
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
        
        {/* Section 1: Our Story (Image Left, Content Right) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image - Left */}
              <div className="relative order-1">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/why.jpg"
                    alt="FoundersCrowD story illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Content - Right */}
              <div className="space-y-6 order-2">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-4">
                    Our Story
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#2B2B2B]/80">
                  <p className="text-base md:text-lg leading-relaxed">
                    FoundersCrowd was created to solve one of the biggest problems in the startup world: raising capital is still outdated, expensive, and stacked against the founder.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Our founder, José Ruiz, knows this challenge first-hand.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    He started in ecommerce, where he built and scaled his own online business, eventually selling it successfully. From there, he brought the same innovation and growth mindset into the world of capital markets. What he discovered was eye-opening: while technology transformed industries like ecommerce, capital raising was stuck in the past.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The First Breakthrough (Content Left, Image Right) */}
        <section className="py-16 md:py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content - Left */}
              <div className="space-y-6 order-2 lg:order-1">
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

              {/* Image - Right */}
              <div className="relative order-1 lg:order-2">
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
            </div>
          </div>
        </section>

        {/* Section 3: Why FoundersCrowd (Image Left, Content Right) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image - Left */}
              <div className="relative order-1">
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

              {/* Content - Right */}
              <div className="space-y-6 order-2">
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
            </div>
          </div>
        </section>

        {/* Section 4: Best Price Guaranteed (Content Left, Image Right) */}
        <section className="py-16 md:py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content - Left */}
              <div className="space-y-6 order-2 lg:order-1">
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

              {/* Image - Right */}
              <div className="relative order-1 lg:order-2">
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
            </div>
          </div>
        </section>

        {/* Section 5: What We've Achieved (Centered Content) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div>
                <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
                  OUR IMPACT
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-6">
                  What We've Achieved
                </h2>
              </div>
              
              <div className="space-y-4 text-[#2B2B2B]/80 mb-8">
                <p className="text-base md:text-lg leading-relaxed">
                  Since then, we've helped companies at every stage raise over $210 million. And we're just getting started.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Our mission is bold but simple:
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-2xl text-white shadow-lg mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                  Help founders raise $1 billion by 2030
                </h3>
                <p className="text-lg text-center opacity-90">
                  Because when founders win, the world wins.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8 max-w-md mx-auto">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <h4 className="text-3xl font-bold text-amber-600">$210M+</h4>
                  <p className="text-sm text-[#2B2B2B]/70">Capital Raised</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <h4 className="text-3xl font-bold text-amber-600">1000+</h4>
                  <p className="text-sm text-[#2B2B2B]/70">Founders Helped</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated to use CTAButton */}
        <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-6xl font-bold mb-6 text-amber-600">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of founders who are transforming how they raise capital.
              </p>

              {/* Use the exported CTAButton - exactly same as CTAP */}
              <CTAButton size="md">Start Raising</CTAButton>
            </div>
          </div>
        </section>

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
});

export default WhyFoundersCrowdPage;