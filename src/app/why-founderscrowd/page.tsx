"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendlyModal } from '@/components/Hero';
import { Timeline } from '@/components/ui/timeline';

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

  const timelineData = [
    {
      title: "The First Breakthrough",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            To fix this, José launched Space Funding, a leading capital raising firm. Through Space Funding, he partnered with top platforms and helped startups raise millions of dollars from thousands of investors worldwide.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            But there was a problem: every platform he worked with suffered from the same flaws:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <h4 className="font-bold text-red-800 mb-1">Too costly</h4>
                <p className="text-sm text-red-700">passing their mistakes and overhead back to startups.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h4 className="font-bold text-red-800 mb-1">Outdated models</h4>
                <p className="text-sm text-red-700">founders had to pay large fees up front, even if they didn't raise successfully.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h4 className="font-bold text-red-800 mb-1">No true win–win</h4>
                <p className="text-sm text-red-700">platforms weren't aligned with the success of the founder.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Why FoundersCrowd",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            José founded FoundersCrowd to change that.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            A platform where innovation meets fairness, where startups only pay when they raise, and where the tools are built for founders — not gatekeepers.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">•</div>
              <div>
                <p className="text-sm text-green-700">AI-powered investor funnels to match founders with the right backers.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">•</div>
              <div>
                <p className="text-sm text-green-700">Global marketing tools to take your raise anywhere with an internet connection.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">•</div>
              <div>
                <p className="text-sm text-green-700">Transparent, founder-first pricing that aligns with your success.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Best Price. Guaranteed.",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Raising capital is already hard enough — paying high upfront fees shouldn't make it harder. That's why FoundersCrowd is built on a founder-first pricing model:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">•</div>
              <div>
                <p className="text-sm text-blue-700">Lowest fees in the market — so more of your capital goes into growing your business.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">•</div>
              <div>
                <p className="text-sm text-blue-700">Pay only when you raise — we win when you win.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">•</div>
              <div>
                <p className="text-sm text-blue-700">Best price guarantee — if you find a better rate on another platform, we'll match it or improve it.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Because no founder should be held back by costs.
          </p>
        </div>
      ),
    },
    {
      title: "What We've Achieved",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Since then, we've helped companies at every stage raise over $210 million. And we're just getting started.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Our mission is bold but simple:
          </p>
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-lg text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Help founders raise $1 billion by 2030.</h3>
            <p className="text-lg opacity-90">Because when founders win, the world wins.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#F3EFE7] text-[#2B2B2B] font-figtree">
        {/* Header Section */}
        <section className="relative py-16 md:py-20 lg:py-24 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-balance">
                  Why <span className="text-amber-500">FoundersCrowd</span>
                </h1>
                <p className="text-lg md:text-2xl font-medium text-white/80 mb-6">
                  Built by Founders, for Founders
                </p>
                <p className="text-sm md:text-lg text-white/80 mb-6 max-w-xl mx-auto lg:mx-0">
                  FoundersCrowd was created to solve one of the biggest problems in the startup world: raising capital is still outdated, expensive, and stacked against the founder.
                </p>
                <p className="text-sm md:text-lg text-white/80 mb-6 max-w-xl mx-auto lg:mx-0">
                  Our founder, José Ruiz, knows this challenge first-hand.
                </p>
                <p className="text-sm md:text-lg text-white/80 mb-6 max-w-xl mx-auto lg:mx-0">
                  He started in ecommerce, where he built and scaled his own online business, eventually selling it successfully. From there, he brought the same innovation and growth mindset into the world of capital markets. What he discovered was eye-opening: while technology transformed industries like ecommerce, capital raising was stuck in the past.
                </p>
                <div className="w-12 h-1 bg-amber-500 mx-auto lg:mx-0 rounded-full"></div>
              </div>

              {/* Right Column - Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm lg:max-w-md">
                  <div className="aspect-[3/4] relative rounded-lg md:rounded-xl overflow-hidden shadow-lg border border-white/10">
                    <Image
                      src="/founders.jpg"
                      alt="José Ruiz, Founder of FoundersCrowd"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x600/333/FFF?text=Founder";
                      }}
                    />
                    <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      José Ruiz, Founder
                    </div>
                  </div>
                </div>
              </div>
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
        <section className="py-12 md:py-16 bg-black">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-lg font-bold text-white">Trusted by</p>
            </div>

            <div className="relative overflow-hidden">
              {/* Gradient fade effects */}
              <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

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

        {/* Timeline Section */}
        <section className="">
          <div className="w-full">
            <Timeline data={timelineData} />
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
                className="rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#2B2B2B] hover:shadow-xl"
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