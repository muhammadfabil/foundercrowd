import Image from 'next/image';
import CTAButton from './CTAButton'; // Replace CalendlyModal import

// Integration logos extracted as constant for better performance
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

const desktopRows = [7, 6, 5, 4, 3];
const tabletRows = [5, 4, 4, 3, 3];
const mobileRows = [4, 3, 3, 2, 2];

function IntegrationIcon({ logo, index }: { logo: string; index: number }) {
  return (
    <div className="group cursor-pointer">
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
          alt={`Integration ${index + 1}`}
          width={40}
          height={40}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain"
        />
      </div>
    </div>
  );
}

function IntegrationRows({ rows }: { rows: number[] }) {
  let currentIndex = 0;

  return (
    <div className="mb-8 md:mb-12">
      {rows.map((count, rowIndex) => {
        const rowLogos = integrationLogos.slice(currentIndex, currentIndex + count);
        const startIndex = currentIndex;
        currentIndex += count;

        return (
          <div
            key={`row-${rowIndex}`}
            className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-2 md:mb-4"
          >
            {rowLogos.map((logo, logoIndex) => (
              <IntegrationIcon
                key={`${logo}-${startIndex + logoIndex}`}
                logo={logo}
                index={startIndex + logoIndex}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function Integration() {
  return (
    <section className="py-12 md:py-20 bg-white font-figtree">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#2B2B2B] mb-4 md:mb-6 leading-tight">
            100+ Integrations
          </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Connect with the tools you already use. Build a seamless fundraising 
            experience with enterprise-grade integrations.
          </p>
        </div>

        {/* Integration Grid - Responsive Triangle Layout */}
        <div className="md:hidden">
          <IntegrationRows rows={mobileRows} />
        </div>
        <div className="hidden md:block lg:hidden">
          <IntegrationRows rows={tabletRows} />
        </div>
        <div className="hidden lg:block">
          <IntegrationRows rows={desktopRows} />
        </div>

        {/* Bottom text */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-gray-500 text-sm md:text-base">
            And many more...
          </p>
        </div>

        {/* Bottom CTA - Updated to use CTAButton */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto text-sm md:text-base">
            Need a specific integration? We're constantly expanding our ecosystem.
          </p>
          
          {/* Updated CTA Button */}
          <CTAButton 
            
            size="md"
          >
            Request Integration
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
