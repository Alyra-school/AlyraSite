import styles from "./FinancingSupportSection.module.css";
import SectionShell from "../shared/SectionShell";
import CtaButtons from "../shared/CtaButtons";
import { financingSupportData } from "../../../data/home";

export default function FinancingSupportSection() {
  return (
    <SectionShell className={styles.root} variant="contained">
      <div className={styles.layout}>
        <div className={styles.logosPanel}>
          <div className={styles.logosGrid}>
            {financingSupportData.logos.map((item) => (
              <article key={item.id} className={styles.logoItem} aria-label={item.name}>
                {item.logo ? (
                  <img
                    className={styles.logoImage}
                    src={item.logo}
                    alt={`Logo ${item.name}`}
                    width="180"
                    height="80"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className={styles.logoLabel}>{item.label}</span>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title}>
            Faites <span className={styles.titleAccent}>financer votre formation a 100%</span>
          </h2>
          <p>
            <strong>+15 organismes de financement</strong> sont a votre disposition : Financement CPF, conventions
            SYNTEC & CINOV, OPCOAtlas, et bien d'autres...
          </p>
          <p>{financingSupportData.bodyBottom}</p>

          <div className={styles.paymentLine}>
            <p className={styles.paymentText}>
              {financingSupportData.payment.text} <b className={styles.paymentFactor}>2x</b>
              <b className={styles.paymentFactor}>3x</b> ou <b className={styles.paymentFactor}>4x</b> avec{" "}
              <span className={styles.paymentProvider}>{financingSupportData.payment.provider}</span>
            </p>
            <div className={styles.cardBrands} aria-hidden="true">
              {financingSupportData.payment.brands.map((brand) => (
                <em className={styles.cardBrand} key={brand}>
                  {brand}
                </em>
              ))}
            </div>
          </div>

          <CtaButtons className={styles.actions} items={financingSupportData.ctas} />
        </div>
      </div>
    </SectionShell>
  );
}
