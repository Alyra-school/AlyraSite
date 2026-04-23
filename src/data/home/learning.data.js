import { modularLearningCards, parcoursBlockchain, parcoursEntreprise, parcoursIA } from "../homeData";

export const learningData = {
  modular: {
    title: "Un parcours complet et modulable",
    subtitle:
      "Choisissez entre autonomie, coaching et lives pour progresser a votre rythme, jusqu'a 144h de formation.",
    cards: modularLearningCards,
  },
  tracks: {
    blockchain: {
      title: "Nos parcours blockchain",
      intro: "Retrouvez toutes les informations dont vous avez besoin sur notre page Formation Cryptomonnaie.",
      outro: "Obtenez toutes les competences necessaires pour rejoindre l'ecosysteme blockchain.",
      cards: parcoursBlockchain,
    },
    ia: {
      title: "Nos parcours IA",
      intro:
        "Retrouvez toutes les informations dont vous avez besoin sur notre page Formation Intelligence Artificielle.",
      outro: "Propulsez votre carriere dans l'ere du numerique avec nos formations en IA !",
      cards: parcoursIA,
      twoColumns: true,
    },
    enterprise: {
      title: "Nos parcours Entreprise",
      intro: "Renforcez la competitivite de votre entreprise",
      outro: "en formant vos equipes a l'IA et a la blockchain.",
      cards: parcoursEntreprise,
      twoColumns: true,
      strongIntroWord: "competitivite",
    },
  },
};
