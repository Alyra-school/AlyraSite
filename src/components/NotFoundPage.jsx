import Link from "next/link";

export default function NotFoundPage({
  title = "Page introuvable",
  message = "La page que vous recherchez n'existe pas ou n'est plus disponible.",
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
          <Link href="/programmes" className="primary">
            Voir les programmes
          </Link>
          <Link href="/" className="ghost">
            Retour a l'accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
