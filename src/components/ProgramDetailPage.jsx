"use client";

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
import { buildProgramDetailViewModel } from "../lib/content/programDetailViewModel";
import {
  PROGRAM_FINANCING_LOGOS,
} from "../data/programDetailDefaults";

export default function ProgramDetailPage({
  program,
  similarPrograms,
  detailContent,
  isContentLoading,
}) {
  const vm = buildProgramDetailViewModel(program, detailContent, similarPrograms);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero hero-program">
        <div className="program-page">
          <ProgramHeroSection
            program={program}
            heroTitle={vm.heroTitle}
            heroBullets={vm.heroBullets}
            webinarCta={vm.webinarCta}
            applyCta={vm.applyCta}
            trustedScoreText={vm.trustedScoreText}
            googleScoreText={vm.googleScoreText}
            isContentLoading={isContentLoading}
            detailContent={detailContent}
          />

          <ProgramHeroCompaniesSection companies={vm.heroCompanies} />

          <ProgramSalesNav programTitle={program.title} />

          <ProgramKpiSection programId={program.id} items={vm.kpiItems} />

          <ProgramLearningSection programId={program.id} items={vm.learningItems} />

          <ProgramBrochureSection programId={program.id} programImage={program.image} brochurePoints={vm.brochurePoints} />
          <ProgramModalitiesSection programId={program.id} modalities={vm.modalities} />
          <ProgramFinancingStripSection logos={PROGRAM_FINANCING_LOGOS} />

          <ProgramAlumniCarousel items={vm.alumniSpotlights} />

          <ProgramAudienceSection programId={program.id} jobs={vm.audienceJobs} />

          <ProgramReferentsSection programId={program.id} referents={vm.referentItems} />

          <ProgramExpertsCarousel items={vm.expertsItems} />

          <ProgramTestimonialsCarousel items={vm.testimonials} />

          <ProgramCertificationSection programTitle={program.title} certification={vm.certification} />

          <ProgramFaqSection programId={program.id} faqs={vm.faqs} />
          <ProgramRelatedSection programId={program.id} relatedPrograms={vm.relatedPrograms} />
        </div>
      </section>
    </main>
  );
}
