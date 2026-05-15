"use client";

import { useState } from "react";

function SocialLink({ social, personName }) {
  if (!social?.href) return null;
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.label} de ${personName}`}
      className="alumni-social-link"
    >
      {social.symbol}
    </a>
  );
}

function AlumniCard({ alumni }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="alumni-card">
      <figure className="alumni-card-image-wrap">
        <img src={alumni.imageUrl} alt={alumni.name} loading="lazy" decoding="async" />
      </figure>

      <div className="alumni-card-head">
        <h3>{alumni.name}</h3>
        <div className="alumni-card-socials" aria-label={`Reseaux de ${alumni.name}`}>
          {(alumni.socials || []).map((social) => (
            <SocialLink key={`${alumni.id}-${social.label}`} social={social} personName={alumni.name} />
          ))}
        </div>
      </div>

      <p className="alumni-card-role">{alumni.role}</p>

      <p className={`alumni-card-text ${expanded ? "is-open" : ""}`}>{alumni.description}</p>
      <button
        type="button"
        className="alumni-more-btn"
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
    <section id={section.anchorId ?? "hall-of-fame"} className="alumni-hall-section anchor-section">
      <p className="alumni-hall-eyebrow">{section.eyebrow}</p>
      <h2>{section.title}</h2>
      <p className="alumni-hall-subtitle">{section.subtitle}</p>

      <div className="alumni-masonry-columns">
        {columns.map((column, idx) => (
          <div
            key={`alumni-col-${idx}`}
            className={`alumni-masonry-col ${idx === 1 ? "alumni-masonry-col-mid" : ""}`}
          >
            {column.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
