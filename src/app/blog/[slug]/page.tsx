// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE = "fcblog5.wordpress.com";
const API = `https://public-api.wordpress.com/wp/v2/sites/${SITE}`;

type WPPost = {
  id: number;
  slug: string;
  date_gmt: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
    ["wp:term"]?: Array<Array<{
      taxonomy: string;
      name: string;
      slug: string;
    }>>;
  };
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function getFeaturedImage(p: WPPost) {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
  const pick =
    (sizes?.large ?? sizes?.medium_large ?? sizes?.full) as
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | FoundersCrowd",
    };
  }

  return {
    title: `${stripHtml(post.title.rendered)} | FoundersCrowd Blog`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    openGraph: {
      title: stripHtml(post.title.rendered),
      description: stripHtml(post.excerpt.rendered).slice(0, 160),
      images: getFeaturedImage(post).src ? [getFeaturedImage(post).src as string] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: stripHtml(post.title.rendered),
      description: stripHtml(post.excerpt.rendered).slice(0, 160),
      images: getFeaturedImage(post).src ? [getFeaturedImage(post).src].filter((src): src is string => src !== null) : [],
    },
  };
}

async function fetchPost(slug: string): Promise<WPPost | null> {
  const url = `${API}/posts?slug=${slug}&_embed`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`WP API error ${res.status}`);
    
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Function to get related posts - placeholder implementation
async function fetchRelatedPosts(currentPostId: number): Promise<WPPost[]> {
  const url = `${API}/posts?exclude=${currentPostId}&_embed&per_page=3`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`WP API error ${res.status}`);
    
    return res.json();
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImage(post);
  const date = new Date(post.date_gmt + "Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Get categories from the post if available
  const categories = post._embedded?.["wp:term"]?.[0]?.filter(term => term.taxonomy === 'category') || [];
  
  // Get related posts
  const relatedPosts = await fetchRelatedPosts(post.id);
  
  return (
    <>
      <Navbar />
      <div className="bg-[#0F0F0F] text-white min-h-screen font-figtree">
        <div className="pt-24">
          {/* Hero/Header with full-width image */}
          <div className="relative">
            {/* Featured image as background */}
            {featuredImage.src ? (
              <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#0F0F0F] z-10" />
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  priority
                  className="object-cover opacity-60"
                  sizes="100vw"
                />
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
                    <div className="mb-6">
                      <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                      </Link>
                    </div>
                    <h1 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" 
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div className="flex items-center gap-6 text-gray-300 text-sm">
                      <span>{date}</span>
                      {categories.length > 0 && (
                        <div className="flex items-center gap-2">
                          {categories.map(category => (
                            <span 
                              key={category.slug} 
                              className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-b from-black to-[#0F0F0F] py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                  <div className="mb-6">
                    <Link 
                      href="/blog" 
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back to Blog
                    </Link>
                  </div>
                  <h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div className="flex items-center gap-6 text-gray-300 text-sm">
                    <span>{date}</span>
                    {categories.length > 0 && (
                      <div className="flex items-center gap-2">
                        {categories.map(category => (
                          <span 
                            key={category.slug} 
                            className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Article content */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            <article className="prose prose-lg max-w-none
              prose-headings:text-white prose-headings:font-medium
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-li:text-gray-300
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:text-gray-400 prose-blockquote:border-orange-500
              prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-gray-100 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-img:rounded-xl
              prose-hr:border-gray-800
              prose-table:border-gray-800
              prose-th:bg-gray-900 prose-th:text-gray-200
              prose-td:text-gray-300"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </article>
            
            {/* Article footer */}
            <div className="mt-16 pt-8 border-t border-gray-800">
              {/* Share buttons */}
              <div className="flex items-center justify-between mb-12">
                <div className="font-medium">Share this article</div>
                <div className="flex items-center gap-3">
                  <button aria-label="Share on Twitter" className="w-10 h-10 bg-[#1A1A1A] hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </button>
                  <button aria-label="Share on LinkedIn" className="w-10 h-10 bg-[#1A1A1A] hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                    </svg>
                  </button>
                  <button aria-label="Copy link" className="w-10 h-10 bg-[#1A1A1A] hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 rounded-full flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 11v3m4-3v3m4-3v3M5 5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-black py-16">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">Related Articles</h2>
                
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((p) => {
                    const img = getFeaturedImage(p);
                    const excerpt = stripHtml(p.excerpt.rendered).slice(0, 120) + 
                      (stripHtml(p.excerpt.rendered).length > 120 ? "…" : "");
                    const postDate = new Date(p.date_gmt + "Z").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    });

                    return (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="group block bg-[#0F0F0F] rounded-3xl overflow-hidden hover:bg-[#1A1A1A] transition-all duration-300"
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
                              <svg className="w-12 h-12 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v6H8V8zm2 2v2h4v-2h-4z"/>
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Date */}
                          <div className="text-sm text-gray-500 mb-3">
                            {postDate}
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
                
                <div className="mt-12 text-center">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A1A1A] hover:bg-orange-500 text-white rounded-full transition-colors duration-300"
                  >
                    View all articles
                    <svg
                      className="w-4 h-4"
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
          
          
        </div>
      </div>
      <Footer />
    </>
  );
}