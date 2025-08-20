import React from 'react';

const integrationLogos = [
  // First row - 8 items
  [
    { name: 'Affinity', color: 'bg-gray-900' },
    { name: 'Vercel', color: 'bg-black' },
    { name: 'VVave', color: 'bg-gray-800' },
    { name: 'Elysia', color: 'bg-gray-700' },
    { name: 'Microsoft', color: 'bg-gray-900' },
    { name: 'Textexpander', color: 'bg-black' },
    { name: 'Transporter', color: 'bg-gray-800' },
    { name: 'Spotify', color: 'bg-gray-700' },
  ],
  // Second row - 7 items
  [
    { name: 'ABBC', color: 'bg-orange-500' },
    { name: 'Affinity', color: 'bg-gray-900' },
    { name: 'MoneyLover', color: 'bg-gray-800' },
    { name: 'Origami', color: 'bg-black' },
    { name: 'Spring', color: 'bg-gray-700' },
    { name: 'SteadyTune', color: 'bg-gray-900' },
    { name: 'Transporter', color: 'bg-gray-800' },
  ],
  // Third row - 6 items
  [
    { name: 'TablePlus', color: 'bg-gray-700' },
    { name: 'TikTok', color: 'bg-black' },
    { name: 'Twitter', color: 'bg-gray-900' },
    { name: 'Discord', color: 'bg-gray-800' },
    { name: 'Mela', color: 'bg-gray-700' },
    { name: 'CleanMyMac', color: 'bg-black' },
  ],
  // Fourth row - 5 items
  [
    { name: 'Notion', color: 'bg-gray-900' },
    { name: 'Figma', color: 'bg-black' },
    { name: 'Slack', color: 'bg-gray-800' },
    { name: 'Zoom', color: 'bg-gray-700' },
    { name: 'GitHub', color: 'bg-gray-900' },
  ]
];

const Integration = () => {
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

        {/* Integration Grid - Desktop version */}
        <div className="hidden md:block space-y-8 mb-12">
          {integrationLogos.map((row, rowIndex) => (
            <div 
              key={`desktop-${rowIndex}`}
              className="flex justify-center items-center gap-6"
            >
              {row.map((integration, index) => (
                <div
                  key={`desktop-${rowIndex}-${index}`}
                  className="group cursor-pointer"
                >
                  {/* Integration Circle */}
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center
                    transition-all duration-300 hover:scale-105 hover:-translate-y-1
                    ${integration.color}
                    border border-gray-100 hover:border-gray-200
                  `}>
                    <span className="text-white font-semibold text-lg">
                      {integration.name.charAt(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Integration Grid - Mobile version */}
        <div className="md:hidden grid grid-cols-5 gap-4 mb-12 justify-items-center">
          {integrationLogos.flat().slice(0, 15).map((integration, index) => (
            <div
              key={`mobile-${index}`}
              className="flex flex-col items-center"
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${integration.color}
              `}>
                <span className="text-white font-semibold text-sm">
                  {integration.name.charAt(0)}
                </span>
              </div>
            </div>
          ))}
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