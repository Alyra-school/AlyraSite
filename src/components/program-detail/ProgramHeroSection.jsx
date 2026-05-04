import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs";

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

export default function ProgramHeroSection({
  program,
  heroTitle,
  heroBullets,
  webinarCta,
  applyCta,
  trustedScoreText,
  googleScoreText,
  isContentLoading,
  detailContent,
}) {
  return (
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
              width="360"
              height="450"
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
  );
}
