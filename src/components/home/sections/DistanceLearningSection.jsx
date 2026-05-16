import Link from "next/link";
import styles from "./DistanceLearningSection.module.css";
import SectionShell from "../shared/SectionShell";
import IconRenderer from "../shared/IconRenderer";
import { distanceLearningData } from "../../../data/home";

export default function DistanceLearningSection() {
  return (
    <SectionShell className={styles.root} variant="contained">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            Formation <span className={styles.titleAccent}>100% a distance</span>
          </h2>
          <p className={styles.body}>{distanceLearningData.body}</p>
          <ul className={styles.points}>
            {distanceLearningData.points.map((point) => (
              <li className={styles.point} key={point}>
                <span className={styles.pointIcon} aria-hidden="true">
                  <IconRenderer name="loop" />
                </span>
                <strong className={styles.pointText}>{point}</strong>
              </li>
            ))}
          </ul>
          <Link href={distanceLearningData.cta.href} className={`primary ${styles.cta}`}>
            {distanceLearningData.cta.label}
          </Link>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualFrame}></div>
          <img
            className={styles.visualImage}
            src={distanceLearningData.image}
            alt=""
            width="560"
            height="360"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </SectionShell>
  );
}
