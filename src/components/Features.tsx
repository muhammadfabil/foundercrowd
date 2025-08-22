"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegChartBar, FaRegCreditCard } from "react-icons/fa";
import { CiStreamOn } from "react-icons/ci";
import { BsBank } from "react-icons/bs";

const featuresData = [
  {
    id: 1,
    icon: <FaRegChartBar />,
    title: "Automatic Expense Tracking",
    description: "Automatically categorize expenses to see where money goes.",
    image: "/features1.png"
  },
  {
    id: 2,
    icon: <FaRegCreditCard />,
    title: "Streamlined Bill Payment",
    description: "Pay bills and manage payments all in one place without any issue.",
    image: "/features2.Jpg"
  },
  {
    id: 3,
    icon: <CiStreamOn />,
    title: "Real-time Money Activity",
    description: "Notifications Get notifications for unusual spending activity.",
    image: "/features3.png"
  },
  {
    id: 4,
    icon: <BsBank />,
    title: "Automatic Bank Sync",
    description: "Connect bank accounts to automatically import transactions.",
    image: "/features4.png"
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section className="py-20 bg-[white] font-figtree">
      <div className="max-w-7xl mx-auto px-4">
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
            <div className="bg-gray-50 rounded-2xl p-2 space-y-2">
              {featuresData.map((feature, index) => (
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
                    <div className="text-gray-700 text-xl mt-1">{feature.icon}</div>
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
              ))}
            </div>
          </div>

          {/* Right Side - Feature Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="relative w-full h-[400px]">
                  {featuresData.map((feature) => (
                    <div 
                      key={feature.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        activeFeature === feature.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain"
                        priority={activeFeature === feature.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;