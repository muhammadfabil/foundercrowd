"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { FaRegChartBar, FaRegCreditCard } from "react-icons/fa";
import { CiStreamOn } from "react-icons/ci";
import { BsBank } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { IconType } from "react-icons";

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
              ? 'bg-white shadow-lg border-l-4 border-[#AC5B0F]'
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
  
  // Data gambar untuk carousel
  const carouselImages = [
    { id: 1, src: '/1.png', alt: 'Raise online' },
    { id: 2, src: '/2.png', alt: 'Raise globally' },
    { id: 3, src: '/3.png', alt: 'Raise with funds' }
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

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Get the current layout pattern
  const currentLayout = patterns[currentPattern];

  return (
    <div className="mb-28">
      <h2 className="text-4xl md:text-6xl font-medium text-black mb-4">
        The one platform behind the next generation of startups
      </h2>
      <p className="text-gray-600 text-xl md:text-2xl mt-6 mb-12 max-w-5xl">
        Raise capital online and offline. Raise locally and globally. Raise with fans and with funds. Raise from day one to IPO day.
      </p>
      
      {/* Image gallery carousel */}
      <div className="relative w-full">
        <div className="flex justify-between gap-4 w-full transition-all duration-1000 ease-in-out">
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