"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { GB, US, DE, FR, SG, AU, IN, BR } from "country-flag-icons/react/3x2";

type Testimonial = {
  id: string;
  name: string;
  company: string;
  country: string;
  testimonial: string;
  image: string;
};

const CountryFlags: Record<string, React.ComponentType<any>> = {
  GB,
  US,
  DE,
  FR,
  SG,
  AU,
  IN,
  BR,
};

const VISIBLE_COUNT = 5;

const TestiMap = () => {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      { id: "us1", name: "Sarah Johnson", company: "TechInnovate", country: "US", testimonial: "FounderCrowd helped us secure our Series A funding in half the time we expected. The platform connected us with investors who truly understood our vision.", image: "/testi1.jpg" },
      { id: "gb1", name: "James Wilson", company: "Fintech Solutions", country: "GB", testimonial: "As a fintech startup in London, we needed specialized investors. FounderCrowd's targeted matching algorithm connected us with the perfect partners.", image: "/testi1.jpg" },
      { id: "de1", name: "Anna Schmidt", company: "GreenEnergy", country: "DE", testimonial: "The comprehensive tools on FounderCrowd made our fundraising process efficient and transparent. We closed our €2M round in just two months.", image: "/testi1.jpg" },
      { id: "fr1", name: "Jean Dupont", company: "AI Solutions", country: "FR", testimonial: "FounderCrowd's platform provided us incredible exposure to international investors we wouldn't have reached otherwise.", image: "/testi1.jpg" },
      { id: "sg1", name: "Li Wei", company: "EcoTech", country: "SG", testimonial: "The seamless experience of connecting with investors across Asia and beyond made FounderCrowd invaluable for our expansion plans.", image: "/testi1.jpg" },
      { id: "au1", name: "Emma Thompson", company: "HealthTech Pro", country: "AU", testimonial: "We were able to find investors who specialize in healthcare technology through FounderCrowd, making our Series B round remarkably smooth.", image: "/testi1.jpg" },
      { id: "in1", name: "Raj Patel", company: "EdTech Solutions", country: "IN", testimonial: "FounderCrowd opened doors to global investors for our education platform, helping us scale across multiple markets.", image: "/testi1.jpg" },
      { id: "br1", name: "Carlos Silva", company: "SustainableTech", country: "BR", testimonial: "Visibility to attract international capital.", image: "/testi1.jpg" },
    ],
    []
  );

  const [activeTestimonial, setActiveTestimonial] = useState<string>(testimonials[0].id);

  const activeTestimonialData = useMemo(
    () => testimonials.find((t) => t.id === activeTestimonial) || testimonials[0],
    [activeTestimonial, testimonials]
  );

  const countriesWithTestimonials = useMemo(() => {
    const unique = Array.from(new Set(testimonials.map((t) => t.country)));
    return unique.map((countryCode) => ({
      country: countryCode,
      testimonials: testimonials.filter((t) => t.country === countryCode),
    }));
  }, [testimonials]);

  const activeCountryIndex = useMemo(() => {
    const country = activeTestimonialData.country;
    return countriesWithTestimonials.findIndex((c) => c.country === country);
  }, [activeTestimonialData.country, countriesWithTestimonials]);

  // window sirkular 5 item (aktif di tengah)
  const visibleCountries = useMemo(() => {
    const arr = countriesWithTestimonials;
    const n = arr.length;
    if (n === 0) return [];
    const half = Math.floor(VISIBLE_COUNT / 2);
    const out: typeof arr = [];
    for (let k = -half; k <= half; k++) {
      const idx = (activeCountryIndex + k + n) % n;
      out.push(arr[idx]);
    }
    return out;
  }, [countriesWithTestimonials, activeCountryIndex]);

  // auto-scroll 4s
  useEffect(() => {
    if (!countriesWithTestimonials.length) return;
    const id = setInterval(() => {
      const nextIdx = (activeCountryIndex + 1) % countriesWithTestimonials.length;
      const next = countriesWithTestimonials[nextIdx].testimonials[0].id;
      setActiveTestimonial(next);
    }, 4000);
    return () => clearInterval(id);
  }, [activeCountryIndex, countriesWithTestimonials]);

  // ---------- Flag list (hanya render sesuai orientasi yang diminta) ----------
  const CountryFlagList = React.memo(
    ({
      countries,
      activeTestimonial,
      setActiveTestimonial,
      orientation = "col", // 'row' | 'col'
      showCaption = false,
    }: {
      countries: { country: string; testimonials: Testimonial[] }[];
      activeTestimonial: string;
      setActiveTestimonial: (id: string) => void;
      orientation?: "row" | "col";
      showCaption?: boolean;
    }) => {
      const isRow = orientation === "row";
      return (
        <div className={isRow ? "flex flex-col items-stretch w-full" : "flex flex-col items-center w-full"}>
          <div className={`flex ${isRow ? "flex-row gap-3 justify-center" : "flex-col space-y-4 items-center"}`}>
            {countries.map(({ country, testimonials }) => {
              const FlagComponent = CountryFlags[country];
              const isActive = testimonials.some((t) => t.id === activeTestimonial);
              const btnClass = isRow ? "w-12 h-12" : "w-14 h-14";
              const flagClass = isRow ? "w-9 h-9" : "w-10 h-10";
              return (
                <button
                  key={country}
                  onClick={() => setActiveTestimonial(testimonials[0].id)}
                  className={`${btnClass} rounded-xl flex items-center justify-center border transition-all ${
                    isActive ? "bg-[#2B2B2B] border-gray-700" : "bg-gray-100 border-gray-300"
                  }`}
                  aria-label={`Select ${country}`}
                >
                  <div className={`${flagClass} rounded-lg overflow-hidden`}>
                    <FlagComponent className="w-full h-full" />
                  </div>
                </button>
              );
            })}
          </div>

          {showCaption && (
            <div className="mt-5 text-center">
              <p className="text-gray-700 font-medium text-sm">From funnel to funding</p>
              <p className="text-gray-600 mt-1 text-xs">
                FoundersCrowd AI builds the path. FoundersCrowd Marketing gets you seen.
              </p>
            </div>
          )}
        </div>
      );
    }
  );

  const TestimonialCard = React.memo(({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-[#2B2B2B]/90 text-white rounded-xl shadow-xl p-4 max-w-[92%] md:max-w-md absolute transform transition-all duration-300">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-white">{testimonial.name}</h3>
          <p className="text-gray-300 font-medium text-sm">{testimonial.company}</p>
          <div className="flex items-center space-x-1 text-xs text-gray-400">{testimonial.country}</div>
        </div>
      </div>
      <p className="text-gray-100 italic text-sm">"{testimonial.testimonial}"</p>
    </div>
  ));

  return (
    <section className="py-12 bg-white font-figtree">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-medium text-black mb-2">
            Success stories from around the world
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            See how founders across the globe have leveraged FounderCrowd to achieve their fundraising goals.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-300">
          {/* MOBILE: flags (atas) */}
          <div className="md:hidden">
            <CountryFlagList
              countries={visibleCountries}
              activeTestimonial={activeTestimonial}
              setActiveTestimonial={setActiveTestimonial}
              orientation="row"
              showCaption={false}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* DESKTOP: kolom bendera kiri */}
            <div className="hidden md:block md:w-1/5">
              <CountryFlagList
                countries={visibleCountries}
                activeTestimonial={activeTestimonial}
                setActiveTestimonial={setActiveTestimonial}
                orientation="col"
                showCaption={true}
              />
            </div>

            {/* Map + Card */}
            <div className="w-full md:w-4/5">
              <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-lg overflow-hidden">
                <Image src="/TestiMap.png" alt="World Map" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <TestimonialCard testimonial={activeTestimonialData} />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE: caption di bawah */}
          <div className="md:hidden mt-6 text-center">
            <p className="text-gray-700 font-medium text-sm">From funnel to funding</p>
            <p className="text-gray-600 mt-1 text-xs">
              FoundersCrowd AI builds the path. FoundersCrowd Marketing gets you seen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestiMap;
