import styles from "./EmployabilitySection.module.css";
import SectionShell from "../shared/SectionShell";
import { employabilityData } from "../../../data/home";

export default function EmployabilitySection() {
  return (
    <SectionShell className={`${styles.root} employability-section`} variant="contained">
      <div className="section-head employability-head">
        <h2>
          Propulsez votre <span className="hero-accent">vie professionnelle & personnelle</span>
        </h2>
        <p>
          En maitrisant de nouvelles <span className="hero-accent">competences recherchees</span> sur le marche du
          travail
        </p>
      </div>

      <div className="employability-stack">
        {employabilityData.rows.map((row) => {
          const rowContent = (
            <>
              <article className="employability-badge-card">
                <div className={row.badge.className}>
                  <strong>{row.badge.value}</strong>
                  <span>{row.badge.label}</span>
                </div>
              </article>
              <article className="employability-copy">
                <h3>{row.sourceTitle}</h3>
                <ul className="simple-list">
                  {row.sourceList.map((item) => {
                    const [lead, ...rest] = item.split(" ");
                    return (
                      <li key={item}>
                        <strong>{lead}</strong> {rest.join(" ")}
                      </li>
                    );
                  })}
                </ul>
                {row.sourceFooter ? <p className="employability-source">{row.sourceFooter}</p> : null}
              </article>
            </>
          );

          return (
            <div key={row.id} className={`employability-row ${row.reverse ? "employability-row-reverse" : ""}`}>
              {rowContent}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
