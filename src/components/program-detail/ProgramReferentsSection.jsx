export default function ProgramReferentsSection({ programId, referents }) {
  if (!referents.length) return null;

  return (
    <section className="section program-section anchor-section program-referents-section" id="experts">
      <h2>Vos <span>référents</span></h2>
      <div className="program-referents-grid">
        {referents.map((expert, index) => (
          <article key={`${programId}-referent-${expert.id ?? expert.name ?? index}`} className="program-referent-card">
            <div className={`program-referent-hero ${index % 2 === 1 ? "is-reversed" : ""}`}>
              {expert.imageUrl ? <img src={expert.imageUrl} alt={expert.name ?? "Référent"} loading="lazy" decoding="async" /> : null}
              <div>
                <h3>{expert.name}</h3>
                <p>{expert.role}</p>
              </div>
            </div>
            <p className="program-referent-bio">{expert.bio}</p>
            {expert.highlights?.length > 0 ? (
              <ul className="program-referent-highlights">
                {expert.highlights.map((highlight) => (
                  <li key={`${expert.id ?? expert.name}-highlight-${highlight.position}`}>{highlight.text}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
