import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import BlogCTA from "@/components/BlogCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  stripHtml,
  type BlogPost,
} from "@/lib/beehiiv";
import "./blog-post.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string, locale = "en-US") {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function createSlug(text: string) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return slug || "section";
}

function addClassAttribute(attrs: string, className: string) {
  if (/\sclass=(["'])(.*?)\1/i.test(attrs)) {
    return attrs.replace(
      /\sclass=(["'])(.*?)\1/i,
      (_match, quote: string, classes: string) => ` class=${quote}${classes} ${className}${quote}`
    );
  }

  return `${attrs} class="${className}"`;
}

function withHeadingAnchors(html: string) {
  const counts = new Map<string, number>();

  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level: string, attrs: string, content: string) => {
    const text = stripHtml(content);
    if (!text) return match;

    const baseId = createSlug(text);
    const count = counts.get(baseId) ?? 0;
    counts.set(baseId, count + 1);

    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    const className = level === "2" ? "content-heading-2" : "content-heading-3";
    const withoutId = attrs.replace(/\s+id=(["']).*?\1/gi, "");
    const withClass = addClassAttribute(withoutId, className);

    return `<h${level}${withClass} id="${id}">${content}</h${level}>`;
  });
}

function extractToc(html: string): { level: 2 | 3; id: string; text: string }[] {
  const toc: { level: 2 | 3; id: string; text: string }[] = [];
  const headings = html.matchAll(/<h([23])[^>]*id=(["'])(.*?)\2[^>]*>([\s\S]*?)<\/h\1>/gi);

  for (const heading of headings) {
    toc.push({
      level: heading[1] === "2" ? 2 : 3,
      id: heading[3],
      text: stripHtml(heading[4]),
    });
  }

  return toc;
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://spacefunding.com").replace(/\/$/, "");
}

function postImage(post: BlogPost) {
  return post.thumbnailUrl || "/paralax.jpg";
}

function shouldBypassImageOptimizer(src: string) {
  return src.includes("beehiiv-images-production.s3.amazonaws.com");
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch((error) => {
    console.error("Failed to fetch beehiiv post metadata:", error);
    return null;
  });

  if (!post) return { title: "Post Not Found | Space Funding" };

  const description = post.metaDescription || post.excerpt;
  const image = post.thumbnailUrl ? [post.thumbnailUrl] : [];

  return {
    title: `${post.metaTitle || post.title} | Space Funding Blog`,
    description,
    openGraph: {
      title: post.metaTitle || post.title,
      description,
      images: image,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.authors,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description,
      images: image,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch((error) => {
    console.error("Failed to fetch beehiiv post:", error);
    return null;
  });

  if (!post) notFound();

  const contentWithAnchors = withHeadingAnchors(post.contentHtml);
  const toc = extractToc(contentWithAnchors);
  const related = await getRelatedBlogPosts(post.id).catch((error) => {
    console.error("Failed to fetch related beehiiv posts:", error);
    return [];
  });

  const date = formatDate(post.publishedAt, "en-US");
  const postUrl = `${getSiteUrl()}/blog/${post.slug}`;
  const authorLine = post.authors.join(", ");

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen font-figtree">
        <div className="bg-gradient-to-b from-gray-50 to-white pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-4xl">
              <div className="mt-14 mb-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-orange-600 transition-colors text-md font-bold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Blog
                </Link>
              </div>

              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-gray-900 mb-8 tracking-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 text-lg">
                  {date && <span className="font-semibold">{date}</span>}
                  {date && <span className="w-1 h-1 bg-gray-400 rounded-full" />}
                  <span className="font-semibold">{post.readingTime}</span>
                  {authorLine && (
                    <>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="font-semibold">{authorLine}</span>
                    </>
                  )}
                </div>
              </div>

              {post.thumbnailUrl && (
                <div className="mb-12">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src={post.thumbnailUrl}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="100vw"
                      unoptimized={shouldBypassImageOptimizer(post.thumbnailUrl)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            <article className="max-w-4xl">
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentWithAnchors }} />

              <div className="mt-20 pt-12 border-t-2 border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Share this article</h3>
                    <p className="text-gray-600">Help others discover great content</p>
                  </div>
                  <ShareButtons url={postUrl} title={post.title} />
                </div>
              </div>
            </article>

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

        <BlogCTA />

        {related.length > 0 && (
          <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Continue Reading</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover more insights to help you build and scale your startup
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => {
                  const postDate = formatDate(item.publishedAt, "en-US");

                  return (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug}`}
                      className="group block bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={postImage(item)}
                          alt={item.title}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                          unoptimized={shouldBypassImageOptimizer(postImage(item))}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 group-hover:bg-gray-50 transition-colors duration-300">
                        {postDate && (
                          <div className="text-sm font-semibold text-amber-600 mb-3 uppercase tracking-wide group-hover:text-orange-600 transition-colors duration-300">
                            {postDate}
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-700 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center text-amber-600 font-bold text-lg group-hover:text-orange-600 group-hover:gap-3 transition-all duration-300">
                          Read More
                          <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
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
                  className="inline-flex items-center gap-3 px-10 py-5 bg-amber-600 hover:bg-orange-700 text-white text-xl font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

        <div className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get the latest updates</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Sign up for our monthly newsletter so you don't miss a thing.
            </p>

            <NewsletterSignup />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
