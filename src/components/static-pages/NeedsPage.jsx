import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs";
import PageHeroShell from "../page-sections/PageHeroShell";
import PageIntro from "../page-sections/PageIntro";
import styles from "./StaticPages.module.css";

export default function NeedsPage({ page }) {
  return (
    <main className={`main-content ${styles.main}`} id="main-content" tabIndex="-1">
      <PageHeroShell className="hero programs-hero">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: page.title }]} />
        <PageIntro title={page.title} subtitle={page.subtitle} />
      </PageHeroShell>

      <section className={`section ${styles.section}`}>
        <div className={styles.cards}>
          {(page.sections || []).map((section) => (
            <article key={section.title} id={section.anchorId ?? undefined} className="card anchor-section">
              <h3>{section.title}</h3>
              <ul className="simple-list">
                {(section.points || []).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="hero-actions">
          <Link href="/rendez-vous" className="primary">
            Prendre rendez-vous
          </Link>
        </div>
      </section>
    </main>
  );
}
