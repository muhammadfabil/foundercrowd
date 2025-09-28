// components/CTAButton.tsx
"use client";

import { useState, memo, useEffect } from "react";

// Default Calendly URL
const DEFAULT_CALENDLY_URL = "https://calendly.com/founderscrowds/30min";

// Calendly Modal (sama seperti di CTAP)
const CalendlyModal = memo(function CalendlyModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    // Add the Calendly script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", onEsc);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="calendly-inline-widget h-full w-full"
        data-url={url}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
});

interface CTAButtonProps {
  children?: React.ReactNode;
  calendlyUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CTAButton({ 
  children = "Book a Call", 
  calendlyUrl = DEFAULT_CALENDLY_URL,
  className = "",
  size = "md"
}: CTAButtonProps) {
  const [openCalendly, setOpenCalendly] = useState(false);

  // Size variants
  const sizes = {
    sm: "px-6 py-3 text-base",
    md: "px-8 py-4 text-lg", 
    lg: "px-10 py-5 text-xl"
  };

  // Base styling dari CTAP (yang Anda suka)
  const baseClasses = `
    bg-amber-600 text-white font-semibold rounded-full shadow-lg 
    hover:scale-105 transition duration-300 ease-in-out
  `.trim();

  return (
    <>
      <button
        onClick={() => setOpenCalendly(true)}
        className={`${baseClasses} ${sizes[size]} ${className}`}
      >
        {children}
      </button>

      {/* Calendly Modal */}
      {openCalendly && (
        <CalendlyModal
          url={calendlyUrl}
          onClose={() => setOpenCalendly(false)}
        />
      )}
    </>
  );
}