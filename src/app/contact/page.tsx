import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact Space Funding",
  description: "Contact Space Funding about fundraising, investor access, partnerships, and M&A opportunities.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f9ff] pt-28">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="pt-4">
            <span className="inline-flex rounded-full bg-[#5271ff]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5271ff]">
              Contact
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight text-[#151515] sm:text-5xl">
              Start the right conversation.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              Tell us what you are working on and the team will route your request to the right person.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-sm font-bold text-[#151515]">Founder requests</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Fundraising, investor readiness, market positioning, and platform onboarding.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-sm font-bold text-[#151515]">Investor and partner requests</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Deal access, strategic partnerships, acquisition interest, and platform collaboration.
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
