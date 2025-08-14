import React from 'react';

const integrationLogos = [
  // First row - 8 items
  [
    { name: 'Affinity', color: 'bg-blue-500' },
    { name: 'Vercel', color: 'bg-black' },
    { name: 'VVave', color: 'bg-yellow-500' },
    { name: 'Elysia', color: 'bg-purple-500' },
    { name: 'Microsoft', color: 'bg-blue-400' },
    { name: 'Textexpander', color: 'bg-red-500' },
    { name: 'Transporter', color: 'bg-blue-600' },
    { name: 'Spotify', color: 'bg-green-500' },
  ],
  // Second row - 7 items
  [
    { name: 'ABBC', color: 'bg-orange-500' },
    { name: 'Affinity', color: 'bg-purple-600' },
    { name: 'MoneyLover', color: 'bg-green-600' },
    { name: 'Origami', color: 'bg-blue-500' },
    { name: 'Spring', color: 'bg-green-500' },
    { name: 'SteadyTune', color: 'bg-gray-800' },
    { name: 'Transporter', color: 'bg-blue-600' },
  ],
  // Third row - 6 items
  [
    { name: 'TablePlus', color: 'bg-purple-400' },
    { name: 'TikTok', color: 'bg-gray-400' },
    { name: 'Twitter', color: 'bg-blue-400' },
    { name: 'Discord', color: 'bg-purple-500' },
    { name: 'Mela', color: 'bg-pink-400' },
    { name: 'CleanMyMac', color: 'bg-teal-500' },
  ],
  // Fourth row - 5 items
  [
    { name: 'Notion', color: 'bg-gray-900' },
    { name: 'Figma', color: 'bg-purple-500' },
    { name: 'Slack', color: 'bg-purple-600' },
    { name: 'Zoom', color: 'bg-blue-500' },
    { name: 'GitHub', color: 'bg-gray-800' },
  ]
];

const Integration = () => {
  return (
    <section className="py-20 bg-white font-montserrat">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Over 100+ Integrations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FounderCrowd equips you with the foundational components to build a 
            professional and seamless fundraising experience with top-tier integrations.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="space-y-6">
          {integrationLogos.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex justify-center items-center gap-4"
            >
              {row.map((integration, index) => (
                <div
                  key={`${rowIndex}-${index}`}
                  className="group cursor-pointer"
                >
                  {/* Integration Circle */}
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    transition-all duration-300 hover:scale-110
                    ${integration.color}
                    shadow-md hover:shadow-lg
                  `}>
                    {/* Logo placeholder - using first letter of name */}
                    <span className="text-white font-bold text-sm">
                      {integration.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center mt-2 absolute z-10">
                    <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-md border">
                      {integration.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* "Dan masih banyak lagi" text */}
        

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Can't find the integration you need? We're constantly adding new partners.
          </p>
          <button className="bg-[#AC5B0F] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8B4A0C] transition-colors duration-300 mr-4">
            View All Integrations
          </button>
          <button className="border-2 border-[#AC5B0F] text-[#AC5B0F] px-8 py-3 rounded-full font-medium hover:bg-[#AC5B0F] hover:text-white transition-colors duration-300">
            Request Integration
          </button>
        </div>
      </div>
    </section>
  );
};

export default Integration;