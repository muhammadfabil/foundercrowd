// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Metadata } from "next";
import { notFound } from "next/navigation";

// Extract constants for better performance
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

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

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImage(post);
  const date = new Date(post.date_gmt + "Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const categories = post._embedded?.["wp:term"]?.[0]?.filter(term => term.taxonomy === 'category') || [];
  const relatedPosts = await fetchRelatedPosts(post.id);
  
  return (
    <>
      <Navbar />
      <div className="bg-white text-[#2B2B2B] min-h-screen font-figtree">
        {/* ✅ REVAMPED: Clean header section tanpa background image */}
        <div className="pt-20 pb-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Back to blog link */}
            <div className="mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
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

            {/* ✅ REVAMPED: WordPress-style title dan meta */}
            <div className="mb-8">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B2B2B] leading-tight mb-6" 
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              
              {/* Meta information */}
              <div className="flex items-center gap-6 text-gray-600 text-lg mb-8">
                <span className="font-medium">{date}</span>
                {categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    {categories.map(category => (
                      <span 
                        key={category.slug} 
                        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ✅ REVAMPED: Featured image setelah title */}
            {featuredImage.src && (
              <div className="mb-12">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
          
        {/* ✅ REVAMPED: WordPress-style content dengan typography yang lebih besar */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
          <article className="prose prose-xl max-w-none
            prose-headings:text-[#2B2B2B] prose-headings:font-bold prose-headings:leading-tight
            prose-h1:text-6xl prose-h1:mb-8 prose-h1:mt-12
            prose-h2:text-5xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:font-bold
            prose-h3:text-4xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:font-bold
            prose-h4:text-3xl prose-h4:mb-4 prose-h4:mt-6 prose-h4:font-bold
            prose-p:text-xl prose-p:leading-relaxed prose-p:text-gray-700 prose-p:mb-8
            prose-li:text-xl prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-2
            prose-ul:mb-8 prose-ol:mb-8 prose-ul:mt-4 prose-ol:mt-4
            prose-strong:text-[#2B2B2B] prose-strong:font-bold
            prose-em:text-gray-800 prose-em:italic
            prose-blockquote:text-2xl prose-blockquote:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:font-medium prose-blockquote:italic
            prose-a:text-orange-500 prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:text-orange-600
            prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-lg
            prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:p-6 prose-pre:mb-8
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:mb-8
            prose-hr:border-gray-200 prose-hr:my-12
            prose-table:border-gray-200 prose-table:mb-8
            prose-th:bg-gray-100 prose-th:text-gray-800 prose-th:font-bold prose-th:p-4
            prose-td:text-gray-700 prose-td:p-4 prose-td:border-gray-200"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </article>
            
          {/* ✅ REVAMPED: Share section dengan styling yang lebih clean */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-800">Share this article</div>
              <div className="flex items-center gap-4">
                <button 
                  aria-label="Share on X" 
                  className="w-12 h-12 bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button 
                  aria-label="Share on LinkedIn" 
                  className="w-12 h-12 bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </button>
                <button 
                  aria-label="Copy link" 
                  className="w-12 h-12 bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
          
        {/* ✅ REVAMPED: Related posts dengan styling yang match */}
        {relatedPosts.length > 0 && (
          <div className="bg-[#F8F9FA] py-20">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#2B2B2B]">Related Articles</h2>
                
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
                      className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
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
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v6H8V8zm2 2v2h4v-2h-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        {/* Date */}
                        <div className="text-sm text-gray-500 mb-3 font-medium">
                          {postDate}
                        </div>

                        {/* Title */}
                        <h3
                          className="text-2xl font-bold text-[#2B2B2B] mb-4 leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                        />

                        {/* Excerpt */}
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center text-orange-500 font-semibold text-lg group-hover:gap-2 transition-all duration-300">
                          Read article
                          <svg
                            className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
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
                
              <div className="mt-16 text-center">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View all articles
                  <svg
                    className="w-5 h-5"
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
      <Footer />
    </>
  );
}