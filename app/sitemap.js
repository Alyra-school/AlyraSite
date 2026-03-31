import { getPrograms } from "../src/lib/programData";
import { siteUrl } from "../src/lib/seo";

export const revalidate = 300;

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/programmes",
    "/financement",
    "/vos-besoins",
    "/blog",
    "/qui-sommes-nous",
    "/nos-anciens",
    "/rendez-vous",
  ];

  const programs = await getPrograms();
  const dynamicRoutes = programs.map((item) => `/programmes/${item.slug}`);

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
