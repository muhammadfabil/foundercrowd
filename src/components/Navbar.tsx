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

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 font-figtree">
      <nav
        className={[
          'mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 transition-all duration-300',
          scrolled
            ? 'pointer-events-auto rounded-full bg-white text-black shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90 mt-4'
            : 'pointer-events-auto text-black mt-6',
        ].join(' ')}
      >
        {/* LEFT: Logo with Home Link */}
        <Link href="/" className="flex items-center gap-2 z-20">
          <img
            src="/logo.png" 
            alt="FoundersCrowd Logo"
            className="h-8 w-auto"
          />
          <span className="font-medium text-lg">founderscrowd</span>
        </Link>

        {/* CENTER: Links (Desktop only) */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/features" className="text-sm font-medium hover:opacity-80">Features</Link>
          <Link href="/reviews" className="text-sm font-medium hover:opacity-80">Reviews</Link>
          <Link href="/pricing" className="text-sm font-medium hover:opacity-80">Pricing</Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
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
            className="hidden md:block rounded-full bg-[#16161A] px-6 py-2.5 text-sm font-medium text-white hover:bg-black/90 transition ml-4"
          >
            Download Free App
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-20 flex items-center justify-center"
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
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-4 top-[90px] left-4 rounded-xl bg-white p-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center justify-between text-sm font-medium">
                All Pages
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Link 
                href="/features" 
                className="text-sm font-medium py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/reviews" 
                className="text-sm font-medium py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-2">
                <Link
                  href="/download"
                  className="block w-full rounded-full bg-[#16161A] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-black/90 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Download Free App
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
