'use client';
import React, { useState, useEffect, useRef } from 'react';

const PreLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(skipTimer);
  }, []);

  const handleVideoEnd = () => {
    setIsLoading(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsLoading(false);
    onComplete();
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Video is ready to play
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
        // If autoplay fails, show skip button immediately
        setShowSkip(true);
      });
    }
  };

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
        onEnded={handleVideoEnd}
        onLoadedData={handleVideoLoad}
        muted
        playsInline
        preload="auto"
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
      >
        <source src="/preloader.mp4" type="video/mp4" />
      </video>

      {/* Skip Button - Mobile Responsive */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 z-10 touch-manipulation"
        >
          Skip
        </button>
      )}

      {/* Loading indicator - Mobile Responsive */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="flex flex-col items-center px-4">
            <div className="w-8 h-8 md:w-12 md:h-12 border-2 md:border-4 border-t-transparent border-white rounded-full animate-spin mb-3 md:mb-4"></div>
            <p className="text-white text-xs md:text-sm text-center">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreLoader;