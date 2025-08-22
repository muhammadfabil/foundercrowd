// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | FoundersCrowd",
  description: "Insights, updates, and stories about fundraising & growth."
};

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

export const revalidate = 60;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function getFeaturedImage(p: WPPost) {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
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

async function fetchPosts(): Promise<WPPost[]> {
  const url =
    `${API}/posts` +
    `?per_page=9&page=1&_embed` +
    `&_fields=id,slug,date_gmt,link,title,excerpt,_embedded`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WP API error ${res.status}`);
  return res.json();
}

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-[#2B2B2B] font-figtree">
        <main className="mx-auto max-w-6xl px-4 py-20">
          {/* Header */}
          <header className="mb-20 text-center">
            <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
              Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Insights, updates, and stories about fundraising, investment banking, and startup growth.
            </p>
          </header>

          {/* Posts Grid */}
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
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
                  className="group block overflow-hidden rounded-3xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Featured Image */}
                  <div className="relative aspect-[16/9] w-full bg-gray-50 overflow-hidden">
                    {img.src ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={false}
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
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
                      className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-orange-500 transition-colors duration-300 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                    />

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
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
          </section>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
              Load More Articles
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
