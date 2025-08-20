import React from 'react';
import { FaTwitter, FaLinkedin, FaDiscord, FaReddit } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-20 font-figtree">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="FoundersCrowd Logo" className="w-10 h-10 rounded-2xl object-cover" />
              <span className="text-2xl font-semibold text-gray-900">FoundersCrowd</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              The modern fundraising platform that connects founders with investors 
              through streamlined technology and compliance tools.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaTwitter className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaDiscord className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaLinkedin className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaReddit className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-6 text-sm">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Fundraising
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Investor Network
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-6 text-sm">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-6 text-sm">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 FoundersCrowd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm">
                Status
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm">
                Changelog
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;