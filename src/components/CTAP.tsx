'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendlyModal } from '@/components/Hero';

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const CTAP = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      <motion.section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        initial={{
          background:
            'linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #F59E0B 70%, #2B2B2B 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #F59E0B 70%, #2B2B2B 100%)',
            'linear-gradient(180deg, #ffffff 0%, #fff7ed 35%, #fbbf24 70%, #2B2B2B 100%)',
          ],
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        {/* Floating Particles - Reduced for mobile */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full opacity-60"
            style={{ 
              left: `${15 + i * 20}%`, 
              top: `${55 + Math.random() * 25}%` 
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-15, -80],
              x: [0, Math.random() * 40 - 20],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              repeatType: 'loop', 
              delay: Math.random() * 1.5 
            }}
          />
        ))}

        {/* Main Content Container */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-8 md:py-0">
          {/* Logo and Company Name Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Logo as Sun */}
            <motion.div
              className="relative order-1 sm:order-none"
              initial={{ y: 150, opacity: 0, scale: 0.8, filter: 'brightness(0.3)' }}
              whileInView={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: ['brightness(0.3)', 'brightness(1)', 'brightness(1.1)'],
              }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            >
              <motion.img
                src="/logo.png"
                alt="Foundercrowd Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />

              {/* Sun Rays - Adjusted for mobile */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 md:w-1 bg-gradient-to-t from-yellow-400 to-transparent opacity-40"
                    style={{
                      height: '40px',
                      left: '50%',
                      top: '-40px',
                      transformOrigin: '50% 80px',
                      transform: `translateX(-50%) rotate(${i * 60}deg)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              className="order-2 sm:order-none"
              initial={{ x: 0, y: 30, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.0, delay: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F59E0B] leading-tight">
                Founderscrowd
              </h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-orange-500 mt-1 md:mt-2 font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Rise with the dawn of opportunity
              </motion.p>
            </motion.div>
          </div>

          {/* Call to Action - Mobile optimized */}
          <motion.button
            onClick={() => setIsCalendlyOpen(true)}
            className="group relative w-full sm:w-auto inline-block px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-full shadow-2xl border-2 border-yellow-300/30 overflow-hidden cursor-pointer max-w-xs sm:max-w-none mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1.4 }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />

            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              Start Raising
              <motion.span 
                animate={{ x: [0, 4, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-sm sm:text-base"
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Subtitle - Mobile optimized */}
          <motion.p
            className="text-orange-700 mt-6 md:mt-8 text-sm sm:text-base max-w-sm sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 1.6, duration: 0.9 }}
          >
            Join thousands of founders who have successfully raised capital with our proven platform.
            <span className="hidden sm:inline"> Your funding journey starts here.</span>
          </motion.p>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.section>

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <CalendlyModal 
          url={DEFAULT_CALENDLY_URL} 
          onClose={() => setIsCalendlyOpen(false)} 
        />
      )}
    </>
  );
};

export default CTAP;
