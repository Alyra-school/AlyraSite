import BlogIndexPage from "../../src/components/blog/BlogIndexPage";
import { getBlogArticles, getBlogTags } from "../../src/lib/blogData";
import { pageMetadata } from "../../src/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Blog d'Alyra",
  description:
    "Les meilleures ressources factuelles concernant le marche de l'emploi blockchain, IA et Web3.",
  path: "/blog",
});

export default async function Page() {
  const [articles, tags] = await Promise.all([getBlogArticles(), getBlogTags()]);
  return <BlogIndexPage articles={articles} tags={tags} />;
}
