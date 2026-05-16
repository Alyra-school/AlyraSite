import Link from "next/link";
import styles from "./ProgramContentSections.module.css";

export default function ProgramModalitiesSection({ programId, modalities }) {
  if (!modalities.length) return null;

  return (
    <section className="section program-section anchor-section" id="tarifs">
      <div className={`section-head ${styles.modalitiesHead}`}>
        <h2>
          <span>Trois modalites</span> pedagogiques
        </h2>
        <p>Des modalités différentes pour s'adapter à vos besoins et à votre emploi du temps</p>
      </div>
      <div className={styles.modalitiesGrid}>
        {modalities.map((item) => {
          const toneClass =
            item.key === "essentiel"
              ? styles.modalityEssentiel
              : item.key === "premium"
                ? styles.modalityPremium
                : styles.modalitySession;
          const topFeatures = item.features?.slice(0, 6) ?? [];
          const extraFeatures = item.features?.slice(6) ?? [];

          return (
            <article
              key={`${programId}-modality-${item.key}`}
              className={`${styles.modalityCard} ${toneClass}`}
            >
              <div className={styles.modalityTop}>
                <p className={styles.modalityBrand}>ALYRA</p>
                <h3>
                  <span>{item.title}</span>
                </h3>

                <div className={styles.modalityDuration}>
                  <span aria-hidden="true">🗓</span>
                  <strong>{item.durationLabel ?? "Sur mesure"}</strong>
                </div>

                {item.supportLabel ? <p className={styles.modalitySubtitle}>{item.supportLabel}</p> : null}
              </div>

              <div className={styles.modalityBody}>
                {topFeatures.length > 0 ? (
                  <ul className={styles.modalityList}>
                    {topFeatures.map((feature) => (
                      <li key={`${programId}-${item.key}-${feature.position}`}>{feature.text}</li>
                    ))}
                  </ul>
                ) : null}

                {extraFeatures.length > 0 ? (
                  <ul className={`${styles.modalityList} ${styles.modalityListSecondary}`}>
                    {extraFeatures.map((feature) => (
                      <li key={`${programId}-${item.key}-${feature.position}`}>{feature.text}</li>
                    ))}
                  </ul>
                ) : null}

                {item.certificationLabel ? (
                  <div className={styles.modalityCertification}>
                    <strong>{item.certificationLabel}</strong>
                    {item.certificationCode ? <span>{item.certificationCode}</span> : null}
                  </div>
                ) : null}
              </div>

              <div className={styles.modalityPrice}>
                <strong>{item.priceLabel ?? "Tarif sur devis"}</strong>
              </div>

              <div className={styles.modalityCta}>
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
  );
}
