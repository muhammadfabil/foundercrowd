// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
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
  
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-white min-h-screen font-figtree">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Back navigation */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors duration-200"
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
          
          {/* Article header */}
          <header className="mb-12">
            <div className="text-sm text-gray-500 mb-4">
              {date}
            </div>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight" 
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </header>

          {/* Featured image */}
          {featuredImage.src && (
            <div className="relative aspect-[16/9] w-full mb-12 rounded-2xl overflow-hidden">
              <Image
                src={featuredImage.src}
                alt={featuredImage.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}
          
          {/* Article content */}
          <article className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-medium
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-blockquote:text-gray-600 prose-blockquote:border-orange-500
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
            prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
            prose-img:rounded-xl prose-img:shadow-sm
            prose-hr:border-gray-200
            prose-table:border-gray-200
            prose-th:bg-gray-50 prose-th:text-gray-900
            prose-td:text-gray-700"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </article>
          
          {/* Bottom navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/blog" 
              className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              ← More Articles
            </Link>
            
            <BackToTopButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}