"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { FaHome, FaRegChartBar, FaRegCreditCard,FaFileSignature } from "react-icons/fa";
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
    icon: FaHome,
    title: "Self-Hosted Investor Funnels",
    description: "Run your raise on your own branded funnel. Keep control, keep ownership, and connect directly with your investors.",
    image: "/features1.png"
  },
  2: {
    id: 2,
    icon: FaRegChartBar,
    title: "Grow Your Brand",
    description: "Every raise is also a marketing engine. Turn investors into advocates who amplify your startup worldwide.",
    image: "/features2.jpg"
  },
  3: {
    id: 3,
    icon: FaRegCreditCard,
    title: "Seamless Investor Checkout",
    description: "Investing is as simple as shopping online. Fast, secure, and friction-free for every backer.",
    image: "/features3.png"
  },
  4: {
    id: 4,
    icon: FaFileSignature,
    title: "Sign Agreements",
    description: "No endless paperwork. Investors sign instantly with secure digital agreements, keeping your raise compliant and quick.",
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
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  
  // Phrases for sequential highlighting
  const phrases = [
    "Raise capital online and offline.",
    "Raise locally and globally.",
    "Raise with fans and with funds.",
    "Raise from day one to IPO day."
  ];

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
      
      {/* Gambar dengan efek hover membesar saja (tanpa border oranye dan shadow) */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg h-80 rounded-2xl overflow-hidden bg-gray-100 
                          cursor-pointer transition-all duration-300 ease-in-out 
                          hover:scale-105 
                          focus:scale-105 
                          focus:outline-none">
            <Image
              src="/feat1.png"
              alt="Investor Funnel Screenshot 1"
              fill
              className="object-contain transition-transform duration-300 hover:scale-110"
              priority
            />
            {/* Overlay efek hover */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg h-80 rounded-2xl overflow-hidden bg-gray-100 
                          cursor-pointer transition-all duration-300 ease-in-out 
                          hover:scale-105 
                          focus:scale-105 
                          focus:outline-none">
            <Image
              src="/feat2.png"
              alt="Investor Funnel Screenshot 2"
              fill
              className="object-contain transition-transform duration-300 hover:scale-110"
              priority
            />
            {/* Overlay efek hover */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>
          </div>
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
            FoundersCrowd makes investing in startups as simple as buying a product online.

          </h2>
          
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