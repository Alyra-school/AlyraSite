function formatDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function sanitizeContentHtml(value) {
  const html = String(value || "");
  if (!html) return "";

  const withSecureLinks = html.replace(/<a\s+([^>]*?)>/gi, (match, attrs) => {
    const hasTargetBlank = /target\s*=\s*"_blank"/i.test(attrs);
    if (!hasTargetBlank) return match;

    if (/rel\s*=/i.test(attrs)) {
      return `<a ${attrs.replace(/rel\s*=\s*["'][^"']*["']/i, 'rel="noopener noreferrer nofollow"')}>`;
    }
    return `<a ${attrs} rel="noopener noreferrer nofollow">`;
  });

  return withSecureLinks.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
    const nextAttrs = attrs
      .replace(/\sloading\s*=\s*["'][^"']*["']/i, "")
      .replace(/\sdecoding\s*=\s*["'][^"']*["']/i, "");
    return `<img ${nextAttrs} loading="lazy" decoding="async">`;
  });
}

/**
 * @typedef {Object} BlogArticleView
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string|null} summary
 * @property {string} excerpt
 * @property {string} contentHtml
 * @property {string} imageUrl
 * @property {string} imageAlt
 * @property {string} author
 * @property {Date|null} publishedAt
 * @property {string} publishedDateLabel
 * @property {number} readingTimeMinutes
 * @property {string} readingTimeLabel
 * @property {string[]} tags
 */

export function normalizeBlogArticle(article, index = 0) {
  if (!article) return null;
  const readingTimeMinutes = Number(article.readingTimeMinutes || article.reading_time_minutes || 0) || 0;
  const publishedAt = article.publishedAt || article.published_at || null;

  return {
    id: article.id || `article-${index}`,
    slug: article.slug || "",
    title: article.title || "",
    summary: article.summary || null,
    excerpt: article.excerpt || "",
    contentHtml: sanitizeContentHtml(article.contentHtml || article.content_html || ""),
    imageUrl: article.imageUrl || article.featured_image_url || "",
    imageAlt: article.imageAlt || article.featured_image_alt || article.title || "",
    author: article.author || article.author_name || "Equipe Alyra",
    publishedAt: publishedAt ? new Date(publishedAt) : null,
    publishedDateLabel: article.publishedDateLabel || formatDate(publishedAt),
    readingTimeMinutes,
    readingTimeLabel: article.readingTimeLabel || (readingTimeMinutes > 0 ? `${readingTimeMinutes} min de lecture` : ""),
    tags: Array.isArray(article.tags) ? article.tags : [],
  };
}

export function normalizeBlogArticles(articles) {
  return (Array.isArray(articles) ? articles : []).map(normalizeBlogArticle).filter(Boolean);
}
