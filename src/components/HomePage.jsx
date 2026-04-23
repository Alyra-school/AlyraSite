"use client";

import HeroSection from "./home/sections/HeroSection";
import RecruitersMarqueeSection from "./home/sections/RecruitersMarqueeSection";
import EmployabilitySection from "./home/sections/EmployabilitySection";
import ModularLearningSection from "./home/sections/ModularLearningSection";
import PedagogySection from "./home/sections/PedagogySection";
import CertificationSection from "./home/sections/CertificationSection";
import ExpertsSection from "./home/sections/ExpertsSection";
import LearnerFeedbackSection from "./home/sections/LearnerFeedbackSection";
import DistanceLearningSection from "./home/sections/DistanceLearningSection";
import FinancingSupportSection from "./home/sections/FinancingSupportSection";
import DiscordSection from "./home/sections/DiscordSection";
import WhyTechSection from "./home/sections/WhyTechSection";
import FreeCoursesSection from "./home/sections/FreeCoursesSection";
import AlyraTeamSection from "./home/sections/AlyraTeamSection";
import PressMarqueeSection from "./home/sections/PressMarqueeSection";
import BlogRecapSection from "./home/sections/BlogRecapSection";

export default function HomePage() {
  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <HeroSection />
      <RecruitersMarqueeSection />
      <EmployabilitySection />
      <ModularLearningSection />
      <PedagogySection />
      <CertificationSection />
      <ExpertsSection />
      <LearnerFeedbackSection />
      <DistanceLearningSection />
      <FinancingSupportSection />
      <DiscordSection />
      <WhyTechSection />
      <FreeCoursesSection />
      <AlyraTeamSection />
      <PressMarqueeSection />
      <BlogRecapSection />
    </main>
  );
}
