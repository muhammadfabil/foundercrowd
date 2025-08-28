"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import Integration  from '@/components/Integration';
import { CalendlyModal } from '@/components/Hero'; // Reusing the CalendlyModal component

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const SportsPage = () => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  const headlines = [
    "Be the Next Club They Cheer For",
    "Be the Next Game Changer in Sports",
    "Be the Next Household Team Name",
    "Be the Next Sports Unicorn"
  ];

  // Track scroll for parallax and animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#F3EFE7] text-[#2B2B2B] font-figtree">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-[#2B2B2B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                FoundersCrowd <span className="text-amber-500">Sports</span>
              </h1>
              
              <div className="h-20 md:h-24 overflow-hidden relative mb-8">
                <p 
                  className="text-2xl md:text-3xl font-medium absolute transition-all duration-500 w-full"
                  style={{ 
                    opacity: currentHeadline === 0 ? 1 : 0,
                    transform: `translateY(${currentHeadline === 0 ? 0 : -20}px)`
                  }}
                >
                  {headlines[0]}
                </p>
                <p 
                  className="text-2xl md:text-3xl font-medium absolute transition-all duration-500 w-full"
                  style={{ 
                    opacity: currentHeadline === 1 ? 1 : 0,
                    transform: `translateY(${currentHeadline === 1 ? 0 : -20}px)`
                  }}
                >
                  {headlines[1]}
                </p>
                <p 
                  className="text-2xl md:text-3xl font-medium absolute transition-all duration-500 w-full"
                  style={{ 
                    opacity: currentHeadline === 2 ? 1 : 0,
                    transform: `translateY(${currentHeadline === 2 ? 0 : -20}px)`
                  }}
                >
                  {headlines[2]}
                </p>
                <p 
                  className="text-2xl md:text-3xl font-medium absolute transition-all duration-500 w-full"
                  style={{ 
                    opacity: currentHeadline === 3 ? 1 : 0,
                    transform: `translateY(${currentHeadline === 3 ? 0 : -20}px)`
                  }}
                >
                  {headlines[3]}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-amber-500 font-medium">Raise Capital</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-amber-500 font-medium">Build Fans</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-amber-500 font-medium">Create Legacy</p>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                FoundersCrowd Sports is where clubs, teams, and sports innovators turn their passion 
                into global opportunities. We help sports organizations raise capital online while 
                building a powerful community of fans and supporters who become lifelong investors.
              </p>
              
              <button
                onClick={() => setOpenCalendly(true)}
                className="rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-white hover:text-black hover:shadow-xl"
              >
                Start Raising
              </button>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-20 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See How It Works</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                Our platform helps sports organizations connect with fans and investors worldwide.
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
                  title="FoundersCrowd Sports demo video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                Teams and clubs that have successfully raised capital with FoundersCrowd.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Caledonian Braves */}
              <div className="bg-[#F3EFE7] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="h-40 mb-4 relative rounded-lg overflow-hidden">
                  <Image 
                    src="/caledonian-braves.jpg" 
                    alt="Caledonian Braves" 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/ddd/999?text=Caledonian+Braves"
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Caledonian Braves</h3>
                <div className="mb-2 flex items-center">
                  <span className="text-amber-600 font-bold text-xl">$3M+</span>
                  <span className="ml-2 text-sm text-gray-600">Raised</span>
                </div>
                <div className="flex items-center">
                  <span className="text-amber-600 font-bold text-xl">10k+</span>
                  <span className="ml-2 text-sm text-gray-600">Investors</span>
                </div>
              </div>
              
              {/* Watford */}
              <div className="bg-[#F3EFE7] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="h-40 mb-4 relative rounded-lg overflow-hidden">
                  <Image 
                    src="/watford.jpg" 
                    alt="Watford" 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/ddd/999?text=Watford"
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Watford</h3>
                <div className="mb-2 flex items-center">
                  <span className="text-amber-600 font-bold text-xl">$9M+</span>
                  <span className="ml-2 text-sm text-gray-600">Raised</span>
                </div>
                <div className="flex items-center">
                  <span className="text-amber-600 font-bold text-xl">9k+</span>
                  <span className="ml-2 text-sm text-gray-600">Investors</span>
                </div>
              </div>
              
              {/* NK Tabor */}
              <div className="bg-[#F3EFE7] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="h-40 mb-4 relative rounded-lg overflow-hidden">
                  <Image 
                    src="/nk-tabor.jpg" 
                    alt="NK Tabor" 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/ddd/999?text=NK+Tabor"
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">NK Tabor</h3>
                <div className="mb-2 flex items-center">
                  <span className="text-amber-600 font-bold text-xl">$650k+</span>
                  <span className="ml-2 text-sm text-gray-600">Raised</span>
                </div>
                <div className="flex items-center">
                  <span className="text-amber-600 font-bold text-xl">1.3k+</span>
                  <span className="ml-2 text-sm text-gray-600">Investors</span>
                </div>
              </div>
              
              {/* Carrick Rangers */}
              <div className="bg-[#F3EFE7] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="h-40 mb-4 relative rounded-lg overflow-hidden">
                  <Image 
                    src="/carrick-rangers.jpg" 
                    alt="Carrick Rangers" 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/ddd/999?text=Carrick+Rangers"
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Carrick Rangers</h3>
                <div className="mb-2 flex items-center">
                  <span className="text-amber-600 font-bold text-xl">$700k+</span>
                  <span className="ml-2 text-sm text-gray-600">Raised</span>
                </div>
                <div className="flex items-center">
                  <span className="text-amber-600 font-bold text-xl">1.5k+</span>
                  <span className="ml-2 text-sm text-gray-600">Investors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why FoundersCrowd Sports Section */}
        <section className="py-16 md:py-24 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FoundersCrowd Sports?</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                The platform built specifically for sports organizations and their unique capital needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Turn Fans into Shareholders</h3>
                <p className="text-white/70">
                  Give supporters the chance to invest directly in their favorite team or sports startup.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Investor Funnels</h3>
                <p className="text-white/70">
                  Find the right mix of fans, sponsors, and institutional investors.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Global Reach</h3>
                <p className="text-white/70">
                  Raise money locally and internationally — from the stadium to the world stage.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:bg-white/10">
                <div className="w-12 h-12 bg-amber-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Low-Cost, High-Impact Model</h3>
                <p className="text-white/70">
                  Transparent fees. You only pay when you raise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="py-16 md:py-24 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who It's For</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                FoundersCrowd Sports serves diverse organizations across the sports ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Target 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-500 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                    <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                    <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Football & Sports Clubs</h3>
                <p className="text-[#2B2B2B]/70">
                  Looking to expand, modernize, or compete at higher levels.
                </p>
              </div>
              
              {/* Target 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-500 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                    <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Sports Startups</h3>
                <p className="text-[#2B2B2B]/70">
                  Building new technologies, fan experiences, or performance platforms.
                </p>
              </div>
              
              {/* Target 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-500 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Leagues & Associations</h3>
                <p className="text-[#2B2B2B]/70">
                  Aiming to engage fans and secure long-term financial growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology</h2>
              <p className="text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
                Built specifically for the unique needs of sports organizations.
              </p>
            </div>
            
            <Features />
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16 md:py-24 bg-[#F3EFE7]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Integration />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2B2B2B] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take your club or sports startup to the next level?</h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of sports organizations transforming how they engage with fans and raise capital.
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



export default SportsPage;