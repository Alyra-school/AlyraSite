import AlumniPage from "../../src/components/static-pages/AlumniPage";
import { getStaticPageContent } from "../../src/lib/content/staticPageMapper";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Nos Anciens",
  description:
    "Retrouvez les parcours des alumni Alyra et leurs evolutions professionnelles apres la formation.",
  path: "/nos-anciens",
});

export default function Page() {
  return <AlumniPage page={getStaticPageContent("nos-anciens")} />;
}
