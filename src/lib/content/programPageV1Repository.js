import { getSupabaseServerClient } from "../supabaseServer";
import { normalizeProgramPageContent } from "./programPageMapper";

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function byPosition(a, b) {
  return (a?.position ?? 0) - (b?.position ?? 0);
}

function groupBlocksByType(blocks) {
  const map = new Map();
  for (const block of toArray(blocks)) {
    if (!block || !block.block_type) continue;
    const list = map.get(block.block_type) ?? [];
    list.push(block);
    map.set(block.block_type, list);
  }
  for (const [key, list] of map.entries()) {
    map.set(key, list.sort(byPosition));
  }
  return map;
}

function mapCertification(blockMap) {
  const certMeta = blockMap.get("cert_meta")?.[0]?.payload ?? null;
  return {
    meta: certMeta
      ? {
          headlinePrefix: certMeta.headline_prefix ?? null,
          headlineAccent: certMeta.headline_accent ?? null,
          badgeImageUrl: certMeta.badge_image_url ?? null,
          badgeAlt: certMeta.badge_alt ?? null,
          introLabel: certMeta.intro_label ?? null,
          introTitle: certMeta.intro_title ?? null,
          introDescription: certMeta.intro_description ?? null,
          introReference: certMeta.intro_reference ?? null,
          trustpilotScore: certMeta.trustpilot_score ?? null,
          trustpilotLabel: certMeta.trustpilot_label ?? null,
        }
      : null,
    prereqCards: toArray(blockMap.get("cert_prereq_cards")).map((item) => ({
      position: item.position,
      iconKey: item.payload?.icon_key ?? null,
      text: item.payload?.text ?? "",
    })),
    prereqTools: toArray(blockMap.get("cert_prereq_tools")).map((item) => ({
      position: item.position,
      iconKey: item.payload?.icon_key ?? null,
      label: item.payload?.label ?? "",
    })),
    prereqBullets: toArray(blockMap.get("cert_prereq_bullets")).map((item) => ({
      position: item.position,
      text: item.payload?.text ?? "",
    })),
    competencies: toArray(blockMap.get("cert_competencies")).map((item) => ({
      position: item.position,
      title: item.payload?.title ?? "",
      description: item.payload?.description ?? "",
    })),
    objectives: toArray(blockMap.get("cert_objectives")).map((item) => ({
      position: item.position,
      text: item.payload?.text ?? "",
    })),
    evaluations: toArray(blockMap.get("cert_evaluations")).map((item) => ({
      position: item.position,
      title: item.payload?.title ?? "",
      description: item.payload?.description ?? "",
    })),
    validationRules: toArray(blockMap.get("cert_validation_rules")).map((item) => ({
      position: item.position,
      text: item.payload?.text ?? "",
    })),
  };
}

function mapProgramPageFromRpc(payload) {
  const pageCore = payload?.page_core ?? {};
  const blockMap = groupBlocksByType(payload?.blocks);

  return normalizeProgramPageContent({
    overview: pageCore?.overview ?? null,
    overviewSecondary: pageCore?.overview_secondary ?? null,
    certificationTitle: pageCore?.certification_title ?? null,
    certificationDescription: pageCore?.certification_description ?? null,
    learningPath: toArray(pageCore?.learning_path),
    professors: toArray(pageCore?.professors),
    heroBullets: toArray(blockMap.get("hero_bullets")).map((item) => item.payload?.text ?? ""),
    ctas: toArray(blockMap.get("ctas")).map((item) => ({
      key: item.payload?.key ?? null,
      label: item.payload?.label ?? "",
      href: item.payload?.href ?? null,
      formId: item.payload?.form_id ?? null,
      position: item.position,
      isExternal: Boolean(item.payload?.is_external),
    })),
    proofLogos: toArray(blockMap.get("proof_logos")).map((item) => ({
      key: item.payload?.key ?? null,
      position: item.position,
      label: item.payload?.label ?? "",
      imageUrl: item.payload?.image_url ?? null,
      category: item.payload?.category ?? "default",
    })),
    kpis: toArray(blockMap.get("kpis")).map((item) => ({
      position: item.position,
      value: item.payload?.value ?? "",
      label: item.payload?.label ?? "",
      description: item.payload?.description ?? "",
      source: item.payload?.source ?? null,
    })),
    learningItems: toArray(blockMap.get("learning_items")).map((item) => ({
      position: item.position,
      text: item.payload?.text ?? "",
    })),
    brochurePoints: toArray(blockMap.get("brochure_points")).map((item) => ({
      position: item.position,
      text: item.payload?.text ?? "",
    })),
    modalities: toArray(blockMap.get("modalities")).map((item) => ({
      key: item.payload?.key ?? null,
      position: item.position,
      title: item.payload?.title ?? "",
      subtitle: item.payload?.subtitle ?? "",
      durationLabel: item.payload?.duration_label ?? "",
      priceLabel: item.payload?.price_label ?? "",
      supportLabel: item.payload?.support_label ?? "",
      certificationLabel: item.payload?.certification_label ?? "",
      certificationCode: item.payload?.certification_code ?? "",
      ctaLabel: item.payload?.cta_label ?? "",
      ctaHref: item.payload?.cta_href ?? null,
      features: toArray(item.payload?.features)
        .map((feature) => ({ position: feature?.position ?? 0, text: feature?.text ?? "" }))
        .sort(byPosition),
    })),
    experts: toArray(payload?.experts).map((item) => ({
      position: item.position ?? 0,
      id: item.id,
      slug: item.slug,
      name: item.name,
      role: item.role,
      bio: item.bio,
      linkedinUrl: item.linkedin_url,
      imageUrl: item.image_url,
      highlights: toArray(item.payload?.highlights).map((text, idx) => ({ position: idx + 1, text })),
    })),
    testimonials: toArray(blockMap.get("testimonials")).map((item) => ({
      key: item.payload?.key ?? null,
      position: item.position,
      author: item.payload?.author ?? "",
      title: item.payload?.title ?? "",
      body: item.payload?.body ?? "",
      rating: item.payload?.rating ?? 0,
      sourceLabel: item.payload?.source_label ?? null,
    })),
    alumniSpotlights: toArray(blockMap.get("alumni_spotlights")).map((item) => ({
      key: item.payload?.key ?? null,
      position: item.position,
      name: item.payload?.name ?? "",
      beforeLabel: item.payload?.before_label ?? "",
      afterLabel: item.payload?.after_label ?? "",
      afterLogoUrl: item.payload?.after_logo_url ?? null,
      imageUrl: item.payload?.image_url ?? null,
      title: item.payload?.title ?? "",
      body: item.payload?.body ?? "",
      linkedinUrl: item.payload?.linkedin_url ?? null,
    })),
    audienceJobs: toArray(blockMap.get("audience_jobs")).map((item) => ({
      position: item.position,
      label: item.payload?.label ?? "",
    })),
    certification: mapCertification(blockMap),
    faqs: toArray(blockMap.get("faqs")).map((item) => ({
      key: item.payload?.key ?? null,
      position: item.position,
      question: item.payload?.question ?? "",
      answer: item.payload?.answer ?? "",
    })),
    relatedPrograms: toArray(payload?.related_programs).map((item) => ({
      ...(item.program
        ? {
            id: item.program.id,
            slug: item.program.slug,
            title: item.program.title,
            subtitle: item.program.subtitle,
            tags: toArray(item.program.tags),
            date: item.program.start_date_label,
            duration: item.program.duration_label,
            price: item.program.price_eur,
            image: item.program.image_url,
            featured: Boolean(item.program.is_featured),
          }
        : {}),
      position: item.position ?? 0,
      labelOverride: item.label_override ?? null,
    })),
  });
}

export async function getProgramPageBySlugV1(slug) {
  const supabase = getSupabaseServerClient();
  if (!supabase || !slug) return null;

  const { data, error } = await supabase.rpc("get_program_page_v1", { p_slug: slug });
  if (error || !data) {
    if (error) {
      const message = String(error.message || "");
      if (!message.toLowerCase().includes("fetch failed")) {
        console.warn(`[programPageV1Repository.getProgramPageBySlugV1] ${message}`);
      }
    }
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.program) return null;
  return mapProgramPageFromRpc(row);
}
