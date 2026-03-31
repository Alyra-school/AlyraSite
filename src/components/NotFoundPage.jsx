export default function NotFoundPage({
  title = "Page introuvable",
  message = "La page que vous recherchez n'existe pas ou n'est plus disponible.",
  onHome,
  onCatalog,
}) {
  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero programs-hero notfound-hero">
        <div className="section-head">
          <p className="eyebrow">Erreur 404</p>
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
        <div className="hero-actions">
          <button type="button" className="primary" onClick={onCatalog}>
            Voir les programmes
          </button>
          <button type="button" className="ghost" onClick={onHome}>
            Retour a l'accueil
          </button>
        </div>
      </section>
    </main>
  );
}
