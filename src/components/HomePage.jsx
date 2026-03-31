import Link from "next/link";
import {
  communityHighlights,
  events,
  financingHighlights,
  learnerFeedback,
  outcomes,
  programs,
  supportBlocks,
  teamMembers,
  testimonials,
  tracks,
} from "../data/homeData";

export default function HomePage() {
  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Ecole blockchain nouvelle generation</p>
            <h1>Devenez les architectes de la prochaine economie on-chain.</h1>
            <p className="hero-sub">
              Formations intensives en developpement, produit et strategie Web3.
              Apprenez avec des mentors du terrain et livrez des projets
              concrets.
            </p>
            <div className="hero-actions">
              <Link href="/programmes" className="primary">
                Voir les programmes
              </Link>
              <button type="button" className="ghost">
                Telecharger le syllabus
              </button>
            </div>
            <div className="hero-badges">
              <span>Campus Paris + Remote</span>
              <span>Financement possible</span>
              <span>Sessions trimestrielles</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-top">
              <p>Prochaines rentrees</p>
              <h3>Mai 2026</h3>
            </div>
            <div className="card-body">
              <div>
                <h4>34</h4>
                <p>Places disponibles</p>
              </div>
              <div>
                <h4>12</h4>
                <p>Semaines intensives</p>
              </div>
              <div>
                <h4>3</h4>
                <p>Projets encadres</p>
              </div>
            </div>
            <Link href="/rendez-vous" className="primary full">
              Planifier un entretien
            </Link>
          </div>
        </div>
      </header>

      <section id="programmes" className="section anchor-section">
        <div className="section-head">
          <h2>Programmes signatures</h2>
          <p>
            Des parcours construits avec des experts Web3, adaptes aux besoins
            des startups et grands groupes.
          </p>
        </div>
        <div className="cards">
          {programs.map((program) => (
            <article key={program.title} className="card">
              <div className="card-meta">
                <span>{program.duration}</span>
                <span>{program.level}</span>
              </div>
              <h3>{program.title}</h3>
              <p>{program.desc}</p>
              <Link href="/programmes" className="text-button">
                Voir le contenu
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="parcours" className="section split anchor-section">
        <div>
          <h2>Choisissez votre rythme</h2>
          <p>
            Chaque parcours combine apprentissage synchrones, ateliers pratiques
            et accompagnement individuel.
          </p>
          <div className="tracks">
            {tracks.map((track) => (
              <article key={track.title} className="track">
                <div className="track-label">{track.label}</div>
                <h3>{track.title}</h3>
                <p>{track.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="side-panel">
          <h3>Notre methode</h3>
          <ul>
            <li>Apprendre en construisant des dApps reelles.</li>
            <li>Mentorat par des builders actifs.</li>
            <li>Objectifs clairs a chaque sprint.</li>
            <li>Demo day pour valoriser vos projets.</li>
          </ul>
          <div className="panel-stats">
            {outcomes.map((item) => (
              <div key={item.label}>
                <h4>{item.value}</h4>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resultats" className="section gradient anchor-section">
        <div className="section-head">
          <h2>Resultats qui parlent</h2>
          <p>
            Nos alumni rejoignent des scale-ups, lancent leurs startups et
            construisent des protocoles open-source.
          </p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial">
              <p>"{item.quote}"</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Equipe pedagogique</h2>
          <p>
            Formez-vous avec des professionnels actifs sur des projets blockchain
            et IA en production.
          </p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <article key={member.name} className="team-card">
              <img
                src={member.avatar}
                alt={member.name}
                className="team-avatar"
                loading="lazy"
                decoding="async"
              />
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              <p>{member.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section community-section">
        <div className="section-head">
          <h2>Communaute Discord</h2>
          <p>
            Une communaute active pour apprendre plus vite, partager vos blocages
            et accelerer vos projets.
          </p>
        </div>
        <div className="cards">
          {communityHighlights.map((item) => (
            <article key={item.title} className="card">
              <div className="card-meta">
                <span>{item.metric}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Accompagnement de bout en bout</h2>
          <p>
            De l'admission au retour a l'emploi: un cadre clair pour avancer
            sereinement.
          </p>
        </div>
        <div className="cards">
          {supportBlocks.map((block) => (
            <article key={block.title} className="card">
              <h3>{block.title}</h3>
              <ul className="simple-list">
                {block.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section financing-section anchor-section">
        <div className="section-head">
          <h2>Financement de votre formation</h2>
          <p>
            Plusieurs options existent pour rejoindre Alyra sans freiner votre
            projet professionnel.
          </p>
        </div>
        <div className="cards">
          {financingHighlights.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Retours apprenants</h2>
          <p>
            Ce que nos apprenants retiennent du format, de l'accompagnement et
            de la progression sur les projets.
          </p>
        </div>
        <div className="testimonial-grid">
          {learnerFeedback.map((item) => (
            <article key={item.name} className="testimonial">
              <p>"{item.quote}"</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ressources" className="section anchor-section">
        <div className="section-head">
          <h2>Moments a venir</h2>
          <p>
            Participez a nos evenements ouverts, ateliers live et sessions
            d'information.
          </p>
        </div>
        <div className="events">
          {events.map((event) => (
            <article key={event.title} className="event">
              <div className="event-date">{event.date}</div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </div>
              <button type="button" className="ghost">
                Reserver
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta">
        <div>
          <h2>Pret a passer au niveau Web3 ?</h2>
          <p>
            Recevez le programme detaille, les conditions d'admission et les
            options de financement.
          </p>
        </div>
        <button type="button" className="primary">
          Demander la brochure
        </button>
      </section>

      <footer className="footer">
        <div>
          <div className="logo">
            <img className="logo-mark" src="/logo_bleu.svg" alt="Alyra logo" />
            <span>Alyra, l'ecole Blockchain et IA</span>
          </div>
          <p>Ecole blockchain fondee par des builders, pour des builders.</p>
        </div>
        <div className="footer-links">
          <Link href="/programmes" className="nav-link">
            Programmes
          </Link>
          <a className="nav-link" href="/#parcours">
            Admissions
          </a>
          <a className="nav-link" href="/#resultats">
            Carriere
          </a>
          <Link href="/rendez-vous" className="nav-link">
            Contact
          </Link>
        </div>
        <div className="footer-news">
          <span>Newsletter</span>
          <div className="newsletter">
            <label className="sr-only" htmlFor="newsletter-email">
              Votre email
            </label>
            <input id="newsletter-email" placeholder="Votre email" type="email" autoComplete="email" />
            <button type="button" className="ghost">
              S'inscrire
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
