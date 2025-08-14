import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#AC5B0F]">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h2>
          <p className="text-slate-600 mb-8">
            Sorry, the blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            style={{ 
              backgroundColor: "#AC5B0F",
              color: "white"
            }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}