import Navbar from "../components/Navbar";
import {Hero}  from "../components/Hero";
import Features  from "../components/Features";
import Steps from "@/components/Steps";
import Plan from "@/components/Plan";
import Integration from "@/components/Integration";
import Testimony from "@/components/Testimony";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CTAP from "@/components/CTAP";
import TestiMap from "@/components/TestiMap";
import Statement from "@/components/Statement";
import ReviewTestimonials from "@/components/ReviewTestimonials";
import { getVimeoTestimonials } from "@/lib/vimeo";



export default async function Page() {
  const vimeoTestimonials = await getVimeoTestimonials();

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <TestiMap />
      <Statement />
      <ReviewTestimonials />
      <Plan />
      <Integration />
      <Testimony vimeoTestimonials={vimeoTestimonials} /> 
      <FAQ />
      <CTAP />
      <Footer />

    </main>
  );
}
