import NeedsPage from "../../src/components/static-pages/NeedsPage";
import { getStaticPageContent } from "../../src/lib/content/staticPageMapper";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Vos besoins",
  description:
    "Choisissez un parcours adapte a votre objectif: reconversion, montee en competences ou besoins entreprise.",
  path: "/vos-besoins",
});

export default function Page() {
  return <NeedsPage page={getStaticPageContent("vos-besoins")} />;
}
