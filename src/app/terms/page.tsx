"use client";
import React, { memo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FiAlertTriangle, 
  FiX, 
  FiCheck, 
  FiLock, 
  FiZap, 
  FiXCircle,
  FiMail
} from 'react-icons/fi';

// Extract constants for better performance
const sections = [
  { num: 5, title: "Intellectual Property", content: "All software, content, and materials available through the Services are owned by Founderscrowd or our licensors and are protected by copyright, trademark, and other laws. You may not copy, distribute, reverse-engineer, or otherwise exploit our Services except as expressly permitted in writing." },
  { num: 6, title: "User Content", content: "If you submit, upload, or post content (\"User Content\"), you grant Founderscrowd a nonexclusive, royalty-free license to use, display, and store that content as needed to operate the Services. You represent that you own or have rights to such content and that it does not violate laws or third-party rights." },
  { num: 7, title: "Third-Party Services", content: "The Services may integrate with third-party providers (e.g., payment processors, identity verification services). Founderscrowd does not control these services and is not responsible for their performance, accuracy, or security. Your use of third-party services is at your own risk and subject to their terms." },
  { num: 8, title: "Privacy", content: "Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, and protect your information." }
];

const legalSections = [
  { num: 10, title: "Limitation of Liability", content: "To the maximum extent permitted by law: (1) Founderscrowd will not be liable for any indirect, incidental, consequential, punitive, or special damages, including lost profits. (2) Our total liability for any claim related to the Services will not exceed the greater of (i) $100 or (ii) the total amount paid by you to Founderscrowd in the 12 months preceding the claim." },
  { num: 11, title: "Indemnification", content: "You agree to indemnify, defend, and hold harmless Founderscrowd, its officers, directors, employees, and affiliates from any claims, damages, liabilities, and expenses arising out of your: use of the Services, violation of these Terms, or infringement of third-party rights." },
  { num: 12, title: "Governing Law & Dispute Resolution", content: "These Terms are governed by the laws of the Commonwealth of Massachusetts, United States, without regard to conflicts of law. Any disputes will be resolved through binding arbitration under the rules of the American Arbitration Association, held in Boston, Massachusetts. You waive the right to participate in class actions or jury trials." },
  { num: 13, title: "Modifications", content: "We may update these Terms from time to time. Changes will be posted with a \"last updated\" date. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms." },
  { num: 14, title: "Termination", content: "We may suspend or terminate your account or access to the Services at any time, with or without cause. Upon termination, all licenses granted under these Terms will immediately end." },
  { num: 15, title: "Miscellaneous", content: "These Terms constitute the entire agreement between you and Founderscrowd regarding the Services. If any provision is held unenforceable, the remaining provisions remain in effect. You may not assign your rights under these Terms without our prior consent. Our failure to enforce any right is not a waiver of such right." }
];

const Page = memo(() => {
  return (
    <>
      <Navbar />
      <main className="bg-white font-figtree">
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 lg:pt-40 pb-16 bg-[#2B2B2B] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-noise"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-amber-500">Founderscrowd</span><br />
                Terms of Service
              </h1>
              <div className="text-white/80 text-lg mb-8">
                Last updated: September 8th, 2025
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto">
                <p className="text-white/90 leading-relaxed">
                  Welcome to Founderscrowd, a technology platform operated by Founderscrowd, Inc. ("Founderscrowd," "we," "us," or "our"), headquartered at 1 Beacon St, Boston, MA 02108, United States. These Terms of Service (the "Terms") govern your access to and use of our website, software, and services (collectively, the "Services").
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed text-lg">
                  <strong>By using the Services, you agree to these Terms. If you do not agree, you may not use the Services.</strong>
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
                  No Investment, Brokerage, or Advisory Services
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                    <FiAlertTriangle className="mr-2" />
                    Important Disclaimer
                  </h3>
                  <p className="text-red-700 mb-4">Founderscrowd is a software and technology provider only. We are not:</p>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">•</span>
                      a broker-dealer,
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">•</span>
                      a registered funding portal,
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">•</span>
                      an investment adviser,
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">•</span>
                      a bank, escrow agent, custodian, or financial institution.
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">We do not:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <FiX className="text-gray-500 mr-3 mt-1" />
                        provide investment advice or recommendations,
                      </li>
                      <li className="flex items-start">
                        <FiX className="text-gray-500 mr-3 mt-1" />
                        solicit or effect securities transactions,
                      </li>
                      <li className="flex items-start">
                        <FiX className="text-gray-500 mr-3 mt-1" />
                        hold or handle investor funds or securities,
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <FiX className="text-gray-500 mr-3 mt-1" />
                        conduct due diligence on issuers or investors,
                      </li>
                      <li className="flex items-start">
                        <FiX className="text-gray-500 mr-3 mt-1" />
                        guarantee or endorse any offering or investment.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-yellow-800 font-medium">
                      Any securities transactions you engage in are between you and the issuer or investor. You are solely responsible for your own investment decisions, and you should consult licensed legal, financial, or tax advisors before making any investment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                  Eligibility
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-blue-800 mb-4">By using the Services, you represent and warrant that you:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start">
                        <FiCheck className="text-blue-500 mr-3 mt-1" />
                        are at least 18 years old,
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="text-blue-500 mr-3 mt-1" />
                        have the authority to enter into these Terms,
                      </li>
                    </ul>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start">
                        <FiCheck className="text-blue-500 mr-3 mt-1" />
                        have not been previously suspended or barred from the Services, and
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="text-blue-500 mr-3 mt-1" />
                        are not using the Services for competitive purposes or unlawful activities.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                  Accounts and Security
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <FiLock className="mr-2" />
                    You may need to create an account to use certain features. You agree to:
                  </h3>
                  <ul className="space-y-2 text-green-700 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      provide accurate, current, and complete information,
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      maintain the confidentiality of your login credentials, and
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      accept responsibility for all activities under your account.
                    </li>
                  </ul>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-green-800 text-sm flex items-start">
                      <FiZap className="mr-2 mt-1 flex-shrink-0" />
                      Notify us immediately of any unauthorized use of your account. Founderscrowd is not liable for losses resulting from unauthorized use.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                  Use of Services
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                    <FiXCircle className="mr-2" />
                    You agree not to use the Services to:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-red-700">
                      <li className="flex items-start">
                        <FiX className="text-red-500 mr-3 mt-1" />
                        violate any laws or regulations,
                      </li>
                      <li className="flex items-start">
                        <FiX className="text-red-500 mr-3 mt-1" />
                        infringe on intellectual property or privacy rights,
                      </li>
                      <li className="flex items-start">
                        <FiX className="text-red-500 mr-3 mt-1" />
                        upload harmful or misleading content,
                      </li>
                    </ul>
                    <ul className="space-y-2 text-red-700">
                      <li className="flex items-start">
                        <FiX className="text-red-500 mr-3 mt-1" />
                        impersonate another person or entity, or
                      </li>
                      <li className="flex items-start">
                        <FiX className="text-red-500 mr-3 mt-1" />
                        interfere with or disrupt the Services.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-red-800 text-sm font-medium flex items-start">
                      <FiAlertTriangle className="mr-2 mt-1 flex-shrink-0" />
                      We reserve the right to suspend or terminate your access for violations of these Terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Remaining sections with better formatting */}
              <div className="space-y-12">
                {sections.map((section) => (
                  <div key={section.num} className="border-l-4 border-gray-300 pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="bg-gray-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-3">{section.num}</span>
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>

              {/* Disclaimers - Special formatting */}
              <div className="mb-12 mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">9</span>
                  Disclaimers
                </h2>
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <FiAlertTriangle className="text-4xl text-yellow-600 mx-auto" />
                    <h3 className="text-xl font-bold text-yellow-800 mt-2">IMPORTANT DISCLAIMERS</h3>
                  </div>
                  <p className="text-yellow-800 mb-4 text-center font-medium">
                    The Services are provided "as is" and "as available." Founderscrowd makes no warranties or guarantees, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">We do not guarantee that:</h4>
                    <ul className="space-y-1 text-yellow-700">
                      <li>• any investment opportunity will be successful,</li>
                      <li>• the Services will be uninterrupted or error-free, or</li>
                      <li>• information provided through the platform is complete, accurate, or reliable.</li>
                    </ul>
                    <p className="mt-3 font-bold text-yellow-800">You use the Services entirely at your own risk.</p>
                  </div>
                </div>
              </div>

              {/* Liability and Legal sections */}
              <div className="space-y-12">
                {legalSections.map((section) => (
                  <div key={section.num} className="border-l-4 border-gray-300 pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="bg-gray-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-3">{section.num}</span>
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-16 bg-[#2B2B2B] text-white rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-amber-500">Contact Us</h2>
                <p className="mb-4">For questions about these Terms, please contact:</p>
                <div className="bg-white/10 rounded-lg p-4 inline-block">
                  <p className="font-medium">Founderscrowd, Inc.</p>
                  <p>1 Beacon St, Boston, MA 02108, United States</p>
                  <a href="mailto:hello@founderscrowds.com" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-center mt-2">
                    <FiMail className="mr-2" />
                    hello@founderscrowds.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        <style jsx>{`
          .hero-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
});

export default Page;