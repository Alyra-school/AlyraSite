export default function ProgramFaqSection({ programId, faqs }) {
  if (!faqs.length) return null;

  return (
    <section className="section program-section">
      <div className="section-head">
        <span className="program-eyebrow">FAQ</span>
        <h2>Questions frequentes</h2>
      </div>
      <div className="program-faq-grid">
        {faqs.map((item) => (
          <article key={`${programId}-faq-${item.key}`} className="card">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
