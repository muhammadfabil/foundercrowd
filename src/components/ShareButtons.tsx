"use client";

import React from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && "clipboard" in navigator) {
      navigator.clipboard.writeText(url);
      // You could add a toast notification here
    }
  };

  return (
    <div className="flex items-center gap-4">
      <a
        href={`https://twitter.com/intent/tweet?${new URLSearchParams({
          text: title,
          url: url,
        }).toString()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gray-900 hover:bg-orange-600 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Share on X"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({
          url: url,
        }).toString()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-orange-600 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      </a>
      
      <button
        onClick={handleCopyLink}
        className="w-14 h-14 rounded-full bg-gray-600 hover:bg-orange-600 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Copy link"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
      </button>
    </div>
  );
};

export default ShareButtons;