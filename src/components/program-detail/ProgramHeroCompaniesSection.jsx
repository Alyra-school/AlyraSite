export default function ProgramHeroCompaniesSection({ companies }) {
  if (!companies.length) return null;

  return (
    <section className="program-hero-companies" aria-label="Entreprises qui recrutent nos apprenants">
      <h2><span className="hero-accent">Nos apprenants formés en blockchain</span> sont demandés par :</h2>
      <div className="company-marquee">
        <div className="company-track">
          {[...companies, ...companies].map((company, index) => (
            <article key={`program-hero-company-${company.name}-${index}`} className="company-item company-item-marquee">
              <img src={company.logo} alt={`Logo ${company.name}`} width="196" height="48" loading="lazy" decoding="async" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
