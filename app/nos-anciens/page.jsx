import StaticPage from "../../src/components/StaticPage";
import { staticPagesData } from "../../src/data/staticPagesData";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Nos Anciens",
  description:
    "Retrouvez les parcours des alumni Alyra et leurs evolutions professionnelles apres la formation.",
  path: "/nos-anciens",
});

export default function Page() {
  return <StaticPage page={staticPagesData["nos-anciens"]} />;
}
