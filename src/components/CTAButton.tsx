// components/CTAButton.tsx
"use client";

import { useState, memo, useEffect } from "react";

// Space Funding Modal
const SpaceFundingModal = memo(function SpaceFundingModal({
  onClose,
}: {
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Add the Space Funding script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://link.space-funding.us/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", onEsc);
      // Restore body scroll
      document.body.style.overflow = "unset";
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
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
        className="bg-white rounded-lg w-full max-w-4xl h-[85vh] max-h-[800px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-auto">
          <iframe 
            src="https://link.space-funding.us/widget/booking/rjTqfMgDh3uzLlGVvco6" 
            style={{ 
              width: "100%", 
              minHeight: "100%",
              border: "none"
            }} 
            scrolling="yes"
            id="rjTqfMgDh3uzLlGVvco6_1758180452451"
          />
        </div>
      </div>
    </div>
  );
});

interface CTAButtonProps {
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CTAButton({ 
  children = "Book a Call", 
  className = "",
  size = "md"
}: CTAButtonProps) {
  const [openModal, setOpenModal] = useState(false);

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
        onClick={() => setOpenModal(true)}
        className={`${baseClasses} ${sizes[size]} ${className}`}
      >
        {children}
      </button>

      {/* Space Funding Modal */}
      {openModal && (
        <SpaceFundingModal
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}