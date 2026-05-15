import {
  GOOGLE_SCORE_TEXT,
  HERO_TITLE_OVERRIDES,
  TRUSTED_SCORE_TEXT,
} from "../../data/programDetailDefaults";

export function buildProgramDetailViewModel(program, detailContent, similarPrograms) {
  const content = detailContent || {};
  const ctas = content.ctas || [];
  const experts = content.experts || [];
  const normalizedLearningItems = (content.learningItems || content.learningPath || []).map((item) =>
    typeof item === "string" ? item : item?.text || ""
  ).filter(Boolean);

  const applyCta = ctas.find((item) => item.key === "apply") || null;
  const webinarCta = ctas.find((item) => item.key === "webinar") || null;
  const heroCompanies = (content.proofLogos || []).map((item) => ({ name: item.label, logo: item.imageUrl }));

  const referentItems = experts
    .filter((expert) => expert && typeof expert === "object")
    .slice(0, 2)
    .map((expert) => ({ ...expert, highlights: expert.highlights || [] }));

  return {
    heroTitle: HERO_TITLE_OVERRIDES[program.slug] || program.title,
    trustedScoreText: TRUSTED_SCORE_TEXT,
    googleScoreText: GOOGLE_SCORE_TEXT,
    webinarCta,
    applyCta,
    heroCompanies,
    heroBullets: content.heroBullets || [],
    kpiItems: content.kpis || [],
    learningItems: normalizedLearningItems,
    brochurePoints: content.brochurePoints || [],
    modalities: content.modalities || [],
    alumniSpotlights: content.alumniSpotlights || [],
    audienceJobs: content.audienceJobs || [],
    expertsItems: experts,
    referentItems,
    testimonials: content.testimonials || [],
    certification: content.certification || {},
    faqs: content.faqs || [],
    relatedPrograms: (content.relatedPrograms || []).length > 0 ? content.relatedPrograms : similarPrograms,
  };
}
