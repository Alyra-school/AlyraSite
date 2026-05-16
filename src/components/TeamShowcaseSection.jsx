"use client";

import styles from "./TeamShowcaseSection.module.css";

export default function TeamShowcaseSection({ section }) {
  if (!section || !section.members?.length) return null;

  return (
    <section id={section.anchorId ?? "notre-equipe"} className={`${styles.teamShowcase} anchor-section`}>
      <p className={styles.teamEyebrow}>{section.eyebrow}</p>
      <h2 className={styles.teamTitle}>{section.title}</h2>
      <p className={styles.teamSubtitle}>{section.subtitle}</p>

      <div className={styles.teamGrid}>
        {section.members.map((member) => (
          <article key={member.id} className={styles.teamCard}>
            <figure className={styles.avatarWrap}>
              <img className={styles.avatarImage} src={member.avatar} alt={member.name} loading="lazy" decoding="async" />
            </figure>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
            {member.quote ? <p className={styles.memberQuote}>{member.quote}</p> : null}
            <div className={styles.socials} aria-label={`Reseaux de ${member.name}`}>
              <a
                className={styles.socialLink}
                href={member.linkedinUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${member.name}`}
              >
                in
              </a>
              {member.extraSocials?.map((social) => (
                <a
                  key={`${member.id}-${social.label}`}
                  className={styles.socialLink}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} de ${member.name}`}
                >
                  {social.symbol}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
