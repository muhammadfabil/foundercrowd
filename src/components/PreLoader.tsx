'use client';
import React, { useState, useEffect, useRef } from 'react';

const PreLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    // Auto complete after 10 seconds if video doesn't end
    const autoCompleteTimer = setTimeout(() => {
      if (isLoading) {
        handleSkip();
      }
    }, 10000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoCompleteTimer);
    };
  }, [isLoading]);

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
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video autoplay failed:', error);
          setVideoError(true);
          // If autoplay fails, show skip button immediately
          setShowSkip(true);
        });
      }
    }
  };

  const handleVideoError = () => {
    console.log('Video failed to load');
    setVideoError(true);
    setVideoLoaded(true);
    setShowSkip(true);
  };

  // If video fails to load, auto-skip after 3 seconds
  useEffect(() => {
    if (videoError) {
      const errorTimer = setTimeout(() => {
        handleSkip();
      }, 3000);
      return () => clearTimeout(errorTimer);
    }
  }, [videoError]);

  if (!isLoading) return null;

  return (
    <>
      {/* Desktop Version - Full Video */}
      <div className="hidden md:block fixed inset-0 z-[9999] bg-black overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={handleVideoLoad}
          muted
          playsInline
          preload="metadata"
          webkit-playsinline="true"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        >
          <source src="/preloader.mp4" type="video/mp4" />
          
          Your browser does not support the video tag.
        </video>

        {/* Skip Button - Desktop */}
        {showSkip && (
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10"
          >
            Skip
          </button>
        )}

        {/* Loading indicator - Desktop */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error message - Desktop */}
        {videoError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-sm">Loading content...</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Version - 3 Rows Layout */}
      <div className="md:hidden fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-white">
        {/* Top Section */}
        <div className="flex-1 bg-white" />
        
        {/* Middle Section - Video */}
        <div className="flex-1 relative bg-black overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={handleVideoLoad}
            muted
            playsInline
            preload="metadata"
            webkit-playsinline="true"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          >
            <source src="/preloader.mp4" type="video/mp4" />
           
            Your browser does not support the video tag.
          </video>

          {/* Skip Button - Mobile */}
          {showSkip && (
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 z-10 touch-manipulation"
            >
              Skip
            </button>
          )}

          {/* Loading indicator - Mobile */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error message - Mobile */}
          {videoError && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-t-transparent border-black rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-black text-xs">Loading content...</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex-1 bg-white" />
      </div>
    </>
  );
};

export default PreLoader;