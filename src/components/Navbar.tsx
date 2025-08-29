'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Add the CalendlyModal component
function CalendlyModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    
    // Add the Calendly script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    // Handle loading state
    script.onload = () => {
      // Short timeout to ensure widget initialization
      setTimeout(() => setIsLoading(false), 1000);
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.removeEventListener("keydown", onEsc);
      // Clean up script if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#F3EFE7]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#8A490C]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-medium text-white">Book a call</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-xs bg-white/10 hover:bg-white/15 text-white"
          >
            Close
          </button>
        </div>
        <div className="h-[70vh] min-h-[400px] md:min-h-[600px] relative">
          {/* Loading animation */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#8A490C] z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                <p className="mt-4 text-white/80 text-sm">Loading calendar...</p>
              </div>
            </div>
          )}
          
          {/* Use the Calendly inline widget div structure */}
          <div 
            className="calendly-inline-widget h-full w-full" 
            data-url={url}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Add default Calendly URL
  const calendlyUrl = "https://calendly.com/spacefunding/raise-capital-online";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Main Navbar - Always on top */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] font-figtree">
        <nav
          className={[
            'mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 transition-all duration-300',
            scrolled
              ? 'pointer-events-auto rounded-full bg-white text-black shadow-lg mt-2 py-1 md:py-2'
              : 'pointer-events-auto text-white mt-6 py-1 md:py-2',
          ].join(' ')}
        >
          {/* LEFT: Logo with Home Link */}
          <Link href="/" className="flex items-center gap-2 z-[110] relative p-1">
            <img
              src="/logo.png"
              alt="FoundersCrowd Logo"
              className={`h-8 md:h-14 w-auto transition-all duration-300 ${
                scrolled 
                  ? '' 
                  : 'filter invert brightness-0'
              }`}
            />
            <span className={`font-medium text-base md:text-lg transition-all duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}>
              Founderscrowd
            </span>
          </Link>

          {/* CENTER: Navigation Menu (Desktop only) */}
          <div className={`hidden lg:flex items-center gap-8 text-sm font-medium transition-all duration-300 ${
            scrolled ? 'text-black' : 'text-white'
          }`}>
            {/* Home */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>

            {/* Companies Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                Companies
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  
                  <Link href="/why-founderscrowd" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Why Founderscrowd
                  </Link>
                  <Link href="/sports" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Sports
                  </Link>
                  <Link href="/our-tech" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Our Tech
                  </Link>
                  <Link href="/merger-acquisition" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Merger & Acquisition
                  </Link>
                </div>
              </div>
            </div>

            {/* Investors Dropdown */}
            <Link href="https://founderscrowd.beehiiv.com/" className="hover:opacity-80 transition-opacity">
              Investors
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Blog
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className={`flex items-center gap-2 md:gap-3 z-[110] relative transition-all duration-300 ${
            scrolled ? 'text-black' : 'text-white'
          }`}>
            {/* CTA Button (Desktop only) */}
            <button
              onClick={() => setOpenCalendly(true)}
              className={`hover:bg-white hover:text-black hidden md:block rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                scrolled 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-amber-600 text-white hover:bg-gray-100'
              }`}
            >
              Start Raising
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden z-[110] relative flex items-center justify-center p-1.5 -m-1.5 hover:opacity-80 transition-opacity"
              type="button"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute right-4 top-[70px] left-4 rounded-xl bg-white p-6 shadow-xl border border-gray-100 z-[95] max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {/* Home */}
              <Link 
                href="/" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Companies Section */}
              <div>
                <button 
                  onClick={() => toggleDropdown('companies')}
                  className="flex items-center justify-between text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
                >
                  Companies
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'companies' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'companies' && (
                  <div className="ml-4 space-y-1">
                    
                    <Link href="/why-founderscrowd" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Why Founderscrowd
                    </Link>
                    <Link href="/sports" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Sports
                    </Link>
                    <Link href="/our-tech" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Our Tech
                    </Link>
                    <Link href="/merger-acquisition" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Merger & Acquisition
                    </Link>
                  </div>
                )}
              </div>

              {/* Investors Section */}
              <div>
                <button 
                  onClick={() => toggleDropdown('investors')}
                  className="flex items-center justify-between text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
                >
                  Investors
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'investors' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'investors' && (
                  <div className="ml-4 space-y-1">
                    <Link href="/vip-program" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Join our VIP program
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources Section */}
              <div>
                <button 
                  onClick={() => toggleDropdown('resources')}
                  className="flex items-center justify-between text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
                >
                  Resources
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'resources' && (
                  <div className="ml-4 space-y-1">
                    <Link href="/blog" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Blog
                    </Link>
                    <Link href="/faq" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      FAQ
                    </Link>
                  </div>
                )}
              </div>
              
              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setOpenCalendly(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-full bg-black px-6 py-3 text-center text-base font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Start Raising
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
