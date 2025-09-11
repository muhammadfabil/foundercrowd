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
    image: "/fix1.jpg"
  },
  2: {
    id: 2,
    icon: FaRegChartBar,
    title: "Grow Your Brand",
    description: "Every raise is also a marketing engine. Turn investors into advocates who amplify your startup worldwide.",
    image: "/fix2.jpg"
  },
  3: {
    id: 3,
    icon: FaRegCreditCard,
    title: "Seamless Investor Checkout",
    description: "Investing is as simple as shopping online. Fast, secure, and friction-free for every backer.",
    image: "/fix3.jpg"
  },
  4: {
    id: 4,
    icon: FaFileSignature,
    title: "Sign Agreements",
    description: "No endless paperwork. Investors sign instantly with secure digital agreements, keeping your raise compliant and quick.",
    image: "/fix4.jpg"
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
    <section className="py-20 bg-[white] font-figtree">
      <div className="max-w-7xl mx-auto px-4">
        {/* New Carousel Section */}
        <ImageCarousel />

        {/* Original Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-black mb-4">
            FoundersCrowd makes investing in startups as simple as buying a product online.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Feature List */}
          <div className="w-full lg:w-1/2">
            <FeatureList
              features={featuresData}
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
            />
          </div>

          {/* ✅ FIXED: Right Side - Feature Image dengan proper constraints */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="bg-white rounded-3xl p-6 shadow-2xl overflow-hidden">
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