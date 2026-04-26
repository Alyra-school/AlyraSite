"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import FinancingSupportSection from "../../src/components/home/sections/FinancingSupportSection";
import { staticPagesData } from "../../src/data/staticPagesData";
import styles from "./FinancingPage.module.css";

const financingDetailsByProfile = {
  cpf: {
    title: "Les differents types de financements pour",
    accent: "salaries",
    intro: "Vous pouvez obtenir un soutien financier pour votre formation. Voici les possibilites de financement :",
    groupTitle: "Nos partenaires",
    groupIntro:
      "Nous travaillons avec une serie de partenaires pour aider nos apprenants a financer leur formation. Actuellement, les moyens de faire financer votre formation sont les suivants :",
    cards: [
      {
        id: "cpf-card",
        title: "CPF",
        text:
          "Le CPF permet a toute personne active d'acquerir des droits pour la formation tout au long de sa carriere, depuis leur entree sur le marche du travail jusqu'au moment ou ils prennent leur retraite. L'objectif du CPF est d'aider les individus a maintenir leur employabilite et securiser leur parcours professionnel.",
        logo: "/inspired/finance/cpf.png",
        logoAlt: "Logo Mon Compte Formation",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.moncompteformation.gouv.fr/",
      },
      {
        id: "atlas-card",
        title: "OPCO Atlas",
        text:
          "L'Opco Atlas est un organisme agree par l'Etat qui finance l'apprentissage et les certifications professionnelles. Ils aident les branches professionnelles et les PME dans la definition de leurs besoins en formation. Il represente 196 000 entreprises et plus de 2 millions de salaries sur l'ensemble du territoire metropolitain.",
        logo: "/inspired/cert/atlas.png",
        logoAlt: "Logo Atlas",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.opco-atlas.fr/",
      },
      {
        id: "alma-card",
        title: "Alma",
        text: "Grace a Alma et Alyra, payez en une, deux, trois ou quatre fois votre formation.",
        logoLabel: "Alma",
        ctaLabel: "En savoir plus",
        ctaHref: "https://almapay.com/fr-FR",
      },
      {
        id: "agefiph-card",
        title: "AGEFIPH",
        text:
          "L'AGEFIPH (Association de Gestion du Fonds pour l'Insertion Professionnelle des Personnes Handicapees) a pour mission de favoriser l'insertion professionnelle et le maintien dans l'emploi des personnes en situation de handicap dans le secteur prive.",
        logoLabel: "agefiph",
        logoVariant: "agefiph",
      },
      {
        id: "syntec-cinov-card",
        title: "Convention SYNTEC / CINOV",
        text: "Votre formation Blockchain et IA a portee de clic.",
        logoLabel: "Federation SYNTEC + Atlas + Cinov",
        logoVariant: "syntec",
      },
      {
        id: "transition-pro-card",
        title: "Projet de Transition Professionnel",
        text:
          "Le PTP est un moyen de changer de vie en donnant aux salaries la liberte de choisir leur avenir professionnel. Formation financee, contrat de travail et salaire maintenus, parcours de formation individualise : avec le PTP, tout est fait pour changer de metier en toute securite.",
        logo: "/inspired/finance/transitions.png",
        logoAlt: "Logo Transitions Pro",
        logoVariant: "transition",
      },
      {
        id: "opco-ep-card",
        title: "OPCO EP",
        text:
          "Les OPCO sont des organismes agrees par l'Etat qui financent l'apprentissage et les certifications professionnelles. Ils aident les branches professionnelles et les PME dans la definition de leurs besoins en formation. Les conseils d'administration des OPCO comprennent des representants des employeurs et des salaries. Ils sont supervises par un commissaire du gouvernement.",
        logoLabel: "OPCO EP",
        logoVariant: "opcoep",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.opcoep.fr/",
      },
    ],
  },
  "opco-entreprise": {
    title: "Les differents financements pour",
    accent: "demandeur d'emploi",
    headline: "Beneficiez de -200€",
    intro: "Vous avez la possibilite d'acceder a des financements publics. Voici les possibilites de financement :",
    checklist: [
      "par le biais de Pole Emploi",
      "par le biais de votre compte professionnel de formation (CPF)",
      "par le biais de la region",
      "en fonds propres (CB, virement, crypto)",
    ],
    groupTitle: "Nos partenaires",
    groupIntro:
      "Nous travaillons avec une serie de partenaires pour aider nos apprenants a financer leur formation. Actuellement, les moyens de faire financer votre formation sont les suivants :",
    cards: [
      {
        id: "aif-card",
        title: "France Travail (demande AIF)",
        text:
          "L'AIF est une aide financiere pour les demandeurs d'emploi pour couvrir les couts de formation. Elle peut etre demandee si vous avez un financement incomplet ou si aucun financement ne peut couvrir les frais. L'AIF peut couvrir le reste a charge ou la totalite des couts, a condition que la formation soit en adequation avec le Projet Personnalise d'Acces a l'Emploi.",
        logoLabel: "France Travail",
        logoVariant: "francetravailAif",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.francetravail.fr/",
      },
      {
        id: "demandeur-cpf-card",
        title: "CPF",
        text:
          "Le CPF permet a toute personne active d'acquerir des droits pour la formation tout au long de sa carriere, depuis leur entree sur le marche du travail jusqu'au moment ou ils prennent leur retraite. L'objectif du CPF est d'aider les individus a maintenir leur employabilite et securiser leur parcours professionnel.",
        logo: "/inspired/finance/cpf.png",
        logoAlt: "Logo Mon Compte Formation",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.moncompteformation.gouv.fr/",
      },
      {
        id: "aire-card",
        title: "AIRE",
        text:
          "Decouvrez comment l'AIRE peut vous aider a financer, partiellement ou integralement, votre formation. Cette aide, disponible dans la majorite des regions francaises, vise a faciliter votre acces ou retour a l'emploi, ou encore a ameliorer votre niveau de qualification.",
        logoLabel: "France Travail",
        logoVariant: "francetravailAire",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.francetravail.fr/",
      },
      {
        id: "demandeur-alma-card",
        title: "Alma",
        text: "Grace a Alma et Alyra, payez en une, deux, trois ou quatre fois votre formation.",
        logoLabel: "Alma",
        ctaLabel: "En savoir plus",
        ctaHref: "https://almapay.com/fr-FR",
      },
      {
        id: "demandeur-agefiph-card",
        title: "AGEFIPH",
        text:
          "L'AGEFIPH (Association de Gestion du Fonds pour l'Insertion Professionnelle des Personnes Handicapees) a pour mission de favoriser l'insertion professionnelle et le maintien dans l'emploi des personnes en situation de handicap dans le secteur prive.",
        logoLabel: "agefiph",
        logoVariant: "agefiph",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.agefiph.fr/",
      },
      {
        id: "pariscode-card",
        title: "ParisCode",
        text:
          "Paris Code est une initiative de la Mairie de Paris qui a pour but de soutenir des formations inclusives dans le numerique. Seules les personnes voulant faire le programme developpement blockchain sont concernees par ce type de financement. Financement accessible sur candidature, une fois par an.",
        logoLabel: "PARIS code",
        logoVariant: "pariscode",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.paris.fr/",
      },
      {
        id: "afdas-card",
        title: "OPCO AFDAS",
        text:
          "L'Opco AFDAS est un organisme agree par l'Etat qui finance l'apprentissage et les certifications professionnelles. L'Afdas est l'operateur de competences des secteurs de la culture, des industries creatives, des medias, de la communication, des telecommunications.",
        logo: "/inspired/finance/afdas.png",
        logoAlt: "Logo AFDAS",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.afdas.com/",
      },
      {
        id: "poec-card",
        title: "POEC",
        text:
          "La POEC permet de former les demandeurs d'emploi et salaries en insertion aux competences recherchees par les entreprises sur un territoire specifique et ainsi favoriser leur acces a l'emploi. Nous organisons une session par an, pour 15 apprenants en developpement blockchain sur candidature, pour ce financement. Nous annoncons l'ouverture des candidatures en septembre / octobre, sur notre newsletter et sur nos reseaux sociaux.",
        logoLabel: "France Travail",
        logoVariant: "francetravailPoec",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.francetravail.fr/",
      },
    ],
  },
  personnel: {
    title: "Les differents types de financements pour",
    accent: "independants",
    intro:
      "Vous avez la possibilite de recevoir une aide financiere pour couvrir les frais de formation.. Voici les possibilites de financement :",
    checklist: [
      "via votre compte professionnel de formation (CPF)",
      "en fonds propres (CB, virement, crypto)",
      "Agefice",
      "FIFPL si vous exercez une profession liberale",
      "Opco si vous cotisez a l'un d'eux via votre entreprise",
    ],
    groupTitle: "Nos partenaires",
    groupIntro:
      "Nous travaillons avec une serie de partenaires pour aider nos apprenants a financer leur formation. Actuellement, les moyens de faire financer votre formation sont les suivants :",
    cards: [
      {
        id: "indep-cpf-card",
        title: "CPF",
        text:
          "Le CPF permet a toute personne active d'acquerir des droits pour la formation tout au long de sa carriere, depuis leur entree sur le marche du travail jusqu'au moment ou ils prennent leur retraite. L'objectif du CPF est d'aider les individus a maintenir leur employabilite et securiser leur parcours professionnel.",
        logo: "/inspired/finance/cpf.png",
        logoAlt: "Logo Mon Compte Formation",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.moncompteformation.gouv.fr/",
      },
      {
        id: "indep-alma-card",
        title: "Alma",
        text: "Grace a Alma et Alyra, payez en une, deux, trois ou quatre fois votre formation.",
        logoLabel: "Alma",
        ctaLabel: "En savoir plus",
        ctaHref: "https://almapay.com/fr-FR",
      },
      {
        id: "agefice-card",
        title: "Agefice",
        text:
          "L'Agefice est un fonds d'assurance formation (FAF) du commerce, de l'industrie et des services destine a favoriser la montee en competence des dirigeants non-salaries et de leurs conjoints et collaborateurs grace au financement de formations.",
        logo: "/inspired/finance/agefice.jpg",
        logoAlt: "Logo Agefice",
        ctaLabel: "En savoir plus",
        ctaHref: "https://communication-agefice.fr/",
      },
      {
        id: "fifpl-card",
        title: "FIFPL",
        text:
          "Le Fond Interprofessionnel de Formation des Professions Liberales etablit chaque annee un plan de formation au regard des besoins de chaque profession liberale.",
        logoLabel: "FiFpl",
        logoVariant: "fifpl",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.fifpl.fr/",
      },
      {
        id: "indep-agefiph-card",
        title: "AGEFIPH",
        text:
          "L'AGEFIPH (Association de Gestion du Fonds pour l'Insertion Professionnelle des Personnes Handicapees) a pour mission de favoriser l'insertion professionnelle et le maintien dans l'emploi des personnes en situation de handicap dans le secteur prive.",
        logoLabel: "agefiph",
        logoVariant: "agefiph",
        ctaLabel: "En savoir plus",
        ctaHref: "https://www.agefiph.fr/",
      },
    ],
  },
};

export default function FinancingPage() {
  const page = staticPagesData.financement;
  const options = useMemo(() => page.financingOptions ?? [], [page.financingOptions]);
  const [selectedKey, setSelectedKey] = useState(options[0]?.key ?? "");

  const activeOption = useMemo(() => options.find((item) => item.key === selectedKey) ?? options[0], [options, selectedKey]);
  const selectedDetail = financingDetailsByProfile[selectedKey];
  const profileLabelByKey = {
    cpf: "Je suis salarie",
    "opco-entreprise": "Je suis demandeur d'emploi",
    personnel: "Je suis independant",
  };

  return (
    <main className={`main-content ${styles.main}`} id="main-content" tabIndex="-1">
      <header className={`hero programs-hero ${styles.hero}`}>
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: page.title }]} />
        <a
          href="https://alyrablockchain.typeform.com/to/Ao04TPw7"
          target="_blank"
          rel="noreferrer"
          className={styles.heroTopCta}
        >
          <div className={styles.heroTopCtaVisual} aria-hidden="true">
            🐷
          </div>
          <div className={styles.heroTopCtaCopy}>
            <strong>Faites le test</strong>
            <p>Quelles aides sont faites pour vous ?</p>
          </div>
          <span className={styles.heroTopCtaArrow} aria-hidden="true">
            ↘
          </span>
        </a>

        <div className={`section-head ${styles.heroHead} ${styles.heroHeadCentered}`}>
          <p className={styles.heroKicker}>Financement</p>
          <h1>Comment faire financer votre formation ?</h1>
          <p>
            Ne laissez pas le manque de financement freiner vos ambitions. Nos conseillers en formation, experts dans
            le montage de dossiers de financement, vous accompagnent et vous aident a trouver la solution adaptee.
          </p>
        </div>

        <div className={styles.heroSwitch} role="tablist" aria-label="Choix du profil pour le financement">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={option.key === selectedKey}
              aria-controls={`financing-panel-${option.key}`}
              id={`financing-tab-${option.key}`}
              className={`${styles.heroSwitchTab} ${option.key === selectedKey ? styles.heroSwitchTabActive : ""}`}
              onClick={() => setSelectedKey(option.key)}
            >
              {profileLabelByKey[option.key] ?? option.label}
            </button>
          ))}
        </div>
      </header>

      <section className={`section ${styles.optionsSection}`}>
        {selectedDetail ? (
          <article
            className={styles.profilePanel}
            role="tabpanel"
            id={`financing-panel-${activeOption.key}`}
            aria-labelledby={`financing-tab-${activeOption.key}`}
            tabIndex={0}
          >
            <header className={styles.profilePanelHead}>
              <h2>
                {selectedDetail.title} <span>{selectedDetail.accent}</span>
              </h2>
              {selectedDetail.headline ? <p className={styles.profileHeadline}>{selectedDetail.headline}</p> : null}
              <p>{selectedDetail.intro}</p>
              {selectedDetail.checklist?.length ? (
                <ul className={styles.profileChecklist}>
                  {selectedDetail.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              <h3>{selectedDetail.groupTitle}</h3>
              <p>{selectedDetail.groupIntro}</p>
            </header>

            {selectedDetail.cards?.length ? (
              <div className={styles.profileCards}>
                {selectedDetail.cards.map((card) => (
                  <article key={card.id} className={styles.profileCard}>
                    <div className={styles.profileCardMedia}>
                      {card.logo ? (
                        <img src={card.logo} alt={card.logoAlt} width="460" height="280" loading="lazy" decoding="async" />
                      ) : card.logoVariant === "syntec" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logoSyntec}`}>
                          <span>FEDERATION SYNTEC</span>
                          <span>Atlas</span>
                          <span>cinov</span>
                        </div>
                      ) : card.logoVariant === "opcoep" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logoopcoep}`}>
                          <span>OPCO EP</span>
                          <span>Operateur de competences des Entreprises de Proximite</span>
                        </div>
                      ) : card.logoVariant === "francetravailAif" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logofrancetravail}`}>
                          <span>France Travail</span>
                          <span>AIF</span>
                        </div>
                      ) : card.logoVariant === "francetravailAire" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logofrancetravail}`}>
                          <span>France Travail</span>
                          <span>AIRE</span>
                        </div>
                      ) : card.logoVariant === "francetravailPoec" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logofrancetravail}`}>
                          <span>France Travail</span>
                          <span>POEC</span>
                        </div>
                      ) : card.logoVariant === "pariscode" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logopariscode}`}>
                          <span>PARIS</span>
                          <span>code</span>
                        </div>
                      ) : card.logoVariant === "fifpl" ? (
                        <div className={`${styles.profileCardLogoLabel} ${styles.logofifpl}`}>
                          <span>Fi</span>
                          <span>Fpl</span>
                        </div>
                      ) : (
                        <div
                          className={`${styles.profileCardLogoLabel} ${card.logoVariant ? styles[`logo${card.logoVariant}`] : ""}`}
                        >
                          {card.logoLabel}
                        </div>
                      )}
                    </div>
                    <h4>{card.title}</h4>
                    <p>{card.text}</p>
                    {card.ctaHref ? (
                      <a className={styles.profileLearnMore} href={card.ctaHref} target="_blank" rel="noreferrer">
                        {card.ctaLabel ?? "En savoir plus"}
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </article>
        ) : (
          <div className={styles.optionsLayout}>
            {activeOption ? (
              <article
                className={styles.panel}
                role="tabpanel"
                id={`financing-panel-${activeOption.key}`}
                aria-labelledby={`financing-tab-${activeOption.key}`}
                tabIndex={0}
              >
                <p className={styles.panelKicker}>{activeOption.teaser}</p>
                <h3>{activeOption.title}</h3>
                <ul>
                  {activeOption.modalities.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ) : null}

            <aside className={styles.ctaCard} aria-label="Accompagnement de votre dossier">
              <h3>Un conseiller vous accompagne de A a Z</h3>
              <p>
                Vous etes guide a chaque etape: eligibilite, constitution du dossier, choix du rythme et validation
                finale.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/rendez-vous" className="primary">
                  Je prends RDV
                </Link>
                <Link href="/formations" className="ghost">
                  Voir les parcours
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>

      <FinancingSupportSection />
    </main>
  );
}
