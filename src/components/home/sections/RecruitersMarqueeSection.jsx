import styles from "./RecruitersMarqueeSection.module.css";
import SectionShell from "../shared/SectionShell";
import { recruitersData } from "../../../data/home";

export default function RecruitersMarqueeSection() {
  return (
    <SectionShell className={styles.root} variant="full">
      <div className="section-head recruiters-head">
        <h2>{recruitersData.title}</h2>
      </div>
      <div className="company-marquee">
        <div className="company-track">
          {[...recruitersData.companies, ...recruitersData.companies].map((company, index) => (
            <article key={`${company.name}-${index}`} className="company-item company-item-marquee">
              <img src={company.logo} alt={`Logo ${company.name}`} width="196" height="48" loading="lazy" decoding="async" />
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
