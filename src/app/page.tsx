import Navbar from "../components/Navbar";
import {Hero}  from "../components/Hero";
import Features  from "../components/Features";
import Steps from "@/components/Steps";
import Plan from "@/components/Plan";
import Integration from "@/components/Integration";
import Testimony from "@/components/Testimony";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Paralax from "@/components/paralax";



export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <Plan />
      <Integration />
      <Testimony /> 
      <FAQ />
      <Paralax />
      <Footer />

    </main>
  );
}