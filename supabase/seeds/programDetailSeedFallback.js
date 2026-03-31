export function buildFallbackProgramDetail(program) {
  if (!program) return null;

  return {
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra, tortor vel euismod eleifend, nisi elit viverra purus, non congue sem quam in mauris.",
    overviewSecondary:
      "Sed tincidunt, lacus ac faucibus ultrices, quam arcu pulvinar ipsum, nec tristique lacus erat sed lorem. Integer volutpat nunc vitae arcu tristique.",
    certificationTitle: `Certification Professionnelle ${program.title}`,
    certificationDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel molestie augue. Evaluation finale: projet, soutenance et QCM.",
    learningPath: [
      "Module 1: Fondamentaux et cadrage du domaine.",
      "Module 2: Outils, methodes et bonnes pratiques de production.",
      "Module 3: Cas d'usage avances et ateliers diriges.",
      "Module 4: Projet fil rouge et soutenance finale.",
    ],
    professors: [
      {
        name: "Nadia Renaud",
        role: "Lead Instructor",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod nibh non cursus convallis.",
      },
      {
        name: "Thomas Benali",
        role: "Expert Technique",
        bio: "Sed vitae nibh consequat, interdum orci vitae, posuere ipsum. Vivamus non purus ac nisi tempus sodales.",
      },
      {
        name: "Lea Marquet",
        role: "Mentor Projet",
        bio: "Vestibulum at nisl at leo sagittis molestie. Praesent tempus eros quis dui dignissim.",
      },
    ],
  };
}
