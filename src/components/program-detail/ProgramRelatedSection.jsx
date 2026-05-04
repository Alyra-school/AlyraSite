import Link from "next/link";

function formatPrice(price) {
  if (Number.isFinite(price)) return `${price.toLocaleString("fr-FR")} EUR`;
  return "Sur devis";
}

export default function ProgramRelatedSection({ programId, relatedPrograms }) {
  if (!relatedPrograms.length) return null;

  return (
    <section className="section program-section">
      <div className="section-head">
        <span className="program-eyebrow">Catalogue</span>
        <h2>Decouvrez nos autres formations</h2>
      </div>
      <div className="program-related-grid">
        {relatedPrograms.map((item) => (
          <article key={`${programId}-related-${item.id}`} className="card program-related-card">
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
  );
}
