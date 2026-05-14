import { notFound } from "next/navigation";
import BlogArticlePage from "../../../src/components/blog/BlogArticlePage";
import { getBlogArticleBySlug, getBlogArticles } from "../../../src/lib/blogData";
import { pageMetadata } from "../../../src/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);

  if (!article) {
    return pageMetadata({
      title: "Article introuvable",
      description: "Cet article n'existe pas ou n'est plus disponible.",
      path: `/blog/${slug}`,
    });
  }

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogArticleRoute({ params }) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt ? article.publishedAt.toISOString() : undefined,
    author: {
      "@type": "Person",
      name: article.author || "Equipe Alyra",
    },
    image: article.imageUrl ? [article.imageUrl] : undefined,
    mainEntityOfPage: `https://www.alyra.fr/blog/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Alyra",
      url: "https://www.alyra.fr",
    },
  };

  return (
    <>
      <BlogArticlePage article={article} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export async function generateStaticParams() {
  const articles = await getBlogArticles();
  return articles.map((article) => ({ slug: article.slug }));
}
