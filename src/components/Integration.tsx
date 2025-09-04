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
  // Define the number of logos per row for the triangle layout
  const rows = [7, 6, 5, 4, 3];
  let currentIndex = 0;

  return (
    <section className="py-20 bg-white font-figtree">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
            100+ Integrations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with the tools you already use. Build a seamless fundraising 
            experience with enterprise-grade integrations.
          </p>
        </div>

        {/* Integration Grid - Triangle Layout */}
        <div className="mb-12">
          {rows.map((numLogos, rowIndex) => {
            const rowLogos = integrationLogos.slice(currentIndex, currentIndex + numLogos);
            currentIndex += numLogos;

            return (
              <div
                key={`row-${rowIndex}`}
                className="flex justify-center gap-4 md:gap-6 mb-4"
              >
                {rowLogos.map((logo, logoIndex) => (
                  <div
                    key={`logo-${currentIndex - numLogos + logoIndex}`}
                    className="group cursor-pointer"
                  >
                    {/* Integration Circle */}
                    <div className="
                      w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center
                      transition-all duration-300 hover:scale-105 hover:-translate-y-1
                      bg-white border border-gray-100 hover:border-gray-200
                      shadow-sm hover:shadow-md
                    ">
                      <Image
                        src={logo}
                        alt={`Integration ${currentIndex - numLogos + logoIndex + 1}`}
                        width={32}
                        height={32}
                        className="md:w-10 md:h-10 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-base">
            And many more...
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Need a specific integration? We're constantly expanding our ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
              View All Integrations
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors duration-300">
              Request Integration
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;