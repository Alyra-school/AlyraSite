import { getBlogArticlesFallback } from "../data/fallback/blogArticlesFallback";
import { getSupabaseServerClient } from "./supabaseServer";
import { normalizeBlogArticle } from "./content/blogMapper";
import { SUPABASE_ONLY_MODE } from "./runtimeConfig";
const loggedBlogDataErrors = new Set();

const BLOG_ARTICLES_SELECT =
  "id, slug, title, summary, excerpt, content_html, featured_image_url, featured_image_alt, author_name, published_at, reading_time_minutes, tags, is_published, created_at, updated_at";

function logBlogDataErrorOnce(scope, error) {
  const message = String(error?.message || error || "Unknown error");
  if (message.toLowerCase().includes("fetch failed")) return;
  const key = `${scope}:${message}`;
  if (loggedBlogDataErrors.has(key)) return;
  loggedBlogDataErrors.add(key);
  console.warn(`[blogData.${scope}] ${message}`);
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapArticle(row) {
  return normalizeBlogArticle({
    ...row,
    contentHtml: row.content_html,
    imageUrl: row.featured_image_url,
    imageAlt: row.featured_image_alt || row.title,
    author: row.author_name,
    readingTimeMinutes: row.reading_time_minutes,
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
  });
}

function fallbackArticles() {
  return getBlogArticlesFallback();
}

export async function getBlogArticles() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return SUPABASE_ONLY_MODE ? [] : fallbackArticles();

  const { data, error } = await supabase
    .from("blog_articles")
    .select(BLOG_ARTICLES_SELECT)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    const code = String(error.code || "");
    const message = String(error.message || "");
    if (code === "PGRST205" || message.includes("Could not find the table 'public.blog_articles'")) {
      return SUPABASE_ONLY_MODE ? [] : fallbackArticles();
    }
    logBlogDataErrorOnce("getBlogArticles", error);
    return SUPABASE_ONLY_MODE ? [] : fallbackArticles();
  }

  const mapped = (data ?? []).map(mapArticle);
  if (mapped.length > 0) return mapped;
  return SUPABASE_ONLY_MODE ? [] : fallbackArticles();
}

export async function getBlogArticleBySlug(slug) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return SUPABASE_ONLY_MODE ? null : fallbackArticles().find((item) => item.slug === slug) ?? null;
  const requestedSlug = String(slug || "").trim();
  const normalizedRequestedSlug = normalizeSlug(requestedSlug);

  const { data, error } = await supabase
    .from("blog_articles")
    .select(BLOG_ARTICLES_SELECT)
    .eq("slug", requestedSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    const code = String(error.code || "");
    const message = String(error.message || "");
    if (code === "PGRST205" || message.includes("Could not find the table 'public.blog_articles'")) {
      return SUPABASE_ONLY_MODE ? null : fallbackArticles().find((item) => item.slug === slug) ?? null;
    }
    logBlogDataErrorOnce("getBlogArticleBySlug", error);
    return null;
  }

  if (!data) {
    const { data: candidates, error: candidatesError } = await supabase
      .from("blog_articles")
      .select(BLOG_ARTICLES_SELECT)
      .eq("is_published", true);

    if (candidatesError) {
      logBlogDataErrorOnce("getBlogArticleBySlug.candidateMatch", candidatesError);
    } else if (Array.isArray(candidates)) {
      const matched = candidates.find((item) => normalizeSlug(item.slug) === normalizedRequestedSlug);
      if (matched) return mapArticle(matched);
    }

    if (SUPABASE_ONLY_MODE) return null;
    return fallbackArticles().find((item) => item.slug === slug) ?? null;
  }
  return mapArticle(data);
}

export async function getBlogTags() {
  const articles = await getBlogArticles();
  const tags = new Set();
  articles.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag));
  });
  return ["Tout", ...Array.from(tags)];
}
