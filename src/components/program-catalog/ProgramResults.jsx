import Link from "next/link";

export default function ProgramResults({ programs, isLoading, error }) {
  if (isLoading) {
    return (
      <p className="results-count" aria-live="polite">
        Chargement des formations...
      </p>
    );
  }

  return (
    <>
      {error && (
        <p className="results-count" aria-live="polite">
          {error}
        </p>
      )}
      <p className="results-count" aria-live="polite">
        {programs.length} formations trouvees
      </p>
      <div className="catalog-grid">
        {programs.map((program) => (
          <Link
            key={program.id}
            className="catalog-card catalog-card-link"
            href={`/formations/${program.slug}`}
            aria-label={`Ouvrir la formation ${program.title}`}
          >
            <img
              src={program.image}
              alt={`Illustration de la formation ${program.title}`}
              className="catalog-image"
              loading="lazy"
              decoding="async"
            />
            <div className="catalog-content">
              <div className="catalog-tags">
                {program.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{program.title}</h3>
              <p>{program.subtitle}</p>
              <div className="catalog-meta">
                <span>Date: {program.date}</span>
                <span>Duree: {program.duration}</span>
                <span>Prix: {program.price.toLocaleString("fr-FR")} EUR</span>
              </div>
              <span className="catalog-cta">Voir la fiche complete</span>
            </div>
          </Link>
        ))}
      </div>
      {programs.length === 0 && (
        <p className="results-count">Aucune formation ne correspond a ces filtres.</p>
      )}
    </>
  );
}
