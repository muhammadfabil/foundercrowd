'use client';
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CalendlyModal } from '@/components/Hero';

const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const CTAP = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const controls = useAnimation();

  // Background sunrise animation
  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 100%)"
    },
    animate: {
      background: [
        "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 100%)",
        "linear-gradient(135deg, #431407 0%, #ea580c 40%, #fb923c 80%, #fed7aa 100%)",
        "linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #f59e0b 60%, #d97706 100%)"
      ],
      transition: {
        duration: 4,
        ease: [0.42, 0, 0.58, 1]  // Changed from "easeInOut" to fix type error
      }
    }
  };

  // Logo/Sun animation - rises from bottom
  const logoVariants = {
    initial: {
      y: 200,
      opacity: 0,
      scale: 0.5,
      filter: "brightness(0.3)"
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: [
        "brightness(0.3)",
        "brightness(1) drop-shadow(0 0 20px rgba(245, 158, 11, 0.3))",
        "brightness(1.2) drop-shadow(0 0 40px rgba(245, 158, 11, 0.6))"
      ],
      transition: {
        duration: 3,
        delay: 1,
        ease: [0, 0, 0.58, 1]  // Changed from "easeOut" to fix type error
      }
    }
  };

  // Company name animation
  const companyNameVariants = {
    initial: {
      x: -50,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 2.5,
        ease: [0, 0, 0.58, 1]  // Changed from "easeOut" to fix type error
      }
    }
  };

  // CTA Button animation
  const buttonVariants = {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 3.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Floating particles animation
  const particleVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 50 - 25],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const,  // Added 'as const' to fix type error
        delay: Math.random() * 2
      }
    }
  };

  return (
    <>
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        variants={backgroundVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${60 + Math.random() * 20}%`
            }}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {/* Main Content Container */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          
          {/* Logo and Company Name Row */}
          <div className="flex items-center justify-center gap-8 mb-12">
            
            {/* Logo as Sun */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.img
                src="/logo.png"
                alt="Foundercrowd Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: [0, 0, 1, 1]  // Changed from "linear" to fix type error
                }}
              />
              
              {/* Sun Rays */}
              <motion.div 
                className="absolute inset-0 -z-10"
                animate={{
                  rotate: [0, -360]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: [0, 0, 1, 1]  // Changed from "linear" to fix type error
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 bg-gradient-to-t from-yellow-400 to-transparent opacity-40"
                    style={{
                      height: '60px',
                      left: '50%',
                      top: '-60px',
                      transformOrigin: '50% 110px',
                      transform: `translateX(-50%) rotate(${i * 45}deg)`
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              variants={companyNameVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                Foundercrowd
              </h1>
              <motion.p 
                className="text-lg md:text-xl text-white/90 mt-2 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
              >
                Rise with the dawn of opportunity
              </motion.p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 3.5
            }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg md:text-xl rounded-full shadow-2xl border-2 border-yellow-300/30 overflow-hidden"
            >
              {/* Button Background Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "200%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: [0.42, 0, 0.58, 1]  // Changed from "easeInOut" to fix type error
                }}
              />
              
              <span className="relative z-10 flex items-center gap-3">
                Start Raising
                <motion.span
                  animate={{
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1]  // Changed from "easeInOut" to fix type error
                  }}
                >
                  →
                </motion.span>
              </span>
            </button>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-white/70 mt-8 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 4, duration: 1 }}
          >
            Join thousands of founders who have successfully raised capital with our proven platform. 
            Your funding journey starts here.
          </motion.p>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.section>
    </>
  );
};

export default CTAP;