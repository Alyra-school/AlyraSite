import { createClient } from "@supabase/supabase-js";
import { catalogPrograms } from "../supabase/seeds/catalogSeedData.js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});

const rows = catalogPrograms.map((program) => ({
  id: program.id,
  slug: program.slug,
  title: program.title,
  subtitle: program.subtitle,
  tags: program.tags,
  start_date_label: program.date,
  duration_label: program.duration,
  price_eur: program.price,
  image_url: program.image,
  is_featured: Boolean(program.featured),
}));

const { error } = await supabase.from("programs").upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Seeding failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} programs to Supabase.`);
