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
    <div className="fixed inset-x-0 top-0 z-50 font-figtree">
      <nav
        className={[
          'mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 transition-all duration-300',
          scrolled
            ? 'rounded-full bg-white text-black shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/95 mt-4'
            : 'text-black mt-6',
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
          <Link href="/" className="text-sm font-medium hover:opacity-80 transition-opacity">Home</Link>
          <Link href="/features" className="text-sm font-medium hover:opacity-80 transition-opacity">Features</Link>
          <Link href="/reviews" className="text-sm font-medium hover:opacity-80 transition-opacity">Reviews</Link>
          <Link href="/pricing" className="text-sm font-medium hover:opacity-80 transition-opacity">Pricing</Link>
          <Link href="/blog" className="text-sm font-medium hover:opacity-80 transition-opacity">Blog</Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {/* All Pages dropdown button (Desktop only) */}
          <div className="hidden md:block">
            <button
              className="group inline-flex items-center text-sm font-medium hover:opacity-80 transition-opacity"
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
            className="hidden md:block rounded-full bg-[#16161A] px-6 py-2.5 text-sm font-medium text-white hover:bg-black/90 transition-colors ml-4"
          >
            Download Free App
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-20 flex items-center justify-center p-2"
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
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-40 mx-4 mt-2 rounded-xl bg-white p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center justify-between text-sm font-medium hover:opacity-80 transition-opacity">
                All Pages
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Link 
                href="/" 
                className="text-sm font-medium py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/features" 
                className="text-sm font-medium py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/reviews" 
                className="text-sm font-medium py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="pt-2 border-t border-gray-100">
                <Link
                  href="/download"
                  className="block w-full rounded-full bg-[#16161A] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-black/90 transition-colors"
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
