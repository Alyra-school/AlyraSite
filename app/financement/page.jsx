import StaticPage from "../../src/components/StaticPage";
import { staticPagesData } from "../../src/data/staticPagesData";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Financement",
  description:
    "Decouvrez les solutions de financement disponibles pour rejoindre nos parcours blockchain et IA.",
  path: "/financement",
});

export default function Page() {
  return <StaticPage page={staticPagesData.financement} />;
}
