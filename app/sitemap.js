import { getPrograms } from "../src/lib/programData";
import { getBlogArticles } from "../src/lib/blogData";
import { siteUrl } from "../src/lib/seo";

export const revalidate = 300;

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/formations",
    "/financement",
    "/vos-besoins",
    "/blog",
    "/qui-sommes-nous",
    "/nos-anciens",
    "/rendez-vous",
  ];

  const [programs, blogArticles] = await Promise.all([getPrograms(), getBlogArticles()]);
  const dynamicRoutes = programs.map((item) => `/formations/${item.slug}`);
  const blogRoutes = blogArticles.map((item) => `/blog/${item.slug}`);

  return [...staticRoutes, ...dynamicRoutes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
