"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { FaRegChartBar, FaRegCreditCard } from "react-icons/fa";
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

// Memoized features data
const useFeaturesData = () => useMemo(() => ({
  1: {
    id: 1,
    icon: FaRegChartBar,
    title: "Automatic Expense Tracking",
    description: "Automatically categorize expenses to see where money goes.",
    image: "/features1.png"
  },
  2: {
    id: 2,
    icon: FaRegCreditCard,
    title: "Streamlined Bill Payment",
    description: "Pay bills and manage payments all in one place without any issue.",
    image: "/features2.jpg"
  },
  3: {
    id: 3,
    icon: CiStreamOn,
    title: "Real-time Money Activity",
    description: "Notifications Get notifications for unusual spending activity.",
    image: "/features3.png"
  },
  4: {
    id: 4,
    icon: BsBank,
    title: "Automatic Bank Sync",
    description: "Connect bank accounts to automatically import transactions.",
    image: "/features4.png"
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
              ? 'bg-white shadow-lg border-l-4 border-[#FEA757]'
              : 'hover:bg-white/50'}
          `}
          onClick={() => setActiveFeature(feature.id)}
        >
          <div className="flex items-start gap-4">
            <div className="text-gray-700 text-xl mt-1"><Icon /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">
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
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
));

const FeatureImage = React.memo(({ feature }: { feature: Feature }) => (
  <div className="relative w-full h-[400px]">
    <Image
      src={feature.image}
      alt={feature.title}
      fill
      className="object-contain"
      priority
    />
  </div>
));

const ImageCarousel = () => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  
  // Data gambar untuk carousel
  const carouselImages = [
    { id: 1, src: '/f1.jpg', alt: 'Raise online' },
    { id: 2, src: '/f2.jpg', alt: 'Raise globally' },
    { id: 3, src: '/f3.jpg', alt: 'Raise with funds' }
  ];

  // Phrases for sequential highlighting
  const phrases = [
    "Raise capital online and offline.",
    "Raise locally and globally.",
    "Raise with fans and with funds.",
    "Raise from day one to IPO day."
  ];

  // Layout patterns to cycle through
  const patterns = [
    // Initial pattern: 1, 2, 3
    [
      { id: 1, type: 'portrait' },
      { id: 2, type: 'landscape' },
      { id: 3, type: 'landscape' }
    ],
    // Second pattern: 2, 3, 1
    [
      { id: 2, type: 'landscape' },
      { id: 3, type: 'landscape' },
      { id: 1, type: 'portrait' }
    ],
    // Third pattern: 3, 1, 2
    [
      { id: 3, type: 'landscape' },
      { id: 1, type: 'portrait' },
      { id: 2, type: 'landscape' }
    ]
  ];

  // Auto slide every 3 seconds for desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto slide for mobile every 4 seconds
  useEffect(() => {
    const mobileInterval = setInterval(() => {
      setMobileImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    
    return () => clearInterval(mobileInterval);
  }, [carouselImages.length]);

  // Cycle through text highlights every 2 seconds
  useEffect(() => {
    const textInterval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    
    return () => clearInterval(textInterval);
  }, []);

  // Get the current layout pattern
  const currentLayout = patterns[currentPattern];

  return (
    <div className="mb-28">
      <h2 className="text-4xl md:text-5xl font-medium text-black mb-4">
        The one platform behind the next generation of startups
      </h2>
      <p className="text-black text-xl md:text-2xl mt-6 mb-12 max-w-5xl">
        {phrases.map((phrase, index) => (
          <span 
            key={index}
            className={`
              inline-block px-1 py-0.5
              transition-all duration-300
              ${activeTextIndex === index ? 'text-[#F59E0B]' : 'text-black'}
              hover:text-[#00c28a] cursor-pointer
            `}
          >
            {phrase}
          </span>
        ))}
      </p>
      
      {/* Image gallery carousel */}
      <div className="relative w-full">
        {/* Mobile: Animated carousel with single image */}
        <div className="md:hidden relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={carouselImages[mobileImageIndex].src}
                alt={carouselImages[mobileImageIndex].alt}
                fill
                className="object-cover" 
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Mobile navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === mobileImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:flex justify-between gap-4 w-full transition-all duration-1000 ease-in-out">
          {currentLayout.map((item) => {
            const image = carouselImages.find(img => img.id === item.id);
            return (
              <div 
                key={`img-${item.id}`}
                className={`
                  rounded-2xl overflow-hidden bg-gray-100 transition-all duration-1000
                  ${item.type === 'portrait' ? 'w-1/4' : 'w-1/3 flex-grow'}
                  h-80
                `}
              >
                <Image 
                  src={image?.src || ''}
                  alt={image?.alt || ''}
                  width={800} 
                  height={600}
                  className="w-full h-full object-cover" 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const featuresData = useFeaturesData();
  const [activeFeature, setActiveFeature] = useState(1);
  const active = featuresData[activeFeature];

  return (
    <section className="py-20 bg-[white] font-figtree">
      <div className="max-w-7xl mx-auto px-4">
        {/* New Carousel Section */}
        <ImageCarousel />

        {/* Original Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-black mb-4">
            FounderCrowd offers extensive features
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide the necessary tools to help founders raise capital efficiently and investors find the perfect opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Feature List */}
          <div className="w-full lg:w-1/2">
            <FeatureList
              features={featuresData}
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
            />
          </div>

          {/* Right Side - Feature Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
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