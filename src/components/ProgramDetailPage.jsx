import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

function formatPrice(price) {
  if (Number.isFinite(price)) return `${price.toLocaleString("fr-FR")} EUR`;
  return "Sur devis";
}

export default function ProgramDetailPage({
  program,
  similarPrograms,
  detailContent,
  isContentLoading,
}) {
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

  const applyCta = ctas.find((item) => item.key === "apply") ?? null;
  const webinarCta = ctas.find((item) => item.key === "webinar") ?? null;

  const learningSectionItems = learningItems.length > 0 ? learningItems.map((item) => item.text) : legacyLearningPath;
  const expertsSectionItems = experts.length > 0 ? experts : legacyProfessors;
  const relatedPrograms = relatedProgramsFromDb.length > 0 ? relatedProgramsFromDb : similarPrograms;

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero hero-program">
        <div className="program-page">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Programmes", href: "/programmes" },
              { label: program.title },
            ]}
          />

          <Link href="/programmes" className="ghost back-btn">
            Retour au catalogue
          </Link>

          <div className="program-hero">
            <div>
              <span className="program-tag">{program.tags.join(" / ")}</span>
              <h1>{program.title}</h1>
              <p>{program.subtitle}</p>
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
                  {heroBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              <div className="program-hero-actions">
                {webinarCta ? (
                  <a
                    href={webinarCta.href}
                    className="ghost"
                    target={webinarCta.isExternal ? "_blank" : undefined}
                    rel={webinarCta.isExternal ? "noreferrer" : undefined}
                  >
                    {webinarCta.label}
                  </a>
                ) : null}
                {applyCta ? (
                  <Link href={applyCta.href} className="primary">
                    {applyCta.label}
                  </Link>
                ) : (
                  <Link href="/rendez-vous" className="primary">
                    Je candidate
                  </Link>
                )}
              </div>
            </div>
            <div className="program-panel">
              <h3>Descriptif</h3>
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

          {proofLogos.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Nos apprenants sont demandes par</h2>
              </div>
              <div className="program-logo-grid">
                {proofLogos.map((item) => (
                  <article key={`${item.category}-${item.key}`} className="program-logo-item">
                    <img src={item.imageUrl} alt={item.label} width="180" height="72" loading="lazy" decoding="async" />
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {kpis.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Resultats qui parlent</h2>
              </div>
              <div className="cards">
                {kpis.map((item) => (
                  <article key={item.position} className="card">
                    <div className="card-top">
                      <p>{item.label}</p>
                      <h3>{item.value}</h3>
                    </div>
                    <p>{item.description}</p>
                    {item.source ? <small>Source: {item.source}</small> : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {learningSectionItems.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Vous allez apprendre a</h2>
              </div>
              <div className="cards">
                {learningSectionItems.map((item) => (
                  <article key={item} className="card">
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {brochurePoints.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Telecharger le programme</h2>
              </div>
              <article className="card">
                <ul className="simple-list">
                  {brochurePoints.map((item) => (
                    <li key={item.position}>{item.text}</li>
                  ))}
                </ul>
                <div>
                  <Link className="primary" href="/rendez-vous">
                    Recevoir le programme
                  </Link>
                </div>
              </article>
            </section>
          ) : null}

          {modalities.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Trois modalites pedagogiques</h2>
              </div>
              <div className="cards">
                {modalities.map((item) => (
                  <article key={item.key} className="card">
                    <h3>{item.title}</h3>
                    {item.subtitle ? <p>{item.subtitle}</p> : null}
                    <div className="card-meta">
                      {item.durationLabel ? <span>{item.durationLabel}</span> : null}
                      {item.priceLabel ? <span>{item.priceLabel}</span> : null}
                    </div>
                    {item.supportLabel ? <p>{item.supportLabel}</p> : null}
                    {item.certificationLabel ? (
                      <p>
                        {item.certificationLabel}
                        {item.certificationCode ? ` - ${item.certificationCode}` : ""}
                      </p>
                    ) : null}
                    {item.features?.length > 0 ? (
                      <ul className="simple-list">
                        {item.features.map((feature) => (
                          <li key={`${item.key}-${feature.position}`}>{feature.text}</li>
                        ))}
                      </ul>
                    ) : null}
                    {item.ctaHref ? (
                      <Link className="text-button" href={item.ctaHref}>
                        {item.ctaLabel ?? "Voir la modalite"}
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {expertsSectionItems.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Experts</h2>
                <p>Une equipe mixte: pedagogie, expertise terrain et accompagnement projet.</p>
              </div>
              <div className="cards">
                {expertsSectionItems.map((expert) => (
                  <article key={expert.id ?? expert.name} className="card">
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
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {testimonials.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Les retours de nos apprenants</h2>
              </div>
              <div className="cards">
                {testimonials.map((item) => (
                  <article key={item.key} className="card">
                    <div className="card-meta">
                      <span>{item.rating}/5</span>
                      {item.sourceLabel ? <span>{item.sourceLabel}</span> : null}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <p>{item.author}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {faqs.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>FAQs</h2>
              </div>
              <div className="cards">
                {faqs.map((item) => (
                  <article key={item.key} className="card">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {relatedPrograms.length > 0 ? (
            <section className="section">
              <div className="section-head">
                <h2>Decouvrez nos autres formations</h2>
              </div>
              <div className="cards">
                {relatedPrograms.map((item) => (
                  <article key={item.id} className="card">
                    <h3>{item.labelOverride ?? item.title}</h3>
                    <p>{item.subtitle}</p>
                    <div className="card-meta">
                      <span>{item.duration}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                    <Link className="text-button" href={`/programmes/${item.slug}`}>
                      Voir cette formation
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {detailContent?.certificationTitle || detailContent?.certificationDescription ? (
            <section className="section">
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
