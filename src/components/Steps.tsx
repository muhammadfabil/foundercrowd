"use client";

import React from 'react';

const stepsData = [
  {
    id: 1,
    title: "Create Account",
    description: "Investor sign-up or login with Magic Link authentication"
  },
  {
    id: 2,
    title: "Investment Details",
    description: "Select investor type, enter investment amount"
  },
  {
    id: 3,
    title: "Investor Payment",
    description: "Choose payment method, provide details"
  },
  {
    id: 4,
    title: "Sign Agreements",
    description: "Review agreement with pre-filled investment details, complete e-signature"
  },
  {
    id: 5,
    title: "Document Verification",
    description: "Upload required identification and financial documents"
  },
  {
    id: 6,
    title: "Background Check",
    description: "Complete automated background verification process"
  },
  {
    id: 7,
    title: "Fund Transfer",
    description: "Transfer investment funds through secure banking channels"
  },
  {
    id: 8,
    title: "Investment Confirmation",
    description: "Receive investment confirmation and portfolio allocation details"
  },
  {
    id: 9,
    title: "Portfolio Setup",
    description: "Configure investment dashboard and notification preferences"
  },
  {
    id: 10,
    title: "Welcome Package",
    description: "Access investor resources and quarterly reporting schedule"
  }
];

const Steps = () => {
  return (
    <section className="py-16 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Side - Fixed Content */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">Investor Checkout</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple, e-commerce style investor checkout experience.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Investors are guided through a linear investment creation process – no side quests, no ambiguity.
            </p>
            <button className="bg-[#AC5B0F] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8B4A0C] transition-colors">
              Try it yourself
            </button>
          </div>

          {/* Right Side - Scrollable Timeline */}
          <div className="w-full lg:w-3/5">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#AC5B0F]"></div>
              
              {stepsData.map((step) => (
                <div key={step.id} className="relative flex items-start mb-8 last:mb-0">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#AC5B0F] bg-white">
                    <div className="w-3 h-3 rounded-full bg-[#AC5B0F]"></div>
                  </div>

                  {/* Step Content */}
                  <div className="ml-6 flex-1">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Step {step.id}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Final "Done!" step */}
              <div className="relative flex items-start">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#AC5B0F] bg-white">
                  <div className="w-3 h-3 rounded-full bg-[#AC5B0F]"></div>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Done!
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;