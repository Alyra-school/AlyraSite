import { latestNews } from "../homeData";

export function getBlogArticlesFallback() {
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
