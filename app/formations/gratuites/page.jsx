import ProgramSegmentCatalogPage from "../../../src/components/program-catalog/ProgramSegmentCatalogPage";
import { getPrograms } from "../../../src/lib/programData";
import {
  getProgramSegmentPrograms,
  programSegmentConfigs,
} from "../../../src/lib/programCatalogSegments";
import { pageMetadata } from "../../../src/lib/seo";

const config = programSegmentConfigs.gratuites;

export const metadata = pageMetadata({
  title: config.title,
  description: config.description,
  path: "/formations/gratuites",
});

export default async function FormationsGratuitesPage() {
  const programs = await getPrograms();
  const filtered = getProgramSegmentPrograms(programs, "gratuites");
  return <ProgramSegmentCatalogPage config={config} programs={filtered} />;
}

