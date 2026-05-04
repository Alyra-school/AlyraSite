"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { recruiterCompanies } from "../data/homeData";

function formatPrice(price) {
  if (Number.isFinite(price)) return `${price.toLocaleString("fr-FR")} EUR`;
  return "Sur devis";
}

function renderCtaLink(cta, className) {
  if (!cta?.href) return null;
  if (cta.isExternal) {
    return (
      <a href={cta.href} className={className} target="_blank" rel="noreferrer">
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export default function ProgramDetailPage({
  program,
  similarPrograms,
  detailContent,
  isContentLoading,
}) {
  const [isSalesNavStuck, setIsSalesNavStuck] = useState(false);
  const [salesNavRect, setSalesNavRect] = useState(null);
  const salesNavSlotRef = useRef(null);

  useEffect(() => {
    const slot = salesNavSlotRef.current;
    if (!slot) return undefined;

    const mediaQuery = window.matchMedia("(max-width: 760px)");
    let slotTop = 0;
    let rafId = 0;

    const getStickyOffset = () => {
      const mainNav = document.querySelector(".nav");
      return (mainNav?.getBoundingClientRect().height ?? 80) + 18;
    };

    const updateState = () => {
      if (!mediaQuery.matches) {
        setIsSalesNavStuck(false);
        return;
      }

      setIsSalesNavStuck(window.scrollY + getStickyOffset() >= slotTop);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateState);
    };

    const measure = () => {
      const currentScroll = window.scrollY;
      const rect = slot.getBoundingClientRect();
      slotTop = rect.top + currentScroll;
      setSalesNavRect((previousRect) => {
        const nextRect = {
          left: rect.left,
          width: rect.width,
          height: slot.offsetHeight,
        };

        if (
          previousRect &&
          Math.abs(previousRect.left - nextRect.left) < 0.5 &&
          Math.abs(previousRect.width - nextRect.width) < 0.5 &&
          Math.abs(previousRect.height - nextRect.height) < 0.5
        ) {
          return previousRect;
        }

        return nextRect;
      });
      scheduleUpdate();
    };

    measure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    mediaQuery.addEventListener("change", measure);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      mediaQuery.removeEventListener("change", measure);
    };
  }, []);

  const legacyProfessors = detailContent?.professors ?? [];
  const legacyLearningPath = detailContent?.learningPath ?? [];

  const heroBullets = detailContent?.heroBullets ?? [];
  const ctas = detailContent?.ctas ?? [];
  const proofLogos = detailContent?.proofLogos ?? [];
  const kpis = detailContent?.kpis ?? [];
  const learningItems = detailContent?.learningItems ?? [];
  const brochurePoints = detailContent?.brochurePoints ?? [];
  const modalities = detailContent?.modalities ?? [];
  const experts = detailContent?.experts ?? [];
  const testimonials = detailContent?.testimonials ?? [];
  const faqs = detailContent?.faqs ?? [];
  const relatedProgramsFromDb = detailContent?.relatedPrograms ?? [];
  const defaultKpis = [
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

  const applyCta = ctas.find((item) => item.key === "apply") ?? null;
  const webinarCta = ctas.find((item) => item.key === "webinar") ?? null;
  const heroCompanies = proofLogos.length > 0
    ? proofLogos.map((item) => ({ name: item.label, logo: item.imageUrl }))
    : recruiterCompanies;

  const heroTitleOverrides = {
    "dev-blockchain": "Développement blockchain : concevoir, sécuriser, déployer",
    "expert-blockchain": "Consulting blockchain : analyser, structurer, piloter",
  };
  const heroTitle = heroTitleOverrides[program.slug] ?? program.title;

  const trustedScoreText = "Excellent 4.9 sur 5 Trustpilot";
  const googleScoreText = "4.9/5 Google";

  const learningSectionItems = learningItems.length > 0 ? learningItems.map((item) => item.text) : legacyLearningPath;
  const expertsSectionItems = experts.length > 0 ? experts : legacyProfessors;
  const relatedPrograms = relatedProgramsFromDb.length > 0 ? relatedProgramsFromDb : similarPrograms;
  const kpiItems = kpis.length > 0 ? kpis : defaultKpis;

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero hero-program">
        <div className="program-page">
          <div className="program-hero anchor-section" id="resume">
            <div className="program-hero-main">
              <span className="program-tag">{program.tags.join(" / ")}</span>
              <h1>{heroTitle}</h1>
              <p className="program-subtitle">{program.subtitle}</p>
              <div className="program-meta">
                <div>
                  <strong>Date</strong>
                  <span>{program.date}</span>
                </div>
                <div>
                  <strong>Duree</strong>
                  <span>{program.duration}</span>
                </div>
                <div>
                  <strong>Prix</strong>
                  <span>{formatPrice(program.price)}</span>
                </div>
              </div>

              {heroBullets.length > 0 ? (
                <ul className="program-hero-bullets">
                  {heroBullets.map((item, index) => (
                    <li key={`${program.id}-hero-bullet-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : null}

              <div className="program-hero-actions">
                {renderCtaLink(webinarCta, "primary program-cta-main")}
                {applyCta ? (
                  renderCtaLink(applyCta, "program-cta-secondary")
                ) : (
                  <Link href="/rendez-vous" className="program-cta-secondary">
                    Je candidate
                  </Link>
                )}
              </div>

              <div className="program-hero-ratings" aria-label="Avis de satisfaction">
                <p>
                  <strong>Excellent</strong> <span>4.9 sur 5</span> <span className="program-rating-brand trustpilot">Trustpilot</span>
                </p>
                <p>
                  <span className="program-rating-stars" aria-hidden="true">★★★★★</span>{" "}
                  <strong>4.9/5</strong> <span className="program-rating-brand">Google</span>
                </p>
                <span className="sr-only">{trustedScoreText} et {googleScoreText}</span>
              </div>

              <div className="program-breadcrumbs-bottom">
                <Breadcrumbs
                  items={[
                    { label: "Accueil", href: "/" },
                    { label: "Nos formations", href: "/formations" },
                    { label: program.title },
                  ]}
                />
              </div>
            </div>

            <div className="program-panel">
              <div className="program-hero-visual">
                <span className="program-hero-shape" aria-hidden="true" />
                {program.image ? (
                  <img
                    src={program.image}
                    alt={program.title}
                    className="program-panel-image"
                    loading="eager"
                    decoding="async"
                  />
                ) : null}
                <span className="program-hero-dot dot-a" aria-hidden="true" />
                <span className="program-hero-dot dot-b" aria-hidden="true" />
                <span className="program-hero-dot dot-c" aria-hidden="true" />
              </div>
              <span className="program-panel-label">Descriptif</span>
              {isContentLoading ? (
                <p>Chargement du descriptif...</p>
              ) : (
                <>
                  <p>{detailContent?.overview}</p>
                  <p>{detailContent?.overviewSecondary}</p>
                  {applyCta?.formId ? (
                    <p className="program-form-id">
                      Formulaire d inscription: <strong>{applyCta.formId}</strong>
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>

          {heroCompanies.length > 0 ? (
            <section className="program-hero-companies" aria-label="Entreprises qui recrutent nos apprenants">
              <h2><span className="hero-accent">Nos apprenants formés en blockchain</span> sont demandés par :</h2>
              <div className="company-marquee">
                <div className="company-track">
                  {[...heroCompanies, ...heroCompanies].map((company, index) => (
                    <article key={`program-hero-company-${company.name}-${index}`} className="company-item company-item-marquee">
                      <img src={company.logo} alt={`Logo ${company.name}`} width="196" height="48" loading="lazy" decoding="async" />
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <div
            ref={salesNavSlotRef}
            className={`program-sales-nav-slot ${isSalesNavStuck ? "is-stuck" : ""}`}
            style={isSalesNavStuck && salesNavRect ? { minHeight: `${salesNavRect.height}px` } : undefined}
          >
            <section
              className={`program-sales-nav ${isSalesNavStuck ? "is-stuck" : ""}`}
              aria-label="Navigation rapide de la formation"
              style={
                isSalesNavStuck && salesNavRect
                  ? { left: `${salesNavRect.left}px`, width: `${salesNavRect.width}px` }
                  : undefined
              }
            >
              <div className="program-sales-nav-inner">
              <div className="program-sales-nav-left">
                <div className="program-sales-nav-top">
                  <h2>Formation {program.title}</h2>
                  <p>
                    <strong>Excellent</strong>
                    <span>4.9 sur 5</span>
                    <span className="program-rating-brand trustpilot">Trustpilot</span>
                  </p>
                  <details className="program-sales-mobile-menu">
                    <summary aria-label="Ouvrir le menu de navigation de la formation">
                      <span aria-hidden="true">◧</span>
                    </summary>
                    <div className="program-sales-mobile-panel">
                      <nav className="program-sales-links program-sales-links-mobile" aria-label="Ancres de la page">
                        <a href="#resume" className="program-sales-link">Résumé</a>
                        <a href="#programme" className="program-sales-link">Programme</a>
                        <a href="#tarifs" className="program-sales-link">Tarifs</a>
                        <Link href="/financement" className="program-sales-link">Financements</Link>
                        <a href="#experts" className="program-sales-link">Experts</a>
                        <a href="#certification" className="program-sales-link">Certification</a>
                      </nav>
                      <div className="program-sales-cta program-sales-cta-mobile">
                        <a href="#programme-brochure" className="program-cta-secondary">Télécharger le programme</a>
                        <Link href="/rendez-vous" className="primary">Prendre rendez-vous</Link>
                      </div>
                    </div>
                  </details>
                </div>
                <nav className="program-sales-links" aria-label="Ancres de la page">
                  <a href="#resume" className="program-sales-link">Résumé</a>
                  <a href="#programme" className="program-sales-link">Programme</a>
                  <a href="#tarifs" className="program-sales-link">Tarifs</a>
                  <Link href="/financement" className="program-sales-link">Financements</Link>
                  <a href="#experts" className="program-sales-link">Experts</a>
                  <a href="#certification" className="program-sales-link">Certification</a>
                </nav>
              </div>
              <div className="program-sales-cta">
                <a href="#programme-brochure" className="program-cta-secondary">Télécharger le programme</a>
                <Link href="/rendez-vous" className="primary">Prendre rendez-vous</Link>
              </div>
              </div>
            </section>
          </div>

          {kpiItems.length > 0 ? (
            <section className="section program-section anchor-section" id="programme">
              <div className="program-kpi-showcase">
                <div className="section-head program-kpi-head">
                  <h2>
                    Alyra, votre passerelle vers une activité qui allie{" "}
                    <span className="hero-accent">passion, expertise et rémunération</span>
                  </h2>
                </div>

                <div className="program-kpi-layout">
                  <figure className="program-kpi-visual" aria-hidden="true">
                    <span className="program-kpi-visual-shape" />
                    <img
                      src="/inspired/team/christian.avif"
                      alt=""
                      className="program-kpi-visual-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="program-kpi-dot dot-1" />
                    <span className="program-kpi-dot dot-2" />
                    <span className="program-kpi-dot dot-3" />
                    <span className="program-kpi-dot dot-4" />
                  </figure>

                  <div className="program-kpi-stack">
                    {kpiItems.map((item, index) => (
                      <article
                        key={`${program.id}-kpi-${item.position}`}
                        className={`program-kpi-panel ${index === 1 ? "is-neutral" : "is-featured"}`}
                      >
                        <h3>{item.value}</h3>
                        <p>{item.description ?? item.label}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {learningSectionItems.length > 0 ? (
            <section className="section program-section anchor-section" id="programme-brochure">
              <div className="section-head program-learning-head">
                <h2>
                  Une formation qui vous apporte une vision a 360° de l'ecosysteme blockchain
                </h2>
                <p>Vous allez apprendre a...</p>
              </div>
              <div className="program-learning-showcase-grid">
                {learningSectionItems.map((item, index) => (
                  <article key={`${program.id}-learn-${index}`} className="program-learning-showcase-card">
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {brochurePoints.length > 0 ? (
            <section className="section program-section anchor-section program-brochure-showcase" id="tarifs">
              <div className="program-brochure-shell">
                <div className="program-brochure-head">
                  <h2>Télécharger le programme de formation</h2>
                  <p>
                    Vous saurez bientôt développer une application décentralisée (Dapp) de A à Z, du front au back :
                  </p>
                </div>

                <div className="program-brochure-content">
                  <ul className="program-brochure-benefits">
                    {brochurePoints.map((item) => (
                      <li key={`${program.id}-brochure-${item.position}`}>{item.text}</li>
                    ))}
                  </ul>

                  <div className="program-brochure-form-wrap">
                    <img
                      src={program.image}
                      alt=""
                      className="program-brochure-visual"
                      loading="lazy"
                      decoding="async"
                    />
                    <form className="program-brochure-form" aria-label="Recevoir la brochure">
                      <div className="program-brochure-form-grid">
                        <label>
                          Prénom<span>*</span>
                          <input type="text" name="firstName" autoComplete="given-name" />
                        </label>
                        <label>
                          Nom<span>*</span>
                          <input type="text" name="lastName" autoComplete="family-name" />
                        </label>
                        <label>
                          Numéro de téléphone<span>*</span>
                          <input type="tel" name="phone" autoComplete="tel" />
                        </label>
                        <label>
                          E-mail<span>*</span>
                          <input type="email" name="email" autoComplete="email" />
                        </label>
                      </div>

                      <p className="program-brochure-privacy">
                        Alyra l'école Blockchain & IA s'engage à protéger et à respecter votre vie privée.
                      </p>
                      <label className="program-brochure-checkbox">
                        <input type="checkbox" name="privacy" />
                        <span>J'accepte la politique de confidentialité.</span>
                      </label>
                      <label className="program-brochure-checkbox">
                        <input type="checkbox" name="communications" />
                        <span>J'accepte de recevoir d'autres communications de Alyra l'école Blockchain & IA.</span>
                      </label>

                      <div className="program-brochure-action">
                        <Link className="primary" href="/rendez-vous">
                          Obtenir la brochure
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {modalities.length > 0 ? (
            <section className="section program-section anchor-section" id="tarifs">
              <div className="section-head program-modalities-head">
                <h2>
                  <span>Trois modalites</span> pedagogiques
                </h2>
                <p>Des modalités différentes pour s'adapter à vos besoins et à votre emploi du temps</p>
              </div>
              <div className="program-modalities-grid">
                {modalities.map((item) => {
                  const toneClass =
                    item.key === "essentiel"
                      ? "is-essentiel"
                      : item.key === "premium"
                        ? "is-premium"
                        : "is-session";
                  const topFeatures = item.features?.slice(0, 6) ?? [];
                  const extraFeatures = item.features?.slice(6) ?? [];

                  return (
                  <article
                    key={`${program.id}-modality-${item.key}`}
                    className={`program-modality-card ${toneClass}`}
                  >
                    <div className="program-modality-top">
                      <p className="program-modality-brand">ALYRA</p>
                      <h3>
                        <span>{item.title}</span>
                      </h3>

                      <div className="program-modality-duration">
                        <span aria-hidden="true">🗓</span>
                        <strong>{item.durationLabel ?? "Sur mesure"}</strong>
                      </div>

                      {item.supportLabel ? <p className="program-modality-subtitle">{item.supportLabel}</p> : null}
                    </div>

                    <div className="program-modality-body">
                      {topFeatures.length > 0 ? (
                        <ul className="program-modality-list">
                          {topFeatures.map((feature) => (
                            <li key={`${program.id}-${item.key}-${feature.position}`}>{feature.text}</li>
                          ))}
                        </ul>
                      ) : null}

                      {extraFeatures.length > 0 ? (
                        <ul className="program-modality-list is-secondary">
                          {extraFeatures.map((feature) => (
                            <li key={`${program.id}-${item.key}-${feature.position}`}>{feature.text}</li>
                          ))}
                        </ul>
                      ) : null}

                      {item.certificationLabel ? (
                        <div className="program-modality-certification">
                          <strong>{item.certificationLabel}</strong>
                          {item.certificationCode ? <span>{item.certificationCode}</span> : null}
                        </div>
                      ) : null}
                    </div>

                    <div className="program-modality-price">
                      <strong>{item.priceLabel ?? "Tarif sur devis"}</strong>
                    </div>

                    <div className="program-modality-cta">
                      {item.ctaHref ? (
                        <Link className="primary" href={item.ctaHref}>
                          {item.ctaLabel ?? "Télécharger le programme"}
                        </Link>
                      ) : (
                        <Link className="primary" href="/rendez-vous">
                          Télécharger le programme
                        </Link>
                      )}
                    </div>
                  </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {expertsSectionItems.length > 0 ? (
            <section className="section program-section anchor-section" id="experts">
              <div className="section-head">
                <span className="program-eyebrow">Intervenants</span>
                <h2>Nos experts</h2>
                <p>Une equipe mixte: pedagogie, expertise terrain et accompagnement projet.</p>
              </div>
              <div className="program-experts-grid">
                {expertsSectionItems.map((expert, index) => (
                  <article key={`${program.id}-expert-${expert.id ?? expert.name ?? index}`} className="card program-expert-card">
                    {expert.imageUrl ? (
                      <img
                        src={expert.imageUrl}
                        alt={expert.name ?? "Expert"}
                        className="program-expert-image"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <div className="program-expert-body">
                      <h3>{expert.name}</h3>
                      <div className="card-meta">
                        <span>{expert.role}</span>
                      </div>
                      <p>{expert.bio}</p>
                      {expert.linkedinUrl ? (
                        <a className="text-button" href={expert.linkedinUrl} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {testimonials.length > 0 ? (
            <section className="section program-section">
              <div className="section-head">
                <span className="program-eyebrow">Avis</span>
                <h2>Les retours de nos apprenants</h2>
              </div>
              <div className="program-testimonials-grid">
                {testimonials.map((item) => (
                  <article key={`${program.id}-testimonial-${item.key}`} className="card program-testimonial-card">
                    <div className="card-meta">
                      <span>{item.rating}/5</span>
                      {item.sourceLabel ? <span>{item.sourceLabel}</span> : null}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <p className="program-testimonial-author">{item.author}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {faqs.length > 0 ? (
            <section className="section program-section">
              <div className="section-head">
                <span className="program-eyebrow">FAQ</span>
                <h2>Questions frequentes</h2>
              </div>
              <div className="program-faq-grid">
                {faqs.map((item) => (
                  <article key={`${program.id}-faq-${item.key}`} className="card">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {relatedPrograms.length > 0 ? (
            <section className="section program-section">
              <div className="section-head">
                <span className="program-eyebrow">Catalogue</span>
                <h2>Decouvrez nos autres formations</h2>
              </div>
              <div className="program-related-grid">
                {relatedPrograms.map((item) => (
                  <article key={`${program.id}-related-${item.id}`} className="card program-related-card">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="program-related-image"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <h3>{item.labelOverride ?? item.title}</h3>
                    <p>{item.subtitle}</p>
                    <div className="card-meta">
                      <span>{item.duration}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                    <Link className="text-button" href={`/formations/${item.slug}`}>
                      Voir cette formation
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {detailContent?.certificationTitle || detailContent?.certificationDescription ? (
            <section className="section program-section anchor-section" id="certification">
              <div className="section-head">
                <h2>Certification associee</h2>
              </div>
              <article className="card">
                <h3>{detailContent?.certificationTitle ?? `Certification Professionnelle ${program.title}`}</h3>
                <p>{detailContent?.certificationDescription}</p>
              </article>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
