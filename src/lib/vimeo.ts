import { VIMEO_TESTIMONIALS, type VimeoTestimonial } from "@/data/vimeoTestimonials";

type VimeoOEmbedResponse = {
  title?: string;
  video_id?: number;
};

function normalizeTitle(title: string) {
  return title.replace(/\s+/g, " ").trim();
}

async function getVimeoTitle(testimonial: VimeoTestimonial) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const url = new URL("https://vimeo.com/api/oembed.json");
    url.searchParams.set("url", testimonial.url);

    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
      signal: controller.signal,
    });

    if (!res.ok) return testimonial.title;

    const data = (await res.json()) as VimeoOEmbedResponse;
    return data.title ? normalizeTitle(data.title) : testimonial.title;
  } catch {
    return testimonial.title;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getVimeoTestimonials() {
  return Promise.all(
    VIMEO_TESTIMONIALS.map(async (testimonial) => ({
      ...testimonial,
      title: await getVimeoTitle(testimonial),
    }))
  );
}
