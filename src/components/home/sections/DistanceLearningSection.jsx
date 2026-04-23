import Link from "next/link";
import styles from "./DistanceLearningSection.module.css";
import SectionShell from "../shared/SectionShell";
import IconRenderer from "../shared/IconRenderer";
import { distanceLearningData } from "../../../data/home";

export default function DistanceLearningSection() {
  return (
    <SectionShell className={`${styles.root} financing-section`} variant="contained">
      <div className="financing-layout">
        <div className="financing-copy">
          <h2>
            Formation <span>100% a distance</span>
          </h2>
          <p>{distanceLearningData.body}</p>
          <ul className="financing-points">
            {distanceLearningData.points.map((point) => (
              <li key={point}>
                <span className="financing-point-icon" aria-hidden="true">
                  <IconRenderer name="loop" />
                </span>
                <strong>{point}</strong>
              </li>
            ))}
          </ul>
          <Link href={distanceLearningData.cta.href} className="primary financing-cta-btn">
            {distanceLearningData.cta.label}
          </Link>
        </div>
        <div className="financing-visual" aria-hidden="true">
          <div className="financing-visual-frame"></div>
          <img src={distanceLearningData.image} alt="" width="560" height="360" loading="lazy" decoding="async" />
        </div>
      </div>
    </SectionShell>
  );
}
