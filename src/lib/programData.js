import { getSupabaseServerClient } from "./supabaseServer";

const PROGRAMS_SELECT =
  "id, slug, title, subtitle, tags, start_date_label, duration_label, price_eur, image_url, is_featured";
const PROGRAM_PAGE_SELECT =
  "overview, overview_secondary, certification_title, certification_description, learning_path, professors";
const HERO_BULLETS_SELECT = "position, text";
const CTAS_SELECT = "cta_key, label, href, form_id, position, is_external";
const PROOF_LOGOS_SELECT = "logo_key, position, label, image_url, category";
const KPIS_SELECT = "position, value, label, description, source";
const LEARNING_ITEMS_SELECT = "position, text";
const BROCHURE_POINTS_SELECT = "position, text";
const MODALITIES_SELECT =
  "modality_key, position, title, subtitle, duration_label, price_label, support_label, certification_label, certification_code, cta_label, cta_href";
const MODALITY_FEATURES_SELECT = "modality_key, position, text";
const PROGRAM_EXPERTS_SELECT = "expert_id, position";
const EXPERTS_SELECT = "id, slug, name, role, bio, linkedin_url, image_url";
const TESTIMONIALS_SELECT = "testimonial_key, position, author, title, body, rating, source_label";
const FAQS_SELECT = "faq_key, position, question, answer";
const RELATED_PROGRAMS_SELECT = "related_program_id, position, label_override";

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
  if (!row) {
    return {
      overview: null,
      overviewSecondary: null,
      certificationTitle: null,
      certificationDescription: null,
      learningPath: [],
      professors: [],
    };
  }
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

  const [
    pageResult,
    heroBulletsResult,
    ctasResult,
    proofLogosResult,
    kpisResult,
    learningItemsResult,
    brochurePointsResult,
    modalitiesResult,
    modalityFeaturesResult,
    programExpertsResult,
    testimonialsResult,
    faqsResult,
    relatedProgramsResult,
  ] = await Promise.all([
    supabase.from("program_pages").select(PROGRAM_PAGE_SELECT).eq("program_id", programId).maybeSingle(),
    supabase
      .from("program_page_hero_bullets")
      .select(HERO_BULLETS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_ctas")
      .select(CTAS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_proof_logos")
      .select(PROOF_LOGOS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase.from("program_page_kpis").select(KPIS_SELECT).eq("program_id", programId).order("position", { ascending: true }),
    supabase
      .from("program_page_learning_items")
      .select(LEARNING_ITEMS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_brochure_points")
      .select(BROCHURE_POINTS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_modalities")
      .select(MODALITIES_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_modality_features")
      .select(MODALITY_FEATURES_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_experts")
      .select(PROGRAM_EXPERTS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase
      .from("program_page_testimonials")
      .select(TESTIMONIALS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
    supabase.from("program_page_faqs").select(FAQS_SELECT).eq("program_id", programId).order("position", { ascending: true }),
    supabase
      .from("program_page_related_programs")
      .select(RELATED_PROGRAMS_SELECT)
      .eq("program_id", programId)
      .order("position", { ascending: true }),
  ]);

  const pageError = pageResult.error;
  if (pageError) {
    console.error("[programData.getProgramPageByProgramId] program_pages error:", pageError.message);
  }

  const blockResults = [
    ["heroBullets", heroBulletsResult.error],
    ["ctas", ctasResult.error],
    ["proofLogos", proofLogosResult.error],
    ["kpis", kpisResult.error],
    ["learningItems", learningItemsResult.error],
    ["brochurePoints", brochurePointsResult.error],
    ["modalities", modalitiesResult.error],
    ["modalityFeatures", modalityFeaturesResult.error],
    ["programExperts", programExpertsResult.error],
    ["testimonials", testimonialsResult.error],
    ["faqs", faqsResult.error],
    ["relatedPrograms", relatedProgramsResult.error],
  ];

  blockResults.forEach(([name, error]) => {
    if (error) {
      console.error(`[programData.getProgramPageByProgramId] ${name} error:`, error.message);
    }
  });

  const legacy = mapProgramPage(pageResult.data);

  const ctas = (ctasResult.data ?? []).map((item) => ({
    key: item.cta_key,
    label: item.label,
    href: item.href,
    formId: item.form_id,
    position: item.position,
    isExternal: Boolean(item.is_external),
  }));

  const proofLogos = (proofLogosResult.data ?? []).map((item) => ({
    key: item.logo_key,
    position: item.position,
    label: item.label,
    imageUrl: item.image_url,
    category: item.category,
  }));

  const kpis = (kpisResult.data ?? []).map((item) => ({
    position: item.position,
    value: item.value,
    label: item.label,
    description: item.description,
    source: item.source,
  }));

  const learningItems = (learningItemsResult.data ?? []).map((item) => ({
    position: item.position,
    text: item.text,
  }));

  const brochurePoints = (brochurePointsResult.data ?? []).map((item) => ({
    position: item.position,
    text: item.text,
  }));

  const featureMap = (modalityFeaturesResult.data ?? []).reduce((acc, item) => {
    const list = acc.get(item.modality_key) ?? [];
    list.push({ position: item.position, text: item.text });
    acc.set(item.modality_key, list);
    return acc;
  }, new Map());

  const modalities = (modalitiesResult.data ?? []).map((item) => ({
    key: item.modality_key,
    position: item.position,
    title: item.title,
    subtitle: item.subtitle,
    durationLabel: item.duration_label,
    priceLabel: item.price_label,
    supportLabel: item.support_label,
    certificationLabel: item.certification_label,
    certificationCode: item.certification_code,
    ctaLabel: item.cta_label,
    ctaHref: item.cta_href,
    features: (featureMap.get(item.modality_key) ?? []).sort((a, b) => a.position - b.position),
  }));

  const expertLinks = programExpertsResult.data ?? [];
  let experts = [];
  if (expertLinks.length > 0) {
    const expertIds = expertLinks.map((item) => item.expert_id);
    const { data: expertsData, error: expertsError } = await supabase
      .from("experts")
      .select(EXPERTS_SELECT)
      .in("id", expertIds);

    if (expertsError) {
      console.error("[programData.getProgramPageByProgramId] experts error:", expertsError.message);
    } else {
      const expertMap = new Map((expertsData ?? []).map((item) => [item.id, item]));
      experts = expertLinks
        .map((link) => {
          const expert = expertMap.get(link.expert_id);
          if (!expert) return null;
          return {
            position: link.position,
            id: expert.id,
            slug: expert.slug,
            name: expert.name,
            role: expert.role,
            bio: expert.bio,
            linkedinUrl: expert.linkedin_url,
            imageUrl: expert.image_url,
          };
        })
        .filter(Boolean);
    }
  }

  const testimonials = (testimonialsResult.data ?? []).map((item) => ({
    key: item.testimonial_key,
    position: item.position,
    author: item.author,
    title: item.title,
    body: item.body,
    rating: item.rating,
    sourceLabel: item.source_label,
  }));

  const faqs = (faqsResult.data ?? []).map((item) => ({
    key: item.faq_key,
    position: item.position,
    question: item.question,
    answer: item.answer,
  }));

  const relatedLinks = relatedProgramsResult.data ?? [];
  let relatedPrograms = [];
  if (relatedLinks.length > 0) {
    const relatedIds = relatedLinks.map((item) => item.related_program_id);
    const { data: relatedData, error: relatedError } = await supabase
      .from("programs")
      .select(PROGRAMS_SELECT)
      .in("id", relatedIds);

    if (relatedError) {
      console.error("[programData.getProgramPageByProgramId] related programs error:", relatedError.message);
    } else {
      const relatedMap = new Map((relatedData ?? []).map((item) => [item.id, mapProgram(item)]));
      relatedPrograms = relatedLinks
        .map((link) => {
          const program = relatedMap.get(link.related_program_id);
          if (!program) return null;
          return {
            ...program,
            position: link.position,
            labelOverride: link.label_override,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.position - b.position);
    }
  }

  return {
    ...legacy,
    heroBullets: (heroBulletsResult.data ?? []).map((item) => item.text),
    ctas,
    proofLogos,
    kpis,
    learningItems,
    brochurePoints,
    modalities,
    experts,
    testimonials,
    faqs,
    relatedPrograms,
  };
}
