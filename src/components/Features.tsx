"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { FaHome, FaRegChartBar, FaRegCreditCard, FaFileSignature } from "react-icons/fa";
import { CiStreamOn } from "react-icons/ci";
import { BsBank } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { IconType } from "react-icons";
import { motion, AnimatePresence } from 'framer-motion';

// Define the feature type
type Feature = {
  id: number;
  icon: IconType;
  title: string;
  description: string;
  image: string;
};

// Phrases for sequential highlighting (extracted as constant for better performance)
const phrases = [
  "Raise capital online and offline.",
  "Raise locally and globally.",
  "Raise with fans and with funds.",
  "Raise from day one to IPO day."
];

// Memoized features data
const useFeaturesData = () => useMemo(() => ({
  1: {
    id: 1,
    icon: FaHome,
    title: "Self-Hosted Investor Funnels",
    description: "Run your raise on your own branded funnel. Keep control, keep ownership, and connect directly with your investors.",
    image: "/fix1.png"
  },
  2: {
    id: 2,
    icon: FaRegChartBar,
    title: "Grow Your Brand",
    description: "Every raise is also a marketing engine. Turn investors into advocates who amplify your startup worldwide.",
    image: "/fix2.png"
  },
  3: {
    id: 3,
    icon: FaRegCreditCard,
    title: "Seamless Investor Checkout",
    description: "Investing is as simple as shopping online. Fast, secure, and friction-free for every backer.",
    image: "/fix3.png"
  },
  4: {
    id: 4,
    icon: FaFileSignature,
    title: "Sign Agreements",
    description: "No endless paperwork. Investors sign instantly with secure digital agreements, keeping your raise compliant and quick.",
    image: "/fix4.png"
  }
} as Record<number, Feature>), []);

const FeatureList = React.memo(({ features, activeFeature, setActiveFeature }: {
  features: Record<number, Feature>;
  activeFeature: number;
  setActiveFeature: (id: number) => void;
}) => (
  <div className="bg-gray-50 rounded-2xl p-2 space-y-2">
    {Object.values(features).map((feature: Feature) => {
      const Icon = feature.icon;
      return (
        <div
          key={feature.id}
          className={`
            cursor-pointer transition-all duration-300 rounded-xl p-6
            ${activeFeature === feature.id
              ? 'bg-[#eef1ff] shadow-lg border-l-4 border-[#5271ff]'
              : 'hover:bg-gray-50'}
          `}
          onClick={() => setActiveFeature(feature.id)}
        >
          <div className="flex items-start gap-4">
            <div className="text-gray-600 text-xl mt-1"><Icon /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#2B2B2B]">
                  {feature.title}
                </h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-400 flex-shrink-0"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
));

// ✅ FIXED: FeatureImage dengan proper container constraints
const FeatureImage = React.memo(({ feature }: { feature: Feature }) => (
  <div className="relative w-full h-[350px] overflow-hidden flex items-center justify-center">
    <Image
      src={feature.image}
      alt={feature.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      className="object-contain p-4 scale-110 transition-transform duration-300"
      priority
    />
  </div>
));

// ✅ FIXED: ImageCarousel dengan proper responsive containers
const ImageCarousel = React.memo(() => {
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  // Cycle through text highlights every 2 seconds
  useEffect(() => {
    const textInterval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    
    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="mb-28">
      {/* As Seen On Section */}
      <div className="w-full mb-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop version - horizontal */}
          <div className="hidden md:flex items-center">
            {/* "As Seen On" text - fixed position */}
            <div className="flex-shrink-0 mr-2 lg:mr-16 z-20">
              <p className="text-sm lg:text-base text-black whitespace-nowrap font-bold">As Seen On</p>
            </div>
            
            {/* Logo scrolling container */}
            <div className="flex-1 relative overflow-hidden">
              {/* Gradient fade effects */}
              <div className="absolute left-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Scrolling logos horizontal */}
              <div className="flex animate-scroll-horizontal items-center space-x-6 lg:space-x-12">
                {/* First set of logos */}
                {[
                  { src: '/nbc.jpg', alt: 'NBC Affiliate Marketing' },
                  { src: '/aw.png', alt: 'Americas Wire' },
                  { src: '/yf.png', alt: 'Yahoo Finance' },
                  { src: '/nwr.png', alt: 'Access Newswire' },
                  { src: '/ba.png', alt: 'Acquisition International' },
                  { src: '/bi.jpeg', alt: 'Business Insider' },
                  { src: '/forbes.svg', alt: 'Forbes' }
                ].map((logo, index) => (
                  <div 
                    key={`logo-set1-${index}`}
                    className="flex-shrink-0 w-20 h-12 lg:w-24 lg:h-12 xl:w-32 xl:h-16 flex items-center justify-center"
                  >
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      width={128} 
                      height={64} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  { src: '/nbc.jpg', alt: 'NBC Affiliate Marketing' },
                  { src: '/aw.png', alt: 'Americas Wire' },
                  { src: '/yf.png', alt: 'Yahoo Finance' },
                  { src: '/nwr.png', alt: 'Access Newswire' },
                  { src: '/ba.png', alt: 'Acquisition International' },
                  { src: '/bi.jpeg', alt: 'Business Insider' },
                  { src: '/forbes.svg', alt: 'Forbes' }
                ].map((logo, index) => (
                  <div 
                    key={`logo-set2-${index}`}
                    className="flex-shrink-0 w-20 h-12 lg:w-24 lg:h-12 xl:w-32 xl:h-16 flex items-center justify-center"
                  >
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      width={128} 
                      height={64} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile version - improved layout */}
          <div className="md:hidden">
            <div className="text-center mb-4">
              <p className="text-sm text-[#2B2B2B] font-bold">As Seen On</p>
            </div>
            
            <div className="relative overflow-hidden">
              {/* Gradient fade effects for horizontal */}
              <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-6 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Horizontal scrolling logos */}
              <div className="flex animate-scroll-horizontal items-center space-x-4">
                {/* First set of logos */}
                {[
                  { src: '/nbc.jpg', alt: 'NBC Affiliate Marketing' },
                  { src: '/aw.png', alt: 'Americas Wire' },
                  { src: '/yf.png', alt: 'Yahoo Finance' },
                  { src: '/nwr.png', alt: 'Access Newswire' },
                  { src: '/ba.png', alt: 'Acquisition International' },
                  { src: '/bi.jpeg', alt: 'Business Insider' },
                  { src: '/forbes.svg', alt: 'Forbes' }
                ].map((logo, index) => (
                  <div 
                    key={`mobile-logo-set1-${index}`}
                    className="flex-shrink-0 w-16 h-10 flex items-center justify-center"
                  >
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      width={64} 
                      height={40} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  { src: '/nbc.jpg', alt: 'NBC Affiliate Marketing' },
                  { src: '/aw.png', alt: 'Americas Wire' },
                  { src: '/yf.png', alt: 'Yahoo Finance' },
                  { src: '/nwr.png', alt: 'Access Newswire' },
                  { src: '/ba.png', alt: 'Acquisition International' },
                  { src: '/bi.jpeg', alt: 'Business Insider' },
                  { src: '/forbes.svg', alt: 'Forbes' }
                ].map((logo, index) => (
                  <div 
                    key={`mobile-logo-set2-${index}`}
                    className="flex-shrink-0 w-16 h-10 flex items-center justify-center"
                  >
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      width={64} 
                      height={40} 
                      className="max-w-full max-h-full object-contain"
                      priority={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-medium text-[#2B2B2B] mb-4">
        The one platform behind the next generation of startups
      </h2>

      <p className="text-[#2B2B2B] text-xl md:text-2xl mt-6 mb-12 max-w-5xl">
        {phrases.map((phrase, index) => (
          <span 
            key={index}
            className={`
              inline-block px-1 py-0.5
              transition-all duration-300
              ${activeTextIndex === index ? 'text-[#5271ff]' : 'text-gray-500'}
              hover:text-[#00c28a] cursor-pointer
            `}
          >
            {phrase}
          </span>
        ))}
      </p>
      
      {/* ✅ FIXED: Responsive grid dengan proper image containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto">
        {/* Image 1 Container */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-md h-80 bg-gray-50 rounded-2xl overflow-hidden
                          cursor-pointer transition-all duration-300 ease-in-out 
                          hover:scale-[1.02] hover:shadow-lg
                          focus:scale-[1.02] focus:outline-none 
                          flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src="/feat1.png"
                alt="Investor Funnel Screenshot 1"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 400px"
                className="object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* Image 2 Container */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-md h-80 bg-gray-50 rounded-2xl overflow-hidden
                          cursor-pointer transition-all duration-300 ease-in-out 
                          hover:scale-[1.02] hover:shadow-lg
                          focus:scale-[1.02] focus:outline-none 
                          flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src="/feat2.png"
                alt="Investor Funnel Screenshot 2"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 400px"
                className="object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Features = () => {
  const featuresData = useFeaturesData();
  const [activeFeature, setActiveFeature] = useState(1);
  const active = featuresData[activeFeature];

  return (
    <section className="py-20 bg-white font-figtree">
      <div className="max-w-7xl mx-auto px-4">
        {/* New Carousel Section */}
        <ImageCarousel />

        {/* Original Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-[#2B2B2B] mb-4">
            Space Funding makes investing in startups as simple as buying a product online.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left Side - Feature List */}
          <div className="w-full lg:w-1/2">
            <FeatureList
              features={featuresData}
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
            />
          </div>

          {/* Right Side - Feature Image stretches to match feature list height */}
          <div className="w-full lg:w-1/2 flex">
            <div className="relative w-full">
              <div className="bg-gray-100 rounded-3xl p-6 shadow-2xl overflow-hidden h-full flex items-center justify-center">
                <FeatureImage feature={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
