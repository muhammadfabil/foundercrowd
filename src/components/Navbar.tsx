'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <>
      {/* Main Navbar - Always on top */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] font-figtree">
        <nav
          className={[
            'mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 transition-all duration-300',
            scrolled
              ? 'pointer-events-auto rounded-full bg-white text-black shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90 mt-4'
              : 'pointer-events-auto text-black mt-6',
          ].join(' ')}
        >
          {/* LEFT: Logo with Home Link */}
         <Link href="/" className="flex items-center gap-2 z-[110] relative">
          <img
            src="/logo.png"
            alt="FoundersCrowd Logo"
            className="h-16 w-auto filter invert brightness-0"
          />
          <span className="font-medium text-lg text-white">founderscrowd</span>
        </Link>


          {/* CENTER: Links (Desktop only) */}
          <div className="text-md font-medium hidden items-center gap-8 md:flex text-white">
            <Link href="/" className=" hover:opacity-80">Home</Link>
            <Link href="/features" className=" hover:opacity-80">Features</Link>
            <Link href="/reviews" className=" hover:opacity-80">Reviews</Link>
            <Link href="/pricing" className=" hover:opacity-80">Pricing</Link>
            <Link href="/blog" className=" hover:opacity-80">Blog</Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 z-[110] relative text-white">
            {/* All Pages dropdown button (Desktop only) */}
            <div className="hidden md:block">
              <button
                className="group inline-flex items-center text-sm font-medium"
              >
                <span>All Pages</span>
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* CTA Button (Desktop only) */}
            <Link
              href="/download"
              className="hidden md:block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black  transition ml-4"
            >
              Download Free App
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-[110] relative flex items-center justify-center p-2 -m-2"
              type="button"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay - Separate layer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          {/* Backdrop without blur to avoid affecting navbar */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute right-4 top-[90px] left-4 rounded-xl bg-white p-6 shadow-xl border border-gray-100 z-[95]">
            <div className="flex flex-col space-y-1">
              {/* All Pages dropdown */}
              <button 
                className="flex items-center justify-between text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors text-left w-full"
                type="button"
              >
                <span>All Pages</span>
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Navigation Links */}
              <Link 
                href="/" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/features" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/reviews" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/pricing" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blog" 
                className="text-base font-medium py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors block w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/download"
                  className="block w-full rounded-full bg-[#16161A] px-6 py-3 text-center text-base font-medium text-white hover:bg-black/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Download Free App
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
