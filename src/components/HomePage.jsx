"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  certificationBlocks,
  communityHighlights,
  events,
  financingHighlights,
  financingPartners,
  footerColumns,
  footerCertifications,
  footerSocials,
  freeCourses,
  learnerFeedback,
  latestNews,
  outcomes,
  parcoursBlockchain,
  parcoursEntreprise,
  parcoursIA,
  pressLogos,
  recruiterCompanies,
  supportBlocks,
  teamMembers,
  testimonials,
  tracks,
  trainingHighlights,
  whyLearnCards,
} from "../data/homeData";

export default function HomePage() {
  const orbitRef = useRef(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const layeredItems = Array.from(orbit.querySelectorAll("[data-depth]"));
    const MAX_OFFSET = 11;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    const getNumber = (value, fallback) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const updateFromPointer = (event) => {
      const rect = orbit.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-1, Math.min(1, px * 2));
      targetY = Math.max(-1, Math.min(1, py * 2));
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = (timestamp) => {
      const time = timestamp / 1000;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      layeredItems.forEach((item, index) => {
        const depth = getNumber(item.getAttribute("data-depth"), 0);
        const xMult = getNumber(item.getAttribute("data-xmult"), index % 2 === 0 ? 1 : -1);
        const yMult = getNumber(item.getAttribute("data-ymult"), index % 3 === 0 ? -1 : 1);
        const drift = getNumber(item.getAttribute("data-drift"), 2.2);
        const speed = getNumber(item.getAttribute("data-speed"), 0.9);
        const phase = getNumber(item.getAttribute("data-phase"), index * 0.6);

        const pointerX = currentX * depth * MAX_OFFSET * xMult;
        const pointerY = currentY * depth * MAX_OFFSET * yMult;
        const idleX = Math.sin(time * speed + phase) * drift;
        const idleY = Math.cos(time * speed * 0.9 + phase) * (drift * 0.8);
        const tx = pointerX + idleX;
        const ty = pointerY + idleY;

        item.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    orbit.addEventListener("pointermove", updateFromPointer);
    orbit.addEventListener("pointerleave", reset);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      orbit.removeEventListener("pointermove", updateFromPointer);
      orbit.removeEventListener("pointerleave", reset);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-proof">
              <span>Excellent 4.9 sur 5 Trustpilot</span>
              <span>★★★★★ 4,9/5</span>
            </div>
            <h1>
              La Blockchain et l'IA ne vous remplaceront pas.
              <br />
              <span className="hero-accent">A une condition, les maitriser.</span>
            </h1>
            <p className="hero-sub">
              Rejoignez Alyra pour des formations certifiantes 100% en ligne.
              Transformez votre curiosite en carriere avec des experts du terrain.
            </p>
            <div className="hero-webinars">
              <Link href="/rendez-vous" className="webinar-card webinar-link">
                <span className="webinar-play">▶</span>
                <span>
                  <strong>Webinar Parcours Blockchain</strong>
                  <small>Inscriptions gratuites</small>
                </span>
              </Link>
              <Link href="/rendez-vous" className="webinar-card webinar-link">
                <span className="webinar-play">▶</span>
                <span>
                  <strong>Webinar Parcours IA</strong>
                  <small>Inscriptions gratuites</small>
                </span>
              </Link>
            </div>
          </div>
          <div className="hero-orbit" aria-hidden="true" ref={orbitRef}>
            <div className="orbit-ring"></div>
            <div className="orbit-center" data-depth="0.1" data-drift="1.2" data-speed="0.6" data-phase="0.4">
              <img src="/logo_blanc.svg" alt="" />
            </div>
            <Link href="/programmes/dev-blockchain" className="orbit-pill orbit-pill-1" data-depth="0.38" data-xmult="1" data-ymult="-0.9" data-drift="2.2" data-speed="0.7" data-phase="0.2">
              Developpement blockchain
            </Link>
            <Link href="/programmes/finance-decentralisee" className="orbit-pill orbit-pill-2" data-depth="0.5" data-xmult="-0.8" data-ymult="1" data-drift="2.8" data-speed="0.95" data-phase="0.9">
              Finance decentralisee
            </Link>
            <Link href="/programmes/expert-blockchain" className="orbit-pill orbit-pill-3" data-depth="0.45" data-xmult="-1" data-ymult="-0.7" data-drift="2.4" data-speed="0.85" data-phase="1.5">
              Consulting blockchain
            </Link>
            <Link href="/programmes/consultant-intelligence-artificielle" className="orbit-pill orbit-pill-4" data-depth="0.52" data-xmult="0.9" data-ymult="0.8" data-drift="2.6" data-speed="1.05" data-phase="2.2">
              Consulting IA
            </Link>
            <Link href="/programmes/developpeur-intelligence-artificielle" className="orbit-pill orbit-pill-5" data-depth="0.42" data-xmult="0.75" data-ymult="-1" data-drift="2.3" data-speed="0.8" data-phase="2.8">
              Developpement IA
            </Link>
            <span className="orbit-dot orbit-dot-1" data-depth="0.5" data-xmult="0.7" data-ymult="-0.8" data-drift="2.2" data-speed="0.95" data-phase="0.4"></span>
            <span className="orbit-dot orbit-dot-2" data-depth="0.48" data-xmult="-0.9" data-ymult="0.65" data-drift="2.1" data-speed="1.05" data-phase="1.8"></span>
            <span className="orbit-dot orbit-dot-3" data-depth="0.52" data-xmult="0.8" data-ymult="0.9" data-drift="2.3" data-speed="1.1" data-phase="2.2"></span>
          </div>
        </div>
      </header>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Nos +2 500 apprenants sont demandes par</h2>
        </div>
        <div className="company-marquee">
          <div className="company-track">
            {[...recruiterCompanies, ...recruiterCompanies].map((company, index) => (
              <article key={`${company.name}-${index}`} className="company-item company-item-marquee">
                <img src={company.logo} alt={`Logo ${company.name}`} loading="lazy" decoding="async" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="programmes" className="section anchor-section">
        <div className="section-head">
          <h2>Un parcours complet et modulable</h2>
          <p>
            Nos parcours blockchain, IA et entreprise sont adaptes aux besoins
            des individus, des equipes et des organisations.
          </p>
        </div>

        <h3 className="sub-section-title">Nos parcours blockchain</h3>
        <div className="parcours-grid">
          {parcoursBlockchain.map((item) => (
            <article key={item.title} className="parcours-card">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              <div className="parcours-overlay">
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>

        <h3 className="sub-section-title">Nos parcours IA</h3>
        <div className={`parcours-grid ${parcoursIA.length === 2 ? "parcours-grid-two" : ""}`}>
          {parcoursIA.map((item) => (
            <article key={item.title} className="parcours-card">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              <div className="parcours-overlay">
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>

        <h3 className="sub-section-title">Nos parcours Entreprise</h3>
        <div className={`parcours-grid ${parcoursEntreprise.length === 2 ? "parcours-grid-two" : ""}`}>
          {parcoursEntreprise.map((item) => (
            <article key={item.title} className="parcours-card">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              <div className="parcours-overlay">
                <h4>{item.title}</h4>
              </div>
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
        <div className="company-wall financing-wall">
          {financingPartners.map((partner) => (
            <article key={partner.name} className="company-item">
              <img src={partner.logo} alt={`Logo ${partner.name}`} loading="lazy" decoding="async" />
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Des formations concues pour vous mener a la certification</h2>
        </div>
        <div className="cards">
          {certificationBlocks.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Participez a nos 5 cours gratuits sur la Crypto et l'IA</h2>
        </div>
        <div className="cards">
          {freeCourses.map((course) => (
            <article key={course} className="card">
              <h3>{course}</h3>
              <p>Un format court pour decouvrir les fondamentaux avant de rejoindre un parcours long.</p>
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

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Pourquoi se former aux nouvelles technologies ?</h2>
        </div>
        <div className="cards">
          {whyLearnCards.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Temps forts de la formation Alyra</h2>
        </div>
        <div className="cards">
          {trainingHighlights.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Nos dernieres actualites</h2>
        </div>
        <div className="cards">
          {latestNews.map((post) => (
            <article key={post.title} className="card">
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section anchor-section">
        <div className="section-head">
          <h2>Ils parlent de nous</h2>
        </div>
        <div className="company-wall media-wall">
          {pressLogos.map((media) => (
            <article key={media.name} className="company-item media-item">
              <img src={media.logo} alt={`Logo ${media.name}`} loading="lazy" decoding="async" />
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

      <footer className="footer footer-alyra">
        <div className="footer-main">
          <div className="footer-brand-col">
            <div className="logo">
              <img className="logo-mark" src="/logo_bleu.svg" alt="Alyra logo" />
              <span>Alyra, l'ecole Blockchain et IA</span>
            </div>
            <p>Ecole blockchain fondee par des builders, pour des builders.</p>
            <div className="footer-socials">
              {footerSocials.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name}>
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="footer-links">
              <strong>{column.title}</strong>
              {column.links.map((item) => (
                <Link key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-qualiopi">
          <a
            href="https://cdn.prod.website-files.com/638473041a643140c382a182/676139e944857c6ae61b2aa1_certificat-B02397-2024-11-15T23_00_00Z.pdf"
            target="_blank"
            rel="noreferrer"
            className="primary"
          >
            Telecharger le certificat Qualiopi
          </a>
          <div className="newsletter footer-newsletter-inline">
            <span className="newsletter-kicker">Newsletter Alyra</span>
            <div className="newsletter-controls">
            <label className="sr-only" htmlFor="newsletter-email-footer">
              Votre email
            </label>
            <input
              id="newsletter-email-footer"
              placeholder="Votre email"
              type="email"
              autoComplete="email"
            />
            <button type="button" className="ghost">
              S'inscrire
            </button>
            </div>
          </div>
        </div>

        <div className="footer-certs footer-certs-row">
          {footerCertifications.map((cert) => (
            <article key={cert.name} className="footer-cert-item">
              <img src={cert.logo} alt={`Certification ${cert.name}`} loading="lazy" decoding="async" />
            </article>
          ))}
        </div>

        <p className="footer-legal">Tous droits reserves a Alyra, fait par Cyril Castagnet.</p>
      </footer>
    </main>
  );
}
