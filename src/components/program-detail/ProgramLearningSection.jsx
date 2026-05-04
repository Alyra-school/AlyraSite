export default function ProgramLearningSection({ programId, items }) {
  if (!items.length) return null;

  return (
    <section className="section program-section anchor-section" id="programme-brochure">
      <div className="section-head program-learning-head">
        <h2>
          Une formation qui vous apporte une vision a 360° de l'ecosysteme blockchain
        </h2>
        <p>Vous allez apprendre a...</p>
      </div>
      <div className="program-learning-showcase-grid">
        {items.map((item, index) => (
          <article key={`${programId}-learn-${index}`} className="program-learning-showcase-card">
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
