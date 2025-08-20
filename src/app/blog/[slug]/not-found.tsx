import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen flex items-center justify-center bg-white font-figtree">
        <div className="text-center px-4 max-w-lg">
          {/* 404 Number */}
          <div className="text-8xl font-medium text-gray-200 mb-4">
            404
          </div>
          
          {/* Main heading */}
          <h2 className="text-3xl font-medium text-gray-900 mb-4">
            Article Not Found
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Sorry, the blog post you're looking for doesn't exist or has been moved.
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Back to Blog
            </Link>
            <Link
              href="/"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors duration-300"
            >
              Go Home
            </Link>
          </div>
          
          {/* Illustration/Icon */}
          <div className="mt-12">
            <svg 
              className="w-24 h-24 mx-auto text-gray-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth="1"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}