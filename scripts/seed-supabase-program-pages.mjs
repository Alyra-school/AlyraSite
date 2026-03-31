import { createClient } from "@supabase/supabase-js";
import { catalogPrograms } from "../supabase/seeds/catalogSeedData.js";
import { buildFallbackProgramDetail } from "../supabase/seeds/programDetailSeedFallback.js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});

const rows = catalogPrograms.map((program) => {
  const detail = buildFallbackProgramDetail(program);
  return {
    program_id: program.id,
    overview: detail.overview,
    overview_secondary: detail.overviewSecondary,
    certification_title: detail.certificationTitle,
    certification_description: detail.certificationDescription,
    learning_path: detail.learningPath,
    professors: detail.professors,
  };
});

const { error } = await supabase.from("program_pages").upsert(rows, { onConflict: "program_id" });

if (error) {
  console.error("Seeding program pages failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} program detail pages to Supabase.`);
