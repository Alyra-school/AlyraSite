import styles from "./ProgramSections.module.css";

export default function ProgramReferentsSection({ programId, referents }) {
  if (!referents.length) return null;

  return (
    <section className={`section program-section anchor-section ${styles.referentsSection}`} id="experts">
      <h2>Vos <span>référents</span></h2>
      <div className={styles.referentsGrid}>
        {referents.map((expert, index) => (
          <article key={`${programId}-referent-${expert.id ?? expert.name ?? index}`} className={styles.referentCard}>
            <div className={`${styles.referentHero} ${index % 2 === 1 ? styles.referentHeroReversed : ""}`}>
              {expert.imageUrl ? <img src={expert.imageUrl} alt={expert.name ?? "Référent"} loading="lazy" decoding="async" /> : null}
              <div>
                <h3>{expert.name}</h3>
                <p>{expert.role}</p>
              </div>
            </div>
            <p className={styles.referentBio}>{expert.bio}</p>
            {expert.highlights?.length > 0 ? (
              <ul className={styles.referentHighlights}>
                {expert.highlights.map((highlight) => (
                  <li key={`${expert.id ?? expert.name}-highlight-${highlight.position}`}>{highlight.text}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
