// components/BackToTopButton.tsx
"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button 
      onClick={scrollToTop}
      className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#AC5B0F]"
    >
      Back to top
      <svg 
        viewBox="0 0 24 24" 
        className="ml-1 h-4 w-4" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" transform="rotate(-90 12 12)" />
      </svg>
    </button>
  );
}