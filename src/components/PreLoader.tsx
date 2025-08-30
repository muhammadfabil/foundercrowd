import React, { useEffect, useState } from 'react';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onComplete();
    }, 10000); // Fallback timeout jika video gagal

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsLoaded(true);
    onComplete();
  };

  if (isLoaded) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <video
        autoPlay
        muted
        loop={false}
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
      >
        <source src="/preloader.mp4" type="video/mp4" />
        {/* Fallback jika video tidak didukung */}
        <p>Browser Anda tidak mendukung video.</p>
      </video>
    </div>
  );
};

export default PreLoader;