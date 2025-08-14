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
const PRIMARY = "#AC5B0F";

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

const wpContentStyle = `
  .wp-block-paragraph, 
  p, 
  li, 
  blockquote, 
  cite, 
  figcaption, 
  .wp-element-caption,
  .wp-block-quote {
    color: #1e293b; /* slate-800 */
  }
  
  .wp-block-heading h1, 
  .wp-block-heading h2, 
  .wp-block-heading h3, 
  .wp-block-heading h4, 
  .wp-block-heading h5, 
  .wp-block-heading h6 {
    color: #0f172a; /* slate-900 */
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1.5rem 0;
  }
  
  table td,
  table th {
    padding: 0.5rem;
    border: 1px solid #e2e8f0; /* slate-200 */
    color: #1e293b; /* slate-800 */
  }
  
  table th {
    background-color: #f8fafc; /* slate-50 */
  }
`;

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
  
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-[#AC5B0F] min-h-screen">
        <style dangerouslySetInnerHTML={{ __html: wpContentStyle }} />
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Top navigation */}
          <Link 
            href="/blog" 
            className="inline-flex items-center mb-6 text-sm font-medium text-white hover:text-white/80"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="mr-1 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
          
          {/* White content container */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Featured image banner */}
            {featuredImage.src && (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Article content */}
            <article className="p-6 md:p-8">
              <header className="mb-8">
                <h1 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-slate-900" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="text-sm text-slate-500">
                  Published on {date}
                </div>
              </header>
              
              <div 
                className="prose prose-slate max-w-none 
                  prose-headings:text-slate-900 
                  prose-p:text-slate-800 
                  prose-li:text-slate-800
                  prose-strong:text-slate-900
                  prose-ol:text-slate-800 
                  prose-ul:text-slate-800 
                  prose-blockquote:text-slate-700
                  prose-pre:bg-slate-50 prose-pre:text-slate-800
                  prose-code:text-slate-900
                  prose-a:text-[#AC5B0F] prose-a:no-underline hover:prose-a:underline 
                  prose-img:rounded-md"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
              
              <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{ 
                    backgroundColor: PRIMARY,
                    color: "white"
                  }}
                >
                  Browse more articles
                </Link>
                
                <BackToTopButton />
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}