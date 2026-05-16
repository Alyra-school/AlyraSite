import styles from "./ProgramSections.module.css";

export default function ProgramAudienceSection({ programId, jobs }) {
  return (
    <section className={`section program-section ${styles.audienceSection}`}>
      <h2>À qui s'adresse cette formation ?</h2>
      <div className={styles.audienceLayout}>
        <div className={styles.audienceSectors} aria-label="Secteurs d'activité impactés">
          <p>Les secteurs d'activité impactés par la blockchain sont nombreux :</p>
          <div className={styles.audienceSectorPills}>
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

        <div className={styles.audienceCareerCard}>
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
