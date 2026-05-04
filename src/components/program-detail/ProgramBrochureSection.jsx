import Link from "next/link";

export default function ProgramBrochureSection({ programId, programImage, brochurePoints }) {
  if (!brochurePoints.length) return null;

  return (
    <section className="section program-section anchor-section program-brochure-showcase" id="tarifs">
      <div className="program-brochure-shell">
        <div className="program-brochure-head">
          <h2>Télécharger le programme de formation</h2>
          <p>
            Vous saurez bientôt développer une application décentralisée (Dapp) de A à Z, du front au back :
          </p>
        </div>

        <div className="program-brochure-content">
          <ul className="program-brochure-benefits">
            {brochurePoints.map((item) => (
              <li key={`${programId}-brochure-${item.position}`}>{item.text}</li>
            ))}
          </ul>

          <div className="program-brochure-form-wrap">
            <img
              src={programImage}
              alt=""
              className="program-brochure-visual"
              loading="lazy"
              decoding="async"
            />
            <form className="program-brochure-form" aria-label="Recevoir la brochure">
              <div className="program-brochure-form-grid">
                <label>
                  Prénom<span>*</span>
                  <input type="text" name="firstName" autoComplete="given-name" />
                </label>
                <label>
                  Nom<span>*</span>
                  <input type="text" name="lastName" autoComplete="family-name" />
                </label>
                <label>
                  Numéro de téléphone<span>*</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
                <label>
                  E-mail<span>*</span>
                  <input type="email" name="email" autoComplete="email" />
                </label>
              </div>

              <p className="program-brochure-privacy">
                Alyra l'école Blockchain & IA s'engage à protéger et à respecter votre vie privée.
              </p>
              <label className="program-brochure-checkbox">
                <input type="checkbox" name="privacy" />
                <span>J'accepte la politique de confidentialité.</span>
              </label>
              <label className="program-brochure-checkbox">
                <input type="checkbox" name="communications" />
                <span>J'accepte de recevoir d'autres communications de Alyra l'école Blockchain & IA.</span>
              </label>

              <div className="program-brochure-action">
                <Link className="primary" href="/rendez-vous">
                  Obtenir la brochure
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
