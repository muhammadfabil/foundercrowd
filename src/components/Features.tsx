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
    <section className="py-16 bg-gray-50 font-montserrat">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">FounderCrowd offers extensive features</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide the necessary tools to help founders raise capital efficiently and investors find the perfect opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Feature List */}
          <div className="w-full lg:w-1/2 bg-[#f5f5f0] rounded-lg overflow-hidden">
            {featuresData.map((feature, index) => (
              <div 
                key={feature.id}
                className={`
                  cursor-pointer transition-all duration-300 flex items-start py-6 px-6
                  ${index !== 0 ? 'border-t border-gray-200' : ''}
                  ${activeFeature === feature.id 
                    ? 'bg-white shadow-md border-l-4' 
                    : 'hover:bg-white hover:shadow-sm'}
                `}
                style={activeFeature === feature.id ? { borderLeftColor: '#AC5B0F' } : {}}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="text-gray-700 text-2xl mr-4 mt-0.5">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    {feature.title}
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="ml-2 text-gray-500"
                    >
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </h3>
                  <p className="text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Feature Image */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg p-4 shadow-lg flex items-center justify-center">
            <div className="relative w-full h-[400px]">
              {featuresData.map((feature) => (
                <div 
                  key={feature.id}
                  className={`absolute inset-0 transition-opacity duration-300 ${
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
    </section>
  );
};

export default Features;