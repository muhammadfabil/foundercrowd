"use client"
import React, { memo } from 'react';
import { FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';
import CTAButton from './CTAButton'; // Replace CalendlyModal import

// Extract planData as constant for better performance
const planData = [
  {
    id: 1,
    type: "Via Reg CF",
    subtitle: "Raise up to",
    amount: "$5M",
    description: "Anyone can invest",
    icon: FiUsers
  },
  {
    id: 2,
    type: "Via Reg A",
    subtitle: "Raise up to", 
    amount: "$75M",
    description: "Anyone can invest",
    icon: FiTrendingUp
  },
  {
    id: 3,
    type: "Via Reg D",
    subtitle: "Raise up to",
    amount: "∞",
    description: "Accredited investors only",
    icon: FiShield
  }
];

const Plan = ({ calendlyUrl }: { calendlyUrl?: string }) => {
  return (
    <section className="py-24 bg-white font-figtree">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-medium text-gray-900 mb-6 leading-tight">
            Capital Raising,<br />
            <span className="text-amber-600">Revolutionized</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Craft the perfect offering with control over raise amount, valuation, voting 
            rights, and beyond.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {planData.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.id} className="group">
                <div className="bg-white border rounded-3xl p-8 hover:border-amber-500 hover:shadow-lg transition-all duration-300 h-full border-black hover:cursor-pointer">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Plan Type */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {plan.type}
                  </h3>
                  
                  {/* Subtitle & Amount */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">
                      {plan.subtitle}
                    </p>
                    <div className="text-4xl font-bold text-black">
                      {plan.amount}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-8">
                    {plan.description}
                  </p>

                  {/* CTA Button - Updated to use CTAButton with custom styling */}
                  <CTAButton 
                    
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-full font-medium transition-colors duration-300 flex items-center justify-center gap-2 hover:scale-100"
                    size="md"
                  >
                    Get Started
                    <svg 
                      className="w-4 h-4"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </CTAButton>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to revolutionize your fundraising?
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Join thousands of companies who have successfully raised capital with our platform.
            </p>
          </div>
          
          {/* Bottom CTA Button - Updated */}
          <CTAButton 
           
            size="lg"
          >
            Start Raising Today
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default Plan;