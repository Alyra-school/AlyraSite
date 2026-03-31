import StaticPage from "../../src/components/StaticPage";
import { staticPagesData } from "../../src/data/staticPagesData";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Qui sommes nous",
  description:
    "Notre mission, notre pedagogie et notre equipe pour former les talents de la blockchain et de l'IA.",
  path: "/qui-sommes-nous",
});

export default function Page() {
  return <StaticPage page={staticPagesData["qui-sommes-nous"]} />;
}
