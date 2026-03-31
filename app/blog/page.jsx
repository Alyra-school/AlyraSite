import StaticPage from "../../src/components/StaticPage";
import { staticPagesData } from "../../src/data/staticPagesData";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Articles et analyses sur les tendances blockchain, intelligence artificielle, produit et engineering.",
  path: "/blog",
});

export default function Page() {
  return <StaticPage page={staticPagesData.blog} />;
}
