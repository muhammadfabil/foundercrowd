import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-20 font-figtree">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="FoundersCrowd Logo" className="w-10 h-10 rounded-2xl object-cover" />
              <span className="text-2xl font-semibold text-gray-900">Founderscrowd</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              The modern fundraising platform that connects founders with investors 
              through streamlined technology and compliance tools.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* X (Twitter) */}
              <a 
                href="https://x.com/ninjamagno" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/founderscrowd/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaInstagram className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/founderscrowd/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaLinkedin className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </a>
              
              {/* Beehiiv */}
              <a 
                href="https://founderscrowd.beehiiv.com/subscribe" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Companies Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-6 text-sm">
              Companies
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/our-story" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/why-founderscrowd" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Why Founderscrowd
                </a>
              </li>
              <li>
                <a href="/sports" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Sports
                </a>
              </li>
              <li>
                <a href="/our-tech" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Our Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Investors Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-6 text-sm">
              Investors
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/vip-program" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Join our VIP program
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
                <a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Founderscrowd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/status" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm">
                Status
              </a>
              <a href="/changelog" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm">
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