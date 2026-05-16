"use client";

import { useState } from "react";
import styles from "./AlumniHallSection.module.css";

function SocialLink({ social, personName }) {
  if (!social?.href) return null;
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.label} de ${personName}`}
      className={styles.socialLink}
    >
      {social.symbol}
    </a>
  );
}

function AlumniCard({ alumni }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={styles.card}>
      <figure className={styles.imageWrap}>
        <img className={styles.image} src={alumni.imageUrl} alt={alumni.name} loading="lazy" decoding="async" />
      </figure>

      <div className={styles.cardHead}>
        <h3 className={styles.cardName}>{alumni.name}</h3>
        <div className={styles.cardSocials} aria-label={`Reseaux de ${alumni.name}`}>
          {(alumni.socials || []).map((social) => (
            <SocialLink key={`${alumni.id}-${social.label}`} social={social} personName={alumni.name} />
          ))}
        </div>
      </div>

      <p className={styles.cardRole}>{alumni.role}</p>

      <p className={`${styles.cardText} ${expanded ? "" : styles.cardTextClosed}`}>{alumni.description}</p>
      <button
        type="button"
        className={styles.moreBtn}
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Moins" : "Plus"}
      </button>
    </article>
  );
}

export default function AlumniHallSection({ section }) {
  if (!section || !section.people?.length) return null;

  const columns = [[], [], []];
  section.people.forEach((person, index) => {
    columns[index % 3].push(person);
  });

  return (
    <section id={section.anchorId ?? "hall-of-fame"} className={`${styles.hallSection} anchor-section`}>
      <p className={styles.eyebrow}>{section.eyebrow}</p>
      <h2 className={styles.title}>{section.title}</h2>
      <p className={styles.subtitle}>{section.subtitle}</p>

      <div className={styles.columns}>
        {columns.map((column, idx) => (
          <div key={`alumni-col-${idx}`} className={`${styles.column} ${idx === 1 ? styles.columnMid : ""}`}>
            {column.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
