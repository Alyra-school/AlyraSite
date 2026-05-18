import { modularLearningCards, parcoursBlockchain, parcoursEntreprise, parcoursIA } from "../homeData";

export const learningData = {
  modular: {
    title: "Un parcours complet et modulable",
    subtitle:
      "Choisissez entre autonomie, coaching et lives pour progresser à votre rythme, jusqu'à 144h de formation.",
    cards: modularLearningCards,
  },
  tracks: {
    blockchain: {
      title: "Nos parcours blockchain",
      intro: "Retrouvez toutes les informations dont vous avez besoin sur notre page Formation Cryptomonnaie.",
      outro: "Obtenez toutes les compétences nécessaires pour rejoindre l'écosystème blockchain.",
      cards: parcoursBlockchain,
    },
    ia: {
      title: "Nos parcours IA",
      intro:
        "Retrouvez toutes les informations dont vous avez besoin sur notre page Formation Intelligence Artificielle.",
      outro: "Propulsez votre carrière dans l'ère du numérique avec nos formations en IA !",
      cards: parcoursIA,
      twoColumns: true,
    },
    enterprise: {
      title: "Nos parcours Entreprise",
      intro: "Renforcez la compétitivité de votre entreprise",
      outro: "en formant vos équipes à l'IA et à la blockchain.",
      cards: parcoursEntreprise,
      twoColumns: true,
      strongIntroWord: "compétitivité",
    },
  },
};
