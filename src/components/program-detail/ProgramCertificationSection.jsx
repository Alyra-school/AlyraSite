export default function ProgramCertificationSection({ programTitle, certification }) {
  const iconMap = {
    lock: "🖱️",
    degree: "△",
    laptop: "💻",
    mic: "🎤",
    webcam: "📹",
    wifi: "📶",
    check: "✓",
  };

  return (
    <section className="section program-section anchor-section program-certification-section" id="certification">
      <div className="program-certification-hero">
        <div>
          <h2>
            {certification.meta.headlinePrefix}{" "}
            <span>{certification.meta.headlineAccent}</span>
          </h2>
        </div>
        {certification.meta.badgeImageUrl ? (
          <img
            src={certification.meta.badgeImageUrl}
            alt={certification.meta.badgeAlt ?? "Badge certification"}
            loading="lazy"
            decoding="async"
            width="210"
            height="96"
          />
        ) : null}
      </div>

      <div className="program-certification-intro">
        <figure className="program-certification-intro-visual" aria-hidden="true">
          <span className="program-certification-visual-shape" />
          <img src="/inspired/team/corco.webp" alt="" loading="lazy" decoding="async" width="360" height="420" />
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
        </figure>
        <div className="program-certification-intro-copy">
          {certification.meta.introLabel ? <p className="program-certification-intro-label">{certification.meta.introLabel}</p> : null}
          <h3>{certification.meta.introTitle || `Certification ${programTitle}`}</h3>
          {certification.meta.introDescription ? <p>{certification.meta.introDescription}</p> : null}
          {certification.meta.introReference ? <p>{certification.meta.introReference}</p> : null}
          <p className="program-certification-trustpilot">
            <strong>Excellent</strong> {certification.meta.trustpilotScore ?? "4.9 sur 5"}{" "}
            <span>★ Trustpilot</span>
          </p>
        </div>
      </div>

      <div className="program-certification-prereqs">
        <h3>Quels prérequis ?</h3>
        <div className="program-certification-prereq-cards">
          {certification.prereqCards.map((card) => (
            <article key={`prereq-card-${card.position}`}>
              <span>{iconMap[card.iconKey] ?? "✓"}</span>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className="program-certification-prereq-tools">
          {certification.prereqTools.map((tool) => (
            <div key={`prereq-tool-${tool.position}`}>
              <span>{iconMap[tool.iconKey] ?? "•"}</span>
              <p>{tool.label}</p>
            </div>
          ))}
        </div>
        <ul className="program-certification-prereq-bullets">
          {certification.prereqBullets.map((item) => (
            <li key={`prereq-bullet-${item.position}`}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div className="program-certification-competencies">
        <h3><span>Compétences</span> certifiées</h3>
        <div className="program-certification-competencies-panel">
          {certification.competencies.map((item) => (
            <article key={`competency-${item.position}`}>
              <h4>✓ {item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="program-certification-objectives">
        <h3><span>Objectifs</span> de la certification</h3>
        <div className="program-certification-objectives-panel">
          {certification.objectives.map((item) => (
            <p key={`objective-${item.position}`}>{item.text}</p>
          ))}
        </div>
      </div>

      <div className="program-certification-final-grid">
        <div className="program-certification-evaluation">
          <h3><span>Modalités d’évaluation</span> des compétences</h3>
          <p className="program-certification-evaluation-subtitle">
            La certification est obtenue par tout(e) candidat(e) maîtrisant l'ensemble des compétences.
          </p>
          <div className="program-certification-evaluation-cards">
            {certification.evaluations.map((item) => (
              <article key={`evaluation-${item.position}`}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="program-certification-validation">
          <h3>Conditions à respecter pour <span>valider cette formation</span></h3>
          <div>
            <span>{iconMap.check}</span>
            <ul>
              {certification.validationRules.map((item) => (
                <li key={`validation-${item.position}`}>{item.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
