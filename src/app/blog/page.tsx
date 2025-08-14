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
const PRIMARY = "#AC5B0F";

export const revalidate = 60;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function getFeaturedImage(p: WPPost) {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  // Pilih ukuran yang lebih ringan jika ada, fallback ke source_url
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
    `?per_page=9&page=1&_embed` + // _embed untuk ambil featured image sekaligus
    `&_fields=id,slug,date_gmt,link,title,excerpt,_embedded`; // ringkas
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WP API error ${res.status}`);
  return res.json();
}

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-[#AC5B0F]">
        <main className="mx-auto max-w-6xl px-4 py-12 text-white">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              FoundersCrowd Blog
            </h1>
            <p className="text-white mt-4 max-w-2xl mx-auto">
              Insights, updates, and stories about fundraising, investment banking, and startup growth.
            </p>
          </header>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const img = getFeaturedImage(p);
              const excerpt = stripHtml(p.excerpt.rendered).slice(0, 140) + (p.excerpt.rendered.length > 140 ? "…" : "");
              const date = new Date(p.date_gmt + "Z").toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              });

              return (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg focus:outline-none"
                  style={{ borderColor: `${PRIMARY}25` }}
                >
                  <div className="relative aspect-[16/9] w-full bg-slate-100">
                    {img.src ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                      />
                    ) : (
                      <div className="h-full w-full" style={{ backgroundColor: "#F7E9DC" }} />
                    )}
                    <div 
                      className="pointer-events-none absolute inset-0 transition group-hover:ring-4"
                      style={{ 
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)"
                      }} 
                    />
                  </div>

                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wide" style={{ color: `${PRIMARY}99` }}>{date}</div>
                    <h3
                      className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-[#AC5B0F]"
                      dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                    />
                    <p className="mt-3 line-clamp-3 text-sm font-normal text-slate-800">
                      {stripHtml(p.excerpt.rendered)}
                    </p>

                    <div 
                      className="mt-4 inline-flex items-center text-sm font-medium"
                      style={{ color: PRIMARY }}
                    >
                      Read article
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
