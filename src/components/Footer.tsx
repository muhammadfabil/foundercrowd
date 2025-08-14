import React from 'react';
import { FaTwitter, FaLinkedin, FaDiscord, FaReddit } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 font-montserrat relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="FoundersCrowd Logo" className="w-12 h-12 rounded-full object-cover" />
              <span className="text-xl font-bold text-gray-900">FoundersCrowd</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              FoundersCrowd is the comprehensive fundraising platform that enables founders 
              to raise capital through various regulatory pathways. Using advanced technology, 
              FoundersCrowd streamlines the entire process from investor matching to compliance, 
              making fundraising accessible and efficient for startups and growth-stage companies.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-black">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#AC5B0F] hover:text-white transition-colors duration-300"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#AC5B0F] hover:text-white transition-colors duration-300"
              >
                <FaDiscord className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#AC5B0F] hover:text-white transition-colors duration-300"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#AC5B0F] hover:text-white transition-colors duration-300"
              >
                <FaReddit className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              PLATFORM
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Fundraising
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Investor Network
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Compliance Tools
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Feature Request
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              RESOURCES
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Learning Hub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Webinars
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              LEGAL
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  GDPR Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#AC5B0F] transition-colors duration-300">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 bg-white">
          <p className="text-gray-500 text-sm">
            2025 FoundersCrowd Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;