import { Suspense } from "react";
import ProgramCatalog from "../../src/components/ProgramCatalog";
import { getPrograms } from "../../src/lib/programData";
import { pageMetadata } from "../../src/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Catalogue des Formations",
  description:
    "Consultez toutes nos formations blockchain et IA, avec filtres par duree, date et specialisation.",
  path: "/formations",
});

export default async function FormationsPage() {
  const programs = await getPrograms();
  return (
    <Suspense
      fallback={
        <main className="main-content">
          <section className="hero programs-hero">
            <div className="section-head">
              <h1>Chargement du catalogue...</h1>
            </div>
          </section>
        </main>
      }
    >
      <ProgramCatalog programsList={programs} isLoading={false} error={null} />
    </Suspense>
  );
}
