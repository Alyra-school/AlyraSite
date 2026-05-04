export default function ProgramAudienceSection({ programId, jobs }) {
  return (
    <section className="section program-section program-audience-section">
      <h2>À qui s'adresse cette formation ?</h2>
      <div className="program-audience-layout">
        <div className="program-audience-sectors" aria-label="Secteurs d'activité impactés">
          <p>Les secteurs d'activité impactés par la blockchain sont nombreux :</p>
          <div className="program-audience-sector-pills">
            {["Finance", "Logistique", "Santé", "Immobilier", "Media", "Assurance", "Gouvernance"].map((sector) => (
              <span key={sector}>{sector}</span>
            ))}
          </div>
          <p>
            Faites évoluer vos activités grâce à des technologies d'avenir !
            <br />
            <a href="/blog">Étude Data bridge</a>
          </p>
        </div>

        <div className="program-audience-career-card">
          <div>
            <h3>Cette certification enrichit votre CV et ouvre la voie du Web3 et de la blockchain aux :</h3>
            <ul>
              {jobs.map((job) => (
                <li key={`${programId}-audience-job-${job.position}`}>{job.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
