export const employabilityData = {
  title: "Propulsez votre vie professionnelle & personnelle",
  subtitle: "En maitrisant de nouvelles competences recherchees sur le marche du travail",
  rows: [
    {
      id: "salary",
      sourceTitle: "Selon PwC",
      sourceList: [
        "+56 % en moyenne pour les pros de l'IA",
        "Une demande qui ne cesse de croitre",
        "Un ecart salarial marque avec les autres",
      ],
      badge: { value: "+56%", label: "de plus sur votre salaire", className: "employability-badge employability-badge-salary" },
      reverse: false,
    },
    {
      id: "jobs",
      sourceTitle: "Selon Opiiec",
      sourceList: [
        "+175% de croissance du secteur blockchain d'ici 2028",
        "10 475 emplois prevus en France",
        "Une montee en puissance du Web3",
      ],
      sourceFooter: "Source : Opiiec",
      badge: { value: "+175%", label: "d'offres d'emploi", className: "employability-badge employability-badge-jobs" },
      reverse: true,
    },
  ],
};
