import styles from "./WhyTechSection.module.css";
import SectionShell from "../shared/SectionShell";
import { whyTechData } from "../../../data/home";

export default function WhyTechSection() {
  return (
    <SectionShell className={`${styles.root} why-tech-section`} variant="contained">
      <div className="why-block">
        <h2>
          Pourquoi se former aux <span>nouvelles technologies ?</span>
        </h2>
        <div className="why-cards-grid">
          {whyTechData.cards.map((item) => (
            <article key={item.id} className="why-card">
              <h3>
                {item.titlePrefix} <span>{item.titleAccent}</span>
              </h3>
              <p>{item.body}</p>
              <footer>{item.source}</footer>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
