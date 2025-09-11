"use client";
import React, { memo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FaUser, 
  FaLock, 
  FaBriefcase, 
  FaBullseye, 
  FaLaptop, 
  FaComments,
  FaHandshake,
  FaUsers,
  FaCog,
  FaGavel,
  FaBuilding,
  FaCookie,
  FaShieldAlt,
  FaCalendarAlt,
  FaChild,
  FaBalanceScale,
  FaEye,
  FaEdit,
  FaTrash,
  FaEnvelope
} from 'react-icons/fa';

// Extract constants for better performance
const sections = [
  {
    num: 5, 
    title: "Cookies and Tracking", 
    content: "We use cookies and similar technologies to: Analyze usage trends and improve our Services. Store user preferences and authentication details. Deliver relevant advertising. You may disable cookies in your browser settings, but some features may not function properly.",
    icon: <FaCookie />
  },
  {
    num: 6, 
    title: "Data Security", 
    content: "We use commercially reasonable technical, organizational, and administrative measures to protect personal information against unauthorized access, loss, misuse, or alteration. However, no system is 100% secure. By using the Services, you acknowledge that we cannot guarantee the security of data transmitted through or stored on the platform.",
    icon: <FaShieldAlt />
  },
  {
    num: 7, 
    title: "Data Retention", 
    content: "We retain personal information as long as reasonably necessary to: provide the Services, comply with legal obligations, resolve disputes, and enforce agreements. Users may request deletion of personal data (see Section 9).",
    icon: <FaCalendarAlt />
  },
  {
    num: 8, 
    title: "Children's Privacy", 
    content: "The Services are not directed to, and we do not knowingly collect information from, anyone under 18 years old. If we learn that we have collected data from a minor, we will delete it.",
    icon: <FaChild />
  }
];

const legalSections = [
  {
    num: 10, 
    title: "International Users", 
    content: "If you access the Services from outside the United States, your information may be transferred to and processed in the United States, where privacy laws may differ."
  },
  {
    num: 11, 
    title: "Legal Basis (GDPR Notice)", 
    content: "For users in the European Economic Area (EEA), we process personal data under the following legal bases: Contract performance (providing the Services). Legitimate interests (improving and securing the platform). Legal obligations (compliance with law). Consent (marketing communications)."
  },
  {
    num: 12, 
    title: "Changes to This Privacy Policy", 
    content: "We may update this Privacy Policy from time to time. Updates will be posted with a \"last updated\" date. Continued use of the Services after changes take effect constitutes acceptance of the revised Privacy Policy."
  }
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
                Privacy Policy
              </h1>
              <div className="text-white/80 text-lg mb-8">
                Last updated: September 8th, 2025
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto">
                <p className="text-white/90 leading-relaxed">
                  This Privacy Policy describes how Founderscrowd, Inc. ("Founderscrowd," "we," "us," or "our"), headquartered at 1 Beacon St, Boston, MA 02108, United States, collects, uses, shares, and protects personal information through our website, software, and services (the "Services").
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
                  <strong>Important:</strong> By using the Services, you agree to the practices described in this Privacy Policy.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
                  Information We Collect
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-blue-800 mb-4">We may collect the following categories of information:</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-3 text-blue-700">
                        <li className="flex items-start">
                          <FaUser className="text-blue-500 mr-3 mt-1" />
                          <div>
                            <strong>Personal identifiers:</strong> name, email address, phone number, mailing address.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaLock className="text-blue-500 mr-3 mt-1" />
                          <div>
                            <strong>Account information:</strong> username, password, and profile details.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaBriefcase className="text-blue-500 mr-3 mt-1" />
                          <div>
                            <strong>Transaction-related information:</strong> information you submit when expressing interest in or participating in an offering, such as investment intent, documents, or communications.
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-3 text-blue-700">
                        <li className="flex items-start">
                          <FaBullseye className="text-blue-500 mr-3 mt-1" />
                          <div>
                            <strong>Lead data:</strong> information submitted through campaigns, sign-up forms, or referrals.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaLaptop className="text-blue-500 mr-3 mt-1" />
                          <div>
                            <strong>Technical information:</strong> device type, browser type, IP address, cookies, and usage analytics.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaComments className="text-blue-500 mr-3 mt-1" />
                          <div>
                            <strong>Communications:</strong> any messages or content you provide through the Services.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                  How We Use Information
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-green-800 mb-3">We use the information we collect to:</p>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Operate, maintain, and improve our Services.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Facilitate account registration and secure access.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Enable communications between founders and potential investors.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Provide customer support and respond to inquiries.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Send updates, service notices, and promotional materials (with opt-out options).
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Comply with applicable laws and enforce our Terms of Service.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3 - Special highlight */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                  Ownership of Leads and Data
                </h2>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <FaHandshake className="text-4xl text-purple-600 mx-auto" />
                    <h3 className="text-xl font-bold text-purple-800 mt-2">JOINT OWNERSHIP NOTICE</h3>
                  </div>
                  <div className="space-y-4 text-purple-700">
                    <p>All leads, contact information, and related data collected through the Services in connection with a client's campaign or offering are jointly owned by Founderscrowd and the client issuer.</p>
                    <p>Each party may use such data for its own lawful business purposes, including remarketing, analytics, and future communications, subject to applicable data privacy laws.</p>
                    <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg">
                      <p className="text-yellow-800 font-medium">
                        <strong>Disclaimer:</strong> Founderscrowd is not responsible for how clients use or process such data once shared with them. Clients are independently responsible for complying with all privacy and marketing laws when using lead data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                  Sharing of Information
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <p className="text-orange-800 mb-3">We may share information with:</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <ul className="space-y-2 text-orange-700">
                      <li className="flex items-start">
                        <FaUsers className="text-orange-500 mr-3 mt-1" />
                        <div><strong>Clients (issuers):</strong> when you submit information related to their campaign or offering.</div>
                      </li>
                      <li className="flex items-start">
                        <FaCog className="text-orange-500 mr-3 mt-1" />
                        <div><strong>Service providers:</strong> vendors who provide hosting, analytics, communications, payment processing, or identity verification.</div>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-orange-700">
                      <li className="flex items-start">
                        <FaGavel className="text-orange-500 mr-3 mt-1" />
                        <div><strong>Legal authorities:</strong> when required by law, regulation, subpoena, or legal process.</div>
                      </li>
                      <li className="flex items-start">
                        <FaBuilding className="text-orange-500 mr-3 mt-1" />
                        <div><strong>Corporate transfers:</strong> in connection with a merger, acquisition, or sale of assets.</div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <p className="text-orange-800 font-medium">
                      We do not sell personal data to unrelated third parties.
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
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
              <div className="mb-12 mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">9</span>
                  Your Rights
                </h2>
                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <FaBalanceScale className="text-4xl text-indigo-600 mx-auto" />
                    <h3 className="text-xl font-bold text-indigo-800 mt-2">YOUR PRIVACY RIGHTS</h3>
                  </div>
                  <p className="text-indigo-800 mb-4 text-center font-medium">
                    Depending on your jurisdiction, you may have rights to:
                  </p>
                  <div className="bg-indigo-100 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-start">
                          <FaEye className="text-indigo-500 mr-3 mt-1" />
                          Access the personal data we hold about you.
                        </li>
                        <li className="flex items-start">
                          <FaEdit className="text-indigo-500 mr-3 mt-1" />
                          Correct inaccurate data.
                        </li>
                      </ul>
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-start">
                          <FaTrash className="text-indigo-500 mr-3 mt-1" />
                          Request deletion of your data.
                        </li>
                        <li className="flex items-start">
                          <FaEnvelope className="text-indigo-500 mr-3 mt-1" />
                          Opt out of marketing communications.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 p-3 bg-indigo-200 rounded-lg text-center">
                      <p className="text-indigo-800 font-bold">
                        To exercise your rights, contact us at hello@founderscrowds.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* International and Legal sections */}
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
                <p className="mb-4">For questions or privacy requests, please contact:</p>
                <div className="bg-white/10 rounded-lg p-4 inline-block">
                  <p className="font-medium">Founderscrowd, Inc.</p>
                  <p>1 Beacon St, Boston, MA 02108, United States</p>
                  <a href="mailto:hello@founderscrowds.com" className="text-amber-400 hover:text-amber-300 transition-colors">
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