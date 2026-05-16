import Link from "next/link";
import Image from "next/image";
import styles from "./ProgramContentSections.module.css";

export default function ProgramBrochureSection({ programId, programImage, brochurePoints }) {
  if (!brochurePoints.length) return null;

  return (
    <section className={`section program-section anchor-section ${styles.brochureShowcase}`} id="programme-brochure">
      <div className={styles.brochureShell}>
        <div className={styles.brochureHead}>
          <h2>Télécharger le programme de formation</h2>
          <p>
            Vous saurez bientôt développer une application décentralisée (Dapp) de A à Z, du front au back :
          </p>
        </div>

        <div className={styles.brochureContent}>
          <ul className={styles.brochureBenefits}>
            {brochurePoints.map((item) => (
              <li key={`${programId}-brochure-${item.position}`}>{item.text}</li>
            ))}
          </ul>

          <div className={styles.brochureFormWrap}>
            <Image
              src={programImage}
              alt=""
              className={styles.brochureVisual}
              width={520}
              height={640}
              sizes="(max-width: 900px) 84vw, 520px"
              unoptimized
            />
            <form className={styles.brochureForm} aria-label="Recevoir la brochure">
              <div className={styles.brochureFormGrid}>
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

              <p className={styles.brochurePrivacy}>
                Alyra l'école Blockchain & IA s'engage à protéger et à respecter votre vie privée.
              </p>
              <label className={styles.brochureCheckbox}>
                <input type="checkbox" name="privacy" />
                <span>J'accepte la politique de confidentialité.</span>
              </label>
              <label className={styles.brochureCheckbox}>
                <input type="checkbox" name="communications" />
                <span>J'accepte de recevoir d'autres communications de Alyra l'école Blockchain & IA.</span>
              </label>

              <div className={styles.brochureAction}>
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
