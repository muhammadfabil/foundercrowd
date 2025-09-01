"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type WPPost = {
  id: number;
  slug: string;
  date_gmt: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
  };
};

const SITE = "fcblog5.wordpress.com";
const API = `https://public-api.wordpress.com/wp/v2/sites/${SITE}`;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function getFeaturedImage(p: WPPost) {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
  
  // Prioritize sizes: medium_large > large > medium > full
  const pick =
    (sizes?.medium_large ?? sizes?.large ?? sizes?.medium ?? sizes?.full) as
      | { source_url: string; width: number; height: number }
      | undefined;

  const src = pick?.source_url ?? media?.source_url;
  
  return {
    src: src || null,
    alt: media?.alt_text || stripHtml(p.title.rendered),
    width: pick?.width ?? 1200,
    height: pick?.height ?? 630,
  };
}

async function fetchPosts(page: number = 1, perPage: number = 6): Promise<{ posts: WPPost[], totalPages: number }> {
  const url =
    `${API}/posts` +
    `?per_page=${perPage}&page=${page}&_embed` +
    `&_fields=id,slug,date_gmt,link,title,excerpt,_embedded`;
  
  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) throw new Error(`WP API error ${res.status}`);
  
  // Get total pages from headers
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
  
  const posts = await res.json();
  
  return { posts, totalPages };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [featuredPost, setFeaturedPost] = useState<WPPost | null>(null);
  const [categories] = useState([
    "All", "Fundraising", "Growth", "Investing", "Tech"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const { posts: result, totalPages: total } = await fetchPosts(page);
        setPosts(result);
        setTotalPages(total);
        
        // Set the first post as featured if first page and has posts
        if (page === 1 && result.length > 0) {
          setFeaturedPost(result[0]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    // In a real implementation, you'd filter by category in the API call
  };

  const renderPagination = () => {
    // Only show pagination if there are more than 6 posts total or current page has posts
    if (totalPages <= 1 || posts.length === 0) return null;
    
    const pages = [];
    const maxButtons = 3;
    
    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-md flex items-center justify-center ${
            page === i 
              ? "bg-orange-500 text-white" 
              : "bg-white text-black hover:bg-gray-100"
          } transition-all duration-300`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-10 h-10 rounded-md flex items-center justify-center bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {pages}
        
        <button
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-10 h-10 rounded-md flex items-center justify-center bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#0F0F0F] text-white font-figtree">
        {/* Hero Section */}
        <div className="pt-24 bg-gradient-to-b from-black to-[#0F0F0F]">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              FoundersCrowd <span className="text-orange-500">Journal</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl">
              Insights, strategies, and stories to help founders build remarkable companies.
            </p>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-24">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-12 py-4 border-b border-gray-800">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-orange-500 text-white" 
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post (First Page Only) */}
          {page === 1 && featuredPost && (
            <div className="mb-16">
              <div className="group grid md:grid-cols-5 gap-8 bg-black rounded-3xl p-4 md:p-8 hover:bg-[#1A1A1A] transition-all duration-300">
                <div className="md:col-span-3 relative aspect-[16/9] md:aspect-auto w-full overflow-hidden rounded-xl">
                  {getFeaturedImage(featuredPost).src ? (
                    <Image
                      src={getFeaturedImage(featuredPost).src!}
                      alt={getFeaturedImage(featuredPost).alt}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={true}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v6H8V8zm2 2v2h4v-2h-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2 flex flex-col justify-center">
                  <span className="text-orange-500 text-sm mb-2">Featured</span>
                  <h2
                    className="text-2xl md:text-3xl font-semibold mb-4 leading-tight"
                    dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                  />
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {stripHtml(featuredPost.excerpt.rendered).slice(0, 180) + "…"}
                  </p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-orange-500 font-medium text-sm group-hover:gap-2 transition-all duration-300"
                  >
                    Read article
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
            </div>
          )}

          {/* Posts Grid - Skip first post on page 1 */}
          {!loading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts
                .slice(page === 1 && featuredPost ? 1 : 0)
                .map((p) => {
                  const img = getFeaturedImage(p);
                  const excerpt = stripHtml(p.excerpt.rendered).slice(0, 120) + 
                    (stripHtml(p.excerpt.rendered).length > 120 ? "…" : "");
                  const date = new Date(p.date_gmt + "Z").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  });

                  return (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className="group block bg-black rounded-3xl overflow-hidden hover:bg-[#1A1A1A] transition-all duration-300"
                    >
                      {/* Featured Image */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        {img.src ? (
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={false}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v6H8V8zm2 2v2h4v-2h-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Date */}
                        <div className="text-sm text-gray-500 mb-3">
                          {date}
                        </div>

                        {/* Title */}
                        <h3
                          className="text-xl font-semibold text-white mb-3 leading-tight line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                        />

                        {/* Excerpt */}
                        <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center text-orange-500 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                          Read article
                          <svg
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}

          {/* Pagination - Only show when needed */}
          {!loading && renderPagination() && (
            <div className="mt-16">
              {renderPagination()}
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="mt-24 bg-gradient-to-r from-black to-[#1A1A1A] rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Subscribe to our <span className="text-orange-500">newsletter</span>
              </h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Get the latest insights on fundraising, growth strategies, and startup resources delivered straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#0F0F0F] border border-gray-800 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full px-8 py-3 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
