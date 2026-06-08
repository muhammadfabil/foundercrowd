import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getBlogPosts, type BlogPost } from "@/lib/beehiiv";

export const metadata: Metadata = {
  title: "Space Funding Journal | Startup Funding Insights",
  description:
    "Insights, strategies, and stories from Space Funding to help founders raise capital and build remarkable companies.",
};

const FIRST_PAGE_POSTS = 7;
const GRID_POSTS_PER_PAGE = 6;

const trustedInvestorLinks = [
  {
    name: "Sequoia",
    href: "https://sequoiacap.com/",
    logo: "/blog-logos/sequoia.svg",
    width: 180,
    height: 24,
    className: "h-6 w-auto md:h-7",
  },
  {
    name: "a16z",
    href: "https://a16z.com/",
    logo: "/blog-logos/a16z.svg",
    width: 263,
    height: 30,
    className: "h-6 w-auto md:h-7",
  },
  {
    name: "Founders Fund",
    href: "https://foundersfund.com/",
    logo: "/blog-logos/founders-fund.svg",
    width: 243,
    height: 39,
    className: "h-6 w-auto md:h-7",
  },
  {
    name: "Y Combinator",
    href: "https://www.ycombinator.com/",
    logo: "/blog-logos/y-combinator.svg",
    width: 24,
    height: 24,
    className: "h-7 w-auto md:h-8",
  },
  {
    name: "Techstars",
    href: "https://www.techstars.com/",
    logo: "/blog-logos/techstars.png",
    width: 522,
    height: 93,
    className: "h-6 w-auto md:h-7",
  },
];

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(page?: string) {
  const parsed = Number(page);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function pageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog?page=${page}`;
}

function getDisplayTotalPages(totalResults: number) {
  if (totalResults <= FIRST_PAGE_POSTS) return 1;

  return 1 + Math.ceil((totalResults - FIRST_PAGE_POSTS) / GRID_POSTS_PER_PAGE);
}

async function getDisplayPosts(page: number) {
  if (page === 1) {
    const result = await getBlogPosts(1, FIRST_PAGE_POSTS);

    return {
      posts: result.posts,
      totalPages: getDisplayTotalPages(result.totalResults),
    };
  }

  // Page 1 displays one extra post as the featured article. Later pages keep
  // six cards and skip the one-post overlap caused by Beehiiv page/limit paging.
  const [currentResult, nextResult] = await Promise.all([
    getBlogPosts(page, GRID_POSTS_PER_PAGE),
    getBlogPosts(page + 1, GRID_POSTS_PER_PAGE),
  ]);

  return {
    posts: [...currentResult.posts, ...nextResult.posts].slice(1, GRID_POSTS_PER_PAGE + 1),
    totalPages: getDisplayTotalPages(currentResult.totalResults),
  };
}

function BlogNewsletterHero() {
  return (
    <section className="hero-noise relative overflow-hidden bg-black px-4 pb-20 pt-32 text-white md:pb-24 md:pt-36">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="earth-video-bg absolute inset-0 z-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/EarthVideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/60" aria-hidden="true" />
      <div className="relative z-[2] mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
          Space Funding Journal
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          Learn something new about the private markets in{" "}
          <span className="text-[#5271ff]">5 minutes per week</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
          Get the latest private markets news, understand why it matters, and learn how to apply it in your work.
        </p>

        <div className="mt-10 w-full">
          <NewsletterSignup variant="blogHero" />
        </div>

        <div className="mt-14 w-full">
          <p className="text-sm font-semibold text-white/70">
            Join over 20,000+ founders who have raised from:
          </p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-10">
            {trustedInvestorLinks.map((investor) => (
              <a
                key={investor.name}
                href={investor.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={investor.name}
                className="flex h-12 min-w-[112px] items-center justify-center text-white/70 opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                <img
                  src={investor.logo}
                  alt={investor.name}
                  width={investor.width}
                  height={investor.height}
                  className={`${investor.className} max-w-[150px] object-contain brightness-0 invert`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function shouldBypassImageOptimizer(src: string) {
  return src.includes("beehiiv-images-production.s3.amazonaws.com");
}

function ImageFallback() {
  return (
    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v6H8V8zm2 2v2h4v-2h-4z" />
      </svg>
    </div>
  );
}

function PostImage({
  post,
  priority = false,
  sizes,
}: {
  post: BlogPost;
  priority?: boolean;
  sizes: string;
}) {
  if (!post.thumbnailUrl) return <ImageFallback />;

  return (
    <Image
      src={post.thumbnailUrl}
      alt={post.title}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      priority={priority}
      unoptimized={shouldBypassImageOptimizer(post.thumbnailUrl)}
    />
  );
}

function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const maxButtons = 3;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={pageHref(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`w-10 h-10 rounded-md flex items-center justify-center bg-gray-100 text-[#2B2B2B] hover:bg-gray-200 transition-all duration-300 ${
          page === 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {pages.map((item) => (
        <Link
          key={item}
          href={pageHref(item)}
          className={`w-10 h-10 rounded-md flex items-center justify-center ${
            page === item
              ? "bg-[#5271ff] text-white"
              : "bg-gray-100 text-[#2B2B2B] hover:bg-gray-200"
          } transition-all duration-300`}
        >
          {item}
        </Link>
      ))}

      <Link
        href={pageHref(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`w-10 h-10 rounded-md flex items-center justify-center bg-gray-100 text-[#2B2B2B] hover:bg-gray-200 transition-all duration-300 ${
          page === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const date = formatDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-gray-50 rounded-3xl overflow-hidden hover:bg-gray-100 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <PostImage
          post={post}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="p-6">
        {date && <div className="text-sm text-gray-400 mb-3">{date}</div>}

        <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3 leading-tight line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-500 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

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
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parsePage(params?.page);

  let posts: BlogPost[] = [];
  let totalPages = 1;
  let loadError = false;

  try {
    const result = await getDisplayPosts(page);
    posts = result.posts;
    totalPages = result.totalPages;
  } catch (error) {
    loadError = true;
    console.error("Failed to fetch beehiiv posts:", error);
  }

  const featuredPost = page === 1 ? posts[0] : null;
  const gridPosts = page === 1 && featuredPost ? posts.slice(1) : posts;

  return (
    <>
      <Navbar />
      <div className="bg-white text-[#2B2B2B] font-figtree">
        <BlogNewsletterHero />

        <main className="max-w-6xl mx-auto px-4 pb-24 pt-20">
          {featuredPost && (
            <div className="mb-16">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group grid md:grid-cols-5 gap-8 bg-gray-50 rounded-3xl p-4 md:p-8 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="md:col-span-3 relative aspect-[16/9] md:aspect-auto w-full overflow-hidden rounded-xl">
                  <PostImage
                    post={featuredPost}
                    priority
                    sizes="(min-width: 768px) 60vw, 100vw"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col justify-center">
                  <span className="text-orange-500 text-sm mb-2">Featured</span>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight text-[#2B2B2B]">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-500 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="inline-flex items-center text-orange-500 font-medium text-sm group-hover:gap-2 transition-all duration-300">
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
            </div>
          )}

          {loadError && (
            <div className="py-24 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Articles are temporarily unavailable</h2>
              <p className="text-gray-500">Please check the beehiiv API configuration and try again.</p>
            </div>
          )}

          {!loadError && posts.length === 0 && (
            <div className="py-24 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h2>
              <p className="text-gray-500">Published beehiiv posts will appear here automatically.</p>
            </div>
          )}

          {gridPosts.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {!loadError && (
            <div className="mt-16">
              <Pagination page={page} totalPages={totalPages} />
            </div>
          )}

        </main>
      </div>
      <Footer />
    </>
  );
}
