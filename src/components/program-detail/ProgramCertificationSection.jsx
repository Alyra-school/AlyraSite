import styles from "./ProgramSections.module.css";

export default function ProgramCertificationSection({ programTitle, certification }) {
  const meta = certification?.meta ?? {};
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
    <section className={`section program-section anchor-section ${styles.certificationSection}`} id="certification">
      <div className={styles.certificationHero}>
        <div>
          <h2>
            {meta.headlinePrefix ?? "La certification enregistrée par"}{" "}
            <span>{meta.headlineAccent ?? "France Compétence"}</span>
          </h2>
        </div>
        {meta.badgeImageUrl ? (
          <img
            src={meta.badgeImageUrl}
            alt={meta.badgeAlt ?? "Badge certification"}
            loading="lazy"
            decoding="async"
            width="210"
            height="96"
          />
        ) : null}
      </div>

      <div className={styles.certificationIntro}>
        <figure className={styles.certificationIntroVisual} aria-hidden="true">
          <span className={styles.certificationVisualShape} />
          <img src="/inspired/team/corco.webp" alt="" loading="lazy" decoding="async" width="360" height="420" />
          <span className={`${styles.certificationDot} ${styles.certificationDot1}`} />
          <span className={`${styles.certificationDot} ${styles.certificationDot2}`} />
          <span className={`${styles.certificationDot} ${styles.certificationDot3}`} />
        </figure>
        <div className={styles.certificationIntroCopy}>
          {meta.introLabel ? <p className={styles.certificationIntroLabel}>{meta.introLabel}</p> : null}
          <h3>{meta.introTitle || `Certification ${programTitle}`}</h3>
          {meta.introDescription ? <p>{meta.introDescription}</p> : null}
          {meta.introReference ? <p>{meta.introReference}</p> : null}
          <p className={styles.certificationTrustpilot}>
            <strong>Excellent</strong> {meta.trustpilotScore ?? "4.9 sur 5"}{" "}
            <span>★ Trustpilot</span>
          </p>
        </div>
      </div>

      <div>
        <h3>Quels prérequis ?</h3>
        <div className={styles.certificationPrereqCards}>
          {certification.prereqCards.map((card) => (
            <article key={`prereq-card-${card.position}`}>
              <span>{iconMap[card.iconKey] ?? "✓"}</span>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.certificationPrereqTools}>
          {certification.prereqTools.map((tool) => (
            <div key={`prereq-tool-${tool.position}`}>
              <span>{iconMap[tool.iconKey] ?? "•"}</span>
              <p>{tool.label}</p>
            </div>
          ))}
        </div>
        <ul className={styles.certificationPrereqBullets}>
          {certification.prereqBullets.map((item) => (
            <li key={`prereq-bullet-${item.position}`}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3><span>Compétences</span> certifiées</h3>
        <div className={styles.certificationCompetenciesPanel}>
          {certification.competencies.map((item) => (
            <article key={`competency-${item.position}`}>
              <h4>✓ {item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h3><span>Objectifs</span> de la certification</h3>
        <div className={styles.certificationObjectivesPanel}>
          {certification.objectives.map((item) => (
            <p key={`objective-${item.position}`}>{item.text}</p>
          ))}
        </div>
      </div>

      <div className={styles.certificationFinalGrid}>
        <div>
          <h3><span>Modalités d’évaluation</span> des compétences</h3>
          <p className={styles.certificationEvaluationSubtitle}>
            La certification est obtenue par tout(e) candidat(e) maîtrisant l'ensemble des compétences.
          </p>
          <div className={styles.certificationEvaluationCards}>
            {certification.evaluations.map((item) => (
              <article key={`evaluation-${item.position}`}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3>Conditions à respecter pour <span>valider cette formation</span></h3>
          <div className={styles.certificationValidationBox}>
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
