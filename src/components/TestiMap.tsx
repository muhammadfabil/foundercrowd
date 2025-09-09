'use client'
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GB, US, DE, AU, ES, JP } from "country-flag-icons/react/3x2";

// Flag components mapping
const FlagComponents: Record<string, React.ComponentType<any>> = {
  GB,
  US,
  DE,
  AU,
  ES,
  JP,
};

// FlagIcon component
const FlagIcon = ({ country, className }: { country: string; className?: string }) => {
  const Flag = FlagComponents[country];
  return Flag ? <Flag className={className} /> : null;
};

type Testimonial = {
  id: string;
  name: string;
  company: string;
  country: string;
  testimonial: string;
  image: string;
  investment: string; // Tambahan field untuk investment amount
};

const VISIBLE_COUNT = 5;

const TestimonialMap = () => {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      { 
        id: "us1", 
        name: "Sarah Johnson", 
        company: "TechInnovate", 
        country: "US", 
        testimonial: "FounderCrowd helped us secure our Series A funding in half the time we expected. The platform connected us with investors who truly understood our vision.", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        investment: "$125,000 USD"
      },
      { 
        id: "gb1", 
        name: "James Wilson", 
        company: "Fintech Solutions", 
        country: "GB", 
        testimonial: "As a fintech startup in London, we needed specialized investors. FounderCrowd's targeted matching algorithm connected us with the perfect partners.", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", // Updated to a new portrait photo of a man from Unsplash
        investment: "£100,000 GBP"
      },
      { 
        id: "au1", 
        name: "Emma Thompson", 
        company: "HealthTech Pro", 
        country: "AU", 
        testimonial: "We were able to find investors who specialize in healthcare technology through FounderCrowd, making our Series B round remarkably smooth.", 
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
        investment: "1,000 AUD"
      },
      { 
        id: "es1", 
        name: "Maria Garcia", 
        company: "GreenEnergy Spain", 
        country: "ES", 
        testimonial: "FounderCrowd made global fundraising accessible for our Spanish startup. We connected with international investors effortlessly.", 
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
        investment: "150,000 EUR"
      },
      { 
        id: "de1", 
        name: "Anna Schmidt", 
        company: "GreenEnergy", 
        country: "DE", 
        testimonial: "The comprehensive tools on FounderCrowd made our fundraising process efficient and transparent. We closed our €2M round in just two months.", 
        image: "/ger.jpg" , // Updated to a new portrait photo of a woman from Unsplash
        investment: "250,000 EUR"
      },
      { 
        id: "jp1", 
        name: "Hiroshi Tanaka", 
        company: "AI Solutions Japan", 
        country: "JP", 
        testimonial: "FounderCrowd's platform provided incredible exposure to global investors, helping our Japanese startup scale internationally.", 
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
        investment: "¥20,000,000 JPY"
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activeTestimonial = useMemo(() => testimonials[activeIndex], [testimonials, activeIndex]);

  const countriesWithTestimonials = useMemo(() => {
    const unique = Array.from(new Set(testimonials.map((t) => t.country)));
    return unique.map((countryCode) => ({
      country: countryCode,
      testimonials: testimonials.filter((t) => t.country === countryCode),
    }));
  }, [testimonials]);

  const activeCountryIndex = useMemo(() => {
    const country = activeTestimonial.country;
    return countriesWithTestimonials.findIndex((c) => c.country === country);
  }, [activeTestimonial.country, countriesWithTestimonials]);

  const visibleCountries = useMemo(() => {
    const arr = countriesWithTestimonials;
    const n = arr.length;
    if (n === 0) return [];
    const half = Math.floor(VISIBLE_COUNT / 2);
    const out: typeof arr = [];
    for (let k = -half; k <= half; k++) {
      const idx = (activeCountryIndex + k + n) % n;
      out.push(arr[idx]);
    }
    return out;
  }, [countriesWithTestimonials, activeCountryIndex]);

  const displayIndices = useMemo(() => {
    const n = testimonials.length;
    return [
      (activeIndex - 1 + n) % n,
      activeIndex,
      (activeIndex + 1) % n
    ];
  }, [activeIndex, testimonials.length]);

  const goToTestimonial = (id: string) => {
    if (isAnimating) return;
    
    const newIndex = testimonials.findIndex(t => t.id === id);
    if (newIndex === activeIndex) return;
    
    let dir;
    if (Math.abs(newIndex - activeIndex) === testimonials.length - 1) {
      dir = newIndex > activeIndex ? -1 : 1;
    } else {
      dir = newIndex > activeIndex ? 1 : -1;
    }
    
    setDirection(dir);
    setIsAnimating(true);
    setActiveIndex(newIndex);
  };

  // Auto-scroll with pause on hover
  useEffect(() => {
    if (!countriesWithTestimonials.length || isPaused) return;
    const id = setInterval(() => {
      if (!isAnimating) {
        const nextIdx = (activeIndex + 1) % testimonials.length;
        setDirection(1);
        setIsAnimating(true);
        setActiveIndex(nextIdx);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [activeIndex, countriesWithTestimonials, testimonials.length, isAnimating, isPaused]);

  const CountryFlagList = React.memo(({ 
    countries, 
    activeCountry, 
    onSelectCountry, 
    orientation = "col" 
  }: {
    countries: { country: string; testimonials: Testimonial[] }[];
    activeCountry: string;
    onSelectCountry: (id: string) => void;
    orientation?: "row" | "col";
  }) => {
    const isRow = orientation === "row";
    return (
      <div className={`flex ${isRow ? "flex-row gap-3 justify-center flex-wrap" : "flex-col space-y-4 items-center"}`}>
        {countries.map(({ country, testimonials }) => {
          const isActive = country === activeCountry;
          return (
            <motion.button
              key={country}
              onClick={() => onSelectCountry(testimonials[0].id)}
              className={`
                ${isRow ? "w-12 h-12" : "w-16 h-16"} 
                rounded-xl flex items-center justify-center border-2 transition-all duration-300
                ${isActive 
                  ? "bg-[#F59E0B] border-[#F59E0B] shadow-lg transform scale-105" 
                  : "bg-white border-[#2B2B2B]/20 hover:border-[#F59E0B] hover:shadow-md"
                }
              `}
              whileHover={{ scale: isActive ? 1.05 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select ${country}`}
            >
              <div className={`${isRow ? "w-8 h-8" : "w-10 h-10"} rounded-lg overflow-hidden`}>
                <FlagIcon country={country} className="w-full h-full" />
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  });

  const TestimonialCard = React.memo(({ 
    testimonial, 
    position, 
    onClick 
  }: { 
    testimonial: Testimonial; 
    position: 'left' | 'center' | 'right';
    onClick?: () => void;
  }) => {
    const isCenter = position === 'center';
    const isLeft = position === 'left';
    
    return (
      <div
        className={`
          absolute rounded-xl shadow-lg overflow-hidden bg-white border border-[#2B2B2B]/10
          transition-all duration-500 ease-out
          ${isCenter ? 'z-30' : 'z-20 cursor-pointer'}
        `}
        style={{ 
          width: isCenter ? '240px' : '200px',
          maxWidth: '35vw',
          transform: isCenter ? 'scale(1)' : isLeft ? 'translateX(-55%) scale(0.8)' : 'translateX(55%) scale(0.8)',
          opacity: isCenter ? 1 : 0.7
        }}
        onClick={onClick}
      >
        {/* Profile Image (75%) */}
        <div className="relative w-full h-[75%]">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Button (25% height) */}
        <div className="h-[25%] bg-[#2B2B2B] text-white flex items-center justify-center hover:bg-[#F59E0B] transition-colors duration-300">
          <button className="text-center font-medium py-2 px-4 text-sm">
            Invested
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2B2B2B] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Raise from all Around the World <br/>
            <span className="text-[#F59E0B]"> Invest and raise everywhere</span>
          </motion.h2>
          <motion.p 
            className="text-[#2B2B2B]/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            FoundersCrowd takes the complexity out of global fundraising. From connecting with investors worldwide to growing your brand and community, we make raising capital as simple as investing online.
          </motion.p>
        </div>

        {/* Main Container */}
        <motion.div 
          className="bg-[#F3EFE7] rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-[#2B2B2B]/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Mobile: Flags area */}
            <div className="text-center">
              <CountryFlagList
                countries={visibleCountries}
                activeCountry={activeTestimonial.country}
                onSelectCountry={goToTestimonial}
                orientation="row"
              />
            </div>

            {/* Mobile: Card area */}
            <div className="relative h-72 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="flex relative w-full justify-center items-center h-full"
                  initial={{ x: direction * 70, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction * -70, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onAnimationComplete={() => {
                    setDirection(0);
                    setIsAnimating(false);
                  }}
                >
                  <TestimonialCard 
                    testimonial={testimonials[displayIndices[0]]}
                    position="left"
                    onClick={() => {
                      if (!isAnimating) {
                        setDirection(-1);
                        setIsAnimating(true);
                        setActiveIndex(displayIndices[0]);
                      }
                    }}
                  />
                  <TestimonialCard 
                    testimonial={testimonials[displayIndices[1]]}
                    position="center"
                  />
                  <TestimonialCard 
                    testimonial={testimonials[displayIndices[2]]}
                    position="right"
                    onClick={() => {
                      if (!isAnimating) {
                        setDirection(1);
                        setIsAnimating(true);
                        setActiveIndex(displayIndices[2]);
                      }
                    }}
                  />

                  {/* Investment amount overlay for center card - MOBILE RESPONSIVE */}
                  <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 z-40 flex items-center bg-[#2B2B2B] text-white rounded-full pl-2 pr-3 py-1 shadow-lg">
                    <div className="w-4 h-4 mr-1.5 overflow-hidden rounded-full flex-shrink-0">
                      <FlagIcon country={testimonials[displayIndices[1]].country} className="w-full h-full" />
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap">
                      {testimonials[displayIndices[1]].investment}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: Investment info card - tambahan untuk lebih jelas */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-[#2B2B2B] text-white rounded-full px-4 py-2 text-sm font-medium">
                <div className="w-5 h-5 overflow-hidden rounded-full">
                  <FlagIcon country={activeTestimonial.country} className="w-full h-full" />
                </div>
                <span>{activeTestimonial.name}</span>
                <span className="text-[#F59E0B]">•</span>
                <span className="font-bold">{activeTestimonial.investment}</span>
              </div>
            </div>

            {/* Mobile: Map + Overmap */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#2B2B2B]/5">
              {/* World Map Background */}
              <img 
                src="/TestiMap.png" 
                alt="World Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              
              {/* Overlay Image - positioned at right center */}
              <img 
                src="/overmap.jpg" 
                alt="Overlay" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-80 object-contain z-10"
              />
            </div>

            {/* Mobile: Text */}
            <div className="text-center">
              <div className="inline-block p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl">
                <p className="text-[#2B2B2B] font-bold text-sm mb-1">From Funnel to Funding</p>
                <p className="text-[#2B2B2B]/70 text-xs leading-relaxed">
                  FoundersCrowd AI builds the path. FoundersCrowd Marketing gets you seen.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex lg:gap-8">
            {/* Desktop: Flag sidebar */}
            <div className="lg:w-1/6 flex flex-col items-center">
              <div className="sticky top-8">
                <CountryFlagList
                  countries={visibleCountries}
                  activeCountry={activeTestimonial.country}
                  onSelectCountry={goToTestimonial}
                  orientation="col"
                />
                <div className="mt-8 text-center">
                  <div className="inline-block p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl">
                    <p className="text-[#2B2B2B] font-bold text-sm mb-1">From Funnel to Funding</p>
                    <p className="text-[#2B2B2B]/70 text-xs leading-relaxed">
                      FoundersCrowd AI builds the path.<br />
                      FoundersCrowd Marketing gets you seen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Map + Testimonial Carousel */}
            <div className="lg:flex-1">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#2B2B2B]/5">
                {/* World Map Background */}
                <img 
                  src="/TestiMap.png" 
                  alt="World Map" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                
                {/* Overlay Image - positioned at right center */}
                <img 
                  src="/overmap.jpg" 
                  alt="Overlay" 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-90 object-contain z-10"
                />
                
                {/* Testimonial Cards Carousel */}
                <div className="absolute inset-0 flex items-center justify-start pl-12 ml-24">
                  <div className="relative h-60 w-60 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        className="flex relative w-full justify-center items-center h-full"
                        initial={{ x: direction * 75, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction * -75, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onAnimationComplete={() => {
                          setDirection(0);
                          setIsAnimating(false);
                        }}
                      >
                        <TestimonialCard 
                          testimonial={testimonials[displayIndices[0]]}
                          position="left"
                          onClick={() => {
                            if (!isAnimating) {
                              setDirection(-1);
                              setIsAnimating(true);
                              setActiveIndex(displayIndices[0]);
                            }
                          }}
                        />
                        <TestimonialCard 
                          testimonial={testimonials[displayIndices[1]]}
                          position="center"
                        />
                        <TestimonialCard 
                          testimonial={testimonials[displayIndices[2]]}
                          position="right"
                          onClick={() => {
                            if (!isAnimating) {
                              setDirection(1);
                              setIsAnimating(true);
                              setActiveIndex(displayIndices[2]);
                            }
                          }}
                        />

                        {/* Investment amount overlay for center card - DESKTOP */}
                        <div className="absolute top-[-40px] right-0 transform translate-x-[20%] z-40 flex items-center bg-[#2B2B2B] text-white rounded-full pl-2 pr-4 py-1.5 shadow-lg">
                          <div className="w-6 h-6 mr-2 overflow-hidden rounded-full">
                            <FlagIcon country={testimonials[displayIndices[1]].country} className="w-full h-full" />
                          </div>
                          <span className="text-sm font-semibold whitespace-nowrap">
                            {testimonials[displayIndices[1]].investment}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(testimonials[index].id)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex 
                          ? 'bg-[#F59E0B] w-6' 
                          : 'bg-[#2B2B2B]/30 hover:bg-[#2B2B2B]/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialMap;