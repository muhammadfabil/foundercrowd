import {
  heroSection,
  companyStats,
  valueProps,
  testimonials,
  pricingPlans,
  faqs,
  footerSections,
  socialLinks
} from "@/data";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ValueProps from "@/components/ValueProps";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import CTABuffer from "@/components/CTABuffer";

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <Hero data={heroSection} />

       {/* Value Props */}
      <ValueProps items={valueProps} />


     

      {/* Testimonials */}
      <Testimonials items={testimonials} />

      {/* Pricing */}
      <Pricing plans={pricingPlans} />

      {/* FAQ */}
      <FAQSection items={faqs} />

      <CTABuffer />

      {/* Footer */}
      <Footer sections={footerSections} socials={socialLinks} />
    </>
  );
}
