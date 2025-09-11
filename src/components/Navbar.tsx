'use client';
import { useEffect, useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Add the CalendlyModal component
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
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
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
      className="fixed inset-0 z-[9999] bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // Close when clicking backdrop
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Calendly widget container */}
      <div 
        className="calendly-inline-widget h-full w-full" 
        data-url={url}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on Calendly widget
      ></div>
    </div>
  );
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Check if current page is blog related (blog index or blog post)
  const isBlogPage = pathname?.startsWith('/blog');

  // Add default Calendly URL as constant
  const calendlyUrl = "https://calendly.com/founderscrowds/30min";

  // Memoized scroll handler
  const onScroll = useCallback(() => setScrolled(window.scrollY > 16), []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

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

  // Memoized toggle dropdown function
  const toggleDropdown = useCallback((menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  }, [openDropdown]);

  // Memoized handlers
  const handleOpenCalendly = useCallback(() => setOpenCalendly(true), []);
  const handleCloseCalendly = useCallback(() => setOpenCalendly(false), []);
  const handleToggleMobileMenu = useCallback(() => setMobileMenuOpen(!mobileMenuOpen), [mobileMenuOpen]);
  const handleCloseMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      {/* Main Navbar - Always on top */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] font-figtree">
        <nav
          className={[
            'mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 transition-all duration-300',
            scrolled
              ? 'pointer-events-auto rounded-full bg-white text-black shadow-lg mt-2 py-1 md:py-2'
              : `pointer-events-auto ${isBlogPage ? 'text-black' : 'text-white'} mt-6 py-1 md:py-2`,
          ].join(' ')}
        >
          {/* LEFT: Logo with Home Link */}
          <Link href="/" className="flex items-center gap-2 z-[110] relative p-1">
            <Image
              src="/logo.png"
              alt="FoundersCrowd Logo"
              width={56}
              height={56}
              className={`h-8 md:h-14 w-auto transition-all duration-300 ${
                scrolled || isBlogPage
                  ? '' 
                  : 'filter invert brightness-0'
              }`}
              priority={true}
            />
            <span className={`font-medium text-base md:text-lg transition-all duration-300 ${
              scrolled || isBlogPage ? 'text-black' : 'text-white'
            }`}>
              Founderscrowd
            </span>
          </Link>

          {/* CENTER: Navigation Menu (Desktop only) */}
          <div className={`hidden lg:flex items-center gap-8 text-sm font-medium transition-all duration-300 ${
            scrolled || isBlogPage ? 'text-black' : 'text-white'
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
                  <Link href="/team" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className={`flex items-center gap-2 md:gap-3 z-[110] relative transition-all duration-300 ${
            scrolled || isBlogPage ? 'text-black' : 'text-white'
          }`}>
            {/* CTA Button (Desktop only) */}
            <button
              onClick={handleOpenCalendly}
              className={`hover:bg-white hover:text-black hidden md:block rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                scrolled || isBlogPage
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-amber-600 text-white hover:bg-gray-100'
              }`}
            >
              Start Raising
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={handleToggleMobileMenu}
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
            onClick={handleCloseMobileMenu}
          />
          
          {/* Menu Content */}
          <div className="absolute right-4 top-[70px] left-4 rounded-xl bg-white p-6 shadow-xl border border-gray-100 z-[95] max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {/* Home */}
              <Link 
                href="/" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={handleCloseMobileMenu}
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
                    <Link href="/why-founderscrowd" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
                      Why Founderscrowd
                    </Link>
                    <Link href="/sports" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
                      Sports
                    </Link>
                    <Link href="/our-tech" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
                      Our Tech
                    </Link>
                    <Link href="/merger-acquisition" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
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
                    <Link href="/vip-program" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
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
                    <Link href="/blog" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
                      Blog
                    </Link>
                    <Link href="/faq" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
                      FAQ
                    </Link>
                    <Link href="/team" className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={handleCloseMobileMenu}>
                      Our Team
                    </Link>
                  </div>
                )}
              </div>
              
              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    handleOpenCalendly();
                    handleCloseMobileMenu();
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
          onClose={handleCloseCalendly} 
        />
      )}
    </>
  );
}
