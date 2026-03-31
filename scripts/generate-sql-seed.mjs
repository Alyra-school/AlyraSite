import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { catalogPrograms } from "../supabase/seeds/catalogSeedData.js";
import { buildFallbackProgramDetail } from "../supabase/seeds/programDetailSeedFallback.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const output = path.join(root, "supabase", "seeds", "20260401_seed_programs_and_pages.sql");

const quote = (value) => `'${String(value).replace(/'/g, "''")}'`;
const pgTextArray = (arr) => `array[${arr.map(quote).join(", ")}]`;
const pgJsonb = (obj) => `${quote(JSON.stringify(obj))}::jsonb`;

const programRows = catalogPrograms.map((p) => `
  (${quote(p.id)}, ${quote(p.slug)}, ${quote(p.title)}, ${quote(p.subtitle)}, ${pgTextArray(p.tags)}, ${quote(p.date)}, ${quote(p.duration)}, ${Number(p.price)}, ${quote(p.image)}, ${Boolean(p.featured)})`).join(",");

const pageRows = catalogPrograms.map((p) => {
  const d = buildFallbackProgramDetail(p);
  return `\n  (${quote(p.id)}, ${quote(d.overview)}, ${quote(d.overviewSecondary)}, ${quote(d.certificationTitle)}, ${quote(d.certificationDescription)}, ${pgTextArray(d.learningPath)}, ${pgJsonb(d.professors)})`;
}).join(",");

const sql = `begin;

insert into public.programs (
  id,
  slug,
  title,
  subtitle,
  tags,
  start_date_label,
  duration_label,
  price_eur,
  image_url,
  is_featured
)
values${programRows}
on conflict (id) do update
set
  slug = excluded.slug,
  title = excluded.title,
  subtitle = excluded.subtitle,
  tags = excluded.tags,
  start_date_label = excluded.start_date_label,
  duration_label = excluded.duration_label,
  price_eur = excluded.price_eur,
  image_url = excluded.image_url,
  is_featured = excluded.is_featured,
  updated_at = now();

insert into public.program_pages (
  program_id,
  overview,
  overview_secondary,
  certification_title,
  certification_description,
  learning_path,
  professors
)
values${pageRows}
on conflict (program_id) do update
set
  overview = excluded.overview,
  overview_secondary = excluded.overview_secondary,
  certification_title = excluded.certification_title,
  certification_description = excluded.certification_description,
  learning_path = excluded.learning_path,
  professors = excluded.professors,
  updated_at = now();

commit;
`;

fs.writeFileSync(output, sql, "utf8");
console.log(output);
