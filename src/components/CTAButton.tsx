// components/CTAButton.tsx
"use client";

import { useCallback, useEffect, memo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

// Calendly Modal
const CalendlyModal = memo(function CalendlyModal({
  onClose,
}: {
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "unset";
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center bg-black/50 p-4"
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
        className="flex h-[85vh] max-h-[min(800px,calc(100dvh-2rem))] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="calendly-inline-widget w-full h-full"
          data-url="https://calendly.com/spacefunding/raise-capital-online"
        />
      </div>
    </div>,
    document.body
  );
});

interface CTAButtonProps {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onOpenChange?: (open: boolean) => void;
}

export default function CTAButton({ 
  children = "Book a Call", 
  className = "",
  size = "md",
  onOpenChange,
}: CTAButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = useCallback(() => {
    onOpenChange?.(true);
    setOpenModal(true);
  }, [onOpenChange]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Size variants
  const sizes = {
    sm: "px-6 py-3 text-base",
    md: "px-8 py-4 text-lg", 
    lg: "px-10 py-5 text-xl"
  };

  // Base styling dari CTAP (yang Anda suka)
  const baseClasses = `
    bg-[#5271ff] text-white font-semibold rounded-full shadow-lg 
    hover:scale-105 transition duration-300 ease-in-out
  `.trim();

  return (
    <>
      <button
        onClick={handleOpen}
        className={`${baseClasses} ${sizes[size]} ${className}`}
      >
        {children}
      </button>

      {/* Calendly Modal */}
      {openModal && (
        <CalendlyModal
          onClose={handleClose}
        />
      )}
    </>
  );
}
