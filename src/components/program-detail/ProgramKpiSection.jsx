export default function ProgramKpiSection({ programId, items }) {
  if (!items.length) return null;

  return (
    <section className="section program-section anchor-section" id="programme">
      <div className="program-kpi-showcase">
        <div className="section-head program-kpi-head">
          <h2>
            Alyra, votre passerelle vers une activité qui allie{" "}
            <span className="hero-accent">passion, expertise et rémunération</span>
          </h2>
        </div>

        <div className="program-kpi-layout">
          <figure className="program-kpi-visual" aria-hidden="true">
            <span className="program-kpi-visual-shape" />
            <img
              src="/inspired/team/christian.avif"
              alt=""
              className="program-kpi-visual-image"
              loading="lazy"
              decoding="async"
            />
            <span className="program-kpi-dot dot-1" />
            <span className="program-kpi-dot dot-2" />
            <span className="program-kpi-dot dot-3" />
            <span className="program-kpi-dot dot-4" />
          </figure>

          <div className="program-kpi-stack">
            {items.map((item, index) => (
              <article
                key={`${programId}-kpi-${item.position}`}
                className={`program-kpi-panel ${index === 1 ? "is-neutral" : "is-featured"}`}
              >
                <h3>{item.value}</h3>
                <p>{item.description ?? item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
