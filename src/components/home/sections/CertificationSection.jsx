import styles from "./CertificationSection.module.css";
import SectionShell from "../shared/SectionShell";
import { certificationData } from "../../../data/home";

export default function CertificationSection() {
  return (
    <SectionShell className={`${styles.root} certification-highlight`} variant="contained">
      <div className="section-head certification-highlight-head">
        <h2>
          {certificationData.title}
          <span className="hero-accent"> {certificationData.accent}</span>
        </h2>
      </div>

      <div className="certification-highlight-grid">
        {certificationData.stats.map((stat) =>
          stat.type === "trust" ? (
            <article key={stat.id} className="certification-stat-card is-trust">
              <p className="trustpilot-line">
                <strong>{stat.excellent}</strong>
                <span>{stat.score}</span>
                <span className="trustpilot-brand">{stat.brand}</span>
              </p>
              <p>{stat.text}</p>
            </article>
          ) : (
            <article key={stat.id} className="certification-stat-card is-solid">
              <strong>{stat.value}</strong>
              <p>{stat.text}</p>
            </article>
          ),
        )}
      </div>
    </SectionShell>
  );
}
