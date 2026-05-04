"use client";

import { recruiterCompanies } from "../data/homeData";
import ProgramAlumniCarousel from "./program-detail/ProgramAlumniCarousel";
import ProgramExpertsCarousel from "./program-detail/ProgramExpertsCarousel";
import ProgramTestimonialsCarousel from "./program-detail/ProgramTestimonialsCarousel";
import ProgramCertificationSection from "./program-detail/ProgramCertificationSection";
import ProgramSalesNav from "./program-detail/ProgramSalesNav";
import ProgramAudienceSection from "./program-detail/ProgramAudienceSection";
import ProgramReferentsSection from "./program-detail/ProgramReferentsSection";
import ProgramHeroSection from "./program-detail/ProgramHeroSection";
import ProgramKpiSection from "./program-detail/ProgramKpiSection";
import ProgramLearningSection from "./program-detail/ProgramLearningSection";
import ProgramBrochureSection from "./program-detail/ProgramBrochureSection";
import ProgramModalitiesSection from "./program-detail/ProgramModalitiesSection";
import ProgramFinancingStripSection from "./program-detail/ProgramFinancingStripSection";
import ProgramFaqSection from "./program-detail/ProgramFaqSection";
import ProgramRelatedSection from "./program-detail/ProgramRelatedSection";
import ProgramHeroCompaniesSection from "./program-detail/ProgramHeroCompaniesSection";
import {
  DEFAULT_ALUMNI_SPOTLIGHTS,
  DEFAULT_AUDIENCE_JOBS,
  DEFAULT_CERTIFICATION,
  DEFAULT_KPIS,
  GOOGLE_SCORE_TEXT,
  HERO_TITLE_OVERRIDES,
  PROGRAM_FINANCING_LOGOS,
  TRUSTED_SCORE_TEXT,
} from "../data/programDetailDefaults";

export default function ProgramDetailPage({
  program,
  similarPrograms,
  detailContent,
  isContentLoading,
}) {
  const legacyProfessors = detailContent?.professors ?? [];
  const legacyLearningPath = detailContent?.learningPath ?? [];

  const heroBullets = detailContent?.heroBullets ?? [];
  const ctas = detailContent?.ctas ?? [];
  const proofLogos = detailContent?.proofLogos ?? [];
  const kpis = detailContent?.kpis ?? [];
  const learningItems = detailContent?.learningItems ?? [];
  const brochurePoints = detailContent?.brochurePoints ?? [];
  const modalities = detailContent?.modalities ?? [];
  const experts = detailContent?.experts ?? [];
  const testimonials = detailContent?.testimonials ?? [];
  const alumniSpotlights = detailContent?.alumniSpotlights ?? [];
  const audienceJobs = detailContent?.audienceJobs ?? [];
  const certificationContent = detailContent?.certification ?? {};
  const faqs = detailContent?.faqs ?? [];
  const relatedProgramsFromDb = detailContent?.relatedPrograms ?? [];
  const applyCta = ctas.find((item) => item.key === "apply") ?? null;
  const webinarCta = ctas.find((item) => item.key === "webinar") ?? null;
  const heroCompanies = proofLogos.length > 0
    ? proofLogos.map((item) => ({ name: item.label, logo: item.imageUrl }))
    : recruiterCompanies;
  const heroTitle = HERO_TITLE_OVERRIDES[program.slug] ?? program.title;

  const learningSectionItems = learningItems.length > 0 ? learningItems.map((item) => item.text) : legacyLearningPath;
  const expertsSectionItems = experts.length > 0 ? experts : legacyProfessors;
  const relatedPrograms = relatedProgramsFromDb.length > 0 ? relatedProgramsFromDb : similarPrograms;
  const kpiItems = kpis.length > 0 ? kpis : DEFAULT_KPIS;
  const alumniSpotlightItems = alumniSpotlights.length > 0 ? alumniSpotlights : DEFAULT_ALUMNI_SPOTLIGHTS;
  const audienceJobItems = audienceJobs.length > 0 ? audienceJobs : DEFAULT_AUDIENCE_JOBS;
  const referentItems = expertsSectionItems
    .filter((expert) => expert && typeof expert === "object")
    .slice(0, 2)
    .map((expert, index) => ({
      ...expert,
      highlights:
        expert.highlights?.length > 0
          ? expert.highlights
          : [
              { position: 1, text: index === 0 ? "Formateur / auteur chez Alyra" : "Blockchain Fullstack Developer" },
              { position: 2, text: index === 0 ? "Expert terrain et accompagnement projet" : "Créateur de contenus Web3" },
              { position: 3, text: index === 0 ? "Spécialiste blockchain et architecture" : "Mentor technique blockchain" },
            ],
    }));
  const certification = {
    meta: certificationContent.meta ?? DEFAULT_CERTIFICATION.meta,
    prereqCards: certificationContent.prereqCards?.length > 0 ? certificationContent.prereqCards : DEFAULT_CERTIFICATION.prereqCards,
    prereqTools: certificationContent.prereqTools?.length > 0 ? certificationContent.prereqTools : DEFAULT_CERTIFICATION.prereqTools,
    prereqBullets:
      certificationContent.prereqBullets?.length > 0 ? certificationContent.prereqBullets : DEFAULT_CERTIFICATION.prereqBullets,
    competencies:
      certificationContent.competencies?.length > 0 ? certificationContent.competencies : DEFAULT_CERTIFICATION.competencies,
    objectives: certificationContent.objectives?.length > 0 ? certificationContent.objectives : DEFAULT_CERTIFICATION.objectives,
    evaluations:
      certificationContent.evaluations?.length > 0 ? certificationContent.evaluations : DEFAULT_CERTIFICATION.evaluations,
    validationRules:
      certificationContent.validationRules?.length > 0
        ? certificationContent.validationRules
        : DEFAULT_CERTIFICATION.validationRules,
  };

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero hero-program">
        <div className="program-page">
          <ProgramHeroSection
            program={program}
            heroTitle={heroTitle}
            heroBullets={heroBullets}
            webinarCta={webinarCta}
            applyCta={applyCta}
            trustedScoreText={TRUSTED_SCORE_TEXT}
            googleScoreText={GOOGLE_SCORE_TEXT}
            isContentLoading={isContentLoading}
            detailContent={detailContent}
          />

          <ProgramHeroCompaniesSection companies={heroCompanies} />

          <ProgramSalesNav programTitle={program.title} />

          <ProgramKpiSection programId={program.id} items={kpiItems} />

          <ProgramLearningSection programId={program.id} items={learningSectionItems} />

          <ProgramBrochureSection programId={program.id} programImage={program.image} brochurePoints={brochurePoints} />
          <ProgramModalitiesSection programId={program.id} modalities={modalities} />
          <ProgramFinancingStripSection logos={PROGRAM_FINANCING_LOGOS} />

          <ProgramAlumniCarousel items={alumniSpotlightItems} />

          <ProgramAudienceSection programId={program.id} jobs={audienceJobItems} />

          <ProgramReferentsSection programId={program.id} referents={referentItems} />

          <ProgramExpertsCarousel items={expertsSectionItems} />

          <ProgramTestimonialsCarousel items={testimonials} />

          <ProgramCertificationSection programTitle={program.title} certification={certification} />

          <ProgramFaqSection programId={program.id} faqs={faqs} />
          <ProgramRelatedSection programId={program.id} relatedPrograms={relatedPrograms} />
        </div>
      </section>
    </main>
  );
}
