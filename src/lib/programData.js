import { getSupabaseServerClient } from "./supabaseServer";
import { getProgramPageBySlugV1 } from "./content/programPageV1Repository";
import { PROGRAM_PAGE_V1_ENABLED } from "./runtimeConfig";

const loggedSupabaseErrors = new Set();

const PROGRAMS_SELECT =
  "id, slug, title, subtitle, tags, start_date_label, duration_label, price_eur, image_url, is_featured";

function logProgramDataErrorOnce(scope, error) {
  const message = String(error?.message || error || "Unknown error");
  if (message.toLowerCase().includes("fetch failed")) return;
  const key = `${scope}:${message}`;
  if (loggedSupabaseErrors.has(key)) return;
  loggedSupabaseErrors.add(key);
  console.warn(`[programData.${scope}] ${message}`);
}

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

export async function getPrograms() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("programs")
    .select(PROGRAMS_SELECT)
    .order("id", { ascending: true });

  if (error) {
    logProgramDataErrorOnce("getPrograms", error);
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
    logProgramDataErrorOnce("getProgramBySlug", error);
    return null;
  }
  if (!data) return null;
  return mapProgram(data);
}

export async function getProgramPageByProgramId(_programId, options = {}) {
  const slug = options?.slug;
  if (!slug) {
    logProgramDataErrorOnce(
      "getProgramPageByProgramId",
      "slug manquant: impossible de lire get_program_page_v1"
    );
    return null;
  }

  if (!PROGRAM_PAGE_V1_ENABLED) {
    logProgramDataErrorOnce(
      "getProgramPageByProgramId",
      "PROGRAM_PAGE_V1_ENABLED=false: chemin legacy retire, active le flag V1"
    );
    return null;
  }

  const content = await getProgramPageBySlugV1(slug);
  if (content) return content;

  logProgramDataErrorOnce(
    "getProgramPageByProgramId",
    `aucune donnee V1 retournee pour le slug '${slug}'`
  );
  return null;
}
