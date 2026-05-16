import styles from "./ProgramSections.module.css";

export default function ProgramFinancingStripSection({ logos }) {
  return (
    <section className={`section program-section ${styles.financingStrip}`}>
      <div className={styles.financingStripInner}>
        <h2 className={styles.financingTitle}>Faites <span>financer votre formation à 100%</span></h2>

        <div className={styles.financingLayout}>
          <div className={styles.financingCopy}>
            <p>
              <strong>+15</strong> organismes de financement sont à votre disposition.
            </p>
            <p>
              Que vous soyez salarié, entrepreneur, en reconversion ou en recherche d'emploi,
              votre formation peut être financée à 100 %.
            </p>
            <div className={styles.financingPayment}>
              <p>
                Ou payez en <b>2x</b> <b>3x</b> ou <b>4x</b> avec <span>Alma</span>
              </p>
              <div className={styles.financingCardBrands} aria-hidden="true">
                <em>VISA</em>
                <em>CB</em>
                <em>MC</em>
              </div>
            </div>
          </div>

          <div className={styles.financingLogoGrid} aria-label="Organismes de financement partenaires">
            {logos.map((item) => (
              <div key={`program-financing-${item.id}`} className={styles.financingLogoItem} aria-label={item.name}>
                {item.logo ? (
                  <img src={item.logo} alt={item.name} loading="lazy" decoding="async" />
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
