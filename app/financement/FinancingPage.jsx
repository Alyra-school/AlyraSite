"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import FinancingSupportSection from "../../src/components/home/sections/FinancingSupportSection";
import { getStaticPageContent } from "../../src/lib/content/staticPageMapper";
import { financingDetailsByProfile, financingProfileLabelByKey } from "../../src/data/fallback/financingFallback";
import styles from "./FinancingPage.module.css";

export default function FinancingPage() {
  const page = getStaticPageContent("financement");
  const options = useMemo(() => page.financingOptions ?? [], [page.financingOptions]);
  const [selectedKey, setSelectedKey] = useState(options[0]?.key ?? "");

  const activeOption = useMemo(() => options.find((item) => item.key === selectedKey) ?? options[0], [options, selectedKey]);
  const selectedDetail = financingDetailsByProfile[selectedKey];

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
              {financingProfileLabelByKey[option.key] ?? option.label}
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
