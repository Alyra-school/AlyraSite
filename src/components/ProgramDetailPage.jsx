import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

export default function ProgramDetailPage({
  program,
  similarPrograms,
  detailContent,
  isContentLoading,
}) {
  const professors = detailContent?.professors ?? [];
  const learningPath = detailContent?.learningPath ?? [];

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
                  <span>{program.price.toLocaleString("fr-FR")} EUR</span>
                </div>
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
                </>
              )}
            </div>
          </div>

          <section className="section">
            <div className="section-head">
              <h2>Comparaison rapide</h2>
              <p>Formations proches du catalogue pour t'aider a positionner ton choix.</p>
            </div>
            <div className="cards">
              {similarPrograms.map((item) => (
                <article key={item.id} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <div className="card-meta">
                    <span>{item.duration}</span>
                    <span>{item.price.toLocaleString("fr-FR")} EUR</span>
                  </div>
                  <Link className="text-button" href={`/programmes/${item.slug}`}>
                    Voir cette formation
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>Certification associee</h2>
            </div>
            <article className="card">
              <h3>{detailContent?.certificationTitle ?? `Certification Professionnelle ${program.title}`}</h3>
              <p>{detailContent?.certificationDescription}</p>
            </article>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>Programme detaille</h2>
            </div>
            <div className="cards">
              {learningPath.map((module) => (
                <article key={module} className="card">
                  <p>{module}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>Professeurs</h2>
              <p>Une equipe mixte: pedagogie, expertise terrain et accompagnement projet.</p>
            </div>
            <div className="cards">
              {professors.map((professor) => (
                <article key={professor.name} className="card">
                  <h3>{professor.name}</h3>
                  <div className="card-meta">
                    <span>{professor.role}</span>
                  </div>
                  <p>{professor.bio}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
