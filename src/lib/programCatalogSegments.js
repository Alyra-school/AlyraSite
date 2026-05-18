export const programSegmentConfigs = {
  blockchain: {
    slug: "blockchain",
    title: "Formations Blockchain",
    description:
      "Découvrez nos formations blockchain : développement, consulting et finance décentralisée pour monter en compétence rapidement.",
    introTitle: "Catalogue des formations blockchain",
    introText:
      "Explorez nos parcours blockchain pour maîtriser les fondamentaux Web3, développer des applications décentralisées et structurer des projets concrets.",
    bottomTitle: "Pourquoi choisir une formation blockchain chez Alyra ?",
    bottomText:
      "Nos formations blockchain sont conçues pour répondre aux besoins du marché : compétences techniques, vision produit et mise en pratique métier.",
    seoLinks: [
      { label: "Voir toutes les formations", href: "/formations" },
      { label: "Financer votre formation", href: "/financement" },
      { label: "Prendre rendez-vous", href: "/rendez-vous" },
    ],
    predicate: (program) =>
      (program.tags || []).some((tag) =>
        String(tag).toLowerCase().includes("blockchain")
      ),
  },
  ia: {
    slug: "intelligence-artificielle",
    title: "Formations IA",
    description:
      "Retrouvez nos formations IA pour apprendre l’intelligence artificielle, du consulting à la mise en production.",
    introTitle: "Catalogue des formations IA",
    introText:
      "Parcourez nos formations IA pour comprendre les usages métier, structurer vos projets data et déployer des solutions d’intelligence artificielle.",
    bottomTitle: "Des formations IA orientées impact",
    bottomText:
      "Nos parcours IA combinent théorie, pratique et accompagnement pour accélérer votre montée en compétence sur les cas d’usage réels.",
    seoLinks: [
      { label: "Voir toutes les formations", href: "/formations" },
      { label: "Découvrir nos articles IA", href: "/blog" },
      { label: "Prendre rendez-vous", href: "/rendez-vous" },
    ],
    predicate: (program) =>
      (program.tags || []).some((tag) => {
        const value = String(tag).toLowerCase();
        return value === "ia" || value.includes("intelligence artificielle");
      }),
  },
  gratuites: {
    slug: "gratuites",
    title: "Formations Gratuites",
    description:
      "Accédez à nos formations gratuites pour découvrir la blockchain et l’IA avant de poursuivre un parcours certifiant.",
    introTitle: "Catalogue des formations gratuites",
    introText:
      "Retrouvez les formations gratuites Alyra pour tester votre intérêt, découvrir les bases et commencer votre parcours sans engagement financier.",
    bottomTitle: "Commencer gratuitement, progresser durablement",
    bottomText:
      "Les formations gratuites vous permettent d’explorer les technologies avant de choisir un parcours long adapté à votre objectif professionnel.",
    seoLinks: [
      { label: "Voir toutes les formations", href: "/formations" },
      { label: "Nos formations IA", href: "/formations/intelligence-artificielle" },
      { label: "Nos formations blockchain", href: "/formations/blockchain" },
    ],
    predicate: (program) => Number(program.price) === 0,
  },
  entreprises: {
    slug: "entreprises",
    title: "Formations Entreprises",
    description:
      "Découvrez nos formations entreprises pour former vos équipes à la blockchain et à l’intelligence artificielle.",
    introTitle: "Catalogue des formations entreprises",
    introText:
      "Ces formations entreprises sont pensées pour les organisations qui souhaitent développer les compétences blockchain et IA de leurs équipes.",
    bottomTitle: "Former vos équipes avec un parcours adapté",
    bottomText:
      "Nos formats entreprises s’adaptent à vos contraintes, avec un accompagnement sur mesure et des contenus applicables à vos enjeux métier.",
    seoLinks: [
      { label: "Parler à un conseiller", href: "/rendez-vous" },
      { label: "Solutions de financement", href: "/financement" },
      { label: "Toutes nos formations", href: "/formations" },
    ],
    predicate: (program) =>
      (program.tags || []).some((tag) =>
        String(tag).toLowerCase().includes("entreprise")
      ),
  },
};

export function getProgramSegmentPrograms(programs, segmentKey) {
  const config = programSegmentConfigs[segmentKey];
  if (!config) return [];
  return programs.filter((program) => config.predicate(program));
}

