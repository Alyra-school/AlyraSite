import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./ProgramHeroSection.module.css";

function formatPrice(price) {
  if (Number.isFinite(price)) return `${price.toLocaleString("fr-FR")} EUR`;
  return "Sur devis";
}

function renderCtaLink(cta, className) {
  if (!cta?.href) return null;
  if (cta.isExternal) {
    return (
      <a href={cta.href} className={className} target="_blank" rel="noopener noreferrer nofollow">
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
    <div className={`anchor-section ${styles.heroRoot}`} id="resume">
      <div className="program-hero-main">
        <span className="program-tag">{program.tags.join(" / ")}</span>
        <h1 className={styles.heroTitle}>{heroTitle}</h1>
        <p className={styles.subtitle}>{program.subtitle}</p>
        <div className={`program-meta ${styles.heroMeta}`}>
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
          <ul className={styles.heroBullets}>
            {heroBullets.map((item, index) => (
              <li key={`${program.id}-hero-bullet-${index}`}>{item}</li>
            ))}
          </ul>
        ) : null}

        <div className={styles.heroActions}>
          {renderCtaLink(webinarCta, `primary ${styles.ctaMain}`)}
          {applyCta ? (
            renderCtaLink(applyCta, styles.ctaSecondary)
          ) : (
            <Link href="/rendez-vous" className={styles.ctaSecondary}>
              Je candidate
            </Link>
          )}
        </div>

        <div className={styles.heroRatings} aria-label="Avis de satisfaction">
          <p>
            <strong>Excellent</strong> <span>4.9 sur 5</span> <span className={`${styles.ratingBrand} ${styles.ratingBrandTrustpilot}`}>Trustpilot</span>
          </p>
          <p>
            <span className={styles.ratingStars} aria-hidden="true">★★★★★</span>{" "}
            <strong>4.9/5</strong> <span className={styles.ratingBrand}>Google</span>
          </p>
          <span className="sr-only">{trustedScoreText} et {googleScoreText}</span>
        </div>

        <div className={styles.breadcrumbsBottom}>
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Nos formations", href: "/formations" },
              { label: program.title },
            ]}
          />
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.heroVisual}>
          <span className={styles.heroShape} aria-hidden="true" />
          {program.image ? (
            <Image
              src={program.image}
              alt={program.title}
              className={styles.panelImage}
              priority
              width={360}
              height={450}
              sizes="(max-width: 900px) 72vw, 360px"
              unoptimized
            />
          ) : null}
          <span className={`${styles.heroDot} ${styles.heroDotA}`} aria-hidden="true" />
          <span className={`${styles.heroDot} ${styles.heroDotB}`} aria-hidden="true" />
          <span className={`${styles.heroDot} ${styles.heroDotC}`} aria-hidden="true" />
        </div>
        <span className={styles.panelLabel}>Descriptif</span>
        {isContentLoading ? (
          <p>Chargement du descriptif...</p>
        ) : (
          <>
            <p>{detailContent?.overview}</p>
            <p>{detailContent?.overviewSecondary}</p>
            {applyCta?.formId ? (
              <p className={styles.formId}>
                Formulaire d inscription: <strong>{applyCta.formId}</strong>
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
