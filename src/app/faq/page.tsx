"use client";
import React, { memo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

const FaqPage = memo(() => {
  return (
    <>
      <Navbar />
      <main className="bg-[#2B2B2B] min-h-screen pt-24">
        <FAQ />
      </main>
      <Footer />
    </>
  );
});

export default FaqPage;