import React, { useEffect, useState } from 'react';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device - lowered threshold for better mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640); // Changed from 768 to 640
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setIsLoaded(true);
      onComplete();
    }, 15000); // Increased fallback timeout for video loading

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsLoaded(true);
    onComplete();
  };

  const handleVideoError = () => {
    // Fallback if video fails to load
    setTimeout(() => {
      setIsLoaded(true);
      onComplete();
    }, 2000);
  };

  if (isLoaded) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <video
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        className="w-full h-full object-cover"
        preload="auto"
      >
        <source 
          src={isMobile ? "/mobpre.mp4" : "/webpre.mp4"} 
          type="video/mp4" 
        />
        {/* Fallback jika video tidak didukung */}
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-orange-500 to-yellow-500">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-bold">FounderCrowd</p>
            <p className="text-sm opacity-80">Loading...</p>
          </div>
        </div>
      </video>
    </div>
  );
};

export default PreLoader;