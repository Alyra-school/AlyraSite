import HomePage from "../src/components/HomePage";
import { getBlogArticles } from "../src/lib/blogData";

export default async function Page() {
  const latestBlogPosts = (await getBlogArticles())
    .slice(0, 3)
    .map((article) => ({
      slug: article.slug,
      href: `/blog/${article.slug}`,
      title: article.title,
      text: article.excerpt,
      tag: article.tags?.[0] || "Ressource",
      readTime: article.readingTimeLabel || "5 min de lecture",
      image: article.imageUrl,
      imageAlt: article.imageAlt || article.title,
    }));

  return <HomePage latestBlogPosts={latestBlogPosts} />;
}
