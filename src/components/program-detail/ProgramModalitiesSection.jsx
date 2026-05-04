import Link from "next/link";

export default function ProgramModalitiesSection({ programId, modalities }) {
  if (!modalities.length) return null;

  return (
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
              key={`${programId}-modality-${item.key}`}
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
                      <li key={`${programId}-${item.key}-${feature.position}`}>{feature.text}</li>
                    ))}
                  </ul>
                ) : null}

                {extraFeatures.length > 0 ? (
                  <ul className="program-modality-list is-secondary">
                    {extraFeatures.map((feature) => (
                      <li key={`${programId}-${item.key}-${feature.position}`}>{feature.text}</li>
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
  );
}
