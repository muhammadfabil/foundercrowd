// app/blog/[slug]/page.tsx (Server Component - Remove 'use client')
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import BlogCTA from "@/components/BlogCTA";
import { notFound } from "next/navigation";
import "./blog-post.css";

// ------- Config
const SITE = "fcblog5.wordpress.com";
const API = `https://public-api.wordpress.com/wp/v2/sites/${SITE}`;
const REVALIDATE_SECONDS = 1800;

// ------- Types
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
  };
};

// ------- Enhanced Utils
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function decodeHtmlEntities(text: string) {
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#8217;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
  };
  
  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

function toDateString(date_gmt: string, locale = "en-US") {
  try {
    return new Date(date_gmt + "Z").toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date_gmt;
  }
}

function calcReadingTime(html: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ------- Enhanced Content Processing
function processWordPressContent(html: string): string {
  let processed = html;

  processed = decodeHtmlEntities(processed);
  processed = processed.replace(/<!-- wp:[\s\S]*? -->/g, '');
  processed = processed.replace(/<!-- \/wp:[\s\S]*? -->/g, '');

  processed = processed.replace(
    /<hr class="wp-block-separator[^"]*"[^>]*>/g,
    '<div class="separator-block"></div>'
  );

  processed = processed.replace(
    /<h2 class="wp-block-heading"><strong>(.*?)<\/strong><\/h2>/g,
    '<h2 class="content-heading-2">$1</h2>'
  );

  processed = processed.replace(
    /<h3 class="wp-block-heading"><strong>(.*?)<\/strong><\/h3>/g,
    '<h3 class="content-heading-3">$1</h3>'
  );

  processed = processed.replace(
    /<ul class="wp-block-list">/g,
    '<ul class="content-list">'
  );

  processed = processed.replace(/<li>([\s\S]*?)<br><\/li>/g, '<li>$1</li>');
  processed = processed.replace(/<p>/g, '<p class="content-paragraph">');
  processed = processed.replace(/<strong>(.*?)<\/strong>/g, '<span class="content-bold">$1</span>');
  processed = processed.replace(/<em>(.*?)<\/em>/g, '<span class="content-italic">$1</span>');

  return processed;
}

function withHeadingAnchors(html: string) {
  return html
    .replace(/<h2 class="content-heading-2">(.*?)<\/h2>/gi, (_m, g1) => {
      const text = stripHtml(g1);
      const id = createSlug(text);
      return `<h2 id="${id}" class="content-heading-2">${g1}</h2>`;
    })
    .replace(/<h3 class="content-heading-3">(.*?)<\/h3>/gi, (_m, g1) => {
      const text = stripHtml(g1);
      const id = createSlug(text);
      return `<h3 id="${id}" class="content-heading-3">${g1}</h3>`;
    });
}

function extractToc(html: string): { level: 2 | 3; id: string; text: string }[] {
  const toc: { level: 2 | 3; id: string; text: string }[] = [];
  const h2 = [...html.matchAll(/<h2[^>]*class="content-heading-2"[^>]*>(.*?)<\/h2>/gi)];
  const h3 = [...html.matchAll(/<h3[^>]*class="content-heading-3"[^>]*>(.*?)<\/h3>/gi)];

  h2.forEach((m) => {
    const text = stripHtml(m[1]);
    toc.push({ level: 2, id: createSlug(text), text });
  });
  h3.forEach((m) => {
    const text = stripHtml(m[1]);
    toc.push({ level: 3, id: createSlug(text), text });
  });
  return toc;
}

function getFeaturedImage(p: WPPost) {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
  const pick = (sizes?.large ?? sizes?.medium_large ?? sizes?.full) as
    | { source_url: string; width: number; height: number }
    | undefined;

  const src = pick?.source_url ?? media?.source_url ?? null;
  return {
    src,
    alt: media?.alt_text || stripHtml(p.title.rendered),
    width: pick?.width ?? 1200,
    height: pick?.height ?? 630,
  };
}

// ------- Data
async function fetchPost(slug: string): Promise<WPPost | null> {
  const url = `${API}/posts?slug=${slug}&_embed`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`WP API error ${res.status}`);
    const posts = (await res.json()) as WPPost[];
    return posts.length > 0 ? posts[0] : null;
  } catch (e) {
    console.error("Error fetching post:", e);
    return null;
  }
}

async function fetchRelatedPosts(currentPostId: number): Promise<WPPost[]> {
  const url = `${API}/posts?exclude=${currentPostId}&_embed&per_page=3`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`WP API error ${res.status}`);
    return (await res.json()) as WPPost[];
  } catch (e) {
    console.error("Error fetching related posts:", e);
    return [];
  }
}

// ------- SEO / Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Post Not Found | FoundersCrowd" };

  const title = decodeHtmlEntities(stripHtml(post.title.rendered));
  const desc = stripHtml(post.excerpt.rendered).slice(0, 160);
  const ogImg = getFeaturedImage(post).src;

  return {
    title: `${title} | FoundersCrowd Blog`,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: ogImg ? [ogImg] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: ogImg ? [ogImg] : [],
    },
  };
}

// ------- Page (Server Component)
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  const processedContent = processWordPressContent(post.content.rendered);
  const withAnchors = withHeadingAnchors(processedContent);
  const toc = extractToc(withAnchors);

  const featured = getFeaturedImage(post);
  const date = toDateString(post.date_gmt, "en-US");
  const readingTime = calcReadingTime(post.content.rendered);
  const related = await fetchRelatedPosts(post.id);

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.founderscrowd.com"}/blog/${post.slug}`;
  const cleanTitle = decodeHtmlEntities(stripHtml(post.title.rendered));

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen font-figtree">
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-gray-900 mb-8 tracking-tight">
                {cleanTitle}
              </h1>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 text-lg">
                <span className="font-semibold">{date}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="font-semibold">{readingTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            {featured.src && (
              <div className="mb-12">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
                  <Image 
                    src={featured.src} 
                    alt={featured.alt} 
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

        {/* Content + TOC Layout */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            {/* Main Content */}
            <article className="max-w-none">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: withAnchors }}
              />
              
              {/* Share Section */}
              <div className="mt-20 pt-12 border-t-2 border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Share this article</h3>
                    <p className="text-gray-600">Help others discover great content</p>
                  </div>
                  <ShareButtons url={postUrl} title={cleanTitle} />
                </div>
              </div>
            </article>

            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              {toc.length > 0 && (
                <div className="sticky top-28">
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Table of Contents</h3>
                    <nav className="space-y-3">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm font-medium hover:text-orange-600 transition-colors leading-relaxed ${
                            item.level === 3 
                              ? "pl-6 text-gray-600 border-l-2 border-gray-200" 
                              : "text-gray-800 font-semibold"
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* CTA Section - NEW */}
        <BlogCTA />

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Continue Reading</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover more insights to help you build and scale your startup
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => {
                  const img = getFeaturedImage(p);
                  const excerptRaw = stripHtml(p.excerpt.rendered);
                  const excerpt = excerptRaw.slice(0, 150) + (excerptRaw.length > 150 ? "…" : "");
                  const postDate = toDateString(p.date_gmt, "en-US");
                  const relatedTitle = decodeHtmlEntities(stripHtml(p.title.rendered));

                  return (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className="group block bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {img.src ? (
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                            <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="p-8">
                        <div className="text-sm font-semibold text-amber-600 mb-3 uppercase tracking-wide">
                          {postDate}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-700 transition-colors line-clamp-2">
                          {relatedTitle}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                          {excerpt}
                        </p>
                        <div className="flex items-center text-amber-600 font-bold text-lg group-hover:gap-3 transition-all">
                          Read More
                          <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
                  className="inline-flex items-center gap-3 px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore All Articles
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
