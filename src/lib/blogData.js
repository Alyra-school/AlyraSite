import { latestNews } from "../data/homeData";
import { getSupabaseServerClient } from "./supabaseServer";

const BLOG_ARTICLES_SELECT =
  "id, slug, title, summary, excerpt, content_html, featured_image_url, featured_image_alt, author_name, published_at, reading_time_minutes, tags, is_published, created_at, updated_at";
const SUPABASE_ONLY_MODE = true;

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
  const publishedAt = row.published_at ? new Date(row.published_at) : null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? null,
    excerpt: row.excerpt,
    contentHtml: row.content_html,
    imageUrl: row.featured_image_url,
    imageAlt: row.featured_image_alt || row.title,
    author: row.author_name,
    publishedAt,
    publishedDateLabel: publishedAt
      ? new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(publishedAt)
      : "",
    readingTimeMinutes: row.reading_time_minutes,
    readingTimeLabel: row.reading_time_minutes ? `${row.reading_time_minutes} min de lecture` : "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
  };
}

function fallbackArticles() {
  return latestNews.map((item, index) => ({
    id: `fallback-${item.slug}`,
    slug: item.slug,
    title: item.title,
    summary: item.text,
    excerpt: item.text,
    contentHtml: `<p>${item.text}</p><p>Contenu complet en cours d'integration.</p>`,
    imageUrl: item.image,
    imageAlt: item.imageAlt || item.title,
    author: "Equipe Alyra",
    publishedAt: null,
    publishedDateLabel: "",
    readingTimeMinutes: Number.parseInt(item.readTime, 10) || 5,
    readingTimeLabel: item.readTime,
    tags: [item.tag || "Ressource", index % 2 ? "Blockchain & Web3" : "Intelligence Artificielle"],
    isPublished: true,
    createdAt: null,
    updatedAt: null,
  }));
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
    console.error("[blogData.getBlogArticles] Supabase error:", error.message);
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
    console.error("[blogData.getBlogArticleBySlug] Supabase error:", error.message);
    return null;
  }

  if (!data) {
    const { data: candidates, error: candidatesError } = await supabase
      .from("blog_articles")
      .select(BLOG_ARTICLES_SELECT)
      .eq("is_published", true);

    if (candidatesError) {
      console.error("[blogData.getBlogArticleBySlug] candidate match error:", candidatesError.message);
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
