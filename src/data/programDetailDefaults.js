export const HERO_TITLE_OVERRIDES = {
  "dev-blockchain": "Développement blockchain : concevoir, sécuriser, déployer",
  "expert-blockchain": "Consulting blockchain : analyser, structurer, piloter",
};

export const TRUSTED_SCORE_TEXT = "Excellent 4.9 sur 5 Trustpilot";
export const GOOGLE_SCORE_TEXT = "4.9/5 Google";

export const PROGRAM_FINANCING_LOGOS = [
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

export const DEFAULT_KPIS = [
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

export const DEFAULT_ALUMNI_SPOTLIGHTS = [
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

export const DEFAULT_AUDIENCE_JOBS = [
  { position: 1, label: "Développeurs blockchain" },
  { position: 2, label: "Tech lead / Architecte blockchain" },
  { position: 3, label: "Lead Developer" },
  { position: 4, label: "DevOps Engineer" },
  { position: 5, label: "Chefs de projets techniques" },
];

export const DEFAULT_CERTIFICATION = {
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
