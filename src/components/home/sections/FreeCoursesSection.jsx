import styles from "./FreeCoursesSection.module.css";
import SectionShell from "../shared/SectionShell";
import CtaButtons from "../shared/CtaButtons";
import { freeCoursesData } from "../../../data/home";

export default function FreeCoursesSection() {
  return (
    <SectionShell className={`${styles.root} free-courses-section`} variant="contained">
      <h2 className="free-courses-title">
        Participez a nos <span>5 cours gratuits</span> sur la Crypto et l'IA
      </h2>
      <div className="free-courses-layout">
        <div className="free-courses-copy">
          <h3>
            Formation <span>certifiantes</span>
          </h3>
          <p>
            <strong>
              Initiez-vous gratuitement aux fondamentaux de la blockchain, des crypto-actifs et de l'intelligence
              artificielle
            </strong>{" "}
            a travers 5 modules accessibles a tous.
          </p>
          <p className="free-courses-subtitle">{freeCoursesData.listTitle}</p>
          <ul className="free-courses-list">
            {freeCoursesData.checklist.map((item) => (
              <li key={item.id}>
                <span className="free-courses-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m7.6 12.3 3 3 5.9-6.3" />
                  </svg>
                </span>
                <p>
                  <strong>{item.lead}</strong> {item.text}
                </p>
              </li>
            ))}
          </ul>
          <CtaButtons className="free-courses-actions" items={freeCoursesData.ctas} />
        </div>
        <div className="free-courses-visual" aria-hidden="true">
          <div className="free-courses-visual-frame"></div>
          <img src={freeCoursesData.image} alt="" width="520" height="640" loading="lazy" decoding="async" />
        </div>
      </div>
    </SectionShell>
  );
}
