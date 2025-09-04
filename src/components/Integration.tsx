import React from 'react';
import Image from 'next/image';

const integrationLogos = [
  '/integ (1).svg',
  '/integ (2).svg',
  '/integ (3).svg',
  '/integ (4).svg',
  '/integ (5).svg',
  '/integ (6).svg',
  '/integ (7).svg',
  '/integ (8).svg',
  '/integ (9).svg',
  '/integ (10).svg',
  '/integ (11).svg',
  '/integ (12).svg',
  '/integ (13).svg',
  '/integ (14).svg',
  '/integ (15).svg',
  '/integ (16).svg',
  '/integ (17).svg',
  '/integ (18).svg',
  '/integ (19).svg',
  '/integ (20).svg',
  '/integ (21).svg',
  '/integ (22).svg',
  '/integ (23).svg',
  '/integ (24).svg',
  '/integ (25).svg'
];

const Integration = () => {
  // Define the number of logos per row for different screen sizes
  const rows = [
    { mobile: 4, tablet: 5, desktop: 7 }, // Row 1
    { mobile: 3, tablet: 4, desktop: 6 }, // Row 2
    { mobile: 3, tablet: 4, desktop: 5 }, // Row 3
    { mobile: 2, tablet: 3, desktop: 4 }, // Row 4
    { mobile: 2, tablet: 3, desktop: 3 }, // Row 5
  ];
  
  let currentIndex = 0;

  return (
    <section className="py-12 md:py-20 bg-white font-figtree">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 md:mb-6 leading-tight">
            100+ Integrations
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with the tools you already use. Build a seamless fundraising 
            experience with enterprise-grade integrations.
          </p>
        </div>

        {/* Integration Grid - Responsive Triangle Layout */}
        <div className="mb-8 md:mb-12">
          {rows.map((rowConfig, rowIndex) => {
            // Determine number of logos based on screen size
            const numLogos = typeof window !== 'undefined' 
              ? (window.innerWidth < 768 ? rowConfig.mobile : window.innerWidth < 1024 ? rowConfig.tablet : rowConfig.desktop)
              : rowConfig.desktop; // Default for SSR
            
            const rowLogos = integrationLogos.slice(currentIndex, currentIndex + numLogos);
            currentIndex += numLogos;

            return (
              <div
                key={`row-${rowIndex}`}
                className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-2 md:mb-4"
              >
                {rowLogos.map((logo, logoIndex) => (
                  <div
                    key={`logo-${currentIndex - numLogos + logoIndex}`}
                    className="group cursor-pointer"
                  >
                    {/* Integration Circle */}
                    <div className="
                      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                      rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl 
                      flex items-center justify-center
                      transition-all duration-300 hover:scale-105 hover:-translate-y-1
                      bg-white border border-gray-100 hover:border-gray-200
                      shadow-sm hover:shadow-md
                    ">
                      <Image
                        src={logo}
                        alt={`Integration ${currentIndex - numLogos + logoIndex + 1}`}
                        width={24}
                        height={24}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-gray-500 text-sm md:text-base">
            And many more...
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto text-sm md:text-base">
            Need a specific integration? We're constantly expanding our ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <button className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base">
              View All Integrations
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 text-sm md:text-base">
              Request Integration
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;