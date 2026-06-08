import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Steps from "@/components/Steps";
import TestiMap from "@/components/TestiMap";
import Statement from "@/components/Statement";
import Plan from "@/components/Plan";
import Integration from "@/components/Integration";
import CTAButton from "@/components/CTAButton"; // Replace CalendlyModal import

export default function OurTechPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 lg:pt-40 bg-black text-white overflow-hidden pb-24">
          {/* Video Background */}
          <video autoPlay loop muted playsInline preload="metadata" className="earth-video-bg absolute inset-0 w-full h-full object-cover z-0" aria-hidden="true">
            <source src="/EarthVideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70 z-[1]" aria-hidden="true" />
          <div className="absolute inset-0 opacity-20 hero-grain z-[2]"></div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-[3]">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                Our <span className="text-amber-500">Tech</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Discover the cutting-edge platform that powers successful capital raises for businesses worldwide.
              </p>
              {/* Hero video - improved mobile spacing and sizing */}
              <div className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 mb-6 md:mb-8 relative mx-auto max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-lg border border-gray-100">
                  <iframe
                    src="https://player.vimeo.com/video/1032029906?h=0&autoplay=1&loop=1&muted=1"
                    className="h-full w-full"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Platform demo video"
                  />
                </div>
              </div>

              {/* Hero CTA Button - Updated */}
              <CTAButton size="md">Book a Call</CTAButton>
            </div>
          </div>
        </section>

        {/* Section 2: Features */}
        <Features />

        {/* Section 3: Steps */}
        <Steps />

        {/* Section 4: TestiMap */}
        <TestiMap />

        {/* Section 5: Statement */}
        <Statement />

        {/* Section 6: Plan */}
        <Plan />

        {/* Section 7: Integration */}
        <Integration />

        {/* CTA Section - Updated */}
        <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-6xl font-bold mb-6 text-[#2B2B2B]">Ready to leverage our technology?</h2>
              <p className="text-lg text-gray-500 mb-8">
                Let us show you how our platform can transform your capital raising experience.
              </p>

              {/* Final CTA Button - Updated */}
              <CTAButton size="md">Book a Call</CTAButton>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
