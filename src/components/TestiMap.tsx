'use client'
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GB, US, DE, FR, SG, AU, IN, BR } from "country-flag-icons/react/3x2";

// Flag components mapping
const FlagComponents: Record<string, React.ComponentType<any>> = {
  GB,
  US,
  DE,
  FR,
  SG,
  AU,
  IN,
  BR,
};

// Flag Icon component using country-flag-icons
const FlagIcon = ({ country, className }: { country: string; className?: string }) => {
  const FlagComponent = FlagComponents[country];
  if (!FlagComponent) {
    return (
      <div className={`flex items-center justify-center text-2xl ${className}`}>
        🏳️
      </div>
    );
  }
  return <FlagComponent className={className} />;
};

type Testimonial = {
  id: string;
  name: string;
  company: string;
  country: string;
  testimonial: string;
  image: string;
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
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "gb1", 
        name: "James Wilson", 
        company: "Fintech Solutions", 
        country: "GB", 
        testimonial: "As a fintech startup in London, we needed specialized investors. FounderCrowd's targeted matching algorithm connected us with the perfect partners.", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "de1", 
        name: "Anna Schmidt", 
        company: "GreenEnergy", 
        country: "DE", 
        testimonial: "The comprehensive tools on FounderCrowd made our fundraising process efficient and transparent. We closed our €2M round in just two months.", 
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "fr1", 
        name: "Jean Dupont", 
        company: "AI Solutions", 
        country: "FR", 
        testimonial: "FounderCrowd's platform provided us incredible exposure to international investors we wouldn't have reached otherwise.", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "sg1", 
        name: "Li Wei", 
        company: "EcoTech", 
        country: "SG", 
        testimonial: "The seamless experience of connecting with investors across Asia and beyond made FounderCrowd invaluable for our expansion plans.", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "au1", 
        name: "Emma Thompson", 
        company: "HealthTech Pro", 
        country: "AU", 
        testimonial: "We were able to find investors who specialize in healthcare technology through FounderCrowd, making our Series B round remarkably smooth.", 
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "in1", 
        name: "Raj Patel", 
        company: "EdTech Solutions", 
        country: "IN", 
        testimonial: "FounderCrowd opened doors to global investors for our education platform, helping us scale across multiple markets.", 
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        id: "br1", 
        name: "Carlos Silva", 
        company: "SustainableTech", 
        country: "BR", 
        testimonial: "The visibility and reach FounderCrowd provided helped us attract international capital for sustainable innovation.", 
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face" 
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
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 shadow-lg transform scale-105" 
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
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
          absolute rounded-xl shadow-lg overflow-hidden bg-white border border-gray-100
          transition-all duration-500 ease-out backdrop-blur-sm
          ${isCenter ? 'z-30' : 'z-20 cursor-pointer'}
        `}
        style={{ 
          width: isCenter ? '240px' : '210px',
          maxWidth: '90vw',
          transform: isCenter ? 'scale(1)' : isLeft ? 'translateX(-75%) scale(0.8)' : 'translateX(75%) scale(0.8)',
          opacity: isCenter ? 1 : 0.7
        }}
        onClick={onClick}
      >
        {/* Profile Image */}
        <div className="relative w-full h-24 bg-gradient-to-br from-emerald-100 to-teal-100">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-3 bg-white">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{testimonial.name}</h3>
              <p className="text-emerald-600 font-semibold text-xs">{testimonial.company}</p>
            </div>
            <div className="ml-1">
              <FlagIcon country={testimonial.country} className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-gray-700 text-xs leading-relaxed line-clamp-2">
              "{testimonial.testimonial}"
            </p>
          </div>
          
          <motion.button 
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Invest Now
          </motion.button>
        </div>
      </div>
    );
  });

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Success Stories from 
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> Around the World</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how founders across the globe have leveraged FounderCrowd to achieve their fundraising goals and scale their innovative businesses.
          </motion.p>
        </div>

        {/* Main Container */}
        <motion.div 
          className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-gray-100 backdrop-blur-sm"
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
            <div className="relative h-80 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="flex relative w-full justify-center items-center h-full"
                  initial={{ x: direction * 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction * -100, opacity: 0 }}
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
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: Map + Overmap */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
              {/* World Map Background */}
              <img 
                src="/TestiMap.png" 
                alt="World Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              
              {/* Overlay Image - positioned at right center */}
              <img 
                src="/overmap.png" 
                alt="Overlay" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-80 object-contain z-10"
              />
            </div>

            {/* Mobile: Text */}
            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                <p className="text-gray-800 font-bold text-sm mb-1">From Funnel to Funding</p>
                <p className="text-gray-600 text-xs leading-relaxed">
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
                  <div className="inline-block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                    <p className="text-gray-800 font-bold text-sm mb-1">From Funnel to Funding</p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      FoundersCrowd AI builds the path.<br />
                      FoundersCrowd Marketing gets you seen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Map + Testimonial Carousel */}
            <div className="lg:flex-1">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* World Map Background */}
                <img 
                  src="/TestiMap.png" 
                  alt="World Map" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                
                {/* Overlay Image - positioned at right center */}
                <img 
                  src="/overmap.png" 
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
                          ? 'bg-emerald-500 w-6' 
                          : 'bg-white/50 hover:bg-white/80'
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