import StaticPage from "../../src/components/StaticPage";
import { staticPagesData } from "../../src/data/staticPagesData";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Vos besoins",
  description:
    "Choisissez un parcours adapte a votre objectif: reconversion, montee en competences ou besoins entreprise.",
  path: "/vos-besoins",
});

export default function Page() {
  return <StaticPage page={staticPagesData["vos-besoins"]} />;
}
