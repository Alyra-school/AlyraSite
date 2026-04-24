import styles from "./FinancingSupportSection.module.css";
import SectionShell from "../shared/SectionShell";
import CtaButtons from "../shared/CtaButtons";
import { financingSupportData } from "../../../data/home";

export default function FinancingSupportSection() {
  return (
    <SectionShell className={`${styles.root} financing-support-section`} variant="contained">
      <div className="financing-support-layout">
        <div className="financing-logos-panel">
          <div className="financing-logos-grid">
            {financingSupportData.logos.map((item) => (
              <article key={item.id} className="financing-logo-item" aria-label={item.name}>
                {item.logo ? (
                  <img src={item.logo} alt={`Logo ${item.name}`} width="180" height="80" loading="lazy" decoding="async" />
                ) : (
                  <span>{item.label}</span>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="financing-support-copy">
          <h2>
            Faites <span>financer votre formation a 100%</span>
          </h2>
          <p>
            <strong>+15 organismes de financement</strong> sont a votre disposition : Financement CPF, conventions
            SYNTEC & CINOV, OPCOAtlas, et bien d'autres...
          </p>
          <p>{financingSupportData.bodyBottom}</p>

          <div className="financing-payment-line">
            <p>
              {financingSupportData.payment.text} <b>2x</b> <b>3x</b> ou <b>4x</b> avec <span>{financingSupportData.payment.provider}</span>
            </p>
            <div className="financing-card-brands" aria-hidden="true">
              {financingSupportData.payment.brands.map((brand) => (
                <em key={brand}>{brand}</em>
              ))}
            </div>
          </div>

          <CtaButtons className="financing-support-actions" items={financingSupportData.ctas} />
        </div>
      </div>
    </SectionShell>
  );
}
