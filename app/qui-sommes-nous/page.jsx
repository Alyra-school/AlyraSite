import AboutPage from "../../src/components/static-pages/AboutPage";
import { getStaticPageContent } from "../../src/lib/content/staticPageMapper";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Qui sommes-nous",
  description:
    "Notre mission, notre pédagogie et notre équipe pour former les talents de la blockchain et de l'IA.",
  path: "/qui-sommes-nous",
});

export default function Page() {
  return <AboutPage page={getStaticPageContent("qui-sommes-nous")} />;
}
