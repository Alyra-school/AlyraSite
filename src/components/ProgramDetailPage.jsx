"use client";

import Link from "next/link";
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

function formatPrice(price) {
  if (Number.isFinite(price)) return `${price.toLocaleString("fr-FR")} EUR`;
  return "Sur devis";
}

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
  const defaultKpis = [
    {
      position: 1,
      value: "50K€/an",
      label: "Rémunération",
      description: "54% de l'ensemble de nos alumni gagnent plus de 50K€/an",
    },
    {
      position: 2,
      value: "87%",
      label: "Retour à l'emploi",
      description: "De retour à l'emploi sous 6 mois",
    },
    {
      position: 3,
      value: "+2500",
      label: "Communauté",
      description: "Alumni forment la communauté Alyra",
    },
  ];

  const applyCta = ctas.find((item) => item.key === "apply") ?? null;
  const webinarCta = ctas.find((item) => item.key === "webinar") ?? null;
  const heroCompanies = proofLogos.length > 0
    ? proofLogos.map((item) => ({ name: item.label, logo: item.imageUrl }))
    : recruiterCompanies;

  const heroTitleOverrides = {
    "dev-blockchain": "Développement blockchain : concevoir, sécuriser, déployer",
    "expert-blockchain": "Consulting blockchain : analyser, structurer, piloter",
  };
  const heroTitle = heroTitleOverrides[program.slug] ?? program.title;

  const trustedScoreText = "Excellent 4.9 sur 5 Trustpilot";
  const googleScoreText = "4.9/5 Google";
  const programFinancingLogos = [
    { id: "cpf", name: "Mon Compte Formation", logo: "/inspired/finance/cpf.png" },
    { id: "atlas", name: "Atlas", logo: "/inspired/cert/atlas.png" },
    { id: "syntec", name: "Federation Syntec", label: "FEDERATION SYNTEC" },
    { id: "cinov", name: "Cinov", label: "cinov" },
    { id: "france-travail", name: "France Travail", label: "France Travail" },
    { id: "transitions", name: "Transitions Pro", logo: "/inspired/finance/transitions.png" },
    { id: "agefice", name: "AGEFICE", logo: "/inspired/finance/agefice.jpg" },
    { id: "afdas", name: "AFDAS", logo: "/inspired/finance/afdas.png" },
    { id: "opcommerce", name: "Opcommerce", logo: "/inspired/finance/opcommerce.png" },
  ];
  const defaultAlumniSpotlights = [
    {
      key: "lois-lagoutte",
      name: "Loïs Lagoutte",
      beforeLabel: "Alyra",
      afterLabel: "Allfeat",
      imageUrl: "/inspired/team/cyril.avif",
      title: "Développeur d'une nouvelle industrie musicale",
      body: "Après une première expérience technique, Loïs s'est formé chez Alyra pour développer ses compétences blockchain et contribuer à des projets Web3 concrets.",
    },
    {
      key: "nicolas-fruneau",
      name: "Nicolas Fruneau",
      beforeLabel: "Alyra",
      afterLabel: "DOGA",
      imageUrl: "/inspired/team/gaetan.avif",
      title: "Le futur du Web3 et du jeu vidéo",
      body: "Développeur spécialisé frontend, Nicolas évolue au cœur des écosystèmes gaming et blockchain après sa formation chez Alyra.",
      linkedinUrl: "https://www.linkedin.com",
    },
    {
      key: "julie-morel",
      name: "Julie Morel",
      beforeLabel: "Alyra",
      afterLabel: "Web3",
      imageUrl: "/inspired/team/christian.avif",
      title: "Product builder dans l’écosystème blockchain",
      body: "Julie a transformé sa curiosité pour les technologies décentralisées en expertise projet, avec une approche terrain et produit.",
    },
    {
      key: "amine-benali",
      name: "Amine Benali",
      beforeLabel: "Alyra",
      afterLabel: "DeFi",
      imageUrl: "/inspired/team/daniel.avif",
      title: "Consultant tokenomics et finance décentralisée",
      body: "Amine accompagne désormais des équipes sur la structuration de protocoles, la sécurité économique et les usages DeFi.",
    },
  ];
  const defaultAudienceJobs = [
    { position: 1, label: "Développeurs blockchain" },
    { position: 2, label: "Tech lead / Architecte blockchain" },
    { position: 3, label: "Lead Developer" },
    { position: 4, label: "DevOps Engineer" },
    { position: 5, label: "Chefs de projets techniques" },
  ];
  const defaultCertification = {
    meta: {
      headlinePrefix: "La certification enregistrée par",
      headlineAccent: "France Compétence",
      badgeImageUrl: "/inspired/cert/france-competences.webp",
      badgeAlt: "France compétences - certification enregistrée au RNCP",
      introLabel: "Formation menant à l'acquisition du bloc de compétences BC02 du RNCP39717",
      introTitle: "Certification blockchain reconnue en France pour les développeurs",
      introDescription:
        "Fort de près de 6 années d’expérience dans la formation blockchain, Alyra est aujourd'hui le leader de la formation aux nouvelles technologies.",
      introReference: "RNCP39717BC02 “Mettre en œuvre une architecture blockchain” de AD EDUCATION",
      trustpilotScore: "4.9 sur 5",
      trustpilotLabel: "Trustpilot",
    },
    prereqCards: [
      { position: 1, iconKey: "lock", text: "Une maîtrise des outils informatiques et un usage autonome du numérique." },
      { position: 2, iconKey: "degree", text: "Être titulaire a minima d’un diplôme de niveau 5, ou validation dossier." },
    ],
    prereqTools: [
      { position: 1, iconKey: "laptop", label: "Un ordinateur (ou une tablette)" },
      { position: 2, iconKey: "mic", label: "Un micro" },
      { position: 3, iconKey: "webcam", label: "Une webcam" },
      { position: 4, iconKey: "wifi", label: "Une connexion internet suffisante" },
    ],
    prereqBullets: [
      { position: 1, text: "Ce parcours certifiant vous prépare à maîtriser les aspects techniques, juridiques et financiers." },
      { position: 2, text: "Utilisez les outils professionnels du Web3 et échangez avec des expert·e·s en sessions live." },
    ],
    competencies: [
      { position: 1, title: "Compétence 1", description: "Créer une architecture robuste et modulaire, en respectant la réglementation en vigueur." },
      { position: 2, title: "Compétence 2", description: "Concevoir la structure d’un smart-contract et définir les fonctions adaptées." },
      { position: 3, title: "Compétence 3", description: "Sélectionner les standards et bibliothèques nécessaires au projet." },
      { position: 4, title: "Compétence 4", description: "Sécuriser un smart-contract via les principes fondamentaux de cryptographie." },
      { position: 5, title: "Compétence 5", description: "Évaluer la fiabilité d’oracles externes dans une architecture blockchain." },
      { position: 6, title: "Compétence 6", description: "Planifier la gestion des erreurs et la maintenance d’un smart-contract." },
    ],
    objectives: [
      { position: 1, text: "Concevoir une architecture blockchain modulaire et évolutive." },
      { position: 2, text: "Réaliser une analyse fonctionnelle complète." },
      { position: 3, text: "Définir la structure d’un smart contract." },
      { position: 4, text: "Sélectionner les frameworks et standards adaptés." },
      { position: 5, text: "Intégrer les principes de cryptographie dans la conception." },
      { position: 6, text: "Évaluer et tester la fiabilité des oracles externes." },
      { position: 7, text: "Anticiper la gestion des erreurs tout au long du développement." },
    ],
    evaluations: [
      {
        position: 1,
        title: "Mise en situation professionnelle reconstituée",
        description:
          "Mise en situation sur étude de cas avec présentation orale devant le jury. Le candidat conçoit un projet et le présente pour certification.",
      },
    ],
    validationRules: [
      { position: 1, text: "Le/La candidat(e) doit avoir suivi la formation dans son intégralité." },
      { position: 2, text: "L’ensemble des livrables requis doit être remis avant la date de l’examen." },
    ],
  };

  const learningSectionItems = learningItems.length > 0 ? learningItems.map((item) => item.text) : legacyLearningPath;
  const expertsSectionItems = experts.length > 0 ? experts : legacyProfessors;
  const relatedPrograms = relatedProgramsFromDb.length > 0 ? relatedProgramsFromDb : similarPrograms;
  const kpiItems = kpis.length > 0 ? kpis : defaultKpis;
  const alumniSpotlightItems = alumniSpotlights.length > 0 ? alumniSpotlights : defaultAlumniSpotlights;
  const audienceJobItems = audienceJobs.length > 0 ? audienceJobs : defaultAudienceJobs;
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
    meta: certificationContent.meta ?? defaultCertification.meta,
    prereqCards: certificationContent.prereqCards?.length > 0 ? certificationContent.prereqCards : defaultCertification.prereqCards,
    prereqTools: certificationContent.prereqTools?.length > 0 ? certificationContent.prereqTools : defaultCertification.prereqTools,
    prereqBullets:
      certificationContent.prereqBullets?.length > 0 ? certificationContent.prereqBullets : defaultCertification.prereqBullets,
    competencies:
      certificationContent.competencies?.length > 0 ? certificationContent.competencies : defaultCertification.competencies,
    objectives: certificationContent.objectives?.length > 0 ? certificationContent.objectives : defaultCertification.objectives,
    evaluations:
      certificationContent.evaluations?.length > 0 ? certificationContent.evaluations : defaultCertification.evaluations,
    validationRules:
      certificationContent.validationRules?.length > 0
        ? certificationContent.validationRules
        : defaultCertification.validationRules,
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
            trustedScoreText={trustedScoreText}
            googleScoreText={googleScoreText}
            isContentLoading={isContentLoading}
            detailContent={detailContent}
          />

          {heroCompanies.length > 0 ? (
            <section className="program-hero-companies" aria-label="Entreprises qui recrutent nos apprenants">
              <h2><span className="hero-accent">Nos apprenants formés en blockchain</span> sont demandés par :</h2>
              <div className="company-marquee">
                <div className="company-track">
                  {[...heroCompanies, ...heroCompanies].map((company, index) => (
                    <article key={`program-hero-company-${company.name}-${index}`} className="company-item company-item-marquee">
                      <img src={company.logo} alt={`Logo ${company.name}`} width="196" height="48" loading="lazy" decoding="async" />
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <ProgramSalesNav programTitle={program.title} />

          <ProgramKpiSection programId={program.id} items={kpiItems} />

          <ProgramLearningSection programId={program.id} items={learningSectionItems} />

          <ProgramBrochureSection programId={program.id} programImage={program.image} brochurePoints={brochurePoints} />
          <ProgramModalitiesSection programId={program.id} modalities={modalities} />
          <ProgramFinancingStripSection logos={programFinancingLogos} />

          <ProgramAlumniCarousel items={alumniSpotlightItems} />

          <ProgramAudienceSection programId={program.id} jobs={audienceJobItems} />

          <ProgramReferentsSection programId={program.id} referents={referentItems} />

          <ProgramExpertsCarousel items={expertsSectionItems} />

          <ProgramTestimonialsCarousel items={testimonials} />

          <ProgramCertificationSection programTitle={program.title} certification={certification} />

          {faqs.length > 0 ? (
            <section className="section program-section">
              <div className="section-head">
                <span className="program-eyebrow">FAQ</span>
                <h2>Questions frequentes</h2>
              </div>
              <div className="program-faq-grid">
                {faqs.map((item) => (
                  <article key={`${program.id}-faq-${item.key}`} className="card">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {relatedPrograms.length > 0 ? (
            <section className="section program-section">
              <div className="section-head">
                <span className="program-eyebrow">Catalogue</span>
                <h2>Decouvrez nos autres formations</h2>
              </div>
              <div className="program-related-grid">
                {relatedPrograms.map((item) => (
                  <article key={`${program.id}-related-${item.id}`} className="card program-related-card">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="program-related-image"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <h3>{item.labelOverride ?? item.title}</h3>
                    <p>{item.subtitle}</p>
                    <div className="card-meta">
                      <span>{item.duration}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                    <Link className="text-button" href={`/formations/${item.slug}`}>
                      Voir cette formation
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
