'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-500 font-bold text-lg font-montserrat">
      <nav
        className={[
          'mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 transition-all duration-300',
          scrolled
            ? 'pointer-events-auto rounded-full bg-white text-slate-900 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white mt-4'
            : 'pointer-events-auto text-white mt-6',
        ].join(' ')}
      >
        {/* LEFT: Logo with Home Link */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png" 
            alt="FoundersCrowd Logo"
            className="size-8 md:size-12 sm:size-9 rounded-full border border-white/30 bg-white/10 object-cover"
          />
          <span className="font-semibold tracking-tight text-lg">founderscrowd</span>
        </Link>

        {/* CENTER: Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#invest" className="hover:opacity-80">Invest</Link>
          <Link href="/#learn" className="hover:opacity-80">Learn and Grow</Link>
          <Link href="/blog" className="hover:opacity-80">Blog</Link>
          <Link href="/" className="hover:opacity-80">Home</Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3 text-lg">
          <Link
            href="/#register"
            className={[
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              scrolled
                ? 'border-slate-300 text-slate-900 hover:bg-slate-100'
                : 'border-white/40 text-white hover:bg-white/10',
            ].join(' ')}
          >
            Register
          </Link>
          <Link
            href="/#login"
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              scrolled ? 'bg-slate-900 text-white hover:bg-black' : 'bg-white text-slate-900 hover:opacity-90',
            ].join(' ')}
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
