"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function StaticPage({ page }) {
  const [selectedFinancing, setSelectedFinancing] = useState(
    page.financingOptions?.[0]?.key ?? null
  );
  const activeFinancing = page.financingOptions?.find((item) => item.key === selectedFinancing);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <header className="hero programs-hero">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: page.title }]} />
        <div className="section-head">
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
      </header>

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
        <section className="section">
          <div className="cards">
            {page.sections.map((section) => (
              <article key={section.title} className="card">
                <h3>{section.title}</h3>
                <ul className="simple-list">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Link href="/rendez-vous" className="primary">
              Prendre rendez-vous
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
