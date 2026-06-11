import "server-only";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

export const BEEHIIV_REVALIDATE_SECONDS = 1800;

type BeehiivListResponse<T> = {
  data: T[];
  limit: number;
  page: number;
  total_results: number;
  total_pages: number;
};

type BeehiivPublication = {
  id: string;
  name: string;
};

type BeehiivPostContent = {
  free?: {
    web?: string | null;
    email?: string | null;
    rss?: string | null;
  };
  premium?: {
    web?: string | null;
    email?: string | null;
  };
};

type BeehiivPost = {
  id: string;
  title: string;
  subtitle?: string | null;
  preview_text?: string | null;
  slug: string;
  authors?: string[];
  created?: number | null;
  publish_date?: number | null;
  displayed_date?: number | null;
  thumbnail_url?: string | null;
  web_url?: string | null;
  status?: string | null;
  content_tags?: string[];
  meta_default_description?: string | null;
  meta_default_title?: string | null;
  content?: BeehiivPostContent;
};

type BeehiivSubscription = {
  id: string;
  email: string;
  status?: string;
  custom_fields?: BeehiivSubscriptionCustomField[];
};

type BeehiivSubscriptionCustomField = {
  name: string;
  kind?: string;
  value?: string | number | boolean | string[] | null;
};

type BeehiivCustomField = {
  id?: string;
  display?: string;
  name?: string;
  kind?: string;
};

export type BeehiivCustomFieldDefinition = {
  display: string;
  kind: "string" | "integer" | "boolean" | "date" | "datetime" | "list" | "double";
};

export type BeehiivCustomFieldValue = {
  name: string;
  value: string | number | boolean | string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  contentHtml: string;
  thumbnailUrl: string | null;
  webUrl: string | null;
  authors: string[];
  publishedAt: string;
  contentTags: string[];
  metaTitle: string;
  metaDescription: string;
  readingTime: string;
};

type BeehiivQueryValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | undefined
  | null;

type BeehiivQuery = Record<string, BeehiivQueryValue>;

type BeehiivRequestInit = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  next?: {
    revalidate?: number;
  };
  query?: BeehiivQuery;
};

let publicationIdPromise: Promise<string> | null = null;

function getBeehiivApiKey() {
  return (
    process.env.BEEHIIV_API_KEY ||
    process.env.BEEHIIV_API_TOKEN ||
    process.env.BEEHIIV_TOKEN ||
    process.env.BEEHIV_API_KEY ||
    process.env.beehiv ||
    ""
  ).trim();
}

function getConfiguredPublicationId() {
  return (
    process.env.BEEHIIV_PUBLICATION_ID ||
    process.env.BEEHIV_PUBLICATION_ID ||
    process.env.BEEHIIV_PUB_ID ||
    ""
  ).trim();
}

function buildUrl(path: string, query: BeehiivQuery = {}) {
  const url = new URL(`${BEEHIIV_API_BASE}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, String(item)));
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url;
}

async function beehiivFetch<T>(path: string, query?: BeehiivQuery): Promise<T> {
  const response = await beehiivRequest<T>(path, {
    query,
    next: { revalidate: BEEHIIV_REVALIDATE_SECONDS },
  });

  return response;
}

async function beehiivRequest<T>(
  path: string,
  init: BeehiivRequestInit = {}
): Promise<T> {
  const apiKey = getBeehiivApiKey();

  if (!apiKey) {
    throw new Error("Missing beehiiv API key. Set BEEHIIV_API_KEY or keep the existing beehiv env variable.");
  }

  const { query, headers, ...fetchInit } = init;
  const res = await fetch(buildUrl(path, query), {
    ...fetchInit,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`beehiiv API error ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }

  return (await res.json()) as T;
}

async function getPublicationId() {
  const configured = getConfiguredPublicationId();
  if (configured) return configured;

  if (!publicationIdPromise) {
    publicationIdPromise = beehiivFetch<BeehiivListResponse<BeehiivPublication>>("/publications", {
      limit: 1,
      page: 1,
    }).then((response) => {
      const publication = response.data[0];

      if (!publication?.id) {
        throw new Error("No beehiiv publications were returned for this API key.");
      }

      return publication.id;
    });
  }

  return publicationIdPromise;
}

function decodeHtmlEntities(text: string) {
  const entities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#8217;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#8211;": "-",
    "&#8212;": "-",
  };

  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

export function stripHtml(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractBeehiivBody(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch?.[1] ?? html;

  const blocksIndex = content.search(/<div[^>]+id=["']content-blocks["'][^>]*>/i);
  if (blocksIndex >= 0) {
    content = content.slice(blocksIndex);
  }

  return content
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!doctype[^>]*>/gi, "")
    .trim();
}

function secondsToIso(value?: number | null) {
  if (!value || !Number.isFinite(value)) return "";
  return new Date(value * 1000).toISOString();
}

function calculateReadingTime(html: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function normalizePost(post: BeehiivPost): BlogPost {
  const contentHtml = extractBeehiivBody(post.content?.free?.web ?? "");
  const textFromContent = stripHtml(contentHtml);
  const excerpt =
    post.preview_text ||
    post.subtitle ||
    post.meta_default_description ||
    textFromContent.slice(0, 180);
  const metaDescription = post.meta_default_description || excerpt;
  const title = decodeHtmlEntities(post.title || "Untitled");

  return {
    id: post.id,
    slug: post.slug,
    title,
    subtitle: decodeHtmlEntities(post.subtitle || ""),
    excerpt: decodeHtmlEntities(excerpt).trim(),
    contentHtml,
    thumbnailUrl: post.thumbnail_url || null,
    webUrl: post.web_url || null,
    authors: post.authors ?? [],
    publishedAt: secondsToIso(post.displayed_date || post.publish_date || post.created),
    contentTags: post.content_tags ?? [],
    metaTitle: decodeHtmlEntities(post.meta_default_title || title),
    metaDescription: decodeHtmlEntities(metaDescription).trim(),
    readingTime: calculateReadingTime(contentHtml || excerpt),
  };
}

export async function getBlogPosts(page = 1, limit = 6) {
  const publicationId = await getPublicationId();
  const response = await beehiivFetch<BeehiivListResponse<BeehiivPost>>(
    `/publications/${publicationId}/posts`,
    {
      limit,
      page,
      order_by: "publish_date",
      direction: "desc",
      status: "confirmed",
      hidden_from_feed: "false",
    }
  );

  return {
    posts: response.data.map(normalizePost),
    totalPages: response.total_pages || 1,
    totalResults: response.total_results || response.data.length,
  };
}

export async function getBlogPostBySlug(slug: string) {
  const publicationId = await getPublicationId();
  const response = await beehiivFetch<BeehiivListResponse<BeehiivPost>>(
    `/publications/${publicationId}/posts`,
    {
      limit: 1,
      page: 1,
      "slugs[]": slug,
      status: "confirmed",
      hidden_from_feed: "false",
      expand: "free_web_content",
    }
  );

  const post = response.data[0];
  return post ? normalizePost(post) : null;
}

export async function getRelatedBlogPosts(currentPostId: string, limit = 3) {
  const publicationId = await getPublicationId();
  const response = await beehiivFetch<BeehiivListResponse<BeehiivPost>>(
    `/publications/${publicationId}/posts`,
    {
      limit: limit + 1,
      page: 1,
      order_by: "publish_date",
      direction: "desc",
      status: "confirmed",
      hidden_from_feed: "false",
    }
  );

  return response.data
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit)
    .map(normalizePost);
}

export async function subscribeToNewsletter(email: string) {
  const publicationId = await getPublicationId();

  return beehiivRequest<{ data: BeehiivSubscription }>(
    `/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    }
  );
}

async function getSubscriptionByEmail(publicationId: string, email: string) {
  const response = await beehiivFetch<BeehiivListResponse<BeehiivSubscription>>(
    `/publications/${publicationId}/subscriptions`,
    {
      email,
      "expand[]": "custom_fields",
      limit: 10,
      page: 1,
    }
  );

  return (
    response.data.find((subscription) => subscription.email.toLowerCase() === email.toLowerCase()) ??
    response.data[0] ??
    null
  );
}

async function ensureBeehiivCustomFields(
  publicationId: string,
  customFields: BeehiivCustomFieldDefinition[]
) {
  if (!customFields.length) return;

  const response = await beehiivFetch<BeehiivListResponse<BeehiivCustomField>>(
    `/publications/${publicationId}/custom_fields`,
    {
      limit: 100,
      page: 1,
    }
  );
  const existingNames = new Set(
    response.data
      .map((field) => field.display || field.name)
      .filter((name): name is string => Boolean(name))
  );
  const missingFields = customFields.filter((field) => !existingNames.has(field.display));

  await Promise.all(
    missingFields.map(async (field) => {
      try {
        await beehiivRequest<{ data: BeehiivCustomField }>(
          `/publications/${publicationId}/custom_fields`,
          {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(field),
          }
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        if (!/already|exist|taken|duplicate/i.test(message)) {
          throw error;
        }
      }
    })
  );
}

export async function subscribeContactLead({
  email,
  customFields,
  customFieldDefinitions,
  reactivateExisting,
  sendWelcomeEmail,
  doubleOptOverride,
  utmSource,
  utmMedium,
  utmCampaign,
  referringSite,
}: {
  email: string;
  customFields: BeehiivCustomFieldValue[];
  customFieldDefinitions: BeehiivCustomFieldDefinition[];
  reactivateExisting: boolean;
  sendWelcomeEmail: boolean;
  doubleOptOverride?: "on" | "off" | "not_set";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referringSite?: string;
}) {
  const publicationId = await getPublicationId();

  await ensureBeehiivCustomFields(publicationId, customFieldDefinitions);

  const existingSubscription = await getSubscriptionByEmail(publicationId, email);

  if (existingSubscription?.id) {
    return beehiivRequest<{ data: BeehiivSubscription }>(
      `/publications/${publicationId}/subscriptions/${existingSubscription.id}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          custom_fields: customFields,
        }),
      }
    );
  }

  return beehiivRequest<{ data: BeehiivSubscription }>(
    `/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: reactivateExisting,
        send_welcome_email: sendWelcomeEmail,
        double_opt_override: doubleOptOverride,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        referring_site: referringSite,
        custom_fields: customFields,
      }),
    }
  );
}
