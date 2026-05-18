import ProgramSegmentCatalogPage from "../../../src/components/program-catalog/ProgramSegmentCatalogPage";
import { getPrograms } from "../../../src/lib/programData";
import {
  getProgramSegmentPrograms,
  programSegmentConfigs,
} from "../../../src/lib/programCatalogSegments";
import { pageMetadata } from "../../../src/lib/seo";

const config = programSegmentConfigs.blockchain;

export const metadata = pageMetadata({
  title: config.title,
  description: config.description,
  path: "/formations/blockchain",
});

export default async function FormationsBlockchainPage() {
  const programs = await getPrograms();
  const filtered = getProgramSegmentPrograms(programs, "blockchain");
  return <ProgramSegmentCatalogPage config={config} programs={filtered} />;
}

