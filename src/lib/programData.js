import { getSupabaseServerClient } from "./supabaseServer";

const PROGRAMS_SELECT =
  "id, slug, title, subtitle, tags, start_date_label, duration_label, price_eur, image_url, is_featured";
const PROGRAM_PAGE_SELECT =
  "overview, overview_secondary, certification_title, certification_description, learning_path, professors";

function mapProgram(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    tags: row.tags ?? [],
    date: row.start_date_label,
    duration: row.duration_label,
    price: row.price_eur,
    image: row.image_url,
    featured: row.is_featured ?? false,
  };
}

function mapProgramPage(row) {
  if (!row) return null;
  return {
    overview: row.overview,
    overviewSecondary: row.overview_secondary,
    certificationTitle: row.certification_title,
    certificationDescription: row.certification_description,
    learningPath: row.learning_path ?? [],
    professors: row.professors ?? [],
  };
}

export async function getPrograms() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("programs")
    .select(PROGRAMS_SELECT)
    .order("id", { ascending: true });

  if (error) {
    console.error("[programData.getPrograms] Supabase error:", error.message);
    return [];
  }
  return (data ?? []).map(mapProgram);
}

export async function getProgramBySlug(slug) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("programs")
    .select(PROGRAMS_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[programData.getProgramBySlug] Supabase error:", error.message);
    return null;
  }
  if (!data) return null;
  return mapProgram(data);
}

export async function getProgramPageByProgramId(programId) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("program_pages")
    .select(PROGRAM_PAGE_SELECT)
    .eq("program_id", programId)
    .maybeSingle();

  if (error) {
    console.error("[programData.getProgramPageByProgramId] Supabase error:", error.message);
    return null;
  }
  return mapProgramPage(data);
}
