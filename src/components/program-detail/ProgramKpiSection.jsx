import styles from "./ProgramContentSections.module.css";

export default function ProgramKpiSection({ programId, items }) {
  if (!items.length) return null;

  return (
    <section className="section program-section anchor-section" id="programme">
      <div className={styles.kpiShowcase}>
        <div className={`section-head ${styles.kpiHead}`}>
          <h2>
            Alyra, votre passerelle vers une activité qui allie{" "}
            <span className={styles.kpiAccent}>passion, expertise et rémunération</span>
          </h2>
        </div>

        <div className={styles.kpiLayout}>
          <figure className={styles.kpiVisual} aria-hidden="true">
            <span className={styles.kpiVisualShape} />
            <img
              src="/inspired/team/christian.avif"
              alt=""
              className={styles.kpiVisualImage}
              loading="lazy"
              decoding="async"
            />
            <span className={`${styles.kpiDot} ${styles.kpiDot1}`} />
            <span className={`${styles.kpiDot} ${styles.kpiDot2}`} />
            <span className={`${styles.kpiDot} ${styles.kpiDot3}`} />
            <span className={`${styles.kpiDot} ${styles.kpiDot4}`} />
          </figure>

          <div className={styles.kpiStack}>
            {items.map((item, index) => (
              <article
                key={`${programId}-kpi-${item.position}`}
                className={`${styles.kpiPanel} ${index === 1 ? styles.kpiPanelNeutral : styles.kpiPanelFeatured}`}
              >
                <h3>{item.value}</h3>
                <p>{item.description ?? item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
