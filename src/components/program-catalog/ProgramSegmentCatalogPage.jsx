import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs";
import ProgramResults from "./ProgramResults";
import styles from "./ProgramSegmentCatalogPage.module.css";

export default function ProgramSegmentCatalogPage({ config, programs }) {
  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero programs-hero">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Nos formations", href: "/formations" },
            { label: config.title },
          ]}
        />
        <div className="section-head">
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
      </section>

      <section className={styles.layout}>
        <article className={styles.topText}>
          <h2>{config.introTitle}</h2>
          <p>{config.introText}</p>
        </article>

        <ProgramResults programs={programs} isLoading={false} error={null} />

        <article className={styles.bottomText}>
          <h2>{config.bottomTitle}</h2>
          <p>{config.bottomText}</p>
          <div className={styles.seoLinks}>
            {config.seoLinks.map((item) => (
              <Link key={item.href + item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

