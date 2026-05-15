/**
 * Normalizes the full program detail payload consumed by ProgramDetailPage.
 *
 * @typedef {Object} ProgramPageContent
 * @property {string|null} overview
 * @property {string|null} overviewSecondary
 * @property {string[]} heroBullets
 * @property {Array<Object>} ctas
 * @property {Array<Object>} proofLogos
 * @property {Array<Object>} kpis
 * @property {Array<Object>} learningItems
 * @property {Array<Object>} brochurePoints
 * @property {Array<Object>} modalities
 * @property {Array<Object>} experts
 * @property {Array<Object>} testimonials
 * @property {Array<Object>} alumniSpotlights
 * @property {Array<Object>} audienceJobs
 * @property {Object} certification
 * @property {Array<Object>} faqs
 * @property {Array<Object>} relatedPrograms
 */

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeProgramPageContent(content) {
  const source = content || {};

  return {
    overview: source.overview ?? null,
    overviewSecondary: source.overviewSecondary ?? null,
    certificationTitle: source.certificationTitle ?? null,
    certificationDescription: source.certificationDescription ?? null,
    learningPath: toArray(source.learningPath),
    professors: toArray(source.professors),
    heroBullets: toArray(source.heroBullets),
    ctas: toArray(source.ctas),
    proofLogos: toArray(source.proofLogos),
    kpis: toArray(source.kpis),
    learningItems: toArray(source.learningItems),
    brochurePoints: toArray(source.brochurePoints),
    modalities: toArray(source.modalities),
    experts: toArray(source.experts),
    testimonials: toArray(source.testimonials),
    alumniSpotlights: toArray(source.alumniSpotlights),
    audienceJobs: toArray(source.audienceJobs),
    certification: {
      meta: source.certification?.meta ?? null,
      prereqCards: toArray(source.certification?.prereqCards),
      prereqTools: toArray(source.certification?.prereqTools),
      prereqBullets: toArray(source.certification?.prereqBullets),
      competencies: toArray(source.certification?.competencies),
      objectives: toArray(source.certification?.objectives),
      evaluations: toArray(source.certification?.evaluations),
      validationRules: toArray(source.certification?.validationRules),
    },
    faqs: toArray(source.faqs),
    relatedPrograms: toArray(source.relatedPrograms),
  };
}
