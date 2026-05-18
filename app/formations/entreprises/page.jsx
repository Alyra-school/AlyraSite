import ProgramSegmentCatalogPage from "../../../src/components/program-catalog/ProgramSegmentCatalogPage";
import { getPrograms } from "../../../src/lib/programData";
import {
  getProgramSegmentPrograms,
  programSegmentConfigs,
} from "../../../src/lib/programCatalogSegments";
import { pageMetadata } from "../../../src/lib/seo";

const config = programSegmentConfigs.entreprises;

export const metadata = pageMetadata({
  title: config.title,
  description: config.description,
  path: "/formations/entreprises",
});

export default async function FormationsEntreprisesPage() {
  const programs = await getPrograms();
  const filtered = getProgramSegmentPrograms(programs, "entreprises");
  return <ProgramSegmentCatalogPage config={config} programs={filtered} />;
}

