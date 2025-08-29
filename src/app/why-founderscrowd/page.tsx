"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendlyModal } from '@/components/Hero'; // Reusing the CalendlyModal component


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
        {/* Header Section */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                Why <span className="text-amber-500">FoundersCrowd</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/80 mb-8">
                Built by Founders, for Founders
              </p>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg md:text-xl leading-relaxed">
                  FoundersCrowd was created to solve one of the biggest problems in the startup world: 
                  raising capital is still outdated, expensive, and stacked against the founder.
                </p>
                <p className="mt-6 text-lg md:text-xl leading-relaxed">
                  Our founder, José Ruiz, knows this challenge first-hand. 
                  He started in ecommerce, where he built and scaled his own online business, 
                  eventually selling it successfully. From there, he brought the same innovation 
                  and growth mindset into the world of capital markets. What he discovered was eye-opening: 
                  while technology transformed industries like ecommerce, capital raising was stuck in the past.
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:rotate-1 hover:scale-[1.02]">
                  <Image 
                    src="/founders.png" 
                    alt="José Ruiz, Founder of FoundersCrowd" 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x600/333/FFF?text=Founder"
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                  <span className="font-bold text-white text-sm">Founder</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-20 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Vision in Action</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                A platform designed to transform how founders connect with capital.
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl relative">
              <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-xl border border-white/10">
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

        {/* As Seen On Section */}
        <section className="py-12 md:py-16 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-lg font-bold text-[#2B2B2B]">Trusted by</p>
            </div>
            
            <div className="relative overflow-hidden">
              {/* Gradient fade effects */}
              <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#F3EFE7] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#F3EFE7] to-transparent z-10"></div>
              
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

        {/* First Breakthrough Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The First Breakthrough</h2>
              
              <p className="text-lg leading-relaxed mb-8">
                To fix this, José launched Space Funding, a leading capital raising firm. Through Space Funding, 
                he partnered with top platforms and helped startups raise millions of dollars from thousands of 
                investors worldwide.
              </p>
              
              <p className="text-lg leading-relaxed mb-8">
                But there was a problem: every platform he worked with suffered from the same flaws:
              </p>
              
              <div className="space-y-6 mt-10">
                <div className="flex items-start gap-4 p-6 rounded-lg bg-[#F3EFE7] transform transition hover:scale-[1.01]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Too costly</h3>
                    <p className="text-[#2B2B2B]/80">Passing their mistakes and overhead back to startups.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 rounded-lg bg-[#F3EFE7] transform transition hover:scale-[1.01]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Outdated models</h3>
                    <p className="text-[#2B2B2B]/80">Founders had to pay large fees up front, even if they didn't raise successfully.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 rounded-lg bg-[#F3EFE7] transform transition hover:scale-[1.01]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">No true win–win</h3>
                    <p className="text-[#2B2B2B]/80">Platforms weren't aligned with the success of the founder.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why FoundersCrowd Section */}
        <section className="py-20 md:py-28 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why FoundersCrowd</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                José founded FoundersCrowd to change that.
              </p>
            </div>
            
            <div className="text-center mb-16">
              <p className="text-xl md:text-2xl font-medium mb-2">A platform where innovation meets fairness</p>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Where startups only pay when they raise, and where the tools are built for founders — not gatekeepers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-[1.03] hover:bg-white/10">
                <div className="w-14 h-14 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">AI-powered investor funnels</h3>
                <p className="text-white/70">
                  To match founders with the right backers who believe in your vision.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-[1.03] hover:bg-white/10">
                <div className="w-14 h-14 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Global marketing tools</h3>
                <p className="text-white/70">
                  To take your raise anywhere with an internet connection.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-[1.03] hover:bg-white/10">
                <div className="w-14 h-14 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Transparent pricing</h3>
                <p className="text-white/70">
                  Founder-first pricing that aligns with your success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Best Price. Guaranteed.</h2>
              <p className="text-lg text-[#2B2B2B]/80">
                Raising capital is already hard enough — paying high upfront fees shouldn't make it harder. 
                That's why FoundersCrowd is built on a founder-first pricing model:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Lowest fees in the market</h3>
                <p className="text-[#2B2B2B]/70">
                  So more of your capital goes into growing your business.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Pay only when you raise</h3>
                <p className="text-[#2B2B2B]/70">
                  We win when you win.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Best price guarantee</h3>
                <p className="text-[#2B2B2B]/70">
                  If you find a better rate on another platform, we'll match it or improve it.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-lg italic text-[#2B2B2B]/80">
                Because no founder should be held back by costs.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 md:py-28 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What We've Achieved</h2>
              <p className="text-lg text-white/80">
                Since then, we've helped companies at every stage raise over $210 million. And we're just getting started.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 text-center min-w-[240px]">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">$210M+</div>
                <p className="text-white/70">Capital Raised</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 text-center min-w-[240px]">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">41K+</div>
                <p className="text-white/70">Investors</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 text-center min-w-[240px]">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">150+</div>
                <p className="text-white/70">Startups Funded</p>
              </div>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl mb-8">Our mission is bold but simple:</p>
              <div className="bg-amber-500 rounded-lg p-6 md:p-8 mb-8 transform transition hover:scale-[1.02]">
                <p className="text-2xl md:text-3xl font-bold">Help founders raise $1 billion by 2030.</p>
              </div>
              <p className="text-lg italic">Because when founders win, the world wins.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-[#2B2B2B]/80 mb-8">
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