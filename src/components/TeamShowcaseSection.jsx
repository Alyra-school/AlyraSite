"use client";

export default function TeamShowcaseSection({ section }) {
  if (!section || !section.members?.length) return null;

  return (
    <section id={section.anchorId ?? "notre-equipe"} className="about-team-showcase anchor-section">
      <p className="about-team-eyebrow">{section.eyebrow}</p>
      <h2>{section.title}</h2>
      <p className="about-team-subtitle">{section.subtitle}</p>

      <div className="about-team-grid">
        {section.members.map((member) => (
          <article key={member.id} className="about-team-card">
            <figure className="about-team-avatar-wrap">
              <img src={member.avatar} alt={member.name} loading="lazy" decoding="async" />
            </figure>
            <h3>{member.name}</h3>
            <p className="about-team-role">{member.role}</p>
            {member.quote ? <p className="about-team-quote">{member.quote}</p> : null}
            <div className="about-team-socials" aria-label={`Reseaux de ${member.name}`}>
              <a
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
