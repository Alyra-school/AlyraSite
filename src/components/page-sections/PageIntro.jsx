import styles from "./PageSections.module.css";

export default function PageIntro({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div className={`${styles.pageIntro} ${align === "left" ? styles.left : styles.center}`}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
