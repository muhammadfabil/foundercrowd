import { cache } from "react";
import { VIMEO_TESTIMONIALS, type VimeoTestimonial } from "@/data/vimeoTestimonials";

type VimeoOEmbedResponse = {
  title?: string;
  video_id?: number;
  thumbnail_url?: string;
};

const VIMEO_TITLE_TIMEOUT_MS = 1200;

function normalizeTitle(title: string) {
  return title.replace(/\s+/g, " ").trim();
}

function resolveDisplayTitle(fetchedTitle: string | undefined, fallbackTitle: string) {
  if (!fetchedTitle) return fallbackTitle;

  const fetched = normalizeTitle(fetchedTitle);
  const fallback = normalizeTitle(fallbackTitle);

  if (!fetched) return fallback;

  const fetchedHasCompany = fetched.includes("|");
  const fallbackHasCompany = fallback.includes("|");

  if (!fetchedHasCompany && fallbackHasCompany) {
    return fallback;
  }

  if (
    !fetchedHasCompany &&
    fallback.length > fetched.length &&
    fallback.toLowerCase().startsWith(fetched.toLowerCase())
  ) {
    return fallback;
  }

  return fetched;
}

async function getVimeoTitle(testimonial: VimeoTestimonial) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VIMEO_TITLE_TIMEOUT_MS);

  try {
    const url = new URL("https://vimeo.com/api/oembed.json");
    url.searchParams.set("url", testimonial.url);

    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
      signal: controller.signal,
    });

    if (!res.ok) {
      return {
        title: testimonial.title,
        thumbnailUrl: testimonial.thumbnailUrl,
      };
    }

    const data = (await res.json()) as VimeoOEmbedResponse;
    return {
      title: resolveDisplayTitle(data.title, testimonial.title),
      thumbnailUrl: data.thumbnail_url,
    };
  } catch {
    return {
      title: testimonial.title,
      thumbnailUrl: testimonial.thumbnailUrl,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export const getVimeoTestimonials = cache(async function getVimeoTestimonials() {
  return Promise.all(
    VIMEO_TESTIMONIALS.map(async (testimonial) => {
      const metadata = await getVimeoTitle(testimonial);

      return {
        ...testimonial,
        ...metadata,
      };
    })
  );
});
