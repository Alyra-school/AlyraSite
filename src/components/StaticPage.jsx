"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import TeamShowcaseSection from "./TeamShowcaseSection";
import AlumniHallSection from "./AlumniHallSection";

export default function StaticPage({ page }) {
  const isAlumniPage = page.title === "Nos Anciens";
  const [selectedFinancing, setSelectedFinancing] = useState(
    page.financingOptions?.[0]?.key ?? null
  );
  const activeFinancing = page.financingOptions?.find((item) => item.key === selectedFinancing);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      {!isAlumniPage ? (
        <header className="hero programs-hero">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: page.title }]} />
          <div className="section-head">
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
          </div>
        </header>
      ) : null}

      {page.financingOptions ? (
        <section className="section">
          <div className="financing-switch" role="tablist" aria-label="Choix du mode de financement">
            {page.financingOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                role="tab"
                aria-selected={option.key === selectedFinancing}
                aria-controls={`financing-panel-${option.key}`}
                id={`financing-tab-${option.key}`}
                className={`financing-tab ${option.key === selectedFinancing ? "active" : ""}`}
                onClick={() => setSelectedFinancing(option.key)}
              >
                <strong>{option.label}</strong>
                <span>{option.teaser}</span>
              </button>
            ))}
          </div>

          {activeFinancing && (
            <article
              className="card financing-panel"
              role="tabpanel"
              id={`financing-panel-${activeFinancing.key}`}
              aria-labelledby={`financing-tab-${activeFinancing.key}`}
              tabIndex={0}
            >
              <h3>{activeFinancing.title}</h3>
              <ul className="simple-list">
                {activeFinancing.modalities.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          )}
        </section>
      ) : (
        <section className={`section ${isAlumniPage ? "alumni-standalone-start" : ""}`}>
          {page.aboutSchool ? (
            <article id="notre-ecole-blockchain-ia" className="about-school-block anchor-section">
              <p className="about-school-overline">{page.aboutSchool.overline}</p>
              <h2>{page.aboutSchool.title}</h2>
              <p className="about-school-lead">{page.aboutSchool.lead}</p>
              {page.aboutSchool.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-school-paragraph">
                  {paragraph}
                </p>
              ))}
              <div className="about-school-cta">
                <Link href={page.aboutSchool.ctaHref} className="primary">
                  {page.aboutSchool.ctaLabel}
                </Link>
              </div>
              <p className="about-school-bridge">{page.aboutSchool.bridge}</p>
              <h3>{page.aboutSchool.nextTitle}</h3>
              <p>{page.aboutSchool.nextSubtitle}</p>
            </article>
          ) : null}

          {page.aboutHighlights ? (
            <article className="about-highlights-block" aria-label="Points forts de l'ecole">
              <div className="about-highlights-copy">
                {page.aboutHighlights.items.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </section>
                ))}
              </div>
              <figure className="about-highlights-visual" aria-hidden="true">
                <img
                  src={page.aboutHighlights.imageUrl}
                  alt={page.aboutHighlights.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>
          ) : null}

          {page.schoolKpis ? (
            <article id="les-chiffres-de-lecole" className="about-kpis-block anchor-section">
              <p className="about-kpis-eyebrow">{page.schoolKpis.eyebrow}</p>
              <h2>{page.schoolKpis.title}</h2>
              <p className="about-kpis-subtitle">{page.schoolKpis.subtitle}</p>

              <div className="about-kpis-top-grid">
                {page.schoolKpis.topCards.map((card) => (
                  <section key={`${card.value}-${card.label}`} className="about-kpi-card">
                    <h3>{card.value}</h3>
                    <h4>{card.label}</h4>
                    <p className={card.isItalic ? "is-italic" : ""}>{card.text}</p>
                  </section>
                ))}
              </div>

              <section className="about-kpi-card about-kpi-card-wide">
                <h3>{page.schoolKpis.middleCard.value}</h3>
                <h4>{page.schoolKpis.middleCard.label}</h4>
              </section>

              <div className="about-kpis-bottom-grid">
                <section className="about-kpi-card">
                  <p className="about-kpi-trustpilot">{page.schoolKpis.bottomCards[0].trustpilot}</p>
                </section>
                <section className="about-kpi-card">
                  <h3>{page.schoolKpis.bottomCards[1].value}</h3>
                  <h4>{page.schoolKpis.bottomCards[1].label}</h4>
                </section>
              </div>

              <div className="about-kpis-actions">
                {page.schoolKpis.actions.map((action) => (
                  <Link key={action.label} href={action.href} className="primary">
                    {action.label}
                  </Link>
                ))}
              </div>
            </article>
          ) : null}

          {page.teamShowcase ? <TeamShowcaseSection section={page.teamShowcase} /> : null}
          {page.expertsShowcase ? <TeamShowcaseSection section={page.expertsShowcase} /> : null}
          {page.alumniHall ? <AlumniHallSection section={page.alumniHall} /> : null}

          <div className="cards">
            {page.sections
              .filter(
                (section) =>
                  section.anchorId !== "notre-ecole-blockchain-ia" &&
                  section.anchorId !== "les-chiffres-de-lecole" &&
                  section.anchorId !== "notre-equipe" &&
                  section.anchorId !== "nos-experts"
              )
              .map((section) => (
              <article key={section.title} id={section.anchorId ?? undefined} className="card anchor-section">
                <h3>{section.title}</h3>
                <ul className="simple-list">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          {!isAlumniPage ? (
            <div className="hero-actions">
              <Link href="/rendez-vous" className="primary">
                Prendre rendez-vous
              </Link>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}
