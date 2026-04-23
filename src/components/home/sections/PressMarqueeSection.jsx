import styles from "./PressMarqueeSection.module.css";
import SectionShell from "../shared/SectionShell";
import { pressData } from "../../../data/home";

export default function PressMarqueeSection() {
  const trackItems =
    pressData.logos.length > 1
      ? [...pressData.logos, ...pressData.logos, ...pressData.logos, ...pressData.logos]
      : pressData.logos;

  return (
    <SectionShell className={styles.root} variant="full">
      <div className="section-head">
        <h2>
          {pressData.titlePrefix} <span>{pressData.titleAccent}</span>
        </h2>
      </div>
      <div className="press-marquee" aria-label="Medias qui parlent d'Alyra">
        <div className="press-track">
          {trackItems.map((media, index) => (
            <article key={`${media.name}-${index}`} className="press-logo-item">
              <img src={media.logo} alt={`Logo ${media.name}`} width="220" height="80" loading="lazy" decoding="async" />
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
