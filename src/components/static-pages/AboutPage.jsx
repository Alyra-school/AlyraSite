import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import PageHeroShell from "../page-sections/PageHeroShell";
import PageIntro from "../page-sections/PageIntro";
import CtaRow from "../page-sections/CtaRow";
import TeamShowcaseSection from "../TeamShowcaseSection";
import styles from "./StaticPages.module.css";

export default function AboutPage({ page }) {
  return (
    <main className={`main-content ${styles.main}`} id="main-content" tabIndex="-1">
      <PageHeroShell className="hero programs-hero">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: page.title }]} />
        <PageIntro title={page.title} subtitle={page.subtitle} />
      </PageHeroShell>

      <section className={`section ${styles.section}`}>
        {page.aboutSchool ? (
          <article id="notre-ecole-blockchain-ia" className="about-school-block anchor-section">
            <p className="about-school-overline">{page.aboutSchool.overline}</p>
            <h2>{page.aboutSchool.title}</h2>
            <p className="about-school-lead">{page.aboutSchool.lead}</p>
            {page.aboutSchool.paragraphs.map((paragraph) => (
              <p key={paragraph} className="about-school-paragraph">
                {paragraph}
              </p>
            ))}
            <div className="about-school-cta">
              <Link href={page.aboutSchool.ctaHref} className="primary">
                {page.aboutSchool.ctaLabel}
              </Link>
            </div>
            <p className="about-school-bridge">{page.aboutSchool.bridge}</p>
            <h3>{page.aboutSchool.nextTitle}</h3>
            <p>{page.aboutSchool.nextSubtitle}</p>
          </article>
        ) : null}

        {page.aboutHighlights ? (
          <article className="about-highlights-block" aria-label="Points forts de l'ecole">
            <div className="about-highlights-copy">
              {page.aboutHighlights.items.map((item) => (
                <section key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </section>
              ))}
            </div>
            <figure className="about-highlights-visual" aria-hidden="true">
              {page.aboutHighlights.imageUrl ? (
                <Image
                  src={page.aboutHighlights.imageUrl}
                  alt={page.aboutHighlights.imageAlt}
                  width={560}
                  height={560}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                />
              ) : null}
            </figure>
          </article>
        ) : null}

        {page.schoolKpis ? (
          <article id="les-chiffres-de-lecole" className="about-kpis-block anchor-section">
            <p className="about-kpis-eyebrow">{page.schoolKpis.eyebrow}</p>
            <h2>{page.schoolKpis.title}</h2>
            <p className="about-kpis-subtitle">{page.schoolKpis.subtitle}</p>

            <div className="about-kpis-top-grid">
              {page.schoolKpis.topCards.map((card) => (
                <section key={`${card.value}-${card.label}`} className="about-kpi-card">
                  <h3>{card.value}</h3>
                  <h4>{card.label}</h4>
                  <p className={card.isItalic ? "is-italic" : ""}>{card.text}</p>
                </section>
              ))}
            </div>

            <section className="about-kpi-card about-kpi-card-wide">
              <h3>{page.schoolKpis.middleCard.value}</h3>
              <h4>{page.schoolKpis.middleCard.label}</h4>
            </section>

            <div className="about-kpis-bottom-grid">
              <section className="about-kpi-card">
                <p className="about-kpi-trustpilot">{page.schoolKpis.bottomCards[0].trustpilot}</p>
              </section>
              <section className="about-kpi-card">
                <h3>{page.schoolKpis.bottomCards[1].value}</h3>
                <h4>{page.schoolKpis.bottomCards[1].label}</h4>
              </section>
            </div>

            <CtaRow actions={page.schoolKpis.actions} />
          </article>
        ) : null}

        {page.teamShowcase ? <TeamShowcaseSection section={page.teamShowcase} /> : null}
        {page.expertsShowcase ? <TeamShowcaseSection section={page.expertsShowcase} /> : null}
      </section>
    </main>
  );
}
