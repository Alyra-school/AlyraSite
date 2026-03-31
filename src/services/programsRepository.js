import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function mapProgramRow(row) {
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

export async function fetchPrograms() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: [],
      source: "no-supabase-config",
      error: null,
    };
  }

  const { data, error } = await supabase
    .from("programs")
    .select(
      "id, slug, title, subtitle, tags, start_date_label, duration_label, price_eur, image_url, is_featured"
    )
    .order("id", { ascending: true });

  if (error) {
    return {
      data: [],
      source: "supabase-error",
      error,
    };
  }

  return {
    data: (data ?? []).map(mapProgramRow),
    source: "supabase",
    error: null,
  };
}
