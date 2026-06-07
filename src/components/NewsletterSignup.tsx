'use client';

import { useState } from 'react';

type NewsletterSignupProps = {
  variant?: 'default' | 'blogHero';
};

export default function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const isBlogHero = variant === 'blogHero';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || 'Unable to subscribe right now. Please try again.');
      }

      setIsSubscribed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    } catch (subscribeError) {
      setError(subscribeError instanceof Error ? subscribeError.message : 'Unable to subscribe right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    if (isBlogHero) {
      return (
        <div className="mx-auto max-w-xl rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-5 text-center">
          <h3 className="text-lg font-bold text-white">Successfully subscribed.</h3>
          <p className="mt-1 text-sm text-white/70">Private markets insights will land in your inbox soon.</p>
        </div>
      );
    }

    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 animate-pulse">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Successfully Subscribed!</h3>
          <p className="text-green-700">Thank you for joining our newsletter. You'll receive updates monthly.</p>
        </div>
      </div>
    );
  }

  if (isBlogHero) {
    return (
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
        <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white p-1.5 shadow-2xl shadow-black/20 sm:flex-row">
          <label htmlFor="blog-hero-email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="blog-hero-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="min-h-14 flex-1 rounded-xl bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Email Address"
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#151515] px-6 text-base font-bold text-white transition-colors hover:bg-[#5271ff] disabled:cursor-not-allowed disabled:bg-[#151515]/70"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Subscribing
              </>
            ) : (
              <>
                Subscribe
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.77 59.77 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />
                </svg>
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-center text-sm font-medium text-red-300" role="alert">
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-6">
        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-2">
          Email Address*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5271ff] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter your email address"
        />
        {error && (
          <p className="mt-3 text-left text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting || !email}
        className="w-full px-8 py-4 bg-[#5271ff] hover:bg-[#5271ff]/90 disabled:bg-[#5271ff] disabled:cursor-not-allowed text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Subscribing...
          </div>
        ) : (
          'Subscribe'
        )}
      </button>
    </form>
  );
}
