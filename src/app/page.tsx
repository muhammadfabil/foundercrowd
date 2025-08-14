import Navbar from "../components/Navbar";
import {Hero}  from "../components/Hero";
import Features  from "../components/Features";
import Steps from "@/components/Steps";
import Plan from "@/components/Plan";
import Integration from "@/components/Integration";
import Testimony from "@/components/Testimony";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HorizontalHook from "@/components/HorizontalHook";


export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HorizontalHook />
      <Steps />
      <Plan />
      <Integration />
      <Testimony /> 
      <FAQ />
      <Footer />

    </main>
  );
}